var sayHi = function (who) {
  var str = "Hello" + (who ? ", " + who : "") + "!";
  console.log(str);
};

// sayHi.apply(null, ["hello"]); // "Hello, hello!"

var alien = {
  sayHi: function (who) {
    var str = "Helloooo" + (who ? ", " + who : "") + "!";
    console.log(str);
  }
};

// alien.sayHi('world'); // "Hello, world!"
sayHi.apply(alien, ["humans"]); // "Hello, humans!"
