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

	console.log(baoma.constructor === Car);
	console.log(aodi.constructor === Car);

	console.log(baoma instanceof Car);
	console.log(aodi instanceof Car);


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

	console.log(baoma2.drive == aodi2.drive);
	baoma2.drive();
	aodi2.drive();
}();


/*
	继承
 */
function Animal(name){
	this.name = name;
}

Animal.prototype.eat = function(something) {
	console.log('eat::', something);
};
Animal.prototype.sleep = function() {
	console.log(this.name + ' sleep!');
};



function extend(Child, Parent){
	var F = new Object();
	F.prototype = Parent.prototype;
	Child.prototype = new F();
	Child.prototype.constructor = Child;
	Child.uber = Parent.prototype;
	return Child;
}
















