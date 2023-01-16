const sqlite3 = require('sqlite3').verbose();
const dbFile = './data/vault.db';

let db = new sqlite3.Database(dbFile, (err) => {
    if (err) {
        console.error(err.message);
    }
});

function insertScan(url) {
    db.run(`DELETE FROM queue WHERE url = ?`, [url], (err) => {});
    db.run(`INSERT INTO scanned (url) VALUES (?)`, [url], (err) => {});
}

function insertQueue(url) {
    db.run(`INSERT INTO queue (url) VALUES (?)`, [url], (err) => {
        if (err) {
            console.error(err.message);
        }
    });
}

function insertEmails(email, url) {
    db.all(`SELECT id FROM scanned WHERE url = ?`, [url], (err, rows) => {
        if (err) {
            console.error(err.message);
        } else {
            if (rows.length > 0) {
                db.run(`INSERT INTO emails (email, urlID) VALUES (?,?)`, [email, rows[0].id], (err) => {
                    if (err) {
                        console.error(err.message);
                    }
                });
            }
        }
    });
}

module.exports = {insertScan, insertQueue, insertEmails}