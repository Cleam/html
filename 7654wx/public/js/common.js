/**
 * 公共方法、事件js
 * @dependence Zepto,jQuery
 * @author lizhigao(lizhigao@021.com)
 * @date 2015-12-08
 */
// 重定义jQuery全局变量
var $j=jQuery.noConflict();

Zepto(function(){

	var $datePicker = $j('.J-date-picker'),
		$prevDay = $('.J-prev'),
		$nextDay = $('.J-next'),
		currYear = (new Date('2015')).getFullYear();
	/* 日期选择 start */
  	//初始化日期控件
	var opt = {
		preset: 'date', //日期，可选：date\datetime\time\tree_list\image_text\select
		theme: 'android-ics light', //皮肤样式，可选：default\android\android-ics light\android-ics\ios\jqm\sense-ui\wp light\wp
		display: 'modal', //显示方式 ，可选：modal\inline\bubble\top\bottom
		mode: 'scroller', //日期选择模式，可选：scroller\clickpick\mixed
		lang:'zh',
		dateFormat: 'yyyy-mm-dd', // 日期格式
		setText: '确定', //确认按钮名称
		cancelText: '取消',//取消按钮名籍我
		dateOrder: 'yyyymmdd', //面板中日期排列格式
		dayText: '日', 
		monthText: '月', 
		yearText: '年', //面板中年月日文字
		showNow: true,  
   		nowText: "今天",  
    	startYear:currYear, //开始年份  
    	endYear:currYear + 100, //结束年份  
    	onSelect: submit
	};
	$datePicker.mobiscroll(opt);
	/* 日期选择 start */

	/* 前一天、后一天切换功能 start */
	$prevDay.on('tap', function(){
		var arr = $datePicker.val().split('-'),
			curDate = new Date(arr[0], arr[1] - 1, arr[2]),
			prevDay = getDateStr(-1, curDate);
		submit(prevDay);
	});
	$nextDay.on('tap', function(){
		var arr = $datePicker.val().split('-'),
			curDate = new Date(arr[0], arr[1] - 1, arr[2]),
			nextDay = getDateStr(1, curDate);
		submit(nextDay);
	});
	function getDateStr(AddDayCount, curDate) { 
		var dd = curDate ? curDate : new Date(); 
		dd.setDate(dd.getDate() + AddDayCount);//获取AddDayCount天后的日期 
		var y = dd.getFullYear(); 
		var m = dd.getMonth()+1;//获取当前月份的日期 
		var d = dd.getDate(); 
		return y + "-" + m + "-" + d; 
	}
	/* 前一天、后一天切换功能 end */

	// 日期选择提交方法
	function submit(date){
		alert('==== 当前查询日期：' + date + ' ====');
	}

	 

});







