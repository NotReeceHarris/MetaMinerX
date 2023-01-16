const database = require('./database')
const validator = require('./validator')

function process(html, queue, storedEmails, visitedUrls, url) {
    const linkRegex = /https?:\/\/(www\.)?[-a-zA-Z0-9@:%._\+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%_\+.~#?&//=]*)/gi;
    const emailRegex = /\b[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Z|a-z]{2,}\b/g;
    const ipRegex = /(?:(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.){3}(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)/g;

    const links = html.match(linkRegex);
    const emails = html.match(emailRegex);

    if (links) {
        links.forEach(link => {
            if (validator.isValidUrl(link)) {
                if (!visitedUrls.has(link) && !queue.has(link)) {
                    database.insertQueue(link)
                    queue.add(link);
                }
            }
        });
    }

    if (emails) {
        emails.forEach(email => {
            if (!storedEmails.has(email)) {
                database.insertEmails(email, url);
                storedEmails.add(email);
            }
        });
    }
}

module.exports = {process}