/*
 * 搜索页js
 */
$(function(){
	FastClick.attach(document.body);
	var hotWordsUrl = 'http://minisearch.dfshurufa.com/hotwords/hotwords',
		searchUrl = 'http://minisearch.dfshurufa.com/search/search02',
		$form = $('#J_form'),
		$searchInput = $('#J_search_input'),
		$searchClear = $('#J_search_clear');
		$hotWords = $('#J_hot_words'),
		$newsWrap = $('#J_news_wrap'),
		$newsList = $('#J_news_list'),
		$loading = $('#J_loading'),
		idx = 0,	// 链接索引
		kw = '',	// 搜索关键词
		pullUpFlag = true,
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
				scope.loadHotWords();
			}

			/* 热词点击事件监听 */
			$hotWords.on('click', 'a', function(){
				scope.clearCaches();
				kw = $(this).text();
				scope.loadSearchData(kw);
				$searchInput.val(kw);
				$searchClear.show();
				scope.cacheKw();
			});

			/* 页面滚动监听（当滑到底部时，加载下一页数据。） */
			$(window).on('scroll', function() {
	            var scrollTop = getScrollTop(),
	                loadingOT = $loading.offset().top,
	                cHeight = getClientHeight();
                // 上拉加载数据(pullUpFlag标志 防止操作过快多次加载)
	            if(scrollTop + cHeight >= loadingOT && pullUpFlag){
                    scope.loadSearchData(kw);
	            }
	        });

			/* 搜索提交事件 */
			$form.on('submit', function(){
				kw = $.trim($searchInput.val());
				if(kw){
					$newsList.html('');
					scope.clearCaches();
					scope.loadSearchData(kw);
					scope.cacheKw();
				}
			});

			// 聚焦到输入框
			$searchInput.focus();

			// 搜索框输入事件
	        $searchInput.on('keyup', function(){
	            scope.showOrHideClear();
	        });
	        // 搜索框清空按钮点击事件
	        $searchClear.on('click', function(e){
	            $searchInput.val('');
	            $searchClear.hide();
	            scope.clearContent();
	            $searchInput.focus();
	            e.preventDefault();
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

	        wsCache.get('search_kw') && $searchInput.val(wsCache.get('search_kw'));
	        scope.showOrHideClear();
		},

		/**
		 * 显示-隐藏clear按钮
		 * @return {[type]} [description]
		 */
		showOrHideClear: function(){
			if($.trim($searchInput.val()) !== ''){
                $searchClear.show();
                // fillUrls();
            } else {
                $searchClear.hide();
                // $searchResult.hide();
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
					$hotWords.hide();
					$newsWrap.show();
					scope.generateDom(data);
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
				$loading.before('<p style="text-align: center; font-size: 0.24rem; padding: 30px; color: #999;">抱歉，未找到相关新闻！</p>');
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
				if(imgLen >= 3){
	                $newsList.append('<section class="news-item news-item-s2"><a href="' + url + '"><div class="news-wrap"><h3>' + title + '</h3><div class="img-wrap clearfix"><img class="lazy fl" src="' + imgArr[0].src + '" alt="' + imgArr[0].alt + '"><img class="lazy fl" src="' + imgArr[1].src + '" alt="' + imgArr[1].alt + '"><img class="lazy fl" src="' + imgArr[2].src + '" alt="' + imgArr[2].alt + '"></div><p class="clearfix"><em class="fl">' + date + '</em><em class="fr">' + source + '</em></p></div></a></section>');
	            } else {
	            	$newsList.append('<section class="news-item news-item-s1"><a href="' + url + '"><div class="news-wrap clearfix"><div class="txt-wrap fr"><h3>' + title + '</h3> <p><em class="fl">' + date + '</em><em class="fr">' + source + '</em></p></div><div class="img-wrap fl"><img class="lazy" src="' + imgArr[0].src + '" alt="' + imgArr[0].alt + '"></div></div></a></section>');
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
		 * @param  {Array} swArr  关键词数组
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
					var subTxtIndex = tempTxt.toLowerCase().indexOf(swArr[i]);
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