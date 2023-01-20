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

	const config = require('../config');

	if (links) {
		links.forEach(link => {
			if (validator.isValidUrl(link)) {
				if (!visitedUrls.has(link) && !queue.has(link)) {
					let stop = false;

					/* =================== CONFIGS =================== */

					if (config.config.justDomain) {link = new URL(link).origin;}
					if (config.config.removeParams) {link = `${new URL(link).origin}${new URL(link).pathname}`;}

					/* ================== BLACKLIST ================== */

					if (config.config.domain.blacklist.length > 0) {
						config.config.domain.blacklist.forEach(blacklistUrl => {
							if (new URL(blacklistUrl).hostname == new URL(link).hostname) {
								stop = true;
							}
						});
					}

					if (config.config.extension.blacklist.length > 0) {
						config.config.extension.blacklist.forEach(blacklistExtension => {
							if (new URL(link).pathname.endsWith(blacklistExtension)) {
								stop = true;
							}
						});
					}

					/* ================== WHITELIST ================== */

					if (!stop) {
						if (config.config.domain.whitelist.length > 0) {
							config.config.domain.whitelist.forEach(whitelistUrl => {
								if (new URL(whitelistUrl).hostname == new URL(link).hostname) {
									if (config.config.extension.whitelist.length > 0) {
										config.config.extension.whitelist.forEach(whitelistExtension => {
											if (new URL(whitelistExtension).hostname == new URL(link).hostname) {
												if (config.logic(link)) {
													database.insertQueue(link, 'crawl');
													queue.add(link);
												}
											}
										});
									} else {
										if (config.logic(link)) {
											database.insertQueue(link, 'crawl');
											queue.add(link);
										}
									}
								}
							});
						} else {
							if (config.config.extension.whitelist.length > 0) {
								config.config.extension.whitelist.forEach(whitelistExtension => {
									if (new URL(whitelistExtension).hostname == new URL(link).hostname) {
										if (config.logic(link)) {
											database.insertQueue(link, 'crawl');
											queue.add(link);
										}
									}
								});
							} else {
								if (config.logic(link)) {
									database.insertQueue(link, 'crawl');
									queue.add(link);
								}
							}
						}
					}
					
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