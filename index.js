var $ = require("jquery"),
    Base = require('arale-base');

var Postform = Base.extend({
    attrs: {
        form: '#test', //需要判断一下是否为字符串，如果是jquery对象的话就不需要处理了
        action: location.href, //接收POST数据的路径
        trigger: null
    },
    initialize: function(config) {
        Postform.superclass.initialize.call(this, config);
        this.setup();
    },
    setup: function() {
        var self = this;
        this.$form = $(this.get('form'));
        if (this.get('trigger') === null) {
            this.set('trigger', this.get('form') + ' [type=submit]');
        }
        this.$ = $;
        $(document).on('click', this.get('trigger'), function() {
            self.submit();
        });
    },
    getdata: function() {
        var data = {};
        $(this.get('form')).find('input[name][type!=checkbox][type!=radio],textarea[name],select[name],input[name][type=radio]:checked').each(function(i, n) {
            var $obj = $(n);
            if ($obj.attr('placeholder') === $obj.val()) {
                data[$obj.attr('name')] = '';
            } else {
                data[$obj.attr('name')] = $obj.val();
            }
        });
        $(this.get('form')).find('input[name][type=checkbox]:checked').each(function(i, n) {
            var $obj = $(n);
            if (data[$obj.attr('name')] === undefined) {
                data[$obj.attr('name')] = $obj.val();
            } else {
                if (typeof(data[$obj.attr('name')]) === 'string') {
                    data[$obj.attr('name')] = [data[$obj.attr('name')]];
                }
                data[$obj.attr('name')].push($obj.val());
            }
        });
        return data;
    },
    submit: function() {
        var result;
        $.ajax({
            async: false,
            url: this.get('action'),
            data: this.getdata(),
            type: 'post',
            dataType: 'json'
        }).done(function(res) {
            result = res;
        });
        return result;
    }
});

module.exports = Postform;
