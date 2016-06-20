/*Android端*/
var android_url_01 = '';
var android_complete1 = new Array();//广告完成链接数组
var android_click1 = new Array();//广告点击链接数组
var android_start1 = new Array();//广告开始连接数组
var android_ads1 = new Array();
var android_adId1;
var android_duration1;
var android_odds1 =0.99; //点击率  （1-odds）;

$(document).ready(function(){

	var xmlHttpReqReq = getXmlHttpRequest(); 
	
	var os =getosType();
	if(os.indexOf('iOS')>=0){ //ios系统
//		android_url_01 = 'http://delivery.maihehd.com/d/vast/3.0?pos=94&tid=TA201606140947350073';
	}else if(os.indexOf('Android')>=0){ //Android系统
		android_url_01 = 'http://delivery.maihehd.com/d/vast/3.0?pos=101';
		android_ads1 = parseXML(android_url_01,xmlHttpReqReq);
	}else if(os.indexOf('iPad')>=0){//ipad端
//		android_url_01 = 'http://delivery.maihehd.com/d/vast/3.0?pos=94&tid=TA201606141305130074';
	}
	
	
	
	if(android_ads1.length>0){ 
		loopAd1(android_ads1,0,android_odds1);
	}
	
});

//创建XMLHttpRequest对象
 function getXmlHttpRequest(){
 	var xmlHttpReqReq; 
 	if(window.XMLHttpRequest) {// code for IE7+, Firefox, Chrome, Opera, Safari
		xmlHttpReqReq = new XMLHttpRequest();
		//针对某些特定版本的mozillar浏览器的bug进行修正。
		if (xmlHttpReqReq.overrideMimeType) {
			xmlHttpReqReq.overrideMimeType('text/xml');
		};
	} else {// code for IE6, IE5
		xmlHttpReqReq = new ActiveXObject("Microsoft.xmlHttpReq");
	}
	return xmlHttpReqReq;
 }


//解析vast 获取访问链接，返回数组对象
function parseXML(vast_url,xmlHttpReqReq){
	var xmlDoc;
	var ele_ad;
	var adArr = new Array();
	
	xmlHttpReqReq.open("GET",vast_url,false);
	xmlHttpReqReq.send();
	xmlDoc=xmlHttpReqReq.responseXML;
	
//	console.log(xmlDoc);
	
	//删除Extensions节点， Extensions节点下的Ad不需要获取
	var extensions = xmlDoc.getElementsByTagName("Extensions");
	if(extensions.length > 0 ){  
		for(var i = 0;i<extensions.length;i++){
			extensions[i].parentNode.removeChild(extensions[i]);
		}
	}
	//获取Ad节点
	ele_ad = xmlDoc.getElementsByTagName('Ad');
	
	if(ele_ad!=null && ele_ad.length>0){
		for(var i=0;i<ele_ad.length;i++){
			var ad_option = {};
			
			//获取Ad id
			var id_str = ele_ad[i].getAttribute('id');
			ad_option['id']=id_str;
			
			var ad_inline = ele_ad[i].getElementsByTagName('InLine');
			if(ad_inline != null){
				var inline_creatives = ad_inline[0].getElementsByTagName('Creatives');
				if(inline_creatives !=null){
					var creatives_creative =  inline_creatives[0].getElementsByTagName('Creative');
					if(creatives_creative!=null){
						var creative_linear = creatives_creative[0].getElementsByTagName('Linear');
						if(creative_linear!=null){
							var linear_duration = creative_linear[0].getElementsByTagName('Duration');
							var linear_trackingevents = creative_linear[0].getElementsByTagName('TrackingEvents');
							var linear_videoclicks = creative_linear[0].getElementsByTagName('VideoClicks');
							// 获取广告持续时间
							if(linear_duration!=null){
								var duration = linear_duration[0]
								ad_option['duration'] = duration.innerHTML;
							}
							
							//获取广告开始和结束时访问的连接地址  
							if(linear_trackingevents!=null){
								var trackingevents_tracking = linear_trackingevents[0].getElementsByTagName('Tracking');
								if(trackingevents_tracking!=null){
									var startObj = new Array();
									var completeObj = new Array();
									var s_idx =0;
									var c_idx =0;
									for(var j=0;j<trackingevents_tracking.length;j++){
										var tracking = trackingevents_tracking[j];
										var tracking_attr = tracking.getAttribute('event');
										
										var tracking_inner = tracking.innerHTML;
										tracking_inner = tracking_inner.replace('<![CDATA[','').replace(']]>','');
										
										if(tracking_attr=='start'){
											startObj[s_idx] =tracking_inner;
											s_idx++;
										}else if(tracking_attr ='complete'){
											completeObj[c_idx] =tracking_inner;
											c_idx++;
										}
									}
									ad_option['start'] =startObj;
									ad_option['complete'] = completeObj;
								}
							}
							//获取广告点击时访问的链接地址
							if(linear_videoclicks!=null){
								videoclicks_clicktracking = linear_videoclicks[0].getElementsByTagName('ClickTracking');
								if(videoclicks_clicktracking!=null){
									var clicktracking = videoclicks_clicktracking[0].innerHTML;
									clicktracking = clicktracking.replace('<![CDATA[','').replace(']]>','');
									var clickObj = new Array();
									clickObj[0] = clicktracking
									ad_option['click'] = clickObj;
								}
							}
							
						}
					}
				}
			}	
			adArr[i] = ad_option;
		}
	}
	return adArr;
}


