"use strict";

(function (){
	window.addEventListener("load",loadHandler);
}())

//Arrow key codes
var UP = 38;
var DOWN = 40;
var RIGHT = 39;
var LEFT = 37;

var speed = 4;
// Array com todas as sprites
var spArray = [];
spArray.push(new Jogador(5,110, 0,"../../../resources/personagem_m_traje.jpg"));

var fan;
var powerup, pontos = 0, p_gain = 50, range = 0;

var myCookies = {};

var paredes = [];

var power_up_sound = new Audio('../../../resources/powerUp.mp3');

function loadHandler()
{
	var canvas = document.getElementById("canvas");
	var ctx = canvas.getContext("2d");
	var track = document.getElementById("track");
	track.volume = 0.1;

	window.addEventListener("keydown", keydownHandler);
	
	paredes.push(new Elemento(277,0,865-283,38));
	
	paredes.push(new Elemento(329,585,841-689,canvas.height-593));

	paredes.push(new Elemento(587,585,830-587,canvas.height-593));
	paredes.push(new Elemento(460,67,598-491,92-67));

	paredes.push(new Elemento(15,535,125-15,574-548));
	paredes.push(new Elemento(12,585,161-12,623-585));
	paredes.push(new Elemento(265,277,341-273,327-277));

	geraPowerUp();
	geraFan();
	//Update the sprite as soon as the image has been loaded
	update();
}

//Add keyboard listeners
function keydownHandler(ev)
{
	var canvas = document.getElementById("canvas");
	switch(ev.keyCode)
	{
		case UP:
			if (spArray[0].direction != DOWN)
				if (spArray.length == 1 || (spArray[0].direction == spArray[1].direction && spArray[0].y == spArray[1].y && Math.abs(spArray[0].x-spArray[1].x) < 3*spArray[0].width))
					spArray[0].direction = UP;
			break;
		case DOWN:
			if (spArray[0].direction != UP)
				if (spArray.length == 1 || (spArray[0].direction == spArray[1].direction && spArray[0].y == spArray[1].y && Math.abs(spArray[0].x-spArray[1].x) < 3*spArray[0].width))
					spArray[0].direction = DOWN;
			break;
		case LEFT:
			if (spArray[0].direction != RIGHT && spArray[0].direction != LEFT)
			{
				if (spArray.length == 1 || (spArray[0].direction == spArray[1].direction && spArray[0].x == spArray[1].x && Math.abs(spArray[0].y-spArray[1].y) < 2*spArray[0].height))
				{
					spArray[0].direction = LEFT;
					correctPos();
				}
			}
			break;
		case RIGHT:
			if (spArray[0].direction != LEFT && spArray[0].direction != RIGHT)
			{
				if (spArray.length == 1 || (spArray[0].direction == spArray[1].direction && spArray[0].x == spArray[1].x && Math.abs(spArray[0].y-spArray[1].y) < 2*spArray[0].height))
				{
					spArray[0].direction = RIGHT;
					correctPos();
				}
			}
			break;
	}
}

function update()
{
	var canvas = document.getElementById("canvas");
	var ctx = canvas.getContext("2d");
	var points = document.getElementById("points");
	//The animation loop
	requestAnimationFrame(update, canvas);

	// atualiza a pontuacao
	points.textContent = "Score: " + pontos;

	// mmovimenta a cobra
	spArray[0].move(canvas, speed);
	for (var i = 1; i < spArray.length; i++)
	{
		spArray[i].move(spArray[i-1], canvas, speed);
	}

	// verifica colisao de fan
	if (verificaColisao(fan) || rangeColisoes(fan))
	{
		pontos += p_gain;
		addFan();
		geraFan();
	}

	// powerup
	if (verificaColisao(powerup))
	{
		range=-1;
		p_gain=50;
		
		power_up_sound.play();
		
		aplicaPowerUp();
		setTimeout(function(){range=-1; p_gain=50;}, 10000);
		setTimeout(geraPowerUp(), 5000);
	}
	
	// verifica colisoes da cobra consigo mesma
	if (verificaColisoes() || verificaColisoesParedes())
	{
		var over_img = document.getElementById("gameover");
		var confirmar = document.getElementById("confirmar");

		confirmar.style.display = "block";
		over_img.style.display = "block";

		gameOver();

		// no final do jogo volta para o menu principal
		confirmar.onclick = function (){window.location.assign("../nivel1/nivel1.html");};
	}

	if (pontos >= 4000)
	{
		var passou = document.getElementById("passou");
		var next = document.getElementById("next");

		gameOver();
		passou.style.display = "block";
		next.style.display = "block";

		next.onclick = function (){window.location.assign("../nivel5/nivel5.html");};
	}

	//Render the sprites
	render();
}

