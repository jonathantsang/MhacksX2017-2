var key = require('../utils/key');
var request = require('request');
var _ = require('underscore');


// The API that returns the in-email representation.
module.exports = function(req, res) {
  var url = req.query.url.trim();
  console.log(url);
  // plot\([0-9]+,[0-9]+\)+
  var splitURL = url.split('=');
  console.log(splitURL);
  var query = splitURL[0];
  if(splitURL.length == 2){
    query = splitURL[1];
  }
  
  // var query = 'plot[(0,0)(1,1))]';
  console.log(query);

  var response = request({
    url : 'http://api.wolframalpha.com/v2/query',
    qs: {
      input: query,
      format: 'image',
      output : 'JSON',
      appid: key
    },
    timeout: 15 * 1000
  }, function(err, response) {
    if (err) {
      res.status(500).send('Error');
      return;
    }
    var data = JSON.parse(response.body);
    var pods = data.queryresult.pods;
    if(!pods) return;
    var ph = pods.find((obj) => {return obj.title==='Plot'});
    var img = ph.subpods[0].img.src
    console.log(img);

    var width = '100%'
    var html = '<img style="max-width:100%;" src="' + img + '" width="' + width + '"/>';
    res.json({
      body: html
    });
  });
};