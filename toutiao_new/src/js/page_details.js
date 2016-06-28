/**
 * 头条详情页脚本
 * @deps （依赖文件列表）
 *     fastclick.min.js
 *     zepto.min.js
 *     js.cookie.js
 *     global.js
 * @author lizhigao(lizhigao@021.com)
 * @date 2016-05-01
 */
FastClick.attach(document.body);
/**
 * 模块模板
 */
var module = (function(my){
	// 存储一系列初始化方法
	my.inits = my.inits || [];
	// to do...
	return my;
})(module || {});

/**
 * 公用方法
 */
var module = (function(my){
	// 存储一系列初始化方法
	my.inits = my.inits || [];
	
	/**
      * 动态加载js文件
      * @param  {string}   url      js文件的url地址
      * @param  {Function} callback 加载完成后的回调函数
      */
    my.getScript = function(url, callback, element) {
        var head = document.getElementsByTagName('head')[0],
            js = document.createElement('script');

        js.setAttribute('type', 'text/javascript'); 
        js.setAttribute('src', url); 
        if(element){
	        element.appendChild(js);
        } else {
	        head.appendChild(js);
        }
        //执行回调
        var callbackFn = function(){
            if(typeof callback === 'function'){
                callback();
            }
        };

        if (document.all) { //IE
            js.onreadystatechange = function() {
                if (js.readyState === 'loaded' || js.readyState === 'complete') {
                    callbackFn();
                }
            };
        } else {
            js.onload = function() {
                callbackFn();
            };
        }
    };

    /**
     * 动态创建广告代码
     * @param  {string}   scriptCode     脚本代码
     * @param  {Function} callback   回调
     * @param  {DOM}   element  广告js代码父级标签
     * @return {undefined}    
     */
    my.createScript = function(scriptCode, callback, element){
        if(scriptCode){
	    	var head = document.getElementsByTagName('head')[0],
	            js = document.createElement('script');
	        js.setAttribute('type', 'text/javascript'); 
	        js.innerHTML =  scriptCode;
	        if(element){
		        element.appendChild(js);
	        } else {
		        head.appendChild(js);
	        }
	        //执行回调
            callback();
        }
    };

    /**
     * 获取随机数
     * @param  {number} min 随机数下限
     * @param  {number} max 随机数上限
     * @return {number}     大于等于min且小于max的数
     */
    my.getRandom = function(min, max){
    	return Math.floor(Math.random() * (max - min) + min);
    };

	return my;
})(module || {});

/**
 * 图片浏览
 */
var module = (function(my){
	// 存储一系列初始化方法
	my.inits = my.inits || [];

	var initPhotoSwipeFromDOM = function(gallerySelector) {
		var getFigureNodes = function(nodes){
			var figureNodes = [];
			if(nodes && nodes.length > 0){
				// 排除无效DOM节点
	            for (var i = 0; i < nodes.length; i++) {
	            	var tn = nodes[i].tagName;
	            	if(tn && tn.toUpperCase() === 'FIGURE'){
						figureNodes.push(nodes[i]);
	            	}
	            }
			}
			return figureNodes;
		};
        // parse slide data (url, title, size ...) from DOM elements 
        // (children of gallerySelector)
        var parseThumbnailElements = function(el) {
            var thumbElements = el.childNodes,
                figureNodes = getFigureNodes(thumbElements),
                figureLen = figureNodes.length,
                items = [],
                linkEl,
                imgEl,
                size,
                item,
                cnode;
            for(var i = 0; i < figureLen; i++) {
                figureEl = figureNodes[i]; // <figure> element
                // include only element nodes 
                if(figureEl.nodeType !== 1) {
                    continue;
                }
                linkEl = figureEl.children[0]; // <a> element
                imgEl = linkEl.children[0]; // <img> element
                // size = linkEl.getAttribute('data-size').split('x');
                
                // create slide object
                item = {
                    src: linkEl.getAttribute('href'),
                    w: parseInt(imgEl.getAttribute('data-width')) || parseInt(imgEl.getAttribute('data-weight')),
                    h: parseInt(imgEl.getAttribute('data-height'))
                    // w: parseInt(size[0], 10),
                    // h: parseInt(size[1], 10)
                };
                if(figureEl.children.length > 1) {
                    // <figcaption> content
                    cnode = figureEl.children[1];
                    while(cnode && cnode.nodeName !== 'FIGCAPTION'){
                        cnode = cnode.nextSibling;
                    }
                    if(cnode){
                        item.title = cnode.innerHTML;
                    }
                }
                if(linkEl.children.length > 0) {
                    // <img> thumbnail element, retrieving thumbnail url
                    item.msrc = linkEl.children[0].getAttribute('src');
                } 
                item.el = figureEl; // save link to element for getThumbBoundsFn
                items.push(item);
            }
            return items;
        };

        // find nearest parent element
        var closest = function closest(el, fn) {
            return el && ( fn(el) ? el : closest(el.parentNode, fn) );
        };

        // triggers when user clicks on thumbnail
        var onThumbnailsClick = function(e) {
            e = e || window.event;
            var eTarget = e.target || e.srcElement;
            if(eTarget.tagName.toUpperCase() !== 'IMG'){
                return;
            }
            e.preventDefault ? e.preventDefault() : e.returnValue = false;
            // find root element of slide
            var clickedListItem = closest(eTarget, function(el) {
                return (el.tagName && el.tagName.toUpperCase() === 'FIGURE');
            });
            if(!clickedListItem) {
                return;
            }
            // find index of clicked item by looping through all child nodes
            // alternatively, you may define index via data- attribute
            var clickedGallery = clickedListItem.parentNode,
                childNodes = clickedListItem.parentNode.childNodes,
                figureNodes = getFigureNodes(childNodes),
                figureLen = figureNodes.length,
                nodeIndex = 0,
                index;
            for (var i = 0; i < figureNodes.length; i++) {
                if(figureNodes[i].nodeType !== 1) { 
                    continue; 
                }
                if(figureNodes[i] === clickedListItem) {
                    index = nodeIndex;
                    break;
                }
                nodeIndex++;
            }
            if(index >= 0) {
                // open PhotoSwipe if valid index found
                openPhotoSwipe( index, clickedGallery );
            }
            return false;
        };

        // parse picture index and gallery index from URL (#&pid=1&gid=2)
        var photoswipeParseHash = function() {
            var hash = window.location.hash.substring(1),
            params = {};
            if(hash.length < 5) {
                return params;
            }
            var vars = hash.split('&');
            for (var i = 0; i < vars.length; i++) {
                if(!vars[i]) {
                    continue;
                }
                var pair = vars[i].split('=');  
                if(pair.length < 2) {
                    continue;
                }           
                params[pair[0]] = pair[1];
            }
            if(params.gid) {
                params.gid = parseInt(params.gid, 10);
            }
            return params;
        };

        var openPhotoSwipe = function(index, galleryElement, disableAnimation, fromURL) {
            var pswpElement = document.querySelectorAll('.pswp')[0],
                gallery,
                options,
                items;
            items = parseThumbnailElements(galleryElement);
            // define options (if needed)
            options = {
                // define gallery index (for URL)
                index: index,
                galleryUID: galleryElement.getAttribute('data-pswp-uid'),
                tapToClose: true,
                closeOnVerticalDrag: false,
                loop: true,
                closeOnScroll: false,
                getThumbBoundsFn: function(index) {
                    // See Options -> getThumbBoundsFn section of documentation for more info
                    var thumbnail = items[index].el.getElementsByTagName('img')[0], // find thumbnail
                        pageYScroll = window.pageYOffset || document.documentElement.scrollTop,
                        rect = thumbnail.getBoundingClientRect(); 
                    return {x:rect.left, y:rect.top + pageYScroll, w:rect.width};
                }
            };
            // PhotoSwipe opened from URL
            if(fromURL) {
                if(options.galleryPIDs) {
                    // parse real index when custom PIDs are used 
                    // http://photoswipe.com/documentation/faq.html#custom-pid-in-url
                    for(var j = 0; j < items.length; j++) {
                        if(items[j].pid == index) {
                            options.index = j;
                            break;
                        }
                    }
                } else {
                    // in URL indexes start from 1
                    options.index = parseInt(index, 10) - 1;
                }
            } else {
                options.index = parseInt(index, 10);
            }
            // exit if index not found
            if( isNaN(options.index) ) {
                return;
            }
            if(disableAnimation) {
                options.showAnimationDuration = 0;
            }
            // Pass data to PhotoSwipe and initialize it
            gallery = new PhotoSwipe( pswpElement, PhotoSwipeUI_Default, items, options);
            gallery.init();
        };
        // loop through all gallery elements and bind events
        var galleryElements = document.querySelectorAll( gallerySelector );
        for(var i = 0, l = galleryElements.length; i < l; i++) {
            galleryElements[i].setAttribute('data-pswp-uid', i+1);
            galleryElements[i].onclick = onThumbnailsClick;
        }
        // Parse URL and open gallery if it contains #&pid=3&gid=1
        var hashData = photoswipeParseHash();
        if(hashData.pid && hashData.gid) {
            openPhotoSwipe( hashData.pid ,  galleryElements[ hashData.gid - 1 ], true, true );
        }
    };

	// 初始化
	my.inits.push(function(){
		initPhotoSwipeFromDOM('.J-article-content');
	});

	return my;
})(module || {});

