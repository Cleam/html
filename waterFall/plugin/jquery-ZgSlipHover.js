/**
 * Created by lizhigao on 2015/8/31.
 */
;(function($, window, document, undefined){

    var pluginName = 'ZgSlipHover';
    var defauts = {
        target: 'img',
        duration: 'fast',
        caption: 'title'
    };

    function ZgSlipHover(element, options){
        this._defaults = defauts;
        this._name = pluginName;
        this.element = element;
        this.settings = $.extend({}, defauts, options);
        //console.info(this.settings);
        this.init();
    }

    ZgSlipHover.prototype = {
        init: function(){
            var scope = this,
                target = scope.settings.target;
            $(scope.element).off('mouseenter mouseleave').on('mouseenter mouseleave', target, function(ev){
                var e = ev || window.event;
                var $this = $(this).css('overflow', 'hidden');
                // 作一个判断，目标对象的定位方式不能是static，否则浮层定位出错。
                if($this.css('position') == 'static'){
                    $this.css('position', 'relative');
                }
                // 鼠标放上去，创建一个div遮罩层，并根据鼠标进入的位置判断动画。
                var dir = scope.getDirection($this, e);
                var $overlay = $this.find('.zgsliphover-overlay');
                if(e.type === 'mouseenter'){
                    if(!$overlay.length){
                        $overlay = scope.createOverlay($this, dir);
                    }
                    scope.slideIn($overlay);
                } else {
                    scope.slideOut($overlay, dir);
                }
            });
        },
        /**
         * 遮罩层滑入动画
         * @param $overlay 遮罩层
         * @returns {ZgSlipHover}
         */
        slideIn: function($overlay){
            $overlay.stop().animate({
                left: 0,
                top: 0
            }, this.settings.duration);
            return this;
        },
        /**
         * 遮罩层滑出动画
         * @param $overlay 遮罩层
         * @param dir 滑出方向
         * @returns {ZgSlipHover}
         */
        slideOut: function($overlay, dir){
            var left, top, scope = this;
            switch(dir){
                // from top
                case 0: left = '0'; top = '-100%'; break;
                // from right
                case 1: left = '100%'; top = '0'; break;
                // from bottom
                case 2: left = '0'; top = '100%'; break;
                // from left
                case 3: left = '-100%'; top = '0'; break;
                default : window.console.error('方向计算出错!');
            }
            $overlay.stop().animate({
                left: left,
                top: top
            }, scope.settings.duration, function(){
                // 移除遮罩
                scope.removeOverlay($overlay);
            });
            return this;
        },
        /**
         * 删除遮罩层
         * @param $overlay 遮罩层
         */
        removeOverlay: function($overlay){
            $overlay.remove();
        },
        /**
         * 创建遮罩层
         * @param $target 遮罩的目标
         * @param dir 遮罩层初始方向
         * @returns {jQuery} 遮罩层
         */
        createOverlay: function($target, dir){
            // 创建div遮罩层的位置根据鼠标进入的位置确定
            var left, top, caption,
                zIndex = $target.css('z-index'),
                $overlay = $('<div></div>');
            // 浮层方向
            switch(dir){
                // from top
                case 0: left = '0'; top = '-100%'; break;
                // from right
                case 1: left = '100%'; top = '0'; break;
                // from bottom
                case 2: left = '0'; top = '100%'; break;
                // from left
                case 3: left = '-100%'; top = '0'; break;
                default : window.console.error('方向计算出错!');
            }
            // 浮层内容
            //if(this.settings.caption == 'title'){
            //    caption = $target.attr('title');
            //} else {
            //    caption = $(this.settings.caption, $target)[0];
            //}
            //console.info(caption);
            //if(caption && $(caption).length){
            //    $overlay.html(caption).css({
            //
            //    });
            //}

            $overlay.addClass('zgsliphover-overlay').css({
                position: 'absolute',
                left: left,
                top: top,
                width: $target.outerWidth(),
                height: $target.outerHeight(),
                backgroundColor: 'black',
                filter: 'alpha(opacity=60)',    /* IE */
                '-moz-opacity': 0.6,            /* 老版Mozilla */
                '-khtml-opacity': 0.6,          /* 老版Safari */
                opacity: 0.6,                   /* 支持opacity的浏览器*/
                borderRadius: $target.css('border-radius'),
                zIndex: zIndex == +zIndex ? (zIndex + 1) : 999
            }).appendTo($target);
            return $overlay;
        },

        /**
         * 获取鼠标进入的方向
         * @param $target hover对象
         * @param event 事件对象
         * @returns {number} 0：从上方进入；1：从右方进入；2：从下方进入；3：从左方进入
         */
        getDirection: function($target, event) {
            //reference: http://stackoverflow.com/questions/3627042/jquery-animation-for-a-hover-with-mouse-direction
            var w = $target.width(),
                h = $target.height(),
                target = $target[0],
                // ie6\7\8不支持pageX、pageY
                x = ((event.pageX || (event.clientX + target.scrollLeft - target.clientLeft)) - $target.offset().left - (w / 2)) * (w > h ? (h / w) : 1),
                y = ((event.pageY || (event.clientY + target.scrollTop - target.clientTop)) - $target.offset().top - (h / 2)) * (h > w ? (w / h) : 1),
                direction = Math.round((((Math.atan2(y, x) * (180 / Math.PI)) + 180) / 90) + 3) % 4;
            return direction;
        }
    };

    /**
     * 添加为jQuery插件
     * @param options 用户配置参数
     * @returns {jQuery.ZgSlipHover} 插件对象
     */
    $.fn[pluginName] = function(options){
        this.each(function(){
            new ZgSlipHover(this, options);
        });
        return this;
    }

})(jQuery, window, document);
