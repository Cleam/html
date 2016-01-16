/**
 * 产品有效量js
 * @author lizhigao(lizhigao@021.com)
 * @date 2015-12-05
 */

// 重定义jQuery全局变量
var $j=jQuery.noConflict();

Zepto(function(){
	var $productList = $('#J_product_list'),
		$productLink =  $productList.find('a'),
		flagClick = true;
		
	/* echarts  路径配置 */
    require.config({
        paths: {
            echarts: 'public/lib/echarts/dist'
        }
    });
	$productLink.on('tap', function(event) {
		event.preventDefault();
		if(!flagClick){
			return;
		}
		flagClick = false;
		var $this = $(this),
			$echartsWrap = $this.next();
		// 判断当前状态，状态1：表示未显示图表；状态2表示已经显示图表
		// 状态1
		if(!$this.hasClass('active')){
			// 判断图表是否已经生成过
			if($this.data('echarts')){
				// 直接显示
				$echartsWrap.show();
				flagClick = true;
			} else {
				// 先显示再加载数据
				// $echartsWrap.show();
				if($echartsWrap.find('.spinner').length === 0){
					var spinner = '<div class="spinner"><div class="double-bounce1"></div><div class="double-bounce2"></div></div>';
					$echartsWrap.append(spinner).show();
				}
				setTimeout(function(){
					// 图表数据
					var data = {
						title: $this.find('.txt').text(),
						tips: '推广量',
						months: ["150630", "150629", "150628", "150627", "150626", "150625", "150624", "150623", "150622", "150621"],
						amounts: [1577, 1582, 1395, 1396, 1482, 2080, 1501, 1650, 1468, 1295]
					};
					// 生成图表
					generateEcharts($echartsWrap.get(0), data);
					// 记录图表生成记录
					$this.data('echarts', true);
					// 隐藏loading
					$echartsWrap.find('.spinner').hide();
					flagClick = true;
				}, 1000);
			}
			$this.addClass('active');
		} else {
			// 状态2，点击隐藏图表
			$echartsWrap.hide();
			$this.removeClass('active');
			flagClick = true;
		}
	});

	/**
	 * 生成echarts
	 * @param  {Object} echartsWrap 必需 - 图表容器 DOM
	 * @param  {Object} data        必需 - 图表数据 JSON
	 * @return {[type]}             
	 */
	function generateEcharts(echartsWrap, data){
		// 使用
	    require([
	        'echarts',
	        'echarts/chart/line'
	    ], function (ec) {
	        // 基于准备好的dom，初始化echarts图表
	        // var myChart = ec.init(document.getElementById('J_echarts'), 'macarons'); 
	        var myChart = ec.init(echartsWrap, 'macarons'); 
	        var option = {
			    title : {
			        text: data.title + data.tips,	// data.title
			        textStyle: {
			        	color: '#444'
			        },
			        padding: 20,
			        x: 'center'
			    },
			    tooltip : {
			    	show: false,
			        trigger: 'axis'
			    },
			    grid: {
			    	x: '15%',
			    	y: '20%',
			    	x2: '8%',
			    	y2: '5%',
			    	height: '70%'
			    },
			    xAxis : [{
		            type : 'category',
		            boundaryGap : false,
		            data : data.months	// data.months
		        }],
			    yAxis : [{
		            type : 'value',
		            scale: true		// 脱离0值比例，放大聚焦到最终_min，_max区间
		        }],
			    series : [{
		            name: data.tips,
		            type: 'line',
		            data: data.amounts	// data.amounts
		        }]
			};
	        // 为echarts对象加载数据 
	        myChart.setOption(option); 
	    });
	}
	
	/* 日期选择 start */
	(function(){
		var $datePicker = $j('.J-date-picker'),
			currYear = (new Date('2015')).getFullYear();
	  	//初始化日期控件
		var opt = {
			preset: 'date', //日期，可选：date\datetime\time\tree_list\image_text\select
			theme: 'android-ics light', //皮肤样式，可选：default\android\android-ics light\android-ics\ios\jqm\sense-ui\wp light\wp
			display: 'modal', //显示方式 ，可选：modal\inline\bubble\top\bottom
			mode: 'scroller', //日期选择模式，可选：scroller\clickpick\mixed
			lang:'zh',
			dateFormat: 'yyyy-mm-dd', // 日期格式
			setText: '确定', //确认按钮名称
			cancelText: '取消',//取消按钮名称
			dateOrder: 'yyyymmdd', //面板中日期排列格式
			dayText: '日', 
			monthText: '月', 
			yearText: '年', //面板中年月日文字
			showNow: true,  
	   		nowText: "今天",  
	    	startYear:currYear, //开始年份  
	    	endYear:currYear + 100 //结束年份  
		};
		$datePicker.mobiscroll(opt);
	})();


});


