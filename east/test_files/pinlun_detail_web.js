var questpath      = "http://222.73.244.168/WebInterface/"; 
var quest_img_path = "http://lyb.listen.eastday.com";

var pos = null;

function n_callback(p){
	// p.id      当前帖子的ID
	// p.result  true false
	// p.action  praise, step, auido, text
	if(p.result == true){
		//alert(idleaf);
		//alert(p.id);
		if(p.action == "praise"){
      		ding(p.id);
		}else if(p.action == "step"){
			cai(p.id);
		}else if(p.action == "reply"){
			comment(p.id);
		}
	}
}

function comment(id,lastid){
	var all = 0;
	if(lastid == undefined){
		lastid = 0;
	}
	if($('#comment_'+id+" .more").is(":hidden") == true && lastid == 0){
		all = 1;
	}
	$.ajax({
		url:'/wapindex/ajaxcomment',
		type:"GET",
		dataType:'HTML',
		data:({ancestor_id:id,lastid:lastid,all:all}),
		success:function(data){
			pos = $(window).scrollTop();
			$('#comment_'+id).html(data);
			if(lastid >0){
				$('#comment_'+id+" .more").hide();
				$('#comment_'+id+" .close").show();
			}
		}
	});
}

function closeit(id){
	var obj =$('#comment_'+id+" li:gt(4)");
	obj.remove();
	if(pos != null){
		$(window).scrollTop(pos);
		pos = 0;
	}
	$('#comment_'+id+" .close").hide();
	$('#comment_'+id+" .more").show();
}

function ding(id){
	var obj  = $("#dd_"+id);
	var ding = parseInt(obj.html());
	ding++;
	obj.html(ding);
	//obj.removeClass('ding');
	
}

function cai(id){
	var obj  = $("#cc_"+id);
	var cai  = parseInt(obj.html());
	
	cai++;
	obj.html(cai);
	//obj.removeClass('cai');
}

var audio = null;
var preid = 0;
function playaudio(id){

	if(audio){
		preid = audio.parentNode.id;
	}
	
	if(audio && preid != 0 && id == preid && audio.ended == false && audio.paused == false){
		audio.pause();
		//audio = null;
		$("#laba-"+id).hide();
		$("#laba2-"+id).show();
		return false;
	}else if(audio && id != preid){
		audio.pause();
		$("#laba-"+preid).hide();
		$("#laba2-"+preid).show();
	}
	
	var audiodiv = document.getElementById(id);
	
	audio = audiodiv.children;
	audio = audio[0];	
	
	
	audio.addEventListener('playing',function(){
		$("#laba2-"+id).hide();
		$("#laba-"+id).show();	
	});
	
	audio.addEventListener('ended',function(){
		$("#laba-"+id).hide();	
		$("#laba2-"+id).show();
	});
	
	
	if(type != '3'){
		window.location.href = "action://stopplay";	
	}
	
	//audio.load();
	audio.play();
}

GetCount = function (idleaf) {
   $.ajax({
         url: questpath + "praisenewsget.aspx?callback=changecount",
         type: "get",
         async: false,
         dataType: "jsonp",
         jsonp: "callback",
         jsonpCallback: "changecount",
         data: { "idleaf": idleaf}
      });
};

changecount = function (objResult) {
    if (objResult!=null) {
        $("#count_zan").text(decodeURI(objResult.data));
    }
}

AddCount = function (idleaf) {
    $.ajax({
        url: questpath + "praisenewsadd.aspx?callback=praisenewsadd",
        type: "get",
        async: false,
        dataType: "jsonp",
        jsonp: "callback",
        jsonpCallback: "praisenewsadd",
        data: { "idleaf": idleaf}
    });   
};

praisenewsadd = function (objResult) {
	if(objResult.data>0){
        var count =  $("#count_zan").text();
        $("#count_zan").text(parseInt(count) + 1);
   	}
}


function t_callback(p){
	if(p.result == true){
		if(p.action == "praise"){
		     var count =  $("#count_zan").text();
         $("#count_zan").text(parseInt(count) + 1);
		}else if(p.action == "step"){

		}else if(p.action == "reply"){

		}
	}
}


