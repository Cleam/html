$(function(){
	var $reset = $('#J_reset');
	var $show = $('#J_show');
	var timer = null;
	var canvasWidth = 800;
	var canvasHeight = 600;
	var canvas = document.getElementById('canvas');
	var ctx = canvas.getContext('2d');
	canvas.width = canvasWidth;
	canvas.height = canvasHeight;

	var img = new Image();
	var RADIUS = 50;
	var clippingRegion = {x: -1, y: -1, r: RADIUS};
	img.src = 'img/xj.jpg';

	img.onload = function(){
		init();
	};

	$reset.on('click', reset);
	$show.on('click', show);

	/**
	 * 初始化
	 * @return {[type]} [description]
	 */
	function init(){
		clippingRegion = {x: Math.random() * (canvas.width - 2 * RADIUS) + RADIUS, y: Math.random() * (canvas.height - 2 * RADIUS) + RADIUS, r: RADIUS};
		draw(img, clippingRegion);
	}

	/**
	 * 绘制图像
	 * @param  {[type]} img            [description]
	 * @param  {[type]} clippingRegion [description]
	 * @return {[type]}                [description]
	 */
	function draw(img, clippingRegion){
		ctx.clearRect(0, 0, canvas.width, canvas.height);
		ctx.save();
		setClippingRegion(clippingRegion);
		ctx.drawImage(img, 0, 0);
		ctx.restore();
	}

	/**
	 * 设置剪辑区域
	 */
	function setClippingRegion(cr){
		ctx.beginPath();
		ctx.arc(cr.x, cr.y, cr.r, 0, Math.PI * 2, false);
		ctx.clip();
	}

	/**
	 * 重置
	 * @return {[type]} [description]
	 */
	function reset(){
		if(timer){
			clearInterval(timer);
		}
		init();
	}

	/**
	 * 显示图片
	 * @return {[type]} [description]
	 */
	function show(){
		timer = setInterval(function(){
			clippingRegion.r += 20;
			if(clippingRegion.r > 2 * Math.max(canvas.width, canvas.height)){
				clearInterval(timer);
			}
			draw(img, clippingRegion);
		}, 30);
	}

});