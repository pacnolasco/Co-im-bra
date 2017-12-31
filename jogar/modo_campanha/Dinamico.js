"use strict";

class Dinamico extends Elemento
{
	constructor(x, y, dir, pic)
	{
		super(x,y,12,28,pic);
		
		// velocidade, inicia parado
		this.speed = 0;
		// direcao
		this.direction = dir;

		var img = new Image();
		img.src = pic;
		// imagem
		this.img = img;
	}

	draw(ctx)
	{
		ctx.drawImage(
			this.img, Math.floor(this.x), 
			Math.floor(this.y),this.width, 
			this.height
		);
	}

	erase(ctx)
	{
		ctx.clearRect(this.x,this.y,this.width,this.height);
		this.x = -100;
		this.y = -100;
	}

	move(canvas, speed)
	{
		switch(this.direction)
		{
			case UP:
				this.speed = -speed;
				this.y += this.speed;
				break;
			case DOWN:
				this.speed = speed;
				this.y += this.speed;
				break;
			case LEFT:
				this.speed = -speed;
				this.x += this.speed;
				break;
			case RIGHT:
				this.speed = speed;
				this.x += this.speed;
				break;
		}
		if (this.x > canvas.width-this.width)
			this.x = 0;
		if (this.y > canvas.height-this.height)
			this.y = 0;
		if (this.x < 0)
			this.x = canvas.width-this.width;
		if (this.y < 0)
			this.y = canvas.height-this.height;
	}
}