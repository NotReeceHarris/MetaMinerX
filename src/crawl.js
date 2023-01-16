const request = require('request');
const database = require('./database')
const validator = require('./validator')
const ascii = require('./ascii')
const processing = require('./processing')
const sqlite3 = require('sqlite3').verbose();

const dbFile = './data/vault.db';
let queue = new Set();
let visitedUrls = new Set();
let storedEmails = new Set();
let currentUrl = '';
let responseTime = [0,0,0,0,0,0,0,0,0,0];

let db = new sqlite3.Database(dbFile, sqlite3.OPEN_READONLY, (err) => {
    if (err) {
        return console.error(err.message);
    }
});

db.all("SELECT url FROM scanned", [], (err, rows) => {
    if (err) {
        throw err;
    }
    rows.forEach((row) => {
        visitedUrls.add(row.url);
    });
});

db.all("SELECT url FROM queue", [], (err, rows) => {
    if (err) {
        throw err;
    }
    rows.forEach((row) => {
        queue.add(row.url);
    });
});

db.all("SELECT email FROM emails", [], (err, rows) => {
    if (err) {
        throw err;
    }
    rows.forEach((row) => {
        storedEmails.add(row.url);
    });
});

db.close((err) => {
    if (err) {
        return console.error(err.message);
    }
});

function halfStringByWords(str) {
    const words = str.split(" ");
    const half = Math.ceil(words.length / 2);
    return [words.slice(0,half).join(" "), words.slice(half).join(" ")]
}

function verbose() {

    let count = 0;
    let fact = '';
    let facts = ['Nearly 40% of data scientists use web scraping for data collection.', 'Web scraping is used by 80% of businesses to gather competitive intelligence.', 'Around 55% of websites are blocked to web scrapers.', 'Around 20% of web scraping is used for illegal or unethical.', 'Web scraping in e-commerce is expected to reach $8.81 billion by 2027.'];
    setInterval(() => {
        console.clear()

        if (fact == '') {
            console.log(ascii.excavator[count])
        } else {
            console.log(ascii.excavatorSpeech[count].replace('{QUICKFACT1}', halfStringByWords(fact)[0]).replace('{QUICKFACT2}', halfStringByWords(fact)[1]))
        }

        console.log(`Queue\t: ${queue.size}\nScanned\t: ${visitedUrls.size}\nEmails\t: ${storedEmails.size}\n\nCurrent\t: ${currentUrl}\nResponse: ${Math.round(responseTime.reduce((a, b) => a + b) / responseTime.length)} ms\n\nPress CTRL + C to stop mining...`)
        
        if (count == 3) {if (fact == '') {if (Math.floor(Math.random() * 6) == 4) {fact = facts[Math.floor(Math.random() * facts.length)];}} else {fact = '';}}
        if (count == 3) {count = 0} else {count += 1}
    }, 500);
}

function crawl(url, callback) {
    if (validator.isValidUrl(url)) {
        const start = Date.now();
        request({
            method: 'GET',
            url: url,
            headers: {
              'User-Agent': 'meta-miner-x_v1.0.0'
            }
            }, (error, response, html) => {
            
            if (responseTime.length >= 10) {responseTime.pop();}
            responseTime.unshift(Date.now() - start)

            currentUrl = url
            database.insertScan(url);
            visitedUrls.add(url);

            if (!error && response.statusCode === 200) {
                processing.process(html, queue, storedEmails, visitedUrls, url)
            }
            callback();
        });
    }
}

function processQueue(startUrl = '') {
    if (startUrl != '') {
        queue.add(startUrl)
        verbose()
    } else if (startUrl == 'ContinueQueue') {
        verbose()
    }
    if (queue.size > 0) {
        let [first] = queue
        const nextUrl = first;
        queue.delete(first);
        crawl(nextUrl, processQueue);
    } else {
        console.log('Nothing left to mine, start script again from another start point');
        db.close((err) => {
            if (err) {
                console.error(err.message);
            }
            console.log('Closed the database connection.');
        });
    }
}



module.exports = {processQueue}