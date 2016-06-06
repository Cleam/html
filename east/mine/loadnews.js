/**
 * 提供命名管理，管理全局变量。
 * 所有全局变量必须命名在GLOBAL里面的命名空间下，将变量冲突、覆盖问题降到最小。
 * @author lizhigao(lizhigao@021.com)
 * @date 2016-06-06
 * 
 */
var GLOBAL = (function(GLB, undefined){
    /**
     * 给创建命名空间提供一个统一接口
     * 调用方法：GLOBAL.namespace('Ie');这样便创建了一个ie的命名空间。
     * 创建完命名空间后，如果需要定义一个全局变量，方法如下：GLOBAL.Ie.isIe6;
     * 使用该变量的方法也是：GLOBAL.Ie.isIe6
     * @param str
     */
    GLB.namespace = function(str){
        var arr = str.split("."),o = GLB;
        for(var i = (arr[0] == "GLOBAL") ? 1 : 0; i < arr.length; i++){
            o[arr[i]] = o[arr[i]] || {};
            o = o[arr[i]];
        }
    };

    GLB.namespace('Cookie');
    GLB.namespace('Util');

    /* cookie扩展 */
    GLB.Cookie = {
        /**
         * 设置cookie
         * @param name 名称
         * @param value 值
         * @param expires 有效时间（单位：小时）（可选） 默认：24h
         */
        set: function(name, value, expires){
            var expTimes = expires ? (Number(expires) * 60 * 60 * 1000) : (24 * 60 * 60 * 1000); // 毫秒
            var expDate = new Date();
            expDate.setTime(expDate.getTime() + expTimes);
            var expString = expires ? '; expires=' + expDate.toUTCString() : '';
            var pathString = '; path=/';
            document.cookie = name + '=' + encodeURI(value) + expString + pathString;
        },
        /**
         * 读cookie
         * @param name
         */
        get: function(name){
            var cookieStr = '; ' + document.cookie + '; ';
            var index = cookieStr.indexOf('; ' + name + '=');
            if(index != -1){
                var s = cookieStr.substring(index + name.length + 3, cookieStr.length);
                return decodeURI(s.substring(0, s.indexOf('; ')));
            } else {
                return null;
            }
        },
        /**
         * 删除cookie
         * @param name
         */
        del: function(name){
            var exp = new Date(new Date().getTime() - 1);
            var s = this.read(name);
            if(s !== null) {
                document.cookie = name + '=' + s + '; expires=' + exp.toUTCString + '; path=/';
            }
        }
    };

    /* 公用的工具方法(头条H5) */
    GLB.Util = {
        /**
         * 获取url中参数的值
         * @param  {[type]} name 参数名
         * @return {[type]}      参数值
         */
        getQueryString: function(name){
            var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)", "i");
            var r = window.location.search.substr(1).match(reg);
            if (r != null) return decodeURI(r[2]);
            return null;
        },

        /**
         * 打乱数组
         * @param  {[type]} arr 目标数组
         * @return {[type]}     [description]
         */
        dislocateArr: function(arr) {
            return arr.sort(function() {
                return 0.5 - Math.random(); 
            });
        },

        /**
         * 计算指定时间与当前时间的时间差 并转换成相应格式字符串
         * 如：xx分钟前，xx小时前，昨天 xx:xx，前天 xx:xx，xx-xx xx:xx
         * @return {[type]} [description]
         */
        getSpecialTimeStr: function(str) {
            var targetTime = this.strToTime(str);
            if (!targetTime) {
                return false;
            }
            var currentTime = new Date().getTime();
            var tdoa = Number(currentTime - targetTime),
                dayTime = 24 * 60 * 60 * 1000, // 1天
                hourTime = 60 * 60 * 1000, // 1小时
                minuteTime = 60 * 1000; // 1分钟

            if (tdoa >= dayTime) { // 天
                var h = tdoa / dayTime;
                if (h > 2) {
                    return this.timeToString(tdoa);
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
        },
        /**
         * 字符串转换成时间（毫秒）
         * @param  {[type]} str 时间字符串（格式：2016-02-26 09:12）
         * 注意：iphone不支持（格式：2016-02-26 09:12）需要转换成：（格式：2016/02/26 09:12）
         * @return {[type]}     [description]
         */
        strToTime: function(str) {
            try {
                return Date.parse(str.replace(/-/g, "/"));
            } catch (e) {
                console.error(e);
                return false;
            }
        },

        /**
         * 时间戳转换为字符串
         * @param  {[type]} t 时间戳
         * @param  {[type]} splitStr 分隔符
         * @return {[type]}   [description]
         */
        timeToString: function(t, splitStr) {
            return this.dateToString(this.timeToDate(t), splitStr);
        },

        /**
         * 毫秒级时间转日期时间
         * @param  {[type]} t 毫秒时间戳
         * @return {[type]}   日期时间
         */
        timeToDate: function(t) {
            return new Date(t);
        },

        /**
         * 日期转字符串
         * @param  {[type]} d           日期时间
         * @param  {[type]} splitStr 分隔符
         * @return {[type]}             默认返回 yyyy-MM-dd HH:mm
         */
        dateToString: function(d, splitStr) {
            var year = d.getFullYear().toString(),
                month = (d.getMonth() + 1).toString(),
                day = d.getDate().toString(),
                h = d.getHours().toString(),
                m = d.getMinutes().toString();
            month = month.length > 1 ? month : ('0' + month);
            day = day.length > 1 ? day : ('0' + day);
            h = h.length > 1 ? h : ('0' + h);
            m = m.length > 1 ? m : ('0' + m);
            // var str = year + '-' + month + '-' + day + ' ' + h + ':' + m; // yyyy-MM-dd HH:mm
            var str = month + '-' + day + ' ' + h + ':' + m; // MM-dd HH:mm
            if (splitStr) {
                str = str.replace(/-/g, splitStr);
            }
            return str;
        },

        /**
         * 毫秒转成时间字符串
         * @param  {Number}  seconds 毫秒[必需]
         * @param  {Boolean} hasHour 是否需要区分小时[可选]
         * @return {String}          hasHour[true]: hh:mm:ss；否则[默认]：mm:ss。
         */
        msToTimestr: function(ts, hasHour){
           var seconds = (ts ? Number(ts) / 1000 : 0);
           return GLOBAL.Util.secondsToTimestr(seconds, hasHour);
        },

        /**
         * 秒转成时间字符串
         * @param  {Number}  seconds 秒[必需]
         * @param  {Boolean} hasHour 是否需要区分小时[可选]
         * @return {String}          hasHour[true]: hh:mm:ss；否则[默认]：mm:ss。
         */
        secondsToTimestr: function(seconds, hasHour){
            var hh, mm, ss;
            // 传入的时间为空或小于0
            if(seconds == null || seconds < 0 ){
                return;
            }
            seconds = Math.ceil(seconds);
            // 得到小时
            hh = seconds / 3600 | 0;
            seconds = parseInt(seconds) - hh * 3600;
            if(parseInt(hh) < 10){
                hh = '0' + hh;
            }
            // 得到分
            mm = seconds / 60 | 0;
            if(parseInt(mm) < 10){
                mm = '0' + mm;
            }
            // 得到秒
            ss = parseInt(seconds) - mm * 60;
            if(ss < 10){
                ss = '0' + ss;
            }
            if(hasHour){
                return hh + ':' + mm + ':' + ss;
            }
            return mm + ':' + ss;
        },

        /**
         * 获取滚动高度
         * @return {[type]} [description]
         */
        getScrollTop: function() {
            if (document.documentElement && document.documentElement.scrollTop) {
                return document.documentElement.scrollTop;
            } else if (document.body) {
                return document.body.scrollTop;
            }
        },

        /**
         * 获取文档高度
         * @return {[type]} [description]
         */
        getClientHeight: function() {
            if (document.body.clientHeight && document.documentElement.clientHeight) {
                return (document.body.clientHeight < document.documentElement.clientHeight) ? document.body.clientHeight : document.documentElement.clientHeight;
            } else {
                return (document.body.clientHeight > document.documentElement.clientHeight) ? document.body.clientHeight : document.documentElement.clientHeight;
            }
        },

        /**
         * browser的判断
         * @return {[type]} [description]
         */
        getBrowserType: function() {
            var agent = navigator.userAgent.toLowerCase();
            var browser_type = "";
            if (agent.indexOf("msie") > 0) {
                browser_type = "IE";
            }
            if (agent.indexOf("firefox") > 0) {
                browser_type = "firefox";
            }
            if (agent.indexOf("chrome") > 0 && agent.indexOf("mb2345browser") < 0 && agent.indexOf("360 aphone browser") < 0) {
                browser_type = "chrome";
            }
            if (agent.indexOf("360 aphone browser") > 0 || agent.indexOf("qhbrowser") > 0) {
                browser_type = "360";
            }
            if (agent.indexOf("ucbrowser") > 0) {
                browser_type = "UC";
            }
            if (agent.indexOf("micromessenger") > 0) {
                browser_type = "WeChat";
            }
            if ((agent.indexOf("mqqbrowser") > 0 || agent.indexOf("qq") > 0) && agent.indexOf("micromessenger") < 0) {
                browser_type = "QQ";
            }
            if (agent.indexOf("miuibrowser") > 0) {
                browser_type = "MIUI";
            }
            if (agent.indexOf("mb2345browser") > 0) {
                browser_type = "2345";
            }
            if (agent.indexOf("sogoumobilebrowser") > 0) {
                browser_type = "sogou";
            }
            if (agent.indexOf("liebaofast") > 0) {
                browser_type = "liebao";
            }
            if (agent.indexOf("safari") > 0 && agent.indexOf("chrome") < 0 && agent.indexOf("ucbrowser") < 0 && agent.indexOf("micromessenger") < 0 && agent.indexOf("mqqbrowser") < 0 && agent.indexOf("miuibrowser") < 0 && agent.indexOf("mb2345browser") < 0 && agent.indexOf("sogoumobilebrowser") < 0 && agent.indexOf("liebaofast") < 0 && agent.indexOf("qhbrowser") < 0) {
                browser_type = "safari";
            }
            return browser_type;
        },

        /**
         * OS的判断
         * @return {[type]} [description]
         */
        getOsType: function() {
            var agent = navigator.userAgent.toLowerCase();
            var os_type = "";
            if (/android/i.test(navigator.userAgent)) {
                var index = agent.indexOf("android");
                version = agent.substr(index + 8, 3);
                os_type = "Android " + version;
            }
            if (/(iPhone|iPad|iPod|iOS)/i.test(navigator.userAgent)) {
                var index = agent.indexOf("os");
                version = agent.substr(index + 3, 3);
                os_type = "iOS " + version;
            }
            if (/Linux/i.test(navigator.userAgent) && !/android/i.test(navigator.userAgent) && !/(iPhone|iPad|iPod|iOS)/i.test(navigator.userAgent)) {
                os_type = "Linux";
            }
            if (/windows|win32/i.test(navigator.userAgent)) {
                os_type = "windows32";
            }
            if (/windows|win32/i.test(navigator.userAgent)) {
                os_type = "windows64";
            }
            return os_type;
        },

        /**
         * 获取当前手机屏幕分辨率的高宽
         * @return {json} {w: xxx, h: xxx}
         */
        getPixel: function(){
            var width = window.screen.width;
            var height = window.screen.height;
            return {w: width, h: height};
        },

        /**
         * 获取字符串字节数
         * @param  {[type]} str [description]
         * @return {[type]}     [description]
         */
        getBytes: function(str){
            var byteLen=0,len=str.length;
            if(str){
                for(var i=0; i<len; i++){
                    if(str.charCodeAt(i)>255){
                        byteLen += 2;
                    }
                    else{
                        byteLen++;
                    }
                }
                return byteLen;
            }
            else{
                return 0;
            }
        },

        /**
         * Javascript获取页面来源(referer)
         * @from http://www.au92.com/archives/javascript-get-referer.html
         * @return {[type]} [description]
         */
        getReferrer: function() {
            var referrer = '';
            try {
                referrer = window.top.document.referrer;
            } catch(e) {
                if(window.parent) {
                    try {
                        referrer = window.parent.document.referrer;
                    } catch(e2) {
                        referrer = '';
                    }
                }
            }
            if(referrer === '') {
                referrer = document.referrer;
            }
            return referrer;
        },

        /**
         * 获取url（排除url中参数）
         * @return {[type]} [description]
         */
        getUrlNoParams: function() {
            var locaUrl = window.location.href;
            if(locaUrl.indexOf("?") >= 0){
                var endIndex = locaUrl.indexOf("?");
                return locaUrl.substring(0, endIndex);
            }
            if(locaUrl.indexOf("#") >= 0){
                var endIndex = locaUrl.indexOf("#");
                return locaUrl.substring(0, endIndex);
            }
            return locaUrl;
        },

        /**
         * 获取url
         * @return {[type]} [description]
         */
        getUrl: function() {
            var locaUrl = window.location.href;
            if(locaUrl.indexOf("?") >= 0){
                var endIndex = locaUrl.indexOf("?");
                return locaUrl.substring(0, endIndex);
            }
            if(locaUrl.indexOf("#") >= 0){
                var endIndex = locaUrl.indexOf("#");
                return locaUrl.substring(0, endIndex);
            }
            return locaUrl;
        }

    };

    return GLB;

}(GLOBAL || {}));

/**
 * 新闻数据
 * @author lizhigao(lizhigao@021.com)
 * @date 2016-06-02
 */
var moduleNewsData = (function($, win, mnd, undefined){
    // var dataUrl = 'http://123.59.62.164/morenewsforeastday/morenews',
    var dataUrl = 'http://recmdax.dfshurufa.com/morenewsforeastday/morenews',
        // logUrl = 'http://192.168.191.1:8080/wapeastday/eastday',
        logUrl = 'http://123.59.60.170/wapeastday/eastday',
        $ttContainer = $('#toutiao_container'),
        $contentWrap = $('<div id="_1X2jnq9Z"></div>'),
        timer = null,
        osType = GLOBAL.Util.getOsType(),
        browserType = GLOBAL.Util.getBrowserType(),
        qid = GLOBAL.Util.getQueryString('qid') || GLOBAL.Cookie.get('qid') || 'null',   // 渠道ID
        userId = GLOBAL.Cookie.get('user_id'),  // 用户ID
        title = encodeURIComponent($('.title')[0] ? $('.title')[0].innerHTML : ($('title')[0] ? $('title')[0].innerHTML : ''));

    mnd.run = function(){
        // 添加样式
        addStyle();
        /* 获取、存储uid */
        if(!userId){
            userId = (+new Date()) + Math.random().toString(10).substring(2, 6);
            GLOBAL.Cookie.set('user_id', userId, 365 * 24);
        }
        // 将新增的DOM添加到html中
        $ttContainer.append($contentWrap);
        // 加载数据并生成新闻
        loadData();
        // 日志记录
        sendLog();
    };

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
                    date = item['date'],
                    hotnews = item['hotnews'] || 'null',
                    recommendtype = item['recommendtype'] ? item['recommendtype'] : '-1',
                    fr = GLOBAL.Util.getUrlNoParams();

                date = getSpecialTimeStr(date);
                date = date ? date : '';
                url += '?idx=' + (i - 1) + '&recommendtype=' + recommendtype + '&ishot=' + hotnews + '&fr=' + fr;
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

    /**
     * 日志记录
     * @return {[type]} [description]
     */
    function sendLog(){
        $.ajax({
            url: logUrl,
            data: {
                qid: qid || 'null',                 // 渠道号
                uid: userId || 'null',              // 用户ID
                softtype: 'news',                   // 软件type（当前默认news）
                softname: 'eastday_wapnews',        // 软件名（当前默认eastday_wapnews）
                newstype: 'null',            // 当前新闻类别
                from: GLOBAL.Util.getQueryString('fr') || 'null',   // url上追加的fr字段
                to: GLOBAL.Util.getUrlNoParams() || 'null',     // 当前页面
                os_type: osType || 'null',                // 客户端操作系统
                browser_type: browserType || 'null',      // 客户端浏览器类别
                pixel: win.screen.width + '*' + win.screen.height,     // 客户端分辨率
                fr_url: GLOBAL.Util.getReferrer() || 'null',    // 浏览器的refer属性
                loginid: 'null',                // App端分享新闻时url上追加的ttaccid
                ime: 'null',                    // App端用户imei号
                idx: GLOBAL.Util.getQueryString('idx'),                 // 当前新闻的idx属性
                ishot: 'null',                  // 当前新闻是不是热点新闻
                ver: 'null',                    // App版本（1.2.9）url上追加的ver
                appqid: 'null',                 // App渠道号url上追加的appqid
                ttloginid: 'null',              // App端分享新闻时url上追加的ttloginid
                apptypeid: 'null',              // App端的软件类别url上追加的apptypeid
                appver: 'null',                 // App版本（010209）url上追加的appver
                recommendtype: GLOBAL.Util.getQueryString('recommendtype'), // 推荐新闻类别url上追加的recommendtype
                ispush: 'null'                  // 是不是推送新闻url上追加的ispush
            },
            dataType: 'jsonp',
            jsonp: 'jsonpcallback',
            success: function(){},
            error: function(){console.error(arguments);}
        });
    }

    return mnd;

}(jQuery, window, moduleNewsData || {}));

/* 入口 */
$(document).ready(function(){
    moduleNewsData.run();
});
