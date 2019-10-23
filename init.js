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
	cloud.src = "img/cloud.png";
	bg.src = "img/background.png";
	gliderRight.src = "img/gliderright.png";
	gliderLeft.src = "img/gliderleft.png";
	windsockright.src = "img/windsockright.png";
	windsockleft.src = "img/windsockleft.png";

	(function init(){
		thermalArray = [];
		var sum = 0;
		windDirection = randomIntFromRange(0,2);
		for (var i = 0; i < cloudCount; i++) {
			thermalArray.push(new Thermal
				(thermalSeparation[i], cloudPositionY, paceX, cloudWidth, cloudHeigth, cloudCount, thermalStrength[i], windStrength, windDirection, glider));
		}
	})();

		glider = new Glider(gliderPositionX, gliderStartY, gliderPaceY, cloudWidth, cloudHeigth, cloudCount, windStrength, windDirection, thermalArray);
		turnpoint = new Turnpoint(turnpointPosition, 100, paceX, gliderPositionX, "red", "green", windStrength, windDirection, glider);
		airport = new Airport(airportPosition,canvas.height - 3, paceX, gliderPositionX, airportLength, windStrength, windDirection, glider, turnpoint);
		background = new Background(bg, windStrength, windDirection, glider, airport);
		startLine = new Turnpoint(startlinePosition, 100, paceX, gliderPositionX, "green", "#ffffff00", windStrength, windDirection);
		displayTimer = new drawTimer();
		restartButton = new Button(canvas.width - 150, 20, 132, 40, "Restart", null, "32px Courier New", "#000", 0, 28, game);
		menuButton = new Button(canvas.width - 150, 65, 132, 40, "Menu", null, "32px Courier New", "#000", 0, 28, game);
	
		newGameButton = new Button(canvas.width/2 - 125, canvas.height/2 - 50, 250, 45, "New Game", null, "50px Courier New", "#000", 5, 35, menu);
		tutorialButton = new Button(canvas.width/2 - 125, canvas.height/2 - 50 + 50, 250, 45, "Tutorial", null, "50px Courier New", "#000", 5, 35, menu);
		highscoresButton = new Button(canvas.width/2 - 125, canvas.height/2 - 50 + 100, 250, 45, "Highscores", null, "40px Courier New", "#000", 5, 35, menu);
		settingsButton = new Button(canvas.width/2 - 125, canvas.height/2 - 50 + 150, 250, 45, "Settings", null, "50px Courier New", "#000", 5, 35, menu);
	
		menuGlider = new Glider(gliderPositionX - 300, gliderStartY, gliderPaceY-0.4, cloudWidth, cloudHeigth, cloudCount, windStrength, windDirection, thermalArray);
		menuBackground = new Background(bg, windStrength, windDirection, menuGlider, airport);
	
})();