$(document).ready(function () {
//判断是否有音频
if($(".listen img").attr("data-audio")==""||$(".listen img").attr("data-audio")=="http://listen.eastday.com//media/auto/"||$(".listen img").attr("data-audio")=="http://listen.eastday.com/media/auto/"){$('.listen').remove(); $('#music').remove(); }
//点击播放
$(".listen img").click(function(){
if($(this).attr("src")=="http://listen.eastday.com/images/css_20160429/yp.png"){$(this).attr("src","http://listen.eastday.com/images/css_20160429/ypzt.png");}else{$(this).attr("src","http://listen.eastday.com/images/css_20160429/yp.png");}
mp3=$(this).attr("data-audio");
if($("#music").attr("src")==""){$("#music").attr("src",mp3);}else if(mp3!=$("#music").attr("src")){$("#music").attr("src",mp3);}
Media = document.getElementById("music");
if(Media.paused){Media.play();Media.addEventListener('ended', function () { $(".listen img").attr("src","http://listen.eastday.com/images/css_20160429/yp.png");}, false);}else{Media.pause();}

});
});