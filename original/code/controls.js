function save_and_exit() {
	alert(JSON.stringify(plansza));
	//$('game').style.display='none';
	///$('moves').style.display='none';
	//$('infopage').style.display='none';
	//$('quitpage').style.display='block';
	
	///var ax = JSON.stringify(input);
	///alert(ax);
	///window.widget.setPreferenceForKey(ax,'nChess_last_game');
	///window.widget.setPreferenceForKey($('log').innerHTML,'nChess_last_game_moves');
	
	//window.menu.showSoftkeys();
	
}

function restart_game() {
	///window.widget.setPreferenceForKey('','nChess_last_game');
	location.reload(true);
}

function showinfo() {
	$('game').style.display='none';
	///$('moves').style.display='none';
	$('infopage').style.display='block';
}

function showgame() {
	$('infopage').style.display='none';
	$('game').style.display='block';
	///$('moves').style.display='none';
}


var prevWidth = 0;
var prevHeight = 0;

function windowResized() {
	
	if (window.widget) {
		var screenWidth = screen.width;
		var screenHeight = screen.height;
		var windowWidth = window.innerWidth;
		var windowHeight = window.innerHeight;

		if (windowHeight < (0.75 * screenHeight) ||
				windowWidth < (0.75 * screenWidth)) {
				// If the window width or height is less than 75% of the screen width or height, assume that the 
				// home screen is active.
				//$('full_view').style.display = 'none'				
				//document.getElementById("homeScreenView").setAttribute("class", "view");
		}
		else 
		{
			$('full_view').style.display = 'block'
			if (screenHeight > 640) screenHeight = screenWidth; /// used to run on pc - fix it later
			
			if (screenWidth > screenHeight) {
				document.getElementById("homeScreenView").setAttribute("class", "view hidden");
				$('pagecont').style.display='none';
				$('badrotation').style.display='block';
				window.menu.showSoftkeys();
			} else {
				document.getElementById("homeScreenView").setAttribute("class", "view hidden");
				$('pagecont').style.display='block';
				$('badrotation').style.display='none';
				if (prevHeight != screenHeight) {
					window.menu.hideSoftkeys();	
				}		
			}
		}
	prevWidth = screenWidth;
	prevHeight = screenHeight;
	}
}
