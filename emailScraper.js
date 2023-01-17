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

/* Please only run this plugin on websites that allow scraping of email addresses */

pluginInfo = {
    'name': 'Email Scraper',
    'description': 'This plugin scraps emails off webpages.',
    'version': '1.0.0',
    'author': 'Reece Harris'
}

/**
* @param {string} url The target url.
* @param {string} html The target urls html response.
* @param {string} response The target urls response.
* @param {function} callback The store the loot harvested
*/
function logic(url, html, _response, callback) {
    const emailRegex = /\b[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Z|a-z]{2,}\b/g;
    const emails = html.match(emailRegex);
    
    if (emails) {
        emails.forEach(email => {
            callback(email)
        });
    }
}

module.exports = {pluginInfo, logic}
    