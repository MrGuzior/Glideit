(function main(){
	canvas = document.querySelector("canvas");
	canvas.width = 1280;
	canvas.height = 600;
	c = canvas.getContext("2d");
	cloud = new Image() ;
	bg = new Image();
	gliderRight = new Image();
	gliderLeft = new Image();
	cloud.src = "cloud.png";
	bg.src = "background.png";
	gliderRight.src = "gliderright.png";
	gliderLeft.src = "gliderleft.png";

	background = new Background(bg);

	glider = new Glider(gliderPositionX, gliderStartY, gliderPaceY, cloudWidth, cloudHeigth, cloudCount);

	airport = new Airport(airportPosition,canvas.height - 3, paceX, gliderPositionX, airportLength);

	turnpoint = new Turnpoint(turnpointPosition, 100, paceX, gliderPositionX, "red", "green");

	startLine = new Turnpoint(startlinePosition, 100, paceX, gliderPositionX, "green", "#ffffff00");

	displayTimer = new drawTimer();

	(function init(){
		thermalArray = [];
		var sum = 0;
		for (var i = 0; i < cloudCount; i++) {		
			ts = randomFloatFromRange(minThermalStrength, maxThermalStrength);
			thermalArray.push(new Thermal
				(thermalSeparation[i], cloudPositionY, paceX, cloudWidth, cloudHeigth, cloudCount, ts));
		}
	})();

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

	function Glider(x, y, dy, tw, th, ta){
		this.x = x;
		this.y = y;
		this.dy = dy;
		this.xx = 125;
		this.yy = 30;
		this.ta = ta;
		this.thermal = {
			width:  tw,
			ammount: ta
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

	function drawTimer(){
		this.update = function(){
			if(flightStarted){
				c.font = "40px Arial";
				c.fillStyle = "#000";
				c.fillText(timerMinutes + " : " + timerSeconds + " : " + timerMilliseconds, 20, 50);
			}
		}
	}

	(function init(){
		//thermal;
		thermalArray = [];
		var sum = 0;
		for (var i = 0; i < cloudCount; i++) {		
			ts = randomFloatFromRange(minThermalStrength, maxThermalStrength);
			//ty = randomIntFromRange(minCloudPositionY, maxCloudPositionY);
			thermalArray.push(new Thermal
				(thermalSeparation[i], cloudPositionY, paceX, cloudWidth, cloudHeigth, cloudCount, ts));
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
		displayTimer.update();
		glider.update();
		airport.update();
		turnpoint.update();
		startLine.update();
		startScore();
		
	})();

	function reload(){
		if (airport.finish) {
			stop();
			let scoreArray = localStorage.getItem("score") ? JSON.parse(localStorage.getItem("score")) : [];
			calcScore(score, flightSeconds, flightMinutes, cloudCount, startlinePosition, turnpointPosition);
			scoreArray.push(totalScore);
			localStorage.setItem("score", JSON.stringify(scoreArray));
			scoreArray.sort(function(a,b){return b-a});
			window.alert("You made it!\nYour score: " + totalScore +
			 " points\nHighscores:\n" + scoreArray.map(function(num,index)
				{return index + 1 + ". " + num.toString()}).join("\n"));
			location.reload();
		}
		if (glider.lnd && !airport.finish) {
			stop();
			calcScore(score, flightSeconds, flightMinutes, cloudCount, startlinePosition, turnpointPosition);
			window.alert("Outlanding, try again! ");
			location.reload();
		}
	}
	function startScore(){
		if (startLine.x < gx && !flightStarted) {
			flightStarted = true;
			start();
		}
	}

	function calcScore(score, fs, fm, ta, tsl, tp){
		this.sc = score;
		this.s = fs;
		this.m = fm;
		this.tsSum = 0;
		this.ta = ta;
		this.tp1 = tsl;
		this.tp2 = tp;

			this.dst = (this.tp2-this.tp1)*2; //Distance 10K px = 10kmIsh
			this.sc = parseInt(this.s) + (parseInt(this.m) * 60); //Time in seconds
			this.spd = this.dst / this.sc;
			totalScore = ((this.spd * 1200)/50).toFixed(0);
	}