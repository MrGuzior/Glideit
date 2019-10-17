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
	cloud.src = "cloud.png";
	bg.src = "background.png";
	gliderRight.src = "gliderright.png";
	gliderLeft.src = "gliderleft.png";
	windsockright.src = "windsockright.png";
	windsockleft.src = "windsockleft.png";

	(function init(){
		thermalArray = [];
		var sum = 0;
		windDirection = randomIntFromRange(0,2);
		for (var i = 0; i < cloudCount; i++) {
			thermalArray.push(new Thermal
				(thermalSeparation[i], cloudPositionY, paceX, cloudWidth, cloudHeigth, cloudCount, thermalStrength[i], windStrength, windDirection));
		}
	})();

	background = new Background(bg, windStrength, windDirection);
	glider = new Glider(gliderPositionX, gliderStartY, gliderPaceY, cloudWidth, cloudHeigth, cloudCount, windStrength, windDirection);
	airport = new Airport(airportPosition,canvas.height - 3, paceX, gliderPositionX, airportLength, windStrength, windDirection);
	turnpoint = new Turnpoint(turnpointPosition, 100, paceX, gliderPositionX, "red", "green", windStrength, windDirection);
	startLine = new Turnpoint(startlinePosition, 100, paceX, gliderPositionX, "green", "#ffffff00", windStrength, windDirection);
	displayTimer = new drawTimer();

	restartButton = new Button(canvas.width - 150, 20, 132, 40, "Restart", null, "32px Courier New", "#000", 28);
	menuButton = new Button(canvas.width - 150, 65, 132, 40, "Menu", null, "32px Courier New", "#000", 28);
})();