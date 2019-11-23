function Main(turnpoint, airport, startLine, thermalArray, background){

	addEventListener('keydown', checkKeyPress);
	addEventListener('touchstart',checkKeyPress);
	canvas.addEventListener('click', buttonClick);

	function buttonClick(event){
		if (restartButton.click(event)) {
			restart();
		}
		if (menuButton.click(event)) {
			location.reload();
		}
	}

	function checkKeyPress(){
		for (var i = 0; i < thermalArray.length; i++) {
			thermalArray[i].key = true;
			airport.key = true;
			turnpoint.key = true;
			background.key = true;
			glider.key = true;
			startLine.key = true;
			tutorial1.key = true;
			tutorial2.key = true;
			tutorial3.key = true;
			tutorial4.key = true;
			tutorial5.key = true;
			tutorial6.key = true;
			tutorial7.key = true;
			tutorial8.key = true;

			tutorialStar.key = true;
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
		if(game){
			restartButton.update();
			menuButton.update();
		}
		if (tutorial) {
				tutorial1.vis = true;
				tutorial2.vis = true;
				tutorial5.vis = true;
			if (cloudBase) {
				tutorial1.vis = false;
				tutorial2.vis = false;
				tutorial3.vis = true;
				tutorial4.vis = true;
			}
			if (turnpoint.tp) {
				tutorial1.vis = false;
				tutorial2.vis = false;
				tutorial3.vis = false;
				tutorial4.vis = false;
				tutorial6.vis = true;
				tutorial7.vis = true;
				tutorial8.vis = true;
			}
				tutorial1.update();
				tutorial2.update();
				tutorial3.update();
				tutorial4.update();
				tutorial5.update();
				tutorial6.update();
				tutorial7.update();
				tutorial8.update();

				tutorialStar.update();
		}
		startScore();
	})();

	function reload(){
		if (airport.finish) {
			stop();
			if (game) {
				let scoreArray = localStorage.getItem("score") ? JSON.parse(localStorage.getItem("score")) : [];
				calcScore(score, flightSeconds, flightMinutes, cloudCount, startLine.x, turnpoint.x);
				scoreArray.push(totalScore);
				localStorage.setItem("score", JSON.stringify(scoreArray));
				scoreArray.sort(function(a,b){return b-a});
				window.alert("You made it!\nYour score: " + totalScore +
				 " points\nHighscores:\n" + scoreArray.map(function(num,index)
					{return index + 1 + ". " + num.toString()}).join("\n"));
			}
			if (tutorial) {
				window.alert("You made it!");
			}
			location.reload();
		}
		if (glider.lnd && !airport.finish) {
				stop();
				calcScore(score, flightSeconds, flightMinutes, cloudCount, startLine.x, turnpoint.x);
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

	function restart(){
		glider = null;
		turnpoint = null;
		airport = null;
		background = null;
		startLine = null;
		displayTimer = null;
		restartButton = null;
		menuButton = null;
		thermalArray = [];
		for (var i = 0; i < cloudCount; i++) {
			thermalArray.push(new Thermal
				(thermalSeparation[i], cloudPositionY, paceX, cloudWidth, cloudHeigth, cloudCount, thermalStrength[i], windStrength, windDirection, glider));
		}
		glider = new Glider(gliderPositionX, gliderStartY, gliderPaceY, cloudWidth, cloudHeigth, cloudCount, windStrength, windDirection, thermalArray);
		turnpoint = new Turnpoint(turnpointPosition, 100, paceX, gliderPositionX, "red", "green", windStrength, windDirection, glider);
		airport = new Airport(airportPosition,canvas.height - 3, paceX, gliderPositionX, airportLength, windStrength, windDirection, glider, turnpoint);
		background = new Background(bg, windStrength, windDirection, glider, airport);
		startLine = new Turnpoint(startlinePosition, 100, paceX, gliderPositionX, "green", "#ffffff00", windStrength, windDirection);
		displayTimer = new drawTimer();
		restartButton = new Button(canvas.width - 150, 20, 132, 40, "Restart", null, "32px Courier New", "#000", 0, 28, game);
		menuButton = new Button(canvas.width - 150, 65, 132, 40, "Menu", null, "32px Courier New", "#000", 0, 28, game);
	}
}