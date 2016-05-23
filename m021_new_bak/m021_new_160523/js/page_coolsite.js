/**
 * 关键词高亮处理（递归算法）
 * @param  {String} txt   标题
 * @param  {Array} swArr  关键词数组(字符串)
 * @param  {Number} i     0
 * @return {String}       新的标题
 */
function getNewStr(txt, swArr, i){
    var scope = this;
    if(txt && swArr && swArr.length){
        var len = swArr.length;
        swArr.sort(function(a, b){
            return b.length - a.length;
        });
        if(!i){i = 0;}
        if(i == len || swArr[i] == '..'){
            return txt;
        } else {
            var reg = new RegExp(swArr[i], 'gi');
            var tempTxt = txt;
            var subTxtIndex = tempTxt.toLowerCase().indexOf(swArr[i].toLowerCase());
            var subTxt = txt.substring(subTxtIndex, subTxtIndex + swArr[i].length);
            return scope.getNewStr(txt.replace(reg, '<em>' + subTxt + '</em>'), swArr, ++i);
        }
    } else {
        return '';
    }
}
/**
 * 更新搜索关键字
 * @param  {[type]} wd 搜索关键字
 * @return {[type]}    [description]
 */
function changeWord(wd){
    $('#J_search_input').val(wd);
}
/**
 * 百度搜索数据（必需是在全局环境下）
 * @param  {[type]} json [description]
 * @return {[type]}      [description]
 */
function bdSearch(json){
    var k = json['q'],
        sd = json['s'],
        len = sd.length > 5 ? 5 : sd.length,
        $srList = $searchResult.children('.search-result-list');
    if(len == 0){return;}
    $srList.empty();
    for (var i = 0; i < len; i++) {
        var str = getNewStr(sd[i], [k]);
        $srList.append('<li class="search-result-item"><a href="https://m.baidu.com/s?word=' + sd[i] + '&ie=utf-8&from=1013634c">' + str + '</a><div class="ttp" onclick="changeWord(\'' + sd[i] + '\');"></div></li>');
    }
    $searchResult.show();
}

$(function(){
    var $searchInput = $('#J_search_input'),
        $searchClear = $('#J_search_clear');
        $searchResult = $('#J_search_result'),
        $closeSearchResult = $('#J_close_search_result');

    var fillUrls = function(){
        var wd = $.trim($searchInput.val());
        if(!wd){
            return;
        }
        var qsData = {
            'wd': wd,
            'p': '3',
            'ie': 'utf-8',
            'json': '1',
            'from': '1013634c',
            'cb': 'bdSearch'
        };
        $.ajax({
            async: false,
            url: "http://m.baidu.com/su",
            type: "GET",
            dataType: 'jsonp',
            jsonp: 'jsoncallback',
            data: qsData,
            timeout: 5000,
            success: function (json) {},
            error: function (xhr) {}
        });
    };

    // 搜索框输入事件
    $searchInput.on('keyup', function(){
        if($.trim($searchInput.val()) !== ''){
            $searchClear.show();
            fillUrls();
        } else {
            $searchClear.hide();
            $searchResult.hide();
        }
    });
    // 搜索框清空按钮点击事件
    $searchClear.on('click', function(e){
        $searchInput.val('');
        $searchClear.hide();
        $searchResult.hide();
        e.preventDefault();
    });
    // 搜索提示列表关闭按钮点击事件
    $closeSearchResult.on('click', function(e){
        $searchResult.hide();
        e.preventDefault();
    });
});