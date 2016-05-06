// 新需求，根据不同渠道动态改变部分链接地址
/**
 * 根据不同渠道动态改变url 
 * @return {[type]} [description]
 */
+function(){
	var links, urls;
	if(tt_news_mid === 'pgzs' || tt_news_mid.indexOf('waitui') > -1){	// 天明渠道(pgzs和waitui开头的渠道)
		links = ['jingdong', 'baidu', 'youxizhongxin'];
		urls = [
	 		'http://union.click.jd.com/jdc?e=&p=AyIHVCtaJQMiQwpDBUoyS0IQWlALHE4YDk5ER1xOGWV5PRxpdH4TYj59dGVgHnA%2FY2FkYzRdVxkyFwZRE1kWChAFZRtaFAMTBFUTXRMyImEoKxB7AyIHZRteEQsUD10fWBAEEwJlHGtIVlNXDV0LSlRPQwsraw%3D%3D&t=W1dCFBBFC14NXAAECUteDA%3D%3D',
	 		'https://m.baidu.com/?from=1017246b',
	 		'http://tongji.51pgzs.com/51pgzs/appid/index.html'
	 	];
		$('input[name=from]').val('1017246b');
		for (var i = 0; i < links.length; i++) {
			$('.J-qid-' + links[i]).attr('href', urls[i]);
		}
	} else if(tt_news_mid === 'chenz'){	// chenz渠道
		links = ['baidu'];
	 	urls = [
	 		'https://m.baidu.com/?from=1017246a'
	 	];
		$('input[name=from]').val('1017246a');
		for (var i = 0; i < links.length; i++) {
			$('.J-qid-' + links[i]).attr('href', urls[i]);
		}
	}

}();