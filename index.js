const args = process.argv.slice(2);
const fs = require('fs');
const sqlite3 = require('sqlite3').verbose();
const readline = require('readline');
const spider = require('./src/crawl')

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

const folder = './data';
const dbFile = './data/vault.db';
process.stdin.setEncoding('utf8');

/*  */
if (!fs.existsSync(folder)) {
    fs.mkdirSync(folder);
}
        
let db = new sqlite3.Database(dbFile, (err) => {
    if (err) {
        console.error(err.message);
    }
});
        
db.run(`CREATE TABLE IF NOT EXISTS scanned (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    url TEXT NOT NULL
)`);

db.run(`CREATE TABLE IF NOT EXISTS queue (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    url TEXT NOT NULL
)`);
        
db.run(`CREATE TABLE IF NOT EXISTS repository (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    urlID INTEGER NOT NULL,
    data TEXT NOT NULL,
    FOREIGN KEY (urlID) REFERENCES scanned(id)
);`);

db.run(`CREATE TABLE IF NOT EXISTS emails (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    email TEXT NOT NULL,
    urlID INTEGER NOT NULL,
    FOREIGN KEY (urlID) REFERENCES scanned(id)
);`);

db.close((err) => {
    if (err) {
        console.error(err.message);
    }
});
/*  */

if (args[0] == '--menu') {
    console.log(`
MetaMinerX
1. Start mining
2. Continue mining
3. Purge database
4. Exit
    `)

    rl.question('Enter your choice: ', (choice) => {
    switch (choice) {
        case '1':
            console.log('Please input the start url: ');
            process.stdin.on('readable', () => {
                spider.processQueue(process.stdin.read())
            });
            
            break;
        case '2':
            spider.processQueue('ContinueQueue')
            break;
        case '3':
            fs.unlinkSync(dbFile);
            generateDatabase()
            break;
        case '4':
            console.log('Exiting...');
            process.exit();
        default:
            console.log('Invalid choice. Please try again.');
            break;
    }
    rl.close();
    });
}