function addFan()
{
	var x = spArray[spArray.length-1].x;
	var y = spArray[spArray.length-1].y;

	switch(spArray[spArray.length-1].direction)
	{
		case UP:
			//y = spArray[spArray.length-1].y + spArray[spArray.length-1].height/2;
			y = spArray[spArray.length-1].y + spArray[spArray.length-1].height;
			break;
		case DOWN:
			//y = spArray[spArray.length-1].y - spArray[spArray.length-1].height/2;
			y = spArray[spArray.length-1].y - spArray[spArray.length-1].height;
			break;
		case LEFT:
			//x = spArray[spArray.length-1].x + spArray[spArray.length-1].width;
			x = spArray[spArray.length-1].x + 2*spArray[spArray.length-1].width;
			break;
		case RIGHT:
			//x = spArray[spArray.length-1].x - spArray[spArray.length-1].width;
			x = spArray[spArray.length-1].x - 2*spArray[spArray.length-1].width;				
			break;
	}

	spArray.push(new Fan(x,y,spArray[spArray.length-1].direction,"../../../resources/personagem_f_traje.jpg"));
}

function render()
{
	var canvas = document.getElementById("canvas");
	var ctx = canvas.getContext("2d");
	//Clear the previous animation frame
	ctx.clearRect(0, 0, canvas.width, canvas.height);
	//Loop through all the sprites in the "sprites" array and use their properties to display them
	
	for(var i = 0; i < spArray.length; i++)
	{
		spArray[i].draw(ctx);
		fan.draw(ctx);
		powerup.draw(ctx);
	}
}

function verificaColisoes()
{
	for (var i = 0; i < spArray.length; i++)
	{
		for (var j = 0; i < spArray.length; i++)
		{
			if (i != j && i != j-1 && i != j+1 && spArray[i].colisao(spArray[j]))
				return true;
		}
	}
	return false;
}


function gameOver()
{
	for(var i = 0; i < spArray.length; i++)
	{
		spArray[i].direction == 0;
		speed = 0;
	}
}

// fix de um pequeno bug
function correctPos()
{
	switch(spArray[0].direction)
	{
		case LEFT:
			spArray[0].x = spArray[0].x + speed;
			break;
		case RIGHT:
			spArray[0].x = spArray[0].x - speed;
			break;
	}
}

function verificaColisao(sprite)
{
	for(var i = 0; i < spArray.length; i++)
	{
		if (spArray[i].colisao(sprite))
			return true;
	}
}

function geraFan()
{
	var canvas = document.getElementById("canvas");
	var x,y;

	do {
		x = parseInt(Math.random()*(canvas.width-12));
		y = parseInt(Math.random()*(canvas.height-28));
		var j = new Elemento(x,y,12,28);
	} while(verificaColisoesParedesSprite(j))
	
	fan = new Fan(x,y,0,"../../../resources/personagem_f_traje.jpg");
}

function geraPowerUp()
{
	var canvas = document.getElementById("canvas");
	var ctx = canvas.getContext("2d");
	var directoria = "../../../resources/";
	var pic;
	var ef = parseInt(Math.random()*4);
	var x,y;

	do {
		x = parseInt(Math.random()*(canvas.width-20));
		y = parseInt(Math.random()*(canvas.height-30));
		var j = new Elemento(x,y,20,30);
	} while(verificaColisoesParedesSprite(j))

	switch(ef)
	{
		case 0:
			pic = directoria+"cerveja.png";
			break;
		case 1:
			pic = directoria+"colher.png";
			break;
		case 2:
			pic = directoria+"guitarra.png";
			break;
		case 3:
			pic = directoria+"livros.png";
			break;
	}

	powerup = new PowerUp(x,y,ef,pic);
	//setTimeout(function(){powerup.erase(ctx);}, 10000);
}

function aplicaPowerUp()
{
	switch(powerup.efeito)
	{
		// cerveja
		case 0:
			// movimentos random
			break;
		// colher
		case 1:
			p_gain = 25;
			break;
		// guitarra
		case 2:
			range = 20;
			break;
		// livros
		case 3:
			p_gain = 75;
			break;
	}
}

function rangeColisoes(sprite)
{
	if (spArray[0].inRange(sprite, range))
		return true;
}

function verificaColisoesParedes()
{
	for (var i = 0; i < spArray.length; i++) {
		for (var j = 0; j < paredes.length; j++) {
			if (spArray[i].colisao(paredes[j]))
				return true;
		}
	}
}

function verificaColisoesParedesSprite(sprite)
{
	for (var i = 0; i < paredes.length; i++) {
		if (paredes[i].colisao(sprite))
			return true;
	}
}
