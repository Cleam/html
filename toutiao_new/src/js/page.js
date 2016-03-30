// $: Zepto
$(function(){
	FastClick.attach(document.body);
	/*
		刷新接口：http://toutiao.eastday.com/toutiao_h5/RefreshJP
		下拉叠加接口：http://toutiao.eastday.com/toutiao_h5/pulldown
		上拉加载下一页接口：http://toutiao.eastday.com/toutiao_h5/NextJP

		搜索接口：http://minisearch.dfshurufa.com/search/search02
		热词接口：http://minisearch.dfshurufa.com/hotwords/hotwords

		获取用户地理位置：http://position.dfshurufa.com/position/get
		统计用户在线时长：http://ot.dftoutiao.com/apponline/online

		新用户获取用户uid：http://toutiao.eastday.com/getwapdata/getuid
		上传active日志：http://toutiao.eastday.com/getwapdata/data

		美女点赞（点踩）：http://toutiao.eastday.com/pjson/zan
	 */
	var refreshUrl = 'http://toutiao.eastday.com/toutiao_h5/RefreshJP',
		pullDownUrl = 'http://toutiao.eastday.com/toutiao_h5/pulldown',
		pullUpUrl = 'http://toutiao.eastday.com/toutiao_h5/NextJP',
		positionUrl = 'http://position.dfshurufa.com/position/get',
		uidUrl = 'http://toutiao.eastday.com/getwapdata/getuid',
		$newsList = $('#J_news_list'),
		$refresh = $('#J_refresh'),
		tt_news_qid = '',
		wsCache = new WebStorageCache();	// 本地存储对象

	function EastNews(){
		this.newsType = 'toutiao';	// 新闻频道类别
		this.userId = '';			// 用户ID
		this.idx = 0;				// 链接索引
		this.pgNum = 1;				// 页码
		this.qid = getQueryString('qid');	// 渠道ID
		this.pullUpFlag = true;		// 上拉加载数据(防止操作过快多次加载)
		// 初始化
		this.init();
	}

	EastNews.prototype = {
		/**
		 * 初始化
		 */
		init: function(){
			var scope = this;
			// 获取、存储qid
			if(scope.qid){
				scope.setQid(scope.qid);
			} else {
				// 无qid的情况，删除cookie中qid
				Cookies.remove('qid', { path: ''});
			}

			// 获取、存储uid
			scope.userId = scope.getUid();
			if(!scope.userId){
				scope.setUid();
			}
			// 首次加载数据
			scope.refreshData();
			
			// 页面滚动监听（当滑到底部时，加载下一页数据。）
			$(window).on('scroll', function() {
	            var scrollTop = getScrollTop(),
	                loadingOT = $('#J_loading').offset().top,
	                cHeight = getClientHeight();
	            // 缓存浏览位置
	            // setCachePos(scrollTop);
	            
                // 上拉加载数据(pullUpFlag标志 防止操作过快多次加载)
	            if(scrollTop + cHeight >= loadingOT && scope.pullUpFlag){
                    scope.pullUpLoadData();
	            }
	        });
	        // 刷新数据
	        $refresh.on('click', function(){
	        	if($refresh.hasClass('active')){
	        		return;
	        	}
	        	$refresh.addClass('active');
        		setTimeout(function(){
        			$refresh.removeClass('active');
        		}, 700);
	        	scope.refreshData();
	        });
		},

		setQid: function(qid){
			if(qid){
				Cookies.set('qid', qid, { expires: 365, path: '/' });
			}
		},

		getQid: function(){
			var qid = Cookies.get('qid');
			return qid ? qid : '';
		},

		/**
	     * 设置userId
	     */
	    setUid: function(){
	    	var scope = this;
	        $.ajax({
	            type: 'POST',
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
	                    wsCache.set('user_id', scope.userId, {exp: 365 * 24 * 3600});
	                } catch(e) {
	                    console.error(e);
	                }
	            },
	            error: function(e){
	            	console.error(e);
	            }
	        });
	    },

	    /**
	     * 获取uid
	     * @return {[type]} [description]
	     */
	    getUid: function(){
	    	var uid = wsCache.get('user_id');
	        return uid ? uid : '';
	    },

		/**
		 * 刷新数据
		 * @return {[type]} [description]
		 */
		refreshData: function(callback){
			var scope = this;
			wsCache.set('pgnum_' + scope.newsType, 1, { exp: 20 * 60});
			$.ajax({
	            url: refreshUrl,
	            data: {
	                type: scope.newsType,
	                endkey: '',
	                domain: 'eastday.com',
	                recgid: scope.userId, // 用户ID
	                picnewsnum: 1,
	                qid: scope.qid,
	                readhistory: '',
	                idx: 0,
	                pgnum: 1
	            },
	            dataType: 'jsonp',
	            jsonp: "jsonpcallback",
	            timeout: 8000,
	            beforeSend: function(){
	                $newsList.html('');
	                // $bgLoading.show();
	            },
	            success: function(data){
	            	console.log(data);
	                scope.generateDom(data);
	            },
	            complete: function(){
	                // $bgLoading.hide();
	                callback && callback();
	            }
	        });
		},

		pullUpLoadData: function(){
			var scope = this;
			// if(newsType == 'toutiao' || newsType == 'weikandian'){
	  //           readUrl = wsCache.get('read_url_all');
	  //       } else {
	  //           readUrl = wsCache.get('read_url_' + newsType);
	  //       }
	        // 页码（获取之后加一再存储）
	        scope.pgNum = Number(wsCache.get('pgnum_' + scope.newsType));
	        wsCache.set('pgnum_' + scope.newsType, ++scope.pgNum, { exp: 24 * 3600});
	        // 获取链接索引
	        scope.idx = Number(wsCache.get('idx_' + scope.newsType));
	        if(!scope.idx){scope.idx = 0;}
	        $.ajax({
	            url: pullUpUrl,
	            data: {
	                type: scope.newsType,
	                startkey: wsCache.get('rowkey_' + scope.newsType),
	                newsnum: 20,
	                isnew: 1,
	                domain: 'eastday.com',
	                readhistory: '',
	                idx: scope.idx,
	                recgid: scope.userId, // 用户ID
	                pgnum: scope.pgNum,
	                qid: scope.qid
	            },
	            dataType: 'jsonp',
	            jsonp: "jsonpcallback",
	            timeout: 8000,
	            beforeSend: function(){
	            	scope.pullUpFlag = false;
	            	// $newsList.html('');
	                // $loading.show();
	            },
	            success: function(data){
	            	console.log(data);
	                scope.generateDom(data);
	            },
	            error: function(jqXHR, textStatus){
	                console.error(textStatus);
	            },
	            complete: function(){
	            	scope.pullUpFlag = true;
	                // $loading.hide();
	            }
	        });
		},

		/**
	     * 将数据组装成html代码
	     * @param  {[type]} d 数据
	     * @return {[type]}   [description]
	     */
	    generateDom: function(d){
	    	var scope = this;
	        var data = d && d.data;
	        if(!data || !data.length){
	            // $loading.hide();
	            return false;
	        }
	        // 存储加载的新闻中的最后一条新闻的rowkey
	        wsCache.set('rowkey_' + scope.newsType, d.endkey, {exp: 24 * 3600});
	        var len = data.length;
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
	                $newsList.append('<section class="news-item news-item-s2"><a data-type="' + type + '" data-subtype="' + subtype + '" href="' + url + '?qid=' + tt_news_qid + '&idx=' + (scope.idx+i+1) + '&recommendtype=' + recommendtype + '&ishot=' + hotnews + '"><div class="news-wrap"><h3>' + topic + '</h3><div class="img-wrap clearfix"><img class="lazy fl" src="' + imgArr[0].src + '" alt="' + imgArr[0].alt + '"><img class="lazy fl" src="' + imgArr[1].src + '" alt="' + imgArr[1].alt + '"><img class="lazy fl" src="' + imgArr[2].src + '" alt="' + imgArr[2].alt + '"></div><p class="clearfix"><em class="fl">' + (tagStr?tagStr:getSpecialTimeStr(dateStr)) + '</em><em class="fr">' + source + '</em></p></div></a></section>');
	            } else {
	            	$newsList.append('<section class="news-item news-item-s1"><a data-type="' + type + '" data-subtype="' + subtype + '" href="' + url + '?qid=' + tt_news_qid + '&idx=' + (scope.idx+i+1) + '&recommendtype=' + recommendtype + '&ishot=' + hotnews + '"><div class="news-wrap clearfix"><div class="txt-wrap fr"><h3>' + topic + '</h3> <p><em class="fl">' + (tagStr?tagStr:getSpecialTimeStr(dateStr)) + '</em><em class="fr">' + source + '</em></p></div><div class="img-wrap fl"><img class="lazy" src="' + imgArr[0].src + '" alt="' + imgArr[0].alt + '"></div></div></a></section>');
	            }
	        }
	    }

	};

	new EastNews();

});