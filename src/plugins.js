const fs = require('fs');

const pluginDir = './plugins';

if (!fs.existsSync(pluginDir)) {fs.mkdirSync(pluginDir);}     

function generatePlugin(name) {
	fs.writeFile(`${pluginDir}/${name.toLowerCase().replaceAll(' ', '-').replaceAll('/', '-').replace(/[\r\n]/g, '')}.js`,`/* 
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
    'name': '${name.replaceAll('\'', '\'').replace(/[\r\n]/g, '')}',
    'description': 'enter a description',
    'version': '1.0.0',
    'author': 'enter your name'
}

/**
* @param {string} url The target url.
* @param {string} html The target urls html response.
* @param {string} response The target urls response.
* @param {function} callback Store the loot harvested
*/
function logic(url, html, response, callback) {
    /* Your code here */
    callback('data')
}

module.exports = {pluginInfo, logic}
    `, (err) => {
		if (err) {
			console.log(err);
		} else {
			console.log(`Plugin file created at ${pluginDir}/${name.toLowerCase().replaceAll(' ', '-').replaceAll('/', '-').replace(/[\r\n]/g, '')}.js`);
		}
	});
}

module.exports = {generatePlugin};