
function addtie(addsjs){
	
		$.ajax({
            url: "http://lyb.listen.eastday.com/wapindex/addTie",
            async:false,
			timeout:10000,
            dataType: "jsonp",
		    type:'post',
            data:{"finished":"1","idef":addsjs,"url":""},
		    error: function(){
			    //alert('请求失败');
			},
		    success: function(Result){
				if(Result == 1){
					alert('我们已收到您的留言，谢谢！东东将在后期陆续推出相关内容。');
				}else if(Result==2){
					alert('评论正在审核！')
				}else if(Result==0){
					alert('评论失败！');
				}
			},
        });
	
}

function inittie(nr,sjs){
	var eid = $.cookie('eid');
	if(eid == null){
		eid = Math.floor(Math.random() * 10000) + 1;
		
		$.cookie('eid',eid,{expires:-1,path:'/',domain:'eastday.com'});
	}
	$.ajax({
    	url:"http://lyb.listen.eastday.com/wapindex/initTie",
		type:'post',
		timeout:10000,
        dataType: "jsonp",
        data: { "ancestor_id": "-1","neirong":nr,"zhuid":$('#zhuid').val(),"slaveid":"-1","accessToken":"-1","userId":"-1","appId":"0003c","type":"1","idef":sjs,"eid":eid},
		success: function(Result){
			if(Result == true || Result == 1){
				addsjs = sjs;
				$("#liuyanban").val('');
				addtie(addsjs);
			}else{
				alert('评论失败！');
			}
		},
		error: function(){
			alert('网络繁忙，请稍后再试！')
		},		 
    });
}


$(document).ready(function(e){
	$("input[name='submit']").click(function(){
		var textarea = $.trim($("#liuyanban").val());
		
		if(textarea == '' || textarea == "请输入内容"){
			alert('请输入内容');
			return false;
		}	
		var nr  = "[title]"+$('title').html()+"[/title][text]"+textarea+"[/text]";
		var sjs = new Date().getTime()+'0003c';
		
		inittie(nr,sjs);
		//addtie();
		//alert(nr);
		//alert(sjs);
	});	
});
