/* eslint-disable no-unused-vars */
const sqlite3 = require('sqlite3').verbose();
const dbFile = './data/vault.db';

const db = new sqlite3.Database(dbFile, (err) => {if (err) {console.error(err.message);}});

function insertScan(url, httpCode) {
	db.run('DELETE FROM queue WHERE url = ?', [url], (_err) => {});
	db.run('INSERT INTO scanned (url, httpCode, scraped) VALUES (?,?,?)', [url, httpCode,0], (_err) => {});
}

function insertScrape(url) {
	db.run('UPDATE scanned SET scraped = 1 WHERE url = ?', [url], (_err) => {});
}

function insertQueue(url, type) {
	db.run('INSERT INTO queue (url, type) VALUES (?,?)', [url,  type], (err) => {if (err) {console.error(err.message);}});
}

function insertEmails(email, url) {
	db.all('SELECT id FROM scanned WHERE url = ?', [url], (err, rows) => {
		if (err) {console.error(err.message);
		} else {
			if (rows.length > 0) {
				db.run('INSERT INTO loot (urlID, dataType, data) VALUES (?,?,?)', [rows[0].id, 'email', email], (_err) => {
				});
			}
		}
	});
}

function insertData(url, dataType, data, hash) {
	db.all('SELECT id FROM scanned WHERE url = ?', [url], (err, rows) => {
		if (err) {console.error(err.message);
		} else {
			if (rows.length > 0) {
				db.run('INSERT INTO loot (urlID, dataType, data, hash) VALUES (?,?,?,?)', [rows[0].id, dataType, data, hash], (_err) => {
				});
			}
		}
	});
}

module.exports = {insertScan, insertQueue, insertEmails, insertData, insertScrape};