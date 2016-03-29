// document.addEventListener('touchmove', function (event) {
	// 	event.preventDefault();
	// }, false);

	// var $newsContent = $('#J_content');
	var newsContent = document.querySelector('#J_content'),
		isTop = false,startPosition,endPosition;

	newsContent.addEventListener('touchstart', function (e) {
		if(document.body.scrollTop <= 0){
			isTop = true;
	        var touch = e.touches[0];
	        startPosition = {
	            x: touch.pageX,
	            y: touch.pageY
	        }
	        console.log('1: ', touch);
		} else {
			isTop = false;
		}
    }, false);

    newsContent.addEventListener('touchmove', function (e) {
    	if(!isTop){
    		return false;
    	}
        var touch = e.touches[0];
        endPosition = {
            x: touch.pageX,
            y: touch.pageY
        }
        var verticalDis = endPosition.y - startPosition.y;
        console.log('verticalDis: ', verticalDis);

        // deltaX = endPosition.x - startPosition.x;
        // deltaY = endPosition.y - startPosition.y;
        // moveLength = Math.sqrt(Math.pow(Math.abs(deltaX), 2) + Math.pow(Math.abs(deltaY), 2));
        // console.log(moveLength);
    }, false);

    newsContent.addEventListener('touchend', function (e) {
    	// if(){

    	// }
        var touch = e.touches[0];
        // endPosition = {
        //     x: touch.pageX,
        //     y: touch.pageY
        // }
        // console.log(e);
        // deltaX = endPosition.x - startPosition.x;
        // deltaY = endPosition.y - startPosition.y;
        // moveLength = Math.sqrt(Math.pow(Math.abs(deltaX), 2) + Math.pow(Math.abs(deltaY), 2));
        // console.log(moveLength);
    }, false);

	// $newsContent.on('swipeDown', function(){
	// 	console.log(arguments);
	// });
	// $newsContent.on('swipe', function(){
	// 	console.log(arguments);
	// });

	// $newsContent.on('swipeUp', function(){
	// 	console.log(arguments);
	// });