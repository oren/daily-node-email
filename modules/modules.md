How to organize a Javascript project?

![modules](http://trustonteachestech.files.wordpress.com/2013/05/lego-bricks.jpg)

Node has a fantastic way to organize the code-base. it's called CommonJS.
The idea is simple - break down your project into small functions and put them in separate files.
Notice that the title has Javascript in it and not Node. the reason is you can apply this coding style to your client side code.
I wrote about it here.

Let's see a practical example. I have to keep it short since Liz's scrolling functionality is broken so I'll break this into 4 or 5 blog posts.

I'll start with writing a small program, than I'll extract it's main feature into it's own function on a separate file.
Later on I'll add a test to our function and I'll finish by publishing this module to NPM (similar to creating a ruby gem, but awesome).

Here is the situation - your boss just asked you to build a web crawler that goes over many Amazon product pages and saves some basic information into a DB (let's assume your company has an agreement with Amazon to do that). Here is an example of a product page on Amazon:

![amazon](http://i.imgur.com/jAfIhGh.png)

Your pointy-haired boss just sent you a giant text file with 20 million URLS and wish you good luck.
Where do you start? Let's focus on the scraping part and build a simple program that can scrape a single listing page on YP.
I'll be using an npm package called cheerio that gives us a jQuery syntax to select DOM elements.


copy this file and run with `node index.js`

```js
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
// index.js
```

That was easy - we make an http call, load the html into cheerio, select the business name and phone and print them.  Next time we'll try to turn this file into a module, so we can do something like this:

```js
var scrape = require('./scrape.js');
scrape(url);
```
