let flightMinutes,flightSeconds,score,totalScore,canvas,c,cloud,
	bg,gliderRight,gliderLeft,gx,background,glider,airport,turnpoint,
	startLine,displayTimer,timer,toggleBtn,resetBtn,watch,timerMilliseconds,
	timerSeconds,timerMinutes, windDirection, ts, windsockright, windsockleft;


let cloudPositionY = 0,
	minCloudPositionY = 40,
	maxCloudPositionY = 70,
	cloudWidth = 375,
	cloudHeigth = 217,
	paceX = 3.5,
	gliderPaceY = 0.52,
	gliderStartY = 300,
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
	windStrength = 0.7,

	thermalStrength2 = [1, 1, 0.5, 0.55, 0.4, 0.6, 0.45, 0.47, 0.41, 0.56, 0.7, 0.3, 0.5, 0.8, 0.6, 0.52],

	thermalStrength3 = [1.3, 0.7, 1, 1.2, 0.8, 1.1, 0.6, 1.02, 0.9, 0.8, 1, 1, 1, 1, 1, 1],

	thermalStrength4 = [0.8, 0.3, 0.4, 0.35, 0.4, 0.6, 0.35, 0.47, 0.35, 0.46, 0.5, 0.4, 0.43, 0.61, 0.51, 0.52],

	thermalSeparation1 = [-10000 ,-6000, 0, 1300, 2400, 3200, 3900, 4900, 5200, 5800, 6200, 7100, 8000],

	thermalSeparation2 = [1300, 1800, 3000, 4000, 4500, 5000, 5100, 5400, 6000, 6400, 6900, 7300, 8000, 8500, 9000, 10000],

	thermalSeparation3 = [700, 2700, 3000, 4500, 6500, 6700, 6900, 8000, 10000, 11000, 12000, 13000, 14000, 15000, 15000, 15000],

	thermalSeparation4 = [400, 1200, 2300, 3200, 3900, 4700, 4900, 5600, 6700, 7500, 8500, 9000, 9300, 10300, 11000, 11000],
	
	thermalSeparation = thermalSeparation4,

	thermalStrength = thermalStrength2;
