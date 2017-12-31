"use strict";

class Elemento
{
	constructor(x, y, wd, hg, pic)
	{
		this.x = x;
		this.y = y;
		this.width = wd;
		this.height = hg;

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

	colisao(objeto)
	{
		if (objeto.x < this.x + this.width && objeto.x + objeto.width > this.x &&
			objeto.y < this.y + this.height && objeto.y + objeto.height > this.y)
			return true;
		else
			return false;
	}

	inRange(objeto, range)
	{
		if (range != -1)
			return Math.abs(this.x-objeto.x) < range && Math.abs(this.y-objeto.y) < range;
	}

}
