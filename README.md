# arale-postform

## Install

```js
$ npm install arale-postform --save

```

## Usage

```js
var Postform = require('arale-postform');
new Postform({
            form: '#form-id'
        }).after('submit', function(res) {
           console.log(res);
        });
```
