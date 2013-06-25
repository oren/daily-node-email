Recently we had a code review session and Andrew and Ronin showed us a bug fix that was related to 'this' in Javascript.

Here is my TLDR, based on this - http://tech.pro/tutorial/1192/avoiding-the-this-problem-in-javascript  

1. This.myFunction() will call myFunction() on whatever 'this' is at run-time. so 'this' might not be what you think it is.
1. Try avoid using 'this' if possible because it leads to bugs.
1. If you are using it, be aware that whenever you pass a callback that uses 'this', it might be a source for bugs so make sure to use any of the following (depend on the situation): .bind or .call or .apply or $.proxy
