/**
 * 依赖其他所有js
 */
// $: Zepto
$(function(){
	FastClick.attach(document.body);
	var refreshUrl = 'http://toutiao.eastday.com/toutiao_h5/RefreshJP',		// 刷新数据
		pullDownUrl = 'http://toutiao.eastday.com/toutiao_h5/pulldown',		// 下拉加载
		pullUpUrl = 'http://toutiao.eastday.com/toutiao_h5/NextJP',			// 上拉加载
		positionUrl = 'http://position.dfshurufa.com/position/get',			// 获取用户位置
		uidUrl = 'http://toutiao.eastday.com/getwapdata/getuid',			// 获取uid
		moodUrl = 'http://toutiao.eastday.com/pjson/zan',					// 美女点赞（点踩）
		logUrl = 'http://toutiao.eastday.com/getwapdata/data',			// 日志（操作统计）
		onlineUrl = 'http://ot.dftoutiao.com/online/online',			// 在线统计(统计stats = statistics)
		showAdLogUrl = 'http://toutiao.eastday.com/getwapdata/advshow',	// 推广信息show统计接口
		clickAdLogUrl = 'http://toutiao.eastday.com/getwapdata/ad',		// 推广信息show统计接口
		// logUrl = 'http://123.59.60.170/getwapdata/data',				// 测试 日志（操作统计）
		// onlineUrl = 'http://123.59.60.170/online/online',			// 测试 在线统计
		// showAdLogUrl = 'http://123.59.60.170/getwapdata/advshow',	// 推广信息show统计接口
		// clickAdLogUrl = 'http://123.59.60.170/getwapdata/ad',		// 推广信息show统计接口
		$body = $('body'),
		newsTypeArr_all = [],
		newsTypeArr_special = [],
		// $loation = $('#J_location'),
		$newsList = $('#J_news_list'),
		$refresh = $('#J_refresh'),
		$newsTabsWrap = $('#J_top_menu'),
		$ggBaidu = $('#J_gg_baidu_id'),
		$ggSogou = $('#J_gg_sogou_id');
		praiseTrampleFlag = true,
		startPos = 0,				// 滑动开始位置
		touchDistance = 0,			// 滑动距离
		touchDistanceFlag = true,	// 滑动方向判断标志
		isSwipeDown = false,		// 确定向下滑
		isTop = false,				// 顶部判断标志
		$pullDownLoading = null,	// 下拉动画
		TOUCH_DISTANCE = 150,		// 规定滑动加载距离
		pullDownLoadDataTimer = null,		// 规定滑动加载距离
		wsCache = new WebStorageCache();	// 本地存储对象

	/**
	 * 东方头条对象
	 */
	function EastNews(){
		var currentNewsType = wsCache.get('current_newstype');
		this.newsType = currentNewsType ? currentNewsType : 'toutiao';	// 新闻频道类别
		this.readUrl = '';
		this.userId = '';			// 用户ID
		this.idx = 0;				// 链接索引
		this.pgNum = 1;				// 页码
		this.pulldown_pgNum = 0;	// 下拉页码
		this.pulldown_idx = 0;		// 下拉链接索引
		this.pulldown_num = 0;		// 下拉计数
		this.qid = GLOBAL.Et.qid || GLOBAL.Util.getQueryString('qid');	// 渠道ID
		this.pullUpFlag = true;		// 上拉加载数据(防止操作过快多次加载)
		this.startKey = '';
		this.endKey = '';
		this.osType = GLOBAL.Util.getOsType();
		this.browserType = GLOBAL.Util.getBrowserType();
		// 初始化
		this.init();
	}

	EastNews.prototype = {
		/**
		 * 初始化
		 */
		init: function(){
			var scope = this;

			// 设置广告ID（每次刷新需要设置广告ID，防止广告空白不显示）
			scope.setGgId();

			/* 获取、存储qid */
			if(scope.qid){
				scope.setQid(scope.qid);
			} else {
				// 无qid的情况，删除cookie中qid
				Cookies.remove('qid', {path: '/', domain: 'eastday.com'});
			}

			/* 获取、存储uid */
			scope.userId = scope.getUid();
			if(!scope.userId){
				scope.setUid();
			}

			/* 获取缓存中的已阅读新闻 */
			scope.readUrl = wsCache.get('read_url_all');
        	if(!scope.readUrl){scope.readUrl = '';}

	        /* 删除当前类别记录的位置信息 */
	        // scope.clearPosition(scope.newsType);
	        
        	/* 加载新闻频道类别 */
	        scope.initChannels(function(){
	        	var $newsTabs = $newsTabsWrap.children('a');

	        	/* 保存所有新闻类别到数组 */
		        $newsTabs.each(function(){
		            var $this = $(this),
		                type = $this.data('type');
		            newsTypeArr_all.push(type);
		            if(type !== 'meinv' && type !== 'nuanwen'){
		                newsTypeArr_special.push(type);
		            }
		        });

				/* 还原到上次浏览的类别 */
				$newsTabs.each(function(){
					var $this = $(this);
					if($this.data('type') == scope.newsType){
						setTimeout(function(){
							scope.scrollTo($this, false);
						}, 50);
						return false;
					}
				});
				
				/* 设置当前位置信息 */
		        if(wsCache.get('location')){
		            scope.updateDomLocation(wsCache.get('location'));
		        } else {
		            scope.location();
		        }
	        });

			/* 首次加载数据 */
			scope.refreshData(function(){
				scope.highlightPraiseTrample();
			});

			// 记录一次日志
			scope.addLog();

			/* 注册下拉事件 */
			scope.pullDown();

			/* 频道类别（菜单）点击事件 */
			$newsTabsWrap.on('tap', 'a', function(){
				var $this = $(this),
					type = $this.data('type');
				if($this.hasClass('active')){
					return;
				}
				// 使当前频道分类显示在导航菜单中间
				scope.scrollTo($this, false);
				// 存储上一个新闻类别和当前新闻类别
				wsCache.set('prev_newstype', scope.newsType, { exp: 20 * 60});
				wsCache.set('current_newstype', type, {exp: 20 * 60});
				// 加载当前频道类别新闻数据
				scope.newsType = type;

				scope.refreshData(function(){
					scope.highlightPraiseTrample();
				});
				// 日志收集
				scope.addLog();
			});

			/* 页面滚动监听（当滑到底部时，加载下一页数据。） */
			$(window).on('scroll', function() {
	            var scrollTop = GLOBAL.Util.getScrollTop(),
	                loadingOT = $('#J_loading').offset().top,
	                cHeight = GLOBAL.Util.getClientHeight(),
	                timer = null;

	            // 缓存当前类别新闻的浏览位置（缓存20分钟）,延迟缓存
	            timer && clearTimeout(timer);
	            timer = setTimeout(function(){
	            	wsCache.set('news_pos_' + scope.newsType, scrollTop, {exp: 20 * 60});
	            }, 200);
	            
                // 上拉加载数据(pullUpFlag标志 防止操作过快多次加载)
	            if(loadingOT >= cHeight && scrollTop + cHeight >= loadingOT && scope.pullUpFlag){
                    scope.pullUpLoadData();
	            }
	        });

	        /* 刷新数据 */
	        $refresh.on('tap', function(){
	        	if($refresh.hasClass('active')){
	        		return;
	        	}
	        	scope.changeRefreshStatus();
        		wsCache.delete('news_pos_' + scope.newsType);
        		wsCache.delete('news_' + scope.newsType);
	        	scope.refreshData(function(){
	        		scope.highlightPraiseTrample();
	        	});
	        });

	        /* 记录阅读过的新闻 */
	        $newsList.on('click', 'a', function(e){
	            var $this = $(this),
	                url = $this.attr('href');
	            url = url.substring(url.indexOf('/mobile/') + 8, url.indexOf('.html'));
	            scope.cacheReadUrl(url, $this.data('type'), $this.data('subtype'));
	        });

	        /**
	         * 赞/踩点击事件
	         * @param  {Zepto Object} $target 当前dom对象
	         * @param  {String} colname 参数
	         * @param  {Number} ctg     类别（1：赞，-1：踩）
	         * @return {[type]}         [description]
	         */
	        function ptClick($target, colname, ctg){
	        	var rk = $target.data('rowkey'),
		        	st = scope.getPraiseTrampleStatus(rk);
	        	// 已经赞过、踩过就不允许再操作了
	        	if(st === 1){
	        		alert('您已经赞过了！');
	        		return;
	        	} else if(st === -1){
	        		alert('您已经踩过了！');
	        		return;
	        	}
	        	// 防止连点
	        	if(!praiseTrampleFlag){
	        		return;
	        	}
	        	praiseTrampleFlag = false;
	        	$target.addClass('active').text(Number($target.text()) + 1);
	        	$.ajax({
	        		url: moodUrl,
	        		dataType : 'jsonp',
	        		data : {
						"colname" : colname,	// 'z0000'、'zd0000'
						"rowkey" : rk,
						"praisecnt" : 1,
					},
					jsonp : 'jsonpcallback',
					success : function(msg) {
			        	scope.cachePraiseTrampleRowkey(ctg, rk);
			        	praiseTrampleFlag = true;
					},
					error: function(e){
						console.error(e);
					}
	        	});
	        }

	        /* 已浏览位置，点击刷新事件 */
	        $body.on('click', '.J-read-position', function(){
	        	$body.scrollTop(0);
	        	// 刷新按钮动画效果
	        	scope.changeRefreshStatus();
	        	// 调用下拉加载数据接口
	        	scope.pullDownLoadData();
	        	/*var scrollTimer = setInterval(function(){
	        		$body.scrollTop($body.scrollTop() - 200);
	        		if($body.scrollTop() <= 0){
	        			$body.scrollTop(0);
	        			clearInterval(scrollTimer);
			        	// 刷新按钮动画效果
			        	scope.changeRefreshStatus();
			        	// 调用下拉加载数据接口
			        	scope.pullDownLoadData();
	        		}
	        	}, 1);*/
	        });

	        // 推广新闻点击委托事件
	        $body.on('click', '.J-promote-news', function(){
				var $this = $(this),
					advUrl = $this.attr('href'),
					advId = $this.data('advid');
				scope.sendPromoteNewslog(advUrl, advId);
			});

	        /* 赞 */
	        $newsList.on('click', '.J-good', function(){
	        	ptClick($(this), 'z0000', 1);
	        });

	        /* 踩 */
	        $newsList.on('click', '.J-bad', function(){
	        	ptClick($(this), 'zd0000', -1);
	        });

	        /* 在线日志 */
	        scope.addOnlineLog();
	        setInterval(function(){
	        	scope.addOnlineLog();
	        }, 10000);
		},

		/**
		 * 刷新按钮动画效果
		 * @return {[type]} [description]
		 */
		changeRefreshStatus: function(){
			$refresh.addClass('active');
    		setTimeout(function(){
    			$refresh.removeClass('active');
    		}, 700);
		},

		/**
		 * 初始化频道类别
		 * @return {[type]} [description]
		 */
		initChannels: function(callback){
			var scope = this,
				myChannels = wsCache.get('news_channels');
			if(!myChannels){
				/* 获取服务端所有频道 */
				$.ajax({
					url: 'data/channels.json',
					dataType: 'json',
					success: function(data){
						scope.generateChannelTabs(data.channels.up);
						callback && callback();
					},
					error: function(){
						console.error(arguments);
					}
				});
			} else {
				scope.generateChannelTabs(myChannels);
				callback && callback();
			}
		},

		/**
		 * 发送推广新闻的点击日志
		 * @param  {[type]} advUrl url
		 * @param  {[type]} advId  id
		 * @return {[type]}        [description]
		 */
		sendPromoteNewslog: function(advUrl, advId){
			var scope = this,
				pixel=GLOBAL.Util.getPixel();
			$.ajax({
				url: clickAdLogUrl,
				dataType: 'jsonp',
				data: {
					"qid": scope.qid || 'null',
					"uid": scope.userId || 'null',
					"loginid": 'null',
					"softtype": 'news',
					"softname": 'eastday_wapnews',
					"newstype": 'ad',
					"from": 'null',
					"to": advUrl || 'null',
					"os_type": GLOBAL.Util.getOsType() || 'null',
					"browser_type": GLOBAL.Util.getBrowserType() || 'null',
					"pixel": pixel.w + '*' + pixel.h,
					"ime": "null",
					"refer": GLOBAL.Util.getReferrer() || 'null',
					"adv": advId || 'null'
				},
				jsonp : 'jsonpcallback',
				success : function(msg) {}
			});
		},

		/**
		 * 生成频道DOM
		 * @param  {[type]} myChannels 频道数据
		 * @return {[type]}            [description]
		 */
		generateChannelTabs: function(myChannels){
			if(!myChannels || !(myChannels instanceof Array)){
				return;
			}
			var tabsHtml = '';
			for (var i = 0; i < myChannels.length; i++) {
				if(i === 0){
					tabsHtml += '<a class="active" data-type="' + myChannels[i].name + '">' + myChannels[i].value + '</a>';
				} else {
					tabsHtml += '<a data-type="' + myChannels[i].name + '">' + myChannels[i].value + '</a>';
				}
			}
			$newsTabsWrap.html(tabsHtml);
			// 缓存我的频道
			wsCache.set('news_channels', myChannels);
		},

		/**
		 * 获取我的频道
		 * @param  {Array} sc 服务端频道
		 * @param  {Array} cc 本地缓存的频道（用户自定义我的频道）
		 * @return {[type]}    [description]
		 */
		getMyChannels: function(sc, cc){
			if(!sc || !cc){
				return [];
			}
			var arr = new Array(),
				cLen = cc.length,
				sLen = sc.length;
			// 为了保持和缓存顺序一致，请外层循环使用缓存的频道数组
			for (var i = 0; i < cLen; i++) {
				for (var j = 0; j < sLen; j++) {
					if(cc[i].name == sc[j].name){
						arr.push(cc[i]);
					}
				}
			}
			return arr;
		},

		/**
		 * 注册下拉事件
		 * @return {[type]}            [description]
		 */
		pullDown: function(){
			var scope = this,
				svgTop = 0;
			$newsList.on('touchstart', function(e){
				// 防止重复快速下拉
				clearTimeout(pullDownLoadDataTimer);
				startPos = e.touches[0].pageY;
				if($body.scrollTop() <= 0){
					isTop = true;
				} else {
					isTop = false;
				}
				if(!$pullDownLoading){
					svgTop = ($('header').height() - 40);
					$pullDownLoading = $('<svg id="J_svg" class="svg" style="top: ' + svgTop + 'px"><g id="J_svg_g"><marker id="J_svg_marker" markerWidth="10" markerHeight="10" refX="0" refY="5" orient="auto" markerUnits="userSpaceOnUse"><path d="M0,0 L0,10 L5,5 L0,0" style="fill: #d43d3d;"></path></marker><path stroke-width="3.5" stroke-linecap="round" id="J_svg_path" marker-end="url(#J_svg_marker)" d="M20,9 A11,11 0 1,1 10.5,14.5" style="stroke: #d43d3d; fill: none;"></path><circle id="J_svg_circle" class="path" fill="none" stroke-width="3.5" stroke-linecap="round" cx="25" cy="25" r="11"></circle></g></svg>');
				} else {
					$pullDownLoading.removeClass('active').css({
						'display': 'block',
						'opacity': 0,
						'top': svgTop,
						'transform': 'translateY(0px)',
						'-webkit-transform': 'translateY(0px)'
					});
				}
			});
			$newsList.on('touchend', function(){
				// 达到下拉阈值 启动数据加载
				if(touchDistance >= TOUCH_DISTANCE){
					$pullDownLoading.animate({
						// 'transform': 'rotate(0deg)',
						// '-webkit-transform': 'rotate(0deg)',
						'top': (svgTop + (TOUCH_DISTANCE / 3)) + 'px'
					}, 'fast', function(){
						$pullDownLoading && $pullDownLoading.addClass('active');
						clearTimeout(pullDownLoadDataTimer);
							pullDownLoadDataTimer = setTimeout(function(){
							// 美女无pulldown接口
							if(scope.newsType == 'meinv'){
					        	$refresh.trigger('click');
					        	$pullDownLoading && $pullDownLoading.remove();
					        } else {
					        	scope.changeRefreshStatus();
								scope.pullDownLoadData(function(){
						        	$pullDownLoading && $pullDownLoading.remove();
								});
					        }
						}, 200);
					});
				} else {	
					$pullDownLoading && $pullDownLoading.animate({
						'opacity': 0,
						// 'translateY': '0',
						'top': svgTop
					}, 'fast', function(){
						$pullDownLoading.remove();
					});
				}
				touchDistanceFlag = true;
				isSwipeDown = false;
			});
			$newsList.on('touchmove', function(e){
				var py = e.touches[0].pageY;
				touchDistance = py - startPos;
				// 根据用户开始的滑动手势判断用户是向下滑还是向上滑
				if(touchDistanceFlag && touchDistance > 0){
					isSwipeDown = true;
					// 根据刚开始的滑动值进行判断，后面用户无论怎么滑都不会触发浏览器滚动。
					touchDistanceFlag = false;
				}
				if(isTop && isSwipeDown){
					if($body.find('.svg').length === 0){
						$pullDownLoading.appendTo('body');
					}
					// 下拉加载
					if(touchDistance >= TOUCH_DISTANCE){
						$pullDownLoading.find('#J_svg_marker>path').attr('style', 'fill:#2a90d7');
						$pullDownLoading.find('#J_svg_g>path').attr('style', 'stroke:#2a90d7;fill:none');
						if(touchDistance >= TOUCH_DISTANCE + 80){
							touchDistance = TOUCH_DISTANCE + 80;
						}
					} else {
						$pullDownLoading.find('#J_svg_marker>path').attr('style', 'fill:#d43d3d');
						$pullDownLoading.find('#J_svg_g>path').attr('style', 'stroke:#d43d3d;fill:none');
					}
					$pullDownLoading.css({
						'opacity': touchDistance / TOUCH_DISTANCE,
						'transform': 'rotate(' + touchDistance / TOUCH_DISTANCE * 720 + 'deg)',
						'-webkit-transform': 'rotate(' + touchDistance / TOUCH_DISTANCE * 720 + 'deg)',
						'top': (svgTop + (touchDistance / 3)) + 'px'
					});
					e.preventDefault();
				}
			});
		},

		/**
		 * 下拉加载数据
		 * @param  {Function} callback 回调方法
		 * @return {[type]}            [description]
		 */
		pullDownLoadData: function(callback){
			var scope = this;
			// 获取阅读历史
	        scope.readUrl = scope.getReadUrl();
			// 页码（获取之后加一再存储）
	        scope.pulldown_pgNum = Number(wsCache.get('pulldown_pgnum_' + scope.newsType));
	        wsCache.set('pulldown_pgnum_' + scope.newsType, --scope.pulldown_pgNum, { exp: 24 * 3600});
	        // 获取链接索引
	        scope.pulldown_idx = Number(wsCache.get('pulldown_idx_' + scope.newsType));
	        if(!scope.pulldown_idx){scope.pulldown_idx = 0;}
			$.ajax({
				url: pullDownUrl,
	            data: {
	                type: scope.newsType,
					startkey: wsCache.get('startkey_' + scope.newsType),
					lastkey: wsCache.get('endkey_' + scope.newsType),
					pgnum: scope.pulldown_pgNum,
					idx: scope.pulldown_idx,
					readhistory: scope.readUrl,
					recgid: scope.userId,
					qid: scope.qid,
					os: scope.osType
	            },
	            dataType: 'jsonp',
	            jsonp: "jsonpcallback",
	            timeout: 8000,
	            beforeSend: function(){},
	            success: function(data){
	                scope.generateDomForPulldown(data);
	            },
	            error: function(e){
	            	console.error(e);
	            },
	            complete: function(){
	                callback && callback();
	            }
			});
		},

		/**
		 * 从缓存中获取已读历史url
		 * @return {String} 已读历史url
		 */
		getReadUrl: function(){
			var scope = this,
				ru = '';
			// 获取阅读记录
			if(scope.newsType == 'toutiao' || scope.newsType == 'weikandian'){
	            ru = wsCache.get('read_url_all');
	        } else {
	            ru = wsCache.get('read_url_' + scope.newsType);
	        }
	        return ru ? ru : null;
		},

		/**
		 * 下拉加载数据生成DOM
		 * @param  {[type]} d 数据
		 * @return {[type]}   [description]
		 */
		generateDomForPulldown: function(d){
			var scope = this,
	        	data = d && d.data,
	        	len = data.length;
	        if(!data || !data.length){
	            // $loading.hide();
	            return false;
	        }
	        // 计数
	        scope.pulldown_num++;
	        // wsCache.set('rowkey_' + scope.newsType, d.endkey, {exp: 24 * 3600});
	        // scope.startKey = d.endkey;
	        wsCache.set('startkey_' + scope.newsType, d.endkey, {exp: 24 * 3600});
	        // wsCache.set('pulldown_lastkey_' + scope.newsType, d.newkey, {exp: 24 * 3600});
	        // scope.endKey = d.newkey;
	        wsCache.set('endkey_' + scope.newsType, d.newkey, {exp: 24 * 3600});
	        // 反转数组(reverse方法会改变原来的数组，而不会创建新的数组。)
	        data.reverse();
	        // 删除阅读历史位置DOM元素（后面重新更新位置）
        	$body.find('.J-read-position').remove();
	        $newsList.prepend('<a class="J-read-position read-position">上次浏览到这里，点击刷新。</a>');
	        for (var i = 0; i < len; i++) {
	            var item = data[i],
	                url = item.url,
	                dateStr = item.date,
	                topic = item.topic,
	                source = item.source,
	                imgArr = item.miniimg,
	                recommendtype = item.recommendtype ? item.recommendtype : '-1',
	                hotnews = item.hotnews,
	                ispicnews = item.ispicnews,
	                isadv = item.isadv || '',
	               	advId = item.adv_id || '',
	                type = item.type,
	                subtype = item.subtype,
	                imgLen = imgArr.length,
	                rowkey = item.rowkey,
	                hot = Number(item.hotnews),     // 热门
	                video = Number(item.isvideo),   // 视频
	                rec = Number(item.isrecom),     // 推荐
	                nuanwen = Number(item.isnxw),   // 暖文
	                urlpv = item.urlpv,				// 浏览量
	                picnums = item.picnums,			// 图片数量
	                praisecnt = item.praisecnt,		// 顶
	                tramplecnt = item.tramplecnt,	// 踩
	                advStr = '',
	                tagStr = '';
	            
	            if(isadv == '1'){
	            	tagStr = '<i class="promote">推广</i>';
	            	advStr = 'class="J-promote-news" data-advid="' + advId + '"';
	            	// 调用show统计接口
	            	scope.sendAdShowLog(advId, url);
	            } else if(hot){
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

	            if(scope.newsType == 'meinv'){
	            	url += '?fr=meinv&#&gid=1&pid=1';
	            } else {
	            	url += '?idx=' + (scope.pulldown_idx-i-1) + '&recommendtype=' + recommendtype + '&ishot=' + hotnews + '&fr=' + scope.newsType;
	            }
	            
	            /*if(scope.newsType == 'meinv'){ // 美女特殊处理
	            	$newsList.prepend('<section class="news-item news-item-s4"><a data-type="' + type + '" data-subtype="' + subtype + '" href="' + url + '"><div class="news-wrap"><h3>' + topic + '</h3><div class="img-wrap clearfix"><img class="lazy fl" src="' + imgArr[0].src + '" alt="' + imgArr[0].alt + '"></div></div></a><div class="options"><span class="num">' + picnums + ' 图</span><span class="view">' + urlpv + '</span><span class="split">|</span><span class="J-good good" data-rowkey="' + rowkey + '">' + praisecnt + '</span><span class="J-bad bad" data-rowkey="' + rowkey + '">' + tramplecnt + '</span></div></section>');
	            } else */
	            if(ispicnews == '1'){	// 大图模式
	            	imgArr = item.lbimg;
	            	$newsList.prepend('<section class="pull-down news-item news-item-s3"><a ' + advStr + ' data-type="' + type + '" data-subtype="' + subtype + '" href="' + url + '"><div class="news-wrap"><h3>' + topic + '</h3><div class="img-wrap clearfix"><img class="lazy fl" src="' + imgArr[0].src + '" alt="' + imgArr[0].alt + '"></div><p class="clearfix"><em class="fl">' + (tagStr?tagStr:GLOBAL.Util.getSpecialTimeStr(dateStr)) + '</em><em class="fr">' + source + '</em></p></div></a></section>');
	            } else if(imgLen >= 3){
	                $newsList.prepend('<section class="pull-down news-item news-item-s2"><a ' + advStr + ' data-type="' + type + '" data-subtype="' + subtype + '" href="' + url + '"><div class="news-wrap"><h3>' + topic + '</h3><div class="img-wrap clearfix"><div class="img fl"><img class="lazy" src="' + imgArr[0].src + '" alt="' + imgArr[0].alt + '"></div><div class="img fl"><img class="lazy" src="' + imgArr[1].src + '" alt="' + imgArr[1].alt + '"></div><div class="img fl"><img class="lazy" src="' + imgArr[2].src + '" alt="' + imgArr[2].alt + '"></div></div><p class="clearfix"><em class="fl">' + (tagStr?tagStr:GLOBAL.Util.getSpecialTimeStr(dateStr)) + '</em><em class="fr">' + source + '</em></p></div></a></section>');
	            } else {
	            	$newsList.prepend('<section class="pull-down news-item news-item-s1"><a ' + advStr + ' data-type="' + type + '" data-subtype="' + subtype + '" href="' + url + '"><div class="news-wrap clearfix"><div class="txt-wrap fr"><h3>' + topic + '</h3> <p><em class="fl">' + (tagStr?tagStr:GLOBAL.Util.getSpecialTimeStr(dateStr)) + '</em><em class="fr">' + source + '</em></p></div><div class="img-wrap fl"><img class="lazy" src="' + imgArr[0].src + '" alt="' + imgArr[0].alt + '"></div></div></a></section>');
	            }
	        }
	        // 提示推荐新闻条数
	        var $rn = $('<p id="J_recommend_news" class="recommend-news">为您推荐<span>' + len + '</span>条新闻</p>');
	        $rn.appendTo('body');
	        setTimeout(function(){
	        	$rn.animate({
	        		'scale': 0,
	        		'opacity': 0.5
	        	}, '600', function(){
	        		$rn.remove();
	        	});
	        	// $rn.fadeOut('slow', function(){
	        	// 	$rn.remove();
	        	// });
	        }, 1200);
	        // 如果下拉加载数据次数超过20次，清空信息流末尾新闻数据。
	        if(scope.pulldown_num >= 20){
	        	scope.pulldown_num = 0;
	        	var $newsListChildrens = $newsList.children(),
	        		newsLen = $newsListChildrens.length;
	        	for (var i = newsLen - 1; i >= newsLen - 20; i--) {
	        		$newsListChildrens[i].remove();
	        	}
	        }
			// 记录pulldown_idx
	        wsCache.set('pulldown_idx_' + scope.newsType, scope.pulldown_idx - len, {exp: 20 * 60});
	        setTimeout(function(){
	        	// 清除pull-down类
		        $newsList.children().removeClass('pull-down');
		        // 缓存当前类别加载的新闻（缓存20分钟）
		        wsCache.set('news_' + scope.newsType, $newsList.html(), {exp: 20 * 60});
	        }, 400);
		},

		/**
		 * 发送推广自然（show）的统计信息
		 * @param  {[type]} advId  广告ID
		 * @param  {[type]} advUrl 广告URL
		 * @return {[type]}        [description]
		 */
		sendAdShowLog: function(advId, advUrl){
			var scope = this,
				pixel=GLOBAL.Util.getPixel();
			$.ajax({
				url: showAdLogUrl,
				dataType: 'jsonp',
				data: {
					"qid": scope.qid || 'null',
					"uid": scope.userId || 'null',
					"loginid": 'null',
					"softtype": 'news',
					"softname": 'eastday_wapnews',
					"newstype": 'ad',
					"from": 'null',
					"advurl": advUrl || 'null',
					"os_type": GLOBAL.Util.getOsType() || 'null',
					"browser_type": GLOBAL.Util.getBrowserType() || 'null',
					"fr_url": "null",
					"pixel": pixel.w + '*' + pixel.h,
					"ime": "null",
					"adv": advId || 'null'
				},
				jsonp : 'jsonpcallback',
				success : function(msg) {}
			});
		},

		/**
		 * 将已经点过赞、点过踩的图标高亮显示出来
		 * @return {[type]} [description]
		 */
		highlightPraiseTrample: function(){
			var scope = this;
	        if(scope.newsType == 'meinv'){
	        	$newsList.find('.J-good').each(function(){
	        		var $this = $(this);
	        		if(scope.getPraiseTrampleStatus($this.data('rowkey')) === 1){
	        			$this.addClass('active');
	        		}
	        	});
	        	$newsList.find('.J-bad').each(function(){
	        		var $this = $(this);
	        		if(scope.getPraiseTrampleStatus($this.data('rowkey')) === -1){
	        			$this.addClass('active');
	        		}
	        	});
	        }
		},

		/**
		 * 判断赞、踩状态
		 * @param  {String} rk rowkey
		 * @return {Number}    1：赞过；-1：踩过；0：未赞未踩过。
		 */
		getPraiseTrampleStatus: function(rk){
			var praiseRk = wsCache.get('praise_rowkey'),
				trampleRk = wsCache.get('trample_rowkey');
			if(praiseRk && praiseRk.indexOf(rk) != -1) {
				return 1;
			} else if(trampleRk && trampleRk.indexOf(rk) != -1){
				return -1;
			}
			return 0;
		},

		/**
		 * 缓存赞、踩记录
		 * @param  {Number} ctg 必需 -  赞：1； 踩：-1；
		 * @param  {String} rk 必需 -  需要缓存的rowkey
		 * @return {[type]}     [description]
		 */
		cachePraiseTrampleRowkey: function(ctg, rk){
			var rks = wsCache.get('praise_trample_rowkey'),
				praiseRk = wsCache.get('praise_rowkey'),
				trampleRk = wsCache.get('trample_rowkey');
			if(rks){
				rks += (',' + rk);
			} else {
				rks = rk;
			}
			wsCache.set('praise_trample_rowkey', rks, {exp: 365 * 24 * 3600});
			if(ctg === 1){
				if(praiseRk){
					praiseRk += (',' + rk);
				} else {
					praiseRk = rk;
				}
				wsCache.set('praise_rowkey', praiseRk, {exp: 365 * 24 * 3600});
			} else {
				if(trampleRk){
					trampleRk += (',' + rk);
				} else {
					trampleRk = rk;
				}
				wsCache.set('trample_rowkey', trampleRk, {exp: 365 * 24 * 3600});
			}
		},

		/**
	     * 获取地方站的接口数据
	     * @return {[type]} [description]
	     */
	    location: function(){
	    	var scope = this;
	        $.ajax({
	            url : positionUrl,
	            dataType : 'jsonp',
	            jsonp : 'jsonpcallback',
	            success: function(res){
	            	try {
		                var pos = res.position,
		                    py = scope.getCityPinyin(pos.provname),
		                    loc = null;
		                if(py){
		                    loc = {"prov_id": pos.pro_id,"prov_py": py,"prov_name": pos.provname};
		                    scope.updateDomLocation(loc);
		                    // 缓存位置信息
		                    wsCache.set('location', loc, {exp: 30 * 24 * 3600});
		                } else {
		                	// $loation.remove();
		                }
		            } catch(e) {
		                console.error(e);
		                // $loation.remove();
		            }
	            },
	            error: function(jqXHR,textStatus){
		            console.error(textStatus);
		            // $loation.remove();
		        }
	        });
	    },

		/**
	     * 更新位置信息
	     * @param  {[type]} loc [description]
	     * @return {[type]}     [description]
	     */
	    updateDomLocation: function(loc){
	    	$newsTabsWrap.children('a').eq(1).after('<a data-type="' + loc.prov_py + '">' + loc.prov_name + '</a>');
	    },

		/**
	     * 通过城市中文名获取拼音
	     * @param  {[type]} city 中文名
	     * @return {[type]}      拼音
	     */
	    getCityPinyin: function(city){
	        switch(city){
	            case '上海': return 'shanghai'; break;
	            case '北京': return 'beijing'; break;
	            case '河南': return 'henan'; break;
	            case '广东': return 'guangdong'; break;
	            default: return null;
	        }
	    },

		/**
	     * 缓存已经阅读的url编号
	     * @param {[type]} urlNum url编号
	     */
	    cacheReadUrl: function(urlNum, type, subtype){
	    	var scope = this;
	        // 判断是否存储过
	        if(!scope.existReadUrl(urlNum) && newsTypeArr_special.contains(type)){  // 排除meinv、nuanwen
	            // read_url_all
	            var rua = wsCache.get('read_url_all');
	            if(rua){
	                rua = rua.split(',');
	                while(rua.length >= 5){rua.shift();}
	                rua.push(urlNum);
	                scope.readUrl = rua.join(',');
	            } else {
	                scope.readUrl = urlNum;
	            }
	            wsCache.set('read_url_all', scope.readUrl, {exp: 3 * 24 * 3600});
	            // read_url_type
	            var rut = wsCache.get('read_url_' + type); // xxxx,xxxx,xxxx
	            if(rut){
	                rut = rut.split(',');
	                while(rut.length >= 3){rut.shift();}
	                rut.push(urlNum);
	                rut = rut.join(',');
	            } else {
	                rut = urlNum;
	            }
	            wsCache.set('read_url_' + type, rut, {exp: 3 * 24 * 3600});
	            // read_url_subtype
	            if(subtype){
	                var rust = wsCache.get('read_url_' + subtype); // xxxx,xxxx,xxxx
	                if(rust){
	                    rust = rust.split(',');
	                    while(rust.length >= 3){rust.shift();}
	                    rust.push(urlNum);
	                    rust = rust.join(',');
	                } else {
	                    rust = urlNum;
	                }
	                wsCache.set('read_url_' + subtype, rust, {exp: 3 * 24 * 3600});
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
		 * @param  {[type]} animate true：有动画效果， false：无动画效果.
		 * @return {[type]}         [description]
		 */
		scrollTo: function($target, animate){
			var $newsTabs = $newsTabsWrap.children('a'),
				winWidth = $(window).width(),
				targetOffsetLeft = $target[0].offsetLeft,
				targetWidth = $target.width();
			$newsTabs.removeClass('active');
			$target.addClass('active');
			$newsTabsWrap.scrollLeft(targetOffsetLeft + (targetWidth / 2) - (winWidth / 2));
			
			/*var $newsTabs = $newsTabsWrap.children('a'),
				curScrollLeft = $newsTabsWrap.scrollLeft(),
				targetScrollLeft = $target[0].offsetLeft - ($newsTabs.eq(0).width() * 3) - 10,
				range = curScrollLeft - targetScrollLeft,
				timer = null;

			$newsTabs.removeClass('active');
			$target.addClass('active');
			if(animate){
				if(range <= 0){
					timer = setInterval(function(){
						if(curScrollLeft >= targetScrollLeft){
							clearInterval(timer);
						}
						curScrollLeft += 3;
						$newsTabsWrap.scrollLeft(curScrollLeft);
					}, 1);
				} else {
					timer = setInterval(function(){
						if(curScrollLeft <= targetScrollLeft){
							clearInterval(timer);
						}
						curScrollLeft -= 3;
						$newsTabsWrap.scrollLeft(curScrollLeft);
					}, 1);
				}
			} else {
				$newsTabsWrap.scrollLeft(targetScrollLeft);
			}*/
		},

		setQid: function(qid){
			if(qid){
				Cookies.set('qid', qid, { expires: 3, path: '/', domain: 'eastday.com'});
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
	    },

	    /**
	     * 获取uid
	     * @return {[type]} [description]
	     */
	    getUid: function(){
	    	var uid = Cookies.get('user_id');
	    	// var uid = wsCache.get('user_id');
	        return uid ? uid : '';
	    },

	    /**
	     * 日志收集
	     */
	    addLog: function(){
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
					newstype: scope.newsType || 'null',			// 当前新闻类别
					from: wsCache.get('prev_newstype') || 'null',	// url上追加的fr字段
					to: wsCache.get('current_newstype') || 'null',// 当前页面
					os_type: GLOBAL.Util.getOsType() || 'null',				// 客户端操作系统
					browser_type: GLOBAL.Util.getBrowserType() || 'null',		// 客户端浏览器类别
					pixel: pixel.w + '*' + pixel.h,		// 客户端分辨率
					fr_url: GLOBAL.Util.getReferrer() || 'null',							// 浏览器的refer属性
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
	    },

	    /**
	     * 收集在线日志
	     */
	    addOnlineLog: function(){
	    	var scope = this,
	    		infostr = GLOBAL.Util.getUrlNoParams() + '\t' + scope.userId + '\t' + scope.qid + '\tnull\tnull\tnull\t' + scope.newsType + '\tnull\tnull\t' + GLOBAL.Util.getOsType() + '\tnull';
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
		 * 刷新数据
		 * @param {Function} callback 回调方法
		 * @return {[type]} [description]
		 */
		refreshData: function(callback){
			var scope = this,
				cacheNews = wsCache.get('news_' + scope.newsType),
				cachePos = wsCache.get('news_pos_' + scope.newsType);
			if(cacheNews){
				$newsList.html(cacheNews);
				// 页面滚到记录的位置处
				if(cachePos){
	                $body.scrollTop(cachePos);
	            }
			} else {
				wsCache.delete('pulldown_idx_' + scope.newsType);
				wsCache.set('pgnum_' + scope.newsType, 1, { exp: 20 * 60});
				// 获取阅读历史
		        scope.readUrl = scope.getReadUrl();
				$.ajax({
		            url: refreshUrl,
		            data: {
		                type: scope.newsType,
		                recgid: scope.userId, // 用户ID
		                qid: scope.qid,
		                picnewsnum : 1,
		                readhistory: scope.readUrl,
		                idx: 0,
		                pgnum: 1,
		                os: scope.osType
		            },
		            dataType: 'jsonp',
		            jsonp: "jsonpcallback",
		            timeout: 8000,
		            beforeSend: function(){
		                $newsList.html('');
		            },
		            success: function(data){
		                scope.generateDom(data);
		                // 页面滚到记录的位置处
						if(cachePos){
			                $body.scrollTop(cachePos);
			            }
		            },
		            complete: function(){
		                callback && callback();
		            }
		        });
			}
		},

		pullUpLoadData: function(){
			var scope = this;
			// 获取阅读历史
	        scope.readUrl = scope.getReadUrl();
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
	                startkey: wsCache.get('startkey_' + scope.newsType),
	                newsnum: scope.newsType == 'meinv' ? 10 : 20,
	                qid: scope.qid,
	                readhistory: scope.readUrl,
	                idx: scope.idx,
	                recgid: scope.userId, // 用户ID
	                pgnum: scope.pgNum,
	                os: scope.osType
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
	        // wsCache.set('rowkey_' + scope.newsType, d.endkey, {exp: 24 * 3600});
	       	// scope.startKey = d.endkey;
	        wsCache.set('startkey_' + scope.newsType, d.endkey, {exp: 24 * 3600});
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
	                ispicnews = item.ispicnews,
	                isadv = item.isadv || '',
	               	advId = item.adv_id || '',
	                type = item.type,
	                subtype = item.subtype,
	                imgLen = imgArr.length,
	                rowkey = item.rowkey,
	                hot = Number(item.hotnews),     // 热门
	                video = Number(item.isvideo),   // 视频
	                rec = Number(item.isrecom),     // 推荐
	                nuanwen = Number(item.isnxw),   // 暖文
	                urlpv = item.urlpv,				// 浏览量
	                picnums = item.picnums,			// 图片数量
	                praisecnt = item.praisecnt,		// 顶
	                tramplecnt = item.tramplecnt,	// 踩
	                advStr = '',
	                tagStr = '';

	            if(isadv == '1'){
	            	tagStr = '<i class="promote">推广</i>';
	                advStr = 'class="J-promote-news" data-advid="' + advId + '"';
	            	// 调用show统计接口
	            	scope.sendAdShowLog(advId, url);
	            } else if(hot){
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
	            if(scope.newsType == 'meinv'){
	            	url += '?fr=meinv&#&gid=1&pid=1';
	            } else {
	            	url += '?idx=' + (scope.idx+i+1) + '&recommendtype=' + recommendtype + '&ishot=' + hotnews + '&fr=' + scope.newsType;
	            }
	            if(scope.newsType == 'meinv'){ // 美女特殊处理
	            	$newsList.append('<section class="news-item news-item-s4"><a data-type="' + type + '" data-subtype="' + subtype + '" href="' + url + '"><div class="news-wrap"><h3>' + topic + '</h3><div class="img-wrap clearfix"><img class="lazy fl" src="' + imgArr[0].src + '"></div></div></a><div class="options"><span class="num">' + picnums + ' 图</span><span class="view">' + urlpv + '</span><span class="split">|</span><span class="J-good good" data-rowkey="' + rowkey + '">' + praisecnt + '</span><span class="J-bad bad" data-rowkey="' + rowkey + '">' + tramplecnt + '</span></div></section>');
	            } else {
	            	/*====== 插入广告 ========*/
            		var baiduHtmlWrap = '<div class="gg-wrap"><iframe src="gg/gg_baidu.html" frameborder="0" scrolling="no" width="100%" height="78px"></iframe></div>',
            			sogouHtmlWrap = '<div class="gg-wrap"><iframe src="gg/gg_sogou.html" frameborder="0" scrolling="no" width="100%" height="78px"></iframe></div>';
	            	if(GLOBAL.Et.gg){	// 有渠道号情况
						if(GLOBAL.Et.ggTypeArr.contains('baidu') && GLOBAL.Et.ggTypeArr.contains('sogou')){
							// 策略一(8 13 18 23 ...)
							if(i === 7 || i === 15){	// 百度广告
								$newsList.append(baiduHtmlWrap);
							} else if(i === 11 || i === 19){	// 搜狗广告
								$newsList.append(sogouHtmlWrap);
							}
						} else if(GLOBAL.Et.ggTypeArr.contains('sogou')){
							// 策略三(8 13 18 23 ...)
							if(i === 7 || i === 11 || i === 15 || i === 19){	// 百度广告
								$newsList.append(sogouHtmlWrap);
							}
						} else if(GLOBAL.Et.ggTypeArr.contains('baidu')){
							// 策略二(8 18 ...)
							if(i === 7 || i === 15){	// 百度广告
								$newsList.append(baiduHtmlWrap);
							}
						} else {	// 默认百度广告
							if(i === 7 || i === 15){
								$newsList.append(baiduHtmlWrap);
							}
						}
					} else {	// 无渠道号情况，默认百度广告
						if(i === 7 || i === 15){
							$newsList.append(baiduHtmlWrap);
						}
					}
					/*======== 新闻流 =========*/
	            	if(ispicnews == '1'){	// 大图模式
		            	imgArr = item.lbimg;
		            	$newsList.append('<section class="news-item news-item-s3"><a ' + advStr + ' data-type="' + type + '" data-subtype="' + subtype + '" href="' + url + '"><div class="news-wrap"><h3>' + topic + '</h3><div class="img-wrap clearfix"><img class="lazy fl" src="' + imgArr[0].src + '"></div><p class="clearfix"><em class="fl">' + (tagStr?tagStr:GLOBAL.Util.getSpecialTimeStr(dateStr)) + '</em><em class="fr">' + source + '</em></p></div></a></section>');
		            } else if(imgLen >= 3){		// 三图模式
		                $newsList.append('<section class="news-item news-item-s2"><a ' + advStr + ' data-type="' + type + '" data-subtype="' + subtype + '" href="' + url + '"><div class="news-wrap"><h3>' + topic + '</h3><div class="img-wrap clearfix"><div class="img fl"><img class="lazy" src="' + imgArr[0].src + '"></div><div class="img fl"><img class="lazy" src="' + imgArr[1].src + '"></div><div class="img fl"><img class="lazy" src="' + imgArr[2].src + '"></div></div><p class="clearfix"><em class="fl">' + (tagStr?tagStr:GLOBAL.Util.getSpecialTimeStr(dateStr)) + '</em><em class="fr">' + source + '</em></p></div></a></section>');
		            } else {	// 单图模式
		            	$newsList.append('<section class="news-item news-item-s1"><a ' + advStr + ' data-type="' + type + '" data-subtype="' + subtype + '" href="' + url + '"><div class="news-wrap clearfix"><div class="txt-wrap fr"><h3>' + topic + '</h3> <p><em class="fl">' + (tagStr?tagStr:GLOBAL.Util.getSpecialTimeStr(dateStr)) + '</em><em class="fr">' + source + '</em></p></div><div class="img-wrap fl"><img class="lazy" src="' + imgArr[0].src + '"></div></div></a></section>');
		            }
	            }
	        }
	        // 记录idx
	        wsCache.set('idx_' + scope.newsType, scope.idx + len, {exp: 20 * 60});
	        // 缓存当前类别加载的新闻（缓存20分钟）
	        wsCache.set('news_' + scope.newsType, $newsList.html(), {exp: 20 * 60});
	    },

	    /**
	     * 设置广告ID
	     */
	    setGgId: function(){
	    	if(GLOBAL.Et.gg){	// 有渠道号情况
				if(GLOBAL.Et.ggTypeArr.contains('baidu') && GLOBAL.Et.ggTypeArr.contains('sogou')){
					$ggBaidu.val(GLOBAL.Et.gg['baidu']['li']);
					$ggSogou.val(GLOBAL.Et.gg['sogou']['li']);
				} else if(GLOBAL.Et.ggTypeArr.contains('sogou')){
					$ggSogou.val(GLOBAL.Et.gg['sogou']['li']);
				} else if(GLOBAL.Et.ggTypeArr.contains('baidu')){
					$ggBaidu.val(GLOBAL.Et.gg['baidu']['li']);
				} else {	// 默认百度广告
					$ggBaidu.val(GLOBAL.Et.ggData.root['default']); // first.js
				}
			} else {	// 无渠道号情况，默认百度广告
				$ggBaidu.val(GLOBAL.Et.ggData.root['default']); // first.js
			}
	    }

	};

	new EastNews();

});