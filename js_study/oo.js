/*
	封装
 */
+function(){
	// 构造函数模式（弊端：公用属性、方法存在内存浪费）
	function Car(name, color){
		this.name = name;
		this.color = color;
	}

	var baoma = new Car('baoma', 'white');
	var aodi = new Car('aodi', 'black');

	// console.log(baoma.constructor === Car);
	// console.log(aodi.constructor === Car);

	// console.log(baoma instanceof Car);
	// console.log(aodi instanceof Car);

	// （推荐）prototype模式（解决公用属性、方法内存浪费的问题。）
	function Car(name, color){
		this.name = name;
		this.color = color;
	}
	Car.prototype.drive = function() {
		console.log('drive car::', this.name);
	};

	var baoma2 = new Car('baoma', 'white');
	var aodi2 = new Car('aodi', 'black');

	// console.log(baoma2.drive == aodi2.drive);
	// baoma2.drive();
	// aodi2.drive();
}();

/*
	构造函数继承
 */
+function(){
	function Animal(name){
		this.type = 'animal';
		this.name = name;
	}

	Animal.prototype.eat = function(something) {
		console.log('eat::', something);
	};
	Animal.prototype.sleep = function() {
		console.log(this.name + ' sleep!');
	};

	/**
	 * 利用空对象作为中介的构造函数继承
	 * @param  {[type]} Child  [description]
	 * @param  {[type]} Parent [description]
	 * @return {[type]}        [description]
	 */
	function extend(Child, Parent){
		var F = new Object();
		F.prototype = Parent.prototype;
		Child.prototype = new F();
		Child.prototype.constructor = Child;
		Child.uber = Parent.prototype;
	}

	/**
	 * 构造函数的拷贝继承
	 * @param  {[type]} Child  [description]
	 * @param  {[type]} Parent [description]
	 * @return {[type]}        [description]
	 */
	function extendByCopy(Child, Parent){
		var p = Parent.prototype;
		var c = Child.prototype;
		for(var i in p){
			c[i] = p[i];
		}
		c.uber = p;
	}
}();

// =========================分割线==========================

/*
	非构造函数的继承
 */
var Computer = {
	type: 'computer',
	arr: ['aaa','bbb', 'ccc'],
	work: function(){
		console.log('Computer work!');
	}
}

/**
 * 非构造函数的拷贝继承(浅拷贝)
 * @param  {[type]} p [description]
 * @param  {[type]} c [description]
 * @return {[type]}   [description]
 */
function extendByShallowCopy(p, c){
	var c = c || {};
	for(var i in p){
		c[i] = p[i];
		// console.log(i, c[i]);
	}
	return c;
}

/**
 * 非构造函数的拷贝继承(深拷贝)
 * @param  {[type]} p [description]
 * @param  {[type]} c [description]
 * @return {[type]}   [description]
 */
function extendByDeepCopy(p, c){
	var c = c || {};
	for(var i in p){
		if(typeof p[i] === 'object'){
			c[i] = (p[i].constructor === Array) ? [] : {};
			extendByDeepCopy(p[i], c[i]);
		} else {
			c[i] = p[i];
		}
	}
	return c;
}

// var lenovo = extendByShallowCopy(Computer, {
// 	name: 'lenovo',
// 	arr: ['lenovo']
// });
// // console.log(lenovo.work());

// lenovo.arr.push('lenovo');
// console.log(lenovo.arr);	// [ 'aaa', 'bbb', 'ccc', 'lenovo' ]
// console.log(Computer.arr);	// [ 'aaa', 'bbb', 'ccc', 'lenovo' ]

var dell = extendByDeepCopy(Computer, {
	name: 'dell',
	arr: ['ddd']
});
dell.arr.push('dell');
console.log(dell.arr);	// [ 'aaa', 'bbb', 'ccc', 'dell' ]
console.log(Computer.arr);	// [ 'aaa', 'bbb', 'ccc' ]










