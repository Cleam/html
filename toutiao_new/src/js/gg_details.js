/**
 * 详情页广告JS
 * @deps global.js
 * @author  lizhigao(lizhigao@021.com)
 * @date 2016-06-03
 */
// 创建一个Et命名空间
GLOBAL.namespace('Et');

GLOBAL.Et.ggData = {}


// 缓存用户id
GLOBAL.Et.uid = Cookies.get('user_id');
if(!GLOBAL.Et.uid) {
	GLOBAL.Et.uid = (+new Date()) + Math.random().toString(10).substring(2, 6);
	Cookies.set('user_id', GLOBAL.Et.uid, { expires: 365, path: '/', domain: 'eastday.com'});
}
// 缓存渠道ID
GLOBAL.Et.qid = GLOBAL.Util.getQueryString('qid') || Cookies.get('qid');
if(GLOBAL.Et.qid){
	Cookies.set('qid', GLOBAL.Et.qid, { expires: 3, path: '/', domain: 'eastday.com'});
}


