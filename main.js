
var canvas = document.querySelector("canvas");

canvas.width = 700;
canvas.height = 400;

var c = canvas.getContext("2d");

var tx = 700;
var ty = 100;
var tw = 150; //Thermal width
var th = 50; //Thermal height
var tdx = 3;
var gdx = 0.5;
var gx = canvas.width / 2;
var gy = 200;
var ta = 9; //Thermal ammount
var minTs = 0.1;
var maxTs = 1;
var ts;//Thermal strenght

//var thermal = new Thermal(tx, ty, 2, tw, th);

var glider = new Glider(gx, gy, gdx, tw, ts);

var thermalArray = [];

var thermalSeparation = [700, 1700, 2200, 3000, 3600, 4100, 4500, 5300, 6000];

addEventListener('keydown', checkKeyPress, false);

function randomFloatFromRange(min, max){
	return Math.random()* (max - min + min);
}

function init(){
	//thermal;
	thermalArray = [];
	for (var i = 0; i < ta; i++) {		
		ts = randomFloatFromRange(minTs, maxTs);
		thermalArray.push(new Thermal
			(thermalSeparation[i], ty, tdx, tw, th, ta, ts));

	}
	glider;
}

function checkKeyPress(key){
	if (key.keyCode == "32") {
		for (var i = 0; i < thermalArray.length; i++) {
			thermalArray[i].key = true;
		}
	}
}

function Thermal( x, y, dx, tw, th, ta, ts){
	this.x = x;
	this.y = y;
	this.dx = dx;
	this.tw = tw;
	this.th = th;
	this.ta = ta;
	this.ts = ts;

	this.draw = function(){
		c.fillStyle = "blue";
		c.stroke();
		c.fillRect(this.x,this.y, this.tw, this.th)	
		
	}

	this.update = function(){
		//thermal return
		/*
		if (this.x + 100 < 0 && this.x + 100 > -3) {
			this.x = x;
		}
		*/
		
		if (this.key === true) {
			this.dx = -this.dx;
			this.key = false;
		}
		
		this.x -= this.dx;
		this.draw();
	}
	
}

function Glider(x, y, dy, tw, ts){
	this.x = x;
	this.y = y;
	this.dy = dy;
	this.tw = tw;
	this.ta = ta;
	this.ts = ts;

	this.draw = function (){
		c.fillStyle = "black";
		c.stroke();
		c.fillRect(this.x,this.y, 50, 15)
	}

	this.update = function(){
			
		//Landing
			if (this.y + 15 > canvas.height) {
				this.y = canvas.height - 15;
				this.dy = 0;
			}
		//Thermaling up
			
			for (var i = 0; i < thermalArray.length; i++) {
				if (thermalArray[i].x - this.tw/2 < this.x &&
					thermalArray[i].x + this.tw > this.x) {
					this.y -= this.dy + thermalArray[i].ts;

				}
			}
				this.y += this.dy;
			
			
			/*
			if (thermal.x + this.tw > this.x) {
				this.y += this.dy;
			}
			*/
			
		this.draw();
		//console.log(thermal.x);
	}
}
/*
Object.prototype.update = function (){
	this.draw();
}
*/



function animate(){
	requestAnimationFrame(animate);
	c.clearRect(0,0,innerWidth, innerHeight);
	for (var i = 0; i < thermalArray.length; i++) {
		thermalArray[i].update();
	}
	
	glider.update();
	
}
init();
animate();
console.log(thermalArray);
