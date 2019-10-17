(function main(){
	addEventListener('keydown', checkKeyPress);
	addEventListener('touchstart',checkKeyPress);
	canvas.addEventListener('click', buttonClick);

	function buttonClick(event){
		cx = event.pageX;
		cy = event.pageY;
		if (cx >= restartButton.x && cx <= restartButton.x + restartButton.xx &&
			cy >= restartButton.y && cy <= restartButton.y + restartButton.yy) {
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
		restartButton.update();
		menuButton.update();
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