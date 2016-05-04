Array.prototype.contains = function(item){
    return RegExp(item).test(this);
};
function _getAdidByQid(qid){
	/*var adIdArr = ['565295','565294'],	// 广告ID数组，第一个为默认渠道ID
		qidArr = [
			['wy001', 'wy002', 'wy013', 'wy017', 'wy020', 'wy021', 'wy022', 'wy036', 'wy037', 'wy063', 'wy083', 'wy084', 'chenz', 'gsllq', 'mbzm'],
			['pgzs', 'waitui002', 'waitui003', 'waitui004', 'waitui005', 'waitui006', 'waitui007', 'waitui008', 'waitui009', 'waitui010', 'waitui011', 'waitui012', 'waitui013', 'waitui014', 'waitui015', 'waitui016', 'waitui017', 'waitui018', 'waitui019', 'waitui020']
		],	// 渠道ID数组
		len = adIdArr.length;
	if(qid){
		for (var i = 0; i < len; i++) {
			if(qidArr[i].contains(qid)){
				return adIdArr[i];
			}
		}
	}
	return adIdArr[0];*/

	if(qid){
		if(qid.indexOf('pgzs') >= 0 || qid.indexOf('waitui') >= 0){
			return '576725';
		}
	}
	return '576724';
}
// 存储广告ID，方便iframe中子页面获取。(tt_news_mid: 未经过m021处理的渠道ID。)
document.write('<input type="hidden" value="' + _getAdidByQid(tt_news_mid) + '" id="J_ad_sogou_id"></input>');
