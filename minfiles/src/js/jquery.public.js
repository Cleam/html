/*
 * 7654公用插件汇总在此文件。
 * @author created by lizhigao(lizhigao@021.com)
 * @date 2015-05-23
 */
;(function($){
    $.fn.extend({
        /**
         * jQuery Tabs Plugins 1.0
         * author:chenyg@5173.com
         * URL:http://stylechen.com/jquery-tabs.html
         * 使用方法见上方URL
         * 演示地址：http://stylechen.com/wp-content/uploads/demo/jquery-tabs/index.html
         * @param options
         * @returns {Tabs}
         * @constructor
         */
        tabs:function(options){
            // 处理参数
            options = $.extend({
                event : 'mouseover',
                timeout : 0,
                auto : 0,
                callback : null
            }, options);
            var self = $(this),
                tabBox = self.children( 'div.tab-box' ).children( 'div' ),
                menu = self.children( 'ul.tab-menu' ),
                items = menu.find( 'li' ),
                timer;
            var tabHandle = function( elem ){
                    elem.siblings( 'li' )
                        .removeClass( 'current' )
                        .end()
                        .addClass( 'current' );
                    tabBox.siblings( 'div' )
                        .addClass( 'hide' )
                        .end()
                        .eq( elem.index() )
                        .removeClass( 'hide' );
                },
                delay = function( elem, time ){
                    time ? setTimeout(function(){ tabHandle( elem ); }, time) : tabHandle( elem );
                },
                start = function(){
                    if( !options.auto ) return;
                    timer = setInterval( autoRun, options.auto );
                },
                autoRun = function(){
                    var current = menu.find( 'li.current' ),
                        firstItem = items.eq(0),
                        len = items.length,
                        index = current.index() + 1,
                        item = index === len ? firstItem : current.next( 'li' ),
                        i = index === len ? 0 : index;
                    current.removeClass( 'current' );
                    item.addClass( 'current' );
                    tabBox.siblings( 'div' )
                        .addClass( 'tabHide' )
                        .end()
                        .eq(i)
                        .removeClass( 'tabHide' );
                };
            items.bind( options.event, function(){
                delay( $(this), options.timeout );
                if( options.callback ){
                    options.callback( self );
                }
            });

            if( options.auto ){
                start();
                self.hover(function(){
                    clearInterval( timer );
                    timer = undefined;
                },function(){
                    start();
                });
            }
            return this;
        },
        /**
         * 该方法为了解决不支持placeholder属性的浏览器下达到相似效果作用
         * @param _color 文本框输入字体颜色,默认黑色
         * @param _plaColor 文本框placeholder字体颜色，默认灰色#a3a3a3
         */
        inputTip:function(_color, _plaColor) {
            _color = _color || "#000000";
            _plaColor = _plaColor || "#a3a3a3";
            function supportsInputPlaceholder() { // 判断浏览器是否支持html5的placeholder属性
                var input = document.createElement('input');
                return "placeholder" in input;
            }
            function showPassword(_bool, _passEle, _textEle) { // 密码框和文本框的转换
                if (_bool) {
                    _passEle.show();
                    _textEle.hide();
                } else {
                    _passEle.hide();
                    _textEle.show();
                }
            }
            if (!supportsInputPlaceholder()) {
                this.each(function() {
                    var thisEle = $(this);
                    var inputType = thisEle.attr("type")
                    var isPasswordInput = inputType == "password";
                    var isInputBox = inputType == "password" || inputType == "text";
                    if (isInputBox) { //如果是密码或文本输入框
                        var isUserEnter = false; // 是否为用户输入内容,允许用户的输入和默认内容一样
                        var placeholder = thisEle.attr("placeholder");

                        if (isPasswordInput) { // 如果是密码输入框
                            //原理：由于input标签的type属性不可以动态更改，所以要构造一个文本input替换整个密码input
                            var textStr = "<input type='text' class='" + thisEle.attr("class") + "' style='" + (thisEle.attr("style") || "") + "' />";
                            var textEle = $(textStr);
                            textEle.css("color", _plaColor).val(placeholder).focus(
                                function() {
                                    thisEle.focus();
                                }).insertAfter(this);
                            thisEle.hide();
                        }
                        thisEle.css("color", _plaColor).val("");//解决ie下刷新无法清空已输入input数据问题
                        if (thisEle.val() == "") {
                            thisEle.val(placeholder);
                        }
                        thisEle.focus(function() {
                            if (thisEle.val() == placeholder && !isUserEnter) {
                                thisEle.css("color", _color).val("");
                                if (isPasswordInput) {
                                    showPassword(true, thisEle, textEle);
                                }
                            }
                        });
                        thisEle.blur(function() {
                            if (thisEle.val() == "") {
                                thisEle.css("color", _plaColor).val(placeholder);
                                isUserEnter = false;
                                if (isPasswordInput) {
                                    showPassword(false, thisEle, textEle);
                                }
                            }
                        });
                        thisEle.keyup(function() {
                            if (thisEle.val() != placeholder) {
                                isUserEnter = true;
                            }
                        });
                    }
                });
            }
        },
        /**
         * 该方法为了解决不支持placeholder属性的浏览器下达到相似效果作用
         * @param _color 文本框输入字体颜色,默认黑色
         * @param _plaColor 文本框placeholder字体颜色，默认灰色#a3a3a3
         */
        inputTip: function(_color, _plaColor) {
            _color = _color || "#000000";
            _plaColor = _plaColor || "#a3a3a3";
            function supportsInputPlaceholder() { // 判断浏览器是否支持html5的placeholder属性
                var input = document.createElement('input');
                return "placeholder" in input;
            }
            function showPassword(_bool, _passEle, _textEle) { // 密码框和文本框的转换
                if (_bool) {
                    _passEle.show();
                    _textEle.hide();
                } else {
                    _passEle.hide();
                    _textEle.show();
                }
            }
            if (!supportsInputPlaceholder()) {
                this.each(function() {
                    var thisEle = $(this);
                    var inputType = thisEle.attr("type")
                    var isPasswordInput = inputType == "password";
                    var isInputBox = inputType == "password" || inputType == "text";
                    if (isInputBox) { //如果是密码或文本输入框
                        var isUserEnter = false; // 是否为用户输入内容,允许用户的输入和默认内容一样
                        var placeholder = thisEle.attr("placeholder");

                        if (isPasswordInput) { // 如果是密码输入框
                            //原理：由于input标签的type属性不可以动态更改，所以要构造一个文本input替换整个密码input
                            var textStr = "<input type='text' class='" + thisEle.attr("class") + "' style='" + (thisEle.attr("style") || "") + "' />";
                            var textEle = $(textStr);
                            textEle.css("color", _plaColor).val(placeholder).focus(
                                function() {
                                    thisEle.focus();
                                }).insertAfter(this);
                            thisEle.hide();
                        }
                        thisEle.css("color", _plaColor).val("");//解决ie下刷新无法清空已输入input数据问题
                        if (thisEle.val() == "") {
                            thisEle.val(placeholder);
                        }
                        thisEle.focus(function() {
                            if (thisEle.val() == placeholder && !isUserEnter) {
                                thisEle.css("color", _color).val("");
                                if (isPasswordInput) {
                                    showPassword(true, thisEle, textEle);
                                }
                            }
                        });
                        thisEle.blur(function() {
                            if (thisEle.val() == "") {
                                thisEle.css("color", _plaColor).val(placeholder);
                                isUserEnter = false;
                                if (isPasswordInput) {
                                    showPassword(false, thisEle, textEle);
                                }
                            }
                        });
                        thisEle.keyup(function() {
                            if (thisEle.val() != placeholder) {
                                isUserEnter = true;
                            }
                        });
                    }
                });
            }
        },
        /*
         * 文字向上滑动插件.
         * @date 2014.5.22
         */
        txtScroll:function(options) {
            //默认配置
            var defaults = {
                speed:50,  //滚动速度,值越大速度越慢
                rowHeight:24 //每行的高度
            };
            var opts = $.extend({}, defaults, options),
                intId = [],
                that = $(this);
            var marquee = function(obj, step){

                obj.find("ul").animate({
                    marginTop: '-=1'
                },0,function(){
                    var s = Math.abs(parseInt($(this).css("margin-top")));
                    if(s >= step){
                        $(this).find("li").slice(0, 1).appendTo($(this));
                        $(this).css("margin-top", 0);
                    }
                });
            };
            this.each(function(i){
                var sh = opts["rowHeight"],speed = opts["speed"],_this = $(this);
                intId[i] = setInterval(function(){
                    if(_this.find("ul").height()<=_this.height()){
                        clearInterval(intId[i]);
                    }else{
                        marquee(_this, sh);
                    }
                }, speed);
                _this.hover(function(){
                    clearInterval(intId[i]);
                },function(){
                    intId[i] = setInterval(function(){
                        if(_this.find("ul").height()<=_this.height()){
                            clearInterval(intId[i]);
                        }else{
                            marquee(_this, sh);
                        }
                    }, speed);
                });
            });
            return this;
        },
        /* 读取JSON数据，展示兑换记录.
         * @date 2014.5.22.
         */
        convertRecord: function(options) {
            options = $.extend({
                jsonData: "",	// 循环传入数据.
                vesseid: "" // 存放数据容器.
            },options);
            var self = $(this), // 缓存自身.
                data = options.jsonData, // 取出数据.
                len = data.length, // 数据长度.
                vesse = options.vesseid, // 存放容器.
                str = "";
            var foundConvert = function() {
                if(len > 0){
                    for( var i = 0;i < len;i++ ) {
                        var name = data[i].name, // 兑换用户姓名.
                            article = data[i].article, // 兑换物品.
                            TXT = data[i].txt;
                        str += "<li>"
                        str += 		"<span class='name'>"+ name +"</span>"
                        str += 		"<span class='CONVERT-TXT'>"+TXT+"</span>"
                        str += 		"<span class='c-goods'>"+ article +"</span>"
                        str += "</li>"
                    }
                    $(vesse).html(str);
                }
            };
            return foundConvert();
        },
        /*
         * 点击添加样式.
         */
        addStyle: function () {
            var self = $(this), // 缓存自身.
                elem = self.children();
            var addEvent = function () {
                elem.on("click",function () {
                    $(this).addClass("on")
                        .siblings()
                        .removeClass("on");
                });
            }
            return addEvent();
        },
        /*
         * 判断用户是否登录.
         * 如果没登录，则进行回调操作.
         */
        judgePersonLogin: function(options) {
            var parameters = $.extend({
                elemValue : "",	// 传入值.
                elemType : "obj",	// 传入值判断类型. Number类型：0,1; 对象类型obj：null,srting;
                isLogin : null,	// 用户登录回调函数.
                notLogin : null	// 用户没登陆回调函数.
            },options);
            var elem = parameters.elemValue,	// 传入值，根据值判断用户权限.
                elemType = parameters.elemType,	//传入类型判断.
                self = $(this);	// 缓存自身.
            return this.each(function () {
                if ($.isFunction(parameters.isLogin)){
                    /* 创建登录事件. */
                    self.bind("isLogin",parameters.isLogin);
                }
                if ($.isFunction(parameters.notLogin)){
                    /* 创建未登录事件. */
                    self.bind("notLogin",parameters.notLogin);
                }
                if(elemType == "obj"){
                    if(typeof(elem) !="undefined"&& elem){
                        self.trigger("isLogin");	// 触发登录事件.
                    }else{
                        self.trigger("notLogin"); // 触发未登录事件.
                    }
                }else if(elemType == "number") {
                    if(elem == "1") {
                        self.trigger("isLogin");	// true.
                    }else if(elem == "0") {
                        self.trigger("notLogin"); // false.
                    }
                }
            });
        },
        /*
         * 手风琴菜单.
         */
        foldMenu: function(options) {
            options = $.extend({
                time: 300	// 折叠速度.
            },options);
            var self = $(this),
                head = self.find("[data-head]");

            head.on("click",function() {
                $(this).toggleClass("on")
                    .siblings().slideToggle(options.time);
            })
            return this;
        },
        /* 获取手机验证码.*/
        getPhoneCode: function(argument) {
            /** 配置参数.
             *  @return
             */
            argument = $.extend({
                getBtn: "", // 获取手机验证码按钮.
                url: "", // 获取验证码地址.
                phone: "", // 手机号码.
                jsonp: false, // 是否跨域请求.
                time: 60, // 重新发送验证码时间.
                storeTime: "", // 存放时间ID.
                errorid: "", // 错误信息ID.
                input: false, // 是否有电话输入框.
                bind: false, // 是否是绑定手机.
                uid: "", // 用户ID,绑定手机时用.
                bindBtn: "", // 手机绑定按钮.
                bindUrl: "", // 手机绑定地址.
                bindInput: "", // 手机输入框.
                codeInput: "", // 验证码输入.
                code:'',
                codePhoneLabel:''
            },argument);
            var self = $(argument.getBtn), // 缓存点击获取验证码按钮.
                url = argument.url, // 缓存提交地址.
                phone = $(argument.bindInput);
            var restartCode = function(e) {
                    var cd = e,intervalCd = 0;
                    if (cd > 0 && !intervalCd) {
                        intervalCd = setInterval(function(){
                            cd--;
                            //倒时时
                            $(argument.getBtn).html('<span id="'+argument.storeTime+'">' + cd + '</span>秒后重新获取验证码')
                                .addClass("get-again")
                                .unbind("click"); // 移除点击事件.
                            if (cd <= 0 ) {
                                //倒计时结束
                                $(argument.getBtn).html('获取验证码')
                                    .removeClass("get-again")
                                    .bind("click",eventClick()); // 重新添加点击事件.
                                $(argument.errorid).hide();
                                clearInterval(intervalCd);
                                intervalCd = 0;
                            }
                        }, 1000);
                    }
                    return intervalCd;
                },
                eventClick = function() {
                    // 获取手机验证码.
                    $(argument.getBtn).on("click",function() {
                        if(argument.input == true){
                            var phoneval = phone.val().replace(' ','').replace(' ','');
                            if(phoneval == ""){
                                //$(argument.errorid).show().text("请输入手机号码");
                                $(this).parents("li").prev('li').prev('li').find("[data-error]").show().text("请输入手机号码");
                                return false;
                            }else if(phoneval.length < 11 || !(/^1[3|4|5|7|8|9][0-9]\d{8}$/.test(phoneval))){
                                var e =$(argument.errorid).parents("li").find("[data-error]");
                                if(e.length > 0){
                                    $(argument.errorid).hide();
                                }else {
                                    $(argument.errorid).show().text("请输入正确的手机号码");
                                }
                                return false;
                            }
                        }
                        /* 不需要跨域获取验证码.*/
                        if(argument.jsonp == false){
                            var data = {use_bind:argument.phone};
                            if(argument.bind == true){
                                var phoneval = $(this).parents("li").find("[data-phone]");
                                data = {phone:phoneval,id:argument.uid}
                            }else {
                                data = {phone:phone.val().replace(' ','').replace(' ','')};
                            }
                            data.code = $(argument.code).val();
                            $.post(argument.url, data, function(d){

                                var success = d.success,
                                    msg = d.msg;

                                if(success != 1){
                                    $(argument.errorid).show().text(msg);
                                }
                                else {
                                    $(argument.errorid).show().text("验证码已发送");
                                    restartCode(argument.time);
                                }
                                //flushCode();
                            }, 'json');
                        }
                        /* 需要跨域.*/
                        if(argument.jsonp == true){
                            var data = {use_bind:argument.phone};
                            if(argument.bind == true){
                                var phoneval = $(this).parents("li").find("[data-phone]");
                                data = {phone:phoneval,id:argument.uid}
                            }else {
                                data = {phone:phone.val().replace(' ','').replace(' ','')};
                            }
                            data.code = $(argument.code).val();
                            $.get(argument.url, data, function(d){
                                var success = d.success,
                                    msg = d.msg;
                                if(success != 1){
                                    $(argument.errorid).show().text(msg);
                                }
                                else {
                                    $(argument.errorid).show().text("验证码已发送");
                                    restartCode(argument.time);
                                }
                                //flushCode();
                            }, 'jsonp');
                        }
                        return false;
                    });
                    // 手机绑定事件.
                    $(argument.bindBtn).on("click",function() {
                        var phone = $(argument.bindInput).val(),
                            code = $(argument.codeInput).val(),
                            data = {phone:phone,code:code};
                        if(phone == ""){
                            var e =$(argument.errorid).parents("li").find("[data-error]");
                            if(e.length > 0){
                                $(argument.errorid).hide();
                            }else {
                                $(argument.errorid).show().text("请输入手机号");
                            }
                            return false;
                        } else if(code == ""){
                            var e =$(argument.errorid).parents("li").find("[data-error]");
                            if(e.length > 0){
                                $(argument.errorid).hide();
                            }else {
                                $(argument.errorid).show().text("请输入短信验证码");
                            }
                            return false;
                        }
                        $.post(argument.bindUrl, data, function(d){
                            var success = d.success,
                                msg = d.msg;
                            if (success != 1) {
                                $(argument.errorid).show().text(msg);
                            }
                            else {
                                location.reload();
                            }
                        }, 'json');
                    });
                };
            return eventClick();
        },
        /*
         * 网站共用简易弹出方法.
         * @author Jack.li.
         * @date 2014.6.03.
         */
        popupMeans: function(elem) {
            /* 配置参数.*/
            $.extend({
                popid: "#popup", // 弹出框ID.
                width: 400, // 弹出框宽.
                height: 300, // 弹出框高.
                shade: true, // 弹出遮罩层, true为有遮罩层，false为没有遮罩层.
                callback: null // 弹出回调函数.
            },elem);
            var self = $(this), // 缓存弹出按钮自身.
                doc = document, // 缓存document.
                win = window,
                body = $("body"), // 缓存body.
                $popupMassage = $(elem.popid), // 缓存弹出框.
                $hd = $popupMassage.find("[data-head]"), // 缓存弹出框头部.
                $bd = $popupMassage.find("[data-body]"), // 缓存弹出框内容部分.
                $cloneBtn = $popupMassage.find("[data-close]"), // 缓存关闭按钮.
                $hidetop = $(doc).scrollTop(); //  被卷去网页高度.
            /**
             * 计算获得当前信息窗口坐标.
             * @return {x,y}(json).
             */
            var getCoord = function() {
                    //debugger;
                    x = $(win).width() / 2 - elem.width / 2;  //更新信息X轴坐标.
                    y = $(win).height() / 2 - elem.height / 2;  //更新信息Y轴坐标.
                    return {x:x,y:y};
                },
            /* 获取浏览器版本.*/
                getBrowserInfo = function() {
                    var agent = navigator.userAgent.toLowerCase(),
                        regStr_ie = /msie [\d.]+;/gi ,
                        regStr_ff = /firefox\/[\d.]+/gi,
                        regStr_chrome = /chrome\/[\d.]+/gi,
                        regStr_saf = /safari\/[\d.]+/gi ;
                    //IE
                    if(agent.indexOf("msie") > 0){
                        return agent.match(regStr_ie) ;
                    }
                    //firefox
                    if(agent.indexOf("firefox") > 0){
                        return agent.match(regStr_ff) ;
                    }
                    //Chrome
                    if(agent.indexOf("chrome") > 0){
                        return agent.match(regStr_chrome) ;
                    }
                    //Safari
                    if(agent.indexOf("safari") > 0 && agent.indexOf("chrome") < 0){
                        return agent.match(regStr_saf) ;
                    }
                };
            /**
             * 打开一个窗口方法.
             */
            openMassage = function() {
                var browser = getBrowserInfo(),
                    verinfo = (browser+"").replace(/[^0-9.]/ig,""),
                    coord = getCoord(), // 更新信息窗口位置.
                    $top,$display;
                if(verinfo == "6.0"){
                    $top = $hidetop+coord.y;
                    $display = "none"
                }else {
                    $top = coord.y;
                    $display = "block";
                }
                // 判断是否需要遮罩层.
                if(elem.shade == true){
                    /* 创建遮罩层. */
                    var shade = "<div id='popShade' class='pop-shade upgrade_hint'></div>";
                    /* 遮罩层添加到body. */
                    $(shade).appendTo(body);
                    var $shadeid = $("#popShade");
                    /* 初始化遮罩层. */
                    if($shadeid.length > 0){
                        $shadeid.css({
                            "width":$(doc).width(),
                            "height":$(doc).height(),
                            "opacity":0,
                            "display":$display
                        });
                        if(verinfo == "6.0"){
                            /* 进行信息窗口显示动画. */
                            $popupMassage
                                .css({"width":elem.width,"height":elem.height,"left":coord.x, "top":$top, "opacity":0, "display":"block"})
                                .animate({"opacity":1}, "slow");
                        }else {
                            /* 进行遮罩层展示动画. */
                            $shadeid.fadeTo("fast", .45, function() {
                                /* 进行信息窗口显示动画. */
                                $popupMassage
                                    .css({"width":elem.width,"height":elem.height,"left":coord.x, "top":$top, "opacity":0, "display":"block"})
                                    .animate({"opacity":1}, "slow");
                            });
                        }
                        return self.each(function() {
                            self.bind("callback",elem.callback); // 回调函数.
                            self.trigger("callback");
                        });
                    }
                }else {
                    /* 进行信息窗口显示动画. */
                    $popupMassage
                        .css({"width":elem.width,"height":elem.height,"left":coord.x, "top":$top, "opacity":0, "display":"block"})
                        .animate({"opacity":1}, "slow");
                    return self.each(function() {
                        self.bind("callback",elem.callback); // 回调函数.
                        self.trigger("callback");
                    });
                }
            },

            /**
             * 关闭当前窗口方法.
             */
                closeMassage = function() {
                    var coord = getCoord(),  //更新信息窗口位置.
                        $massageShade = $("#popShade"); // 是否有遮罩层.
                    if($massageShade.length > 0){
                        $popupMassage
                            .animate({"top":coord.y, "opacity":0}, "slow", function() {
                                $(this).css("display", "none");
                                $massageShade.fadeOut("fast");
                            });
                        return true;
                    }else {
                        $popupMassage
                            .animate({"top":coord.y, "opacity":0}, "slow", function() {
                                $(this).css("display", "none");
                            });
                        return true;
                    }
                };
            $cloneBtn.one("click", closeMassage);  //委托关闭按钮事件.
            return openMassage();
        },
        /**
         * 网站共用弹出框登录提交.
         */
        popLogin: function(options) {
            /* 配置参数. */
            $.extend({
                popupid: "", // 弹出框ID.
                jsonp: false, // 是否跨域提交.
                callback: null // 回调函数.
            },options);
            var $popupMassage = $(options.popupid), // 缓存弹出框.
                $userinput = $popupMassage.find("[data-name]"), // 缓存输入框.
                $username = $popupMassage.find("[data-user]"), // 用户名.
                $password = $popupMassage.find("[data-password]"), // 密码.
                $submitbtn = $popupMassage.find("[data-submit]"), // 缓存提交按钮.
                _url = $popupMassage.find("[data-url]").val(), // 缓存提交地址.
                $clonebtn = $popupMassage.find("[data-close]"), // 缓存关闭按钮.
                _label = $popupMassage.find("[data-label]");
            /**
             * 获取焦点和失去焦点事件.
             */
            $userinput.focus(function() {
                var $label = $(this).parents("li").find("[data-label]"), // 输入框提示.
                    $errorMassage = $(this).parents("li").find("[data-error]"); // 缓存错误信息.
                $label.hide();
                $errorMassage.hide();
            }).blur(function() {
                var val = $(this).val(),
                    $label = $(this).parents("li").find("[data-label]"), // 输入框提示.
                    $errorMassage = $(this).parents("li").find("[error-message]"); // 缓存错误信息.
                if(val == ""){
                    $label.show();
                }
            });
            _label.on("click",function() {
                $(this).parents("li").find("input").focus();
            });
            $submitbtn.on("click",function() {
                var userdata = {
                        username:$username.val(),
                        password:$password.val()
                    },
                    nameError = $username.parents("li").find("[data-error]"),
                    passwordError = $password.parents("li").find("[data-error]");
                if(options.jsonp == false) {
                    userdata = {
                        username:$username.val(),
                        password:$password.val(),
                        submit : 1
                    }
                    if(userdata.username == ""){

                        nameError.show().text("请输入用户名");
                        return false;
                    }
                    if(userdata.password == ""){
                        passwordError.show().text("请输入密码");
                        return false;
                    }
                    $.ajax({
                        url: _url+"/Login/logging",
                        type: "GET",
                        dataType: "json",
                        data: userdata,
                        success:function(data) {
                            //debugger;
                            var error = data.status,
                                msg = data.info;
                            if(error == "login_password_error"){
                                passwordError.show().text(msg);
                            }
                            if(error == "login_user_not_exist"){
                                nameError.show().text(msg);
                            }
                            if(error == "ok") {
                                location.reload(); // 刷新当前页面.
                            }
                        }
                    });
                }else {
                    $.ajax({
                        url: _url+"/Login/tasklogin",
                        type: "GET",
                        dataType: "jsonp", //jsonp跨域提交
                        data: userdata,
                        jsonp:"callback",
                        success:function(data) {
                            //登录失败返回
                            var dataError = data.msg,
                                dataSuccess = data.success;
                            if(dataError != "" && dataError != "密码不正确！"){
                                $username.parents("li").find("[data-error]").show().text(dataError);
                            }else if(dataError == "密码不正确！") {
                                console.log($password.parents("li").find("[data-error]").length);
                                $password.parents("li").find("[data-error]").show().text(dataError);
                            }
                            if(dataSuccess == true){
                                $username.parents("li").find("[data-error]").hide();
                                // 委托关闭事件.
                                $clonebtn.trigger("click");
                                location.reload(); // 刷新当前页面.
                            }
                        },
                        error: function() {
                            alert("登录失败");
                        }
                    });
                    return false;
                }
            });
            return this;
        },
        /**
         *  网站点击下载按钮，如果未登录则弹出登陆框让用户登录，登录完成后下载软件包.
         */
        downLogin: function(elem) {
            $.extend({
                downbtn: null,  // 下载按钮.
                downurl: "",   // 下载地址.
                type: 1 // 下载类型. 1为 单个推广包下载，2为合集包下载，3为静默合集包下载.
            },elem);
            var slef = $(this), // 缓存自身.
                url = elem.downurl, // 下载地址.
                haslogin = $.cookie("_name"), // 判断用户是否登录.
                uid = $.cookie('_userid'), // 用户ＩＤ．
                popup = $("#popup"), // 弹出框ID.
                $USERURL = $("#USERURL").val(); // 域名.
            if(elem.downbtn != null){
                slef = $(elem.downbtn);
            }
            slef.on("click",function() {
                if(typeof(haslogin) == undefined || !haslogin){
                    popup.load("../Popup/popup_login #popWrap",function(){
                        $(this).popupMeans({
                            popid: "#popWrap",
                            width: 460,
                            height: 300,
                            callback: function() {
                                /* 提交登录.*/
                                $(this).popLogin({
                                    popupid:"#popWrap",
                                    jsonp: true
                                });
                            }
                        });
                    });
                    return false;
                }
                if(url == ""){
                    switch(elem.type){
                        /* 单个软件包下载.*/
                        case 1:
                            return true;
                            break;
                        /* 合集包下载. */
                        case 2:
                            slef.attr('href', $USERURL + '/package/download/uid/' + uid).trigger("click");
                            return true;
                            break;
                        case 3:
                            slef.attr('href', $USERURL + '/package/download_static/uid/' + uid);
                            return true;
                            break;
                    }
                }else {
                    slef.attr('href', elem.url);
                    return true;
                }
            });
            return this;
        }
    });
})(jQuery);
