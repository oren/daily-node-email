// index.js

'use strict';

// core module for making http requests
var http = require('http');

// npm package for accessing the DOM but on the server
var cheerio = require('cheerio')

var url = 'http://www.amazon.com/Crick-ettes-Sampler-Pack--Cheese-Vinegar/dp/B005HBTNH8/ref=sr_1_11?ie=UTF8&qid=1371230119&sr=8-11&keywords=crickets'
var html = '';

http.get(url, function(res) {
  res.on('data', function (chunk) {
    html += chunk;
  });

  res.on('end', function (chunk) {
    var $ = cheerio.load(html);

    var name = $('#btAsinTitle').text();
    console.log(name);

    var price = $('.priceLarge').text();
    console.log(price);

  });
}).on('error', function(e) {
    console.log("Got error: " + e.message);
});

// output
// Crick-ettes Sampler Gift Pack- Sour Cream & Onion, Bacon & Cheese, & Salt N' Vinegar
// $11.48
