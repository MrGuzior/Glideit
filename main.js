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
/*
let level01 = new Level();
level01;
function Level(){
	*/
	//let tx = 700;//700
	let ty = 0;//0
	let minTy = 40;//40
	let maxTy = 70;//70
	let tw = 375; //375//Thermal width
	let th = 217; //217//Thermal height
	let dx = 3.5;//3.5//Glider speed, horisontal game speed
	let gdy = 0.52;//0.52//Glider sink rate
	let gx = (canvas.width / 2) - (125/2);//Glider start position
	let gy = 300;//200//Glider start position
	let ta = 16; //Thermal ammount
	let minTs = 0.6;//Thermal min strenght
	let maxTs = 1.4;//Thermal max strenght
	let ts; //Thermal strenght
	let al = 300; //Airport lenght
	let ap = gx-al; //Airport position
	let tp = 10000; //turnpoint position defoult 
	let tsl = 1000; //Startline position
	let fs = false; //flight started
	let fTime;
	let fMinutes;
	let fSeconds;
	let score = 0;
	let totScore;
	let totSec = 0;

	let background = new Background(bg);

	let glider = new Glider(gx, gy, gdy, tw, ts, th);

	let airport = new Airport(ap,canvas.height - 3, dx, gx, al);

	let turnpoint = new Turnpoint(tp, 100, dx, gx, "red", "green");

	let startLine = new Turnpoint(tsl, 100, dx, gx, "green", "#ffffff00");

	//let calc = new CalcScore(score, fSeconds, fMinutes, ta, tsl, tp);

	let thermalArray = [];

	let thermalSeparation1 = [-10000 ,-6000, 0, 1300, 2400, 3200, 3900, 4900, 5200, 5800, 6200, 7100, 8000];

	let thermalSeparation2 = [1300, 1800, 3000, 4000, 4500, 5000, 5100, 5400, 6000, 6400, 6900, 7300, 8000, 8500, 9000, 10000];

	let thermalSeparation3 = [700, 2700, 3000, 4500, 6500, 6700, 6900, 8000, 10000, 11000, 12000, 13000, 14000, 15000, 15000, 15000];

	let thermalSeparation = thermalSeparation3;

	addEventListener('keydown', checkKeyPress);
	addEventListener('touchstart',checkKeyPress);

	function checkKeyPress(){
			for (var i = 0; i < thermalArray.length; i++) {
				thermalArray[i].key = true;
				airport.key = true;
				turnpoint.key = true;
				background.key = true;
				glider.key = true;
				startLine.key = true;
			}	
	}

	function randomFloatFromRange(min, max){
		return Math.random()* (max - min)+ min;
	}

	function randomIntFromRange(min, max){
		return Math.floor(Math.random()* (max - min + min))
	}

	function Thermal(x, y, dx, xx, yy, ta, ts, ty){
		this.x = x;
		this.y = y;
		this.dx = dx;
		this.xx = xx;
		this.yy = yy;
		this.ta = ta;
		this.ts = ts;
		
		this.draw = function(){
			c.drawImage(cloud, this.x, this.y, this.xx, this.yy);
		}

		this.update = function(){
			//Reverse direction
			if (this.key) {
				this.dx = -this.dx;
				this.key = false;
			}
			if (!glider.lnd) {
				this.x -= this.dx;
			}			
				this.draw();
		}
	}

	function Glider(x, y, dy, tw, ts, th){
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
		this.th = th;

		this.draw = function (){
			c.drawImage(this.drc, this.x, this.y,this.xx,this.yy);
		}

		this.update = function(){

			if (this.y + this.yy > canvas.height) {
				this.y = canvas.height - this.yy;
				this.dy = this.dy - this.dy;
				this.lnd = true;
			}			

			for (var i = 0; i < thermalArray.length; i++) {
				if (thermalArray[i].x <= this.x &&
				 thermalArray[i].x + (this.thermal.width - this.xx)>= this.x &&
				 this.lnd == false) {
				 this.y -= this.dy + thermalArray[i].ts;

					if (thermalArray[i].y >= this.y- this.th) {
						this.y = this.dy - thermalArray[i].ts + this.th;
					}

				}
			}//Reverse direction
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
		this.ac = "black";
		this.airport = false;

		this.draw = function(){
			c.fillStyle = this.ac;
			c.stroke();
			c.fillRect(this.x, this.y, this.xx, this.yy)
		}

		this.update = function(){
			//Reverse direction
			if (this.key) {
				this.dx = -this.dx;
				this.key = false;
			}

			if (this.x <= this.gx &&
				this.x + this.al / 2 >= this.gx - glider.xx/2 && glider.lnd && turnpoint.tp) {		
				this.finish = true;
				this.ac = "green";
			}

			if (this.x <= this.gx &&
				this.x + this.al / 2 >= this.gx - glider.xx/2 && glider.lnd && !turnpoint.tp) {		
				this.airport = true;
				this.ac = "red";
			}

			if (!glider.lnd) {
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
			//Reverse direction
			if (this.key) {
				this.dx = -this.dx;
				this.key = false;
			}

			if (!glider.lnd) {
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

	function Turnpoint(x,y, dx, gx, tc, tc2){
		this.x = x;
		this.y = y;
		this.xx = 1;
		this.yy = 400;
		this.dx = dx;
		this.gx = gx;
		this.tp = false;
		this.tc = tc;
		this.tc2 = tc2;

		this.draw = function(){
			c.fillStyle = this.tc;
			c.stroke();
			c.fillRect(this.x, this.y, this.xx, this.yy)
		}

		this.update = function(){
			//Reverse direction
			if (this.key) {
				this.dx = -this.dx;
				this.key = false;
			}

			if (this.x <= this.gx) {
				this.tp = true;
				this.tc = this.tc2;
			}

			if (!glider.lnd) {
				this.x -= this.dx;
			}
			this.draw();
		}
	}

	(function init(){
		//thermal;
		thermalArray = [];
		var sum = 0;
		for (var i = 0; i < ta; i++) {		
			ts = randomFloatFromRange(minTs, maxTs);
			console.log(ts);
			//ty = randomIntFromRange(minTy, maxTy);
			thermalArray.push(new Thermal
				(thermalSeparation[i], ty, dx, tw, th, ta, ts));
		}
	})();

	(function animate(){
		c.clearRect(0,0,innerWidth, innerHeight);
		background.update();
		if (airport.finish && glider.lnd) {
			cancelAnimationFrame(animate);
						reload();
					}else if (!airport.finish && glider.lnd){
						cancelAnimationFrame(animate);
						reload();
					} else {
						requestAnimationFrame(animate);
					}
		for (var i = 0; i < thermalArray.length; i++) {
			thermalArray[i].update();
		}
		glider.update();
		airport.update();
		turnpoint.update();
		startLine.update();
		startScore();
	})();

	function reload(){
		if (airport.finish) {
			stop();
			calcScore(score, fSeconds, fMinutes, ta, tsl, tp);
			window.alert("You made it! " + totScore);
			location.reload();
		}
		if (glider.lnd && !airport.finish) {
			stop();
			calcScore(score, fSeconds, fMinutes, ta, tsl, tp);
			window.alert("Outlanding, try again! ");
			location.reload();
		}
	}
	function startScore(){
		if (startLine.x < gx && !fs) {
			fs = true;
			start();
		}
	}

	function calcScore(score, fSeconds, fMinutes, ta, tsl, tp){
		this.sc = score;
		this.s = fSeconds;
		this.m = fMinutes;
		this.tsSum = 0;
		this.ta = ta;
		this.tp1 = tsl; //startLine
		this.tp2 = tp; //turnpoint


			this.dst = (this.tp2-this.tp1)*2; //Distance 10K px = 10kmIsh
			this.sc = parseInt(this.s) + (parseInt(this.m) * 60); //Time in seconds
			this.spd = this.dst / this.sc;
			totScore = ((this.spd * 1200)/50).toFixed(0);

			console.log(this.dst);
			console.log(this.sc);
			console.log(this.spd);
			console.log(totScore);
	}