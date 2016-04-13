/*
 * 搜索页js
 */
$(function(){
	FastClick.attach(document.body);
	var hotWordsUrl = 'http://minisearch.dfshurufa.com/hotwords/hotwords',
		searchUrl = 'http://minisearch.dfshurufa.com/search/search02',
		$searchBtn = $('#J_search_btn'),
		$searchInput = $('#J_search_input'),
		$hotWords = $('#J_hot_words'),
		$newsWrap = $('#J_news_wrap'),
		$newsList = $('#J_news_list'),
		$loading = $('#J_loading'),
		idx = 0,	// 链接索引
		kw = '',	// 搜索关键词
		pullUpFlag = true,
		timer = null,
		wsCache = new WebStorageCache();	// 本地存储对象

	function NewsSearch(){
		this.init();
	}

	NewsSearch.prototype = {
		/**
		 * 初始化
		 * @return {[type]} [description]
		 */
		init: function(){
			var scope = this;

			/* 加载热词 */
			if(wsCache.get("search_hotwords")){
				$hotWords.html(wsCache.get("search_hotwords"));
			} else {
				// 加载热词
				scope.loadHotWords();
			}

			/* 热词点击事件监听 */
			$hotWords.on('click', 'a', function(){
				scope.clearCaches();
				kw = $(this).text();
				// 加载新闻
				scope.loadSearchData(kw);
				// 搜索框赋值
				$searchInput.val(kw);
				// 更新搜索按钮状态
				scope.updateBtnStatus();
				// 缓存搜索关键词
				scope.cacheKw();
			});

			/* 页面滚动监听（当滑到底部时，加载下一页数据。）注意：ipone上点击触发滚动事件 */
			$(window).on('scroll', function() {
	            var scrollTop = getScrollTop(),
	                loadingOT = $loading.offset().top,
	                cHeight = getClientHeight();
                // 上拉加载数据(pullUpFlag标志 防止操作过快多次加载) loadingOT >= cHeight：防止ios浏览器默认的弹性滚动触发加载数据问题。
	            if(loadingOT >= cHeight && scrollTop + cHeight >= loadingOT && pullUpFlag && kw){
	            	pullUpFlag = false;
                    scope.loadSearchData(kw);
	            }
	        });

			/* 搜索提交事件 */
			$searchBtn.on('click', function(e){
				var $this = $(this);
				if($this.hasClass('cancel')){
					// 清空输入框 - 聚焦输入框
					$searchInput.val('').focus()
					// 清空搜索信息流并显示搜索热词
					scope.clearContent();
				} else {
					kw = $.trim($searchInput.val());
					if(kw){
						// 清空搜索信息流
						$newsList.html('');
						// 清空缓存
						scope.clearCaches();
						// 加载搜索新闻
						scope.loadSearchData(kw);
						// 缓存关键词
						scope.cacheKw();
					}
				}
				scope.updateBtnStatus();
				e.preventDefault();
			});

			// 聚焦到输入框
			// $searchInput.focus(); // ios上会导致首次很难聚焦

			// 搜索框输入事件
	        $searchInput.on('keyup', function(e){
	        	timer && clearTimeout(timer);
	        	timer = setTimeout(function(){
	        		kw = $.trim($searchInput.val());
					if(!kw){
						// 清空搜索信息流并显示搜索热词
						scope.clearContent();
			        	scope.updateBtnStatus();
					}
	        	}, 300);
	        	if(e.keyCode === 13){
	        		kw = $.trim($searchInput.val());
					if(kw){
						// 清空搜索信息流
						$newsList.html('');
						// 清空缓存
						scope.clearCaches();
						// 加载搜索新闻
						scope.loadSearchData(kw);
						// 缓存关键词
						scope.cacheKw();
					}
		        	scope.updateBtnStatus();
	        	}
	        });

	        if(wsCache.get('search_content')){
	        	$hotWords.hide();
				$newsWrap.show();
	        	$newsList.html(wsCache.get('search_content'));
	        } else {
	        	$hotWords.show();
				$newsWrap.hide();
				wsCache.delete('search_kw');
	        }

	        kw = wsCache.get('search_kw');
	        kw && $searchInput.val(kw);

	        scope.updateBtnStatus();
		},

		/**
		 * 更新搜索按钮状态
		 * @return {[type]} [description]
		 */
		updateBtnStatus: function(){
			var val = $.trim($searchInput.val());
			if(val){
				$searchBtn.addClass('cancel');
				$searchBtn.text('取消');
			} else {
				$searchBtn.removeClass('cancel');
				$searchBtn.text('搜索');
			}
		},

		/**
		 * 缓存搜索关键词
		 * @return {[type]} [description]
		 */
		cacheKw: function(){
			wsCache.set('search_kw', kw);
		},

		/**
		 * 清空搜索信息流并显示搜索热词
		 * @return {[type]} [description]
		 */
		clearContent: function(){
			$newsList.empty();
			$newsWrap.hide();
			$hotWords.show();
			wsCache.delete('search_content');
		},

		/**
		 * 清除本地存储信息(重新搜索时用到)
		 * @return {[type]} [description]
		 */
		clearCaches: function(){
			wsCache.delete('search_param_lastcol');
			wsCache.delete('search_param_splitwordsarr');
			wsCache.delete('search_param_stkey');
		},

		/**
		 * 加载搜索数据
		 * @param  {[type]} keywords 搜索关键词
		 * @return {[type]}    [description]
		 */
		loadSearchData: function(keywords){
			var scope = this,
				qid = Cookies.get('qid'),
				uid = Cookies.get('user_id'),
				lastcol = wsCache.get('search_param_lastcol') ? wsCache.get('search_param_lastcol') : '',
				splitwordsarr = wsCache.get('search_param_splitwordsarr') ? JSON.parse(wsCache.get('search_param_splitwordsarr')) : '',
				stkey = wsCache.get('search_param_stkey') ? wsCache.get('search_param_stkey') : '',
				pixel = getPixel();
			$.ajax({
				url: searchUrl,
				dataType: 'jsonp',
				timeout: 6000,
				data: {
					'keywords': encodeURI(keywords),
					'stkey': encodeURI(stkey),
					'lastcol': lastcol,
					'splitwordsarr': encodeURI(splitwordsarr),
					'uid': uid,
					'qid': qid,
					'softtype': 'news',
					'softname': 'eastday_wapnews',
					'os_type': getOsType(),
					'browser_type': getBrowserType(),
					'pixel': pixel.w + '*' + pixel.h
				},
				jsonp: 'jsonpcallback',
				beforeSend: function(){
					pullUpFlag = false;
					$loading.show();
				},
				success: function(data) {
					try {
						$hotWords.hide();
						$newsWrap.show();
						scope.generateDom(data);
					} catch(e) {
						$('.J-no-news').remove();
						$loading.before('<p class="J-no-news" style="text-align: center; font-size: 0.24rem; padding: 30px; color: #999;">抱歉，未找到相关新闻！</p>');
						$loading.hide();
					}
				},
				error: function() {
					console.error(arguments);
				},
				complete: function(){
					pullUpFlag = true;
				}
			});
		},

		/**
	     * 将数据组装成html代码
	     * @param  {[type]} d 数据
	     * @return {[type]}   [description]
	     */
		generateDom: function(d){
			var scope = this,
				len = d.length
			if(!idx){idx = 0;}
			if(len === 0){
				$('.J-no-news').remove();
				$loading.before('<p class="J-no-news" style="text-align: center; font-size: 0.24rem; padding: 30px; color: #999;">抱歉，未找到相关新闻！</p>');
				$loading.hide();
				return;
			}
			for (var i = 0; i < len; i++) {
				var url = d[i].url,
					title = d[i].title,
					splitword = d[0].splitword,
					date = d[i].date,
					imgArr = d[i].imgstr,
					imgLen = imgArr.length,
					source = d[i].source;
				title = scope.getNewStr(title, splitword);
				url += '?idx=' + (idx++);
				if(imgLen >= 3){		// 三图模式
	                $newsList.append('<section class="news-item news-item-s2"><a href="' + url + '"><div class="news-wrap"><h3>' + title + '</h3><div class="img-wrap clearfix"><div class="img fl"><img class="lazy" src="' + imgArr[0].src + '"></div><div class="img fl"><img class="lazy" src="' + imgArr[1].src + '"></div><div class="img fl"><img class="lazy" src="' + imgArr[2].src + '"></div></div><p class="clearfix"><em class="fl">' + date + '</em><em class="fr">' + source + '</em></p></div></a></section>');
	            } else {	// 单图模式
	            	$newsList.append('<section class="news-item news-item-s1"><a href="' + url + '"><div class="news-wrap clearfix"><div class="txt-wrap fr"><h3>' + title + '</h3> <p><em class="fl">' + date + '</em><em class="fr">' + source + '</em></p></div><div class="img-wrap fl"><img class="lazy" src="' + imgArr[0].src + '"></div></div></a></section>');
	            }
			}
			var stkey = d[0].stkey,
				lastcol = d[0].lastcol,
				splitwordsarr = d[0].splitwordsarr;
			wsCache.set('search_param_stkey', stkey);
			wsCache.set('search_param_lastcol', lastcol);
			wsCache.set('search_param_splitwordsarr', JSON.stringify(splitwordsarr));
			wsCache.set('search_content', $newsList.html(), {exp: 20 * 60});
		},

		/**
		 * 加载搜索热词
		 * @return {[type]} [description]
		 */
		loadHotWords: function(){
			$.ajax({
				type: 'GET',
				url: hotWordsUrl,
				dataType: 'jsonp',
				data: {
					type: 'now'
				},
				jsonp: 'jsonpcallback',
				timeout: 5000,
				success: function(data) {
					var hotWords = data.ret,
						hotHtml = '<h3>热门搜索</h3>';
					for(var i = 0; i < 10; i++){
						hotHtml += '<p><a href="javascript:;">' + hotWords[i] + '</a></p>';
					}
					$hotWords.html(hotHtml);
					wsCache.set("search_hotwords", hotHtml, {exp: 5 * 60});
				},
				error : function(){
					console.error(arguments);
				}
			});
		},

		/**
		 * 关键词加红处理（递归算法）
		 * @param  {String} txt   标题
		 * @param  {Array} swArr  关键词数组(字符串)
		 * @param  {Number} i     0
		 * @return {String}       新的标题
		 */
		getNewStr: function(txt, swArr, i){
			var scope = this;
			if(txt && swArr && swArr.length){
				var len = swArr.length;
				swArr.sort(function(a, b){
					return b.length - a.length;
				});
				if(!i){i = 0;}
				if(i == len){
					return txt;
				} else {
					var reg = new RegExp(swArr[i], 'gi');
					var tempTxt = txt;
					var subTxtIndex = tempTxt.toLowerCase().indexOf(swArr[i].toLowerCase());
					var subTxt = txt.substring(subTxtIndex, subTxtIndex + swArr[i].length);
					return scope.getNewStr(txt.replace(reg, '<em>' + subTxt + '</em>'), swArr, ++i);
				}
			} else {
				return '';
			}
		}
	};

	new NewsSearch();

});