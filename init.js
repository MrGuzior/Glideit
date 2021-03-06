(function initiate(){
	canvas = document.querySelector("canvas");
	canvas.width = 1280;
	canvas.height = 600;
	c = canvas.getContext("2d");
	cloud = new Image() ;
	bg = new Image();
	gliderRight = new Image();
	gliderLeft = new Image();
	windsockright = new Image();
	windsockleft = new Image();
	star = new Image();
	cloud.src = "img/cloud.png";
	bg.src = "img/background.png";
	gliderRight.src = "img/gliderright.png";
	gliderLeft.src = "img/gliderleft.png";
	windsockright.src = "img/windsockright.png";
	windsockleft.src = "img/windsockleft.png";
	star.src = "img/star.png";

	(function init(){
		thermalArray = [];
		windDirection = randomIntFromRange(0,2);
		for (var i = 0; i < menuThermalSeparation.length; i++) {
			thermalArray.push(new Thermal
				(menuThermalSeparation[i], cloudPositionY, paceX, cloudWidth, cloudHeigth, menuThermalSeparation.length, thermalStrength[i], windStrength, windDirection, glider, true));
		}
	})();

		glider = new Glider(gliderPositionX, gliderStartY, gliderPaceY, cloudWidth, cloudHeigth, null, windStrength, windDirection, thermalArray);
		turnpoint = new Turnpoint(turnpointPosition, 100, paceX, gliderPositionX, "green", "#ffffff00", windStrength, windDirection, glider);
		airport = new Airport(airportPosition,canvas.height - 3, paceX, gliderPositionX, airportLength, windStrength, windDirection, glider, turnpoint);
		background = new Background(bg, windStrength, windDirection, glider, airport);
		displayTimer = new drawTimer();
		restartButton = new Button(canvas.width - 150, 20, 132, 40, "Restart", null, "32px Courier New", "#000", 0, 28, game);
		menuButton = new Button(canvas.width - 150, 65, 132, 40, "Menu", null, "32px Courier New", "#000", 0, 28, game);
	
		newGameButton = new Button(canvas.width/2 - 125, canvas.height/2 - 50, 250, 45, "New Game", null, "50px Courier New", "#000", 5, 35, menu);
		tutorialButton = new Button(canvas.width/2 - 125, canvas.height/2 - 50 + 50, 250, 45, "Tutorial", null, "50px Courier New", "#000", 5, 35, menu);
		highscoresButton = new Button(canvas.width/2 - 125, canvas.height/2 - 50 + 100, 250, 45, "Highscores", null, "40px Courier New", "#000", 5, 35, menu);
		settingsButton = new Button(canvas.width/2 - 125, canvas.height/2 - 50 + 150, 250, 45, "Settings", null, "50px Courier New", "#000", 5, 35, menu);
		emptyButton = new Button(canvas.width/2 - 2000, canvas.height/2 - 50 + 150, 250, 45, "", null, "50px Courier New", "#000", 5, 35, menu);
	
		menuGlider = new Glider(gliderPositionX - 300, gliderStartY, gliderPaceY-0.4, cloudWidth, cloudHeigth, null, windStrength, windDirection, thermalArray);
		menuBackground = new Background(bg, windStrength, windDirection, menuGlider, airport);

		tutorialTurnpoint = new Turnpoint(4500, 100, paceX, gliderPositionX, "green", "#ffffff00", windStrength, windDirection, glider);
		tutorialAirport = new Airport(airportPosition,canvas.height - 3, paceX, gliderPositionX, airportLength, windStrength, windDirection, glider, tutorialTurnpoint);
		tutorialBackground = new Background(bg, windStrength, windDirection, glider, tutorialAirport);
		tutorialStartLine = new Turnpoint(2500, 100, paceX, gliderPositionX, "green", "#ffffff00", windStrength, windDirection);
		tutorialGlider = new Glider(gliderPositionX, gliderStartY, gliderPaceY, cloudWidth, cloudHeigth, null, windStrength, windDirection, thermalArray);

		tutorialItem = [new Tutorial(700, 170, paceX, gliderPositionX, windStrength, windDirection, glider, tutorialString[0], tutorialFont),
		new Tutorial(1650, 100, paceX, gliderPositionX, windStrength, windDirection, glider, tutorialString[1], tutorialFont),
		new Tutorial(2600, 400, paceX, gliderPositionX, windStrength, windDirection, glider, tutorialString[2], tutorialFont),
		new Tutorial(1700, 300, paceX, gliderPositionX, windStrength, windDirection, glider, tutorialString[3], tutorialFont),
		new Tutorial(4560, 300, paceX, gliderPositionX, windStrength, windDirection, glider, tutorialString[4], tutorialFont),
		new Tutorial(2500, 300, paceX, gliderPositionX, windStrength, windDirection, glider, tutorialString[5], tutorialFont),
		new Tutorial(1800, 400, paceX, gliderPositionX, windStrength, windDirection, glider, tutorialString[6], tutorialFont),
		new Tutorial(277, 500, paceX, gliderPositionX, windStrength, windDirection, glider, tutorialString[7] , tutorialFont)];

		tutorialStar = [new Checkpoint(1700, 200, paceX, gliderPositionX, windStrength, windDirection, glider, star),
		new Checkpoint(4600, 400, paceX, gliderPositionX, windStrength, windDirection, glider, star),
		new Checkpoint(400, 560, paceX, gliderPositionX, windStrength, windDirection, glider, star)];
		
})();