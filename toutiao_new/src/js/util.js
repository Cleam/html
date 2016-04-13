/**
 * 扩展Array对象的方法(判断数组中是否包含指定值)
 * @param  {[type]} item 指定值
 * @return {[type]}      [description]
 */
Array.prototype.contains = function(item){
    return RegExp(item).test(this);
};

/**
 * 获取url中参数的值
 * @param  {[type]} name 参数名
 * @return {[type]}      参数值
 */
function getQueryString(name) {  
    var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)", "i");
    var r = window.location.search.substr(1).match(reg);
    if (r != null) return decodeURI(r[2]);
    return null;
}

/**
 * 打乱数组
 * @param  {[type]} arr 目标数组
 * @return {[type]}     [description]
 */
function dislocateArr(arr) {
    return arr.sort(function() {
        return 0.5 - Math.random(); });
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
        dayTime = 24 * 60 * 60 * 1000, // 1天
        hourTime = 60 * 60 * 1000, // 1小时
        minuteTime = 60 * 1000; // 1分钟

    if (tdoa >= dayTime) { // 天
        var h = tdoa / dayTime;
        if (h > 2) {
            return timeToString(tdoa);
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
 * 时间戳转换为字符串
 * @param  {[type]} t 时间戳
 * @param  {[type]} splitStr 分隔符
 * @return {[type]}   [description]
 */
function timeToString(t, splitStr) {
    return dateToString(timeToDate(t), splitStr);
}

/**
 * 毫秒级时间转日期时间
 * @param  {[type]} t 毫秒时间戳
 * @return {[type]}   日期时间
 */
function timeToDate(t) {
    return new Date(t);
}

/**
 * 日期转字符串
 * @param  {[type]} d           日期时间
 * @param  {[type]} splitStr 分隔符
 * @return {[type]}             默认返回 yyyy-MM-dd HH:mm
 */
function dateToString(d, splitStr) {
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
}

/**
 * 返回顶部动画
 */
//goTop(500);//500ms内滚回顶部
// function goTop(times) {
//     if (!!!times) {
//         $(window).scrollTop(0);
//         return;
//     }
//     var sh = $('body').scrollTop(); //移动总距离
//     var inter = 13.333; //ms,每次移动间隔时间
//     var forCount = Math.ceil(times / inter); //移动次数
//     var stepL = Math.ceil(sh / forCount); //移动步长
//     var timeId = null;

//     function ani() {
//         !!timeId && clearTimeout(timeId);
//         timeId = null;
//         //console.log($('body').scrollTop());
//         if ($('body').scrollTop() <= 0 || forCount <= 0) { //移动端判断次数好些，因为移动端的scroll事件触发不频繁，有可能检测不到有<=0的情况
//             $('body').scrollTop(0);
//             return;
//         }
//         forCount--;
//         sh -= stepL;
//         $('body').scrollTop(sh);
//         timeId = setTimeout(function() { ani(); }, inter);
//     }
//     ani();
// }

/**
 * 获取滚动高度
 * @return {[type]} [description]
 */
function getScrollTop() {
    if (document.documentElement && document.documentElement.scrollTop) {
        return document.documentElement.scrollTop;
    } else if (document.body) {
        return document.body.scrollTop;
    }
}

/**
 * 获取文档高度
 * @return {[type]} [description]
 */
function getClientHeight() {
    if (document.body.clientHeight && document.documentElement.clientHeight) {
        return (document.body.clientHeight < document.documentElement.clientHeight) ? document.body.clientHeight : document.documentElement.clientHeight;
    } else {
        return (document.body.clientHeight > document.documentElement.clientHeight) ? document.body.clientHeight : document.documentElement.clientHeight;
    }
}

/**
 * browser的判断
 * @return {[type]} [description]
 */
function getBrowserType() {
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
}

/**
 * OS的判断
 * @return {[type]} [description]
 */
function getOsType() {
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
}

/**
 * 获取当前手机屏幕分辨率的高宽
 * @return {json} {w: xxx, h: xxx}
 */
function getPixel(){
    var height = window.screen.width;
    var width = window.screen.height;
    return {w: width, h: height};
}

/**
 * 获取字符串字节数
 * @param  {[type]} str [description]
 * @return {[type]}     [description]
 */
function getBytes(str){
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
}

/**
 * Javascript获取页面来源(referer)
 * @from http://www.au92.com/archives/javascript-get-referer.html
 * @return {[type]} [description]
 */
function getReferrer() {
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
}

/**
 * 获取url（排除url中参数）
 * @return {[type]} [description]
 */
function getUrlNoParams() {
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

/**
 * 获取url
 * @return {[type]} [description]
 */
function getUrl() {
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