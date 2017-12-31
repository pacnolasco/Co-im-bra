"use strict";

(function()
{	
	window.addEventListener("load", pasta);
}());

function pasta()
{
	var backButton = window.document.getElementById("BackBtn");

	backButton.addEventListener("click", BackBtnClicked);

}

function BackBtnClicked()
{
	window.location.assign("../main/menu.html");
}

