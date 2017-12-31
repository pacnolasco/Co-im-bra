"use strict";

class Elemento
{
	constructor(x, y, wd, hg)
	{
		this.x = x;
		this.y = y;
		this.width = wd;
		this.height = hg;
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
		return Math.abs(this.x-objeto.x) < range && Math.abs(this.y-objeto.y) < range;
	}

}
