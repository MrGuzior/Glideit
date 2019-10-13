	let flightMinutes,flightSeconds,score,totalScore,canvas,c,cloud,
	bg,gliderRight,gliderLeft,gx,ap,background,glider,airport,turnpoint,
	startLine,displayTimer,timer,toggleBtn,resetBtn,watch,timerMilliseconds,timerSeconds,timerMinutes;


	let cloudPositionY = 0;
	let minCloudPositionY = 40;
	let maxCloudPositionY = 70;
	let cloudWidth = 375;
	let cloudHeigth = 217;
	let paceX = 3.5;
	let gliderPaceY = 0.52;
	let gliderStartY = 300;
	let cloudCount = 16;
	let minThermalStrength = 0.6;
	let maxThermalStrength = 1.4;
	let airportLength = 300;
	let turnpointPosition = 10000;
	let startlinePosition = 1000;
	let flightStarted = false;
	let thermalArray = [];

	let thermalStrength2 = [1, 0.4, 0.5, 0.55, 0.4, 0.6, 0.45, 0.47, 0.41, 0.56, 0.7, 0.3, 0.5, 0.8, 0.6, 0.52];

	let thermalStrength3 = [1.3, 0.7, 1, 1.2, 0.8, 1.1, 0.6, 1.02, 0.9, 0.8, 1, 1, 1, 1, 1, 1];

	let thermalStrength4 = [1, 0.3, 0.4, 0.45, 0.5, 1, 0.35, 0.67, 0.35, 0.46, 0.8, 0.3, 0.43, 0.71, 0.61, 0.52];

	let thermalSeparation1 = [-10000 ,-6000, 0, 1300, 2400, 3200, 3900, 4900, 5200, 5800, 6200, 7100, 8000];

	let thermalSeparation2 = [1300, 1800, 3000, 4000, 4500, 5000, 5100, 5400, 6000, 6400, 6900, 7300, 8000, 8500, 9000, 10000];

	let thermalSeparation3 = [700, 2700, 3000, 4500, 6500, 6700, 6900, 8000, 10000, 11000, 12000, 13000, 14000, 15000, 15000, 15000];

	let thermalSeparation4 = [700, 1200, 2300, 3200, 3900, 4700, 4900, 5600, 6700, 7500, 8500, 9000, 9300, 10300, 11000, 11000];
	
	let thermalSeparation = thermalSeparation3;

	let thermalStrength = thermalStrength2;
