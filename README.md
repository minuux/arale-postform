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


## extend
 use bootstrap3 show errors
```
var $ = require("jquery");
var Postform = require("postform");
Postform.implement({
        errors: function(res) {
            var self = this;

            self.$form.find('.has-error').removeClass('has-error').find('.help-block').html('');
            self.$form.find('.ui-form-explain').html('');
            $.each(res.msgs, function(field_name, field_msg) {
                self.$form.find('input[name=' + field_name + '],select[name=' + field_name + '],textarea[name=' + field_name + ']')
                        .parents('.form-group:first')
                        .addClass('has-error')
                        .find('.help-block')
                        .html('<i class="iconfont">&#xf0155;</i>' + field_msg);
            });
        }
});

 module.exports = Postform;

```