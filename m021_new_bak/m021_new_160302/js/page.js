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
        $searchClear.on('click', function(){
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
        // $(".cs-tabs a").click(function(e) { e.preventDefault(); });
        $(".cs-tabs a").on('click', function(e) {
            e.preventDefault();
            var $this = $(this);
            $(".cs-tabs").children('.active').removeClass('active');
            $this.addClass('active');
            tabsSwiper.slideTo($this.index());
        });

        /* 酷站【更多】功能实现 */
        // $('.J-more').click(function(e) { e.preventDefault(); });
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

    var $ttNews = $('#J_tt_news'),
        $ttNewsListWrap = $('#J_ttnews_list_wrap'),
        $ttNewsListArr = $ttNewsListWrap.find('.tt-news-list'),
        ttNewsCtg = '',
        ttNewsCtgArr = [],
        // strArr = ['toutiao', 'weikandian', 'shehui', 'shanghai', 'xiaohua', 'yule', 'guonei', 'meinv', 'jiankang', 'guoji', 'renwen', 'hulianwang', 'junshi', 'nba', 'keji', 'tiyu', 'shishang', 'caijing', 'youxi', 'qiche', 'nuanwen', 'kexue', 'jianshen']
        // ++++++ 位置方案二： 每次换新闻类别，滚到上次观看位置（实现难度大，性能稍差，可能带来其他体验问题）
        ttNewsLocationArr = [],
        $ttNewsNav = $ttNews.children('.tt-news-nav'),
        $ttNewsNavList = $('#J_ttnews_nav_list'),
        $ttNewsTabs = $ttNewsNavList.find('.ttnews-tabs'),
        tnnHeight = $ttNewsNav.outerHeight(),
        tnnTop = $ttNews.offset().top,
        pullUpFlag = true,
        navStatic = true,
        navActiveIndex = 0,
        sTimer = null,
        $bgLoading = $('#J_bg_loading'),
        // 新闻导航左右滑动功能实现
        ttNewsNavSwiper = new Swiper('#J_ttnews_nav_container', {
            freeMode : true,
            speed: 500,
            slidesPerView: 5
        }),
        ttNewsContentSwiper = new Swiper('#J_ttnews_list_wrap', {
            // autoHeight: true,
            // speed: 200,
            observer: true,//修改swiper自己或子元素时，自动初始化swiper
            observeParents: true,//修改swiper的父元素时，自动初始化swiper
            onSlideChangeStart: function(swiper){
                // console.log(swiper.activeIndex);    // 当前索引
                // console.log(swiper.container);      // swiper-container
                // console.log(swiper.wrapper);        // swiper-wrapper
                var $ttNewsList = $ttNewsListArr.eq(swiper.activeIndex);
                $ttNewsListWrap.children('.swiper-wrapper').css('height', $ttNewsList.outerHeight() + 'px');
                updateNews('data/data2.json', swiper.activeIndex);
            }
        });

    // 首次加载数据
    loadData('data/data2.json', $ttNewsListArr.eq(0));
    
    /* 头条新闻菜单显示隐藏功能实现 */
    $ttNewsNav.children('.home').on('click', function(e) {
        e.preventDefault();
        goTop(200);
    });
    $(window).on('scroll', function() {
        var ttnOT = $ttNews.offset().top,
            scrollTop = getScrollTop(),
            footerOffsetTop = $('#J_footer').offset().top,
            cHeight = getClientHeight();
        if (scrollTop >= ttnOT) {
            navStatic = false;
            if (pullUpFlag) {
                pullUpFlag = false;
                $ttNewsNav.removeClass('tt-news-nav').addClass('tt-news-nav-fixed');
                $ttNewsNav.next().css('padding-top', '0.72rem');
                updateNavSwiper();
            }
        } else {
            navStatic = true;
            if (!pullUpFlag) {
                pullUpFlag = true;
                $ttNewsNav.removeClass('tt-news-nav-fixed').addClass('tt-news-nav');
                $ttNewsNav.next().css('padding-top', '0');
                updateNavSwiper();
            }
        }
        if(scrollTop + cHeight >= footerOffsetTop && !pullUpFlag){
            // 上拉加载数据(延迟执行，防止操作过快多次加载)
            clearTimeout(sTimer);
            $('#J_loading').show();
            sTimer = setTimeout(function(){
                pullUpLoadData('data/data.json', $ttNewsListArr.eq(ttNewsContentSwiper.activeIndex));
            }, 300);
        }
        // ++++++ 位置方案二： 每次换新闻类别，滚到上次观看位置（实现难度大，性能稍差，可能带来其他体验问题）
        if(!navStatic){
            ttNewsLocationArr[ttNewsContentSwiper.activeIndex] = scrollTop;
        }
    });

    /**
     * 更新navSwiper
     * @return {[type]} [description]
     */
    function updateNavSwiper(){
        ttNewsNavSwiper.update();
        ttNewsNavSwiper.slideTo(navActiveIndex - 2, 200, false);
    }
    

    /**
     * 头条新闻导航点击事件
     * @param  {[type]} ){                 } [description]
     * @return {[type]}     [description]
     */
    $ttNewsTabs.on('click', function(){
        var $this = $(this), 
            index = $this.parent().index();
        navActiveIndex = index;
        ttNewsContentSwiper.slideTo(index, 200, false);
        updateNews('data/data2.json', index);
    });

    /**
     * 新闻数据更新
     * @param  {[type]} url   请求地址
     * @param  {[type]} index 类别索引
     * @return {[type]}       [description]
     */
    function updateNews(url, index){
        console.log('index: ', index);
        var $ttNewsList = $ttNewsListArr.eq(index);
        $ttNewsTabs.removeClass('active');
        $ttNewsTabs.eq(index).addClass('active');
        ttNewsNavSwiper.slideTo(index - 2, 200, false);
        // 更新swiper-wrapper的高度
        $ttNewsListWrap.children('.swiper-wrapper').css('height', $ttNewsList.outerHeight() + 'px');
        // ++++++ 位置方案一： 每次换新闻类别，滚到第一条新闻（实现简单，体验不好。）
        // $(window).trigger('scroll');

        if(!existInArray(ttNewsCtgArr, $ttNewsList.data('ctg'))){ // 第一次加载新闻
            ttNewsContentSwiper.lockSwipes();
            if(!navStatic){
                $('body').scrollTop(tnnTop);
            }
            loadData(url, $ttNewsList);
        } else {
            // ++++++ 位置方案二： 每次换新闻类别，滚到上次观看位置（实现难度大，性能稍差，可能带来其他体验问题）
            if(!navStatic && ttNewsLocationArr[index]){
                $('body').scrollTop(ttNewsLocationArr[index]);
            }
            
            // ++++++ 位置方案一： 每次换新闻类别，滚到第一条新闻（实现简单，体验不好。）
            // if(!navStatic){
            //     $('body').scrollTop(tnnTop);
            // }
        }
    }

    /**
     * 加载数据
     * @param  {[type]} url 请求地址
     * @return {[type]}   [description]
     */
    function loadData(url, $ttNewsList){
        $.ajax({
            url: url,
            dataType: 'json',
            success: function(data){
                // console.log(data);
                $ttNewsList.html('');
                $bgLoading.show();
                generateDom(data, $ttNewsList);
                // setTimeout(function(){generateDom(data, $ttNewsList);}, 1000);
            }
        });
    }

    /**
     * 上拉加载数据
     * @param  {[type]} url 请求地址
     * @return {[type]}     [description]
     */
    function pullUpLoadData(url, $ttNewsList){
        $.ajax({
            url: url,
            dataType: 'json',
            success: function(data){
                generateDom(data, $ttNewsList);
                // setTimeout(function(){generateDom(data);}, 1000);
            }
        });
    }

    /**
     * 将数据组装成html代码
     * @param  {[type]} d 数据
     * @return {[type]}   [description]
     */
    function generateDom(d, $ttNewsList){
        var data = d && d.data;
        // 数组顺序打乱
        dislocateArr(data); 
        if(!data){
            return false;
        }
        for (var i = 0, len = data.length; i < len; i++) {
            var item = data[i],
                url = item.url,
                dateStr = item.date,
                topic = item.topic,
                source = item.source,
                imgArr = item.miniimg,
                imgLen = imgArr.length;
            if(imgLen >= 3){
                $ttNewsList.append('<li class="tt-news-item tt-news-item-s2"><a href="' + url + '" target="_blank"><div class="news-wrap"><h3>' + topic + '</h3><div class="img-wrap clearfix"><img class="fl" src="' + imgArr[0].src + '" alt="' + imgArr[0].alt + '"><img class="fl" src="' + imgArr[1].src + '" alt="' + imgArr[1].alt + '"><img class="fl" src="' + imgArr[2].src + '" alt="' + imgArr[2].alt + '"></div><p class="clearfix"><em class="fl">' + source + '</em><em class="fr">' + getSpecialTimeStr(dateStr) + '</em></p></div></a></li>');
            } else {
                $ttNewsList.append('<li class="tt-news-item tt-news-item-s1"><a href="' + url + '" target="_blank"><div class="news-wrap clearfix"><div class="txt-wrap fl"><h3>' + topic + '</h3> <p><em class="fl">' + source + '</em><em class="fr">' + getSpecialTimeStr(dateStr) + '</em></p></div><div class="img-wrap fr"><img src="' + imgArr[0].src + '" alt="' + imgArr[0].alt + '"></div></div></a></li> ');
            }
        }
        $('#J_loading').hide();
        $ttNewsListWrap.children('.swiper-wrapper').css('height', $ttNewsList.outerHeight() + 'px');
        ttNewsCtgArr.push($ttNewsList.data('ctg'));
        $bgLoading.hide();
        ttNewsContentSwiper.unlockSwipes();
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
            return Math.floor(tdoa / hourTime) + '小时前'
        } else {
            return Math.floor(tdoa / minuteTime) + '分钟前'
        }
        return timeToString(tdoa);
    }



    /**
     * 字符串转换成时间（毫秒）
     * @param  {[type]} str 时间字符串（格式：2016-02-26 09:12）
     * @return {[type]}     [description]
     */
    function strToTime(str){
        try {
            return new Date(str).getTime();
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
    //goTop(500);// 500ms内滚回顶部
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
     * 判断数组中是否存在指定值
     * @param  {[type]} arr 数组
     * @param  {[type]} val 值
     * @return {[type]}     [description]
     */
    function existInArray(arr, val){
        if(val && arr.join(',').indexOf(val) != -1){
            return true;
        } 
        return false;
    }

    /**
     * 获取scrollTop值
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
     * 获取clientHeight值
     * @return {[type]} [description]
     */
    function getClientHeight(){
        if (document.body.clientHeight && document.documentElement.clientHeight ) {
            return (document.body.clientHeight < document.documentElement.clientHeight) ? document.body.clientHeight: document.documentElement.clientHeight;
        } else {
            return (document.body.clientHeight > document.documentElement.clientHeight) ? document.body.clientHeight: document.documentElement.clientHeight;
        }
    }

    /**
     * 头条新闻滑动事件
     * @return {[type]} [description]
     */
    /*(function(){
        var $ttnewsTabs = $(".ttnews-tabs"),
            newsWrap = new Swiper('#J_ttnews_swiper', {
            speed: 300,
            autoHeight: true,
            onSlideChangeStart: function() {
                var $activeSlide = $('#J_ttnews_swiper').find('.swiper-slide').eq(newsWrap.activeIndex),
                    $slideWrapper = $activeSlide.parent();
                $slideWrapper.height($activeSlide.height());
                $ttnewsTabs.removeClass('active');
                $ttnewsTabs.eq(newsWrap.activeIndex).addClass('active');
            }
        });
        $ttnewsTabs.click(function(e) { e.preventDefault(); });
        $ttnewsTabs.on('touchstart mousedown', function(e) {
            e.preventDefault();
            var $this = $(this);
            $ttnewsTabs.removeClass('active');
            $this.addClass('active');
            newsWrap.slideTo($this.parent().index());
        });
    })();*/

    /*//滚动条在Y轴上的滚动距离
    function getScrollTop(){
    　　var scrollTop = 0, bodyScrollTop = 0, documentScrollTop = 0;
    　　if(document.body){
    　　　　bodyScrollTop = document.body.scrollTop;
    　　}
    　　if(document.documentElement){
    　　　　documentScrollTop = document.documentElement.scrollTop;
    　　}
    　　scrollTop = (bodyScrollTop - documentScrollTop > 0) ? bodyScrollTop : documentScrollTop;
    　　return scrollTop;
    }

    //文档的总高度
    function getScrollHeight(){
    　　var scrollHeight = 0, bodyScrollHeight = 0, documentScrollHeight = 0;
    　　if(document.body){
    　　　　bodyScrollHeight = document.body.scrollHeight;
    　　}
    　　if(document.documentElement){
    　　　　documentScrollHeight = document.documentElement.scrollHeight;
    　　}
    　　scrollHeight = (bodyScrollHeight - documentScrollHeight > 0) ? bodyScrollHeight : documentScrollHeight;
    　　return scrollHeight;
    }

    //浏览器视口的高度
    function getWindowHeight(){
    　　var windowHeight = 0;
    　　if(document.compatMode == "CSS1Compat"){
    　　　　windowHeight = document.documentElement.clientHeight;
    　　}else{
    　　　　windowHeight = document.body.clientHeight;
    　　}
    　　return windowHeight;
    }
    function touchedBottom(){
       if(getScrollTop() + getWindowHeight() + 20 >= getScrollHeight()){
    　　　　return true;
    　　}else{
          return false;
       }
    };*/


});