function getAjax(type,urlObj,adId,vast_url,duration){
	if(urlObj.length>0){
		for(var i=0;i<urlObj.length;i++){
			var url = urlObj[i];
			var num = i;
			geturl(type,num,url,adId,vast_url,duration);
		}
	}
}


function geturl(type,num,url,adId,vast_url,duration){
	$.ajax({
		type : 'GET',
		url : url,
		error: function(msg) {  // 请求失败
			putlog(vast_url,type,url,adId,'fail',duration);
		} ,
		success : function(msg) {
			putlog(vast_url,type,url,adId,'success',duration);
		}
	});
}

//递归请求Ad adArr:广告数组；idx：ad计数；odds:点击几率
function loopAd1(adArr,idx1,odds){
	if(idx1<adArr.length){
		var ad = adArr[idx1];
		var time = ad.duration;
		android_start1 = ad.start;
		android_complete1 = ad.complete;
		android_click1 = ad.click;
		android_adId1=ad.id;
		android_duration1 = time;
		var timeArr = time.split(':');
		var sec = parseInt(timeArr[0])*60*60 +parseInt(timeArr[1])*60 + parseInt(timeArr[2]);
		if(sec==0){
			sec = 15;
		}
		var randNum = parseInt(1+Math.random()*sec);
		var randClk = Math.random();
		getAjax('start',android_start1,android_adId1,android_url_01,android_duration1);//广告开始播放，多个Tracking start要一起执行。
		
		if(randClk>=odds){
			setTimeout("getAjax('click',android_click1,android_adId1,android_url_01,android_duration1)",1000*randNum);//请求点击广告的链接
		}else{
//			console.log('----------------------------------noclikc!');
		}
		//广告播放完成 请求广告播放完成链接
		setTimeout("getAjax('complete',android_complete1,android_adId1,android_url_01,android_duration1)",sec*1000);
		setTimeout('loopAd1(android_ads1,'+(idx1+1)+',android_odds1)',(sec+1)*1000);
	}
}

//记录日志
function putlog(vast_url,excutType,excutUrl,excutAdid,result,duration){
	/*excutType:start,click,complete*/
	var qid = $.cookie('qid') || 'null';
    var uid = $.cookie('user_id') || 'null';
	var ostype = getosType();
	var browser_type = checkBrowserType();
	var current_url=window.location.href;
	var client ='';
	if(ostype.indexOf('iOS')>=0){
		client='iOS';
	}else if(ostype.indexOf('Android')>=0){
		client='Android';
	}else if(ostype.indexOf('iPad')>=0){
		client='iPad';
	}
	
	
	var idx = current_url.indexOf('?');
	if(idx>0){
		current_url=current_url.substring(0,idx);
	}
		
	var log_str = qid+'\t'+uid+'\t'+ostype+'\t'+browser_type+'\t'+current_url+'\t'+vast_url+'\t'+excutAdid+'\t'+excutType+'\t'+excutUrl+'\t'+result+'\t'+duration+'\t'+client;
//	console.log('>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>log:::::'+log_str);
	
	$.ajax({
		type : 'POST',
		url : 'http://vastlog.dfshurufa.com/vast/brush',
		dataType : 'jsonp',
		data : {
			"param" : log_str
		},
		jsonp : 'jsonpcallback',
		success : function(msg) {
			
		}
	});
	
	
}

// OS的判断
function getosType() {
	var agent = navigator.userAgent.toLowerCase();
    var os = "";
	if (/android/i.test(navigator.userAgent)) {
		var index = agent.indexOf("android");
		version = agent.substr(index+8,3);
		os = "Android "+version;
	}
	if (/(iPhone|iPod|iOS)/i.test(navigator.userAgent)) {
		var index = agent.indexOf("os");
		version = agent.substr(index+3,3);
		os = "iOS "+version;
	}
	
	if (/(iPad)/i.test(navigator.userAgent)) {
		var index = agent.indexOf("ipad");
		version = agent.substr(index+13,3);
		os = "iPad "+version;
	}
	
	if (/Linux/i.test(navigator.userAgent)
			&& !/android/i.test(navigator.userAgent)
			&& !/(iPhone|iPad|iPod|iOS)/i.test(navigator.userAgent)) {
		os = "Linux";
	}
	if(/windows|win32/i.test(navigator.userAgent)){
		os = "windows32";
	}
	if(/windows|win32/i.test(navigator.userAgent)){
		os = "windows64";
	}
	return os;
}
