FastClick.attach(document.body);
// $: Zepto
$(function(){
	var $ggCloseVideo = null,	//$('#J_gg_close_video'),
		$ggVideo = null,	//$('#J_gg_video'),
		$loading = null,
		$video = $('#J_video'),
		$related = $('#J_related'),
		$commend = $('#J_commend'),
		bufferedNum = 0,	
		$moreVideoLoading = $('<div class="loading"><div class="spinner"><div class="bounce1"></div> <div class="bounce2"></div> <div class="bounce3"></div></div><p class="txt">更多视频加载中</p></div>'),
		// winWidth = $(window).width(),
		// videoWidth = parseInt($video.attr('data-width')),
		// videoHeight = parseInt($video.attr('data-height')),
		uidUrl = 'http://toutiao.eastday.com/getwapdata/getuid',			// 获取uid
		logUrl = 'http://toutiao.eastday.com/getwapdata/data',			// 日志（操作统计）
		videoLogUrl = 'http://toutiao.eastday.com/getwapdata/videoact',	// 视频统计接口
		videoUrl = 'http://toutiao.eastday.com/pjson/morevideos',			// 视频信息流接口
		onlineUrl = 'http://ot.dftoutiao.com/online/online',			// 在线统计(统计stats = statistics)
		onlineHz = 10;	// 在线日志记录频率(单位：秒；10s一次)

	/**
	 * 生成广告DOM
	 * <div id="J_gg_video" class="gg-video">
			<div class="gg">...</div>
			<a id="J_gg_close_video" class="gg-close-video">关闭广告</a>
		</div>
	 * @return {[type]} [description]
	 */
	 function generateGgDom(){
	 	$ggVideo = $('<div id="J_gg_video" class="gg-video"><div class="gg"></div><a id="J_gg_close_video" class="gg-close-video">关闭广告</a></div>');
	 	$ggVideo.appendTo($video.parents('.video-wrap'));
	 	$ggCloseVideo = $ggVideo.find('#J_gg_close_video');
	 }

	/**
	 * 加载视频广告
	 * @return {[type]} [description]
	 */
	function loadGg(){
		var div = document.createElement('div');
		var script1 = document.createElement('script');
		var script2 = document.createElement('script');
		var ggId = 'u2643659';
		div.id = 'bdUserDefInlay_' + ggId;
		script1.type = 'text/javascript';
		script1.innerHTML = 'var cpro_id = "' + ggId + '";';
		script2.type = 'text/javascript';
		script2.src = 'http://cpro.baidustatic.com/cpro/ui/cm.js';
		$ggVideo.children('.gg').append(div).append(script1).append(script2);
	}

	/**
	 * video对象
	 */
	function Video(){
		this.qid = GLOBAL.Util.getQueryString('qid') || Cookies.get('qid') || 'null';	// 渠道ID
		this.userId = Cookies.get('user_id');
		this.osType = GLOBAL.Util.getOsType();
		this.browserType = GLOBAL.Util.getBrowserType();
		this.init();
	}

	/**
	 * 初始化
	 * @return {[type]} [description]
	 */
	Video.prototype.init = function() {
		var scope = this;

		// 设置视频容器宽高（暂时强制视频以16:9形式展现，不判断视频的实际尺寸）
		// if(videoWidth && videoHeight){
		// 	$video.parents('.video-wrap').css('paddingBottom', '0').height(winWidth * videoHeight / videoWidth);
		// }

		/* 获取、存储qid */
		if(scope.qid){
			scope._setQid(scope.qid);
		} else {
			// 无qid的情况，删除cookie中qid
			Cookies.remove('qid', {path: '/', domain: 'eastday.com'});
		}
		/* 获取、存储uid */
		// scope.userId = scope._getUid();
		/* 获取、存储uid */
        if(!scope.userId){
            scope.userId = (+new Date()) + Math.random().toString(10).substring(2, 6);
            Cookies.set('user_id', scope.userId, { expires: 365, path: '/', domain: 'eastday.com'});
        }
		/* 视频事件监听 */
		scope.addVideoListener();

		/* 获取视频信息流 */
		scope.getVideoList();

		/* 发送日志信息 */
		scope._addLog();

		/* 在线日志 */
        scope._addOnlineLog();
        setInterval(function(){
        	scope._addOnlineLog();
        }, onlineHz * 1000);

        $related.on('click', 'a', function(){
        	$video[0].pause();
        	scope.removeLoading();
        });

		// 自动缓冲页面
		$video.attr('preload', true);
		$video.attr('autobuffer', true);
		$video.attr('x-webkit-airplay', 'allow');
		// scope.play();

		// 自己广告
        // if(scope.qid !== 'wnwifishipin'){
			/* 生成广告DOM */
			generateGgDom();
	        loadGg();
			/* 关闭广告 */
			$ggCloseVideo.on('click', function(){
				scope.hideGg();
			});
        // }
        
        // wnwifi广告
        if(scope.qid === 'wnwifishipin'){
        	$commend.after('<div id="wkssp-container1"></div><div id="wkssp-container2"></div><div id="wkssp-container3"></div><div id="wkssp-container4"></div><div id="wkssp-container5"></div><scr' + 'ipt type="text/javascript"> window._wksspid = "www.eastday.com"; var url = "http://static.51y5.net/znews/static/ad/external_detail_ad.js?t=" + parseInt(new Date().getTime() / 3600000); var scr = document.createElement("script"); scr.src = url; document.querySelector("head").appendChild(scr); </scr' + 'ipt>');
	    }
	};

	Video.prototype.getVideoList = function(callback) {
		// console.log('GLOBAL.Util.getUrlNoParams()::', GLOBAL.Util.getUrlNoParams());
		var scope = this;
		$.ajax({
			url: videoUrl,
            data: {
                type: $('#J_video').attr('data-type'),
				num: '10',
				qid: scope.qid,
				recgid: scope.userId,
				url: GLOBAL.Util.getUrlNoParams()
            },
            dataType: 'jsonp',
            jsonp: "jsonpcallback",
            timeout: 8000,
            beforeSend: function(){
            	$related.append($moreVideoLoading);
            },
            success: function(data){
                scope.generateVideoList(data);
            },
            error: function(e){
            	console.error(e);
            },
            complete: function(jqXHR, textStatus){
                callback && callback();
                if('timeout' === textStatus){
                	$related.append('<p style="padding: 0.1rem 0 0.2rem; font-size: 0.24rem; color: #999; text-align: center; margin-top: 0.2rem;">请求超时，请检查网络连接状态或<a href="javascript:location.reload();">刷新页面</a>重试。</p>');
                }
                $moreVideoLoading && $moreVideoLoading.remove();
            }
		});
	};

	/**
	 * 生成列表
	 * @param  {[type]} data [description]
	 * @return {[type]}      [description]
	 */
	Video.prototype.generateVideoList = function(data) {
		// console.log('data::', data);
		var scope = this,
			d = data.data ? data.data : null,
			len = d ? d.length : 0,
			// $related = $('#J_related'),
			$listWrap = $('<div class="related-cnt"></div>');
		var t1 = +new Date();
		if(len > 0){
			$related.append('<div class="related-tit"><h2>相关视频</h2></div>');
			for (var i = 0; i < len; i++) {
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
					duration = GLOBAL.Util.msToTimestr(item.videoalltime);
				$listWrap.append('<section class="news-item news-item-video"><a data-type="' + type + '" data-subtype="" href="' + href + '"><div class="news-wrap clearfix"><div class="txt-wrap fl"><h3>' + topic + '</h3> <p><em class="fl">' + source + '</em></p></div><div class="img-wrap fr"><img class="lazy" src="' + imgSrc + '" alt="" data-width="' + imgWidth + '" data-height="' + imgHeight + '"><span class="duration">' + duration + '</span></div></div></a></section>');
			}
		}
		$listWrap.appendTo($related);
	};

	/**
     * 发送视频操作日志
     * @param  {String} param 必需 - 参数(qid,uid,osType,browserType,url,duration,playingTime,currentTime,action)
     */
    Video.prototype.sendVideoLog = function(param){
    	// console.log('param::', param);
    	if(!param){
    		return;
    	}
		$.ajax({
			url: videoLogUrl,
			data: {
				param: encodeURIComponent(param)
			},
			dataType: 'jsonp',
			jsonp: 'jsonpcallback',
			success: function(){},
			error: function(){}
		});
	};

	Video.prototype.showLoading = function(){
		// $loading = $('<div id="J_video_loading" class="video-loading"><div class="video-loading-wrap"><img src="img/loading2.gif" alt=""></div></div>');
		// $loading = $('<div class="vjs-waiting-wrap"><div class="vjs-waiting"><div class="vjs-loading-spinner vjs-waiting"></div></div></div>');
		$loading = $('<div class="video-loading"><div class="img"></div><div class="ball-beat"><div></div> <div></div> <div></div></div></div>');
 		$loading.appendTo($video.parents('.video-wrap'));
	};

	Video.prototype.removeLoading = function(){
		$loading && $loading.remove();
	};

	Video.prototype.play = function(){
		var scope = this,
			end = scope.getEnd(),
			video = $video[0];
		if(bufferedNum >= 3 && end <= 0.01){
			video.play();
			// video.pause();
			bufferedNum = 0;
			scope.removeLoading();
			// setTimeout(function(){
			// 	scope.play();
			// 	bufferedNum++;
			// }, 1000);
		} else if(end <= 5){
			if(!$loading){
				scope.showLoading();
			}
			setTimeout(function(){
				scope.play();
				bufferedNum++;
			}, 1000);
		} else {
			scope.removeLoading();
			video.play();
		}
	};

	Video.prototype.getEnd = function(){
		var video = $video[0];
		var end = 0;
        try {
            end = video.buffered.end(0) || 0;
            end = parseInt(end * 1000 + 1, 10) / 1000;
        } catch(e) {}
        return end;
	};

	/**
     * video事件监听
     * @return {[type]}        [description]
     */
    Video.prototype.addVideoListener = function() {
    	var scope = this;
    	$video.one('play', function(event){
    		scope.showLoading();
    		var timer = setInterval(function(){
    			var video = $video[0];
    			// 当播放了100ms之后再移除loading动画，否则显示loading动画
    			if(Math.floor(video.currentTime * 1000) < 100){
    				return;
    			}
    			scope.removeLoading();
    			clearInterval(timer);
    		}, 200);
    	});

    	// $video.one('canplaythrough', function(event){
    	// 	scope.removeLoading();
    	// });

    	// 播放事件
    	$video.on('playing', function(event){
			try {
				var $vd = $(event.target),
					video = $vd[0],
					src = video.currentSrc,
					duration = video.duration ? Math.floor(video.duration * 1000) : $vd.attr('data-duration'),
					idx = $vd.attr('data-idx'),
					videoType = $vd.attr('data-type'),
					playingTime = $vd.attr('data-playingTime') ? $vd.attr('data-playingTime') : 'null',
					currentTime = Math.floor(video.currentTime * 1000),	// 当前播放时间位置
					param = scope.qid + '\t' + scope.userId + '\t' + 'news' + '\t' + 'eastday_wapnews' + '\t' + 'null' + '\t' + (videoType || 'null') + '\t' + scope.osType + '\t' + (idx || 'null') + '\t' + scope.browserType + '\t' + src + '\t' + duration + '\t' + playingTime + '\t' + currentTime + '\t' + 'play';
	    		/*if(currentTime < 500){
		    		scope.showLoading();
		    		var timer = setInterval(function(){
		    			// console.log(video.currentTime);
		    			if(Math.floor(video.currentTime * 1000) < 500){
		    				return;
		    			}
		    			scope.removeLoading();
		    			clearInterval(timer);
		    		}, 200);
	    		}*/
				// 用于记录实际播放时长
				$vd.attr('data-updateTime', +new Date());
				scope.sendVideoLog(param);
			} catch(e){
				console.log('Event playing has error!!!', e);
			}
			$ggCloseVideo && $ggCloseVideo.trigger('click');
		});
    	// 暂停事件
		$video.on('pause', function(event){
			try {
				var $vd = $(event.target),
					video = $vd[0],
					src = video.currentSrc,
					duration = video.duration ? Math.floor(video.duration * 1000) : $vd.attr('data-duration'),
					idx = $vd.attr('data-idx'),
					videoType = $vd.attr('data-type'),
					playingTime = $vd.attr('data-playingTime') ? $vd.attr('data-playingTime') : 'null',
					currentTime = Math.floor(video.currentTime * 1000),	// 当前播放时间位置
					param = scope.qid + '\t' + scope.userId + '\t' + 'news' + '\t' + 'eastday_wapnews' + '\t' + 'null' + '\t' + videoType + '\t' + scope.osType + '\t' + (idx || 'null') + '\t' + scope.browserType + '\t' + src + '\t' + duration + '\t' + playingTime + '\t' + currentTime + '\t' + 'pause';
				// 用于记录实际播放时长
				scope.sendVideoLog(param);
				// 兼容处理（在小米浏览器上碰到过一次，点击播放就会触发暂停，导致出现广告）
				if(Math.floor($video[0].currentTime * 1000) > 1000 && $video[0].paused){
					scope.showGg();
				}
			} catch(e){
				console.log('Event pause has error!!!', e);
			}
		});
		// 播放时间更新事件（记录实际播放时间）
		$video.on('timeupdate', function(event){
			try {
				var $vd = $(event.target),
					// video = $vd[0],
					// duration = video.duration,
					// currentTime = video.currentTime,
		      		updateTime = parseInt($vd.attr('data-updateTime'), 10) || (+new Date()),
		      		playingTime = parseInt($vd.attr('data-playingTime'), 10) || 0,
		      		now = +new Date();
				/*if(currentTime >= duration){
					console.log('$vd::', $vd);
				}*/
	  			// 播放时间
	  			playingTime = playingTime + now - updateTime;
	  			$vd.attr('data-playingTime', playingTime);
				$vd.attr('data-updateTime', now);
			} catch(e){
				console.log('Event timeupdate has error!!!', e);
			}
		});

    };

    /**
     * 显示广告
     * @return {[type]} [description]
     */
    Video.prototype.showGg = function() {
    	// $ggVideo.css('z-index', '2');
    	if($ggVideo){
	    	$ggVideo.show();
			$video.css({
				width: 1,
				height: 1
			});
    	}
    };

    /**
     * 隐藏广告
     * @return {[type]} [description]
     */
    Video.prototype.hideGg = function() {
    	// $ggVideo.css('z-index', '-1');
    	if($ggVideo){
	    	$ggVideo.hide();
			$video.css({
				width: '100%',
				height: '100%'
			});
    	}
    };

    /**
     * 添加日志
     */
    Video.prototype._addLog = function() {
    	var pixel = GLOBAL.Util.getPixel(),
    		scope = this;
    	// 发送操作信息
		$.ajax({
			url: logUrl,
			data: {
				qid: scope.qid || 'null',						// 渠道号
				uid: scope.userId || 'null',						// 从服务器端获取的uid
				softtype: 'news',					// 软件type（当前默认news）
				softname: 'eastday_wapnews',		// 软件名（当前默认eastday_wapnews）
				newstype: $('#J_video').attr('data-type') || 'null',			// 当前新闻类别
				from: GLOBAL.Util.getQueryString('fr') || 'null',	// url上追加的fr字段
				to: GLOBAL.Util.getUrlNoParams() || 'null',		// 当前页面
				os_type: scope.osType || 'null',				// 客户端操作系统
				browser_type: scope.browserType || 'null',		// 客户端浏览器类别
				pixel: pixel.w + '*' + pixel.h,		// 客户端分辨率
				fr_url: GLOBAL.Util.getReferrer() || 'null',	// 浏览器的refer属性
				loginid: 'null',				// App端分享新闻时url上追加的ttaccid
				ime: 'null',					// App端用户imei号
				idx: GLOBAL.Util.getQueryString('idx'),					// 当前新闻的idx属性
				ishot: 'null',					// 当前新闻是不是热点新闻
				ver: 'null',					// App版本（1.2.9）url上追加的ver
				appqid: 'null',					// App渠道号url上追加的appqid
				ttloginid: 'null',				// App端分享新闻时url上追加的ttloginid
				apptypeid: 'null',				// App端的软件类别url上追加的apptypeid
				appver: 'null',					// App版本（010209）url上追加的appver
				recommendtype: 'null',			// 推荐新闻类别url上追加的recommendtype
				ispush: 'null'					// 是不是推送新闻url上追加的ispush
			},
			dataType: 'jsonp',
			jsonp: 'jsonpcallback',
			success: function(){},
			error: function(){console.error(arguments);}
		});
    };

    /**
     * 收集在线日志
     */
    Video.prototype._addOnlineLog = function(){
    	var scope = this,
    		infostr = GLOBAL.Util.getUrlNoParams() + '\t' + scope.userId + '\t' + scope.qid + '\tnull\tnull\tnull\t' + ($('#J_video').attr('data-type') || 'null') + '\t' + onlineHz + '\tnull\tnull\t' + scope.osType + '\tnull';
    	$.ajax({
	    	url : onlineUrl,
	    	data:{
	    		param: encodeURI(infostr)
	    	},
	    	dataType : 'jsonp',
	    	jsonp : 'jsonpcallback'
	    });
    },

    /**
     * 配置渠道ID
     * @param {[type]} qid [description]
     */
	Video.prototype._setQid = function(qid) {
		Cookies.set('qid', qid, { expires: 3, path: '/', domain: 'eastday.com'});
	};

	/**
	 * 获取渠道ID
	 * @return {[type]}     [description]
	 */
	Video.prototype._getQid = function() {
		var qid = Cookies.get('qid');
		return qid ? qid : '';
	};

	/**
	 * 配置用户ID
	 * @param {[type]} uid 用户ID(可选)
	 */
	Video.prototype._setUid = function(uid) {
		var scope = this;
		if(uid){
			scope.userId = uid;
            Cookies.set('user_id', scope.userId, { expires: 365, path: '/', domain: 'eastday.com'});
		} else {
			$.ajax({
	            url: uidUrl,
	            dataType: 'jsonp',
	            data: {
	                softtype: 'news',
	                softname: 'eastday_wapnews'
	            },
	            jsonp: 'jsonpcallback',
	            success: function(msg) {
	                try {
	                    scope.userId = msg.uid;
	                    Cookies.set('user_id', scope.userId, { expires: 365, path: '/', domain: 'eastday.com'});
	                    // wsCache.set('user_id', scope.userId, {exp: 365 * 24 * 3600});
	                } catch(e) {
	                    console.error(e);
	                }
	            },
	            error: function(e){
	            	console.error(e);
	            }
	        });
		}
	};

    new Video();

});

// document.write('<div id="wkssp-container1"></div><div id="wkssp-container2"></div><div id="wkssp-container3"></div><div id="wkssp-container4"></div><div id="wkssp-container5"></div><scr' + 'ipt type="text/javascript"> window._wksspid = "www.eastday.com"; var url = "http://static.51y5.net/znews/static/ad/external_detail_ad.js?t=" + parseInt(new Date().getTime() / 3600000); var scr = document.createElement("script"); scr.src = url; document.querySelector("head").appendChild(scr); </scr' + 'ipt>');

// document.write('<div id="SOHUCS" sid="160513160358356"></div>');
// document.write('<scr' + 'ipt id="changyan_mobile_js" charset="utf-8" type="text/javascript" src="http://changyan.sohu.com/upload/mobile/wap-js/changyan_mobile.js?client_id=cyrQbYhjk&conf=prod_d09a50b0a2f9861e77a6cb5ad28e3c2b"></scr' + 'ipt>');
	
	
