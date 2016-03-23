// $: Zepto
$(function(){
	var ARR_WEEKS = new Array("星期日","星期一","星期二","星期三","星期四","星期五","星期六");
	/**
	 * 判断是不是晚上（20:00 ~ 8:00 视为晚上）
	 * @return {Boolean} true 晚上，false 白天
	 */
	function isNight(){
		var hour = new Date().getHours();
		if(hour >= 8 && hour <= 20){
			return false;
		}
		return true;
	}

	/**
	 * 获取特定格式的事件字符串（如：2016年03月23日 星期三）
	 * @return {String} 
	 */
	function getDateAndWeek(){
		var now = new Date();
		return "" + now.getFullYear() + "年" + (now.getMonth() + 1) + "月" + now.getDate() + "日" + " " + ARR_WEEKS[now.getDay()] + "";
	}

	/**
	 * 获取当前时间（如：18:30、18:03）
	 * @return {String} 当前时间
	 */
	function getTime(){
		var now = new Date(),
			hour = now.getHours(),
			minute = now.getMinutes();
		minute = minute < 10 ? ('0' + minute) : minute;
		return hour + ':' + minute;
	}

	// http://tqapi.dftianqi.com/TtWeather/?citycode=101120201
	/*$.ajax({
		url: 'http://tqapi.dftianqi.com/TtWeather/',
		data: {
			citycode: '101120201'
		},
		dataType: 'json',
		// jsonp: 'jsonpcallback',
		success: function(json, status, xhr){
			console.log(arguments);
		},
		error: function(){
			console.log(arguments);
		},
		complete: function(){
			console.log(arguments);
		}
	});*/

	/**
	 * 天气详情对象
	 */
	function WeatherDetails(options){
		this.url = options.url || '';
		this.citycode = options.citycode || '';
		this.today = null;
		this.todayFuture = null;
		this.tomorrow = null;
		this.current = null;
		this.future = null;
		this.isNight = isNight();
		this.init();
	}

	WeatherDetails.prototype = {
		init: function(){
			var scope = this;
			if(!scope.url && !scope.citycode){
				return;
			}
			$.getJSON('data/data.json', function(json, status, xhr){
				try {
					var result = json.result;
					scope.setToday(result.today);
					scope.setTomorrow(result.future[1]);
					scope.setCurrent(result.today);
					scope.setTodayFuture(result.today, result.today_24);
					scope.setFuture(result.future);
					console.log(result);
				} catch (e) {
					console.error(e);
				}
			});
		},
		/**
		 * 加载今天天气数据
		 * @param {JSON} d 今天天气数据
		 */
		setToday: function(d){
			var nowStr = d.date_y.substring(5, 7) + '.' + d.date_y.substring(8, 10) + ' ' + d.week,
				imgSrc = 'img/tq_02.png',
				temp = d.temp_night + '~' + d.temp_day + '℃',
				weather = this.isNight ? d.weather_night : d.weather_day,
				aqi = d.aqi,
				aqiInfo = d.aqi_info,
				$today = $('#J_today');
			$today.append('<div class="today-wrap">' +
				'<div class="sct-l">' +
					'<img src="' + imgSrc + '" alt="' + weather + '">' +
				'</div>' +
				'<div class="sct-r">' +
					'<p class="time"><em>今天</em>' + nowStr + '</p>' +
					'<p class="temp">' + temp + '</p>' +
					'<p class="weather">' + weather + '</p>' +
					'<p class="aqi">' + aqi + ' 空气质量' + aqiInfo + '</p>' +
				'</div>' +
			'</div>');
		},
		/**
		 * 加载明天天气数据
		 * @param {JSON} d 明天天气数据
		 */
		setTomorrow: function(d){
			var nowStr = d.date.substring(4, 6) + '.' + d.date.substring(6, 8) + ' ' + d.week,
				imgSrc = 'img/tq_01.png',
				temp = d.temp_night + '~' + d.temp_day + '℃',
				weather = this.isNight ? d.weather_night : d.weather_day,
				$tomorrow = $('#J_tomorrow');
			$tomorrow.append('<div class="tomorrow-wrap">' +
				'<div class="sct-l">' +
					'<img src="' + imgSrc + '" alt="' + weather + '">' +
				'</div>' +
				'<div class="sct-r">' +
					'<p class="time"><em>明天</em>' + nowStr + '</p>' +
					'<p class="temp">' + temp + '</p>' +
					'<p class="weather">' + weather + '</p>' +
				'</div>' +
			'</div>');
		},
		/**
		 * 加载当前天气数据
		 * @param {JSON} d 今天天气数据
		 */
		setCurrent: function(d){
			var now = new Date(),
				curTime = getTime(),
				imgSrc = 'img/tq_01.png',
				temp = (this.isNight ? d.temp_night : d.temp_day) + '℃',
				weather = this.isNight ? d.weather_night : d.weather_day,
				humidity = d.humidity,	// 湿度
				windDir = d.wind_direction,	// 风向
				windStrength = d.wind_strength,	// 风级
				aqi = d.aqi,
				aqiInfo = d.aqi_info,
				aqiImg = 'img/aqi_' + this.getAqiImgNum(aqi) + '.png',
				pm25 = Number(d.pm2_5).toFixed(1),	
				pm10 = Number(d.pm10).toFixed(1),	
				o3 = Number(d.o3).toFixed(1),
				no2 = Number(d.no2).toFixed(1),
				$current = $('#J_current');
			$current.append('<p class="time">' + curTime + '</p>' +
				'<ul>' +
					'<li>' +
						'<div class="img1"><img src="' + imgSrc + '" alt="' + weather + '"></div>' +
						'<p class="txt1">' + weather + ' ' + temp + '</p>' +
						'<p class="txt2"><span class="wet"><i></i>湿度 ' + humidity + '</span><span class="wind"><i></i>' + windDir + ' ' + windStrength + '</span></p>' +
					'</li>' +
					'<li>' +
						'<div class="img2"><img src="' + aqiImg + '" alt="' + aqiInfo + '"></div>' +
						'<p class="txt1">空气指数：' + aqi + ' ' + aqiInfo + '</p>' +
						'<p class="txt2"><span class="blk">PM2.5：' + pm25 + '</span><span class="blk">PM10：' + pm10 + '</span><span class="blk">O3：' + o3 + '</span><span class="blk">NO2：' + no2 + '</span></p>' +
					'</li>' +
				'</ul>');
		},
		/**
		 * 加载今天未来天气数据
		 * @param {[type]} td 今天天气数据
		 * @param {[type]} tf 今天24h天气数据
		 */
		setTodayFuture: function(td, tf){
			var nowStr = td.date_y + ' ' + td.week,
				$tFuture = $('#J_today_future'),
				curHour = Number(new Date().getHours()),
				$ul = $('<ul class="today-list"></ul>'),
				weather = '',
				temp = '',
				time = '',
				imgSrc = '';
			$tFuture.append('<div class="hd">' + 
					'<p class="time">今天</p>' + 
					'<p class="content"><img src="img/time.png" alt="">' + nowStr + '</p>' + 
				'</div>');
			for (var i = curHour + 1, l = tf.length; i < l; i++) {
				weather = tf[i].weather;
				temp = tf[i].temp + '℃';
				time = this.getTimeByIndex(i);
				imgSrc = 'img/tq_sm_01.png';
				if(weather.indexOf('雨') != -1){
					$ul.append('<li class="today-item">' + 
							'<p class="time">' + time + '</p>' + 
							'<p class="content">' + 
								'<span class="img"><img src="" alt=""></span>' + weather + ' ' + temp + '<em>带伞</em>' + 
							'</p>' + 
						'</li>');
				} else {
					$ul.append('<li class="today-item">' + 
							'<p class="time">' + time + '</p>' + 
							'<p class="content">' + 
								'<span class="img"><img src="img/tq_sm_01.png" alt=""></span>' + weather + ' ' + temp +
							'</p>' + 
						'</li>');
				}
			}
			$tFuture.append($ul);
		},
		/**
		 * 加载未来15天天气数据
		 * @param {[type]} d 未来15天天气数据
		 */
		setFuture: function(d){
			var $future = $('#J_future'),
				week = '',
				date = '',
				weather = '',
				temp = '',
				windDir = '',
				windLevel = '',
				imgSrc = '',
				l = d.length < 10 ? d.length : 10;
			// 未来9天天气数据
			for (var i = 1; i < 10; i++) {
				week = d[i].week;
				date = d[i].date.substring(4, 6) + '.' + d[i].date.substring(6, 8);
				temp = d[i].temp_night + '~' + d[i].temp_day + '℃';
				weather = d[i].weather_day;
				windDir = d[i].wind_direction;
				windLevel = d[i].wind_level;
				imgSrc = 'img/tq_sm_01.png';
				$future.append('<li class="future-item">' +
					'<p class="time">' + week + '<em>' + date + '</em></p>' +
					'<div class="content">' +
						'<div class="img"><img src="' + imgSrc + '" alt="' + weather + '"></div>' +
						'<p class="temp">' + weather + ' ' + temp + '</p>' +
						'<p class="wind"><i></i>' + windDir + ' ' + windLevel + '</p>' +
					'</div>' +
				'</li>');
			}
		},

		/**
		 * 获取控制质量图标索引（需要事先约定好图片内容和索引关系）
		 * @param  {String|Number} aqi 空气质量
		 * @return {String}   图片索引
		 */
		getAqiImgNum: function(aqi){
			var s = '1';
			if(aqi >= 0 && aqi <= 50){
				s = '1';
			} else if(aqi >= 51 && aqi <= 100){
				s = '2';
			} else if(aqi >= 101 && aqi <= 150){
				s = '3';
			} else if(aqi >= 151 && aqi <= 200){
				s = '4';
			} else if(aqi >= 201 && aqi <= 300){
				s = '5';
			} else if(aqi >= 301){
				s = '6';
			}
			return s;
		},
		/**
		 * 通过索引获取时间字符串
		 * @param  {String|Number} index 索引
		 * @return {String}       时间字符串
		 */
		getTimeByIndex: function(index){
			var s = '00:00';
			switch(index){
				case 0: s = '00:00'; break;
				case 1: s = '01:00'; break;
				case 2: s = '02:00'; break;
				case 3: s = '03:00'; break;
				case 4: s = '04:00'; break;
				case 5: s = '05:00'; break;
				case 6: s = '06:00'; break;
				case 7: s = '07:00'; break;
				case 8: s = '08:00'; break;
				case 9: s = '09:00'; break;
				case 10: s = '10:00'; break;
				case 11: s = '11:00'; break;
				case 12: s = '12:00'; break;
				case 13: s = '13:00'; break;
				case 14: s = '14:00'; break;
				case 15: s = '15:00'; break;
				case 16: s = '16:00'; break;
				case 17: s = '17:00'; break;
				case 18: s = '18:00'; break;
				case 19: s = '19:00'; break;
				case 20: s = '20:00'; break;
				case 21: s = '21:00'; break;
				case 22: s = '22:00'; break;
				case 23: s = '23:00'; break;
				default: s = '00:00'; break;
			}
			return s;
		}
	};

	new WeatherDetails({
		url: 'http://tqapi.dftianqi.com/TtWeather/',
		citycode: '101120201'
	});

});