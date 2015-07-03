
var canvas = $('canvas')[0];
var width = canvas.width;
var height = canvas.height;
var ctx = canvas.getContext('2d');

var num = 200;

var max = 100;
var min = 10;
var speed = 10;

var box = [];
for(var i = 0;i < num;i++) {
	var color = [];
	var size = Math.random() * max + min;

	for(var j = 0;j < 3;j++) {
		color[j] = Math.floor(Math.random() * 255);
	}
	box[i] = {
		x: Math.random() * width,
		y: Math.random() * -height - (size + max),
		width: Math.random() * max + min,
		height: Math.random() * max + min,
		radian: (Math.random() * 180) * Math.PI / 180,
		color: [color[0], color[1], color[2]],
		opacity: Math.random(),
		speed: 1 + Math.floor(Math.random() * speed)
	}
	drow(box[i], 0);
};

function drow(box, moveX) {
	ctx.setTransform(1,0,0,1,0,0);

	ctx.fillStyle = 'rgba(' + box.color[0] + ', '+ box.color[1] + ', ' + box.color[2] + ',' + box.opacity + ')';
	ctx.translate(
		box.x + box.width / 2,
		box.y + box.height / 2 + moveX
	);
	ctx.rotate(box.radian);
	ctx.fillRect(
		box.width / -2,
		box.height / -2,
		box.width,
		box.height
	);
}

	var direction = 'y';
	var directionStr = direction === 'y' ? 'top' : 'left';
	function info() {
		var dstr = directionStr.charAt(0).toUpperCase() + directionStr.substring(1),
			scrollNum = $(window)['scroll' + dstr](),
			windowWidth = (!(window.innerWidth)) ? document.documentElement.clientWidth : window.innerWidth,
			windowHeight = (!(window.innerHeight)) ?  document.documentElement.clientHeight : window.innerHeight;

		return {
			scrollNum: scrollNum,
			windowWidth: windowWidth,
			windowHeight: windowHeight
		};
	};


	$(window).bind("resize",function(){
	});

	$(window).scroll(function(){
		ctx.setTransform(1,0,0,1,0,0);
		ctx.clearRect(0, 0, width, height);
		for(var i = 0;i < box.length;i++) {
			drow(box[i], info().scrollNum * box[i].speed);
		};
	});