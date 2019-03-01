
let canvas = document.querySelector("canvas");

canvas.width = 700;
canvas.height = 400;

let c = canvas.getContext("2d");

let tx = 700;
let ty = 100;
let tw = 150;
let th = 50;
let tdx = 3;
let gdx = 0.5;
let gx = (canvas.width / 2) - 25;
let gy = 200;
let ta = 9; //Thermal ammount
let minTs = 0.3;//Thermal strenght
let maxTs = 1;
let ts;//Thermal strenght
let al = 150; //Airport lenght
//let tSeperation = (i*distance + distance);

let glider = new Glider(gx, gy, gdx, tw, ts);

let airport = new Airport(6500,canvas.height - 3, tdx, gx, al);

let thermalArray = [];

let thermalSeparation = [700, 1700, 2200, 3000, 3600, 4100, 4500, 5300, 6000];

addEventListener('keydown', checkKeyPress);
addEventListener('click', checkKeyPress);

function checkKeyPress(){
		for (var i = 0; i < thermalArray.length; i++) {
			thermalArray[i].key = true;
			airport.key = true;
		}	
}

function randomFloatFromRange(min, max){
	return Math.random()* (max - min + min);
}

function randomIntFromRange(min, max){
	return Math.floor(Math.random()* (max - min + min))
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
	airport;
}

function Thermal( x, y, dx, xx, yy, ta, ts){
	this.x = x;
	this.y = y;
	this.dx = dx;
	this.xx = xx;
	this.yy = yy;
	this.ta = ta;
	this.ts = ts;

	this.draw = function(){
		c.fillStyle = "white";
		c.stroke();
		c.fillRect(this.x,this.y, this.xx, this.yy)	
		
	}

	this.update = function(){
		
		if (this.key === true) {
			this.dx = -this.dx;
			this.key = false;
		}
		//Stop rolling
		if (glider.lnd == false) {
			this.x -= this.dx;
		}		
		
			this.draw();
	}
}

function Glider(x, y, dy, tw, ts){
	this.x = x;
	this.y = y;
	this.dy = dy;
	this.xx = 50;
	this.yy = 15;
	this.thermal = {
		width:  tw,
		ammount: ta,
		strenght: ts 
	};
	this.lnd = false;

	this.draw = function (){
		c.fillStyle = "white";
		c.stroke();
		c.fillRect(this.x,this.y, this.xx, this.yy)
	}

	this.update = function(){
		//Landing
		if (this.y + 15 > canvas.height) {
			this.y = canvas.height - this.yy;
			this.dy = this.dy - this.dy;
			this.lnd = true;
		}			
		//Thermaling up
		for (var i = 0; i < thermalArray.length; i++) {
			if (thermalArray[i].x - this.thermal.width/2 < this.x &&
				thermalArray[i].x + this.thermal.width > this.x && this.lnd == false) {
				this.y -= this.dy + thermalArray[i].ts;
			}
		}
			this.y += this.dy;						
			this.draw();
	}
}

function Airport(x,y, dx, gx, al){
	this.x = x;
	this.y = y;
	this.xx = 150;
	this.yy = 3;
	this.dx = dx;
	this.gx = gx;
	this.al = al;

	this.draw = function(){
		c.fillStyle = "black";
		c.stroke();
		c.fillRect(this.x, this.y, this.xx, this.yy)
	}

	this.update = function(){

		if (this.key === true) {
			this.dx = -this.dx;
			this.key = false;
		}

		if (this.x <= this.gx && this.x + this.al / 2 >= this.gx && glider.lnd == true) {
			console.log("Welcome home!");
		}
		if (glider.lnd == false) {
			this.x -= this.dx;
		}
		this.draw();
	}
}

function animate(){
	requestAnimationFrame(animate);
	c.clearRect(0,0,innerWidth, innerHeight);
	for (var i = 0; i < thermalArray.length; i++) {
		thermalArray[i].update();
	}	
	glider.update();
	airport.update();	
}
init();
animate();
console.log(thermalArray);
