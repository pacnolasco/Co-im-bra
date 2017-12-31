"use strict";

class Fan extends Dinamico
{
	constructor(x, y, dir, img)
	{
		super(x, y, dir, img);
	}

	move(sprite, canvas, speed)
	{
		if (sprite.direction == this.direction)
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
		}
		else
		{
			switch(this.direction)
			{
				case UP:
					if (this.y > sprite.y)
					{
						this.speed = -speed;
						this.y += this.speed;
						break;
					}
					else
						this.direction = sprite.direction;
				case DOWN:
					if (this.y < sprite.y)
					{
						this.speed = speed;
						this.y += this.speed;
						break;
					}
					else
						this.direction = sprite.direction;
				case LEFT:
					if (this.x > sprite.x)
					{
						this.speed = -speed;
						this.x += this.speed;
						break;
					}
					else
						this.direction = sprite.direction;
				case RIGHT:
					if (this.x < sprite.x)
					{
						this.speed = speed;
						this.x += this.speed;
						break;
					}
					else
						this.direction = sprite.direction;
			}
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
