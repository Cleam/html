/**
 * 加载新闻数据
 * @author lizhigao(lizhigao@021.com)
 * @date 2016-06-02
 */
!function($, win, doc, undefined){
    $(function(){
        // var dataUrl = 'http://123.59.62.164/morenewsforeastday/morenews',
        var dataUrl = 'http://recmdax.dfshurufa.com/morenewsforeastday/morenews',
            $ttContainer = $('#toutiao_container'),
            $contentWrap = $('<div id="_1X2jnq9Z"></div>'),
            timer = null,
            title = encodeURIComponent($('.title')[0] ? $('.title')[0].innerHTML : ($('title')[0] ? $('title')[0].innerHTML : ''));

        // 运行初始化方法
        init();

        /**
         * 初始化
         * @return {[type]} [description]
         */
        function init(){
            // 添加样式
            addStyle();
            // 将新增的DOM添加到html中
            $ttContainer.append($contentWrap);
            // 加载数据并生成新闻
            loadData();
        }

        /**
         * 加载数据
         * @return {[type]} [description]
         */
        function loadData(){
            $.ajax({
                url: dataUrl,
                data: {
                    // location.protocol + '//' + location.hostname + location.pathname + location.port ? ( ':' + location.port ) : ''
                    url: win.location.pathname,
                    // url: 'u1ai554076_t92.html',
                    title: title
                },
                dataType: 'jsonp',
                jsonp: "jsonpcallback",
                timeout: 8000,
                beforeSend: function(){
                },
                success: function(data){
                    getnerateNews(data);
                },
                error: function(jqXHR, textStatus){
                	timer && clearTimeout(timer);
                    timer = setTimeout(function(){
                        loadData();
                    }, 2000);
                    console.error(textStatus);
                },
                complete: function(){
                }
            });
        }

        /**
         * 生成新闻信息流
         * @param  {Array} data 新闻数据
         * @return {[type]}      [description]
         */
        function getnerateNews(data){
            var d = data ? data.data : null;
            if (d && d.length > 0) {
                var i = 0,
                    len = d.length;
                for (i = 0; i < len; i++) {
                    var item = d[i],
                        topic = item['topic'],
                        imgSize = item['miniimg_size'] || 0,
                        miniImg = item['miniimg'],
                        url = item['url'],
                        date = item['date'];
                    date = getSpecialTimeStr(date);
                    date = date ? date : '';
                    if(imgSize == '0'){     // 无图
                        $contentWrap.append('<a href="' + url + '" class="E2NWm0PE" data-id="c7ln63t">'
                                + '<div class="_3lB9sJFp KTkx3yR_">'
                                    + '<div class="ufuHpmO2">' + topic + '</div>'
                                    + '<div class="_2ubaoT7H"><span class="_3xv_6CpG">' + date + '</span> </div>'
                                + '</div>'
                            + '</a>');
                    } else if(imgSize < 3) {   // 单图
                        $contentWrap.append('<a href="' + url + '" class="E2NWm0PE" data-id="cn0pkxg">'
                            + '<div class="_3lB9sJFp">'
                                + '<div class="ufuHpmO2">' + topic + '</div>'
                                + '<div class="_2ubaoT7H"> <span class="_3xv_6CpG">' + date + '</span> </div>'
                            + '</div>'
                            + '<div class="_15JxMekq">'
                                + '<div class="oAQjEOGR"></div>'
                                + '<div class="_294YtkvS" style="background-image:url(' + miniImg[0].src + ');"> </div>'
                                + '<div class="_3eR2FVDh" style=""> </div>'
                            + '</div>'
                        + '</a>');
                    } else {    // 三图
                        $contentWrap.append('<a href="' + url + '" class="E2NWm0PE" data-id="c5hxtyx">'
                            + '<div class="ufuHpmO2">' + topic + '</div>'
                            + '<div class="_15yLEhVa">'
                                + '<ul class="_1nhff0ZO">'
                                    + '<li class="_23GdR88y">'
                                        + '<div class="oAQjEOGR"></div>'
                                        + '<div class="_294YtkvS" style="background-image:url(' + miniImg[0].src + ');"></div>'
                                        + '<div class="_3eR2FVDh" style=""> </div>'
                                    + '</li>'
                                    + '<li class="_23GdR88y">'
                                        + '<div class="oAQjEOGR"></div>'
                                        + '<div class="_294YtkvS" style="background-image:url(' + miniImg[1].src + ');"></div>'
                                        + '<div class="_3eR2FVDh" style=""> </div>'
                                    + '</li>'
                                    + '<li class="_23GdR88y">'
                                        + '<div class="oAQjEOGR"></div>'
                                        + '<div class="_294YtkvS" style="background-image:url(' + miniImg[2].src + ');"></div>'
                                        + '<div class="_3eR2FVDh" style=""> </div>'
                                    + '</li>'
                                + '</ul>'
                            + '</div>'
                            + '<div class="_2ubaoT7H"> <span class="_3xv_6CpG" data-stamp="1463846400000">' + date + '</span> </div>'
                        + '</a>');
                    }
                }
            } else {
            	timer && clearTimeout(timer);
                timer = setTimeout(function(){
                    loadData();
                }, 2000);
            }
        }

        /**
         * 计算指定时间与当前时间的时间差 并转换成相应格式字符串
         * 如：xx分钟前，xx小时前，昨天 xx:xx，前天 xx:xx，xx-xx xx:xx
         * @return {[type]} [description]
         */
        function getSpecialTimeStr(str) {
            var targetTime = strToTime(str);
            if (!targetTime) {
                return false;
            }
            var currentTime = new Date().getTime();
            var tdoa = Number(currentTime - targetTime),
                monthTime = 30 * 24 * 60 * 60 * 1000, // 1个月
                dayTime = 24 * 60 * 60 * 1000, // 1天
                hourTime = 60 * 60 * 1000, // 1小时
                minuteTime = 60 * 1000, // 1分钟
                h = 0;

            if(tdoa >= monthTime){  // 月
                return Math.floor(tdoa / monthTime) + '个月前';
            } else if (tdoa >= dayTime) { // 天
                h = tdoa / dayTime;
                if (h > 2) {
                    // return timeToString(tdoa);
                    return Math.floor(h) + '天前';
                } else if (h > 1) {
                    return '前天';
                } else {
                    return '昨天';
                }
            } else if (tdoa >= hourTime) { // 小时
                return Math.floor(tdoa / hourTime) + '小时前';
            } else if (tdoa >= minuteTime) {
                return Math.floor(tdoa / minuteTime) + '分钟前';
            } else {
                return '最新';
                // return Math.floor(tdoa / 1000) + '秒前';
            }
        }

        /**
         * 字符串转换成时间（毫秒）
         * @param  {[type]} str 时间字符串（格式：2016-02-26 09:12）
         * 注意：iphone不支持（格式：2016-02-26 09:12）需要转换成：（格式：2016/02/26 09:12）
         * @return {[type]}     [description]
         */
        function strToTime(str) {
            try {
                return Date.parse(str.replace(/-/g, "/"));
            } catch (e) {
                console.error(e);
                return false;
            }
        }

        /**
         * 添加样式
         */
        function addStyle() {
            var styleCode = '#_1X2jnq9Z,#_1X2jnq9Z *{background-attachment:scroll;background-color:transparent;background-image:none;background-position:0 0;background-repeat:repeat;background:0;border:0;border-collapse:separate;border-spacing:0;border:0;bottom:auto;caption-side:top;clear:none;clip:auto;color:#333;content:normal;cursor:auto;direction:ltr;display:inline;float:none;font-size:0;height:auto;left:auto;letter-spacing:normal;line-height:normal;list-style-image:none;list-style-position:outside;list-style-type:disc;margin:0;max-height:none;max-width:none;min-height:0;min-width:0;outline:0;overflow:visible;padding:0;position:static;right:auto;table-layout:auto;text-align:start;text-decoration:none;text-indent:0;text-transform:none;top:auto;vertical-align:baseline;visibility:visible;white-space:normal;width:auto;word-break:normal;word-spacing:normal;word-wrap:normal;z-index:auto;box-sizing:content-box;resize:none;text-overflow:clip;font-size-adjust:none;font-weight:400;transition:none;transform:none}#_1X2jnq9Z{clear:both}#_1X2jnq9Z,#_1X2jnq9Z div,#_1X2jnq9Z h1,#_1X2jnq9Z h2,#_1X2jnq9Z h3,#_1X2jnq9Z p{display:block}#_1X2jnq9Z ul,#_1X2jnq9Z ul li{list-style:none;display:block}@-webkit-keyframes _3DQ1H-z2{0%{-webkit-transform:rotate(0)}to{-webkit-transform:rotate(1turn)}}@keyframes _3DQ1H-z2{0%{transform:rotate(0)}to{transform:rotate(1turn)}}#_1X2jnq9Z ._2K8CDrqX{display:none;border-left:12px solid #f94a47;padding-left:.5em;font-size:18px;line-height:1.5;color:#999}#_1X2jnq9Z .E2NWm0PE{display:block;-webkit-user-select:none;-webkit-tap-highlight-color:rgba(0,0,0,0);padding:12px 0;border-bottom:1px solid #efefef}#_1X2jnq9Z .E2NWm0PE:after{content:"";display:table;clear:both}#_1X2jnq9Z .E2NWm0PE:last-child{border-bottom:0}#_1X2jnq9Z .ufuHpmO2{font-size:14px;color:#333;line-height:1.125em;display:-webkit-box;display:box;text-overflow:ellipsis;overflow:hidden;-webkit-box-orient:vertical;box-orient:vertical;line-height:1.125em;-webkit-line-clamp:2}#_1X2jnq9Z .E2NWm0PE:visited .ufuHpmO2{color:#999}#_1X2jnq9Z ._15yLEhVa{margin-top:12px}#_1X2jnq9Z ._1nhff0ZO ._23GdR88y{display:inline-block;box-sizing:border-box;width:33.3%;position:relative;overflow:hidden}#_1X2jnq9Z ._1nhff0ZO ._23GdR88y:first-child{border-right:2px solid transparent}#_1X2jnq9Z ._1nhff0ZO ._23GdR88y:last-child{border-left:2px solid transparent}#_1X2jnq9Z ._1nhff0ZO ._23GdR88y:nth-child(2){border-right:1px solid transparent;border-left:1px solid transparent}#_1X2jnq9Z ._294YtkvS{position:absolute;top:0;left:0;bottom:0;right:0;background-position:50%;background-size:cover;z-index:1}#_1X2jnq9Z .oAQjEOGR{width:100%;padding-top:65.26%}#_1X2jnq9Z ._2ubaoT7H{margin-top:12px}#_1X2jnq9Z ._2ubaoT7H span{vertical-align:middle;font-size:14.4px;color:#999;display:inline-block}#_1X2jnq9Z ._2ubaoT7H span._1QDMBn-r{width:7em;border:1px solid;color:#f94a47;text-align:center;border-radius:4px;box-sizing:border-box;padding:2px;margin-right:.5em}#_1X2jnq9Z ._2ubaoT7H span._3xv_6CpG{padding-top:1px}#_1X2jnq9Z ._3lB9sJFp{float:left;width:66.6%}#_1X2jnq9Z ._3lB9sJFp.KTkx3yR_{float:none;width:100%}#_1X2jnq9Z ._15JxMekq{float:left;width:33.3%;position:relative;border-left:3px solid transparent;box-sizing:border-box;overflow:hidden}#_1X2jnq9Z ._15JxMekq ._2jRqJjIl{position:absolute;height:16px;font-size:12px;bottom:0;right:0;padding:4px 8px 4px 30px;z-index:1;color:#fff;background:rgba(0,0,0,.5) url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADAAAAAkCAYAAADPRbkKAAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAAZVJREFUWMNj+P//P8NQxgyjHhhEHmAF4lIgvgrEP//TB3wH4tNAnAjEjJR4gA2Id/8fWDCfHE/AGDX/BwcII9LhoBjbAsR+MIFbSIZMBWJuOqVhISDehGT3VgLqOYB4DpL6jzCJP0iCSnTOiM5Idl/Co04OiE+hRxlMEhnI0dkDNkR4wAmIX2FLc4PBA6JA/AEpIyPLgTJ1CVoK+TvYPADC0kDsAsQsSGI8QLwKzW0vgNh3MHoAHatD6yNkcAzqUf7B7gF/UOmC5qZpQMwOlR+0HmAG4hYg/odWUyegqRuUHmjAkmQeALERFrWDzgOGWEpHULNGGId6/sFcD4CKyDZocmIYih64RIT6UQ+MemDUA0PEA2pAPBOIU9F6akPGA1uRxFdCG3dDygPT0dx1BRorQ8YD7Fg8Aeo3xA61TJwEbdT9H6w9MmJKIWMgfojPA0OhUy8CxHtweeA22rAK1yAdVgE18jqR+gxvh+rAljcQLwRix2EztAgb3C0D4mtA/ItOjv4BxGegJQ1Fg7uj8wOjHiATAwCwU/nx3nM/GAAAAABJRU5ErkJggg==) no-repeat;background-position:8px;background-size:16px;line-height:1.5}#_1X2jnq9Z ._3eR2FVDh{color:#f94a47;position:absolute;content:" ";width:16px;height:16px;top:50%;left:50%;margin-left:-10px;margin-top:-10px;border:2px solid;border-radius:50%;border-left-color:transparent;z-index:0;-webkit-animation:_3DQ1H-z2 .8s linear infinite;animation:_3DQ1H-z2 .8s linear infinite}@media screen and (min-width:360px){#_1X2jnq9Z .ufuHpmO2{font-size:15px}}@media screen and (min-width:401px){#_1X2jnq9Z .ufuHpmO2{font-size:17px}}@media screen and (min-width:480px){#_1X2jnq9Z .ufuHpmO2{font-size:21px}}@media screen and (min-width:640px){#_1X2jnq9Z .ufuHpmO2{font-size:28px}}@media screen and (min-width:720px){#_1X2jnq9Z .ufuHpmO2{font-size:30px}}@media screen and (min-width:768px){#_1X2jnq9Z .ufuHpmO2{font-size:34px}}@media screen and (min-width:960px){#_1X2jnq9Z .ufuHpmO2{font-size:42px}}@media screen and (min-width:1024px){#_1X2jnq9Z .ufuHpmO2{font-size:44px}}@media screen and (min-width:1280px){#_1X2jnq9Z .ufuHpmO2{font-size:56px}}';
            var head = document.getElementsByTagName('head')[0],
                css = document.createElement('style');
            css.setAttribute('type', 'text/css'); 
            css.innerHTML =  styleCode;
            head.appendChild(css);
        }

    });
}(jQuery, window, document);
