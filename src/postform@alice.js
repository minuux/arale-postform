define(function(require, exports, module) {
    var Postform = require("./postform");
    Postform.implement({
        errors: function(res) {
            var self = this;
            self.$form.find('.ui-form-item-error').removeClass('ui-form-item-error');
            self.$form.find('.ui-form-explain').hide().html('');
            //纠结..只能这样一个一个input处理了
            self.$form.find('input[name],textarea[name]').css({
                'color': '#595959',
                'border-color': '#c1c1c1'
            })
            self.$.each(res.msgs, function(field_name, field_msg) {
                self.$form.find('input[name=' + field_name + '],select[name=' + field_name + '],textarea[name=' + field_name + ']')
                    .css({
                        'color': 'red',
                        'border-color': 'red'
                    })
                    .parents('.ui-form-item:first')
                    .addClass('ui-form-item-error')
                    .find('.ui-form-explain[data-field-name=' + field_name + ']').html('<i class="iconfont">&#xf045;</i>' + field_msg).show();
            });
        }
    });

    module.exports = Postform;
});
