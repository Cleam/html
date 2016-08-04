// 新需求，根据不同渠道动态改变部分链接地址
/**
 * 根据不同渠道动态改变url 
 * @return {[type]} [description]
 */
/* global tt_news_mid:true */
+function(){
	var i = 0, 
		randomArr = [],
		bdtn = '1023634c',	// 默认tn
		random = 0,
        rd = Math.floor(100 * Math.random()),    // 100以内的随机数
		links, 
		urls;
	// 需求：百度tn（及url中的from字段）原tn号：1023634c，按50%对半分的概率，分一半到新的tn：1012704x
	try	{
		// 分概率替换tn
        for (i = 0; i < 100; i++) {
            randomArr[i] = false;
        }
        for (i = 0; i < 0.5 * 100; i++) {
            random = Math.floor(100 * Math.random());
            randomArr[random] = true;
        }
        // 50%概率替换成新的tn号
        if(randomArr[rd]){
            bdtn = '1012704x';
        }
		$('input[name=from]').val(bdtn);
		$('.J-qid-baidu').attr('href', 'https://m.baidu.com/?from=' + bdtn);
	} catch(e) {}

	/*
		特殊渠道处理
	 */
	if(tt_news_mid === 'pgzs' || tt_news_mid.indexOf('waitui') > -1){	// 天明渠道(pgzs和waitui开头的渠道)
		links = ['jingdong', 'baidu', 'tianmao', 'aitaobao'];
		urls = [
	 		'http://union.click.jd.com/jdc?e=&p=AyIHVCtaJQMiQwpDBUoyS0IQWlALHE4YDk5ER1xONythJ1QcSgNTeCxNQRtnUmgEVmlOAzUXVyUHEgRTE1kUABM3VRpaFAMRB10bXyUydHplUDUUMhI3VR5cFwobBlYdUhUAEjdSK46cucWD087TtNWatWUraw%3D%3D&t=W1dCFBBFC14NXAAECUte',	// 京东
	 		'https://m.baidu.com/?from=1017246b',	// 百度
	 		'http://s.click.taobao.com/t?e=m%3D2%26s%3DQjzzy9CS31kcQipKwQzePCperVdZeJviK7Vc7tFgwiFRAdhuF14FMYFeZnIfpf7r1aH1Hk3GeOgVKIrKoTqn7QafxTjEMcEf9vrWv5Uq6elXdmLdbxdQT02srC8Mk09eQgZss1jm63jcHtRpEUy6RPalRWTdFmFpJPwiig1bxLMnyi1UQ%2F17I10hO9fBPG8oXH%2BQH9e66Y4%3D',	// 天猫
	 		'http://ai.m.taobao.com/index.html?pid=mm_112599953_11408251_55960340'	// 爱淘宝
	 	];
		$('input[name=from]').val('1017246b');
		for (i = 0; i < links.length; i++) {
			$('.J-qid-' + links[i]).attr('href', urls[i]);
		}
		// 苹果助手的去掉  同城约替换成游戏中心
		$('.J-pgzs-hide').hide();
		$('.J-pgzs-show').show();
	} else if(tt_news_mid === 'chenz' || tt_news_mid === 'wy027'){	// chenz渠道
		links = ['baidu'];
	 	urls = [
	 		'https://m.baidu.com/?from=1017246a'
	 	];
		$('input[name=from]').val('1017246a');
		for (i = 0; i < links.length; i++) {
			$('.J-qid-' + links[i]).attr('href', urls[i]);
		}
	} else if(tt_news_mid === 'mbzm'){
		links = ['baidu'];
	 	urls = [
	 		'https://m.baidu.com/?from=1012150b'
	 	];
		$('input[name=from]').val('1012150b');
		for (i = 0; i < links.length; i++) {
			$('.J-qid-' + links[i]).attr('href', urls[i]);
		}
	} else if(tt_news_mid === 'hyx007'){
		links = ['baidu'];
	 	urls = [
	 		'https://www.baidu.com/?from=1017246f'
	 	];
		$('input[name=from]').val('1017246f');
		for (i = 0; i < links.length; i++) {
			$('.J-qid-' + links[i]).attr('href', urls[i]);
		}
	}

}();