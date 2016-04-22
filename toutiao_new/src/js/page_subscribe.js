/*
 * 频道管理页js
 */
$(function(){
	FastClick.attach(document.body);
	
	var $upList = $('#J_up_list'),
		$downList = $('#J_down_list'),
		wsCache = new WebStorageCache();	// 本地存储对象
	/**
	 * 新闻频道对象
	 */
	function Channels(){
		this.init();
	}
	
	Channels.prototype = {
		init: function(){
			var scope = this;

			/* 删除频道  */
			$upList.on('click', 'a', function(){
				var $this = $(this),
					type = $this.data('type'),
					txt = $this.text();
				if($this.hasClass('disable')){return;}
				$this.parent().remove();
				$downList.append('<li class="down-item"><a data-type="' + type + '">' + txt + '</a></li>');
				scope.updateMyChannels();
				wsCache.set('custom_channels', 1);
			});
			
			/* 添加频道  */
			$downList.on('click', 'a', function(){
				var $this = $(this),
					type = $this.data('type'),
					txt = $this.text();
				$this.parent().remove();
				$upList.append('<li class="down-item"><a data-type="' + type + '">' + txt + '</a></li>');
				scope.updateMyChannels();
				wsCache.set('custom_channels', 1);
			});

			/*
				1、本地的channels全部包含在服务器端的channels里面
					up： 显示channels里面的频道；down：显示其余频道
				2、本地的channels部分包含在服务器端的channels里面
					up：显示本地channels和服务channels的交集频道；down：显示其他频道
			 */
			
			/* 获取服务端所有频道 */
			$.ajax({
				url: './data/channels.json',
				dataType: 'json',
				success: function(data){
					var channels = data.channels,
						up = channels.up,
						down = channels.down,
						serverChannels = up.concat(down),
						myChannels = wsCache.get('news_channels'),
						recChannels = null,
						myRecChannels = null;
					if(myChannels){
						myRecChannels = scope.getChannels(serverChannels, myChannels);
						myChannels = myRecChannels.myChannels;
						recChannels = myRecChannels.recChannels;
					} else {
						myChannels = up;
						recChannels = down;
					}
					scope.generateChannelsDom(myChannels, recChannels);
					// 缓存我的频道
					wsCache.set('news_channels', myChannels);
				},
				error: function(){
					console.error(arguments);
				}
			});
		},

		/**
		 * 生成订阅界面频道列表
		 * @param  {Array} myChannels  我的频道
		 * @param  {Array} recChannels 推荐频道
		 * @return {[type]} 
		 */
		generateChannelsDom: function(myChannels, recChannels){
			var i = 0, upHtml = '', downHtml = '';
			for (i = 0; i < myChannels.length; i++) {
				if(myChannels[i].name == 'toutiao' || myChannels[i].name == 'weikandian'){
					upHtml += '<li class="up-item"><a class="disable" data-type="' + myChannels[i].name + '">' + myChannels[i].value + '</a></li>';
				} else {
					upHtml += '<li class="up-item"><a data-type="' + myChannels[i].name + '">' + myChannels[i].value + '</a></li>';
				}
			}

			for (i = 0; i < recChannels.length; i++) {
				downHtml += '<li class="down-item"><a data-type="' + recChannels[i].name + '">' + recChannels[i].value + '</a></li>';
			}
			$upList.html(upHtml);
			$downList.html(downHtml);
		},

		/**
		 * 更新缓存中的我的频道
		 */
		updateMyChannels: function(){
			var myChannels = [];
			$upList.find('a').each(function(){
				var $this = $(this),
					obj = {'name': $this.data('type'), 'value': $this.text()};
				myChannels.push(obj);
			});
			// 缓存我的频道
			wsCache.set('news_channels', myChannels);
		},

		/**
		 * 根据服务器频道和本地频道，判断出我的频道和推荐频道。
		 * @param  {Array} sc 服务端频道
		 * @param  {Array} cc 本地缓存的频道（用户自定义我的频道）
		 * @return {json}     {myChannels: myChannels, recChannels: recChannels}
		 */
		getChannels: function(sc, cc){
			var myChannels = new Array(),
				recChannels = new Array(),
				cLen = cc.length,
				sLen = sc.length,
				mci = new Array(),
				i = 0;
			// 为了保持和缓存顺序一致，请外层循环使用缓存的频道数组
			for (i = 0; i < cLen; i++) {
				for (var j = 0; j < sLen; j++) {
					if(cc[i].name == sc[j].name){
						// 我的频道
						myChannels.push(cc[i]);
						// 我的频道数组中的索引
						mci.push(j);
					}
				}
			}

			for (i = 0; i < sLen; i++) {
				if(!mci.contains(i)){
					recChannels.push(sc[i]);
				}
			}

			return {myChannels: myChannels, recChannels: recChannels};
		}
	};

	new Channels();


});