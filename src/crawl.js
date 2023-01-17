/* eslint-disable no-undef */
const request = require('request');
const database = require('./database');
const validator = require('./validator');
const ascii = require('./ascii');
const processing = require('./processing');
const sqlite3 = require('sqlite3').verbose();

let queue = new Set();
let visitedUrls = new Set();

let currentUrl = '';
let responseTime = [0,0,0,0,0,0,0,0,0,0];

let db = new sqlite3.Database('./data/vault.db', (err) => {if (err) {console.error(err.message);}});
db.all('SELECT url FROM scanned', [], (err, rows) => {if(rows){rows.forEach((row) => {visitedUrls.add(row.url);});}});
db.all('SELECT url FROM queue WHERE type=\'crawl\'', [], (err, rows) => {if(rows){rows.forEach((row) => {queue.add(row.url);});}});
db.close((err) => {if (err) {return console.error(err.message);}});

function halfStringByWords(str) {return [str.split(' ').slice(0,Math.ceil(str.split(' ').length / 2)).join(' '), str.split(' ').slice(Math.ceil(str.split(' ').length / 2)).join(' ')];}

function verbose() {
	let count = 0;
	let fact = '';
	let facts = ['Nearly 40% of data scientists use web scraping for data collection.', 'Web scraping is used by 80% of businesses to gather competitive intelligence.', 'Around 55% of websites are blocked to web scrapers.', 'Around 20% of web scraping is used for illegal or unethical.', 'Web scraping in e-commerce is expected to reach $8.81 billion by 2027.'];
	setInterval(() => {
		console.clear();
		if (fact == '') {console.log(ascii.spider[0][count]);} else {console.log(ascii.spider[1][count].replace('{QUICKFACT1}', halfStringByWords(fact)[0]).replace('{QUICKFACT2}', halfStringByWords(fact)[1]));}
		console.log(`Queue\t: ${queue.size}\nScanned\t: ${visitedUrls.size}\n\nCurrent\t: ${currentUrl}\nResponse: ${Math.round(responseTime.reduce((a, b) => a + b) / responseTime.length)} ms\n\nPress CTRL + C to stop mining...`);
        
		if (count == 3) {if (fact == '') {if (Math.floor(Math.random() * 6) == 4) {fact = facts[Math.floor(Math.random() * facts.length)];}} else {fact = '';}}
		if (count == 3) {count = 0;} else {count += 1;}
	}, 500);
}

function crawl(url, callback) {
	if (validator.isValidUrl(url)) {
		currentUrl = url;
		const start = Date.now();
		request({method: 'GET',url: url,headers: {'User-Agent': 'meta-miner-x_v1.0.0'}}, (error, response, html) => {
			if (responseTime.length >= 10) {responseTime.pop();}
			responseTime.unshift(Date.now() - start);
			if (response) {
				database.insertScan(url, response.statusCode);visitedUrls.add(url);
				if (!error && response.statusCode === 200) {processing.crawl(html, queue, visitedUrls);}
			}
			callback();
		});
	}
}

function processQueue(url='', runVerbose=false) {

	if (url != '') {
		queue.add(url);
	}

	if (queue.size > 0) {
		if (runVerbose) {
			verbose();
		}
		let [first] = queue;
		const nextUrl = first;
		queue.delete(first);
		crawl(nextUrl, processQueue);
	} else {
		console.clear();
		console.log('Please input a start url: ');
		process.stdin.on('readable', () => {processQueue(process.stdin.read(), true);});
	}
}



module.exports = {processQueue};