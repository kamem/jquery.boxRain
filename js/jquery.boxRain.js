
var canvas = $('canvas')[0];
var height = canvas.height;
var ctx = canvas.getContext('2d');

var num = 500;

var max = 80;
var min = 10;
var speed = 5;
var rotateSpeed = 0.01;

var direction = 'y';
var directionStr = direction === 'y' ? 'top' : 'left';

var box = [];
var info = windowInfo();
for(var i = 0;i < num;i++) {
	var color = [];
	var size = Math.random() * max + min;

	for(var j = 0;j < 3;j++) {
		color[j] = Math.floor(Math.random() * 255);
	}
	box[i] = {
		x: -max + Math.random() * (info.windowWidth + max),
		y: Math.random() * -height - (size + max),
		width: Math.random() * max + min,
		height: Math.random() * max + min,
		radian: (Math.random() * 180) * Math.PI / 180,
		color: [color[0], color[1], color[2]],
		opacity: Math.random()*0.5,
		rotateSpeed: (Math.floor(Math.random() * 2) === 1 ? -1 : 1) * Math.random() * rotateSpeed,
		speed: 1 + Math.random() * speed
	}
	drowRect(box[i], 0);
};

function drowTriangle(box, moveX, moveRotate) {
	ctx.setTransform(1,0,0,1,0,0);

	ctx.fillStyle = 'rgba(' + box.color[0] + ', '+ box.color[1] + ', ' + box.color[2] + ',' + box.opacity + ')';
	ctx.translate(
		box.x + box.width / 2,
		box.y + box.height / 2 + moveX
	);
	ctx.rotate(box.radian + moveRotate);

	ctx.beginPath();
	ctx.moveTo(box.width / 2, 0);
	ctx.lineTo(box.width, box.width);
	ctx.lineTo(0, box.width);
	ctx.closePath();
	ctx.fill();
}

function drowRect(box, moveX, moveRotate) {
	var info = windowInfo();
	ctx.setTransform(1,0,0,1,0,0);

	ctx.fillStyle = 'rgba(' + box.color[0] + ', '+ box.color[1] + ', ' + box.color[2] + ',' + box.opacity + ')';
	ctx.translate(
		box.x + box.width / 2 - ((initChanvasWidth - info.windowWidth) / 2),
		box.y + box.height / 2 + moveX
	);

	ctx.rotate(box.radian + moveRotate);
	ctx.fillRect(
		box.width / -2,
		box.height / -2,
		box.width,
		box.height
	);
}

function boxDrow() {
	var info = windowInfo();
	ctx.setTransform(1,0,0,1,0,0);
	ctx.clearRect(0, 0, info.windowWidth, height);
	for(var i = 0;i < box.length;i++) {
		drowRect(box[i], info.scrollNum * box[i].speed, info.scrollNum * box[i].rotateSpeed);
	};
}

function windowInfo() {
	var dstr = directionStr.charAt(0).toUpperCase() + directionStr.substring(1),
		scrollNum = $(window)['scroll' + dstr](),
		windowWidth = document.documentElement.clientWidth,
		windowHeight = document.documentElement.clientHeight;

	return {
		scrollNum: scrollNum,
		windowWidth: windowWidth,
		windowHeight: windowHeight
	};
};

canvas.width = windowInfo().windowWidth;
var initChanvasWidth = canvas.width;
$(window).bind("resize",function(){
	var info = windowInfo();
	canvas.width = info.windowWidth;
	boxDrow();
});

boxDrow();
$(window).scroll(function(){
	boxDrow()
});