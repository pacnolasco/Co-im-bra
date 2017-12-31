"use strict";

class PowerUp extends Elemento
{
	constructor(x, y, efeito, pic)
	{
		super(x,y,20,30,pic);

		// 0->cerveja 1->colher 2->guitarra 3->livros
		this.efeito = efeito;
	}
}
