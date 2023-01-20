const config = {
	'useragent':'Meta-Miner-X (+https://github.com/NotReeceHarris/MetaMinerX)',
	'justDomain': false, // crawl just domain not path,
	'removeParams': true,
	'domain':{
		'blacklist':[],
		'whitelist':[],
	},
	'extension':{
		'blacklist':[
			'.png',
			'.gif',
			'.jpeg',
			'.jpg',
			'.mp4',
			'.mp3',
			'.webp',
			'.css',
			'.js'
		],
		'whitelist':[],
	}
};

/* The logic will come after the config */

function logic(url, queue){
	// queue is immutable

	// return true to save url
	return url != 'https://github.com/NotReeceHarris/MetaMinerX';
}

module.exports = {logic, config};