var tt_news_qid = '';
(function(){
	// 获取渠道ID并赋值给全局变量TT_NEWS_QID;
	tt_news_qid = getChannelId();

	/**
	 * 获取渠道ID（渠道的两种形式, ?xxxx和?mid=xxxx）
	 * @return {[type]} [description]
	 */
	function getChannelId(){
		var mid = getQueryString('mid'),
			curHost = window.location.host,
			prefix = '';
		switch(curHost){
			case 'm.021.com': prefix = 'm021'; break;
			case 'mini.apdft.com': prefix = 'apdft'; break;
			default: prefix = 'm021'; break;
		}
		if(mid){	// ?mid=xxxx
			return prefix + '_' + mid;
		}
		// 无渠道情况 和 ?xxxx
		var tempMid = getQueryString2();
		if(tempMid){
			return prefix + '_' + tempMid;
		} else {
			return prefix + 'dh';
		}
	}

	/**
	 * 获取url中参数的值
	 * @param  {[type]} name 参数名
	 * @return {[type]}      参数值
	 */
	function getQueryString(name) {  
		var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)", "i");
		var r = window.location.search.substr(1).match(reg);
		if (r != null) return decodeURI(r[2]);
		return null;
	}

	/**
	 * 获取url中?后面的字符串
	 * @return {[type]} [description]
	 */
	function getQueryString2(){
		return decodeURI(window.location.search.substr(1));
	}

})();