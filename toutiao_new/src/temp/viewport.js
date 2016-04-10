var vp, 
	metas = document.getElementsByTagName('meta'),
	ml = metas.length,
	i = 0;
for (i = 0; i < ml; i++) {
	if(metas[i].getAttribute('name') === 'viewport'){
		vp = metas[i];
		break;
	}
}
if(vp){
	if(window.screen.availWidth > 375){
		vp.setAttribute('content', 'width=device-width,initial-scale=1,maximum-scale=1,minimum-scale=1,user-scalable=no');
	} else {
		vp.setAttribute('content', 'width=device-width,initial-scale=0.5,maximum-scale=0.5,minimum-scale=0.5,user-scalable=no');
	}
}