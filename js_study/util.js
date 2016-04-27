function Util(){
	this.name = 'util';
}

Util.prototype = {
	isArray: function(v){
		return Object.prototype.toString.call(v) === '[object Array]';
		// return v.constructor === Array;
	},
	isFunction: function(v){
		return Object.prototype.toString.call(v) === '[object Function]';
		// return v.constructor === Function;
	},
	isNumber: function(v){
		return typeof v === 'number';
	},
	isString: function(v){
		return typeof v === 'string';
	},
	isBoolean: function(v){
		return typeof v === 'boolean';
	},
	isEmpty: function(v){
		v = this.isString(v) ? this.trim(v) : v;
		return v !== 0 && !v;
	},
	trim: function(str){
		return str.replace(/(^\s*)|(\s*$)/g, '');
	}
};

var arr = [],func = function(){}, num = 123, str = '222', bo = true, em = '   ';

var util = new Util();

console.log('Array::', util.isArray(arr));	// true
console.log('Function::', util.isFunction(func));	// true
console.log('Number::', util.isNumber(num));	// true
console.log('String::', util.isString(str));	// true
console.log('Boolean::', util.isBoolean(bo));	// true
console.log('Empty::', util.isEmpty(em));	// true
