(function mainMenu(){
	addEventListener('click', buttonClick);
	function buttonClick(event){
		if (newGameButton.click(event)&&menu) {
			menu = false;
			levels = true;
		}
		if (tutorialButton.click(event)&&menu) {
			menu = false;
			tutorial = true;
		}
		if (settingsButton.click(event)&&menu) {
			menu = false;
			settings = true;
		}
		for (var i = 0; i < levelArray.length; i++) {
			if(levelArray[i].click(event)&&levels){
				lvl = i+1;
				levels = false;
				game = true;
			}
		}
	}

	(function animate(){
		c.clearRect(0,0,innerWidth, innerHeight);
		if (menu) {
			function runMenu(){
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
				cancelAnimationFrame(animate);
			}
		runMenu();
		}
		if (levels) {
			function runLevels(){
				newGameButton.vis = false;
				tutorialButton.vis = false;
				highscoresButton.vis = false;
				settingsButton.vis = false;
				emptyButton.vis = false;
					requestAnimationFrame(animate);
					menuBackground.update();
					levelArray = [];
						for (var i = 0; i < 25; i++) {
							let z = canvas.width/2 - 176;
							let x = i <= 4 ? z + (i*70)
							 	: i <= 9 ? z + (i*70) - 350 
							 	: i <= 14 ? z + (i*70) - 700
							 	: i <= 19 ? z + (i*70) - 1050
							 	: z + (i*70) - 1400;
							let y = i <= 4 ? canvas.height/2 - 50 -100
								  : i <= 9 ? canvas.height/2 - 50 + 70 -100
								  : i <= 14 ? canvas.height/2 - 50 + 140 -100
								  : i <= 19 ? canvas.height/2 - 50 + 210 -100
								  : canvas.height/2 - 50 + 280-100; 
							levelArray.push(new Button
								(x, y, 50, 50, i+1, null, "40px Courier New", "#000", 0, 35, menu));
						}
					for (var i = 0; i < thermalArray.length; i++) {
						thermalArray[i].update();
					}
				menuGlider.update();
			for (var i = 0; i < 25; i++) {
				levelArray[i].update();
			}
		cancelAnimationFrame(animate);
				}
		runLevels();
	}
		if (tutorial) {
			function runTutorial(){
				newGameButton.vis = false;
				tutorialButton.vis = false;
				highscoresButton.vis = false;
				settingsButton.vis = false;
				emptyButton.vis = false;
				thermalArray = [];
					for (var i = 0; i < tutorialThermalSeparation.length; i++) {
						thermalArray.push(new Thermal
						(tutorialThermalSeparation[i], cloudPositionY, paceX, cloudWidth, 
						cloudHeigth, tutorialThermalSeparation.length, thermalStrength[i],
						windStrength, windDirection, glider, true));
					}
					glider.tha = thermalArray;
				cancelAnimationFrame(animate);

				turnpoint = new Turnpoint(turnpointPosition, 100, paceX, gliderPositionX, "green", "#ffffff00", windStrength, windDirection, glider);
				startLine = new Turnpoint(startlinePosition, 100, paceX, gliderPositionX, "green", "#ffffff00", windStrength, windDirection);
				tutorialGame = new Main(tutorialTurnpoint, tutorialAirport, tutorialStartLine, 
									thermalArray, tutorialBackground);
			}
		runTutorial();
		}
		if (settings) {
				newGameButton.vis = false;
				tutorialButton.vis = false;
				highscoresButton.vis = false;
				settingsButton.vis = false;
				emptyButton.vis = false;
				requestAnimationFrame(animate);
					menuBackground.update();
					menuGlider.update();
		}
		if (game) {
			function runGame(){
				setLevel(lvl);
					newGameButton.vis = false;
					tutorialButton.vis = false;
					highscoresButton.vis = false;
					settingsButton.vis = false;
					emptyButton.vis = false;
					menuGlider = null;
					menuBackground = null;
					thermalArray = [];
						for (var i = 0; i < thermalSeparation.length; i++) {
							thermalArray.push(new Thermal
							(thermalSeparation[i], cloudPositionY, paceX, cloudWidth,
							cloudHeigth, thermalSeparation.length, thermalStrength[i],
							windStrength, windDirection, glider, thermalVisibility[i]));
						}
						glider.tha = thermalArray;
					cancelAnimationFrame(animate);
				turnpoint = new Turnpoint(turnpointPosition, 100, paceX, gliderPositionX, "green", "#ffffff00", windStrength, windDirection, glider);
				startLine = new Turnpoint(startlinePosition, 100, paceX, gliderPositionX, "green", "#ffffff00", windStrength, windDirection);
				mainGame = new Main(turnpoint, airport, startLine, thermalArray, background);
			}
		runGame();
		}
	})();

})();
