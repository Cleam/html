// 新需求，根据不同渠道动态改变部分链接地址
/**
 * 根据不同渠道动态改变url 
 * @return {[type]} [description]
 */
+function(){
	var links, urls;
	if(tt_news_mid === 'pgzs' || tt_news_mid.indexOf('waitui') > -1){	// 天明渠道(pgzs和waitui开头的渠道)
		links = ['aitaobao', 'tianmao', 'juhuasuan', 'jingdong', 'baidu', 'youxizhongxin'];
		urls = [
	 		'http://ai.m.taobao.com?pid=mm_113832645_13024572_50938655',
	 		'http://s.click.taobao.com/t?e=m%3D2%26s%3DYnYwQstvn2McQipKwQzePCperVdZeJviK7Vc7tFgwiFRAdhuF14FMTVaUg17UB2LJ1gyddu7kN%2BjCptECCSdYFdqBgvJFn8KCqGh%2BcJHw5%2BHxef1KDjMl02srC8Mk09eQgZss1jm63jcHtRpEUy6RPalRWTdFmFpJPwiig1bxLMnyi1UQ%2F17I10hO9fBPG8oXH%2BQH9e66Y4%3D',
	 		'http://s.click.taobao.com/t?e=m%3D2%26s%3DIzVpx29jtG9w4vFB6t2Z2iperVdZeJviEViQ0P1Vf2lyINtkUhsv0M9EwUL6BAhEUukTSLZXHV%2B9AmARIwX9K3HFd9TCmEKTeEV%2BM%2BWE6mfZL%2FrExw0TRqb6h%2BauVgdyXhvQRrBlV3jGDmntuH4VtA%3D%3D&pid=mm_113832645_13024572_55568475',
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