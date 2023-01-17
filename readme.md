![](https://github.com/NotReeceHarris/NotReeceHarris/blob/main/cdn/metaminerxbanner.png?raw=true)

## What will not be accepted as a community plugin

Any plugin that breaks the law for example copyright scraping will not be accepted and may even result in a repo ban, any plugin that stores personal such as names, passwords, addresses will not be accepted.

## What will be accepted as a community plugin

Any plugin that uses algorithms to generate unique data for example collecting styling trends is most likely to be accepted.

## Creating a plugin 

Plugins are custom-made scripts or software that allow the web crawler to extract specific data from the web pages. To create a plugin, first, run the script and select option 4 "Create plugin". Then, continue by entering a plugin name. Once the plugin has been generated, follow the output file path to find your plugin file in the ./plugins directory.

It's important to note that when creating plugins, it's crucial to consider the legality of your code. Make sure you are not breaking any scraping laws or copyright infringement.

If you have data that cannot be stored within the dataase for example images, please automatically generate folder within the `./data` directory when naming the folder try name it something linking to your plugin name.

Here is an example plugin that finds the most used html tag in a webpage:
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

