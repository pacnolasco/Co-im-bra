"use strict";

class PowerUp extends Elemento
{
	constructor(x, y, efeito, pic)
	{
		super(x,y,20,30,pic);

		// 0->cerveja 1->colher 2->guitarra 3->livros
		this.efeito = efeito;

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
}
