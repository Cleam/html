/**
 * 气象头条js
 * @author created by lizhigao(lizhigao@021.com)
 * @date 2016-02-24
 */
Zepto(function(){
	var $videoCover = $('.J-video-cover');
	$videoCover.click(function(e) { e.preventDefault(); });
	$videoCover.on('tap mousedown', function(e){
		e.preventDefault();
		var $this = $(this),
			$video = $this.next(),
			video = $video[0];
		$this.hide();
		$video.css({'width': '100%', 'height': '100%'});

		// video.removeEventListener('pause', pause);
		// video.removeEventListener('play', play);
		// video.addEventListener('pause', pause);
		// video.addEventListener('play', play);
		video.play();
	});

	// function pause($t){
	// 	alert('pause!!!');
	// }

	// function play(){
	// 	alert('play!!!');
	// }
	
	var $popWin = $('.pop-win'),
		$swiperWrap = $popWin.find('.swiper-wrapper'),
		mySwiper = null;
	$('.J-pic-scan').on('tap', function(e){
		e.preventDefault();
		var $this = $(this),
			$imgs = $this.parent().children('.J-pic-scan').children('img'),
			index = $this.index();

		$swiperWrap.empty();
		mySwiper = null;
		$imgs.each(function(i, ele){
			$swiperWrap.append('<div class="swiper-slide"><img src="' + $(ele).attr('src') + '"></div>');
		});
		$popWin.fadeIn('fast');
		$popWin.on('click', function(e){
			e.preventDefault();
			$popWin.fadeOut('fast');
		});
		// if(!mySwiper){
           	mySwiper = new Swiper ('.swiper-container', {
				pagination: '.swiper-pagination',
				initialSlide: index
			});
        // } else {
            // mySwiper.slideTo(index + 1, 10, false);//切换到第一个slide，速度为10ms
        // }
	});

	 /* （图片浏览）弹窗 start */
    // (function(){
    //     var $imgIntroList = $('#J_img_intro_list'),
    //         $imgItem = $imgIntroList.find('a'),
    //         $mask = $('#J_bg_mask'),
    //         $popWin = $('#J_pop_win'),
    //         $popBody = $popWin.children('.pop-win-body'),
    //         mySwiper;

    //     $imgItem.on('click', function(){
    //         $('html,body').addClass('ovfHiden');
    //         $('#J_top_home_wrap').css({display:"none"});
    //         var index = $(this).parent().index() + 1;
    //         $mask.fadeIn();
    //         $popWin.fadeIn();
    //         if(!mySwiper){
    //             mySwiper=$('#J_swipe .swiper-container').swiper({
    //                 loop: true,
    //                 initialSlide: index - 1,
    //                 pagination : '.swiper-pagination'
    //             });
    //         } else {
    //             mySwiper.slideTo(index, 10, false);//切换到第一个slide，速度为10ms
    //         }
    //         $popBody.on('click', function(){
    //             $popWin.fadeOut();
    //             $mask.fadeOut();
    //             $('html,body').removeClass('ovfHiden');
    //             $('#J_top_home_wrap').css({display:"block"});
    //         });
    //     });
    // })();
    /* 弹窗 end */

	

});