var num=1;
$(function () {	   
    //GetCount(web_idleaf);
    GetPL2(web_idleaf,num);
	
	$(window).on('scroll',function(){
					 var scrollTop = $(this).scrollTop()+1;
　　                  var scrollHeight = $(document).height();
　　                  var windowHeight = $(this).height();
　                  if(scrollTop + windowHeight >= scrollHeight){
　　　                   GetPL2(web_idleaf,num);
　　                    }
					 });
	
    
});
GetPL2 = function (idleaf,num) {
   $.ajax({
         url: "http://lyb.listen.eastday.com/wapindex/details?callback=SetPlHtml",
         async: false,
         dataType: "jsonp",
         jsonp: "callback",
         jsonpCallback: "SetPlHtml",
         data: { "zhuid": idleaf,"page": num,"type":"1","limit":"3"}
      });
 
};


SetPlHtml = function(objResult){
	 //if(is_pinglun!="0")
	if(1==1){
		/*new-begin*/
		 if (objResult==null){
		 $('#plmore').hide();
		  $('.pinglun2').hide();
		 $(window).off('scroll');
		 }
		/* else if(objResult.length==0){
			 $('#plmore').hide();
			 $(window).off('scroll');
			 }*/
			// console.log(objResult.length);
			
    
		/*new-end*/	   
    	if(objResult != null){
			
			var html_content = "";
            num++;
       		for(var i = 0;i < objResult.length;i++){
				if(i == 0){
					//html_content += '<div class="pinglun font14 white">评论</div>';
					//html_content += '<div class="main92">';
            		//html_content = html_content+"<h2>评 论</h2>";
				}
	   
       	    	var count_no = objResult[i].length-1;
       	    	var isaudiu  = objResult[i][count_no].Wapgentie.audio;     
            	var audiulen = objResult[i][count_no].Wapgentie.audiolengh;
            	var url_lyb  = objResult[i][count_no].Wapgentie.url;			
       	
            	var nowhtml  = "";
				var touxiang = objResult[i][count_no].Wapuser.photo;

				if(!((touxiang.toUpperCase().indexOf("HTTP:")==0)||
				    (touxiang.toUpperCase().indexOf("HTTPS:")==0))){
			   		touxiang = quest_img_path + touxiang;
				}
			
            	//nowhtml = nowhtml + "<section class=\"pl_2\"><div class=\"left\"><p><img src=\"" + touxiang +"\" class=\"yhpic\" /></p></div>";
				
				nowhtml += '<section class="font14">';
				nowhtml += '<div class="fl"><img src="'+touxiang+'" class="yhpic"></div>';
				
				var ip_str = objResult[i][count_no].Wapgentie.ip;
				var new_ip = "";
				/*
				if(ip_str){
			    	new_ip = "&nbsp;"+ip_str.split(".")[0]+"."+ip_str.split(".")[1]+"."+ip_str.split(".")[2]+"."+"*";
				}
				new_ip = "";
				*/
				var mingcheng = objResult[i][count_no].Wapuser.nickname+new_ip;
				
				if(mingcheng.length > 8){
			   		mingcheng = mingcheng.substring(0,8)+"...";
				}
				
				nowhtml += '<div class="fl font12">';
				nowhtml += '<h3>'+mingcheng+'</h3>';
				nowhtml += '<time>'+objResult[i][count_no].Wapgentie.adddate+'</time>';
				nowhtml += '</div>';
				
            	//nowhtml = nowhtml + "<div class=\"left\"><h3>"+mingcheng+"</h3>";
				//nowhtml = nowhtml + "<time>"+objResult[i][count_no].Wapgentie.adddate+"</time></div>";

				var plid = objResult[i][count_no].Wapgentie.id;
                var nr   = objResult[i][count_no].Wapgentie.content.text;
				
				nowhtml += '<div class="fr font12">';
				nowhtml += '<p class="ding font12 fl" id="d_'+objResult[i][count_no].Wapgentie.id+'"><span id="dd_'+objResult[i][count_no].Wapgentie.id+'">'+objResult[i][count_no].Wapgentie.ding+'</span></p>';
				nowhtml += '<p class="ping font12 fl" id="d_'+objResult[i][count_no].Wapgentie.id+'"><span id="dd_'+objResult[i][count_no].Wapgentie.id+'">'+objResult[i][count_no].Wapgentie.renum+'</span></p>';
				nowhtml += '</div>';
				nowhtml += '<div class="clear"></div>';
				
				//nowhtml = nowhtml +"<div class=\"right\"><p class=\"ding\" id=\"d_"+objResult[i][count_no].Wapgentie.id+"\"><img src=\"http://listen.eastday.com/images/css3q/zan.png\" /><span id=\"dd_"+objResult[i][count_no].Wapgentie.id+"\">"+objResult[i][count_no].Wapgentie.ding+"</span></p></div>";
				//nowhtml = nowhtml +"<div class=\"clear\"></div>";

				if(audiulen != "0"){
                	nowhtml = nowhtml + "<div class=\"yp\"><p onclick=\"playaudio('audio"+ plid +"');\">";
                 	nowhtml = nowhtml + "<image id=\"laba2-audio"+ plid +"\"  src=\"http://listen.eastday.com/images/laba2.png\"/>";
                 	nowhtml = nowhtml + "<image id=\"laba-audio"+ plid +"\" style=\"display:none\"  src=\"http://listen.eastday.com/images/laba.gif\"/><span>" + audiulen + "\"</span></div>";

                 	var mp3_audio = objResult[i][count_no].Wapgentie.content.audio;
				
            	 	nowhtml = nowhtml + "<div id=\"audio" + plid + "\" style=\"display:none;\">";
            	 	nowhtml = nowhtml + "<audio src=\""+ url_lyb + "/" + mp3_audio +"\" preload=\"metadata\"></audio></div>";
            	 	nowhtml = nowhtml + "<span style=\"display:none;\">"+ mp3_audio +"</span>";
				}else{
					if(!(objResult[i][count_no].Wapgentie.content.text=="" || 
						 objResult[i][count_no].Wapgentie.content.undefined=="")){
						nowhtml += '<div class="font12 grey3 plcontent">';
						nowhtml += '<p>'+nr+'</p>';
						nowhtml += '</div>';
			       		//nowhtml = nowhtml +"<div class=\"plcontent\"><p>"+nr+"</p></div>";
			   		}
			   		if(objResult[i][count_no].Wapgentie.content.pic!=undefined){
			       		nowhtml     = nowhtml +"<div id=\"sqtplist\"><ul>";
				   		var pics    = objResult[i][count_no].Wapgentie.content.pic;
				        var t       = Object.getOwnPropertyNames(pics).length-1;
				        var imghtml = "";
				   		for(var s in pics){
    				  		imghtml = "<li><img src=\"" + url_lyb +"/"+ pics[s] + "\" onclick=\"window.location='action://topic?url='+encodeURIComponent('" + quest_img_path + "/wapindex/imgsrc/" + plid + "')+'&amp;n='+" + (t+1) + "\"></li>" + imghtml;
				      		t--;
				   		}
			       		nowhtml = nowhtml + imghtml +"</ul></div>";
			   		}
				}
			
		    	//nowhtml = nowhtml +"</section>";
				nowhtml += '</section>';
				html_content = html_content + nowhtml;
       		}
			/*html_content = html_content+"<div id=\"plmore\" class=\'font12\'><div  class=\'font12\' onclick="+ pl_yrl_onclick +">查看更多评论，请点击</div></div><input id=\"type\"  type=\"hidden\" name=\"type\"  value=\"\"/><input id=\"page\"  type=\"hidden\" name=\"page\"  value=\"10\"/>";*/
			//html_content += '</div>';
			//html+content += '<div class="font26 blank1em"></div>';
			
       		//html_content = html_content+"<input id=\"page\" type=\"hidden\" name=\"page\" value=\"10\"/>";
       		//html_content = html_content+"<input id=\"type\"  type=\"hidden\" name=\"type\" value=\"\"/>";
			$("#plmore").remove();
			//water_content=$("#water").html();
			if(html_content!=""){
			$("#water").append(html_content+"<div id=\"plmore\" class=\"font12\"><div  class=\"font12\">查看更多评论，请点击</div></div>");}
		  $('#plmore').on('click',function(){
		    GetPL2(web_idleaf,num);
		});
       
       	
     	}
	
  	}
		
}
