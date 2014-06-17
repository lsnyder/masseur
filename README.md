# Masseur

Simple library for data transformation.

## Install

```
npm install masseur --save
```

## Usage

```js
var Transform = require('masseur').Transform;
var Processors = require('masseur').Processors;

var transformer = (new Transform())
  // copy directly from input
  .key('userName')

  // copy from input object's `first_name` field
  .key('firstName')
  .src('first_name')
  // convert name to lowercase
  .use(Processors.lowercase)
  // filter out black listed words
  .use(Processors.filter);


// transform a single object
var output = trasformer.transform(input);

// transform a stream of inputs
var transformStream = transfomer.createStream();
transformStream.pipe(inputStream);

```
