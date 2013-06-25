This is part 2 of 'how to build a modular JavaScript app' or 'how to organize a JavaScript project' not sure what to title this.

Here is a reminder of Friday's email. we built a little app that can scrape a listing page and print the business name and it's phone. Here it is:

```js
// index.js

'use strict';

// core modules
var http = require('http');

// npm packages
var cheerio = require('cheerio')

var url = 'http://www.yellowpages.com/west-monroe-la/mip/armstrong-cricket-farm-5032804?lid=5032804'
var html = '';

http.get(url, function(res) {
  res.on('data', function (chunk) {
    html += chunk;
  });

  res.on('end', function (chunk) {
    var $ = cheerio.load(html);

    var name = $('.fn.org a').text();
    console.log(name);

    var phone = $('.phone').text();
    phone = phone.replace(/\s/g, '');
    console.log(phone);
  });
}).on('error', function(e) {
    console.log("Got error: " + e.message);
});

// output:
// Armstrong Cricket Farm
// (318) 387-6000
```

We want to separate our scrapper into it's own module so we can use it like this: 

```js
var scrape = require('scrape.js');
scrape('http://www.yellowpages.com/west-monroe-la/mip/armstrong-cricket-farm-5032804?lid=5032804');
```

The first question I am asking myself is if I want to start with the test or the code. I don't think it matters. sometimes I find it easier to code and add the test later, 
but sometimes it's easier to write the test first since it makes it easy to understand what you're actually building. Let's start with a test in this case.
I don't use any frameworks for unit test of Javascript/Node. I prefer to use small libraries instead. My prefered one is tape. install it with `npm install tape`.  
create a test directory and add this file and run it with `node test/scrape.js`

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
Error: Cannot find module '../scrape.js'
```

Notice the error. We don't have the file scrape.js. Also notice that the require function can be used for core modules (like http), npm packages (like cheerio) and also for your app specific modules, like the one we are about to create.  

Tomorrow we'll write the code that fix our test. 

Let's fix it by writing our modules. What we are going to do is copy the code from index.js into a new file (locate it in the root folder):

```js
// scrape.js

'use strict';

// module that scrape a webpage on YP and return business name and phone
//
// arguments: url and callback
// callback will be fired with { name: 'Armstrong Cricket Farm', phone: '(318) 387-6000' }
//
// usage:
// var scrape = require('./scrape.js');
// 
// var url = 'http://www.yellowpages.com/west-monroe-la/mip/armstrong-cricket-farm-5032804?lid=5032804'
// 
// scrape(url, function(err, data) {
//   if (err) {
//     console.error(err);
//     return 1;
//   }
// 
//   console.log(data);
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
Our function accepts 2 arguments, url and callback. The callback is needed since the scraping is asynchronous and when we have the information we need we want to call that callback and pass it the data we scraped.  
Previously we just printed the data to the console, now our module will be polite and well behaved - it use the callback to notify about errors or success, and it's up to the client that uses it to decide what to do with this information.
