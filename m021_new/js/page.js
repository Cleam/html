Zepto(function() {
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
        // $searchClear.on('click', function(e){e.preventDefault();});
        $searchClear.on('click', function(){
            $searchInput.val('');
            $searchClear.hide();
            e.preventDefault();
        });

    })();


    /* 热站导航宽窄屏判断功能实现 */
    (function(){
        var $hotSiteMore = $('#J_hot_site_more');
        // $hotSiteMore.click(function(e) { e.preventDefault(); });
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
        $(".cs-tabs a").click(function(e) { e.preventDefault(); });
        $(".cs-tabs a").on('touchstart mousedown', function(e) {
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

    /* 头条新闻菜单显示隐藏功能实现 */
    (function(){
        var $ttNews = $('#J_tt_news'),
            $ttNewsNav = $ttNews.children('.tt-news-nav'),
            tnnHeight = $ttNewsNav.height(),
            flag = true;
        $ttNewsNav.children('.home').on('click', function(e) { e.preventDefault(); });
        $ttNewsNav.children('.home').on('touchstart mousedown', function(e) {
            e.preventDefault();
            goTop(200);
        });
        $(window).on('scroll', function() {
            var ttnOT = $ttNews.offset().top,
                scrollTop = document.documentElement.scrollTop || document.body.scrollTop,
                $loading = $('#J_loading'),
                loadOT = $loading.offset().top,
                cHeight = document.documentElement.clientHeight;
            if(scrollTop + cHeight >= loadOT && !flag){
                // 加载数据
                loadData('data/data.json');
            }
            if (scrollTop + tnnHeight >= ttnOT) {
                if (!flag) { return; }
                flag = false;
                $ttNewsNav.css('zIndex', 9);
                $ttNewsNav.animate({
                    'opacity': 1,
                    'top': '0px'
                }, 400, 'linear');
            } else {
                if (flag) { return; }
                flag = true;
                $ttNewsNav.animate({
                    'opacity': 0,
                    'top': '-' + tnnHeight + 'px'
                }, 200, 'linear', function() {
                    $ttNewsNav.css('zIndex', -1);
                });
            }
            
        });
    })();


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

    //返回顶部动画
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

    loadData('data/data2.json');
    

    /**
     * 加载数据
     * @param  {[type]} url 请求地址
     * @return {[type]}   [description]
     */
    function loadData(url){
        $.ajax({
            url: url,
            dataType: 'json',
            success: function(data){
                // console.log(data);
                generateDom(data)
            }
        });
        
    }

    /**
     * 将数据组装成html代码
     * @param  {[type]} d 数据
     * @return {[type]}   [description]
     */
    function generateDom(d){
        var $ttNewsList = $('#J_ttnews_list'),
            data = d && d.data;
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

    //滚动条在Y轴上的滚动距离
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
    };


});