/**
 * 通用详情内页
 */
var module = (function(my){
	// 存储一系列初始化方法
	my.inits = my.inits || [];

	// var $article = $('#J_article');	// 文章
	var $interestNews = $('#J_interest_news'),	// 猜你感兴趣
		$inList = $('<div id="J_in_list" class="in-list"></div>'),	// 猜你感兴趣列表
		$hotNews = $('#J_hot_news'),	// 热点新闻
		$hnList = $('<div id="J_hn_list" class="hn-list"></div>'),	// 热点新闻列表
        // appShowLogUrl = 'http://123.59.60.170/getwapdata/advshow',   // 测试接口
        appShowLogUrl = 'http://toutiao.eastday.com/getwapdata/advshow',    // 正式接口
        // appClickLogUrl = 'http://123.59.60.170/getwapdata/ad',       // 测试接口
        appClickLogUrl = 'http://toutiao.eastday.com/getwapdata/ad',    // 正式接口
        // iframeLogUrl = 'http://123.59.60.170/iframe/getiframe', // iframe统计测试接口
        iframeLogUrl = 'http://ifrcheck.dfshurufa.com/iframe/getiframe', // iframe统计正式接口
        // activeLogUrl = 'http://123.59.60.170/getwapdata/data',   // active测试接口
        activeLogUrl = 'http://toutiao.eastday.com/getwapdata/data',   // active正式接口
        // onlineLogUrl = 'http://123.59.60.170/online/online',    // online测试接口
        onlineLogUrl = 'http://ot.dftoutiao.com/online/online',    // online测试接口
        dataUrl = 'http://toutiao.eastday.com/pjson/checknews',
        softWordsUrl = 'http://softwords.dfshurufa.com/loadsoftwords/load',
        hasListNews = false,
        hasSofrWords = false;

    /**
     * 加载热点新闻
     * @param  {Array} data 新闻数据
     * @return {undefined} 
     */
    function loadHotNews(data) {
        if(!data || !data.length){
            return false;
        }
        // 类别标题
        $hotNews.append('<div class="hn-title"><h2><span></span>热点新闻</h2><span class="line"></span></div>').append($hnList);
        var len = data.length,
            ttaccid = GLOBAL.Util.getQueryString('ttaccid');
        for (var i = 0; i < len; i++) {
            var item = data[i],
                url = item.url,
                dateStr = item.date,
                // isgg = item.isgg,
                topic = item.topic,
                source = item.source,
                imgArr = item.miniimg,
                recommendtype = item.recommendtype ? item.recommendtype : '-1',
                // hotnews = item.hotnews,
                ispicnews = item.ispicnews, // 大图新闻(1)、小图新闻(0)、无图新闻(-1)
                // videonews = item.videonews, // 视频新闻
                // videoList = item.videolist,  // 视频列表
                isadv = item.isadv || '',
                advId = item.adv_id || '',
                type = item.type,
                subtype = item.subtype,
                imgLen = imgArr.length,
                // rowkey = item.rowkey,
                hot = Number(item.hotnews),     // 热门
                video = Number(item.isvideo),   // 视频
                rec = Number(item.isrecom),     // 推荐
                nuanwen = Number(item.isnxw),   // 暖文
                // urlpv = item.urlpv,              // 浏览量
                // picnums = item.picnums,          // 图片数量
                // praisecnt = item.praisecnt,      // 顶
                // tramplecnt = item.tramplecnt,    // 踩
                idx = i + 1,
                fr = GLOBAL.Util.getUrlNoParams(),
                advStr = '',
                tagStr = '';

            // url处理（对于不带域名的链接需要自己拼接域名）
            // url = (isgg != '1') ? ('http://mini.eastday.com/mobile/' + url) : url;

            if(isadv != '1'){
                url += ('?qid=' + GLOBAL.Et.qid + '&idx=' + idx + '&fr=' + fr + '&recommendtype=' + recommendtype);
                if(ttaccid){
                    url += ('&ttaccid=' + ttaccid);
                }
            }


            // 类别处理
            if(isadv == '1'){
                tagStr = '&nbsp;';
                // tagStr = '<i class="promote">推广</i>';
                advStr = 'class="J-promote-news" data-advid="' + advId + '"';
            } else if(hot){
                tagStr = '<i class="hot">热门</i>';
                if(video){
                    tagStr += '<i class="video">视频</i>';
                }
                url += '&ishot=1';
            } else if(rec){
                tagStr = '<i class="rec">推荐</i>';
            } else if(video){
                tagStr = '<i class="video">视频</i>';
            } else if(nuanwen) {
                tagStr = '<i class="nuanwen">暖文</i>';
            }

            /*======== 新闻流 =========*/
            // if(videonews == '1'){   // 视频模式 

            // } else if(ispicnews == '1'){    // 大图模式

            // } else if(ispicnews == '-1'){   // 无图模式

            // } else 
            if(ispicnews == '0'){
                if(imgLen >= 3){        // 三图模式
                    $hnList.append('<section class="news-item news-item-img3"><a ' + advStr + ' data-type="' + type + '" data-subtype="' + subtype + '" href="' + url + '"><div class="news-wrap"><h3>' + topic + '</h3><div class="img-wrap clearfix"><img class="lazy fl" src="' + imgArr[0].src + '" alt=""><img class="lazy fl" src="' + imgArr[1].src + '" alt=""><img class="lazy fl" src="' + imgArr[2].src + '" alt=""></div><p class="clearfix"><em class="fl">' + (tagStr?tagStr:GLOBAL.Util.getSpecialTimeStr(dateStr)) + '</em><em class="fr">' + source + '</em></p></div></a></section>');
                } else {    // 单图模式
                    $hnList.append('<section class="news-item news-item-img1"><a ' + advStr + ' data-type="' + type + '" data-subtype="' + subtype + '" href="' + url + '"><div class="news-wrap clearfix"><div class="img-wrap fl"><img class="lazy" src="' + imgArr[0].src + '" alt=""></div><div class="txt-wrap fr"><h3>' + topic + '</h3><p><em class="fl">' + (tagStr?tagStr:GLOBAL.Util.getSpecialTimeStr(dateStr)) + '</em><em class="fr">' + source + '</em></p></div></div></a></section>');
                }
            }
        }
        // 插入“点击查看更多新闻”链接按钮
        addMoreNewsBtn();
        // 判断新闻加载完成的标志
        hasListNews = true;
    }

    /**
     * 添加软文到文章末尾
     */
    function loadSoftWords(){   // softWordsUrl
        $.ajax({
            url: softWordsUrl,
            data : {
                // "url": 'http://mini.eastday.com/mobile/160622025016520.html',
                "url": GLOBAL.Util.getUrlNoParams(),
                "qid": GLOBAL.Et.qid,
                "uid": GLOBAL.Et.uid,
                "plat": 'wap'
            },
            dataType: 'jsonp',
            jsonp: 'jsonpcallback',
            success: function(rst){
                if(rst && rst.stat == "1"){
                    $interestNews.before('<p style="background-color: #fff; padding: 0 0.3rem 0.3rem; font-size: 0.32rem;">' + rst.words + '</p>');
                }
            },
            complete: function(){
                hasSofrWords = true;
            }
        });
    }

    /**
     * 添加微信二维码
     */
    function loadWechatEwm(){
        var imgArr = [
                'http://mini.eastday.com/toutiaoh5/img/ewm/ewm160627-1.png',
                'http://mini.eastday.com/toutiaoh5/img/ewm/ewm160627-2.png',
                'http://mini.eastday.com/toutiaoh5/img/ewm/ewm160627-3.png'
            ],
            random = Math.floor(Math.random() * imgArr.length);

        $interestNews.before('<p style="background-color: #fff; padding: 0 0.3rem 0.3rem; font-size: 0.32rem;"><img src="' + imgArr[random] + '" alt="" width="100%" /></p>');
    }

    /**
     * 加载热点新闻数据
     */
    function loadHotNewsData(){
        $.ajax({
            url: dataUrl,
            data : {
                "type": GLOBAL.Et.newsType,
                "endkey": '',
                "url": GLOBAL.Util.getUrlNoParams(),
                "newsnum": 10,
                'recgid': GLOBAL.Et.uid,
                'qid': GLOBAL.Et.qid,
                'os': GLOBAL.Util.getOsType(),
                'isapp': '0',
                'iswifi': '0'
            },
            dataType: 'jsonp',
            jsonp: 'jsonpcallback',
            success: function(rst){
                var data = rst ? rst.data : '';
                if(data){
                    loadHotNews(data);
                } else {
                    console.warn('未获取到数据!');
                }
            }
        });
    }

    /**
     * 加载猜你感兴趣新闻（目前是广告）
     * @return {undefined}
     */
    my.loadSix = function(gg) {
        if(!gg){
            return;
        }
        var ggConfig = '',
            arr = gg.split('_'),
            alliance = arr[0],  // 联盟
            ggId = arr[1];      // 广告ID
        // 分类标题
        $interestNews.append('<div class="in-title"><h2><span></span>猜你感兴趣</h2><span class="line"></span></div>').append($inList);
        switch(alliance) {
            case 'baidu':
                ggConfig = '(window.cpro_mobile_slot = window.cpro_mobile_slot || []).push({id : "' + ggId + '",at:"3", hn:"2", wn:"3", cpro_h : "200", imgRatio:"1.7", scale:"20.15", pat:"6", tn:"template_inlay_all_mobile_lu_native", rss1:"#FFFFFF", adp:"1", ptt:"0", ptc:"%E7%8C%9C%E4%BD%A0%E6%84%9F%E5%85%B4%E8%B6%A3", ptFS:"14", ptFC:"#000000", ptBC:"#cc0000", titFF:"%E5%BE%AE%E8%BD%AF%E9%9B%85%E9%BB%91", titFS:"12", rss2:"#FFFFFF", titSU:"0", ptbg:"50", ptp:"1"})';
                $inList.append('<div class="baidu-wrap"><div id="cpro_' + ggId + '"></div></div>');
                
                my.createScript(ggConfig, function(){
                    my.getScript('http://cpro.baidustatic.com/cpro/ui/cm.js', function(){}, $('#cpro_' + ggId)[0]);
                }, $('#cpro_' + ggId)[0]);
                break;
            case 'gdt':
                var iframeId = 'gdt_' + ((+new Date()) + Math.random().toString(10).substring(2, 6));
                $inList.html('<div class="gdt-wrap"><iframe id="' + iframeId + '" name="iframe" src="http://mini.eastday.com/toutiaoh5/partner/gg_gdt.html?qid=' + GLOBAL.Et.qid + '&uid=' + GLOBAL.Et.uid + '&ggid=' + ggId + '&iframeid=' + iframeId + '" frameborder="0" scrolling="no" marginheight="0" marginwidth="0" width="100%"></iframe></div>');
                break;
            case 'sogou':
                $inList.append('<div class="sogou-wrap"><iframe src="http://mini.eastday.com/toutiaoh5/partner/gg_sogou.html?ggid=' + ggId + '" frameborder="0" scrolling="no" width="100%" height="78"></iframe></div>');
                $inList.append('<div class="sogou-wrap mt5"><iframe src="http://mini.eastday.com/toutiaoh5/partner/gg_sogou.html?ggid=' + ggId + '" frameborder="0" scrolling="no" width="100%" height="78"></iframe></div>');
                break;
            default: 
                ggConfig = '(window.cpro_mobile_slot = window.cpro_mobile_slot || []).push({id : "' + ggId + '",at:"3", hn:"2", wn:"3", cpro_h : "200", imgRatio:"1.7", scale:"20.15", pat:"6", tn:"template_inlay_all_mobile_lu_native", rss1:"#FFFFFF", adp:"1", ptt:"0", ptc:"%E7%8C%9C%E4%BD%A0%E6%84%9F%E5%85%B4%E8%B6%A3", ptFS:"14", ptFC:"#000000", ptBC:"#cc0000", titFF:"%E5%BE%AE%E8%BD%AF%E9%9B%85%E9%BB%91", titFS:"12", rss2:"#FFFFFF", titSU:"0", ptbg:"50", ptp:"1"})';
                $inList.append('<div class="baidu-wrap"><div id="cpro_' + ggId + '"></div></div>');
                
                my.createScript(ggConfig, function(){
                    my.getScript('http://cpro.baidustatic.com/cpro/ui/cm.js', function(){}, $('#cpro_' + ggId)[0]);
                }, $('#cpro_' + ggId)[0]);
                break;
        }
    };

	/**
     * 热点新闻中插入广告（三宫格）
     * @param  {number} pos 插入位置
     * @return {undefined} 
     */
    my.loadThree = function(gg, pos){
        if(!gg){
            return;
        }
        var ggConfig = '',
            $newsItems = $hnList.children('.news-item'),
            len = $newsItems.length,
            arr = gg.split('_'),
            alliance = arr[0],  // 联盟
            ggId = arr[1];      // 广告ID
        if(pos >= len){
            pos = len - 1;
        } else if(pos < 0){
            pos = 0;
        } else {
            pos = pos - 1;
        }
        switch(alliance) {
            case 'baidu':
                ggConfig = '(window.cpro_mobile_slot = window.cpro_mobile_slot || []).push({id : "' + ggId + '",at:"3", pat:"21", ptLH:"30", tn:"template_inlay_all_mobile_lu_native", rss1:"#FFFFFF", titFF:"%E5%BE%AE%E8%BD%AF%E9%9B%85%E9%BB%91", titFS:"12", rss2:"#000000", ptFS:"17", ptFC:"#000000", ptFF:"%E5%BE%AE%E8%BD%AF%E9%9B%85%E9%BB%91", ptFW:"0", conpl:"15", conpr:"15", conpt:"8", conpb:"15", cpro_h:"140", ptn:"1", ptp:"0", itecpl:"10", piw:"0", pih:"0", ptDesc:"2", ptLogo:"0", ptLogoFS:"10", ptLogoBg:"#FFFFFF", ptLogoC:"#999999", ptLogoH:"0", ptLogoW:"0"})';
                $newsItems.eq(pos).after('<section class="gg-item news-gg-img3"><div id="cpro_' + ggId + '"></div><div class="line"></div></section>');
                my.createScript(ggConfig, function(){
                    my.getScript('http://cpro.baidustatic.com/cpro/ui/cm.js', function(){}, $('#cpro_' + ggId)[0]);
                }, $('#cpro_' + ggId)[0]);
                break;
            case 'sogou':
                $newsItems.eq(pos).after('<section class="gg-item news-gg-img1" style="border-bottom: 1px solid #f5f5f5;"><iframe src="http://mini.eastday.com/toutiaoh5/partner/gg_sogou.html?ggid=' + ggId + '" frameborder="0" scrolling="no" width="100%" height="78"></iframe></section>');
                break;
            default: break;
        }
	};

    /**
     * 加载tujia图加广告
     * @return {[type]} [description]
     */
    my.loadTujia = function(gg){
        if(!gg){
            return;
        }
        var arr = gg.split('_'),
            // alliance = arr[0],  // 联盟 目前只有baidu
            ggId = arr[1];      // 广告ID
        document.write('<scr' + 'ipt> var baiduImagePlus = {unionId:"' + ggId + '", formList:[{formId:22}], maxAdCount: 999 }; </scr' + 'ipt>');
        document.write('<scr' + 'ipt src="http://cpro.baidustatic.com/cpro/ui/mi.js"></scr' + 'ipt>');
    };

    /**
     * 加载cptop顶部插屏广告
     * @return {[type]} [description]
     */
    my.loadCptop = function(gg){
        if(!gg){
            return;
        }
        var arr = gg.split('_'),
            // alliance = arr[0],  // 联盟 目前只有baidu
            ggId = arr[1];      // 广告ID
        document.write('<scr' + 'ipt type="text/javascript"> var cpro_id = "' + ggId + '"; </scr' + 'ipt>');
        document.write('<scr' + 'ipt src="http://cpro.baidustatic.com/cpro/ui/cm.js" type="text/javascript"></scr' + 'ipt>');
    };

    /**
     * 加载txt1、txt2、txt3文字链广告
     * @return {[type]} [description]
     */
    my.loadTxt = function(gg, type, pos){
        if(!gg){
            return;
        }
        var $newsItems = $hnList.children('.news-item'),
            len = $newsItems.length,
            arr = gg.split('_'),
            alliance = arr[0],  // 联盟
            ggId = arr[1],      // 广告ID
            ggConfig = '(window.cpro_mobile_slot = window.cpro_mobile_slot || []).push({id : "' + ggId + '", at : "3", pat : "8", cpro_h : "30", tn : "template_inlay_all_mobile_lu_native_ad_txt", rss1 : "#ffffff", titFF : "%E5%BE%AE%E8%BD%AF%E9%9B%85%E9%BB%91", titFS : "16", rss2 : "#3C3C3C", conpl : "10", desfs : "10", conpr:"25", rss3 : "#999999", desbc : "#ffffff", pimc : "21", titSU : "0"})';
        if(pos >= len){
            pos = len - 1;
        } else if(pos < 0){
            pos = 0;
        } else {
            pos = pos - 1;
        }
        switch(alliance) {
            case 'baidu':
                if(type === 1){
                    $interestNews.before('<section class="gg-item news-gg-txt"><div id="cpro_' + ggId + '"></div></section>');
                } else {
                    console.warn($hnList.children());
                    $newsItems.eq(pos).after('<section class="gg-item news-gg-txt"><div id="cpro_' + ggId + '"></div><div class="line"></div></section>');
                }
                break;
            default: break;
        }
        my.createScript(ggConfig, function(){
            my.getScript('http://cpro.baidustatic.com/cpro/ui/cm.js', function(){}, $('#cpro_' + ggId)[0]);
        }, $('#cpro_' + ggId)[0]);
    };

    /**
     * 加载bottom广告
     * @return {[type]} [description]
     */
    my.loadBottom = function(gg){
        if(!gg){
            return;
        }
        var $newsItems = $hnList.children(),
            arr = gg.split('_'),
            alliance = arr[0],  // 联盟
            ggId = arr[1];      // 广告ID
        switch(alliance) {
            case 'sogou':
                $newsItems.eq($newsItems.length - 1).after('<section class="gg-item news-gg-img1"><iframe src="http://mini.eastday.com/toutiaoh5/partner/gg_sogou.html?ggid=' + ggId + '" frameborder="0" scrolling="no" width="100%" height="78"></iframe></section>');
                break;
            case 'gdt':
                var iframeId = 'gdt_' + ((+new Date()) + Math.random().toString(10).substring(2, 6));
                $newsItems.eq($newsItems.length - 1).after('<section class="gg-item news-gg-img1"><iframe id="' + iframeId + '" name="iframe" src="http://mini.eastday.com/toutiaoh5/partner/gg_gdt.html?qid=' + GLOBAL.Et.qid + '&uid=' + GLOBAL.Et.uid + '&ggid=' + ggId + '&iframeid=' + iframeId + '" frameborder="0" scrolling="no" marginheight="0" marginwidth="0" width="100%"></iframe></section>');
                break;
            default: 
                $newsItems.eq($newsItems.length - 1).after('<section class="gg-item news-gg-img1"><iframe src="http://mini.eastday.com/toutiaoh5/partner/gg_sogou.html?ggid=' + ggId + '" frameborder="0" scrolling="no" width="100%" height="78"></iframe></section>');
                break;
        }
    };

    /**
     * 添加引导下载APP链接
     */
    my.addAppLink = function(){
        var $articleContent = $('.J-article-content'),
            hasAppLink = false,
            qid = GLOBAL.Et.qid,
            qidToId = {
                'lt114116' : '2000000050',
                'smcn' : '2000000058',
                'lemonbrowser' : '2000000054',
                'hongbaoliulanqi' : '2000000053',
                '10086wy' : '2000000059',
                'coolpadbrowser' : '2000000060',
                'ningmengzhuomian' : '2000000061',
                'vivobrowser' : '2000000063',
                '2345yuki' : '2000000065',
                'gioneebrowser' : '2000000067',
                'kuhuasuoping' : '2000000069'
            },
            specialQids = {
                ios: ['lt114116', 'smcn'],
                android: ['lt114116', 'smcn', 'lemonbrowser', 'hongbaoliulanqi', '10086wy', 'coolpadbrowser', 'ningmengzhuomian', 'vivobrowser', '2345yuki', 'gioneebrowser', 'kuhuasuoping']
            },
            url = 'http://down.dftoutiao.com/qdhtml/poling/index.html?mnmentplqid=' + qid,
            appLink = '<a class="app-download" href="' + url + '" target="_blank" data-appid="' + qidToId[qid] + '"><img src="http://mini.eastday.com/dcminisite/img/download_btn01.png">打开应用，查看更多相关图片</a>';
        if(GLOBAL.Os.ios){
            if(specialQids.ios.contains(qid)){
                $articleContent.find('figure').append(appLink);
                hasAppLink = true;
            }
        } else if (GLOBAL.Os.android) {
            if(specialQids.android.contains(qid)){
                $articleContent.find('figure').append(appLink);
                hasAppLink = true;
            }
        }
        if(hasAppLink){
            // 展示日志记录
            appLinkShowLog(url, qidToId[qid]);
            $('.app-download').on('click', function(){
                var $this = $(this);
                appLinkClickLog($this.attr('href'), $this.attr('data-appid'));
            });
        }
    };

    /**
     * 特殊广告处理（kuhuasuoping、huisuoping）
     */
    my.addSpecialGg = function(){
        var qid = GLOBAL.Et.qid;
        if(qid === 'kuhuasuoping' && GLOBAL.Os.android){
            $('body').append('<div class="J-special-gg special-gg"><a target="_blank" href="http://app.coohua.com/CooHuaClient-2.1.2.3-cpqz_jrtt.apk"><img width="100%" src="http://mini.eastday.com/toutiaoh5/img/kuhuasuoping.jpg" alt="酷划锁屏"></a><span class="tag">广告</span><a class="J-special-gg-close close" href="javascript:void(0);">x</a></div>');
        } else if(qid === 'huisuoping' && GLOBAL.Os.android){
            $('body').append('<div class="J-special-gg special-gg"><a target="_blank" href="http://page.huisuoping.com/share/2/index.html?apk=b305"><img width="100%" src="http://mini.eastday.com/toutiaoh5/img/huisuoping.jpg" alt="惠锁屏"></a><span class="tag">广告</span><a class="J-special-gg-close close" href="javascript:void(0);">x</a></div>');
        } else if(qid === 'operabrower' && GLOBAL.Os.android){
            $('body').append('<div class="J-special-gg special-gg"><a target="_blank" style="display: block; height: 70px;" href="http://www.opgirl.cn/?did=146"><img width="100%" height="100%" src="http://mini.eastday.com/toutiaoh5/img/operabrowser.png" alt=""></a><span class="tag">广告</span><a class="J-special-gg-close close" href="javascript:void(0);">x</a></div>');
        }
        $('body').on('click', '.J-special-gg-close', function(){
            $(this).parent().remove();
        });
    };

    /**
     * 插入“点击查看更多新闻”链接按钮
     */
    function addMoreNewsBtn(){
        var qid = GLOBAL.Et.qid,
            fr = GLOBAL.Util.getUrlNoParams(),
            href = 'http://toutiao.eastday.com/?type=' + GLOBAL.Et.newsType + '&fr=' + fr,
            btn = '';
        switch(qid) {
            case 'wnwifi':
                href = 'http://toutiao.eastday.com/pages/index.html?type=' + GLOBAL.Et.newsType + '&fr=' + fr;
                btn = '<div class="more-news"><a id="J_more_news_btn" href="' + href + '" target="_blank">点击查看更多新闻</a></div>';
                break;
            case 'yichawang':
                href = 'http://toutiao.eastday.com/pages/index.html?type=' + GLOBAL.Et.newsType + '&fr=' + fr;
                btn = '<div class="more-news"><a id="J_more_news_btn" href="' + href + '" target="_blank">点击查看更多新闻</a></div>';
                break;
            case '51shoujizhushou':
                btn = '<div class="more-news"><a id="J_more_news_btn" href="' + href + '">点击查看更多新闻</a></div>';
                break;
            case 'vivobrowser':
                btn = '<div class="more-news"><a id="J_more_news_btn" href="' + href + '">点击查看更多新闻</a></div>';
                break;
            case 'qqbrowser':
                href = 'http://toutiao.eastday.com/nohd/index.html?type=' + GLOBAL.Et.newsType + '&fr=' + fr;
                btn = '<div class="more-news"><a id="J_more_news_btn" href="' + href + '" target="_blank">点击查看更多新闻</a></div>';
                break;
            default: 
                btn = '<div class="more-news"><a id="J_more_news_btn" href="' + href + '" target="_blank">点击查看更多新闻</a></div>';
                break;
        }
        $hotNews.after(btn);
    }

    /**
     * app引导下载按钮展示日志记录
     */
    function appLinkShowLog(advUrl, advId) {
        $.ajax({
            url : appShowLogUrl, 
            dataType : 'jsonp',
            data : {
                'qid': GLOBAL.Et.qid || 'null',
                'uid': GLOBAL.Et.uid || 'null',
                'loginid': 'null',
                'softtype': 'news',
                'softname': 'eastday_wapnews',
                'newstype': 'ad',
                'advurl': advUrl,   // 广告链接，此处为下载链接
                'os_type': GLOBAL.Util.getOsType() || 'null',   // 操作系统
                'browser_type': GLOBAL.Util.getBrowserType() || 'null', // 浏览器类型
                'pixel': window.screen.width + '*' + window.screen.height,  // 客户端分辨率
                'ime': 'null',
                'fr_url': 'null',
                'adv': advId   // 广告id
            },
            jsonp : 'jsonpcallback',
            success : function() {}
        });
    }

    /**
     * app引导下载按钮点击日志记录
     */
    function appLinkClickLog(advUrl, advId) {
        $.ajax({
            url : appClickLogUrl, 
            dataType : 'jsonp',
            data : {
                'qid': GLOBAL.Et.qid || 'null',
                'uid': GLOBAL.Et.uid || 'null',
                'loginid': 'null',
                'softtype': 'news',
                'softname': 'eastday_wapnews',
                'newstype': 'ad',
                'from': 'null',
                'to': advUrl,   // 下载链接
                'os_type': GLOBAL.Util.getOsType() || 'null',   // 操作系统
                'browser_type': GLOBAL.Util.getBrowserType() || 'null', // 浏览器类型
                'pixel': window.screen.width + '*' + window.screen.height,  // 客户端分辨率
                'ime': 'null',
                'fr_url': GLOBAL.Util.getUrlNoParams(),
                'adv': advId   // 广告id
            },
            jsonp : 'jsonpcallback',
            success : function() {}
        });
    }

    /**
     * 访问日志记录
     */
    function activeLog(){
        $.ajax({
            url : activeLogUrl, // active
            dataType : 'jsonp',
            data : {
                'qid': GLOBAL.Et.qid || 'null',
                'uid': GLOBAL.Et.uid || 'null',
                'loginid': GLOBAL.Util.getQueryString('ttaccid') || 'null',
                'softtype': 'news',
                'softname': 'eastday_wapnews',
                'newstype': GLOBAL.Et.newsType || 'null',
                'from': GLOBAL.Util.getQueryString('fr') || 'null',
                'to': GLOBAL.Util.getUrlNoParams() || 'null',
                'os_type': GLOBAL.Util.getOsType() || 'null',
                'browser_type': GLOBAL.Util.getBrowserType() || 'null',
                'pixel': window.screen.width + '*' + window.screen.height,
                'ime': GLOBAL.Util.getQueryString('ime') || 'null',
                'idx': GLOBAL.Util.getQueryString('idx') || 'null',
                'ishot': GLOBAL.Util.getQueryString('ishot') || 'null',
                'fr_url': GLOBAL.Util.getReferrer() || 'null',
                'ver': GLOBAL.Util.getQueryString('ver') || 'null',
                'appqid': GLOBAL.Util.getQueryString('appqid') || 'null',
                'ttloginid': GLOBAL.Util.getQueryString('ttloginid') || 'null',
                'apptypeid': GLOBAL.Util.getQueryString('apptypeid') || 'null',
                'appver': GLOBAL.Util.getQueryString('appver') || 'null',
                'recommendtype': GLOBAL.Util.getQueryString('recommendtype') || 'null',
                'ispush': GLOBAL.Util.getQueryString('ispush') || 'null',
                'deviceid': GLOBAL.Util.getQueryString('deviceid') || 'null'
            },
            jsonp : 'jsonpcallback',
            success : function() {
            }
        });
    }

    /**
     * 在线日志记录
     */
    function onlineLog(params){
        $.ajax({
            url : onlineLogUrl, // online
            dataType : 'jsonp',
            data : {
                param: encodeURI(params)
            },
            jsonp : 'jsonpcallback'
        });
    }

    function iframeLog(){
        var $iframes = $('iframe'),
            uid = GLOBAL.Et.uid,
            qid = GLOBAL.Et.qid,
            os = GLOBAL.Util.getOsType(),
            browser = GLOBAL.Util.getBrowserType(),
            url = window.location.href,
            ifrStr = '',
            params = '';
        $iframes.each(function(){
            var src = $(this).attr('src').split('?')[0];
            if(ifrStr){
                ifrStr += ('@#' + src);
            } else {
                ifrStr += src;
            }
        });
        params = uid + '\t' + qid + '\t' + os + '\t' + browser + '\t' + url + '\t' + ifrStr;
        $.ajax({
            url : iframeLogUrl, 
            dataType : 'jsonp',
            data : {
                param: params
            },
            jsonp : 'jsonpcallback'
        });
    }

	my.loadCommonPage = function() {
        var scope = this,
            mygg = GLOBAL.Et.gg.my;

        // 日志记录
        try {
            // 访问日志
            activeLog();
            // 在线日志
            var urlNoParams = GLOBAL.Util.getUrlNoParams(),
                uid = GLOBAL.Et.uid,
                qid = GLOBAL.Et.qid || 'null',
                apptypeid = 'null',
                ime = 'null',
                ttaccid = 'null',
                type = GLOBAL.Et.newsType || 'null',
                intervaltime = 10,  // 10s
                ver = 'null',
                appqid = 'null',
                os = GLOBAL.Util.getOsType(),
                ttloginid = 'null',
                onlineLogTime = 10 * 60 * 1000, // 10分钟之后不再上传online日志
                onlineTimer = null,
                params = urlNoParams + '\t' + uid + '\t' + qid + '\t' + apptypeid + '\t' + ime + '\t' + ttaccid + '\t' + type + '\t' + intervaltime + '\t' + ver + '\t' + appqid + '\t' + os + '\t' + ttloginid;
            onlineLog(params);
            // 每隔10s发送一次
            onlineTimer = setInterval(function(){
                onlineLog(params);
            }, intervaltime * 1000);
            // 10分钟之后不再上传online日志
            setTimeout(function(){
                clearInterval(onlineTimer);
            }, onlineLogTime);
        } catch (e) {
            console.error('Log error: \n', e);
        }

        // 广告six
		try {
            scope.loadSix(mygg.six);
        } catch (e) {
            console.error('loadSix has error: \n', e);
        }

        // 插入软文
        try {
            loadSoftWords();
        } catch (e) {
            console.error('loadSoftWords has error: \n', e);
        }

        // 插入微信二维码（新闻早餐）
        try {
            if(GLOBAL.Browser && GLOBAL.Browser.wechat){
                var wechatTimer = setInterval(function(){
                    if(hasSofrWords){
                        loadWechatEwm();
                        clearInterval(wechatTimer);
                    }
                }, 1000);
            }
        } catch (e) {
            console.error('loadWechatEwm has error: \n', e);
        }

        // 热点新闻 
        try {
            loadHotNewsData();
        } catch (e) {
            console.error('loadHotNewsData has error: \n', e);
        }

        // 更多新闻点击事件（日志记录）
        try {
            $('body').on('click', '#J_more_news_btn', function(){
                // 给首页传递信息，告诉首页这是从内页跳转过来的，首页不需要记PV，因为内页这边记过了。
                Cookies.set('FROM_DETAILS_MORE_NEWS', '1', {expires: 1, path: '/', domain: 'eastday.com'});
                $.ajax({
                    url : activeLogUrl, // active
                    dataType : 'jsonp',
                    data : {
                        "qid": GLOBAL.Et.qid || 'null',
                        "uid": GLOBAL.Et.uid || 'null',
                        "loginid": 'null',
                        "softtype": 'news',
                        "softname": 'eastday_wapnews',
                        "newstype": GLOBAL.Et.newsType || 'null',
                        "from": GLOBAL.Util.getUrlNoParams() || 'null',
                        "to": GLOBAL.Et.newsType || 'null',
                        "os_type": GLOBAL.Util.getOsType() || 'null',
                        "browser_type": GLOBAL.Util.getBrowserType() || 'null',
                        "pixel": window.screen.width + '*' + window.screen.height,
                        "ime": GLOBAL.Util.getQueryString('ime') || 'null'
                    },
                    jsonp : 'jsonpcallback',
                    success : function() {}
                });
            });
        } catch (e) {
            console.error('MoreNewsBtn(click event) has error: \n', e);
        }

        try {
            // 推广新闻点击委托事件
            $('body').on('click', '.J-promote-news', function(){
                var $this = $(this),
                    advUrl = $this.attr('href'),
                    advId = $this.data('advid');
                appLinkClickLog(advUrl, advId);
            });
        } catch (e) {
            console.error('".J-promote-news" click event has error: \n', e);
        }

        // 特殊广告添加
        try {
            scope.addSpecialGg();
        } catch (e) {
            console.error('addSpecialGg has error: \n', e);
        }

        // 加载引导下载app的链接（暂时先下线）
        /*try {
            var t0 = setInterval(function(){
                if(hasListNews){
                    scope.addAppLink();
                    clearInterval(t0);
                }
            }, 400);
        } catch (e) {
            console.error('loadTxt has error: \n', e);
        }*/

        // 广告txt1、txt2、txt3
        try {
            // 加载第一个文字链广告
            scope.loadTxt(mygg.txt1, 1);
            // 加载信息流中的文字链广告
            var t1 = setInterval(function(){
                if(hasListNews){
                    scope.loadTxt(mygg.txt2, 2, 5);
                    scope.loadTxt(mygg.txt3, 3, 8);
                    clearInterval(t1);
                }
            }, 400);
        } catch (e) {
            console.error('loadTxt has error: \n', e);
        }

        // 广告threeup、threedown
		try {
            // 加载信息流中的三宫格广告
            var t2 = setInterval(function(){
                if(hasListNews){
                    scope.loadThree(mygg.threeup, 2);
                    scope.loadThree(mygg.threedown, 7);
                    clearInterval(t2);
                }
            }, 400);
        } catch (e) {
            console.error('loadThree has error!', e);
        }

        // 广告bottom
        try {
            // 加载信息流中的bottom广告
            var t3 = setInterval(function(){
                if(hasListNews){
                    scope.loadBottom(mygg.bottom);
                    clearInterval(t3);
                }
            }, 400);
        } catch (e) {
            console.error('loadBottom has error!', e);
        }

        // iframe统计
        try {
            // iframe日志记录(20s之后)
            setTimeout(function(){
                iframeLog();
            }, 20000);
        } catch (e) {
            console.error('iframeLog has error!', e);
        }

	};

	return my;
})(module || {});

