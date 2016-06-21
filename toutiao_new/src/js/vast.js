/**
 * vast广告刷量
 * @deps global.js
 * @author  lizhigao(lizhigao@021.com)
 * @date　2016-06-21
 */
$(function(){
	// var xmlData = '<?xml version="1.0" encoding="UTF-8"?> <VAST version="3.0"> <Ad id="TA201606141517060090"> <InLine> <AdSystem>MixAdx</AdSystem> <AdTitle><![CDATA[MOB-上海-Display-standard]]></AdTitle> <Impression/> <Creatives> <Creative sequence="0"> <Linear> <Duration>00:00:15</Duration> <TrackingEvents> <Tracking event="start"><![CDATA[http://collector.maihehd.com/view?muid=49155a1728ce40358c8c1787e257877b&pos=101&tid=TA201606141517060090&reqid=14660610874776614&materialid=814&]]></Tracking> <Tracking event="complete"><![CDATA[http://collector.maihehd.com/complete?muid=49155a1728ce40358c8c1787e257877b&pos=101&tid=TA201606141517060090&reqid=14660610874776614&materialid=814&]]></Tracking> <Tracking event="start"><![CDATA[http://stats.ipinyou.com/stats/t.gif?p=QWfsh_zLIin5.rsh.n7A.ex6.y5x.bKxD.N0i_.W.Ma&s=tWz4TLALOkxKk1UlnyS5v0&w=CKFlJmKiInTapBlBUKAbycrEp0ujz1PvBraXw_&d=kAdSQAcEd9j7gsz4uFSYN699-NCiYd56uDfC8Dk3YvberQ8j7DboWJSZp6zGPhly6s50GAR7VNs85BpcBjdbuKN_bvTRmVsgYPKFxkBH_6qnsGq8IjNC45bYWlSNLdmgerdgqezhlI5YFMMfU11Iokn]]></Tracking> </TrackingEvents> <VideoClicks> <ClickThrough><![CDATA[http://stats.ipinyou.com/stats/click?p=QWfsh_zLIVn5.rsh.n7A.ex6.y5x.bKxD.N0i_.W.kAdSQAcEd9l7gsz4uFSYN699-NCiYd56uDaC8Dk3YvberQ8j7DboWJSZp6zGPhly6s50GAR7VNs85BpcBjdbuKN_bvTRmVsgYPKFxkBH_6qnsGq8IjNC4eTjK6KtOZqQH12xZSq4gv84Pmn6aDMKo1anJucHU9bV-A9kW1qnsNNtzh9Jp1zG6umgsqKw_ZK_iOTiGe1YqI1Rwg1bwMjzX35RoZNIS9bVUAS19RMOW9xOisBOyXssZ5mlOq9J1dsmk1TBPx50GQdvFTBWtrFKNadRmTdT0m1dwYNFY51AhTTqnsFOKXN3H55kCT9FZmMm3L9hexdyGqsaqM1cg_mbX3RygymZ7Md8r1FZIuuZWqBZrG9bpSSX26KodqTkTm1Xk1Tve5SkBQ5o.Ma&s=bc3otDBXlke_Wiz9pM2_nP]]></ClickThrough> <ClickTracking><![CDATA[http://collector.maihehd.com/click?muid=49155a1728ce40358c8c1787e257877b&pos=101&tid=TA201606141517060090&reqid=14660610874776614&materialid=814&]]></ClickTracking> </VideoClicks> <MediaFiles> <MediaFile id="814" delivery="progressive" type="video/mp4" width="960" height="640" maintainAspectRatio="true"><![CDATA[http://wl.houyi.baofeng.net/media/img/houyi/customer/78/dspUser_yingyan_0203112244.cdn.zip?m=b0f11f2aaf940bb5b750c6d8088ed12e&video=http://p2pmidzj.baofeng.com/p2pmidnew/78/39434.mp4]]></MediaFile> </MediaFiles> </Linear> </Creative> </Creatives> <Extensions> <Extension> <BackupAdList> <Ad id="TA201606141522220096"> <InLine> <AdSystem>MixAdx</AdSystem> <AdTitle><![CDATA[MOB-上海-Display-旅行]]></AdTitle> <Impression/> <Creatives> <Creative sequence="0"> <Linear> <Duration>00:00:15</Duration> <TrackingEvents> <Tracking event="start"><![CDATA[http://collector.maihehd.com/view?muid=49155a1728ce40358c8c1787e257877b&pos=101&tid=TA201606141522220096&reqid=14660610874776614&materialid=820&]]></Tracking> <Tracking event="complete"><![CDATA[http://collector.maihehd.com/complete?muid=49155a1728ce40358c8c1787e257877b&pos=101&tid=TA201606141522220096&reqid=14660610874776614&materialid=820&]]></Tracking> <Tracking event="start"><![CDATA[http://stats.ipinyou.com/stats/t.gif?p=QWfsh_zLIin5.rsh.n7A.ex6.y5x.5AxD.o0i_.W.Ma&s=dYTSbo4vVj0zz7uG73_GzX&w=CKFlJmKiInTapBlBUKAbycrEp0ujz1PvBraXw_&d=kAdSQAcEd9j7gsz4uFSYN699-NCiYd56uDfC8Dk3YvberQ8j7DboWJSZp6lGPhly6s50GAR7VNs85BpcBjdbuKN_bvTRmVsgYPKFxkBH_6qnsGq8IjNC45bYWlSNLdmgerdgqezhlI5YFMMfU11Iokn]]></Tracking> </TrackingEvents> <VideoClicks> <ClickThrough><![CDATA[http://stats.ipinyou.com/stats/click?p=QWfsh_zLIVn5.rsh.n7A.ex6.y5x.5AxD.o0i_.W.kAdSQAcEd9l7gsz4uFSYN699-NCiYd56uDaC8Dk3YvberQ8j7DboWJSZp6lGPhly6s50GAR7VNs85BpcBjdbuKN_bvTRmVsgYPKFxkBH_6qnsGq8IjNC4eTjK6KtOZqQH12xZSq4gv84Pmn6aDMKo1anJucHU9bV-A9kW1qnsNNtzh9Jp1zG6umgsqKw_ZK_iOTiGe1YqI1Rwg1bwMjzX35RoZNIS9bVUAS19RMOW9xOisBOyXssZ5mlOq9J1dsmk1TB36TJXNqSPQL_UJMIupMzmIuIShchvPmj9uu3fIxgKds2sFp32psQZTu2LOTg10Kjey5vMcKDgbpBBLT1jFaiXINTSb5frS1dyxp2sp8l4-x5AAxeVy5XV2SnPM1JDSFgqndoXTl.Ma&s=bhozk7aZ_BDVYvdDiLsb_0]]></ClickThrough> <ClickTracking><![CDATA[http://collector.maihehd.com/click?muid=49155a1728ce40358c8c1787e257877b&pos=101&tid=TA201606141522220096&reqid=14660610874776614&materialid=820&]]></ClickTracking> </VideoClicks> <MediaFiles> <MediaFile id="820" delivery="progressive" type="video/mp4" width="960" height="640" maintainAspectRatio="true"><![CDATA[http://wl.houyi.baofeng.net/media/img/houyi/customer/78/dspUser_yingyan_0203112244.cdn.zip?m=b0f11f2aaf940bb5b750c6d8088ed12e&video=http://p2pmidzj.baofeng.com/p2pmidnew/78/39434.mp4]]></MediaFile> </MediaFiles> </Linear> </Creative> </Creatives> </InLine> </Ad> </BackupAdList> </Extension> </Extensions> </InLine> </Ad> </VAST>';
	/**
	 * 创建一个Vast的对象
	 */
	function Vast(){
		this.URL = 'http://delivery.maihehd.com/d/vast/3.0?pos=100';
		this.LOG_URL = 'http://vastlog.dfshurufa.com/vast/brush';
		this.PROBABILITY = 0.01;		// probability 点击概率 1%
		this.TOTAL = 100;
		this.randomArr = [];
		this.random = Math.floor(this.TOTAL * Math.random());
		this.init();
	}

	/**
	 * 完善原型方法
	 */
	Vast.prototype = {
		/**
		 * 初始化
		 */
		init: function() {
			var scope = this,
				i = 0,
				random = 0;
			for (i = 0; i < scope.TOTAL; i++) {
				scope.randomArr[i] = false;
			}
			for (i = 0; i < scope.PROBABILITY * scope.TOTAL; i++) {
				random = Math.floor(scope.TOTAL * Math.random());
				scope.randomArr[random] = true;
			}

			scope.getXml();
		},

		/**
		 * 获取adv信息
		 * @return {[type]} [description]
		 */
		getXml: function() {
			var scope = this;
			$.ajax({
				url: scope.URL,
				type: 'GET',
				dataType: 'xml',
				success: function(doc, state, xml){
					if(state !== 'success'){
						return;
					}
					var adArr = scope.getXmlInfo(scope.resolveXml(xml.responseText));
					// console.log('adArr::', adArr);
					scope.resolveData(adArr, 0);
				}
			});
			// var adArr = scope.getXmlInfo(scope.resolveXml(xmlData));
			// // console.log('adArr::', adArr);
			// scope.resolveData(adArr, 0);
		},

		/**
		 * xml解析(将xml字符创转换成可操作的xml文档对象)
		 * @param  {[type]} xmlString xml字符串
		 * @return {[type]}           xml文档对象
		 */
		resolveXml: function(xmlString){
	        var xmlDoc=null;
	        //判断浏览器的类型
	        //支持IE浏览器 
	        if(!window.DOMParser && window.ActiveXObject){   //window.DOMParser 判断是否是非ie浏览器
	            var xmlDomVersions = ['MSXML.2.DOMDocument.6.0','MSXML.2.DOMDocument.3.0','Microsoft.XMLDOM'];
	            for(var i=0;i<xmlDomVersions.length;i++){
	                try{
	                    xmlDoc = new ActiveXObject(xmlDomVersions[i]);
	                    xmlDoc.async = false;
	                    xmlDoc.loadXML(xmlString); //loadXML方法载入xml字符串
	                    break;
	                }catch(e){}
	            }
	        }
	        //支持Mozilla浏览器
	        else if(window.DOMParser && document.implementation && document.implementation.createDocument){
	            try{
	                /* DOMParser 对象解析 XML 文本并返回一个 XML Document 对象。
	                 * 要使用 DOMParser，使用不带参数的构造函数来实例化它，然后调用其 parseFromString() 方法
	                 * parseFromString(text, contentType) 参数text:要解析的 XML 标记 参数contentType文本的内容类型
	                 * 可能是 "text/xml" 、"application/xml" 或 "application/xhtml+xml" 中的一个。注意，不支持 "text/html"。
	                 */
	                domParser = new DOMParser();
	                xmlDoc = domParser.parseFromString(xmlString, 'text/xml');
	            }catch(e){}
	        }
	        else{
	            return null;
	        }
	        return xmlDoc;
	    },

	    /**
	     * 处理xml信息
	     * @param  {[type]} xmlDoc xml文档对象
	     * @return {[type]}        处理后的ad数组
	     */
		getXmlInfo: function(xmlDoc){
			var scope = this,
				adArr = [];
			// console.log('xmlDoc::', xmlDoc);
			if(!xmlDoc){
				return;
			}
			// console.log('xmlStr::\n', xmlStr);
			var ads = xmlDoc.getElementsByTagName('Ad'),
				adLen = ads.length,
				i = 0;
			if(!ads || adLen === 0){
				return;
			}
			for (i = 0; i < adLen; i++) {
				var ad = ads[i],
					adId = ad.getAttribute('id'),
					// duration = ad.getElementsByTagName('Duration')[0].firstChild.nodeValue,
					duration = ad.getElementsByTagName('Duration')[0].innerHTML,
					trackingEvents = ad.getElementsByTagName('TrackingEvents')[0],
					tracking = trackingEvents.getElementsByTagName('Tracking'),
					len = tracking.length,
					startTracking = [],
					completeTracking = [],
					clkTime = 0,
					videoClicks = ad.getElementsByTagName('VideoClicks')[0],
					clickTracking = videoClicks.getElementsByTagName('ClickTracking')[0];
				duration = scope.strToTime(duration);
				clkTime  = Math.floor((duration - 1) * Math.random() + 1);
				for (i = 0; i < len; i++) {
					var track = tracking[i];
					if(track.getAttribute('event') === 'start'){
						startTracking.push(track);
					} else if(track.getAttribute('event') === 'complete'){
						completeTracking.push(track);
					}
				}

				adArr.push({
					adId: adId,
					duration: duration,
					clkTime: clkTime,
					startTracking: startTracking,
					completeTracking: completeTracking,
					clickTracking: clickTracking
				});
			}
			return adArr;
		},

		/**
		 * 处理数据信息
		 * @param  {[type]} adArr 广告信息
		 */
		resolveData: function(adArr, index){
			if(!adArr || !(adArr instanceof Array) || index >= adArr.length){
				return;
			}
			var scope = this,
				ad = adArr[index],
				adId = ad.adId,
				duration = ad.duration,
				clkTime = ad.clkTime,
				startTracking = ad.startTracking,
				completeTracking = ad.completeTracking,
				clickTracking = ad.clickTracking,
				i = 0;
			
			// 调用start event接口
			for (i = 0; i < startTracking.length; i++) {
				var url = startTracking[i].innerHTML.replace(/<\!\[CDATA\[/, '').replace(/]]>/, '');
				// console.log('start-url::', url);
				scope.sendAjax({
					vastUrl: scope.URL,
					url: url,
					adId: adId,
					type: 'start',
					duration: duration
				});
			}

			// 调用click event接口（按一定概率触发点击事件）
			if(scope.randomArr[scope.random]){
				setTimeout(function(){
					var url = clickTracking.innerHTML.replace(/<\!\[CDATA\[/, '').replace(/]]>/, '');
					// console.log('click-url::', url);
					scope.sendAjax({
						vastUrl: scope.URL,
						url: url,
						adId: adId,
						type: 'click',
						duration: duration
					});
				}, clkTime * 1000);
			}

			// 调用complete event接口
			setTimeout(function(){
				for (i = 0; i < completeTracking.length; i++) {
					var url = completeTracking[i].innerHTML.replace(/<\!\[CDATA\[/, '').replace(/]]>/, '');
					// console.log('complete-url::', url);
					scope.sendAjax({
						vastUrl: scope.URL,
						url: url,
						adId: adId,
						type: 'complete',
						duration: duration
					});
				}
			}, duration * 1000);

			/**
			 * 执行完一个广告再执行下一个广告
			 * @param  {[type]} adArr    广告数组
			 * @param  {[type]} index    当前广告索引
			 * @param  {[type]} duration 当前广告执行时长
			 */
			(function(adArr, index, duration){
				setTimeout(function(){
					index = index + 1;
					scope.resolveData(adArr, index);
				}, duration * 1000);
			}(adArr, index, duration));
		},

		sendAjax: function(opt){
			// console.log('opt::', opt);
			var scope = this;
			if(!opt){
				return;
			}
			$.ajax({
				url: opt.url,
				type: 'GET',
				error: function() {  // 请求失败
					opt.status = 'fail';
					scope.sendLog(opt);
					// scope.sendLog(opt.vastUrl,opt.type,opt.url,opt.adId,'fail',opt.duration);
				},
				success : function() {
					opt.status = 'success';
					scope.sendLog(opt);
					// scope.sendLog(opt.vastUrl,opt.type,opt.url,opt.adId,'success',opt.duration);
				}
			});
		},

		/**
		 * 时间字符串转时间
		 * @param  {[type]} str 时间字符串（00:00:15）
		 * @return {[type]}     时间(单位：秒)
		 */
		strToTime: function(str){
			var arr = str.split(':'),
				hh = parseInt(arr[0], 10),
				mm = parseInt(arr[1], 10),
				ss = parseInt(arr[2], 10);
			return hh * 3600 + mm * 60 + ss;
			// if(hh === 0 && mm === 0){
			// 	return ss;
			// } else if(hh === 0){
			// 	return mm * 60 + ss;
			// } else {
			// 	return hh * 3600 + mm * 60 + ss;
			// }
		},

		/**
		 * 日志记录
		 * @param  {[type]} opt 日志部分参数
		 */
		sendLog: function(opt){
			var scope = this,
				qid = GLOBAL.Et.qid || Cookies.get('qid') || 'null',
		    	uid = GLOBAL.Et.uid || Cookies.get('user_id') || 'null',
				osType = GLOBAL.Util.getOsType(),
				browserType = GLOBAL.Util.getBrowserType(),
				currentUrl = window.location.href.split('?')[0],
				client ='',
				ua = navigator.userAgent,
				params = '';

			if(ua.indexOf('iPad') > -1) {
				client='iPad';
			} else if(ua.indexOf('Android') > -1 || ua.indexOf('Linux') > -1) {
				client='Android';
			} else if(GLOBAL.Os.ios) {
				client='iOS';
			}
			params = qid + '\t' + uid + '\t' + osType + '\t' + browserType + '\t' + currentUrl + '\t' + opt.vastUrl + '\t' + opt.adId + '\t' + opt.type + '\t' + opt.url + '\t' + opt.status + '\t' + opt.duration + '\t' + client;
			// console.log('>>>>>>>>>>>>>>>>>>>>>>params::', params);
			$.ajax({
				type: 'POST',
				url: scope.LOG_URL,
				dataType: 'jsonp',
				data: {
					"param": params
				},
				jsonp: 'jsonpcallback',
				success: function() {}
			});
		}


	};

	new Vast();
});
