//选项卡
var $J_btn=$("#J_tab_btn").children(".title"),
    $JtabJunqing=$(".section-two .content-l").children(".J-tab-junqing"),
    index;
$JtabJunqing.css({display:"none"});
$JtabJunqing.eq(0).css({display:"block"});
$J_btn.click(function (e) {
    e.preventDefault();
    index=$(this).index();
    $(this).addClass("active").siblings().removeClass("active");
    $JtabJunqing.css({display:"none"});
    $JtabJunqing.eq(index).css({display:"block"});
})



