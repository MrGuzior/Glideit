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

	(function init(){
		thermalArray = [];
		var sum = 0;
		windDirection = randomIntFromRange(0,2);
		for (var i = 0; i < cloudCount; i++) {		
			ts = randomFloatFromRange(minThermalStrength, maxThermalStrength);
			thermalArray.push(new Thermal
				(thermalSeparation[i], cloudPositionY, paceX, cloudWidth, cloudHeigth, cloudCount, ts, windStrength, windDirection));
		}
	})();

	background = new Background(bg, windStrength, windDirection);
	glider = new Glider(gliderPositionX, gliderStartY, gliderPaceY, cloudWidth, cloudHeigth, cloudCount);
	airport = new Airport(airportPosition,canvas.height - 3, paceX, gliderPositionX, airportLength, windStrength, windDirection);
	turnpoint = new Turnpoint(turnpointPosition, 100, paceX, gliderPositionX, "red", "green", windStrength, windDirection);
	startLine = new Turnpoint(startlinePosition, 100, paceX, gliderPositionX, "green", "#ffffff00", windStrength, windDirection);
	displayTimer = new drawTimer();

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
		if (startLine.x < gliderPositionX && !flightStarted) {
			flightStarted = true;
			start();
		}
	}
})();