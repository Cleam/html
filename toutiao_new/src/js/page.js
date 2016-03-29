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

	var refreshUrl = 'http://toutiao.eastday.com/toutiao_h5/RefreshJP';
	

	function EastNews(){
		this.newsType = 'toutiao';
		this.userId = '';
	}

	EastNews.prototype = {
		init: function(){
			var _this = this;

			_this.load('toutiao');
		},

		load: function(){
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
	                $ttNewsList.html('');
	                $bgLoading.show();
	            },
	            success: function(data){
	                generateDom(data);
	            },
	            complete: function(){
	                $bgLoading.hide();
	            }
	        });
		},


	};

});