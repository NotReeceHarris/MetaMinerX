/* eslint-disable no-useless-escape */
/* eslint-disable no-undef */
const database = require('./database');
const validator = require('./validator');
const fs = require('fs');
const crypto = require('crypto');

const path = require('path');

function crawl(html, queue, visitedUrls) {
	const linkRegex = /https?:\/\/(www\.)?[-a-zA-Z0-9@:%._\+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%_\+.~#?&//=]*)/gi;
	const links = html.match(linkRegex);

	if (links) {
		links.forEach(link => {
			if (validator.isValidUrl(link)) {
				if (!visitedUrls.has(link) && !queue.has(link)) {
					database.insertQueue(link, 'crawl');
					queue.add(link);
				}
			}
		});
	}
}

function scrape(url, html, response, loot) {
	fs.readdirSync(path.join(__dirname, '../plugins')).forEach(function(file) {
		if (file.substr(-3) != '.js') return;
		const name = file.substr(0, file.indexOf('.'));
        
		if (!name.startsWith('_')) {
			let plugin = require(path.join(__dirname, '../plugins') + '/' + name);
			plugin.logic(url, html, response, function (data) {
				data = JSON.stringify(data); 
				var hash = crypto.createHash('md5').update(`${name}${data}`).digest('hex');
				if(!loot.has(hash)) {
					loot.add(hash);
					database.insertData(url, name, data, hash);
				}
			});
		}
	});  
}

module.exports = {crawl, scrape};