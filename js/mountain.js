let myCanvas
let mainGraphics

function setup() {
	myCanvas = createCanvas(windowWidth, windowHeight);
	mainGraphics = createGraphics(width, height);
	mainGraphics.background(0);

}

function draw() {

	//mountain part
	mainGraphics.push()
	mainGraphics.image(mainGraphics, 0, 2)

	mainGraphics.beginShape()
	mainGraphics.strokeWeight(1)
	mainGraphics.noFill()
	mainGraphics.translate(0, 100)

	let mouseRatio = noise(frameCount / 50, mouseX / 50) * 1.5
	for (let x = 0; x < width; x += 5) {
		let y =
			mouseRatio * sin(x / 80 + frameCount / 50) * 50 +
			mouseRatio * sin(x / 20 + frameCount / 50) * 20
			+ mouseRatio * noise(x / 100, frameCount / 50)
			* noise(x / 500, frameCount / 50)
			* (map(sin(x /
				(10 + noise(x / 2000, frameCount / 500) * 40)
			), -1, 1, 0, 1))
			* height / 5 + height / 3
			+ noise(x / 50, frameCount / 50) * 100
			;
		//water part 
		mainGraphics.curveVertex(x, y)
		if (y > height * 0.45) {
			mainGraphics.push()
			mainGraphics.noStroke()
			mainGraphics.fill(93 + sin(x) * 50, 206 + sin(x * 1.2 + y / 10) * 50, 244 + sin(x * 1.2) * 30)
			mainGraphics.ellipse(x + random(-1, 1), y + random(-1, 1), 5)
			mainGraphics.pop()
		}
	}
	mainGraphics.stroke(255, map(sin(frameCount / (20 + (1 - mouseRatio) * 500)), -1, 1, 50, 255))
	mainGraphics.endShape()
	mainGraphics.pop()

	image(mainGraphics, 0, 0)
}