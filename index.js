/* eslint-disable no-unused-vars */
/* eslint-disable no-case-declarations */
/* eslint-disable no-undef */
const readline = require('readline');
const ascii = require('./src/ascii');
const fs = require('fs');
const sqlite3 = require('sqlite3').verbose();

const rl = readline.createInterface({
	input: process.stdin,
	output: process.stdout
});

process.stdin.setEncoding('utf8');

if (fs.existsSync('./data/vault.db')) {
	const crawl = require('./src/crawl');
	const mine = require('./src/mine');
	const plugins = require('./src/plugins');

	console.log(ascii.start);
	console.log('[1] Start crawling\n[2] Start mining\n[3] Verify plugins\n[4] Create plugin\n[5] View stats\n[6] Purge data\n[7] Exit\n');

	rl.question('Enter your choice: ', (choice) => {
		switch (choice) {
		case '1':
			crawl.processQueue('', true);
			break;
		case '2':
			mine.processQueue(true);
			break;
		case '3':
			counter = 0;
			console.clear();
			fs.readdirSync('./plugins').forEach(function(file) {
				if (file.substr(-3) != '.js') return;
				const name = file.substr(0, file.indexOf('.'));

				try {
					let plugin = require('./plugins/' + name);
					plugin.logic('http://example.com', '<html></html>', {'hello': 'world'}, function(_data) {});
					console.log(`\n${counter}. ${plugin.pluginInfo.name} | ${plugin.pluginInfo.version} | ${plugin.pluginInfo.author} | ${name.startsWith('_') ? 'Disabled' : 'Enabled'} | WORKING \n${plugin.pluginInfo.description}\n`);
				} catch (error) {
					console.log(`\n${counter}. ./plugins/${name} | ERROR\n${error}\n`);
				}
                    
				counter++;
			});              
			break;
		case '4':
			console.log('Please enter the plugins name: ');
			process.stdin.on('readable', () => {plugins.generatePlugin(process.stdin.read());});
			break;
		case '5':

			let scrapeDone = 0;
			let scrapeQueue = 0;
			let crawlDone = 0;
			let crawlQueue = 0;
			let scrapedLoot = 0;

			let db = new sqlite3.Database('./data/vault.db', sqlite3.OPEN_READONLY, (err) => {if (err) {return console.error(err.message);}});
			db.get('SELECT COUNT(*) as count FROM scanned WHERE scraped = 1', (_err, row) => {
				scrapeDone = row.count;
				db.get('SELECT COUNT(*) as count FROM scanned WHERE scraped = 0 AND httpCode = \'200\'', (_err, row) => {
					scrapeQueue = row.count;
					db.get('SELECT COUNT(*) as count FROM scanned', (_err, row) => {
						crawlDone = row.count;
						db.get('SELECT COUNT(*) as count FROM queue WHERE type = \'crawl\'', (_err, row) => {
							crawlQueue = row.count;
							db.get('SELECT COUNT(*) as count FROM loot', (_err, row) => {
								scrapedLoot = row.count;
								console.clear();
								console.log(`\nSites crawled: ${crawlDone}\nCrawl queue: ${crawlQueue}\nSites Scraped: ${scrapeDone}\nScrape queue: ${scrapeQueue}\nLoot: ${scrapedLoot}\n`);
							});
						});
					});
				});
			});
                
			db.close((err) => {if (err) {return console.error(err.message);}});

			break;
		case '6':
			require('fs-extra').remove('./data', (err) => {if (err) {console.log('It seems like the data directory is busy, please try deleting "./data" manually');} else {console.log('Purged successfully');}});
			break;
		case '7':
			console.log('Exiting...');
			process.exit();
			break;
		default:
			console.log('Invalid choice. Please try again.');
			break;
		}
		rl.close();
	});
} else {
	const folder = './data';
	const dbFile = './data/vault.db';

	if (!fs.existsSync(folder)) {fs.mkdirSync(folder);}    
	const db = new sqlite3.Database(dbFile, (err) => {if (err) {console.error(err.message);}}); 
            
	db.run(`CREATE TABLE IF NOT EXISTS scanned (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        url TEXT NOT NULL,
        httpCode VARCHAR(255) NOT NULL,
        scraped INTEGER(1) NOT NULL
    )`);
    
	db.run(`CREATE TABLE IF NOT EXISTS queue (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        url TEXT NOT NULL,
        type VARCHAR(255) NOT NULL
    )`);
            
	db.run(`CREATE TABLE IF NOT EXISTS loot (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        urlID INTEGER NOT NULL,
        dataType VARCHAR(255) NOT NULL,
        data TEXT NOT NULL,
        hash TEXT NOT NULL,
        FOREIGN KEY (urlID) REFERENCES scanned(id)
    );`);
	db.close((err) => {if (err) {console.error(err.message);}else{console.log('Generated database file, please run again!');process.exit();}});
}