var fs = require('fs');
var source = fs.createReadStream(__filename);
var target = fs.createWriteStream('output-file');
source.pipe(target);

// 1) stare at this program and try to guess what it's doing.
// 2) copy this into index.js and run it with node index.js
// 
// a file named output-file was created, what's in it? isn't it cute?!
// let's talk about what's going on there (old school - face to face) since streams are a core concept of node. 
