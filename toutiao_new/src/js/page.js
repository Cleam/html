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
		tt_news_qid = '',
		wsCache = new WebStorageCache();	// 本地存储对象

	alert(7777);
	function EastNews(){
		alert('2222222');
		this.newsType = 'toutiao';
		this.userId = '';
		// 初始化
		this.init();
	}

	EastNews.prototype = {
		/**
		 * 初始化
		 */
		init: function(){
			var _this = this;

			_this.load();
		},

		load: function(){
			alert('aaaaaaaaaaa');
			var _this = this;
			$.ajax({
	            url: refreshUrl,
	            data: {
	                type: _this.newsType,
	                endkey: '',
	                domain: 'eastday',
	                recgid: '', // 用户ID
	                picnewsnum: 1,
	                qid: '',
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
	                _this.generateDom(data);
	            },
	            complete: function(){
	                // $bgLoading.hide();
	            }
	        });
		},

		/**
	     * 将数据组装成html代码
	     * @param  {[type]} d 数据
	     * @return {[type]}   [description]
	     */
	    generateDom: function(d){
	    	var _this = this;
	        var data = d && d.data;
	        if(!data || !data.length){
	            // $loading.hide();
	            return false;
	        }
	        // wsCache.set('rowkey_' + _this.newsType, getLastRowkey(data), {exp: 1200});
	        var len = data.length;
	        if(!idx){idx = 0;}
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
	                $newsList.append('<section class="news-item news-item-s2"><a data-type="' + type + '" data-subtype="' + subtype + '" href="' + url + '?qid=' + tt_news_qid + '&idx=' + (idx+i+1) + '&recommendtype=' + recommendtype + '&ishot=' + hotnews + '"><div class="news-wrap"><h3>' + topic + '</h3><div class="img-wrap clearfix"><img class="lazy fl" src="' + imgArr[0].src + '" alt="' + imgArr[0].alt + '"><img class="lazy fl" src="' + imgArr[1].src + '" alt="' + imgArr[1].alt + '"><img class="lazy fl" src="' + imgArr[2].src + '" alt="' + imgArr[2].alt + '"></div><p class="clearfix"><em class="fl">' + (tagStr?tagStr:__getSpecialTimeStr(dateStr)) + '</em><em class="fr">' + source + '</em></p></div></a></section>');
	            } else {
	            	$newsList.append('<section class="news-item news-item-s1"><a data-type="' + type + '" data-subtype="' + subtype + '" href="' + url + '?qid=' + tt_news_qid + '&idx=' + (idx+i+1) + '&recommendtype=' + recommendtype + '&ishot=' + hotnews + '"><div class="news-wrap clearfix"><div class="txt-wrap fr"><h3>' + topic + '</h3> <p><em class="fl">' + (tagStr?tagStr:__getSpecialTimeStr(dateStr)) + '</em><em class="fr">' + source + '</em></p></div><div class="img-wrap fl"><img class="lazy" src="' + imgArr[0].src + '" alt="' + imgArr[0].alt + '"></div></div></a></section>');
	            }
	        }
	        // $.cookie('idx_' + newsType, idx + len, { expires: 0.334, path: '/' });
	        // setCacheNews();
	    },

	    /**
	     * 计算指定时间与当前时间的时间差 并转换成相应格式字符串
	     * 如：xx分钟前，xx小时前，昨天 xx:xx，前天 xx:xx，xx-xx xx:xx
	     * @return {[type]} [description]
	     */
	    __getSpecialTimeStr: function(str){
	        var targetTime = strToTime(str);
	        if(!targetTime){
	            return false;
	        }
	        var currentTime = new Date().getTime();
	        var tdoa = Number(currentTime - targetTime),
	            dayTime = 24 * 60 * 60 * 1000,  // 1天
	            hourTime = 60 * 60 * 1000,  // 1小时
	            minuteTime = 60 * 1000; // 1分钟

	        if(tdoa >= dayTime){ // 天
	            var h = tdoa / dayTime;
	            if(h > 2){
	                return timeToString(tdoa);
	            } else if(h > 1){
	                return '前天';
	            } else {
	                return '昨天';
	            }
	        } else if(tdoa >= hourTime){ // 小时
	            return Math.floor(tdoa / hourTime) + '小时前';
	        } else if(tdoa >= minuteTime) {
	            return Math.floor(tdoa / minuteTime) + '分钟前';
	        } else {
	            return '最新';
	            // return Math.floor(tdoa / 1000) + '秒前';
	        }
	    }


	};


	new EastNews();

});