var hrefUrl;//wap
var hrefValue = window.location.href; //获取当前页面的地址
if(hrefValue.indexOf("wap.eastday.com") >= 0){hrefUrl=false;}
if(hrefValue.indexOf("listen.eastday.com") >= 0){hrefUrl=true;}

if(v!=2 && v!=1&&hrefUrl==false){document.write("<div class=\"pinglun font14 white\">相关文章</div><div class=\"main92 font14\"><div id=\"toutiao_container\"></div>");document.write("<script async  src='http://listen.eastday.com/css_two/eastday.min.js'><"+"/script>");document.write("<script"+">(readsByToutiao = window.readsByToutiao || []).push({id:'toutiao_container'})<"+"/script>");document.write("<div class=\"font18 blank1em\"></div></div>");}else if(v!=2 && v!=1&&hrefUrl){document.write("<div class=\"xgxw\">");document.write("<script src='http://xxxw.listen.eastday.com/RelationWebDemo/HLRes/prolongation2.js' charset='utf-8'><"+"/script>");document.write("</div>");}else{document.write("<div class=\"xgxw\">");document.write("<script src='http://xxxw.listen.eastday.com/RelationWebDemo/HLRes/prolongation.js' charset='utf-8'><"+"/script>");document.write("</div>");}