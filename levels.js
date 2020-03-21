let thermalStrength1 = [1, 1, 0.5, 0.55, 0.4, 0.6, 0.45, 0.47, 0.41, 0.56, 0.7, 0.3, 0.5, 0.8, 0.6, 0.52],

	thermalStrength2 = [1, 1, 0.5, 0.55, 0.4, 0.6, 0.45, 0.47, 0.41, 0.56, 0.7, 0.3, 0.5, 0.8, 0.6, 0.52],

	thermalStrength3 = [5, 0.7, 1, 1.2, 0.8, 1.1, 0.6, 1.02, 0.9, 0.8, 1, 1, 1, 1, 1, 1],

	thermalStrength4 = [0.8, 0.3, 0.4, 0.35, 0.4, 0.6, 0.35, 0.47, 0.35, 0.46, 0.5, 0.4, 0.43, 0.61, 0.51, 0.52],

	thermalStrength5 = [0.8, 0.3, 0.4, 0.45, 0.4, 0.6, 0.45, 0.47, 0.45, 0.46, 0.5, 0.4, 0.43, 0.61, 0.51, 0.52],

	thermalSeparation1 = [-10000 ,-6000, 0, 1300, 2400, 3200, 3900, 4900, 5200, 5800, 6200, 7100, 8000],

	thermalSeparation2 = [1300, 1800, 3000, 4000, 4500, 5000, 5100, 5400, 6000, 6400, 6900, 7300, 8000, 8500, 9000, 10000],

	thermalSeparation3 = [700, 2700, 3000, 4500, 6500, 6700, 6900, 8000, 10000, 11000, 12000, 13000, 14000, 15000, 15000, 15000],

	thermalSeparation4 = [100, 1200, 2300, 3200, 3900, 4700, 4900, 5600, 6700, 7500, 8500, 9000, 9300, 10300, 11000, 11000],

	thermalSeparation5 = [800, 1200, 2300, 3200, 3900, 4700, 4900, 5600, 6700, 7500, 8500, 9000, 9300, 10300, 11000, 11000],

	tutorialThermalSeparation = [-300, 900, 1500, 1700, 2400, 3400, 3900, 4400, 4900, 5400, 5900, 13000, 14000, 15000, 15000, 15000],

	menuThermalSeparation = [100, 1200, 2300, 3200, 3900, 4700, 4900, 5600, 6700, 7500, 8500, 9000, 9300, 10300, 11000, 11000],
	
	thermalSeparation = [800, 1200, 2300, 3200, 3900, 4700, 4900, 5600, 6700, 7500, 8500, 9000, 9300, 10300, 11000, 11000],

	tutorialThermalStrength = [0.8, 0.3, 0.4, 0.45, 0.4, 0.6, 0.45, 0.47, 0.45, 0.46, 0.5, 0.4, 0.43, 0.61, 0.51, 0.52],

	thermalStrength = [0.8, 0.3, 0.4, 0.45, 0.4, 0.6, 0.45, 0.47, 0.45, 0.46, 0.5, 0.4, 0.43, 0.61, 0.51, 0.52];

	turnpointPosition = 10000;

	startlinePosition = 1000;

	function setLevel(lvl){
		switch(lvl){
			case 0:
			thermalSeparation = [800, 1200, 2300, 3200, 3900, 4700, 4900, 5600, 6700, 7500, 8500, 9000, 9300, 10300, 11000, 11000];
			thermalStrength   = [0.8, 0.3,  0.4,  0.45, 0.4,  0.6,  0.45, 0.47, 0.45, 0.46, 0.5,  0.4,  0.43, 0.61,  0.51,  0.52];
			thermalVisibility = [true,true,true, true, true, true,true,true,true,true, true, true,true,true,  true,  true];
			turnpointPosition = 2000;
			startlinePosition = 1000;
			break;
			case 1:
			thermalSeparation = [800, 1200, 2300, 3200, 3900, 4700, 4900, 5600, 6700, 7500, 8500, 9000, 9300, 10300, 11000, 11000];
			thermalStrength   = [0.8, 0.3,  0.4,  0.45, 0.4,  0.6,  0.45, 0.47, 0.45, 0.46, 0.5,  0.4,  0.43, 0.61,  0.51,  0.52];
			thermalVisibility = [true,true,true, true, true, true,true,true,true,true, true, true,true,true,  true,  true];
			turnpointPosition = 10000;
			startlinePosition = 1000;
			break;
			case 2:
			thermalSeparation = thermalSeparation5;
			thermalStrength = thermalStrength5;
			break;
			case 3:
			thermalSeparation = thermalSeparation5;
			thermalStrength = thermalStrength3;
			break;
			case 4:
			thermalSeparation = thermalSeparation5;
			thermalStrength = thermalStrength3;
			break;
			case 5:
			thermalSeparation = thermalSeparation5;
			thermalStrength = thermalStrength3;
			break;
			case 6:
			thermalSeparation = thermalSeparation5;
			thermalStrength = thermalStrength3;
			break;
			case 7:
			thermalSeparation = thermalSeparation5;
			thermalStrength = thermalStrength3;
			break;
			case 8:
			thermalSeparation = thermalSeparation5;
			thermalStrength = thermalStrength3;
			break;
			case 9:
			thermalSeparation = thermalSeparation5;
			thermalStrength = thermalStrength3;
			break;
			case 10:
			thermalSeparation = thermalSeparation5;
			thermalStrength = thermalStrength3;
			break;
			case 11:
			thermalSeparation = thermalSeparation5;
			thermalStrength = thermalStrength3;
			break;
			case 12:
			thermalSeparation = thermalSeparation5;
			thermalStrength = thermalStrength3;
			break;
			case 13:
			thermalSeparation = thermalSeparation5;
			thermalStrength = thermalStrength3;
			break;
			case 14:
			thermalSeparation = thermalSeparation5;
			thermalStrength = thermalStrength3;
			break;
			case 15:
			thermalSeparation = thermalSeparation5;
			thermalStrength = thermalStrength3;
			break;
			case 16:
			thermalSeparation = thermalSeparation5;
			thermalStrength = thermalStrength3;
			break;
			case 17:
			thermalSeparation = thermalSeparation5;
			thermalStrength = thermalStrength3;
			break;
			case 18:
			thermalSeparation = thermalSeparation5;
			thermalStrength = thermalStrength3;
			break;
			case 19:
			thermalSeparation = thermalSeparation5;
			thermalStrength = thermalStrength3;
			break;
			case 20:
			thermalSeparation = thermalSeparation5;
			thermalStrength = thermalStrength3;
			break;
			case 21:
			thermalSeparation = thermalSeparation5;
			thermalStrength = thermalStrength3;
			break;
			case 22:
			thermalSeparation = thermalSeparation5;
			thermalStrength = thermalStrength3;
			break;
			case 23:
			thermalSeparation = thermalSeparation5;
			thermalStrength = thermalStrength3;
			break;
			case 24:
			thermalSeparation = thermalSeparation5;
			thermalStrength = thermalStrength3;
			break;
			case 25:
			thermalSeparation = thermalSeparation5;
			thermalStrength = thermalStrength3;
			break;
			default:
			thermalSeparation = [800, 1200, 2300, 3200, 3900, 4700, 4900, 5600, 6700, 7500, 8500, 9000, 9300, 10300, 11000, 11000];
			thermalStrength = [0.8, 0.3, 0.4, 0.45, 0.4, 0.6, 0.45, 0.47, 0.45, 0.46, 0.5, 0.4, 0.43, 0.61, 0.51, 0.52];
			thermalVisibility = [true,true,true, true, true, true,true,true,true,true, true, true,true,true,  true,  true];
			turnpointPosition = 10000;
			startlinePosition = 1000;
			console.log("pong");
		}
	}
