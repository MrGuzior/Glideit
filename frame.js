	function randomFloatFromRange(min, max){
		return Math.random()* (max - min)+ min;
	}

	function randomIntFromRange(min, max){
		return Math.floor(Math.random()* (max - min + min))
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
		this.ac = "black";
		this.airport = false;

		this.draw = function(){
			c.fillStyle = this.ac;
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
