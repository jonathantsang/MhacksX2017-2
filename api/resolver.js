var key = require('../utils/key');
var request = require('request');
var _ = require('underscore');


// The API that returns the in-email representation.
module.exports = function(req, res) {
  var url = req.query.url.trim();

  // Giphy image urls are in the format:
  // http://giphy.com/gifs/<seo-text>-<alphanumeric id>
  // plot \[([0-9]*, [0-9]*)+\]
  var matches = url.match(/\-([a-zA-Z0-9]+)$/);
  if (!matches) {
    res.status(400).send('Invalid URL format');
    return;
  }

  var id = matches[1];

  var response = request({
    url ='http://api.wolframalpha.com/v2/query';
    qs: {
      input: term,
      appid: key,
      format: 'image,plaintext',
      output : 'JSON'
    },
    timeout: 15 * 1000
  }, function(err, response) {
    if (err) {
      res.status(500).send('Error');
      return;
    }
    var data = JSON.parse(response.body);
    console.log(data);
    var width = '100%'
    var html = '<img style="max-width:100%;" src="' + data + '" width="' + width + '"/>';
    res.json({
      body: html
        // Add raw:true if you're returning content that you want the user to be able to edit
    });
  });
};