/**
 * wnwifi页面模板
 */
var module = (function(my){
	// 存储一系列初始化方法
	my.inits = my.inits || [];

    var dataUrl = 'http://toutiao.eastday.com/toutiao_h5/newsmore',
        $hotNews = $('#J_hot_news'),
        $moreNews = $('<div class="wnwifi-more-news"></div>');

    function loadData(){
        $.ajax({
            url: dataUrl,
            data : {
                "type": GLOBAL.Et.newsType,
                "endkey": '',
                "url": GLOBAL.Util.getUrlNoParams(),
                "newsnum": 10,
                'recgid': GLOBAL.Et.uid
            },
            dataType: 'jsonp',
            jsonp: 'jsonpcallback',
            success: function(rst){
                var data = rst ? rst.data : '';
                if(data){
                    generateDom(data);
                } else {
                    console.warn('未获取到数据!');
                }
            }
        });
    }

    function generateDom(data){
        if(!data || !data.length){
            return false;
        }
        var $moreNewsList = $('<ul class="wnwifi-news-list"></ul>');
        // $moreNews.append('<div class="hn-title"><h2><span></span>更多阅读</h2><span class="line"></span></div>');
        var len = data.length;
        for (var i = 0; i < len; i++) {
            var item = data[i],
                url = item.url,
                topic = item.topic,
                recommendtype = item.recommendtype ? item.recommendtype : '-1',
                hot = Number(item.hotnews),     // 热门
                rec = Number(item.isrecom),     // 推荐
                idx = i + 1,
                fr = GLOBAL.Util.getUrlNoParams();

            // url处理
            // url = (isgg != '1') ? ('http://mini.eastday.com/mobile/' + url) : url;
            url += '?qid=' + GLOBAL.Et.qid + '&idx=' + idx + '&fr=' + fr + '&recommendtype=' + recommendtype;

            if(hot){
                url += '&ishot=1';
            } else if(rec){
                url += '&isrecom=1';
            } else {
                url += '&ishot=0';
            }
            $moreNewsList.append('<li class="news-item"><a class="wnwifi-more-news-link" href="' + url + '">' + topic + '</a></li>');
        }

        $hotNews.append($moreNews.append('<h3>更多阅读<span></span></h3>').append($moreNewsList));
    }

	/**
	 * 加载wnwifi特殊渠道详情内页模板
	 * @return {[type]} [description]
	 */
	my.loadWnwifiPage = function() {
        // 隐藏评论功能（防止报错，先隐藏而不是直接删除）
        try {
            $('#SOHUCS').hide();
            $('#changyan_mobile_js').hide();
        } catch (e) {
        }

        try {
            loadData();
        } catch (e) {
            console.error('LoadHotNews has error: \n', e);
        }

        // 删除评论功能
        setTimeout(function(){
            $('[src^="http://changyan"]').remove();
            $('#SOHUCS').remove();
            $('#changyan_mobile_js').remove();
        }, 3000);
	};

	return my;
})(module || {});

