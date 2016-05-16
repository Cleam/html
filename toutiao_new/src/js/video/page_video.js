$(function(){

	var uidUrl = 'http://123.59.60.170/getwapdata/getuid',			// 获取uid
		logUrl = 'http://123.59.60.170/getwapdata/data',			// 日志（操作统计）
		videoLogUrl = 'http://123.59.60.170/getwapdata/videoact',	// 视频统计接口
		videoUrl = 'http://123.59.62.164/pjson/morevideos';			// 视频信息流接口

	function Video(){
		this.qid = GLOBAL.Util.getQueryString('qid') || Cookies.get('qid') || 'null';	// 渠道ID
		this.userId = '';
		this.osType = GLOBAL.Util.getOsType();
		this.browserType = GLOBAL.Util.getBrowserType();
		this.init();
	}

	Video.prototype.init = function() {
		var scope = this;
		/* 获取、存储qid */
		if(scope.qid){
			scope._setQid(scope.qid);
		} else {
			// 无qid的情况，删除cookie中qid
			Cookies.remove('qid', {path: '/', domain: 'eastday.com'});
		}
		/* 获取、存储uid */
		scope.userId = scope._getUid();
		if(!scope.userId){
			scope._setUid();
		}
		/* 视频事件监听 */
		scope.addVideoListener($('#J_video'));
		/* 获取视频信息流 */
		scope.getVideoList();

		/* 发送日志信息 */
		scope.addLog();
	};

	Video.prototype.getVideoList = function(callback) {
		console.log('GLOBAL.Util.getUrlNoParams()::', GLOBAL.Util.getUrlNoParams());
		var scope = this;
		$.ajax({
			url: videoUrl,
            data: {
                type: $('#J_video').attr('data-type'),
				num: '6',
				url: GLOBAL.Util.getUrlNoParams()
            },
            dataType: 'jsonp',
            jsonp: "jsonpcallback",
            timeout: 8000,
            beforeSend: function(){},
            success: function(data){
                scope.generateVideoList(data);
            },
            error: function(e){
            	console.error(e);
            },
            complete: function(){
                callback && callback();
            }
		});
	};

	Video.prototype.generateVideoList = function(data) {
		console.log('data::', data);
	};

	/**
     * 发送视频操作日志
     * @param  {String} param 必需 - 参数(qid,uid,osType,browserType,url,duration,playingTime,currentTime,action)
     */
    Video.prototype.sendVideoLog = function(param){
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
	}


	/**
     * video事件监听
     * @param {Object} $video video对象
     * @return {[type]}        [description]
     */
    Video.prototype.addVideoListener = function($video) {
    	var scope = this;
    	// 播放事件
    	$video.on('playing', function(event){
			try {
				var $video = $(event.target),
					video = $video[0],
					src = video.currentSrc,
					duration = Math.floor(video.duration * 1000),
					idx = $video.attr('data-idx'),
					videoType = $video.attr('data-type'),
					playingTime = $video.attr('data-playingTime') ? $video.attr('data-playingTime') : 'null',
					currentTime = Math.floor(video.currentTime * 1000),	// 当前播放时间位置
					param = scope.qid + '\t' + scope.userId + '\t' + 'news' + '\t' + 'eastday_wapnews' + '\t' + 'null' + '\t' + (videoType || 'null') + '\t' + scope.osType + '\t' + (idx || 'null') + '\t' + scope.browserType + '\t' + src + '\t' + duration + '\t' + playingTime + '\t' + currentTime + '\t' + 'play';
				// 用于记录实际播放时长
				$video.attr('data-updateTime', +new Date());
				scope.sendVideoLog(param);
			} catch(e){
				console.log('Event playing has error!!!', e);
			}
		});
    	// 暂停事件
		$video.on('pause', function(event){
			try {
				var $video = $(event.target),
					video = $video[0],
					src = video.currentSrc,
					duration = Math.floor(video.duration * 1000),
					idx = $video.attr('data-idx'),
					videoType = $video.attr('data-type'),
					playingTime = $video.attr('data-playingTime') ? $video.attr('data-playingTime') : 'null',
					currentTime = Math.floor(video.currentTime * 1000),	// 当前播放时间位置
					param = scope.qid + '\t' + scope.userId + '\t' + 'news' + '\t' + 'eastday_wapnews' + '\t' + 'null' + '\t' + videoType + '\t' + scope.osType + '\t' + (idx || 'null') + '\t' + scope.browserType + '\t' + src + '\t' + duration + '\t' + playingTime + '\t' + currentTime + '\t' + 'pause';
				// 用于记录实际播放时长
				scope.sendVideoLog(param);
			} catch(e){
				console.log('Event pause has error!!!', e);
			}
		});
		// 播放时间更新事件（记录实际播放时间）
		$video.on('timeupdate', function(event){
			try {
				var $video = $(event.target),
		      		updateTime = parseInt($video.attr('data-updateTime'), 10) || (+new Date()),
		      		playingTime = parseInt($video.attr('data-playingTime'), 10) || 0,
		      		now = +new Date();
	  			// 播放时间
	  			playingTime = playingTime + now - updateTime;
	  			$video.attr('data-playingTime', playingTime);
				$video.attr('data-updateTime', now);
			} catch(e){
				console.log('Event timeupdate has error!!!', e);
			}
		});
    };
    /**
     * 添加日志
     */
    Video.prototype.addLog = function() {
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
				newstype: 'null',			// 当前新闻类别
				from: GLOBAL.Util.getQueryString('fr') || 'null',	// url上追加的fr字段
				to: GLOBAL.Util.getUrlNoParams() || 'null',		// 当前页面
				os_type: scope.osType || 'null',				// 客户端操作系统
				browser_type: scope.browserType || 'null',		// 客户端浏览器类别
				pixel: pixel.w + '*' + pixel.h,		// 客户端分辨率
				fr_url: GLOBAL.Util.getReferrer() || 'null',	// 浏览器的refer属性
				loginid: 'null',			// App端分享新闻时url上追加的ttaccid
				ime: 'null',					// App端用户imei号
				idx: 'null',					// 当前新闻的idx属性
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

	Video.prototype._setQid = function(qid) {
		if(qid){
			Cookies.set('qid', qid, { expires: 3, path: '/', domain: 'eastday.com'});
		}
	};

	Video.prototype._getQid = function(qid) {
		var qid = Cookies.get('qid');
		return qid ? qid : '';
	};

	Video.prototype._setUid = function(qid) {
		var scope = this;
        $.ajax({
            url: uidUrl,
            dataType: 'jsonp',
            data: {
                softtype: 'news',
                softname: 'eastday_wapnews',
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
	};

	Video.prototype._getUid = function(qid) {
		var uid = Cookies.get('user_id');
    	// var uid = wsCache.get('user_id');
        return uid ? uid : '';
	};

    new Video();

});