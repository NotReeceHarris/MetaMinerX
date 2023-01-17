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

## Plugins

Plugins are custom-made scripts or software that allow the web crawler to extract specific data from the web pages. To create a plugin, first, run the script and select option 4 "Create plugin". Then, continue by entering a plugin name. Once the plugin has been generated, follow the output file path to find your plugin file in the `./plugins` directory.

It's important to note that when creating plugins, it's crucial to consider the legality of your code. Make sure you are not breaking any scraping laws or copyright infringement.

You can easily disable a plugin by adding an underscore (_) at the start of the file name. For example, `plugin.js` will run while `_plugin.js` will not run.

> When storing data outside the database please automatically create a folder within the `./data` and append any data there.

Here is an example of a plugin that will find the most common used html tag:
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

## Access collected data
All data collected by this program is stored within the ./data directory. You can use a SQLite viewer such as SQLite Studio or DB Browser for SQLite to view and manage the data stored in the database. Additionally, any other forms of data generated by plugins can also be found within the ./data directory, provided that the plugin was created correctly and configured to save data to that location. It's important to note that the data should be handled with care and in compliance with the laws and regulations.

scanned | _ | _
--- | --- | ---
id | INTEGER | `PRIMARY KEY` `AUTOINCREMENT`
url | `TEXT` | `NOT NULL`
httpCode | `VARCHAR(255)` | `NOT NULL`
scraped | `INTEGER(1)` | `NOT NULL`

queue | _ | _
--- | --- | ---
id | `INTEGER` | `PRIMARY KEY` `AUTOINCREMENT`
url | `TEXT` | `NOT NULL`
type | `VARCHAR(255)` | `NOT NULL`

loot | _ | _
--- | --- | ---
id | `INTEGER` | `PRIMARY KEY` `AUTOINCREMENT`
urlID | `INTEGER` | `NOT NULL` `FOREIGN KEY (urlID) REFERENCES scanned(id)`
dataType | `VARCHAR(255)` | `NOT NULL`
data | `TEXT` | `NOT NULL`
hash | `TEXT` | `NOT NULL`


## Performance

The performance of this program depends on your internet connection speed and bandwidth. The faster your connection, the faster you'll be able to crawl and scrape. When creating plugins, try to make them asynchronous to avoid increasing the time matrix per scrape.

## Discalmer
This program is intended for lawful and ethical use only. It is meant to be used by data scientists and researchers to collect data needed for their work. It is not intended for illegal activities, and the developer of this program is not responsible for any misuse or illegal actions taken by users of this program. Please use this program in compliance with all applicable laws and regulations.
