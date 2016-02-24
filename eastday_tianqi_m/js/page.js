/**
 * 气象头条js
 * @author created by lizhigao(lizhigao@021.com)
 * @date 2016-02-24
 */
Zepto(function(){
	var $videoCover = $('.J-video-cover'),
		video = null;
	$videoCover.on('click', function(e){
		e.preventDefault();
		var $this = $(this),
			$video = $this.next();
		video = $video[0];
		$this.hide();
		$video.css({'width': '100%', 'height': '100%', 'visibility': 'visible'});
		video.play();
	});

	
	var $popWin = $('.pop-win'),
		$swiperWrap = $popWin.find('.swiper-wrapper'),
		mySwiper = null;
	$('.J-pic-scan').on('click', function(e){
		e.preventDefault();
		var $this = $(this),
			$imgs = $this.parent().children('.J-pic-scan').children('img'),
			index = $this.index();
		$swiperWrap.html('');
		$imgs.each(function(i, ele){
			$swiperWrap.append('<div class="swiper-slide"><img src="' + $(ele).attr('src') + '"></div>');
		});
		video && video.pause();
		$popWin.fadeIn('fast');
		$popWin.on('click', function(e){
			e.preventDefault();
			$popWin.fadeOut('fast');
		});
       	mySwiper = new Swiper ('.swiper-container', {
			initialSlide: index
		});
	});

});

