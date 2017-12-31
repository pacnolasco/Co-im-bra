"use strict";

(function()
{	
	window.addEventListener("load", tutorial);
}());

function tutorial()
{
	var flag = 0;
	var backButton = window.document.getElementById("BackBtn");
	var forwardButton = window.document.getElementById("ForwardBtn");

	var BackBtnClicked = function(ev)
	{
		flag = BackBtnAction(ev, flag, forwardButton);
	}
	var ForwardBtnClicked = function(ev)
	{
		flag = ForwardBtnAction(ev);
	}
	backButton.addEventListener("click", BackBtnClicked);
	forwardButton.addEventListener("click", ForwardBtnClicked);

}


function ForwardBtnAction(ev)
{
	var body = window.document.getElementsByTagName('body')[0];
	body.style.backgroundImage = 'url(../resources/tutorial2.png)';
	ev.target.style.display = "none";
	return 1;
}


function BackBtnAction(ev, flag, forwardButton)
{
	var body = window.document.getElementsByTagName('body')[0];
	if (flag == 0)
	{
		window.location.assign("../main/menu.html");
	}
	else
	{
		body.style.backgroundImage = 'url(../resources/tutorial1.png)';
		forwardButton.style.display = "block";
		flag = 0;
	}
	return flag;
}

