"use strict";

(function()
{	
	window.addEventListener("load", main);
}());

function main()
{
	var track = window.document.getElementById("track");
	track.volume = 0.1;
	var jogarButton = window.document.getElementById("JogarBtn");
	var tutorialButton = window.document.getElementById("TutorialBtn");
	var pastaButton = window.document.getElementById("PastaBtn");
	var classificButton = window.document.getElementById("ClassificBtn");
	var opcoesButton = window.document.getElementById("OpcoesBtn");
	var creditosButton = window.document.getElementById("CreditosBtn");
	var sairButton = window.document.getElementById("SairBtn");

	var classicoButton = window.document.getElementById("ClassicoBtn");
	var campanhaButton = window.document.getElementById("CampanhaBtn");

	var musicOffButton = window.document.getElementById("MusicOffBtn");
	var soundOffButton = window.document.getElementById("SoundOffBtn");
	var resetButton = window.document.getElementById("ResetBtn");
	var backButton = window.document.getElementById("BackBtn");

	var plusSound1 = window.document.getElementById("plusSound1");
	var minusSound1 = window.document.getElementById("minusSound1");
	var plusSound2 = window.document.getElementById("plusSound2");
	var minusSound2 = window.document.getElementById("minusSound2");

	var plusSound1Clicked = function(ev)
	{
		if (track.volume <= 0.9)
			track.volume += 0.1;
	}

	var minusSound1Clicked = function(ev)
	{
		if (track.volume >= 0.1)
			track.volume -= 0.1;
	}

	var ResetBtnClicked = function(ev)
	{
		track.volume = 0.1;
	}

	plusSound1.addEventListener("click", plusSound1Clicked);
	minusSound1.addEventListener("click", minusSound1Clicked);
	//plusSound2.addEventListener("click", plusSound2Clicked);
	//minusSound2.addEventListener("click", minusSound1Clicked);

	var opcoesButtonHandler = function(ev)
	{
		jogarButton.style.display = "none";
		tutorialButton.style.display = "none";
		pastaButton.style.display = "none";
		classificButton.style.display = "none";
		opcoesButton.style.display = "none";
		creditosButton.style.display = "none";
		sairButton.style.display = "none";
		classicoButton.style.display = "none";
		campanhaButton.style.display = "none";

		musicOffButton.style.display = "block";
		soundOffButton.style.display = "block";
		resetButton.style.display = "block";
		backButton.style.display = "block";

		plusSound1.style.display = "block";
		minusSound1.style.display = "block";
		plusSound2.style.display = "block";
		minusSound2.style.display = "block";

		document.body.style.backgroundImage = "url('../resources/menu_opcoes.png')";
	}

	var BackBtnClicked = function(ev)
	{
		jogarButton.style.display = "block";
		tutorialButton.style.display = "block";
		pastaButton.style.display = "block";
		classificButton.style.display = "block";
		opcoesButton.style.display = "block";
		creditosButton.style.display = "block";
		sairButton.style.display = "block";

		musicOffButton.style.display = "none";
		soundOffButton.style.display = "none";
		resetButton.style.display = "none";
		backButton.style.display = "none";

		plusSound1.style.display = "none";
		minusSound1.style.display = "none";
		plusSound2.style.display = "none";
		minusSound2.style.display = "none";

		document.body.style.backgroundImage = "url('../resources/menu.png')";
	}
	opcoesButton.addEventListener("click", opcoesButtonHandler);

	var musicOffButtonHandler = function(ev)
	{
		MusicOffBtnClicked(ev, track);
	}

	var soundOffButtonHandler = function(ev)
	{
		SoundOffBtnClicked(ev, track);
	}

	musicOffButton.addEventListener("click", musicOffButtonHandler);
	soundOffButton.addEventListener("click", SoundOffBtnClicked);
	resetButton.addEventListener("click", ResetBtnClicked);
	backButton.addEventListener("click", BackBtnClicked);


	
	classicoButton.addEventListener("click", ClassicoBtnClicked);
	campanhaButton.addEventListener("click", CampanhaBtnClicked);


	var jogarBtnHandler = function(ev)
	{
		
		jogarActionPerform(ev, classicoButton, campanhaButton);

	}
	jogarButton.addEventListener("click", jogarBtnHandler);

	tutorialButton.addEventListener("click", TutorialBtnClicked);
	pastaButton.addEventListener("click", PastaBtnClicked);
	classificButton.addEventListener("click", ClassificBtnClicked);
	creditosButton.addEventListener("click", CreditosBtnClicked);
	sairButton.addEventListener("click", SairBtnClicked);
}

function jogarActionPerform(ev, classicoButton, campanhaButton)
{
	classicoButton.style.display = 'block';
	campanhaButton.style.display = 'block';
}

function TutorialBtnClicked()
{
	
	window.location.assign("../tutorial/tutorial.html");
}

function PastaBtnClicked()
{
	
	window.location.assign("../pasta/pasta.html");
}

function ClassificBtnClicked()
{
	
	window.location.assign("../classific/classific.html");
}

function CreditosBtnClicked()
{
	
	window.location.assign("../creditos/creditos.html");
}

// fecha janela aquando do botao de sair
function SairBtnClicked()
{
	window.close();
}

function ClassicoBtnClicked()
{
	window.location.assign("../jogar/modo_classico/classic.html");
}

function CampanhaBtnClicked()
{
	window.location.assign("../jogar/modo_campanha/nivel1/nivel1.html");
}

function MusicOffBtnClicked(ev, track)
{
	track.volume = 0;
}

function SoundOffBtnClicked(ev)
{

}