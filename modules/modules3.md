We finished with a failed test and it's time to write the module that will make it pass. That's our test:

```js
// test/scrape.js

var test = require('tape');

var scrape = require('../scrape.js');

test('scrape business name and phone', function (t) {
  t.plan(1);  // you have to declare how many assertions are in your test

  scrape('http://www.yellowpages.com/west-monroe-la/mip/armstrong-cricket-farm-5032804?lid=5032804', function(err, data){
    t.deepEqual(data, { name: 'Armstrong Cricket Farm', phone: '(318)387-6000' });
  });
});

// output:
// Error: Cannot find module '../scrape.js'
```

Let's fix it by writing our module. What we are going to do is copy the code from index.js into a new file (locate it in the root folder):

```js
// scrape.js

'use strict';

// Module that scrape a webpage on YP and return business name and phone
//
// Arguments: url and callback
// callback will be fired with { name: 'Armstrong Cricket Farm', phone: '(318) 387-6000' }
//
// Usage:
// var scrape = require('./scrape.js');
// var url = 'http://www.yellowpages.com/west-monroe-la/mip/armstrong-cricket-farm-5032804?lid=5032804'
// 
// scrape(url, function(err, data) {
//   if (err) {
//     console.error(err);
//     return 1;
//   }
// 
//   console.log(data);  => { name: 'Armstrong Cricket Farm', phone: '(318)387-6000' }
// });

// core modules
var http = require('http');

// npm packages
var cheerio = require('cheerio')

module.exports = function(url, cb) {
  var data = {name: null, phone: null};
  var html = '';

  http.get(url, function(res) {
    res.on('data', function (chunk) {
      html += chunk;
    });

    res.on('end', function (chunk) {
      var $ = cheerio.load(html);

      data.name = $('.fn.org a').text();
      data.phone = $('.phone').text();
      data.phone = data.phone.replace(/\s/g, '');  // removing new lines

      cb && cb(null, data);
    });
  }).on('error', function(e) {
      cb && cb(e.message);
  });
};
```

run the test again with `node test/scrape.js` and hopefuly you should see:

```bash
on 13
# scrape business name and phone
ok 1 should be equivalent

1..1
# tests 1
# pass  1

# ok
```

There are a few moving parts here. Let's eloborate.  
What we did is created a function and assigning it to module.exports.
What is that module.export? module.exports is an object that will be available to whoever will require this file. So for example `x = require('./scrape.js')` means that x will hold that function.

Our function accepts 2 arguments, url and callback. The callback is needed since the scraping is asynchronous and when we have the information we need we want to call that callback with the data we scraped.

Previously we just printed the data to the console, but now we don't want to output anything. we just call the callback that was passed and it's up to the client that uses this module to decide what to do with this information.

Now you can also run the node repl by typing `node` and test the module:

```js
> x = require('./scrape.js')
> x('http://www.yellowpages.com/west-monroe-la/mip/armstrong-cricket-farm-5032804?lid=5032804', function(err, data){console.log(data)})
> { name: 'Armstrong Cricket Farm', phone: '(318)387-6000' }
```

Tomorrow we will publish this module to NPM, so anyone will be able to use it by running `npm install scrapy`.