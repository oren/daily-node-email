'use strict';

// 1) Object Oriented 
// classes are state with functions
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

// ------------------------

// 2) idiomatic js - partial application
// closure is a function with state
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

// ------------------------

// 3) same as #2, but with bind()
function behavior2(config) {
  if (config.verbose) {
    console.log('I AM SCREAMING!');
  } else {
    console.log('i am a bit more polite');
  }
}

var talk = behavior2.bind(null, {verbose: true});
talk();

// ------------------------

// 4) same as #2, but with apply()
function behavior3(config) {
  if (config.verbose) {
    console.log('I AM SCREAMING!');
  } else {
    console.log('i am a bit more polite');
  }
}

behavior3.apply(null, [{verbose: true}]);

// ------------------------

// 5) same as #2, but with call()
function behavior3(config) {
  if (config.verbose) {
    console.log('I AM SCREAMING!');
  } else {
    console.log('i am a bit more polite');
  }
}

behavior3.call(null, {verbose: true});

// watch the following 3 minutes: http://youtu.be/seX7jYI96GE#t=19m04s
