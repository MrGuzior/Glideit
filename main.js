let canvas = document.querySelector("canvas");

canvas.width = 1280;
canvas.height = 600;

let c = canvas.getContext("2d");

let cloud = new Image() ;
cloud.src = "cloud.png";

let bg = new Image(); 
bg.src = "background.png";

let gliderRight = new Image();
gliderRight.src = "gliderright.png";

let gliderLeft = new Image();
gliderLeft.src = "gliderleft.png";

let tx = 700;
let ty = -70;
let tw = 320;
let th = 320;
let dx = 3;//3
let gdy = 0.5;//0.5
let gx = (canvas.width / 2) - 25;
let gy = 200;
let ta = 10; //Thermal ammount
let minTs = 0.6;//Thermal strenght
let maxTs = 1.3;
let ts; //Thermal strenght
let al = 300; //Airport lenght
let ap = gx; //Airport posinion
let tp = 7000;

let background = new Background(bg);

let glider = new Glider(gx, gy, gdy, tw, ts);

let airport = new Airport(ap,canvas.height - 3, dx, gx, al);

let turnpoint = new Turnpoint(tp, 100, dx, gx);

let thermalArray = [];

let thermalSeparation = [1000, 1700, 2400, 3100, 3700, 4300, 4800, 5500, 6200, 7400];

addEventListener('keydown', checkKeyPress);
addEventListener('click', checkKeyPress);

function checkKeyPress(){
		for (var i = 0; i < thermalArray.length; i++) {
			thermalArray[i].key = true;
			airport.key = true;
			turnpoint.key = true;
			background.key = true;
			glider.key = true;
		}	
}

function randomFloatFromRange(min, max){
	return Math.random()* ((max - min) + min);
}

function randomIntFromRange(min, max){
	return Math.floor(Math.random()* (max - min + min))
}

function Thermal(x, y, dx, xx, yy, ta, ts){
	this.x = x;
	this.y = y;
	this.dx = dx;
	this.xx = xx;
	this.yy = yy;
	this.ta = ta;
	this.ts = ts;
	
	this.draw = function(){
		/*c.fillStyle = "white";
		c.stroke();
		c.fillRect(this.x,this.y, this.xx, this.yy)*/
		c.drawImage(cloud, this.x, this.y, this.xx, this.yy);
	}

	this.update = function(){
		
		if (this.key) {
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
	this.xx = 125;
	this.yy = 30;
	this.thermal = {
		width:  tw,
		ammount: ta,
		strenght: ts 
	};
	this.lnd = false;
	this.right = gliderRight;
	this.left = gliderLeft;
	this.val = 1;

	this.draw =function (){
		//c.fillStyle = "white";
		//c.stroke();
		//c.fillRect(this.x,this.y, this.xx, this.yy)
		c.drawImage(this.drc, this.x, this.y,this.xx,this.yy);
	}
	
	this.update = function(){
		//Landing
		if (this.y + this.yy > canvas.height) {
			this.y = canvas.height - this.yy;
			this.dy = this.dy - this.dy;
			this.lnd = true;
		}			
		//Thermaling up
		for (var i = 0; i < thermalArray.length; i++) {
			if (thermalArray[i].x <= this.x &&
			 thermalArray[i].x + (this.thermal.width - this.xx)>= this.x &&
			 this.lnd == false) {
				this.y -= this.dy + thermalArray[i].ts;
			//console.log(thermalArray[i].ts);
			}
		}
		if (this.key) {
			this.val = -this.val;
			this.key = false;
		}
		if (this.val == -1) {
			this.drc = this.left;
		}
		if (this.val == 1) {
			this.drc = this.right;
		}

			this.draw();
			this.y += this.dy;
	}
}

function Airport(x,y, dx, gx, al){
	this.x = x;
	this.y = y;
	this.xx = al;
	this.yy = 3;
	this.dx = dx;
	this.gx = gx;
	this.al = al;
	this.finish = false;

	this.draw = function(){
		c.fillStyle = "black";
		c.stroke();
		c.fillRect(this.x, this.y, this.xx, this.yy)
	}

	this.update = function(){

		if (this.key) {
			this.dx = -this.dx;
			this.key = false;
		}

		if (this.x <= this.gx &&
			this.x + this.al / 2 >= this.gx - glider.xx/2 && glider.lnd && turnpoint.tp) {		
			this.finish = true;
					
		}
		if (glider.lnd == false) {
			this.x -= this.dx;
		}
		this.draw();
	}
}

function Background(bg){
	this.x = -1280;
	this.y = 0;
	this.xx = canvas.width;
	this.yy = canvas.height;
	this.dx = 0.7;
	this.bg = bg;

	this.update = function(){
		c.drawImage(this.bg, this.x, this.y);

		if (this.key) {
			this.dx = -this.dx;
			this.key = false;
		}

		if (glider.lnd == false) {
			this.x -= this.dx;
		}

		if (this.x <= -this.xx*2) {
			this.x = -this.xx;
		}

		if (this.x >= 0) {
			this.x = -this.xx;
		}
	}
}

function Turnpoint(x,y, dx, gx){
	this.x = x;
	this.y = y;
	this.xx = 1;
	this.yy = 400;
	this.dx = dx;
	this.gx = gx;
	this.tp = false;

	this.draw = function(){
		c.fillStyle = "red";
		c.stroke();
		c.fillRect(this.x, this.y, this.xx, this.yy)
	}

	this.update = function(){
		if (this.key) {
			this.dx = -this.dx;
			this.key = false;
		}

		if (this.x <= this.gx) {
			this.tp = true;
			console.log("Turned");
		}

		if (glider.lnd == false) {
			this.x -= this.dx;
		}
		this.draw();
	}
}

(function init(){
	//thermal;
	thermalArray = [];
	for (var i = 0; i < ta; i++) {		
		ts = randomFloatFromRange(minTs, maxTs);	
		thermalArray.push(new Thermal
			(thermalSeparation[i], ty, dx, tw, th, ta, ts));
	}
	glider;
	airport;
	turnpoint;
})();

(function animate(){
	c.clearRect(0,0,innerWidth, innerHeight);
	background.update();
	switch(airport.finish){
		case true: cancelAnimationFrame(animate);
					reload();
		break;
		default: requestAnimationFrame(animate);
	}		
	for (var i = 0; i < thermalArray.length; i++) {
		thermalArray[i].update();
	}
	glider.update();
	airport.update();
	turnpoint.update();
})();

function reload(){
	if (airport.finish) {
		window.alert("You made it!");
		location.reload();
	}
}

//console.log(thermalArray);


//////////////////////////


//convert cos to 360 degrees Math.PI/180
