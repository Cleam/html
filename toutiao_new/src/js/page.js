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
		newsTypeArr_all = [],
		newsTypeArr_special = [],
		$newsList = $('#J_news_list'),
		$refresh = $('#J_refresh'),
		$newsTabsWrap = $('#J_top_menu'),
		$newsTabs = $newsTabsWrap.children('a'),
		topMenuLinkWidth = $newsTabs.eq(0).width(),
		wsCache = new WebStorageCache();	// 本地存储对象

	function EastNews(){
		this.newsType = wsCache.get('current_newstype') ? wsCache.get('current_newstype') : 'toutiao';	// 新闻频道类别
		this.readUrl = '';
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
			/* 获取、存储qid */
			if(scope.qid){
				scope.setQid(scope.qid);
			} else {
				// 无qid的情况，删除cookie中qid
				Cookies.remove('qid', {path: ''});
			}

			/* 获取、存储uid */
			scope.userId = scope.getUid();
			if(!scope.userId){
				scope.setUid();
			}

			/* 获取缓存中的已阅读新闻 */
			scope.readUrl = wsCache.get('read_url_all');
        	if(!scope.readUrl){scope.readUrl = '';}

			/* 保存所有新闻类别到数组 */
	        $newsTabs.each(function(){
	            var $this = $(this),
	                type = $this.data('type');
	            newsTypeArr_all.push(type);
	            if(type !== 'meinv' && type !== 'nuanwen'){
	                newsTypeArr_special.push(type);
	            }
	        });

	        /* 删除当前类别记录的位置信息 */
	        scope.clearPosition(scope.newsType);


			/* 还原到上次浏览的类别 */
			$newsTabs.each(function(){
				var $this = $(this);
				if($this.data('type') == scope.newsType){
					scope.scrollTo($this);
					return false;
				}
			});

			/* 首次加载数据 */
			scope.refreshData();

			/* 频道类别（菜单）点击事件 */
			$newsTabs.on('click', function(){
				var $this = $(this),
					type = $this.data('type'),
					cacheNews = wsCache.get('news_' + type),
					cachePos = wsCache.get('news_pos_' + type);
				// 使当前频道分类显示在导航菜单中间
				scope.scrollTo($this);
				// 存储上一个新闻类别和当前新闻类别
				wsCache.set('prev_newstype', scope.newsType, { exp: 20 * 60});
				wsCache.set('current_newstype', type, { exp: 20 * 60});
				// 加载当前频道类别新闻数据
				scope.newsType = type;
				if(cacheNews){
					$newsList.html(cacheNews);
				} else {
					scope.refreshData();
				}
				// 页面滚到记录的位置处
				if(cachePos){
	                $('body').scrollTop(cachePos);
	            }
			});
			
			/* 页面滚动监听（当滑到底部时，加载下一页数据。） */
			$(window).on('scroll', function() {
	            var scrollTop = getScrollTop(),
	                loadingOT = $('#J_loading').offset().top,
	                cHeight = getClientHeight(),
	                timer = null;

	            // 缓存当前类别新闻的浏览位置（缓存20分钟）,延迟缓存
	            timer && clearTimeout(timer);
	            timer = setTimeout(function(){
	            	wsCache.set('news_pos_' + scope.newsType, scrollTop, {exp: 20 * 60});
	            }, 200);
	            
                // 上拉加载数据(pullUpFlag标志 防止操作过快多次加载)
	            if(scrollTop + cHeight >= loadingOT && scope.pullUpFlag){
                    scope.pullUpLoadData();
	            }
	        });

	        /* 刷新数据 */
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

	        /* 记录阅读过的新闻 */
	        $newsList.on('click', 'a', function(e){
	            var $this = $(this),
	                url = $this.attr('href');
	            url = url.substring(url.indexOf('/mobile/') + 8, url.indexOf('.html'));
	            scope.cacheReadUrl(url, $this.data('type'), $this.data('subtype'));
	        });
		},

		/**
	     * 缓存已经阅读的url编号
	     * @param {[type]} urlNum url编号
	     */
	    cacheReadUrl: function(urlNum, type, subtype){
	        // 判断是否存储过
	        if(!existReadUrl(urlNum) && newsTypeArr_special.contains(type)){  // 排除meinv、nuanwen
	            // read_url_all
	            var aru = wsCache.get('read_url_all');
	            if(aru){
	                aru = aru.split(',');
	                while(aru.length >= 5){aru.shift();}
	                aru.push(urlNum);
	                scope.readUrl = aru.join(',');
	            } else {
	                scope.readUrl = urlNum;
	            }
	            wsCache.set('read_url_all', scope.readUrl, {exp: 20 * 60});
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
	            wsCache.set('read_url_' + type, tru, {exp: 20 * 60});
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
	                wsCache.set('read_url_' + subtype, stru, {exp: 20 * 60});
	            }
	        }
	    },

	    /**
	     * 判断是否存储过该url编号
	     * @param  {[type]} urlNum url编号
	     * @return {[type]}        true: 已经缓存过了，false：未缓存过
	     */
	    existReadUrl: function(urlNum){
	        var read_url_all = wsCache.get('read_url_all'); // xxxx,xxxx,xxxx
	        // 已经缓存过了
	        if(read_url_all && read_url_all.indexOf(urlNum) !== -1){
	            return true;
	        }
	        return false;
	    },

		/**
		 * 清除记录的位置信息
		 * @param  {[type]} newsType 指定频道类别
		 * @return {[type]}          [description]
		 */
		clearPosition: function(newsType){
			wsCache.delete('news_pos_' + newsType);
			// var len = newsTypeArr_all.length;
			// for (var i = 0; i < len; i++) {
			// }
		},

		/**
		 * 使当前频道分类显示在导航菜单中间
		 * @param  {[type]} $target [description]
		 * @return {[type]}         [description]
		 */
		scrollTo: function($target){
			$newsTabs.removeClass('active');
			$target.addClass('active');
			$newsTabsWrap.scrollLeft($target[0].offsetLeft - (topMenuLinkWidth * 3));
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
	            	// console.log(data);
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
			if(scope.newsType == 'toutiao' || scope.newsType == 'weikandian'){
	            scope.readUrl = wsCache.get('read_url_all');
	        } else {
	            scope.readUrl = wsCache.get('read_url_' + scope.newsType);
	        }
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
	                readhistory: scope.readUrl,
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
	            	// console.log(data);
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
	    	if(scope.newsType == 'meinv'){
	    		console.log('meinv: ', d);
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
	                urlpv = item.urlpv,				// 浏览量
	                picnums = item.picnums,			// 图片数量
	                praisecnt = item.praisecnt,		// 顶
	                tramplecnt = item.tramplecnt,	// 踩
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
	            if(scope.newsType == 'meinv'){ // 美女特殊处理
	            	$newsList.append('<section class="news-item news-item-s4"><a data-type="' + type + '" data-subtype="' + subtype + '" href="' + url + '?qid=' + scope.qid + '&idx=' + (scope.idx+i+1) + '&recommendtype=' + recommendtype + '&ishot=' + hotnews + '"><div class="news-wrap"><h3>' + topic + '</h3><div class="img-wrap clearfix"><img class="lazy fl" src="' + imgArr[0].src + '" alt="' + imgArr[0].alt + '"></div></div></a><div class="options"><span class="num">' + picnums + '图</span><span class="view">' + urlpv + '</span><span class="split">|</span><span class="J-good good">' + praisecnt + '</span><span class="J-bad bad">' + tramplecnt + '</span></div></section>');
	            } else if(imgLen >= 3){
	                $newsList.append('<section class="news-item news-item-s2"><a data-type="' + type + '" data-subtype="' + subtype + '" href="' + url + '?qid=' + scope.qid + '&idx=' + (scope.idx+i+1) + '&recommendtype=' + recommendtype + '&ishot=' + hotnews + '"><div class="news-wrap"><h3>' + topic + '</h3><div class="img-wrap clearfix"><img class="lazy fl" src="' + imgArr[0].src + '" alt="' + imgArr[0].alt + '"><img class="lazy fl" src="' + imgArr[1].src + '" alt="' + imgArr[1].alt + '"><img class="lazy fl" src="' + imgArr[2].src + '" alt="' + imgArr[2].alt + '"></div><p class="clearfix"><em class="fl">' + (tagStr?tagStr:getSpecialTimeStr(dateStr)) + '</em><em class="fr">' + source + '</em></p></div></a></section>');
	            } else {
	            	$newsList.append('<section class="news-item news-item-s1"><a data-type="' + type + '" data-subtype="' + subtype + '" href="' + url + '?qid=' + scope.qid + '&idx=' + (scope.idx+i+1) + '&recommendtype=' + recommendtype + '&ishot=' + hotnews + '"><div class="news-wrap clearfix"><div class="txt-wrap fr"><h3>' + topic + '</h3> <p><em class="fl">' + (tagStr?tagStr:getSpecialTimeStr(dateStr)) + '</em><em class="fr">' + source + '</em></p></div><div class="img-wrap fl"><img class="lazy" src="' + imgArr[0].src + '" alt="' + imgArr[0].alt + '"></div></div></a></section>');
	            }
	        }
	        // 记录idx
	        wsCache.set('idx_' + scope.newsType, scope.idx + len, {exp: 20 * 60});
	        // 缓存当前类别加载的新闻（缓存20分钟）
	        wsCache.set('news_' + scope.newsType, $newsList.html(), {exp: 20 * 60});
	    }

	};

	new EastNews();

});