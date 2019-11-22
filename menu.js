(function mainMenu(){
	canvas.addEventListener('click', buttonClick);

	function buttonClick(event){
		if (newGameButton.click(event)) {
			menu = false;
			game = true;
		}
		if (tutorialButton.click(event)) {
			menu = false;
			tutorial = true;
		}
	}

	(function animate(){
		c.clearRect(0,0,innerWidth, innerHeight);
		if (menu) {
			menuBackground.update();
			newGameButton.update();
			tutorialButton.update();
			highscoresButton.update();
			settingsButton.update();
			emptyButton.update();
			requestAnimationFrame(animate);
				for (var i = 0; i < thermalArray.length; i++) {
					thermalArray[i].update();
				}
			menuGlider.update();
		}
		if (tutorial) {
			newGameButton.xx = 0;
			newGameButton.yy = 0;
			tutorialButton = null;
			highscoresButton = null;
			settingsButton = null;
			emptyButton = null;
			menuGlider = null;
			menuBackground = null;
			thermalArray = [];
				for (var i = 0; i < cloudCount; i++) {
					thermalArray.push(new Thermal
					(tutorialThermalSeparation[i], cloudPositionY, paceX, cloudWidth, cloudHeigth, cloudCount, thermalStrength[i], windStrength, windDirection, glider));
				}
				glider.tha = thermalArray;
			cancelAnimationFrame(animate);

			tutorialGame = new Main(tutorialTurnpoint, tutorialAirport, tutorialStartLine, thermalArray, tutorialBackground);
		}
		if (game) {
			newGameButton.xx = 0;
			newGameButton.yy = 0;
			tutorialButton = null;
			highscoresButton = null;
			settingsButton = null;
			emptyButton = null;
			menuGlider = null;
			menuBackground = null;
			thermalArray = [];
				for (var i = 0; i < cloudCount; i++) {
					thermalArray.push(new Thermal
					(thermalSeparation[i], cloudPositionY, paceX, cloudWidth, cloudHeigth, cloudCount, thermalStrength[i], windStrength, windDirection, glider));
				}
				glider.tha = thermalArray;
			cancelAnimationFrame(animate);

			mainGame = new Main(turnpoint, airport, startLine, thermalArray, background);
		}
	})();

})();