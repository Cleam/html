/**
 * 气象头条js
 * @author created by lizhigao(lizhigao@021.com)
 * @date 2016-02-24
 */
Zepto(function(){
	/* 视频播放功能实现 */
	var $videoCover = $('.J-video-cover'),
		video = null;
	$videoCover.on('click', function(e){
		e.preventDefault();
		video && video.pause();
		var $this = $(this),
			$video = $this.next();
		video = $video[0];
		$this.hide();
		$video.css({'width': '100%', 'height': '100%', 'visibility': 'visible'});
		video.play();
	});

	/* video暂停事件 */
	$('.J-video').each(function(i, ele){
		ele.addEventListener('pause', function(){
			var $v = $(this),
				$cover = $v.prev();
			$cover.show();
			$v.css({'width': '1px', 'height': '1px', 'visibility': 'hidden'});
		});
	});
	
	/* 图片浏览功能实现 */
	var $popWin = $('.pop-win'),
		$swiperWrap = $popWin.find('.swiper-wrapper'),
		popWinHasClickEvent = false,
		mySwiper = null;
	$('.J-pic-scan').on('click', function(e){
		e.preventDefault();
		var $this = $(this),
			$imgs = $this.parent().children('.J-pic-scan').children('img'),
			index = $this.index();
		$swiperWrap.html('');
		$imgs.each(function(i, ele){
			$swiperWrap.append('<div class="swiper-slide"><div class="img-wrap"><img src="' + $(ele).attr('src') + '"></div></div>');
		});
		$('body').addClass('ofhidden');
		$popWin.show();
		video && video.pause();
		if(!popWinHasClickEvent){
			$popWin.on('click', function(e){
				e.preventDefault();
				$popWin.hide();
				$('body').removeClass('ofhidden');
			});
			popWinHasClickEvent = true;
		}
		if(!mySwiper){
			mySwiper = new Swiper ('.swiper-container', {
				initialSlide: index
			});
		} else {
			mySwiper.update();
			mySwiper.slideTo(index, 0, false);//切换到第一个slide，速度为10ms
		}
	});

});

