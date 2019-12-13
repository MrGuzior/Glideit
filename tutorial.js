function mainTutorial(){
	for (var i = 0; i < tutorialItem.length; i++) {
		if(i == 0 || i == 1 || i == 4 && !cloudBase && !turnpoint.tp){
			tutorialItem[i].vis = true;
		}
		if (i == 1 | i == 0 && cloudBase && !turnpoint.tp) {
			tutorialItem[i].vis = false;
		}
		if (i == 2 | i == 3 && cloudBase && !turnpoint.tp) {
			tutorialItem[i].vis = true;
		}
		if (i == 0 | i == 1 | i == 2 | i == 3 && turnpoint.tp) {
			tutorialItem[i].vis = false;
		}
		if (i == 5 | i == 6 | i == 7 && turnpoint.tp) {
			tutorialItem[i].vis = true;
		}
	tutorialItem[i].update();
	}
	for (var i = 0; i < tutorialStar.length; i++) {
		tutorialStar[i].update();
	}
}