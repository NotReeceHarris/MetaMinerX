/* 
Disclaimer: By using our open source program to create plugins, 
you are agreeing to comply with all applicable laws and regulations 
regarding web scraping, including but not limited to copyright laws. 
Any actions taken by you or the plugins you create that violate 
these laws will not be condoned by our organization and may result 
in legal repercussions. It is your responsibility to ensure that 
your plugins are in compliance with all relevant laws and regulations 
before using them.
*/

const cheerio = require('cheerio');

const pluginInfo = {
	'name': 'tagfinder',
	'description': 'enter a description',
	'version': '1.0.0',
	'author': 'enter your name'
};

/**
* @param {string} url The target url.
* @param {string} html The target urls html response.
* @param {string} response The target urls response.
* @param {function} callback Store the loot harvested
*/
function logic(url, html, response, callback) {
	const $ = cheerio.load(html);
	let tags = {};
	$('*').each((i, element) => {
		let tag = $(element).get(0).tagName;
		if (tags[tag]) {
			tags[tag]++;
		} else {
			tags[tag] = 1;
		}
	});

	let max = 0;
	let mostUsedTag;
	for (let tag in tags) {
		if (tags[tag] > max) {
			max = tags[tag];
			mostUsedTag = tag;
		}
	}

	callback(mostUsedTag);
}

module.exports = {pluginInfo, logic};
    