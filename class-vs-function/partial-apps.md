Today I'll talk about coding style in JavaScript and introduce a new concept - partial application.

A lot of developers that are coming to JS from OO languages like Ruby tend to organize their JS code base using objects that carry some state and functions in them. This style can be achieved in JS by using the new keyword on a constructor function (as a convention, always capitalize the first character of that function). Here is an example:

```js
'use strict';

function Behavior(config) {
  this.verbose = config.verbose,
  this.talk = function () {
    if (this.verbose) {
      console.log('I AM SCREAMING!');
    } else {
      console.log('i am a bit more polite');
    }
  }
}

var foo = new Behavior({verbose: true});
foo.talk();

// output: I AM SCREAMING!
```

Behavior is acting as a class, verbose is a state in that class and talk is some sort of a method in that class.

But javascript can be written in a more functional way, which is considered more idiomatic. instead of using object with state, we can use function that carry state with them (that's what closures are). Here is the same example but using a closure to keep the value of verbose.

```js
'use strict';

function behavior(config) {
  return function () {
    if (config.verbose) {
      console.log('I AM SCREAMING!');
    } else {
      console.log('i am a bit more polite');
    }
  }
}

var talk = behavior({verbose: true});
talk();

// output: I AM SCREAMING!
```

Now talk holds a function that can access the config object since it's was passed into the external function. The closure 'encloses' the variables that were available at the creation time of the inner function.

There is a name for the last example. it's called **partial application**.  
Whenever you have a function that accepts some arguments, and returning another function that returns fewer arguments (since the rest are bound to the inner function) you have a partial application.

Tomorrow (unless someone have a special request for a daily email) I'll take the 'scrapy' package we built and show you a good use case for using a partial application.
