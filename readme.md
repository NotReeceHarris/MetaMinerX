![](https://github.com/NotReeceHarris/NotReeceHarris/blob/main/cdn/metaminerxbanner.png?raw=true)

## Installation

Before you can use this program, you'll need to have Node.js installed on your computer. Node.js version 0.10 or higher is required. You can download and install Node.js from the official website (https://nodejs.org/).

Once you've got Node.js installed, you're ready to install the necessary dependencies for this program. To do that, open your command prompt or terminal, navigate to the directory where you have the program files, and then run the following command:

```
$ npm i
```

This command will install all the necessary dependencies for the program to run. Once the installation is complete, you should be able to use the program without any issues.

## Usage

Before scraping the internet, you'll need to crawl it first. This can be done by selecting option 1 "Start crawling" when running the script. You'll need to input a starting URL, and the program will automatically crawl all links found on the page. Please note that this includes assets and other non-essential links. You can configure blacklist domains and configure targets to avoid unnecessary crawling. Once you have crawled a significant amount of data, you can start scraping. Please note that this program does not have scraping functionality on its own. However, there are two pre-made scraping plugins available on Github: "Email Scraper" which can scrape all emails from a page, and "Page Saver" which can take screenshots of every webpage.

## Creating a plugin

```js
pluginInfo = {
    'name': 'Tag finder',
    'description': 'This plugin will find the most common tags used in html',
    'version': '1.0.0',
    'author': 'Reece Harris'
}

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

    callback(mostUsedTag)
}

module.exports = {pluginInfo, logic}
```

