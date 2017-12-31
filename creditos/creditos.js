"use strict";

(function()
{	
	window.addEventListener("load", creditos);
}());

function creditos()
{
	var backButton = window.document.getElementById("BackBtn");

	backButton.addEventListener("click", BackBtnClicked);

}

function BackBtnClicked()
{
	window.location.assign("../main/menu.html");
}

