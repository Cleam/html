// 新需求，根据天明渠道动态改变部分链接地址
/**
 * 根据天明渠道动态改变url <天明渠道(pgzs和waitui开头的渠道)>
 * @return {[type]} [description]
 */
+function(){
	if(tt_news_mid === 'pgzs' || tt_news_mid.indexOf('waitui') > -1){
		var links = ['aitaobao', 'tianmao', 'juhuasuan', 'jingdong', 'baidu', 'youxizhongxin'],
		 	urls = [
		 		'http://ai.m.taobao.com?pid=mm_113832645_13024572_50938655',
		 		'http://s.click.taobao.com/t?e=m%3D2%26s%3Djokmi2nvR%2FIcQipKwQzePCperVdZeJvipRe%2F8jaAHci5VBFTL4hn2YR%2BfqbSjekxbJxUEh8sgi%2B6Wguv30TCbHxveng1wJL%2BjoLQbbx50iygSHBHkHELt%2BVKDnkZVfnBvoet87lGTGGIGrHgCgZNHPhXpSX4ya3U',
		 		'http://s.click.taobao.com/t?e=m%3D2%26s%3DIzVpx29jtG9w4vFB6t2Z2iperVdZeJviEViQ0P1Vf2lyINtkUhsv0M9EwUL6BAhEUukTSLZXHV%2B9AmARIwX9K3HFd9TCmEKTeEV%2BM%2BWE6mfZL%2FrExw0TRqb6h%2BauVgdyXhvQRrBlV3jGDmntuH4VtA%3D%3D&pid=mm_113832645_13024572_50940954',
		 		'http://union.click.jd.com/jdc?e=&p=AyIHVCtaJQMiQwpDBUoyS0IQWlALHE4YDk5ER1xOGWV5PRxpdH4TYj59dGVgHnA%2FY2FkYzRdVxkyFwZRE1kWChAFZRtaFAMTBFUTXRMyImEoKxB7AyIHZRteEQsUD10fWBAEEwJlHGtIVlNXDV0LSlRPQwsraw%3D%3D&t=W1dCFBBFC14NXAAECUteDA%3D%3D',
		 		'https://m.baidu.com/?from=1012150a',
		 		'http://tongji.51pgzs.com/51pgzs/appid/index.html'
		 	];
		$('input[name=from]').val('1012150a');
		for (var i = 0; i < links.length; i++) {
			$('.J-tmqid-' + links[i]).attr('href', urls[i]);
		}
	}
}();