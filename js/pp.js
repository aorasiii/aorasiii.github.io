var ball
var bat
var score = 0;
class Ball {
	constructor(x, y, r) {
		this.x = x;
		this.y = y;
		this.r = r;
		this.xV = noise(frameCount) * 9;
		this.yV = noise(frameCount) * 7;
	}
	show() {
		fill("ORANGE")
		noStroke();
		ellipse(this.x, this.y, this.r)
	}
	move() {
		this.x += this.xV;
		this.y += this.yV;
	}
	checkEdge() {
		if (this.x >= width || this.x <= 0) {
			/*||是or的意思*/
			this.xV *= -1;
		}
		if (this.y >= height || this.y <= 0) {
			this.yV *= -1;
		}
	}
	bounce() {
		this.yV *= -1;
	}
}
class Bat {
	constructor() {
		this.x = 0;
		this.y = 492.5;

		this.width = 70;
		this.height = 15;
	}
	show() {
		rectMode(CENTER);
		fill("white");
		noStroke();
		// var xRange = map(mouseX,0,width,0,500);
		rect(mouseX, this.y, this.width, this.height)
	}

}

function setup() {
	createCanvas(350, 600);
	background(0);
	ball = new Ball(0, 0, 15);
	bat = new Bat();
}

function draw() {
	background(80);
	// translate(width / 2, height / 2);
	// ellipse(mouseX, mouseY, 20, 20);
	ball.move();
	ball.checkEdge();
	ball.show();
	bat.show();
	if (ball.y >= 480) {
		if (ball.x <= mouseX + 30 && ball.x >= mouseX - 30) {
			ball.bounce();
			score += 1;
		}
	}
	textSize(30);
	translate(width / 2, height / 2);
	textAlign(CENTER);
	text(score, 0, -140);
	// text(frameCount,100,100);

	if (ball.y >= 500) {
		// textMode(CENTER);
		textSize(35);
		fill(255);
		// translate(width / 2, height / 2);
		textAlign(CENTER);
		text("Game Over", 0, 0);
		// score -= 1;
		exit();
	}
	for (let i = 0; i < width; i += width / 14) {
		push();
		fill("Red");
		stroke(0);
		strokeWeight(2);
		rect(i, 0, 25, 12);
		pop();
	}
}

function mousePressed() {
	score = 0;
	this.x = width / 2;
	this.y = 150;
	// this.xV = noise(frameCount) * 9;
	// this.yV = noise(frameCount) * 7;
}