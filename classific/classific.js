"use strict";

(function()
{	
	window.addEventListener("load", classific);
}());

var myCookies = {};

function classific()
{
	var backButton = window.document.getElementById("BackBtn");

	backButton.addEventListener("click", BackBtnClicked);
	loadCpoints();

}

function BackBtnClicked()
{
	//nao esquecer de ler os dados...

	window.location.assign("../main/menu.html");
}

function loadCpoints(){
	myCookies = {};
	var keyValue = document.cookie.split(";");
	for( var key in keyValue){
		var cookie = keyValue[key].split("=");
		myCookies[cookie[0].trim()] = cookie[1];
		console.log(key, myCookies[key]);
	}
}