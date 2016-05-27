// 新需求，根据不同渠道动态改变部分链接地址
/**
 * 根据不同渠道动态改变url 
 * @return {[type]} [description]
 */
+function(){
	var links, urls;
	if(tt_news_mid === 'pgzs' || tt_news_mid.indexOf('waitui') > -1){	// 天明渠道(pgzs和waitui开头的渠道)
		links = ['jingdong', 'baidu', 'youxizhongxin', 'tianmao', 'aitaobao'];
		urls = [
	 		'http://union.click.jd.com/jdc?e=&p=AyIHVCtaJQMiQwpDBUoyS0IQWlALHE4YDk5ER1xONythJ1QcSgNTeCxNQRtnUmgEVmlOAzUXVyUHEgRTE1kUABM3VRpaFAMRB10bXyUydHplUDUUMhI3VR5cFwobBlYdUhUAEjdSK46cucWD087TtNWatWUraw%3D%3D&t=W1dCFBBFC14NXAAECUte',
	 		'https://m.baidu.com/?from=1017246b',
	 		'http://tongji.51pgzs.com/51pgzs/appid/index.html',
	 		'http://ai.m.taobao.com/index.html?pid=mm_112599953_11408251_55960340',	// 天猫
	 		'http://s.click.taobao.com/t?e=m%3D2%26s%3DQjzzy9CS31kcQipKwQzePCperVdZeJviK7Vc7tFgwiFRAdhuF14FMYFeZnIfpf7r1aH1Hk3GeOgVKIrKoTqn7QafxTjEMcEf9vrWv5Uq6elXdmLdbxdQT02srC8Mk09eQgZss1jm63jcHtRpEUy6RPalRWTdFmFpJPwiig1bxLMnyi1UQ%2F17I10hO9fBPG8oXH%2BQH9e66Y4%3D'	// 爱淘宝
	 	];
		$('input[name=from]').val('1017246b');
		for (var i = 0; i < links.length; i++) {
			$('.J-qid-' + links[i]).attr('href', urls[i]);
		}
	} else if(tt_news_mid === 'chenz' || tt_news_mid === 'wy027'){	// chenz渠道
		links = ['baidu'];
	 	urls = [
	 		'https://m.baidu.com/?from=1017246a'
	 	];
		$('input[name=from]').val('1017246a');
		for (var i = 0; i < links.length; i++) {
			$('.J-qid-' + links[i]).attr('href', urls[i]);
		}
	} else if(tt_news_mid === 'mbzm'){
		links = ['baidu'];
	 	urls = [
	 		'https://m.baidu.com/?from=1012150b'
	 	];
		$('input[name=from]').val('1012150b');
		for (var i = 0; i < links.length; i++) {
			$('.J-qid-' + links[i]).attr('href', urls[i]);
		}
	}

}();