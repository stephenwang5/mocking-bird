const http = require('http');
const fetch = require('node-fetch');
const url = require('url');
const Twit = require('twit');

var T = new Twit({
    consumer_key:         'xxx',
    consumer_secret:      'xxx',
    access_token:         'xxx',
    access_token_secret:  'xxx',
    timeout_ms:           60*1000,  // optional HTTP request timeout to apply to all requests.
});

function get_ready(arg, res) {
    console.log("get ready " + arg);
    res.write(arg);
    res.end();
}

http.createServer((req, res) => {
    res.writeHead(200, {
        "Content-Type": "text/plain",
        "Access-Control-Allow-Origin": "*"
    });
    let handle_list = url.parse(req.url).query.split("&");

    var user_list = handle_list
    
    let tweet_data = [];
    var last_user = user_list[user_list.length - 1];
    let allow_entry = true;
    console.log(last_user);

    for (user of user_list) {
        console.log(user);
        var query_command = "from:" + user + " -RT";
        console.log(query_command);

        T.get('search/tweets', {q: query_command, count: 1 }, function(err, data, response) {
            console.log(data);
            console.log('id going now: ');
            console.log(data.statuses[0].id_str);
            tweet_data.push([data.statuses[0].id_str, data.statuses[0].favorite_count]);
            if (user == last_user && allow_entry) {
                allow_entry = false
                console.log('callback executed');
                console.log(tweet_data);
                let max_idx = 0;
                for (var idx = 1; idx < tweet_data.length; idx++) {
                    if (tweet_data[idx][1] > tweet_data[max_idx][1]) {
                        max_idx = idx;
                    }
                }

                console.log(max_idx)
                console.log(tweet_data[max_idx][0])
                target_id = tweet_data[max_idx][0];
                fetch("https://publish.twitter.com/oembed?url=https://twitter.com/anyuser/status/" + target_id)
                //fetch("https://publish.twitter.com/oembed?url=https://twitter.com/anyuser/status/" + "1317861704819118080")
                .then(response=>response.json())
                .then(obj=>{
                    console.log("inside after mutation" + obj.html);
                    res.write(obj.html);
                    res.end();
                })
                .catch(err=>console.error(err));
            }
        })
    }

    console.log('pre-complete');
}).listen(6942);
