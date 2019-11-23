let flightMinutes,flightSeconds,score,totalScore,canvas,c,cloud,
	bg,gliderRight,gliderLeft,gx,background,glider,airport,turnpoint,
	startLine,displayTimer,timer,toggleBtn,resetBtn,watch,timerMilliseconds,
	timerSeconds,timerMinutes, windDirection, ts, windsockright, windsockleft, cx, cy, timeString;

let cloudPositionY = 0,
	minCloudPositionY = 40,
	maxCloudPositionY = 70,
	cloudWidth = 375,
	cloudHeigth = 217,
	paceX = 5.3,
	gliderPaceY = 0.65,
	gliderStartY = 400,
	gliderPositionX = 577.5,
	cloudCount = 16,
	minThermalStrength = 0.6,
	maxThermalStrength = 1.4,
	airportLength = 300,
	airportPosition = 277.5,
	turnpointPosition = 10000,
	startlinePosition = 1000,
	flightStarted = false,
	thermalArray = [],
	tutorialThermalArray = [],
	windStrength = 0,
	menu = true,
	game = false,
	tutorial = false,
	cloudBase = false,

	thermalStrength1 = [1, 1, 0.5, 0.55, 0.4, 0.6, 0.45, 0.47, 0.41, 0.56, 0.7, 0.3, 0.5, 0.8, 0.6, 0.52],

	thermalStrength2 = [1, 1, 0.5, 0.55, 0.4, 0.6, 0.45, 0.47, 0.41, 0.56, 0.7, 0.3, 0.5, 0.8, 0.6, 0.52],

	thermalStrength3 = [1.3, 0.7, 1, 1.2, 0.8, 1.1, 0.6, 1.02, 0.9, 0.8, 1, 1, 1, 1, 1, 1],

	thermalStrength4 = [0.8, 0.3, 0.4, 0.35, 0.4, 0.6, 0.35, 0.47, 0.35, 0.46, 0.5, 0.4, 0.43, 0.61, 0.51, 0.52],

	thermalStrength5 = [0.8, 0.3, 0.4, 0.45, 0.4, 0.6, 0.45, 0.47, 0.45, 0.46, 0.5, 0.4, 0.43, 0.61, 0.51, 0.52],

	thermalSeparation1 = [-10000 ,-6000, 0, 1300, 2400, 3200, 3900, 4900, 5200, 5800, 6200, 7100, 8000],

	thermalSeparation2 = [1300, 1800, 3000, 4000, 4500, 5000, 5100, 5400, 6000, 6400, 6900, 7300, 8000, 8500, 9000, 10000],

	thermalSeparation3 = [700, 2700, 3000, 4500, 6500, 6700, 6900, 8000, 10000, 11000, 12000, 13000, 14000, 15000, 15000, 15000],

	thermalSeparation4 = [100, 1200, 2300, 3200, 3900, 4700, 4900, 5600, 6700, 7500, 8500, 9000, 9300, 10300, 11000, 11000],

	thermalSeparation5 = [800, 1200, 2300, 3200, 3900, 4700, 4900, 5600, 6700, 7500, 8500, 9000, 9300, 10300, 11000, 11000],
	
	thermalSeparation = thermalSeparation5,

	tutorialThermalSeparation = [-300, 900, 1500, 1700, 2400, 3400, 3900, 4400, 4900, 5400, 5900, 13000, 14000, 15000, 15000, 15000],

	thermalStrength = thermalStrength5;

let tutorialString1 = "Click any button\n to make a turn\n       ->",
	tutorialString2 = "Turn here to\ngain altitude",
	tutorialString3 = "Fly towards\nthe turnpoint\n      ->",	
	tutorialString4 = "Timer starts after\ncrossing startline\n       ->",
	tutorialString5 = "Turn around and fly\ntowards the airport\n       <-",
	tutorialString6 = "Land within the\nairport boundries\n     <-",
	tutorialString7 = "Don't fly past it!\n   <-",
	tutorialString8 = "!   airport   !",
	tutorialFont = "35px Courier New";
