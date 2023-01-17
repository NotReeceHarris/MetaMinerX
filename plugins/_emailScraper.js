/* Please only run this plugin on websites that allow scraping of email addresses */

const pluginInfo = {
	'name': 'Email Scraper',
	'description': 'This plugin scraps emails off webpages.',
	'version': '1.0.0',
	'author': 'Reece Harris'
};

/**
* @param {string} url The target url.
* @param {string} html The target urls html response.
* @param {string} response The target urls response.
* @param {function} callback The store the loot harvested
*/
function logic(_url, html, _response, callback) {
	const emailRegex = /\b[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Z|a-z]{2,}\b/g;
	const emails = html.match(emailRegex);
    
	if (emails) {
		emails.forEach(email => {
			callback(email);
		});
	}
}

module.exports = {pluginInfo, logic};
    