/**
 * 搜索页面js
 * @author lizhigao(lizhigao@021.com)
 * @date 2016-01-05
 */
$(function(){
    var $resultWrap = $('#J_result_wrap'),				// 结果容器
    	$top10List = $('#J_top10_list'),				// 今日top10
    	$todayHotNews = $('#J_today_hot_news'),			// 今日热点
    	$searchTotalNum = $('#J_search_total_num'),		// 搜索结果总数
    	imgHostName = 'http://imgmini.dfshurufa.com/',	// 图片hostname
    	global_share_title  = '',	// 分享标题
    	global_share_url  = '',		// 分享链接
    	global_share_img  = '',		// 分享图片
    	bdshareStr = '<div id="bdsharebuttonbox_wrap"><div class="J-bdsharebuttonbox bdsharebuttonbox clearfix"><span class="fl">分享</span><a class="J-bdshare bds-tsina fl" data-cmd="tsina" href="javascript:;"></a><a class="J-bdshare bds-qzone fl" data-cmd="qzone" href="javascript:;"></a><a class="J-bdshare bds-tqq fl" data-cmd="tqq" href="javascript:;"></a><a class="J-bdshare bds-weixin fl" data-cmd="weixin" href="javascript:;"></a></div></div>';
    // 获取搜索结果数据
    $.getJSON('json/search_result.json', function(data, status){
    	if(!(data || data.data)){
    		return;
    	}
    	if(data.data.length > 0){
    		// 有搜索结果
	    	generateSearchResult(data.data);
    	} else {
    		// 无搜索结果
    		generateNoResult();
    		// 获取推荐新闻数据
    		$.getJSON('json/rec_news.json', function(data, status){
				if(!(data || data.data)){
		    		return;
		    	}
		    	// 生成推荐新闻
    			generateRecommendNews(data.data);
    		});
    	}
    });

    // 加载今日热点数据
    $.getJSON('json/today_hot_news.json', function(data, status){
		if(!(data || data.data)){
    		return;
    	}
		generateTodayHotNews(data.data);
	});

    // 加载今日top10数据
	$.getJSON('json/today_top10.json', function(data, status){
		if(!(data || data.data)){
    		return;
    	}
		generateTodayTop10(data.data);
	});

    /**
     * 百度分享按钮的事件委托绑定
     */
    $('body').on('mouseover', '.J-bdshare', function(){
    	var $this = $(this),
    		$parent = $this.parents('.J-has-share').eq(0),
    		$shareA = $parent.find('.J-share-a').eq(0);
    	// 给全局变量 分享链接、图片、文字赋值
		global_share_url = window.location.protocol + '//' + window.location.host + $shareA.attr('href');
		global_share_title = $shareA.text();
		global_share_img = $parent.find('img').eq(0).attr('src');
    });

    (function(){
    	// 百度分享配置
	    window._bd_share_config = {
	        common: {
	            //bdText: "东方头条 - 你想看的新闻都在这。",	// 分享标题
	            //bdDesc: "东方头条 - 你想看的新闻都在这。",	// 分享描述
	            //bdUrl: "http://mini.eastday.com", 			// 分享url
	            //bdPic: '', 									// 分享图片
	            bdMiniList: ['tsina', 'qzone', 'tqq', 'weixin'],
	            onBeforeClick: setShareConfig
	        },
	        share: {
	            bdSize: 16
	        }
	    };
	    // 分享js
	    with(document)0[(getElementsByTagName('head')[0]||body).appendChild(createElement('script')).src='http://bdimg.share.baidu.com/static/api/js/share.js?cdnversion='+~(-new Date()/36e5)];
	    /**
	     * 设置分享参数
	     * @param {[type]} cmd    [description]
	     * @param {[type]} config [description]
	     */
		function setShareConfig(cmd, config) {
	        if (global_share_title) {
	            config.bdText = global_share_title + '（来自：东方头条）';
	        }
	        if (global_share_url) {
	            config.bdUrl = global_share_url;
	        }
	        if (global_share_img) {
	            config.bdPic = global_share_img;
	        }
	        return config;
	    }
    })();

    /**
     * 有搜索结果(生成搜索结果列表)
     * @param  {[type]} data 
     * @return {[type]}      [description]
     */
	function generateSearchResult(d){
		var dLength = d.length,
			$resultList = $('<ul class="result-list"></ul>');
    	try{
    		for (var i = 0; i < dLength; i++) {
    			var url = d[i].url,					// url
		    		title = $.trim(d[i].title),		// 标题
		    		source = $.trim(d[i].source),	// 来源
		    		imgArr = d[i].imgstr,			// 图片数组
		    		imgLength = imgArr.length,		// 图片数量
		    		dateTime = new Date(d[i].ts),	// 时间戳
		    		time = timeToString(dateTime),	// 转换之后的字符串时间
		    		date = d[i].date;				// 日期
		    	// 多图样式
		    	if(imgLength >= 3){
		    		var imgSrc1 = imgArr[0].src,
		    			imgSrc2 = imgArr[1].src,
		    			imgSrc3 = imgArr[2].src;
		    		$resultList.append('<li class="J-has-share result-item-s2 pr clearfix"><h3><a class="J-share-a" href="' + url +'" target="_blank">' + title + '</a></h3><p class="img-wrap clearfix"><a class="fl" href="' + url +'" title="' + title + '" target="_blank"><img src="' + imgSrc1 + '" alt="" width="200" height="150"></a><a class="fl" href="' + url +'" title="' + title + '" target="_blank"><img src="' + imgSrc2 + '" alt="" width="200" height="150"></a><a class="fl" href="' + url +'" title="' + title + '" target="_blank"><img src="' + imgSrc3 + '" alt="" width="200" height="150"></a></p><p class="from">' + time + ' 来源：' + source + '</p>' + bdshareStr + '</li>');
		    	} else {	// 单图样式
		    		var imgSrc = imgArr[0].src;
		    		$resultList.append('<li class="J-has-share result-item-s1 clearfix"><div class="img fl"><a href="' + url +'" target="_blank"><img src="' + imgSrc + '" width="145" height="105"></a></div><div class="info pr"><h3><a class="J-share-a" href="' + url +'" target="_blank">' + title + '</a></h3><p class="from">' + time + ' 来源：' + source + '</p>' + bdshareStr + '</div></li>');
		    	}
    		};
    		$resultWrap.append($resultList);
    	} catch(e){
    		console.error(e);
    	}
	}

	/**
	 * 无搜索结果(生成无结果页面)
	 * @return {[type]} [description]
	 */
	function generateNoResult(){
		var $noResult = $('<p class="no-result tc mt10"><img src="assets/images/no_result.png" alt="" width="581" height="282"></p>');
		$resultWrap.append($noResult);
	}

	/**
	 * 生成推荐新闻
	 * @param  {Object} d 推荐新闻数据
	 * @return {[type]}   [description]
	 */
	function generateRecommendNews(d){
		var dLength = d.length,
			// 推荐新闻
			$recNewsWrap = $('<div class="rec-news-wrap mt10"><div class="rec-news-title pr"><h3>推荐新闻</h3><span class="bt-line"></span></div></div>'),
			// 推荐新闻列表
			$recNewsList = $('<ul class="rec-news-list"></ul>');
    	try{
    		for (var i = 0; i < dLength; i++) {
    			var url = d[i].url,					// url
		    		title = $.trim(d[i].topic),		// 标题
		    		source = $.trim(d[i].source),	// 来源
		    		desc = $.trim(d[i].desc),		// 描述
		    		imgSrc = imgHostName + $.trim(d[i].img), // 图片地址
		    		time = d[i].time;				// 时间
		    	// 单图样式
	    		$recNewsList.append('<li class="J-has-share rec-news-item-s1 clearfix"><div class="img fl"><a href="' + url +'" target="_blank"><img src="' + imgSrc + '" width="180" height="135"></a></div><div class="info pr"><h3><a class="J-share-a" href="' + url +'" target="_blank">' + title + '</a></h3><p class="desc">' + desc + '</p><p class="from">' + time + ' 来源：' + source + '</p>' + bdshareStr + '</div></li>');
    		};
    		$resultWrap.append($recNewsWrap.append($recNewsList));
    	} catch(e){
    		console.error(e);
    	}
	}
	// old
	function generateRecommendNews_old(d){
		var dLength = d.length,
			// 推荐新闻
			$recNewsWrap = $('<div class="rec-news-wrap mt10"><div class="rec-news-title pr"><h3>推荐新闻</h3><span class="bt-line"></span></div></div>'),
			// 推荐新闻列表
			$recNewsList = $('<ul class="rec-news-list"></ul>');
    	try{
    		for (var i = 0; i < dLength; i++) {
    			var url = d[i].url,					// url
		    		title = $.trim(d[i].title),		// 标题
		    		source = $.trim(d[i].source),	// 来源
		    		desc = $.trim(d[i].desc),		// 描述
		    		imgArr = d[i].imgstr,			// 图片数组
		    		imgLength = imgArr.length,		// 图片数量
		    		dateTime = new Date(d[i].ts),	// 时间戳
		    		time = timeToString(dateTime),	// 转换之后的字符串时间
		    		date = d[i].date;				// 日期
		    	// 多图样式
		    	if(imgLength >= 3){
		    		var imgSrc1 = imgArr[0].src,
		    			imgSrc2 = imgArr[1].src,
		    			imgSrc3 = imgArr[2].src;
		    		$recNewsList.append('<li class="J-has-share rec-news-item-s2 pr clearfix"><h3 class="pr"><i class="hot">热</i><a href="' + url +'" target="_blank">' + title + '</a></h3><p class="img-wrap clearfix"><a class="fl" href="' + url +'" title="' + title + '" target="_blank"><img src="' + imgSrc1 + '" alt="" width="200" height="150"></a><a class="fl" href="' + url +'" title="' + title + '" target="_blank"><img src="' + imgSrc2 + '" alt="" width="200" height="150"></a><a class="fl" href="' + url +'" title="' + title + '" target="_blank"><img src="' + imgSrc3 + '" alt="" width="200" height="150"></a></p><p class="from">' + time + ' 来源：' + source + '</p>' + bdshareStr + '</li>');
		    	} else {	// 单图样式
		    		var imgSrc = imgArr[0].src;
		    		$recNewsList.append('<li class="rec-news-item-s1 clearfix"><div class="img fl"><a href="' + url +'" target="_blank"><img src="' + imgSrc + '" width="180" height="135"></a></div><div class="info pr"><h3><a href="' + url +'" target="_blank">' + title + '</a></h3><p class="desc">' + desc + '</p><p class="from">' + time + ' 来源：' + source + '</p>' + bdshareStr + '</div><i class="hot">热</i></li>');
		    	}
    		};
    		$resultWrap.append($recNewsWrap.append($recNewsList));
    	} catch(e){
    		console.error(e);
    	}
	}

	/**
	 * 生成今日热点数据
	 * @param  {[type]} d 今日热点数据
	 * @return {[type]}   [description]
	 */
	function generateTodayHotNews(d){
		var dLength = d.length;
		for (var i = 0; i < dLength; i++) {
			var imgSrc = imgHostName + $.trim(d[i].img),
				title = $.trim(d[i].topic),
				url = d[i].url;
			$todayHotNews.append('<div class="block fl"><a href="' + url +'" target="_blank" class="img"><img src="' + imgSrc + '" alt="" width="145" height="105"></a><a href="' + url +'" target="_blank" class="txt">' + title +'</a></div>');
		}
	}

	/**
	 * 生成今日top10数据
	 * @param  {[type]} d 今日top10数据
	 * @return {[type]}   [description]
	 */
	function generateTodayTop10(d){
		var dLength = d.length;
		for (var i = 0; i < dLength; i++) {
			var imgSrc = imgHostName + $.trim(d[i].img),
				title = $.trim(d[i].topic),
				url = d[i].url;
			if(i < 3){
				$top10List.append('<li class="top10-item"><span class="hot">' + (i + 1) + '</span><a href="' + url +'" target="_blank" title="' + title +'">' + title +'</a></li>');
			} else {
				$top10List.append('<li class="top10-item"><span>' + (i + 1) + '</span><a href="' + url +'" target="_blank" title="' + title +'">' + title +'</a></li>');
			}
		}
	}

    /**
     * 发送Ajax请求(POST)
     * @param  {String}   url      请求的url
     * @param  {Ojject}   config   参数
     * @param  {Function} success  成功回调方法
     * @param  {Function} error    失败回调方法
     * @return {[type]}            [description]
     */
    function sendAjax(url, config, success, error){
    	if(!$.trim(url)){
    		return;
    	}
    	var d = config.data ? config.data : {};
    	$.ajax({
    		type: 'POST',
    		url: url,
    		data: d,
    		success: callback,
    		error: error
    	});
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
    	var str = year + '-' + month + '-' + day + ' ' + h + ':' + m;
    	if(splitStr){
    		str = str.replace(/-/g, splitStr);
    	}
    	return str;
    }


});

