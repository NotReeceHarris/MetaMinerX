/* eslint-disable no-unused-vars */
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

const pluginInfo = {
	'name': 'Page saver',
	'description': 'A plugin that screenshots the scraping site',
	'version': '1.0.0',
	'author': 'Reece Harris'
};

const puppeteer = require('puppeteer');
const crypto = require('crypto');
const fs = require('fs');

async function screenshot(url) {
	const browser = await puppeteer.launch();
	const page = await browser.newPage();
	await page.goto(url);
	await page.setViewport({ width: 1920, height: 1080 });
	var hash = crypto.createHash('md5').update(`${url}`).digest('hex');
	await page.screenshot({path: `./data/screenshots/${hash}.png`});
	await browser.close();
}

function isAsset(url) {
	const assetExtensions = ['.jpg', '.jpeg', '.png', '.gif', '.css', '.js'];
	for (let i = 0; i < assetExtensions.length; i++) {
		if (url.includes(assetExtensions[i])) {
			return true;
		}
	}
	return false;
}

/**
* @param {string} url The target url.
* @param {string} html The target urls html response.
* @param {string} response The target urls response.
* @param {function} callback Store the loot harvested
*/
function logic(url, _html, _response, _callback) {
	if (!fs.existsSync('./data/screenshots')) {fs.mkdirSync('./data/screenshots');}     
	if (!isAsset(url)) {
		screenshot(url);
	}
}

module.exports = {pluginInfo, logic};
    