/* ==============================
    随DOM生成一起执行的代码（主要是广告代码）
 ================================ */
(function(){
    var mygg = GLOBAL.Et.gg.my;
    // 根据不同渠道加载数据模板
    if(GLOBAL.Et.qid && GLOBAL.Et.qid === 'wnwifi'){
        // TODO...
    } else {
        // 图加广告
        try {
            module.loadTujia(mygg.tujia);
        } catch (e) {
            console.error('loadTujia has error: \n', e);
        }
        //  插屏广告
        try {
            module.loadCptop(mygg.cptop);
        } catch (e) {
            console.error('loadCptop has error: \n', e);
        }

        // 头部link信息（本应该直接写入html，为了兼容APP，所以采用js动态引入）
        try {
            $('title').before('<link rel="dns-prefetch" href="http://mini.eastday.com/" /><link rel="shortcut icon" href="http://mini.eastday.com/toutiaoh5/img/favicon.ico" /><link rel="bookmark" href="http://mini.eastday.com/toutiaoh5/img/favicon.ico" type="image/x-icon" /><link rel="apple-touch-icon-precomposed" href="http://mini.eastday.com/toutiaoh5/img/favicon.ico">');
        } catch (e){}

        // 百度统计
        document.write('<scr' + 'ipt>var _hmt = _hmt || []; (function() {var hm = document.createElement("script"); hm.src = "//hm.baidu.com/hm.js?c97c021a953e8eea5f6d96f3bc1d3adb"; var s = document.getElementsByTagName("script")[0]; s.parentNode.insertBefore(hm, s); })();</scr' + 'ipt>'); 
    }

    // vast广告
    // document.write('<scr' + 'ipt src="./js/vast.js"></scr' + 'ipt>');
    // document.write('<scr' + 'ipt src="http://mini.eastday.com/toutiaoh5/js/vast.min.js"></scr' + 'ipt>');

    // document.write('<scr' + 'ipt>var _hmt = _hmt || [];_hmt.push(["_setUserId", "' + GLOBAL.Et.uid + '"]); (function() {var hm = document.createElement("script"); hm.src = "//hm.baidu.com/hm.js?3696496bc8f50e6f4c37edd0d0fe5090"; var s = document.getElementsByTagName("script")[0]; s.parentNode.insertBefore(hm, s); })();</scr' + 'ipt>');
    
}());

