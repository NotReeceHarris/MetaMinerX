![](https://github.com/NotReeceHarris/NotReeceHarris/blob/main/cdn/metaminerxbanner.png?raw=true)

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

