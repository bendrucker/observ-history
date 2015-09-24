# observ-history [![Build Status](https://travis-ci.org/bendrucker/observ-history.svg?branch=master)](https://travis-ci.org/bendrucker/observ-history)

> Observable interface to the browser history API


## Install

```
$ npm install --save observ-history
```


## Usage

```js
var history = require('observ-history')

history(function (path) {
  //=> (popstate)  
})

history()
//=> current path

history.set(path)
//=> pushState
```

## API

#### `history([listener])` -> `function`

Returns an unlisten function.

##### listener

Type: `function`

A function to call with the current path when the history changes and a [`popstate` event](https://developer.mozilla.org/en-US/docs/Web/Events/popstate) is fired. If no function is passed, the current path is returned.

#### `history.set(path)` -> `undefined`

Updates the history by calling [`pushState`](https://developer.mozilla.org/en-US/docs/Web/API/History/pushState).


## License

MIT © [Ben Drucker](http://bendrucker.me)
