var lottery = {
    index: 1, //起点
    speed: 400, //初始速度
    roll: 0, //定时器id
    cycle: 0, //已跑的圈速
    times: 4, //至少跑几圈
    prize: -1, //中奖索引
    btn: 0,
    dot: null,
    run: function() {
        var before = lottery.index == 1 ? 8 : lottery.index - 1;
        $(".aw-" + lottery.index).addClass("active");
        $(".aw-" + before).removeClass("active");
        if(lottery.dot.hasClass('active')){
            lottery.dot.removeClass('active');
        } else {
            lottery.dot.addClass('active');
        }
        //初步加快的过程
        lottery.upSpeed();
        lottery.downSpeed();
        lottery.index += 1;
        lottery.index = lottery.index == 9 ? 1 : lottery.index;
    },
    //提速
    upSpeed: function() {
        if (lottery.cycle < 2 && lottery.speed > 100) {
            lottery.speed -= lottery.index * 8;
            lottery.stop();
            lottery.start();
        }
    },
    //降速
    downSpeed: function() {
        if (lottery.index == 8) {
            lottery.cycle += 1;
        }
        if (lottery.cycle > lottery.times - 1 && lottery.speed < 400) {
            lottery.speed += 20;
            lottery.stop();
            lottery.start();
        }
        if (lottery.cycle > lottery.times && lottery.index == lottery.prize) {
            lottery.stop();
            lottery.showPrize();
        }
    },
    //先停止再显示结果 按钮显示出来
    showPrize: function() {
        setTimeout(function() {
            lottery.callback(lottery.prize);
            // lottery.btn.show();
        }, 700);
    },

    //重新开始
    reset: function(options) {
        // lottery.btn.hide();
        lottery.callback = options.callback;
        lottery.dot = $('.J-dot');
        lottery.btn = $(this);
        lottery.speed = options.speed ? options.speed : 400;
        lottery.index = options.index;
        lottery.times = options.times ? options.times : 4;
        lottery.prize = options.prize;
        // lottery.prize = Math.round(Math.random() * 7) + 1;
        lottery.run();
    },
    start: function() {
        lottery.roll = setInterval(lottery.run, lottery.speed);
    },

    stop: function() {
        clearInterval(lottery.roll);
    }
}