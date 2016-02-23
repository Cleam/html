Zepto(function() {
    /* 热站导航宽窄屏判断功能实现 */
    var $hotSiteMore = $('#J_hot_site_more');
    $hotSiteMore.click(function(e) { e.preventDefault(); });
    $hotSiteMore.on('touchstart mousedown', function(e) {
        e.preventDefault();
        var $this = $(this);
        if($this.data('state') == '0'){
            $this.parent().addClass('expand');
            $this.data('state', '1');
            $this.find('span').text('收起');
        } else {
            $this.parent().removeClass('expand');
            $this.data('state', '0');
            $this.find('span').text('更多');
        }
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

    /* 酷站导航tab切换功能实现 */
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
    $('.J-more').click(function(e) { e.preventDefault(); });
    $('.J-more').on('touchstart mousedown', function(e) {
        e.preventDefault();
        var $this = $(this);
        $this.parent().parent().parent().css('height', 'auto');
        if ($this.hasClass('active')) {
            $this.parent().next().hide();
            $this.removeClass('active');
        } else {
            $this.parent().next().show();
            $this.addClass('active');
        }
    });

    /* 头条新闻菜单显示隐藏功能实现 */
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
        var offsetTop = $ttNews.offset().top;
        var scrollTop = document.documentElement.scrollTop || document.body.scrollTop;
        if (scrollTop + tnnHeight >= offsetTop) {
            if (!flag) {
                return; }
            flag = false;
            $ttNewsNav.css('zIndex', 9);
            $ttNewsNav.animate({
                'opacity': 1,
                'top': '0px'
            }, 400, 'linear');
        } else {
            if (flag) {
                return; }
            flag = true;
            $ttNewsNav.animate({
                'opacity': 0,
                'top': '-' + tnnHeight + 'px'
            }, 200, 'linear', function() {
                $ttNewsNav.css('zIndex', -1);
            });
        }
    });

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

});
