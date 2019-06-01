var request = require('request');
var cheerio = require('cheerio');
var express = require('express');
var app = express();
var port = 3000

function nextLink(href){
      // console.log(href)
      var data = request(href, function(err, resp, data){
        if(!err){
              const $ = cheerio.load(data);
              var d = $('h1,div[class=section-content]').text();
              console.log(d)
              return d;
        }
        else{
          // data = 'no data';
          return 'no data';
        }
      })

      return data;

}

app.get('/', function (req, res) {
	request('https://uxdesign.cc/', function(err, resp, html) {
        if (!err){

          	const $ = cheerio.load(html);
	          	console.log("Start")

          let data = $('a[data-post-id]').map(function(index,data) {
          			var heading = $(this).children('h3').text();
          			var text = $(this).children('div').text();
          			var string = index+" " +heading +" -> "+text;
                var href  = $(this).attr('href');
                var more= nextLink(href);
                console.log(more)
          			// arr.push(string)
			    return string;
		  }).get()
			res.send(data);
      }
  });
   
})




app.listen(port, () => console.log(`Example app listening on port ${port}!`))