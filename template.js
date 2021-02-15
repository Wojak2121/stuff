const g = new Graph()
g.center()

function draw() {
	g.fillBackground('white')
	g.drawGrid()
	g.drawAxis()
	
	requestAnimationFrame(draw)
}

draw()