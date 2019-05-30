var request = require('request');
var cheerio = require('cheerio');
var express = require('express');
var app = express();
var port = 3000
app.get('/', function (req, res) {
	request('https://uxdesign.cc/', function(err, resp, html) {
        if (!err){

          	const $ = cheerio.load(html);
	          	console.log("Start")

          let ids = $('a[data-post-id]').map(function(index,data) {
          			var heading = $(this).children('h3').text();
          			var text = $(this).children('div').text();
          			var string = index+" " +heading +" -> "+text;
          			// arr.push(string)
			    return string;
		  }).get()
			res.send(ids);
      }
});
   
})




app.listen(port, () => console.log(`Example app listening on port ${port}!`))