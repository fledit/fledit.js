#  [![NPM version][npm-image]][npm-url] [![Build Status][travis-image]][travis-url] [![Dependency Status][daviddm-image]][daviddm-url]

:warning: **WIP**

Fledit.io client for node and the browser. This library allows you to save and retreive data instantanetly in Fledit.


## Install

### For Node.js or IO.js

```sh
$ npm install --save fledit
```

### For the browser

```sh
$ bower install --save fledit
```

## Usage

```js
// Only if you're using Fledit in server-side
var Fledit = require('fledit');

// Get an existing file from Fledit.io
var file = new File("54f9f00f509e85d4040ba535");
// Wait for the file to be loaded
file.once("complete", function(file) {
  // The complete function will receive a Fledit instance.
  console.log(file);
});

// Create a new file on Fledit.io
// and wait for the file to be loaded
File.create({ foo: 'Bar' }).once("complete", function(file) {
  // The complete function will receive a new Fledit instance.
  console.log('Should prompt 'Bar' to the console.', File.content.foo);
  // You can change the file like any Javascript object:
  file.content.foo = 'Like crazy';
  // And set a name as well
  file.name = 'This is a pretty cute name';
  // Then make the data persist
  file.save();
});

```


## License

MIT © [Fledit](http://fledit.io)


[npm-image]: https://badge.fury.io/js/fledit.svg
[npm-url]: https://npmjs.org/package/fledit
[travis-image]: https://travis-ci.org/fledit/fledit.js.svg?branch=master
[travis-url]: https://travis-ci.org/fledit/fledit.js
[daviddm-image]: https://david-dm.org/fledit/fledit.js.svg?theme=shields.io
[daviddm-url]: https://david-dm.org/fledit/fledit.js
