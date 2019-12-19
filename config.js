let flightMinutes,flightSeconds,score,totalScore,canvas,c,cloud,
	bg,gliderRight,gliderLeft,gx,background,glider,airport,turnpoint,
	startLine,displayTimer,timer,toggleBtn,resetBtn,watch,timerMilliseconds,
	timerSeconds,timerMinutes, windDirection, ts, windsockright, windsockleft, cx, cy, timeString, star;

let cloudPositionY = 0,
	minCloudPositionY = 40,
	maxCloudPositionY = 70,
	cloudWidth = 375,
	cloudHeigth = 217,
	paceX = 5.3,
	gliderPaceY = 0.65,
	gliderStartY = 400,
	gliderPositionX = 577.5,
	//cloudCount = 16,
	minThermalStrength = 0.6,
	maxThermalStrength = 1.4,
	airportLength = 300,
	airportPosition = 277.5,
	turnpointPosition = 10000,
	startlinePosition = 1000,
	flightStarted = false,
	thermalArray = [],
	tutorialThermalArray = [],
	levelArray= [],
	windStrength = 0,
	menu = true,
	game = false,
	tutorial = false,
	levels = false,
	cloudBase = false,
	lvl = 0;
let tutorialString = ["Click any button\n to make a turn\n       ->",
						"Turn here to\ngain altitude",
						"Fly towards\nthe turnpoint\n      ->",	
						"Timer starts after\ncrossing startline\n       ->",
						"Turn around and fly\ntowards the airport\n       <-",
						"Land within the\nairport boundries\n     <-",
						"Don't fly past it!\n   <-",
						"!   airport   !"],
	tutorialFont = "35px Courier New";