/* ==============================
    DOM生成后执行的代码
 ================================ */
$(function(){
	// forEach方法的兼容解决方法
	(function(){
		// Production steps of ECMA-262, Edition 5, 15.4.4.18
		// Reference: http://es5.github.io/#x15.4.4.18
		if (!Array.prototype.forEach) {
		  Array.prototype.forEach = function(callback, thisArg) {
		    var T, k;
		    if (this == null) {
		      throw new TypeError(' this is null or not defined');
		    }
		    // 1. Let O be the result of calling toObject() passing the
		    // |this| value as the argument.
		    var O = Object(this);
		    // 2. Let lenValue be the result of calling the Get() internal
		    // method of O with the argument "length".
		    // 3. Let len be toUint32(lenValue).
		    var len = O.length >>> 0;
		    // 4. If isCallable(callback) is false, throw a TypeError exception. 
		    // See: http://es5.github.com/#x9.11
		    if (typeof callback !== "function") {
		      throw new TypeError(callback + ' is not a function');
		    }
		    // 5. If thisArg was supplied, let T be thisArg; else let
		    // T be undefined.
		    if (arguments.length > 1) {
		      T = thisArg;
		    }
		    // 6. Let k be 0
		    k = 0;
		    // 7. Repeat, while k < len
		    while (k < len) {
		      var kValue;
		      // a. Let Pk be ToString(k).
		      //    This is implicit for LHS operands of the in operator
		      // b. Let kPresent be the result of calling the HasProperty
		      //    internal method of O with argument Pk.
		      //    This step can be combined with c
		      // c. If kPresent is true, then
		      if (k in O) {
		        // i. Let kValue be the result of calling the Get internal
		        // method of O with argument Pk.
		        kValue = O[k];
		        // ii. Call the Call internal method of callback with T as
		        // the this value and argument list containing kValue, k, and O.
		        callback.call(T, kValue, k, O);
		      }
		      // d. Increase k by 1.
		      k++;
		    }
		    // 8. return undefined
		  };
		}
	}());

	// 调用初始化方法
	module.inits.forEach(function(fn){
		if(typeof fn === 'function'){
			try {
				fn();
			} catch (e) {
				console.error(e);
			}
		}
	});

	// 根据不同渠道加载数据模板
	if(GLOBAL.Et.qid && GLOBAL.Et.qid !== 'wnwifi'){
		// 加载一般渠道页面
		module.loadCommonPage();
    } else {
        // 加载特殊渠道（wnwifi）页面
        module.loadWnwifiPage();
	}

});