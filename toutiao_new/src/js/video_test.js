/**
 * 依赖其他所有js
 */
FastClick.attach(document.body);
// forEach方法的兼容解决方法
(function(){
	if (!Array.prototype.forEach) {Array.prototype.forEach = function(callback, thisArg) {var T, k; if (this == null) {throw new TypeError(' this is null or not defined'); } var O = Object(this); var len = O.length >>> 0; if (typeof callback !== "function") {throw new TypeError(callback + ' is not a function'); } if (arguments.length > 1) {T = thisArg; } k = 0; while (k < len) {var kValue; if (k in O) {kValue = O[k]; callback.call(T, kValue, k, O); } k++; } }; } 
}());
/**
 * 模块模板
 */
var module = (function(my){
	// 存储一系列初始化方法
	my.inits = my.inits || [];
	// to do...
	return my;
})(module || {});


var module = (function(my){
	// 存储一系列初始化方法
	my.inits = my.inits || [];
	var videoUrl = 'http://toutiao.eastday.com/pjson/morevideos',			// 视频信息流接口
		qid = GLOBAL.Util.getQueryString('qid') || Cookies.get('qid') || 'null',
		userId = Cookies.get('user_id'),
		$newsList = $('#J_news_list'),
		$loading = $('#J_loading'),
		pullUpFlag = false,
		vtype = 'vgaoxiao', //window.location.hash.substring(1) || 'vgaoxiao',
		firstCtgFlag = true,	// 用于判断是否插入的第一个分类菜单
		ctgNum = 0,	// 用于对插入的视频分类计数（只插入4个分类菜单，每个菜单4个类别）
		videoCtg = [
			{name: '搞笑', value: 'vgaoxiao'},
			{name: '拍客', value: 'vpaike'},
			{name: '资讯', value: 'vzixun'},
			{name: '体育', value: 'vtiyu'},
			{name: '汽车', value: 'vqiche'},
			{name: '科技', value: 'vkeji'},
			{name: '财经', value: 'vcaijing'},
			{name: '娱乐', value: 'vyule'},
			{name: '原创', value: 'vyuanchuang'},
			{name: '旅游', value: 'vlvyou'},
			{name: '时尚', value: 'vshishang'},
			{name: '亲子', value: 'vqinzi'},
			{name: '教育', value: 'vjiaoyu'},
			{name: '游戏', value: 'vyouxi'},
			{name: '生活', value: 'vshenghuo'},
			{name: '纪录片', value: 'vjilupian'},
			{name: '公益', value: 'vgongyi'}
		];

	/**
	 * 生成视频列表
	 */
	function generateVideoList(data){
		// console.log('data::', data);
		var scope = this,
			d = data.data ? data.data : null,
			len = d ? d.length : 0;
		if(len > 0){
			// 随机获取4个视频分类组成菜单插入视频新闻流中
			var ctgArr = [],
				i = 0,
				vcLen = videoCtg.length,
				mySplit = Math.floor(vcLen / 4),
				max = vcLen,
				min = 0,
				random = 0;
			for (i = 0; i < 4; i++) {
				switch(i) {
					case 0:
						min = 0;
						max = mySplit;
						break;
					case 1:
						min = mySplit;
						max = mySplit * 2;
						break;
					case 2:
						min = mySplit * 2;
						max = mySplit * 3;
						break;
					case 3:
						min = mySplit * 3;
						max = vcLen;
						break;
				}
				random = Math.floor((max - min) * Math.random() + min);
				// console.log('min::', min);
				// console.log('max::', max);
				// console.log('random::', random + '\n\n');
				if(i === 0 && firstCtgFlag){
					ctgArr[i] = {name: '推荐', value: 'vtuijian'};
				} else {
					ctgArr[i] = videoCtg[random];
				}
			}

			for (i = 0; i < len; i++) {
				var item = d[i],
					itemImg43 = item.miniimg_01,	// 4:3
					itemImg = itemImg43[0],
					idx = i + 1,
					fr = GLOBAL.Util.getUrlNoParams(),
					href = item.url + '?qid=' + scope.qid + '&idx=' + idx + '&fr=' + fr,
					type = item.type,
					topic = item.topic,
					source = item.source,
					imgSrc = itemImg.src,
					imgWidth = itemImg.imgwidth,
					imgHeight = itemImg.imgheight,
					ctgPos = false,
					duration = GLOBAL.Util.msToTimestr(item.videoalltime);
				// $newsList.append('<section class="news-item news-item-video"><a data-type="' + type + '" data-subtype="" href="' + href + '"><div class="news-wrap clearfix"><div class="txt-wrap fl"><h3>' + topic + '</h3> <p><em class="fl">' + source + '</em></p></div><div class="img-wrap fr"><img class="lazy" src="' + imgSrc + '" alt="" data-width="' + imgWidth + '" data-height="' + imgHeight + '"><span class="duration">' + duration + '</span></div></div></a></section>');
				
				// 插入视频分类列表（第一屏在第6个位置插入，后面每屏在第1、第6个位置插入）
				if(firstCtgFlag){
					ctgPos = (i !== 0 && i % 5 === 0);
				} else {
					ctgPos = (i + 5) % 5 === 0;
				}
				if(ctgNum < 4 && ctgPos){
					$newsList.append('<section class="news-ctg"><div class="video-ctg-wrap"><div class="wrapper clearfix"><span class="fl">分类推荐</span><div class="link-wrap fl"><a class="J-video-ctg" data-type="' + ctgArr[0].value + '" href="#' + ctgArr[0].value + '">' + ctgArr[0].name + '</a><a class="J-video-ctg" data-type="' + ctgArr[1].value + '" href="#' + ctgArr[1].value + '">' + ctgArr[1].name + '</a><a class="J-video-ctg" data-type="' + ctgArr[2].value + '" href="#' + ctgArr[2].value + '">' + ctgArr[2].name + '</a><a class="J-video-ctg" data-type="' + ctgArr[3].value + '" href="#' + ctgArr[3].value + '">' + ctgArr[3].name + '</a></div></div></div></section>');
					ctgNum++;
				}

				$newsList.append('<section class="news-item news-item-video-link"> <a data-type="' + type + '" data-subtype="" href="' + href + '"> <div class="news-wrap clearfix"> <div class="txt-wrap fr"> <h3>' + topic + '</h3> <p><em class="fl"><i class="video">视频</i></em><em class="fr">' + source + '</em></p> </div> <div class="img-wrap fl"> <img class="lazy" src="' + imgSrc + '" alt="" data-width="' + imgWidth + '" data-height="' + imgHeight + '"> <span class="play-btn"></span> </div> </div> </a> </section>');
			}
		}
	}

	/**
	 * 加载视频数据
	 */
	my.loadData = function(callback){
		// var scope = this;
		$.ajax({
			url: videoUrl,
            data: {
                type: vtype, // 'vpaike',// $('#J_video').attr('data-type'),
				num: '20',
				qid: qid,
				recgid: userId,
				url: GLOBAL.Util.getUrlNoParams()
            },
            dataType: 'jsonp',
            jsonp: "jsonpcallback",
            timeout: 8000,
            beforeSend: function(){
            	pullUpFlag = false;
            	// $related.append($moreVideoLoading);
            },
            success: function(data){
                generateVideoList(data);
            },
            error: function(e){
            	console.error(e);
            },
            complete: function(jqXHR, textStatus){
            	pullUpFlag = true;
            	firstCtgFlag = false;
                callback && callback();
                // if('timeout' === textStatus){
                // 	$related.append('<p style="padding: 0.1rem 0 0.2rem; font-size: 0.24rem; color: #999; text-align: center; margin-top: 0.2rem;">请求超时，请检查网络连接状态或<a href="javascript:location.reload();">刷新页面</a>重试。</p>');
                // }
                // $moreVideoLoading && $moreVideoLoading.remove();
            }
		});

	};

	my.resetFlag = function(){
		$newsList.empty();
    	firstCtgFlag = true;
    	ctgNum = 0;
	};

	/**
	 * 初始化
	 */
	my.inits.push(function(){
		my.loadData();

		/* 页面滚动监听（当滑到底部时，加载下一页数据。） */
		$(window).on('scroll', function() {
            var scrollTop = GLOBAL.Util.getScrollTop(),
                loadingOT = $loading.offset().top,
                cHeight = GLOBAL.Util.getClientHeight();
            // 上拉加载数据(pullUpFlag标志 防止操作过快多次加载)
            if(loadingOT >= cHeight && scrollTop + cHeight >= loadingOT && pullUpFlag){
                my.loadData();
            }
        });

        $('body').on('click', '.J-video-ctg', function(){
        	// console.log($(this).attr('data-type'));
        	vtype = $(this).attr('data-type');
        	my.resetFlag();
        	my.loadData();
        });
	});


	return my;
})(module || {});


// $: Zepto
$(function(){
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

});