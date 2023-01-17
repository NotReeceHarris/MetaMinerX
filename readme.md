![](https://github.com/NotReeceHarris/NotReeceHarris/blob/main/cdn/metaminerxbanner.png?raw=true)

## What will not be accepted as a community plugin

Plugins that violate laws, such as those involving copyright infringement, will not be accepted and may result in a repository ban. Additionally, plugins that store personal information, such as names, passwords, and addresses, will not be accepted.

## What will be accepted as a community plugin

Plugins that utilize algorithms to create unique data, such as those that collect and analyze styling trends, are more likely to be accepted and well-received by users.

## Creating a plugin 

To create a plugin for this program, you must first run the script and select the option 4 "Create plugin". This will prompt you to enter a name for your plugin, for example `Tag Finder`. Once you enter the name and click enter, a file will be created in the `./plugins` directory. The file name will be a "slug" version of the plugin's name, such as `tag-finder.js`. 

The file will already contain the boilerplate code for a plugin. Keep in mind that this program is not intended for illegal acts and is only meant for data scientists and researchers to generate data. 

To store data within the database, simply return the data in the callback. For example, `callback({'hello': 'world'})`. Note that the data must be able to be converted to JSON. If you need to store data outside of the database, such as images, please automatically generate a folder named after the plugin in the directory `./data`. For example, `./data/tagfinder`. 

It is important to note that the above is a basic guide to creating a plugin, and more in-depth coding knowledge and understanding of the program's structure may be necessary to create a functional and effective plugin.

Here is an example plugin that finds the most used html tag in a webpage:
```js
const cheerio = require('cheerio');

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

