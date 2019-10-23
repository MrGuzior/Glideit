(function mainMenu(){
	canvas.addEventListener('click', buttonClick);

	function buttonClick(event){
		if (newGameButton.click(event)) {
			menu = false;
			game = true;
			main();
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
			requestAnimationFrame(animate);
				for (var i = 0; i < thermalArray.length; i++) {
					thermalArray[i].update();
				}
			menuGlider.update();
		}	
		if (game) {
			newGameButton.xx = 0;
			newGameButton.yy = 0;
			tutorialButton = null;
			highscoresButton = null;
			settingsButton = null;
			menuGlider = null;
			menuBackground = null;
			thermalArray = [];
				for (var i = 0; i < cloudCount; i++) {
					thermalArray.push(new Thermal
					(thermalSeparation[i], cloudPositionY, paceX, cloudWidth, cloudHeigth, cloudCount, thermalStrength[i], windStrength, windDirection));
				}
			cancelAnimationFrame(animate);
		}
	})();

	function reload(){
	}

})();