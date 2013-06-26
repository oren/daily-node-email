# Versioning dependencies in Node

TLDR

* If you write an application - check-in node_modules in git
* If you write a library (npm package) - don't check-in and use semantic versioning (x.y.z) in package.json.

***

When deploying a Node.js application you want to make sure the exact version of packages you use during development will be used on production.

There are a 2 ways to achieve that:

1. Check-in node_modules into git.
1. [`npm shrinkwrap`][1].

## Check-in node_modules
**Pro**

1. Guarantee that you deploy identical versions.
1. Less external dependencies during deploy time. If github (or our internal npm repository) is down, you can still deploy your app.
1. Thinking of your dependencies as a first-class citizens. Using a package that someone else wrote is in integral part of your code-base and should be treated equally.

**Cons**

1. Compiled dependencies (solved by your new friend [`npm rebuild`][2]).

## Shrinkwrap
**Pro**

1. You are more DRY (don't repeat yourself) - There is only one place where you define your project's packages, and it's the npm-shrinkwrap.json file.
1. Some commits might look ugly (solved by commiting dependency changes separately)

**Cons**

1. Only top level dependencies will be locked. if your dependency have it's own dependencies, they might get updated and you are at the mercy of the npm package developers to keep the semantic versioning in tact.
1. It's possible to publish the same version of npm package, so for example, if TJ (express.js developer) publish another version of express and forget to bump the version. You might end up with newer version of express in production environment. Not fun!

### How to use shrinkwrap

type `npm shrinkwrap`

If you get an error about missing repository in package.json add this to package.json:

```js
  "repository" : {
    "type" : "git",
    "url" : "git@github.com:citrusbyte/yp.git"
  },
```

A file named **npm-shrinkwrap.json** will be created created. It's similar to Gemfile.lock - check that file into git and anybody else on the team will get the exact version of dependencies you just wraped simply by typing `npm install`. Rerun this command whenever you make a change in your dependencies.

One last thing, the shrinkwrap command looks at your node_module folder when it creates the wrap file, so don't piss her off by trying to run it before `npm install`.

[1]: https://npmjs.org/doc/shrinkwrap.html "https://npmjs.org/doc/shrinkwrap.html"
[2]: https://npmjs.org/doc/rebuild.html "https://npmjs.org/doc/rebuild.html"


Relevant links:

* [good post about the topic](http://www.futurealoof.com/posts/nodemodules-in-git.html)
* [npm documentation - shrinkwrap](https://npmjs.org/doc/shrinkwrap.html)
* [npm documentation - rebuild](https://npmjs.org/doc/rebuild.html)
