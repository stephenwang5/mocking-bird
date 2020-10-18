const Twit = require('twit');
const http = require('http');
const url = require('url');

var T = new Twit({
    consumer_key:         'PLkm7FwiqUuZgFUSYEEpThvyn',
    consumer_secret:      'Vnf4CM2Zmd07105y1hhmB0rKbewpyU5AdIHHP0s21CzMUWuZyh',
    access_token:         '1317598048072142849-ZonOpqD0KMctCBg9aNI7T0UsJGl74u',
    access_token_secret:  'vAIvdCCAOs9zXfQiz0pySuWwtGSvvvrvbWAa4yoXPhMBm',
    timeout_ms:           60*1000,  // optional HTTP request timeout to apply to all requests.
  })


T.get('search/tweets', {q: "from:realDonaldTrump -RT", count: 1 }, function(err, data, response) {
    console.log(data)
    console.log('id going now: ')
    console.log(data.statuses[0].id_str)
})

http.createServer((req, res) => {
    res.writeHead(200, {
        "Content-Type": "text/plain",
        "Access-Control-Allow-Origin": "chrome-extension://kifkjpdcljbpeanagemhiggkmeephhbn"
    });
    res.write(url.parse(req.url).query.split("&")[0]);
    console.log(url.parse(req.url).query);
    res.end();
}).listen(6942);

console.log('server started');
