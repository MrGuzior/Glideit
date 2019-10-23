	function randomFloatFromRange(min, max){
		return Math.random()* (max - min)+ min;
	}

	function randomIntFromRange(min, max){
		return Math.floor(Math.random()* (max - min + min))
	}

	function drawTimer(){
		this.update = function(){
			if(flightStarted){
				c.save();
				c.font = "40px Arial";
				c.fillText(timerMinutes + " : " + timerSeconds + " : " + timerMilliseconds, 20, 50);
				c.restore();
			}
		}
	}

	function Thermal(x, y, dx, xx, yy, ta, ts, ws, wd){
		this.x = x;
		this.y = y;
		this.dx = dx;
		this.xx = xx;
		this.yy = yy;
		this.ta = ta;
		this.ts = ts;
		this.ws = ws;
		this.wd = wd;
		
		this.draw = function(){
			c.save();
			c.drawImage(cloud, this.x, this.y, this.xx, this.yy);
			c.restore();
		}

		this.update = function(){
			if (this.key) {
				this.dx = -this.dx;
				this.key = false;
			}

			if (!glider.lnd) {
				if (this.wd == 1) {
				this.x -= this.dx + this.ws;
				}else{
				this.x -= this.dx - this.ws;
				}
			}			
				this.draw();
		}
	}

	function Glider(x, y, dy, tw, th, ta, ws, wd, tha){
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
		this.tw = tw;
		this.th = th;
		this.ws = ws;
		this.wd = wd;
		this.td = ((this.y-this.th)*this.ws*1.5);
		this.tha = tha;

		this.draw = function (){
			c.save();
			c.drawImage(this.drc, this.x, this.y,this.xx,this.yy);
			c.restore();
			
		}

		this.update = function(){

			if (this.y + this.yy > canvas.height) {
				this.y = canvas.height - this.yy;
				this.dy = this.dy - this.dy;
				this.lnd = true;
			}		

			for (var i = 0; i < this.tha.length; i++) {
				if (this.wd == 1) {
					if (this.tha[i].x + this.td <= this.x&&
					 this.tha[i].x  + (this.thermal.width - this.xx) + this.td >= this.x&&
					 this.lnd == false) {
					 this.y -= this.dy + this.tha[i].ts;

						if (this.tha[i].y >= this.y- this.th) {
							this.y = this.dy - this.tha[i].ts + this.th;
						}
					}
				}else{
					if (this.tha[i].x - this.td <= this.x&&
					 this.tha[i].x - this.td + (this.thermal.width - this.xx)>= this.x&&
					 this.lnd == false) {
					 this.y -= this.dy + this.tha[i].ts;

						if (this.tha[i].y >= this.y- this.th) {
							this.y = this.dy - this.tha[i].ts + this.th;
						}
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

		this.scale = function(){
			for (var i = 0; i < cloudCount; i++){
					this.tha[i].xx = this.tw;
					this.tha[i].yy = this.th;
						this.tha[i].xx -= ((this.y-canvas.height-this.yy)+this.tw)*1.3;
						this.tha[i].yy -= ((this.y-canvas.height-this.yy)+this.tw)*0.8;
				}
			}

			if(this.y < 450 && this.y > 255){
				this.scale();
			}
		}
	}

	function Airport(x,y, dx, gx, al, ws, wd){
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
		this.ws = ws;
		this.wd = wd;
		this.imgX;

		this.draw = function(){
			c.save();
			c.drawImage(this.img, this.imgX, this.y, 50, -53);
			c.fillStyle = this.ac;
			c.stroke();
			c.fillRect(this.x, this.y, this.xx, this.yy);
			c.restore();

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
				if (this.wd == 1) {
				this.x -= this.dx + this.ws;
				}else{
				this.x -= this.dx - this.ws;
				}
			}

			if (this.wd == 1) {
				this.img = windsockright;
				this.imgX = this.x;
			}else{
				this.img = windsockleft;
				this.imgX = this.x - 30;
			}
			
			this.draw();
		}
	}

	function Background(bg, ws, wd){
		this.bg = bg;
		this.x = -1280;
		this.y = -canvas.height/2;
		this.xx = canvas.width;
		this.yy = canvas.height;
		this.dx = 0.7;
		this.ws = ws;
		this.wd = wd;

		this.update = function(){
			c.save();
			c.drawImage(this.bg, this.x, this.y, this.bg.width*1.5, this.bg.height*1.5);
			c.restore();
			if (this.key) {
				this.dx = -this.dx;
				this.key = false;
			}
			if (!glider.lnd) {
				if (this.wd == 1) {
				this.x -= this.dx + this.ws + this.dx;
				}else{
				this.x -= this.dx - this.ws + this.dx;
				}
			}	

			if (this.x <= -this.xx*2) {
				this.x = -this.xx + this.xx/2;
			}

			if (this.x >= 0) {
				this.x = -this.xx - this.xx/2;
			}

			if (glider.y < 450 && glider.y > 255) {
				this.y = -canvas.height/2 + 387;
				this.y -= glider.y/1.2;
				airport.y = this.y + 885;
			}
		}
	}

	function Turnpoint(x,y, dx, gx, tc, tc2, ws, wd){
		this.x = x;
		this.y = y;
		this.xx = 1;
		this.yy = 400;
		this.dx = dx;
		this.gx = gx;
		this.tp = false;
		this.tc = tc;
		this.tc2 = tc2;
		this.ws = ws;
		this.wd = wd;

		this.draw = function(){
			c.save();
			c.fillStyle = this.tc;
			c.stroke();
			c.fillRect(this.x, this.y, this.xx, this.yy);
			c.restore();
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
				if (this.wd == 1) {
				this.x -= this.dx + this.ws;
				}else{
				this.x -= this.dx - this.ws;
				}
			}
			this.draw();
		}
	}

	function Button(x, y, xx, yy, str, img, fnt, clr, ajsX, ajsY, state){
		this.x = x;
		this.y = y;
		this.xx = xx;
		this.yy = yy;
		this.str = str;
		this.img = img;
		this.fnt = fnt;
		this.ajsY = ajsY;
		this.ajsX = ajsX;
		this.clr = clr;
		this.state = state;

		this.draw = function(){
			c.save();
			c.beginPath();
			c.rect(this.x, this.y, this.xx, this.yy);
			c.strokeStyle = this.clr;
			c.stroke();
			c.restore();
			c.save();
			c.font = this.fnt;
			c.fillText(this.str, this.x + this.ajsX, this.y + this.ajsY);
			c.restore();
		}

		this.update = function(){	
			this.draw();
			this.draw();
		}

		this.click = function(event){
			this.cx = event.pageX;
			this.cy = event.pageY;
			if (this.cx >= this.x && this.cx <= this.x + this.xx &&
				this.cy >= this.y && this.cy <= this.y + this.yy/* && this.state*/) {
					return true;
			}
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
