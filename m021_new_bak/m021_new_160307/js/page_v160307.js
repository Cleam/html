/**
 * 扩展Array对象的方法(判断数组中是否包含指定值)
 * @param  {[type]} item 指定值
 * @return {[type]}      [description]
 */
Array.prototype.contains = function(item){
    return RegExp(item).test(this);
};
$(function() {
    FastClick.attach(document.body);
    /**
     * 输入框清空功能实现
     */
    (function(){
        var $searchInput = $('#J_search_input'),
            $searchClear = $('#J_search_clear');
        $searchInput.on('keyup', function(){
            if($.trim($searchInput.val()) !== ''){
                $searchClear.show();
            } else {
                $searchClear.hide();
            }
        });
        $searchClear.on('click', function(e){
            $searchInput.val('');
            $searchClear.hide();
            e.preventDefault();
        });

    })();

    /* 热站导航宽窄屏判断功能实现 */
    (function(){
        var $hotSiteMore = $('#J_hot_site_more');
        $hotSiteMore.on('click', function(e) {
            var $this = $(this);
            if($this.data('state') == '0'){
                $this.parent().addClass('expand');
                $this.data('state', '1');
                $this.find('img').attr('src', 'img/i_shou.png');
                $this.find('span').text('收起');
            } else {
                $this.parent().removeClass('expand');
                $this.data('state', '0');
                $this.find('img').attr('src', 'img/i_more.png');
                $this.find('span').text('更多');
            }
            e.preventDefault();
        });
        /*$(window).resize(function(){
            var screenWidth = window.screen.width,
                $hotSiteItems =  $('.J-hot-site-list').children();
            if(screenWidth <= 375){
                $hotSiteItems.addClass('sm');
                $hotSiteItems.eq(9).hide();
                $hotSiteItems.eq(10).hide();
            } else {
                $hotSiteItems.removeClass('sm');
                $hotSiteItems.eq(9).show();
                $hotSiteItems.eq(10).show();
            }
        });
        $(window).resize();*/
    })();

    /* 酷站导航tab切换功能实现 */
    (function(){
        var tabsSwiper = new Swiper('#J_tabs_container', {
            speed: 300,
            autoHeight: true,
            onSlideChangeStart: function() {
                var $activeSlide = $('#J_tabs_container').find('.swiper-slide').eq(tabsSwiper.activeIndex),
                    $slideWrapper = $activeSlide.parent();
                $slideWrapper.height($activeSlide.height());
                $(".cs-tabs").children('.active').removeClass('active');
                $(".cs-tabs").children().eq(tabsSwiper.activeIndex).addClass('active');
            }
        });
        $(".cs-tabs a").on('click', function(e) {
            e.preventDefault();
            var $this = $(this);
            $(".cs-tabs").children('.active').removeClass('active');
            $this.addClass('active');
            tabsSwiper.slideTo($this.index());
        });

        /* 酷站【更多】功能实现 */
        $('.J-more').on('click', function(e) {
            e.preventDefault();
            var _this = this,
                $this = $(this);
            $this.parent().parent().parent().css('height', 'auto');
            
            if ($this.hasClass('active')) {
                $this.parent().next().hide();
                $this.removeClass('active');
            } else {
                $this.parent().next().show();
                $this.addClass('active');
            }

            $('.J-more').each(function(i, ele){
                var $ele = $(ele);
                if($ele.hasClass('active') && ele !== _this){
                    $ele.parent().next().hide();
                    $ele.removeClass('active');
                }
            });

        });
    })();

    var refreshUrl = 'http://toutiao.eastday.com/toutiao_h5/RefreshJP',
        pullUpUrl = 'http://toutiao.eastday.com/toutiao_h5/NextJP',
        rowkey = '',   // 存储最后一条新闻的rowkey
        userId = $.cookie('user_id'),   // 获取用户id
        newsType = 'toutiao',
        $loation = $('#J_location'),
        $ttNews = $('#J_tt_news'),
        $ttNewsList = $('#J_ttnews_list'),
        $ttNewsNav = $ttNews.children('.tt-news-nav'),
        $ttNewsNavList = $('#J_ttnews_nav_list'),
        $ttNewsTabs = $ttNewsNavList.find('.ttnews-tabs'),
        $loading = $('#J_loading'),
        tnnHeight = $ttNewsNav.outerHeight(),
        tnnTop = $ttNews.offset().top - tnnHeight,
        newsNavFlag = true,
        scrollTimer = null,
        $bgLoading = $('#J_bg_loading'),
        wsCache = new WebStorageCache(),
        idx = $.cookie('idx_' + newsType, Number);  // 参数
        pgNum = 1,  // 参数
        newsTypeArr = [],   // 保存新闻类别信息
        // newsTypeArr = ['toutiao', 'weikandian', 'shehui', 'shanghai', 'xiaohua', 'yule', 'guonei', 'jiankang', 'guoji', 'renwen', 'hulianwang', 'junshi', 'nba', 'keji', 'tiyu', 'shishang', 'caijing', 'youxi', 'qiche', 'kexue', 'jianshen'],
        readUrl = '',
        // 新闻导航左右滑动功能实现
        ttNewsNavSwiper = new Swiper('#J_ttnews_nav_container', {
            freeMode : true,
            speed: 500,
            slidesPerView: 5.5
        });
    init();

    function init(){
        $('.J-has-channel').each(function(i, ele){
            var $this = $(ele);
            $this.attr('href', $this.attr('href') + '?qid=' +tt_news_qid);
        });
        readUrl = wsCache.get('all_read_url');
        if(!readUrl){readUrl = '';}
        // 首次加载数据
        loadData('toutiao');
        // 获取用户ID
        if(!userId){
            userId = '';
            setUid();
        }
        // 保存所有新闻类别到数组
        $ttNewsTabs.each(function(){
            var $this = $(this),
                type = $this.data('type');
            if(type !== 'meinv' && type !== 'nuanwen'){
                newsTypeArr.push(type);
            }
        });
        // 设置当前位置信息
        var loc = getCacheCity();
        if(loc){
            updateDomLocation(loc);
        } else {
            location();
        }
        // 头条新闻菜单显示隐藏功能实现
        $ttNewsNav.children('.home').on('click', function(e) {
            e.preventDefault();
            goTop(200);
        });
        $(window).on('scroll', function() {
            var ttnOT = $ttNews.offset().top,
                scrollTop = getScrollTop(),
                footerOT = $('#J_footer').offset().top,
                cHeight = getClientHeight();
            // 缓存浏览位置
            setCachePos(scrollTop);
            if (scrollTop + tnnHeight >= ttnOT) {
                if (newsNavFlag) {
                    newsNavFlag = false;
                    $ttNewsNav.css('zIndex', 9);
                    $ttNewsNav.stop().animate({
                        'opacity': 1,
                        'top': '0px'
                    }, 200, 'linear');
                }
            } else {
                if (!newsNavFlag) {
                    newsNavFlag = true;
                    $ttNewsNav.stop().animate({
                        'opacity': 0,
                        'top': '-' + tnnHeight + 'px'
                    }, 100, 'linear', function() {
                        $ttNewsNav.css('zIndex', -1);
                    });
                }
            }
            if(scrollTop + cHeight >= footerOT && !newsNavFlag){
                // 上拉加载数据(延迟执行，防止操作过快多次加载)
                clearTimeout(scrollTimer);
                scrollTimer = setTimeout(function(){
                    pullUpLoadData();
                }, 200);
            }
        });
        // 刷新页面即触发window的scroll事件（因为浏览器会记忆刷新前滚动条的位置。）
        $(window).trigger('scroll');
        
        // 头条新闻导航点击事件
        $ttNewsTabs.on('click', function(){
            var $this = $(this),
                index = $this.parent().index();
            // console.log(index);
            if($this.hasClass('active')){
                return false;
            }
            // 记录新闻类别（作为接口参数）
            newsType = $this.data('type');
            idx = $.cookie('idx_' + newsType, Number);
            $ttNewsTabs.removeClass('active');
            $this.addClass('active');
            ttNewsNavSwiper.slideTo(index - 2, 200, false);
            // 获取浏览位置
            var cachePos = getCachePos();
            if(cachePos){
                $('body').scrollTop(cachePos);
            } else {
                // 跳到新闻顶部
                $('body').scrollTop(tnnTop + 4);
            }
            // 加载新闻数据
            var cacheNews = getCacheNews();
            if(cacheNews){
                $ttNewsList.html(cacheNews);
            } else {
                loadData();
            }
        });

        $ttNewsList.on('click', 'a', function(e){
            var $this = $(this),
                url = $this.attr('href');
            url = url.substring(url.indexOf('/mobile/') + 8, url.indexOf('.html'));
            // console.log(this);
            setCacheReadUrl(url, $this.data('type'), $this.data('subtype'));
        });
    }

    /**
     * 更新位置信息
     * @param  {[type]} loc [description]
     * @return {[type]}     [description]
     */
    function updateDomLocation(loc){
        $loation.attr('data-type', loc.prov_py);
        $loation.html(loc.prov_name);
    }

    /**
     * 获取地方站的接口数据
     * @return {[type]} [description]
     */
    function location(){
        $.ajax({
            type : 'POST',
            url : 'http://123.59.74.13/position/get',
            dataType : 'jsonp',
            jsonp : 'jsonpcallback',
            timeout: 5000,
        }).done(function(res){
            try {
                var pos = res.position,
                    py = getCityPinyin(pos.provname),
                    loc = null;
                if(py){
                    loc = {"prov_id": pos.pro_id,"prov_py": py,"prov_name": pos.provname};
                    updateDomLocation(loc);
                    setCacheCity(loc);
                } else {
                    ttNewsNavSwiper.removeSlide(3);
                }
            } catch(e) {
                console.error(e);
                ttNewsNavSwiper.removeSlide(3);
            }
        }).error(function(jqXHR,textStatus){
            console.error(textStatus);
            ttNewsNavSwiper.removeSlide(3);
        });
    }

    /**
     * 通过城市中文名获取拼音
     * @param  {[type]} city 中文名
     * @return {[type]}      拼音
     */
    function getCityPinyin(city){
        switch(city){
            case '上海': return 'shanghai'; break;
            case '北京': return 'beijing'; break;
            case '河南': return 'henan'; break;
            case '广东': return 'guangdong'; break;
            default: return null;
        }
    }

    /**
     * 缓存位置信息（缓存12小时）
     * @param {Object} loc 位置信息
     */
    function setCacheCity(loc){
        wsCache.isSupported() && wsCache.set('location', loc, {exp: 43200});
    }

    /**
     * 获取位置信息
     * @return {[type]} [description]
     */
    function getCacheCity(){
        if(wsCache.isSupported()){
            return wsCache.get('location');
        }
        return false;
    }

    /**
     * 缓存当前类别加载的新闻（缓存20分钟）
     */
    function setCacheNews(){
        wsCache.isSupported() && wsCache.set('ttn_' + newsType, $ttNewsList.html(), {exp: 1200});
    }

    /**
     * 获取当前类别缓存的新闻
     * @return {String|Boolean} 成功返回新闻数据(否则返回false)
     */
    function getCacheNews(){
        if(wsCache.isSupported()){
            return wsCache.get('ttn_' + newsType);
        }
        return false;
    }

    /**
     * 缓存当前类别新闻的浏览位置（缓存20分钟）
     * @param {[type]} st [description]
     */
    function setCachePos(st){
        wsCache.isSupported() && wsCache.set('ttn_pos_' + newsType, st, {exp: 1200});
    }

    /**
     * 获取当前类别新闻缓存的浏览位置
     * @return {String|Boolean} 成功返回滚动位置(否则返回false)
     */
    function getCachePos(){
        if(wsCache.isSupported()){
            return wsCache.get('ttn_pos_' + newsType);
        }
        return false;
    }

    /**
     * 缓存已经阅读的url编号
     * @param {[type]} urlNum url编号
     */
    function setCacheReadUrl(urlNum, type, subtype){
        // 判断是否存储过
        if(!existReadUrl(urlNum) && newsTypeArr.contains(type)){  // 排除meinv、nuanwen
            // read_url_all
            var aru = wsCache.get('read_url_all');
            if(aru){
                aru = aru.split(',');
                while(aru.length >= 5){aru.shift();}
                aru.push(urlNum);
                readUrl = aru.join(',');
            } else {
                readUrl = urlNum;
            }
            wsCache.set('read_url_all', readUrl, {exp: 2880});
            // type_read_url
            var tru = wsCache.get('read_url_' + type); // xxxx,xxxx,xxxx
            if(tru){
                tru = tru.split(',');
                while(tru.length >= 3){tru.shift();}
                tru.push(urlNum);
                tru = tru.join(',');
            } else {
                tru = urlNum;
            }
            wsCache.set('read_url_' + type, tru, {exp: 2880});
            // subtype_read_url
            if(subtype){
                var stru = wsCache.get('read_url_' + subtype); // xxxx,xxxx,xxxx
                if(stru){
                    stru = stru.split(',');
                    while(stru.length >= 3){stru.shift();}
                    stru.push(urlNum);
                    stru = stru.join(',');
                } else {
                    stru = urlNum;
                }
                wsCache.set('read_url_' + subtype, stru, {exp: 2880});
            }
        }
    }

    /**
     * 判断是否存储过该url编号
     * @param  {[type]} urlNum url编号
     * @return {[type]}        true: 已经缓存过了，false：未缓存过
     */
    function existReadUrl(urlNum){
        var read_url_all = wsCache.get('read_url_all'); // xxxx,xxxx,xxxx
        // 已经缓存过了
        if(read_url_all && read_url_all.indexOf(urlNum) !== -1){
            return true;
        }
        return false;
    }

    /**
     * 设置userId
     */
    function setUid(){
        $.ajax({
            type : 'POST',
            url : 'http://toutiao.eastday.com/getwapdata/getuid',
    //      url:'http://123.59.60.170/getwapdata/getuid',
            dataType : 'jsonp',
            data : {
                softtype : 'news',
                softname : 'eastday_wapnews',
            },
            jsonp : 'jsonpcallback',
            success : function(msg) {
                try {
                    userId = msg.uid;
                    $.cookie('user_id', userId, {
                        expires : 365 * 5,
                        path:'/'
                    });
                } catch(e) {
                    console.error(e);
                }
            }
        });
    }

    /**
     * 加载数据
     * @return {[type]}   [description]
     */
    function loadData(){
        $.cookie('pgnum_' + newsType, 1, { expires: 0.334, path: '/' });
        $.ajax({
            url: refreshUrl,
            data: {
                type: newsType,
                endkey: '',
                domain: '021',
                recgid: userId, // 用户ID
                picnewsnum: 1,
                qid: tt_news_qid,
                readhistory: readUrl,
                idx: 0,
                pgnum: 1
            },
            dataType: 'jsonp',
            jsonp: "jsonpcallback",
            timeout: 8000,
            beforeSend: function(){
                $ttNewsList.html('');
                $bgLoading.show();
            },
            success: function(data){
                generateDom(data);
            },
            complete: function(){
                $bgLoading.hide();
            }
        });
    }

    /**
     * 上拉加载数据
     * @return {[type]}     [description]
     */
    function pullUpLoadData(){
        readUrl = wsCache.get('read_url_' + newsType);
        // 页码
        pgNum = $.cookie('pgnum_' + newsType, Number);
        $.cookie('pgnum_' + newsType, ++pgNum, { expires: 0.334, path: '/' });
        // 链接索引
        idx = $.cookie('idx_' + newsType, Number);
        if(!idx){idx = 0;}
        $.ajax({
            url: pullUpUrl,
            data: {
                type: newsType,
                startkey: rowkey,
                newsnum: 20,
                isnew: 1,
                domain: '021',
                readhistory: readUrl,
                idx: idx,
                recgid: userId, // 用户ID
                pgnum: pgNum,
                qid: tt_news_qid
            },
            dataType: 'jsonp',
            jsonp: "jsonpcallback",
            timeout: 8000,
            beforeSend: function(){
                $loading.show();
            },
            success: function(data){
                generateDom(data);
            },
            error: function(jqXHR, textStatus){
                console.error(textStatus);
            },
            complete: function(){
                $loading.hide();
            }
        });
    }

    /**
     * 将数据组装成html代码
     * @param  {[type]} d 数据
     * @return {[type]}   [description]
     */
    function generateDom(d){
        var data = d && d.data;
        if(!data || !data.length){
            $loading.hide();
            return false;
        }
        rowkey = getLastRowkey(data);
        var len = data.length;
        if(!idx){idx = 0;}
        for (var i = 0; i < len; i++) {
            var item = data[i],
                url = item.url,
                dateStr = item.date,
                topic = item.topic,
                source = item.source,
                imgArr = item.miniimg,
                recommendtype = item.recommendtype ? item.recommendtype : '-1',
                hotnews = item.hotnews,
                type = item.type,
                subtype = item.subtype,
                imgLen = imgArr.length,
                hot = Number(item.hotnews),     // 热门
                video = Number(item.isvideo),   // 视频
                rec = Number(item.isrecom),     // 推荐
                nuanwen = Number(item.isnxw),   // 暖文
                tagStr = '';
            if(hot){
                tagStr = '<i class="hot">热门</i>';
                if(video){
                    tagStr += '<i class="video">视频</i>';
                }
            } else if(rec){
                tagStr = '<i class="rec">推荐</i>';
            } else if(video){
                tagStr = '<i class="video">视频</i>';
            } else if(nuanwen) {
                tagStr = '<i class="nuanwen">暖文</i>';
            }
            if(imgLen >= 3){
                $ttNewsList.append('<li class="tt-news-item tt-news-item-s2"><a data-type="' + type + '" data-subtype="' + subtype + '" href="' + url + '?qid=' + tt_news_qid + '&idx=' + (idx+i+1) + '&recommendtype=' + recommendtype + '&ishot=' + hotnews + '"><div class="news-wrap"><h3>' + topic + '</h3><div class="img-wrap clearfix"><img class="lazy fl" src="' + imgArr[0].src + '" alt="' + imgArr[0].alt + '"><img class="lazy fl" src="' + imgArr[1].src + '" alt="' + imgArr[1].alt + '"><img class="lazy fl" src="' + imgArr[2].src + '" alt="' + imgArr[2].alt + '"></div><p class="clearfix"><em class="fl">' + (tagStr?tagStr:getSpecialTimeStr(dateStr)) + '</em><em class="fr">' + source + '</em></p></div></a></li>');
            } else {
                $ttNewsList.append('<li class="tt-news-item tt-news-item-s1"><a data-type="' + type + '" data-subtype="' + subtype + '" href="' + url + '?qid=' + tt_news_qid + '&idx=' + (idx+i+1) + '&recommendtype=' + recommendtype + '&ishot=' + hotnews + '"><div class="news-wrap clearfix"><div class="txt-wrap fl"><h3>' + topic + '</h3> <p><em class="fl">' + (tagStr?tagStr:getSpecialTimeStr(dateStr)) + '</em><em class="fr">' + source + '</em></p></div><div class="img-wrap fr"><img class="lazy" src="' + imgArr[0].src + '" alt="' + imgArr[0].alt + '"></div></div></a></li> ');
            }
        }
        $.cookie('idx_' + newsType, idx + len, { expires: 0.334, path: '/' });
        setCacheNews();
    }

    /**
     * 获取最后一条新闻的rowkey
     * @param  {[type]} arr [description]
     * @return {[type]}     [description]
     */
    function getLastRowkey(arr){
        try {
            var i = arr.length - 1;
            while(i >= 0 && !$.trim(arr[i].rowkey)){
                i--;
            }
            return arr[i].rowkey;
        } catch(e) {
            console.error(e);
            return '';
        }
    }

    /**
     * 打乱数组
     * @param  {[type]} arr 目标数组
     * @return {[type]}     [description]
     */
    function dislocateArr(arr){
        return arr.sort(function(){ return 0.5 - Math.random(); });
    }

    /**
     * 计算指定时间与当前时间的时间差 并转换成相应格式字符串
     * 如：xx分钟前，xx小时前，昨天 xx:xx，前天 xx:xx，xx-xx xx:xx
     * @return {[type]} [description]
     */
    function getSpecialTimeStr(str){
        var targetTime = strToTime(str);
        if(!targetTime){
            return false;
        }
        var currentTime = new Date().getTime();
        var tdoa = Number(currentTime - targetTime),
            dayTime = 24 * 60 * 60 * 1000,  // 1天
            hourTime = 60 * 60 * 1000,  // 1小时
            minuteTime = 60 * 1000; // 1分钟

        if(tdoa >= dayTime){ // 天
            var h = tdoa / dayTime;
            if(h > 2){
                return timeToString(tdoa);
            } else if(h > 1){
                return '前天';
            } else {
                return '昨天';
            }
        } else if(tdoa >= hourTime){ // 小时
            return Math.floor(tdoa / hourTime) + '小时前';
        } else if(tdoa >= minuteTime) {
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
    function strToTime(str){
        try {
            return Date.parse(str.replace(/-/g, "/"));
        } catch(e){
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
    function timeToString(t, splitStr){
        return dateToString(timeToDate(t), splitStr);
    }

    /**
     * 毫秒级时间转日期时间
     * @param  {[type]} t 毫秒时间戳
     * @return {[type]}   日期时间
     */
    function timeToDate(t){
        return new Date(t);
    }

    /**
     * 日期转字符串
     * @param  {[type]} d           日期时间
     * @param  {[type]} splitStr 分隔符
     * @return {[type]}             默认返回 yyyy-MM-dd HH:mm
     */
    function dateToString(d, splitStr){
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
        if(splitStr){
            str = str.replace(/-/g, splitStr);
        }
        return str;
    }

    /**
     * 返回顶部动画
     */
    //goTop(500);//500ms内滚回顶部
    function goTop(times) {
        if (!!!times) {
            $(window).scrollTop(0);
            return;
        }
        var sh = $('body').scrollTop(); //移动总距离
        var inter = 13.333; //ms,每次移动间隔时间
        var forCount = Math.ceil(times / inter); //移动次数
        var stepL = Math.ceil(sh / forCount); //移动步长
        var timeId = null;
        function ani() {
            !!timeId && clearTimeout(timeId);
            timeId = null;
            //console.log($('body').scrollTop());
            if ($('body').scrollTop() <= 0 || forCount <= 0) { //移动端判断次数好些，因为移动端的scroll事件触发不频繁，有可能检测不到有<=0的情况
                $('body').scrollTop(0);
                return;
            }
            forCount--;
            sh -= stepL;
            $('body').scrollTop(sh);
            timeId = setTimeout(function() { ani(); }, inter);
        }
        ani();
    }

    /**
     * 获取滚动高度
     * @return {[type]} [description]
     */
    function getScrollTop(){
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
    function getClientHeight(){
        if (document.body.clientHeight && document.documentElement.clientHeight) {
            return (document.body.clientHeight < document.documentElement.clientHeight) ? document.body.clientHeight: document.documentElement.clientHeight;
        } else {
            return (document.body.clientHeight > document.documentElement.clientHeight) ? document.body.clientHeight: document.documentElement.clientHeight;
        }
    }

});
