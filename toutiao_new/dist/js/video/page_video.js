FastClick.attach(document.body),$(function(){function t(){o=$('<div id="J_gg_video" class="gg-video"><div class="gg"></div><a id="J_gg_close_video" class="gg-close-video">关闭广告</a></div>'),o.appendTo(n.parents(".video-wrap")),i=o.find("#J_gg_close_video")}function e(){var t=document.createElement("div"),e=document.createElement("script"),a=document.createElement("script"),i="u2643659";t.id="bdUserDefInlay_"+i,e.type="text/javascript",e.innerHTML='var cpro_id = "'+i+'";',a.type="text/javascript",a.src="http://cpro.baidustatic.com/cpro/ui/cm.js",o.children(".gg").append(t).append(e).append(a)}function a(){this.qid=GLOBAL.Util.getQueryString("qid")||Cookies.get("qid")||"",this.userId="",this.osType=GLOBAL.Util.getOsType(),this.browserType=GLOBAL.Util.getBrowserType(),this.init()}var i=null,o=null,n=$("#J_video"),r="http://toutiao.eastday.com/getwapdata/getuid",d="http://toutiao.eastday.com/getwapdata/data",s="http://toutiao.eastday.com/getwapdata/videoact",l="http://toutiao.eastday.com/pjson/morevideos",p="http://ot.dftoutiao.com/online/online",u=10;a.prototype.init=function(){var a=this;a.qid?a._setQid(a.qid):Cookies.remove("qid",{path:"/",domain:"eastday.com"}),a.userId=a._getUid(),a.userId||a._setUid(),a.addVideoListener(),a.getVideoList(),a._addLog(),a._addOnlineLog(),setInterval(function(){a._addOnlineLog()},1e3*u),"wnwifishipin"!==a.qid&&(t(),e(),i.on("click",function(){a.hideGg()}))},a.prototype.getVideoList=function(t){var e=this;$.ajax({url:l,data:{type:$("#J_video").attr("data-type"),num:"10",qid:e.qid,recgid:e.userId,url:GLOBAL.Util.getUrlNoParams()},dataType:"jsonp",jsonp:"jsonpcallback",timeout:8e3,beforeSend:function(){},success:function(t){e.generateVideoList(t)},error:function(t){console.error(t)},complete:function(){t&&t()}})},a.prototype.generateVideoList=function(t){var e=this,a=t.data?t.data:null,i=a?a.length:0,o=$("#J_related"),n=$('<div class="related-cnt"></div>');if(i>0){o.append('<div class="related-tit"><h2>相关视频</h2></div>');for(var r=0;i>r;r++){var d=a[r],s=d.miniimg_01,l=s[0],p=r+1,u=GLOBAL.Util.getUrlNoParams(),c=d.url+"?qid="+e.qid+"&idx="+p+"&fr="+u,g=d.type,y=d.topic,m=d.source,h=l.src,f=l.imgwidth,v=l.imgheight,w=GLOBAL.Util.msToTimestr(d.videoalltime);n.append('<section class="news-item news-item-video"><a data-type="'+g+'" data-subtype="" href="'+c+'"><div class="news-wrap clearfix"><div class="txt-wrap fl"><h3>'+y+'</h3> <p><em class="fl">'+m+'</em></p></div><div class="img-wrap fr"><img class="lazy" src="'+h+'" alt="" data-width="'+f+'" data-height="'+v+'"><span class="duration">'+w+"</span></div></div></a></section>")}}n.appendTo(o)},a.prototype.sendVideoLog=function(t){t&&$.ajax({url:s,data:{param:encodeURIComponent(t)},dataType:"jsonp",jsonp:"jsonpcallback",success:function(){},error:function(){}})},a.prototype.addVideoListener=function(){var t=this;n.on("playing",function(e){try{var a=$(e.target),o=a[0],n=o.currentSrc,r=o.duration?Math.floor(1e3*o.duration):a.attr("data-duration"),d=a.attr("data-idx"),s=a.attr("data-type"),l=a.attr("data-playingTime")?a.attr("data-playingTime"):"null",p=Math.floor(1e3*o.currentTime),u=t.qid+"	"+t.userId+"	news	eastday_wapnews	null	"+(s||"null")+"	"+t.osType+"	"+(d||"null")+"	"+t.browserType+"	"+n+"	"+r+"	"+l+"	"+p+"	play";a.attr("data-updateTime",+new Date),t.sendVideoLog(u)}catch(c){console.log("Event playing has error!!!",c)}i&&i.trigger("click")}),n.on("pause",function(e){n[0].paused&&t.showGg();try{var a=$(e.target),i=a[0],o=i.currentSrc,r=i.duration?Math.floor(1e3*i.duration):a.attr("data-duration"),d=a.attr("data-idx"),s=a.attr("data-type"),l=a.attr("data-playingTime")?a.attr("data-playingTime"):"null",p=Math.floor(1e3*i.currentTime),u=t.qid+"	"+t.userId+"	news	eastday_wapnews	null	"+s+"	"+t.osType+"	"+(d||"null")+"	"+t.browserType+"	"+o+"	"+r+"	"+l+"	"+p+"	pause";t.sendVideoLog(u)}catch(c){console.log("Event pause has error!!!",c)}}),n.on("timeupdate",function(t){try{var e=$(t.target),a=e[0],i=(a.duration,a.currentTime,parseInt(e.attr("data-updateTime"),10)||+new Date),o=parseInt(e.attr("data-playingTime"),10)||0,n=+new Date;o=o+n-i,e.attr("data-playingTime",o),e.attr("data-updateTime",n)}catch(r){console.log("Event timeupdate has error!!!",r)}})},a.prototype.showGg=function(){o&&(o.show(),n.css({width:1,height:1}))},a.prototype.hideGg=function(){o&&(o.hide(),n.css({width:"100%",height:"100%"}))},a.prototype._addLog=function(){var t=GLOBAL.Util.getPixel(),e=this;$.ajax({url:d,data:{qid:e.qid||"null",uid:e.userId||"null",softtype:"news",softname:"eastday_wapnews",newstype:$("#J_video").attr("data-type")||"null",from:GLOBAL.Util.getQueryString("fr")||"null",to:GLOBAL.Util.getUrlNoParams()||"null",os_type:e.osType||"null",browser_type:e.browserType||"null",pixel:t.w+"*"+t.h,fr_url:GLOBAL.Util.getReferrer()||"null",loginid:"null",ime:"null",idx:GLOBAL.Util.getQueryString("idx"),ishot:"null",ver:"null",appqid:"null",ttloginid:"null",apptypeid:"null",appver:"null",recommendtype:"null",ispush:"null"},dataType:"jsonp",jsonp:"jsonpcallback",success:function(){},error:function(){console.error(arguments)}})},a.prototype._addOnlineLog=function(){var t=this,e=GLOBAL.Util.getUrlNoParams()+"	"+t.userId+"	"+t.qid+"	null	null	null	"+($("#J_video").attr("data-type")||"null")+"	"+u+"	null	null	"+t.osType+"	null";$.ajax({url:p,data:{param:encodeURI(e)},dataType:"jsonp",jsonp:"jsonpcallback"})},a.prototype._setQid=function(t){t&&Cookies.set("qid",t,{expires:3,path:"/",domain:"eastday.com"})},a.prototype._getQid=function(){var t=Cookies.get("qid");return t?t:""},a.prototype._setUid=function(t){var e=this;t?(e.userId=t,Cookies.set("user_id",e.userId,{expires:365,path:"/",domain:"eastday.com"})):$.ajax({url:r,dataType:"jsonp",data:{softtype:"news",softname:"eastday_wapnews"},jsonp:"jsonpcallback",success:function(t){try{e.userId=t.uid,Cookies.set("user_id",e.userId,{expires:365,path:"/",domain:"eastday.com"})}catch(a){console.error(a)}},error:function(t){console.error(t)}})},a.prototype._getUid=function(){var t=Cookies.get("user_id");return t?t:""},new a});