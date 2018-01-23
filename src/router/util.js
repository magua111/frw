!(function(){
	var util = {};
	util.rootPath = (function(){
		var curPath=window.document.location.href;
		var pathName=window.document.location.pathname;
		var pos=curPath.indexOf(pathName);
		var locationPath=curPath.substring(0,pos);
		var projectName=pathName.substring(0,pathName.substr(1).indexOf('/')+1);
		var rootPath=locationPath+projectName;
		return rootPath;
	})();
	/*获取URL上参数*/
	util.getParams = function () {//获取URL上的参数
        var p = decodeURIComponent(location.search.substr(1)),
            reg = /&?([^&=]+)=?([^&]*)/g;
        o = {};

        p.replace(reg, function (match, k, v) {
            o[k] = v;
        });

		var hash = location.hash.substr(1);
		if (!hash) {
			return o;
		}

		var hashURL = o.hashURL = {};
        hash.replace(reg, function (match, k, v) {
            hashURL[k] = v;
        });

		return o;
    }  
	/*模版函数*/
	var template = util.template = (function () {
        var templateSettings = {
                evaluate: /<@([\s\S]+?)@>/g,
                interpolate: /<@=([\s\S]+?)@>/g,
                escape: /<@-([\s\S]+?)@>/g
            },

            noMatch = /(.)^/,

            escapes = {
                "'": "'",
                '\\': '\\',
                '\r': 'r',
                '\n': 'n',
                '\t': 't',
                '\u2028': 'u2028',
                '\u2029': 'u2029'
            },
            escaper = /\\|'|\r|\n|\t|\u2028|\u2029/g;

        return function (text, data, settings) {
            var render;
            settings = $.extend({}, settings, templateSettings);

            // Combine delimiters into one regular expression via alternation.
            var matcher = new RegExp([
                (settings.escape || noMatch).source,
                (settings.interpolate || noMatch).source,
                (settings.evaluate || noMatch).source
            ].join('|') + '|$', 'g');

            // Compile the template source, escaping string literals appropriately.
            var index = 0;
            var source = "__p+='";
            text.replace(matcher, function (match, escape, interpolate, evaluate, offset) {
                source += text.slice(index, offset)
                    .replace(escaper, function (match) {
                        return '\\' + escapes[match];
                    });

                if (escape) {
                    source += "'+\n((__t=(" + escape + "))==null?'':escape(__t))+\n'";
                }
                if (interpolate) {
                    source += "'+\n((__t=(" + interpolate + "))==null?'':__t)+\n'";
                }
                if (evaluate) {
                    source += "';\n" + evaluate + "\n__p+='";
                }
                index = offset + match.length;
                return match;
            });
            source += "';\n";

            // If a variable is not specified, place data values in local scope.
            if (!settings.variable) source = 'with(obj||{}){\n' + source + '}\n';

            source = "var __t,__p='',__j=Array.prototype.join," +
                "print=function(){__p+=__j.call(arguments,'');};\n" +
                source + "return __p;\n";

            try {
                render = new Function(settings.variable || 'obj', source);
            } catch (e) {
                e.source = source;
                throw e;
            }

            if (data) return render(data);
            var template = function (data) {
                return render.call(this, data);
            };

            // Provide the compiled function source as a convenience for precompilation.
            template.source = 'function(' + (settings.variable || 'obj') + '){\n' + source + '}';

            return template;
        };
    })();
	util.dialog = (function () {
        var teml = [
            '<div class="modal">',
            '    <div class="modal-dialog">',
            '        <div class="modal-content">',
            '            <div class="modal-header">',
            '                <button type="button" class="close" data-dismiss="modal"><span aria-hidden="true">&times;</span><span class="sr-only">Close</span></button>',
            '                <h4 class="modal-title"><@=modelTitle@></h4>',
            '            </div>',
            '            <div class="modal-body">',
            '                <p><@=modelContent@></p>',
            '            </div>',
            '            <div class="modal-footer">',
            '                <a href="javascript:;" class="btn btn-default" data-dismiss="modal"><@=modelCancelBtnName@></a>',
            '                <a href="javascript:;" class="btn btn-primary"><@=modelOKBtnName@></a>',
            '            </div>',
            '        </div>',
            '   </div>',
            '</div>'
        ].join('');

        return function (opt) {
            var $dialog;

            opt = $.extend({}, {
                modelTitle: '',
                modelContent: '',
                modelCancelBtnName: '取消',
                modelOKBtnName: '确认'
            }, opt);

            $dialog = $(template(teml, {
                modelTitle: opt.modelTitle,
                modelContent: opt.modelContent,
                modelCancelBtnName: opt.modelCancelBtnName,
                modelOKBtnName: opt.modelOKBtnName
            }));

            $dialog.modal({
                backdrop: true,
                keyboard: false,
                show: true
            }).on('click', '.btn-primary', function(){
                var bool;
                opt.ok && (bool = opt.ok());

                if (bool === false) return bool;

                $dialog.modal('hide');
                $dialog.remove();
            });

            var dialog_modal=$dialog.find(".modal-dialog");
            var offset=dialog_modal.offset();
            var half_height=parseFloat(dialog_modal.height())/2;
            var half_width=parseFloat(dialog_modal.width())/2;


             dialog_modal.css({"position":"absolute","top":"50%","left":"50%","margin-left":-half_width,"margin-top":-half_height});

            $dialog.find('.btn-default').removeAttr('data-dismiss');

            $dialog.on('click', '.btn-default', function(){
                var bool;
                opt.cancel && (bool = opt.cancel());

                if (bool === false) return bool;
                $dialog.modal('hide');
                $dialog.remove();
            });

            $dialog.find('.close').removeAttr('data-dismiss');
            $dialog.on('click', '.close', function(){
                var bool;
                opt.close && (bool = opt.close());

                if (bool === false) return bool;
                $dialog.modal('hide');
                $dialog.remove();
            });

            return $dialog;

        }
    }());
	window.util = util;
})();