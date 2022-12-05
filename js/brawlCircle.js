var boids = []
var colors = "156064-00c49a-f8e16c-ffc2b4-fb8f67".split("-").map(a => "#" + a)
let overAllTexture
let bgGraphic

function setup() {
	createCanvas(windowWidth, windowHeight);
	background(200);

	// pixelDensity(1)
	overAllTexture = createGraphics(width, height)
	overAllTexture.loadPixels()
	for (var i = 0; i < width + 50; i++) {
		for (var o = 0; o < height + 50; o++) {
			overAllTexture.set(i, o, color(220, noise(i / 10, i * o / 300) * random([0, 0, 50, 150])))
		}
	}
	overAllTexture.updatePixels()
	//

	for (var i = 0; i < 300; i++) {
		let boid = new Boid(random(width), random(height))
		boids.push(boid)
	}
}

function draw() {
	frameRate(50)
	background(0, 3);
	for (let boid of boids) {
		boid.update()
		boid.show()
		// if (boid.lifespan <= 0) {
		// 	boid.dead = true
		// 	boids.slice(boid)
		// }
	}
	// image(bgGraphic, 0, 0)
	push()
	blendMode(MULTIPLY)
	image(overAllTexture, 0, 0, width, height)
	pop()
	// console.log(boids.length)
}

function keyPressed() {

  // If you hit the s key, save an image
  if (key == 's') {
    save("mySketch.png");
  }
}

class Boid {
	constructor(x, y) {
		this.pos = createVector(x, y) || createVector(width / 2, height / 2)
		this.vel = p5.Vector.random2D().mult(5)
		this.acc = createVector(0, 0).setMag(2)
		this.r = noise(frameCount%5)*80
		this.target = createVector(300, 100)
		// this.color = random(["#F194B4", "#FFB100", "#003844"])
		this.color = random(colors)
		this.lifespan = 1000


	}
	update() {
		if (this.dead) {
			return
		}
		this.pos.add(this.vel)
		this.vel.add(this.acc)
		this.acc.mult(0.99)
		this.lifespan -= 2
		if (this.pos.x > width || this.pos.x < 0) {
			this.vel.x *= -1
		}
		if (this.pos.y > width || this.pos.y < 0) {
			this.vel.y *= -1
		}

	}
	show() {
		push()
		translate(this.pos.x, this.pos.y)
		fill(this.color)
		noStroke()
		ellipse(0, 0, this.r)
		pop()
	}
}