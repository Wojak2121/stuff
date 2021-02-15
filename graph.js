// @ts-check

class Graph {
    constructor() {
        /** @type {HTMLCanvasElement} */
        this.canvas

        /** @type {CanvasRenderingContext2D} */
        this.ctx

        this.scaleX = 0
        this.scaleY = 0

        this.translationX = 0
        this.translationY = 0

        this.setupCanvas()
    }
    
    /**
     * Creates the graph's canvas and sets it's default properties.
     * @returns {HTMLCanvasElement}
     */
    setupCanvas() { 
        this.canvas = document.createElement('canvas')
        this.canvas.width = 1000
        this.canvas.height = 1000
        this.canvas.style.display = 'block'
        this.canvas.style.clear = 'both'
        this.ctx = this.canvas.getContext('2d')

        this.ctx.lineCap = 'round'
        this.ctx.font = '30px Arial'

        this.scaleX = 40
        this.scaleY = -40

        this.translationX = 0
        this.translationY = 0

        document.body.style.fontFamily = 'Arial'

        document.body.appendChild(this.canvas)

        const inputs = document.createElement('div')
        inputs.style.float = 'left'
        inputs.id = 'inputs'
        document.body.appendChild(inputs)
        return this.canvas
    }

    /**
     * Sets the size of the graph.
     * @param {number} width 
     * @param {number} height
     */
    setSize(width, height) {
        this.canvas.width = width
        this.canvas.height = height
    }

    /**
     * Returns a function graph that goes from the left to the right of the graph.
     * Step represents how often should the value of the function be checked.
     * @param {function1D} fun
     * @param {string} [color]
     * @param {number} [step]
     * @param {number} [precision]
     * @returns {FunctionGraph}
     */
    getFunctionGraph(fun, color, step, precision) {
        const start = Math.trunc(-this.translationX / this.scaleX) - 1
        const end = Math.trunc((-this.translationX + this.canvas.width) / this.scaleX) + 1
        return new FunctionGraph(fun, start, end, color, step, precision)
    }

    /**
     * Centers the origin point of the canvas to the middle of it.
     */
    center() {
        this.translationX = this.canvas.width * 0.5
        this.translationY = this.canvas.height * 0.5
    }

    /**
     * Centers the graph on the x axis.
     */
    centerX() {
        this.translationX = this.canvas.width * 0.5
    }

    /**
     * Centers the graph on the y axis.
     */
    centerY() {
        this.translationY = this.canvas.height * 0.5
    }

    /**
     * Sets the translation of the graph to the given values.
     * @param {number} x
     * @param {number} y
     */
    setTranslation(x, y) {
        this.translationX = x
        this.translationY = y
    }

    /**
     * Sets the translation of the graph on the x axis.
     * @param {number} x
     */
    setTranslationX(x) {
        this.translationX = x
    }
    
    /**
     * Sets the translation of the graph on the y axis.
     * @param {number} y
     */
    setTranslationY(y) {
        this.translationY = y
    }

    /**
     * Translates the graph by the given values.
     * @param {number} x
     * @param {number} y
     */
    translate(x, y) {
        this.translationX += x
        this.translationY += y
    }

    /**
     * Sets the scale of the graph to the given values.
     * @param {number} x
     * @param {number} y
     */
    setScale(x, y) {
        this.scaleX = x
        this.scaleY = y
    }

    /**
     * Sets the scale of the graph on the x axis.
     * @param {number} x
     */
    setScaleX(x) {
        this.scaleX = x
    }
    
    /**
     * Sets the scale of the graph on the y axis.
     * @param {number} y
     */
    setScaleY(y) {
        this.scaleY = y
    }

    /**
     * Scales the graph by the given values.
     * @param {number} x
     * @param {number} y
     */
    scale(x, y) {
        this.scaleX *= x
        this.scaleY *= y
    }

    /**
     * Clears the graph's background.
     */
    clearBackground() {
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height)
    }

    /**
     * Fills the graph's background with a color.
     * @param {string} color
     */
    fillBackground(color) {
        this.ctx.fillStyle = color
        this.ctx.fillRect(0, 0, this.canvas.width, this.canvas.height)
    }

    /**
     * Draws axis the x and the y axis.
     * @param {number} [lineWidth=3]
     * @param {string} [color='black']
     */
    drawAxis(lineWidth=3, color='black') {
        const ctx = this.ctx
        ctx.lineWidth = lineWidth
        ctx.beginPath()
        ctx.moveTo(0, this.translationY)
        ctx.lineTo(this.canvas.width, this.translationY)
        ctx.moveTo(this.translationX, 0)
        ctx.lineTo(this.translationX, this.canvas.height)
        ctx.strokeStyle = color
        ctx.stroke()
    }

    /**
     * Draws the x axis.
     * @param {number} [lineWidth=3]
     * @param {string} [color='black']
     */
    drawAxisX(lineWidth=3, color='black') {
        const ctx = this.ctx
        ctx.lineWidth = lineWidth
        ctx.beginPath()
        ctx.moveTo(0, this.translationY)
        ctx.lineTo(this.canvas.width, this.translationY)
        ctx.strokeStyle = color
        ctx.stroke()
    }

    /**
     * Draws the y axis.
     * @param {number} [lineWidth=3]
     * @param {string} [color='black']
     */
    drawAxisY(lineWidth=3, color='black') {
        const ctx = this.ctx
        ctx.lineWidth = lineWidth
        ctx.beginPath()
        ctx.moveTo(this.translationX, 0)
        ctx.lineTo(this.translationX, this.canvas.height)
        ctx.strokeStyle = color
        ctx.stroke()
    }

    /**
     * 
     * @param {number} [step=1]
     * @param {Vec2} offset 
     * @param {string} color
     */
    drawNumberLineX(step=1, offset=new Vec2(0, 0), min=-Infinity, max=Infinity, color='black', font='30px arial') {
        const ctx = this.ctx

        const stepX = Math.abs(this.scaleX * step)

        const startX = this.translationX % stepX - stepX
        const endX = this.canvas.width

        ctx.fillStyle = 'black'
        ctx.textAlign = 'center'
        ctx.textBaseline = 'top'
        ctx.beginPath()
        for (let x = startX; x < endX; x += stepX) {
            let value = (x - this.translationX )/ this.scaleX
            if (value >= min && value <= max) {
                ctx.fillText(value, x + offset.x * this.scaleX, this.translationY + offset.y * this.scaleY)
            }
        }
        this.ctx.fill()
    }

    /**
     * 
     * @param {number} [step=1]
     * @param {Vec2} offset 
     * @param {string} color
     */
    drawNumberLineY(step=1, offset=new Vec2(0, 0), min=-Infinity, max=Infinity, color='black', font='30px arial') {
        const ctx = this.ctx

        const stepY = Math.abs(this.scaleY * step)

        const startY = this.translationY % stepY - stepY
        const endY = this.canvas.height

        ctx.fillStyle = 'black'
        ctx.textAlign = 'right'
        ctx.textBaseline = 'middle'
        ctx.font = font
        ctx.beginPath()
        for (let y = startY; y < endY; y += stepY) {
            let value = (y - this.translationY )/ this.scaleY
            if (value >= min && value <= max) {
                ctx.fillText(value, this.translationX + offset.x * this.scaleX, y + offset.y * this.scaleY)
            }
        }
        this.ctx.fill()
    }

    /**
     * Draws a grid.
     * @param {number} [step=1]
     * @param {number} [width=1]
     * @param {string} [color='black']
     */
    drawGrid(step=1, width=1, color='black') {
        const ctx = this.ctx

        const stepX = Math.abs(this.scaleX * step)
        const stepY = Math.abs(this.scaleY * step)

        const startX = this.translationX % stepX - stepX
        const startY = this.translationY % stepY - stepY
        const endX = this.canvas.width
        const endY = this.canvas.height

        ctx.strokeStyle = color
        ctx.lineWidth = width
        ctx.beginPath()
        for (let x = startX; x < endX; x += stepX) {
            this.ctx.moveTo(x, startY)
            this.ctx.lineTo(x, endY)
        }
        for (let y = startY; y < endY; y += stepY) {
            this.ctx.moveTo(startX, y)
            this.ctx.lineTo(endX, y)
        }
        this.ctx.stroke()
    }

    /**
     * Draws a grid on the x axis.
     * @param {number} [step=1]
     * @param {number} [width=1]
     * @param {string} [color='black']
     */
    drawGridX(step=1, width=1, color='black') {
        const ctx = this.ctx

        const stepX = Math.abs(this.scaleX * step)
        const stepY = Math.abs(this.scaleY * step)

        const startX = this.translationX % stepX - stepX
        const startY = this.translationY % stepY - stepY
        const endX = this.canvas.width
        const endY = this.canvas.height

        ctx.strokeStyle = color
        ctx.lineWidth = width
        ctx.beginPath()
        for (let x = startX; x < endX; x += stepX) {
            this.ctx.moveTo(x, startY)
            this.ctx.lineTo(x, endY)
        }
        this.ctx.stroke()
    }

    /**
     * Draws a grid on the y axis.
     * @param {number} [step=1]
     * @param {number} [width=1]
     * @param {string} [color='black']
     */
    drawGridY(step=1, width=1, color='black') {
        const ctx = this.ctx

        const stepX = Math.abs(this.scaleX * step)
        const stepY = Math.abs(this.scaleY * step)

        const startX = this.translationX % stepX - stepX
        const startY = this.translationY % stepY - stepY
        const endX = this.canvas.width
        const endY = this.canvas.height

        ctx.strokeStyle = color
        ctx.lineWidth = width
        ctx.beginPath()
        for (let y = startY; y < endY; y += stepY) {
            this.ctx.moveTo(startX, y)
            this.ctx.lineTo(endX, y)
        }
        this.ctx.stroke()
    }

    /**
     * Draws a line.
     * @param {Vec2} pos1
     * @param {Vec2} pos2
     * @param {string} [color='black']
     * @param {number} [width=Shape2D.defaultLineWidth]
     */
    drawLine(pos1, pos2, color = 'black', width=Shape2D.defaultLineWidth) {
        const ctx = this.ctx

        ctx.lineWidth = width
        ctx.strokeStyle = color

        ctx.beginPath()        
        ctx.moveTo(pos1.x * this.scaleX + this.translationX, pos1.y * this.scaleY + this.translationY)
        ctx.lineTo(pos2.x * this.scaleX + this.translationX, pos2.y * this.scaleY + this.translationY)
        ctx.stroke()
    }

    /**
     * Draws an arrow.
     * @param {Vec2} start
     * @param {Vec2} end
     * @param {string} [color='black']
     * @param {number} [width=Shape2D.defaultLineWidth]
     */
    drawArrow(start, end, color = 'black', width=Shape2D.defaultLineWidth) {
        const ctx = this.ctx
    
        const s = new Vec2(start.x * this.scaleX, start.y * this.scaleY)
        const e = new Vec2(end.x * this.scaleX, end.y * this.scaleY)
        const final = e.sub(s)
        const length = final.len()
        const angle = final.angle()

        const sin = Math.sin(angle)
        const cos = Math.cos(angle)

        const p1 = new Vec2(length - 25, -25)
        const p2 = new Vec2(length - 25, 25)
        
        const x1 = p1.x * cos - p1.y * sin
        const y1 = p1.x * sin + p1.y * cos
        const x2 = p2.x * cos - p2.y * sin
        const y2 = p2.x * sin + p2.y * cos

        p1.x = x1
        p1.y = y1
        p2.x = x2
        p2.y = y2

        p1.assign(p1.add(s))
        p2.assign(p2.add(s))

        ctx.beginPath()
        ctx.moveTo(s.x + this.translationX, s.y + this.translationY)
        ctx.lineTo(e.x + this.translationX, e.y + this.translationY)
        ctx.moveTo(p1.x + this.translationX, p1.y + this.translationY)
        ctx.lineTo(e.x + this.translationX, e.y + this.translationY)
        ctx.lineTo(p2.x + this.translationX, p2.y + this.translationY)
        ctx.lineWidth = width
        ctx.strokeStyle = color
        ctx.stroke()
    }

    /**
     * Draws a point.
     * @param {Vec2} pos
     * @param {string} color
     * @param {number} radius
     */
    drawPoint(pos, color = 'black', radius = Shape2D.defaultLineWidth + 2) { // add option to display position
        const ctx = this.ctx
        ctx.fillStyle = color
        ctx.beginPath()
        ctx.arc(pos.x * this.scaleX + this.translationX, pos.y * this.scaleY + this.translationY, radius, 0, Math.PI * 2)
        ctx.fill()
    }

    /**
     * Draws points.
     * @param {Vec2[]} points
     * @param {string} color
     * @param {number} radius
     */
    drawPoints(points, color = 'black', radius = Shape2D.defaultLineWidth + 2) {
        const ctx = this.ctx
        ctx.fillStyle = color
        points.map(point => {
            ctx.beginPath()
            ctx.arc(point.x * this.scaleX + this.translationX, point.y * this.scaleY + this.translationY, radius, 0, Math.PI * 2)
            ctx.fill()
        })
    }

    /**
     * Draws a function graph object.
     * @param {FunctionGraph} graph Graph to draw.
     */
    drawFunctionGraph(graph) {
        const ctx = this.ctx

        ctx.strokeStyle = graph.outlineColor
        ctx.lineWidth = graph.outlineWidth
        
        ctx.beginPath()
        ctx.moveTo(graph.points[0].x * this.scaleX + this.translationX, graph.points[0].y * this.scaleY + this.translationY)
        for (let i = 1; i < graph.points.length; i++) {
            if (isNaN(graph.points[i].y) || !isFinite(graph.points[i].y)) {
                ctx.stroke()
                ctx.beginPath()
                ctx.moveTo(graph.points[i].x * this.scaleX + this.translationX, graph.points[i].y * this.scaleY + this.translationY)
            }
            else {
                ctx.lineTo(graph.points[i].x * this.scaleX + this.translationX, graph.points[i].y * this.scaleY + this.translationY)
            }
        }
        ctx.stroke()
    }

    /**
     * Draws a Shape2D object.
     * @param {Shape2D} shape
     */
    drawShape(shape) {
        const ctx = this.ctx
        ctx.beginPath()
        ctx.moveTo(shape.points[0].x * this.scaleX + this.translationX, shape.points[0].y * this.scaleY + this.translationY)
        for (let i = 1; i < shape.points.length; i++) {
            ctx.lineTo(shape.points[i].x * this.scaleX + this.translationX, shape.points[i].y * this.scaleY + this.translationY)
        }

        if (shape.closed) {
            ctx.lineTo(shape.points[0].x * this.scaleX + this.translationX, shape.points[0].y * this.scaleY + this.translationY)
            if (shape.fill) {
                ctx.globalAlpha = shape.fillOpacity
                ctx.fillStyle = shape.fillColor
                ctx.fill()
                ctx.globalAlpha = 1
            }
        }
        if (shape.outlineWidth) {
            ctx.strokeStyle = shape.outlineColor
            ctx.lineWidth = shape.outlineWidth
            ctx.stroke()
        }
    }

    /**
     * Draws text.
     * @param {Text2D} text
     */
    drawText(text) {
        const ctx = this.ctx
        ctx.font = text.size + 'px ' + text.font
        ctx.textBaseline = text.baseline
        ctx.textAlign = text.align
        ctx.fillStyle = text.color
        ctx.fillText(text.string, text.pos.x * this.scaleX + this.translationX, text.pos.y * this.scaleY + this.translationY)
    }

    /**
     * Draws a 3D scene.
     * @param {Scene3D} scene 
     */
    drawScene3D(scene) {
        const ctx = this.ctx
        ctx.lineWidth = scene.lineWidth
        let faces = []
        
        if (scene.culling) {
            for (const triangle of scene.meshes[0].faces) {
                const tri = triangle.clone()
    
                for (const p of tri.p) {
                    p.multByMat(scene.matrix)
                    p.z += 3
                }
    
                const normal = triangle.normal.multMat(scene.matrix)
            
                if (normal.clone().dot(tri.p[0]) < 0) {
                    if (tri.p[0].z < 0) {
                        continue
                    }
                    // const lightDirection = 
                    
                    if (scene.shading) 
                        tri.color.multBy(scene.lightDirection.dot(normal))
    
                    faces.push(tri)
                }
            }
        }
        else {
            for (const triangle of scene.meshes[0].faces) {
                const tri = triangle.clone()
    
                for (const p of tri.p) {
                    p.multByMat(scene.matrix)
                    p.z += 3
                }
            
                if (tri.p[0].z < 0) {
                    continue
                }
                
                if (scene.shading) {
                    const normal = triangle.normal.multMat(scene.matrix)
                    tri.color.multBy(scene.lightDirection.dot(normal))
                }

                faces.push(tri)
            }
        }

        faces = faces.sort((a, b) => a.p.reduce((p1, p2) => p1 + p2.z, 0) / a.p.length - b.p.reduce((p1, p2) => p1 + p2.z, 0) / b.p.length)

        for (const tri of faces) {    
            const color = tri.color.toRgbaString()
            ctx.beginPath()
            ctx.moveTo(tri.p[0].x * this.scaleX + this.translationX, tri.p[0].y * this.scaleY + this.translationY)
            for (let i = 1; i < tri.p.length; i++) {
                ctx.lineTo(tri.p[i].x * this.scaleX + this.translationX, tri.p[i].y * this.scaleY + this.translationY)
            }
            ctx.lineTo(tri.p[0].x * this.scaleX + this.translationX, tri.p[0].y * this.scaleY + this.translationY)
            if (scene.fill) {
                ctx.fillStyle = color
                ctx.fill()
            }
            ctx.strokeStyle = color
            ctx.stroke()
        }
    }

    /**
     * Draws a sprite.
     * @param {Sprite} sprite 
     */
    drawSprite(sprite) {
        const ctx = this.ctx
        ctx.translate(sprite.center.x * this.scaleX + this.translationX, sprite.center.y * this.scaleY + this.translationY)
        ctx.rotate(-sprite.angle)
        ctx.translate(-(sprite.center.x * this.scaleX + this.translationX), -(sprite.center.y * this.scaleY + this.translationY))
        ctx.drawImage(sprite.texture, sprite.pos.x * this.scaleX + this.translationX, sprite.pos.y * this.scaleY + this.translationY, sprite.size.x * this.scaleX, sprite.size.y * this.scaleY)
        ctx.resetTransform()
    }

    /**
     * Draws an object on the graph.
     * Objects this method work with: Shape2D, Text, FunctionGraph
     * @param {Text2D|FunctionGraph|Shape2D|Sprite|Scene3D} object
     */
    draw(object) {
        if (object instanceof FunctionGraph) {
            this.drawFunctionGraph(object)
        }
        else if (object instanceof Shape2D) {
            this.drawShape(object)
        }
        else if (object instanceof Text2D) {
            this.drawText(object)
        }
        else if (object instanceof Sprite) {
            this.drawSprite(object)
        }
        else if (object instanceof Scene3D) {
            this.drawScene3D(object)
        }
    }
}

class Text2D {
    /**
     * A text object. The name is Text2d because Text is taken by default.
     * @param {string} string
     * @param {Vec2} pos
     * @param {string} [color='black']
     * @param {number} [size=30]
     */
    constructor(string, pos, color='black', size=30, font='arial') {
        this.string = string
        this.pos = pos
        this.color = color
        this.size = size
        this.font = font
        this.baseline = 'bottom'
        this.align = 'center'
    }
}

class Shape2D {
    static defaultLineWidth = 5
    static defaultFillOpacity = 0.2
    /**
     * A shape defined by points.
     * @param {Vec2[]} points
     * @param {string} color
     * @param {boolean} [fill=false]
     * @param {boolean} [closed=true]
     * @param {Vec2} [center=new Vec2]
     */
    constructor(points, color, fill = false, closed = true, center=new Vec2) {
        this.points = points
        this.fillColor = color
        this.outlineColor = color
        this.outlineWidth = Shape2D.defaultLineWidth
        this.fillOpacity = Shape2D.defaultFillOpacity
        this.fill = fill
        this.closed = closed
        this.center = center
    }

    /**
     * Moves a shape by a vector.
     * @param {Vec2} vec 
     * @returns {Shape2D}
     */
    move(vec) {
        for (const point of this.points) {
            point.addTo(vec)
        }
        this.center.addTo(vec)
        return this
    }

    /**
     * Rotates the shape around that shape's center.
     * @param {number} angle 
     * @returns {Shape2D}
     */
    rot(angle) {
        for (const point of this.points) {
            point.rotAroundBy(this.center, angle)
        }
        return this
    }

    /**
     * Applies a matrix transform to the shape's points.
     * @param {Mat2x2} mat
     * @returns {Shape2D}
     */
    transform(mat) {
        for (const point of this.points) {
            point.multByMat(mat)
        }
        return this
    }

    /**
     * Sets the shapes origin to the average of it's points.
     * @returns {Shape2D}
     */
    centerOrigin() {
        let x = 0, y = 0
        for (const point of this.points) {
            x += point.x
            y += point.y
        }
        x /= this.points.length
        y /= this.points.length
        this.origin = new Vec2(x, y)
        return this
    }

    /**
     * Creates a copy of the object
     * @returns {Shape2D}
     */
    clone() {
        const shape = Object.assign(new Shape2D, JSON.parse(JSON.stringify(this)))
        shape.points = shape.points.map(point => new Vec2(point.x, point.y))
        return shape
    }

    /**
     * Creates a shape from points defined in a string.
     * Example: "1,2 10,2, 5,3"
     * @param {string} string
     * @param {string} color
     * @param {boolean} fill
     * @param {boolean} closed
     * @returns {Shape2D}
     */
    static fromString(string, color, fill, closed) {
        const points = string.split(' ').map(point => {
            const [x, y] = point.split(',')
            return new Vec2(Number(x), Number(y))
        })
        return new Shape2D(points, color, fill, closed)
    }
}

class Rectangle extends Shape2D {
    /**
     * A rectangle.
     * @param {Vec2} pos
     * @param {Vec2} size
     * @param {string} [color]
     * @param {boolean} [fill]
     */
    constructor(pos, size, color, fill) {
        super(
            [
                new Vec2(pos.x,          pos.y), 
                new Vec2(pos.x + size.x, pos.y),
                new Vec2(pos.x + size.x, pos.y + size.y),
                new Vec2(pos.x,          pos.y + size.y)
            ],
            color, fill, true, new Vec2(pos.x + size.x * 0.5, pos.y + size.y * 0.5)
        )
    }
}

class Box extends Rectangle {
    /**
     * A box pos1 defines the first corner and pos2 the corner opposite to it.
     * @param {Vec2} pos1
     * @param {Vec2} pos2
     * @param {string} [color]
     * @param {boolean} [fill]
     */
    constructor(pos1, pos2, color, fill) {
        super(pos1, pos2.sub(pos1), color, fill)
    }
}

class RegularPolygon extends Shape2D {
    /**
     * A regular polygon.
     * @param {Vec2} pos
     * @param {number} pointCount
     * @param {number} [radius=5]
     * @param {string} [color]
     * @param {boolean} [fill]
     */
    constructor(pos, pointCount, radius=5, color, fill) {
        const step = Math.PI * 2 / pointCount
        const points = []
        for (let i = 0; i < pointCount; i ++) {
            points.push(new Vec2(pos.x + Math.cos(Math.PI * 0.5 + i * step) * radius, pos.y + Math.sin(Math.PI * 0.5 + i * step) * radius))
        }
        super(points, color, fill, true, pos.clone())
        this.pos = pos
        this.pointCount = pointCount
        this.radius = radius
    }
}

class Circle extends RegularPolygon {
    /**
     * A circle.
     * @param {Vec2} pos
     * @param {number} [radius=5]
     * @param {string} [color]
     * @param {boolean} [fill]
     * @param {number} [pointCount=50]
     */
    constructor(pos, radius=5, color, fill, pointCount=50) {
        super(pos, pointCount, radius, color, fill)
        this.center = pos.clone()
    }
}

class Arc extends Shape2D {
    /**
     * An arc.
     * @param {Vec2} pos
     * @param {number} startAngle
     * @param {number} endAngle
     * @param {number} [radius=5]
     * @param {string} [color]
     * @param {boolean} [fill=false]
     * @param {number} [pointCount=50]
     */
    constructor(pos, startAngle, endAngle, radius=5, color, fill=false, pointCount=50) {
        const step = (endAngle - startAngle) / pointCount
        const points = []
        for (let i = 0; i < pointCount + 1; i ++) {
            points.push(new Vec2(pos.x + Math.cos(startAngle + i * step) * radius, pos.y + Math.sin(startAngle + i * step) * radius))
        }
        super(points, color, fill, fill, pos.clone())
        this.pos = pos
        this.pointCount = pointCount
        this.radius = radius
    }
}

class Line extends Shape2D {
    /**
     * Line.
     * @param {Vec2} pos1
     * @param {Vec2} pos2
     * @param {string} [color]
     */
    constructor(pos1, pos2, color) {
        super([pos1, pos2], color, false, false)
    }
}

/**
 * A 1D function.
 * @callback function1D
 * @param {number} x
 * @returns {number}
 */

class FunctionGraph extends Shape2D {
    /**
     * A function graph.
     * @param {function1D} fun
     * @param {number} start
     * @param {number} end
     * @param {string} [color]
     * @param {number} [step=0.01]
     * @param {number} [precision=2]
     */
    constructor(fun, start, end, color, step=0.01, precision=2) {
        if (start > end) return new Shape2D([], color)
        
        const points = []
        for (let x = start; x < end; x += step) {
            const roundedX = Number(x.toFixed(precision))
            let y = fun(roundedX)
            points.push(new Vec2(roundedX, y))
        }
        super(points, color, false, false)
    }
}

class Face3D {
    /**
     * A 3D shape.
     * @param {Vec3[]} verts 
     * @param {Color} color 
     */
    constructor(verts, color) {
        this.p = verts
        this.color = color
        this.normal = verts[2].sub(verts[0]).cross(verts[1].sub(verts[0])).norm()
    }

    clone() {
        return new Face3D(this.p.map(p => p.clone()), this.color.clone())
    }
}

class Mesh3D {
    /**
     * A 3D mesh.
     * @param {Face3D[]} faces 
     */
    constructor(faces) {
        this.faces = faces
    }

    /**
     * Loads a 3D mesh from an obj file.
     * @param {string} d 
     * @param {Color} color 
     */
    static fromObjFile(d, color) {
        const data = d.split(/\n| /)
        let verts = []
        let faces = []

        for (let i = 0; i < d.length; i++) {
            if (data[i] == 'v') {
                verts.push(new Vec3(Number(data[i+1]), Number(data[i+2]), Number(data[i+3])))
                i += 3
            }
            if(data[i] == 'f') {
                i++
                const v = []
                while (i < data.length && data[i] != 'f' && data[i] != '') {
                    v.push(verts[data[i]-1].clone())
                    i++
                }
                i--
                faces.push(new Face3D(v, color))
            }
        }
        return new Mesh3D(faces)
    }
}

class Scene3D {
    /**
     * A 3D scene.
     * @param {Mesh3D[]} meshes 
     * @param {Mat3x3} matrix
    */
    constructor(meshes, matrix) {
        this.meshes = meshes
        this.matrix = matrix
        this.fill = true
        this.lineWidth = 1
        this.lightDirection = new Vec3(0, 0, -1)
        this.shading = true
        this.culling = true
    }
}

class Sprite {
    /**
     * A sprite.
     * @param {string} img 
     * @param {Vec2} pos 
     */
    constructor(img, pos, size=new Vec2(1, 1)) {
        this.texture = new Image()
        this.texture.src = img
        this.pos = pos
        this.size = size
        this.center = pos.add(size.mult(0.5))
        this.angle = 0
    }
}

class Color {
    /**
     * A 32 bit color.
     * @param {number} [r=0] 
     * @param {number} [g=0] 
     * @param {number} [b=0] 
     * @param {number} [a=1]
     */
    constructor(r=0, g=0, b=0, a=1) {
        this.arr = new Uint8ClampedArray([r, g, b, a * 255])
    }

    /**
     * Converts a hex string to a color.
     * @param {string} string 
     */
    static fromHexString(string) {
        const arr = new Uint8Array(3)
        for (let i = 0; i < 3; i++) {
            arr[i] = parseInt(string.substr(i * 2, 2), 16)
        }
        return new Color(...arr)
    }

    /**
     * Returns a copy of this color.
     * @returns {Color}
     */
    clone() {
        return new Color(this.arr[0], this.arr[1], this.arr[2], this.arr[3])
    }

    /**
     * Returns a random color with full opacity.
     * @returns {Color}
     */
    static random() {
        return new Color(Math.floor(Math.random() * 256), Math.floor(Math.random() * 256), Math.floor(Math.random() * 256))
    }

    /**
     * Returns the color as a rgb string. rgba(r,g,b).
     * @returns {string}
     */
    toRgbString() {
        return 'rgb(' + this.arr[0] + ',' + this.arr[1] + ',' + this.arr[2] + ')'
    }

    /**
     * Returns the color as a rgba string. rgba(r,g,b,a).
     * @returns {string}
     */
    toRgbaString() {
        return 'rgba(' + this.arr[0] + ',' + this.arr[1] + ',' + this.arr[2] + ',' + this.arr[3] / 255 + ')'
    }

    /**
     * Returns the color as a hex string.
     * @returns {string}
     */
    toHexString() {
        let string = ''
        for (let i = 0; i < 3; i++) {
            string += this.arr[i].toString(16).padStart(2, '0')
        }
        return string
    }

    /**
     * Returns the results of color addition.
     * @param {Color} col
     * @returns {Color}
     */
    add(col) {
        return new Color(this.arr[0] + col.arr[0], this.arr[1] + col.arr[1], this.arr[2] + col.arr[2], this.arr[3])
    }

    /**
     * Adds a color to this one.
     * @param {Color} col
     * @returns {Color}
     */
    addTo(col) {
        this.arr[0] += col.arr[0]
        this.arr[1] += col.arr[1]
        this.arr[2] += col.arr[2]
        return this
    }

    /**
     * Returns the results of color subtraction.
     * @param {Color} col
     * @returns {Color}
     */
    sub(col) {
        return new Color(this.arr[0] - col.arr[0], this.arr[1] - col.arr[1], this.arr[2] - col.arr[2], this.arr[3])
    }

    /**
     * Subtracts a color from this one.
     * @param {Color} col
     * @returns {Color}
     */
    subFrom(col) {
        this.arr[0] -= col.arr[0]
        this.arr[1] -= col.arr[1]
        this.arr[2] -= col.arr[2]
        return this
    }

    /**
     * Returns the results of color scalar multiplication.
     * @param {number} scalar
     * @returns {Color}
     */
    mult(scalar) {
        return new Color(this.arr[0] * scalar, this.arr[1] * scalar, this.arr[2] * scalar, this.arr[3])
    }

    /**
     * Multiplies the components of this color by a scalar.
     * @param {number} scalar
     * @returns {Color}
     */
    multBy(scalar) {
        this.arr[0] *= scalar
        this.arr[1] *= scalar
        this.arr[2] *= scalar
        return this
    }

    /**
     * Returns the results of color scalar division.
     * @param {number} scalar
     * @returns {Color}
     */
    div(scalar) {
        return new Color(this.arr[0] / scalar, this.arr[1] / scalar, this.arr[2] / scalar, this.arr[3])
    }

    /**
     * Divides the components of this color by a scalar.
     * @param {number} scalar
     * @returns {Color}
     */
    divBy(scalar) {
        this.arr[0] /= scalar
        this.arr[1] /= scalar
        this.arr[2] /= scalar
        return this
    }

    /**
     * Blends 2 colors together.
     * @param {Color} col 
     */
    blend(col) {
        const sA = this.arr[3] / 255
        const cA = col.arr[3] / 255
        const aR = sA + cA * (1 - sA)
        const cR = ((this.arr[0] * sA) + (col.arr[0] * cA) * (1 - sA)) / aR
        const cB = ((this.arr[1] * sA) + (col.arr[1] * cA) * (1 - sA)) / aR
        const cG = ((this.arr[2] * sA) + (col.arr[2] * cA) * (1 - sA)) / aR
        return new Color(cR, cG, cB, aR)
    }
    
    /**
     * Returns the inverse of this color.
     * @returns {Color}
     */
    inv() {
        return new Color(255 - this.arr[0], 255 - this.arr[1], 255 - this.arr[2], this.arr[3])
    }

    /**
     * Returns grayscale of this color.
     * @returns {Color}
     */
    grayscale() {
        const col = this.arr[0] * 0.3 + this.arr[1] * 0.59 + this.arr[2] * 0.11
	    return new Color(col, col, col, this.arr[3])
    }

    /**
     * Returns a color linearly interpolated between 2 colors by a given amount.
     * @param {Color} col
     * @param {number} amount
     * @returns {Color}
     */
    lerp(col, amount) {
        return new Color(
            this.arr[0] * (1 - amount) + col.arr[0] * amount,
            this.arr[1] * (1 - amount) + col.arr[1] * amount,
            this.arr[2] * (1 - amount) + col.arr[2] * amount
        )
    }

    /**
     * Linearly interpolates between 2 colors by a given amount.
     * @param {Color} col
     * @param {number} amount
     * @returns {Color}
     */
    lerpTo(col, amount) {
        this.arr[0] = this.arr[0] * (1 - amount) + col.arr[0] * amount
        this.arr[1] = this.arr[1] * (1 - amount) + col.arr[1] * amount
        this.arr[2] = this.arr[2] * (1 - amount) + col.arr[2] * amount
        return this    
    }

    get r() {
        return this.arr[0]
    }

    set r(val) {
        this.arr[0] = val
    }

    get g() {
        return this.arr[1]
    }

    set g(val) {
        this.arr[1] = val
    }

    get b() {
        return this.arr[2]
    }

    set b(val) {
        this.arr[2] = val
    }

    get a() {
        return this.arr[3] / 255
    }

    set a(val) {
        this.arr[3] = val * 255
    }
}

class Vec2 {
    /**
     * A 2D vector.
     * @param {number} [x=0]
     * @param {number} [y=0]
     */
    constructor(x=0, y=0) {
        this.x = x
        this.y = y
    }
    
    /**
     * A 2D zero vector.
     * @constant
     */
    static zero = new Vec2(0, 0)

    /**
     * Creates a vector from an object.
     * @param {{x: number, y: number}} object
     * @returns {Vec2}
     */
    static fromObject(object) {
        return new Vec2(object.x, object.y)
    }

    /**
     * Returns a string representation of vectors components.
     * @returns {string}
     */
    toString() {
        return '[' + this.x + ', ' + this.y + ']'
    }

    /**
     * Returns a new vector with the same components as this one.
     * @returns {Vec2}
     */
    clone() {
        return new Vec2(this.x, this.y)
    }

    /**
     * Assigns components of another vector to this vector.
     * @param {Vec2} vec
     * @returns {Vec2}
     */
    assign(vec) {
        this.x = vec.x
        this.y = vec.y
        return this
    }

    /**
     * Returns the squared length of this vector.
     * @returns {number}
     */
    lenSq() {
        return this.x * this.x + this.y * this.y
    }

    /**
     * Returns the length of this vector.
     * @returns {number}
     */
    len() {
        return Math.sqrt(this.lenSq())
    }

    /**
     * Returns the angle between the x axis and a vector in radians.
     * @returns {number}
     */
    angle() {
        return Math.atan2(this.y, this.x)
    }

    /**
     * Returns the squared distance between 2 vectors.
     * @param {Vec2} vec
     * @returns {number}
     */
    distSq(vec) {
        return (this.x - vec.x) * (this.x - vec.x) + (this.y - vec.y) * (this.y - vec.y)
    }
    
    /**
     * Returns the distance between 2 vectors.
     * @param {Vec2} vec
     * @returns {number}
     */
    dist(vec) {
        return Math.sqrt(this.distSq(vec))
    }

    /**
     * Returns the result of vector addition.
     * @param {Vec2} vec
     * @returns {Vec2}
     */
    add(vec) {
        return new Vec2(this.x + vec.x, this.y + vec.y)
    }

    /**
     * Adds a vector to this one.
     * @param {Vec2} vec 
     * @returns {Vec2}
     */
    addTo(vec) {
        this.x += vec.x
        this.y += vec.y
        return this
    }

    /**
     * Returns the result of vector subtraction.
     * @param {Vec2} vec
     * @returns {Vec2}
     */
    sub(vec) {
        return new Vec2(this.x - vec.x, this.y - vec.y)
    }

    /**
     * Subtracts a vector to this one.
     * @param {Vec2} vec 
     * @returns {Vec2}
     */
    subFrom(vec) {
        this.x -= vec.x
        this.y -= vec.y
        return this
    }

    /**
     * Returns the result of vector scalar multiplication.
     * @param {number} scalar
     * @returns {Vec2}
     */
    mult(scalar) {
        return new Vec2(this.x * scalar, this.y * scalar)
    }

    /**
     * Multiplies this vector's components by a scalar.
     * @param {number} scalar 
     * @returns {Vec2}
     */
    multBy(scalar) {
        this.x *= scalar
        this.y *= scalar
        return this
    }

    /**
     * Returns the result of vector scalar division.
     * @param {number} scalar
     * @returns {Vec2}
     */
    div(scalar) {
        return new Vec2(this.x / scalar, this.y / scalar)
    }

    /**
     * Divides this vector's components by a scalar.
     * @param {number} scalar 
     * @returns {Vec2}
     */
    divBy(scalar) {
        this.x /= scalar
        this.y /= scalar
        return this
    }

    /**
     * Returns the dot product of 2 vectors.
     * @param {Vec2} vec
     * @returns {number}
     */
    dot(vec) {
        return this.x * vec.x + this.y * vec.y
    }

    /**
     * Returns the cross product of 2 vectors.
     * @param {Vec2} vec
     * @returns {number}
     */
    cross(vec) {
        return this.x * vec.y - this.y * vec.x
    }

    /**
     * Returns the vector rotated around the origin of the coordinate system by a specified angle.
     * @param {number} angle
     * @returns {Vec2}
     */
    rot(angle) {
        const sin = Math.sin(angle)
        const cos = Math.cos(angle)
        return new Vec2(
            this.x * cos - this.y * sin,
            this.x * sin + this.y * cos
        )
    }

    /**
     * Rotates this vector by a specified angle around the origin of the coordinate system.
     * @param {number} angle
     * @returns {Vec2}
     */
    rotBy(angle) {
        const sin = Math.sin(angle)
        const cos = Math.cos(angle)
        const x = this.x * cos - this.y * sin
        const y = this.x * sin + this.y * cos
        this.x = x
        this.y = y
        return this
    }

    /**
     * Returns the vector rotated around the given position by a specified angle.
     * @param {Vec2} pos
     * @param {number} angle
     * @returns {Vec2}
     */
    rotAround(pos, angle) {
        return this.sub(pos).rot(angle).add(pos)
    }

    /**
     * Rotates this vector around a given position by a specified angle.
     * @param {Vec2} pos
     * @param {number} angle
     * @returns {Vec2}
     */
    rotAroundBy(pos, angle) {
        return this.subFrom(pos).rotBy(angle).addTo(pos)
    }

    /**
     * Returns a vector with the same direction but scaled down to a length of 1.
     * @returns {Vec2}
     */
    norm() {
        const length = this.len()
        if (length == 0) {
            return new Vec2(0, 0)
        }
        return new Vec2(this.x / length, this.y / length)
    }

    /**
     * Returns the vector opposite to this one.
     * @returns {Vec2}
     */
    opposite() {
        return new Vec2(-this.x, -this.y)
    }

    /**
     * Rounds the components of this vector to the nth decimal place.
     * @param {number} n 
     * @returns {Vec2}
     */
    round(n) {
        this.x = round(this.x, n)
        this.y = round(this.y, n)
        return this
    }

    /**
     * Returns a vector linearly interpolated between 2 vectors by a given amount.
     * @param {Vec2} vec
     * @param {number} amount
     * @returns {Vec2}
     */
    lerp(vec, amount) {
        return new Vec2(
            this.x * (1 - amount) + vec.x * amount,
            this.y * (1 - amount) + vec.y * amount    
        )
    }

    /**
     * Linearly interpolates between 2 vectors by a given amount.
     * @param {Vec2} vec
     * @param {number} amount
     * @returns {Vec2}
     */
    lerpTo(vec, amount) {
        this.x = this.x * (1 - amount) + vec.x * amount
        this.y = this.y * (1 - amount) + vec.y * amount
        return this    
    }

    /**
     * Returns the result of matrix vector multiplication.
     * @param {Mat2x2} mat
     * @returns {Vec2}
     */
    multMat(mat) {
        return new Vec2(
            this.x * mat.m[0][0] + this.y * mat.m[1][0],
            this.x * mat.m[0][1] + this.y * mat.m[1][1]
        )
    }

    /**
     * Multiplies this vector by a matrix.
     * @param {Mat2x2} mat
     * @returns {Vec2}
     */
    multByMat(mat) {
        this.x = this.x * mat.m[0][0] + this.y * mat.m[1][0]
        this.y = this.x * mat.m[0][1] + this.y * mat.m[1][1]
        return this
    }
}

class Mat2x2 {
    /**
     * A 2x2 matrix.
     * @param {number[][]} columns 
     */
    constructor(columns) {
        this.m = columns || new Array(2).fill(new Array(2).fill(0))
    }

    /**
     * Returns a string representation of the matrix's components with basis vectors organized in rows.
     * @returns {string}
     */
    toString() {
        return this.m[0][0] + ', \t' + this.m[0][1] + '\n' +
               this.m[1][0] + ', \t' + this.m[1][1]
    }

    /**
     * Returns the transpose of a matrix.
     * @returns {Mat2x2}
     */
    transpose() {
        return new Mat2x2([
            [this.m[0][0], this.m[1][0]],
            [this.m[0][1], this.m[1][1]]
        ])
    }

    /**
     * Returns the inverse of a matrix.
     * @returns {Mat2x2}
     */
    inv() {
        return new Mat2x2([
            [ this.m[1][1], -this.m[0][1]],
            [-this.m[1][0],  this.m[0][0]]
        ]).mult(1 / this.determinant())
    }
    
    /**
     * Rounds all the entries of this matrix to the nth decimal place.
     * @param {number} n 
     * @returns {Mat2x2}
     */
    round(n) {
        this.m[0][0] = round(this.m[0][0], n)
        this.m[0][1] = round(this.m[0][1], n)
        this.m[1][0] = round(this.m[1][0], n)
        this.m[1][1] = round(this.m[1][1], n)
        return this
    }

    /**
     * Returns the determinant of a matrix.
     * @returns {number}
     */
    determinant() {
        return this.m[0][0] * this.m[1][1] - this.m[1][0] * this.m[0][1]
    }

    /**
     * Returns the result of matrix to matrix addition.
     * @param {Mat2x2} mat
     * @returns {Mat2x2}
     */
    addMat(mat) {
        return new Mat2x2([
            [this.m[0][0] + mat.m[0][0], this.m[0][1] + mat.m[0][1]],
            [this.m[1][0] + mat.m[1][0], this.m[1][1] + mat.m[1][1]]
        ])
    }

    /**
     * Returns the result of matrix scalar multiplication.
     * @param {number} scalar 
     * @returns {Mat2x2}
     */
    mult(scalar) {
        return new Mat2x2([
            [this.m[0][0] * scalar, this.m[0][1] * scalar],
            [this.m[1][0] * scalar, this.m[1][1] * scalar]
        ])
    }
    
    /**
     * Multiplies this matrix by a matrix.
     * @param {Mat2x2} mat 
     * @returns {Mat2x2}
     */
    multByMat(mat) {
        const m00 = this.m[0][0] * mat.m[0][0] + this.m[0][1] * mat.m[1][0]
        const m01 = this.m[0][0] * mat.m[0][1] + this.m[0][1] * mat.m[1][1]
        const m10 = this.m[1][0] * mat.m[0][0] + this.m[1][1] * mat.m[1][0]
        const m11 = this.m[1][0] * mat.m[0][1] + this.m[1][1] * mat.m[1][1]
        this.m[0][0] = m00
        this.m[0][1] = m01
        this.m[1][0] = m10
        this.m[1][1] = m11
        return this
    }

    /**
     * Returns an identity matrix.
     * @returns {Mat2x2}
     */
    static identity() {
        return new Mat2x2([
            [1, 0],
            [0, 1]
        ])
    }

    /**
     * Returns a rotation matrix.
     * @param {number} angle
     * @returns {Mat2x2}
     */
    static rot(angle) {
        const sin = Math.sin(angle)
        const cos = Math.cos(angle)
        return new Mat2x2([
            [cos,  sin],
            [-sin, cos]
        ])
    }
}          

class Vec3 {
    /**
     * A 3D vector.
     * @param {number} [x=0]
     * @param {number} [y=0]
     * @param {number} [z=0]
     */
    constructor(x=0, y=0, z=0) {
        this.x = x
        this.y = y
        this.z = z
    }
    
    /**
     * A 3D zero vector.
     * @constant
     */
    static zero = new Vec3(0, 0, 0)

    /**
     * Creates a vector from an object.
     * @param {{x: number, y: number, z: number}} object
     * @returns {Vec3}
     */
    static fromObject(object) {
        return new Vec3(object.x, object.y, object.z)
    }

    /**
     * Returns a string representation of vectors components.
     * @returns {string}
     */
    toString() {
        return '[' + this.x + ', ' + this.y + ', ' + this.z + ']'
    }

    /**
     * Returns a new vector with the same components as this one.
     * @returns {Vec3}
     */
    clone() {
        return new Vec3(this.x, this.y, this.z)
    }

    /**
     * Assigns components of another vector to this vector.
     * @param {Vec3} vec
     * @returns {Vec3}
     */
    assign(vec) {
        this.x = vec.x
        this.y = vec.y
        this.z = vec.z
        return this
    }

    /**
     * Returns the squared length of this vector.
     * @returns {number}
     */
    lenSq() {
        return this.x * this.x + this.y * this.y + this.z * this.z
    }

    /**
     * Returns the length of this vector.
     * @returns {number}
     */
    len() {
        return Math.sqrt(this.lenSq())
    }

    /**
     * Returns the angle relative to the x axis and a vector in radians.
     * @returns {number}
     */
    angleX() {
        return Math.atan2(Math.sqrt(this.y * this.y + this.z + this.z), this.x)
    }

    /**
     * Returns the angle relative to the y axis and a vector in radians.
     * @returns {number}
     */
    angleY() {
        return Math.atan2(Math.sqrt(this.z * this.z + this.x + this.x), this.y)
    }

    /**
     * Returns the angle relative to the y axis and a vector in radians.
     * @returns {number}
     */
    angleZ() {
        return Math.atan2(Math.sqrt(this.x * this.x + this.y + this.y), this.z)
    }

    /**
     * Returns the squared distance between 2 vectors.
     * @param {Vec3} vec
     * @returns {number}
     */
    distSq(vec) {
        return (this.x - vec.x) * (this.x - vec.x) + (this.y - vec.y) * (this.y - vec.y) + (this.z - vec.z) * (this.z - vec.z)
    }
    
    /**
     * Returns the distance between 2 vectors.
     * @param {Vec3} vec
     * @returns {number}
     */
    dist(vec) {
        return Math.sqrt(this.distSq(vec))
    }

    /**
     * Returns the result of vector addition.
     * @param {Vec3} vec
     * @returns {Vec3}
     */
    add(vec) {
        return new Vec3(this.x + vec.x, this.y + vec.y, this.z * vec.z)
    }

    /**
     * Adds a vector to this one.
     * @param {Vec3} vec
     * @returns {Vec3}
     */
    addTo(vec) {
        this.x += vec.x
        this.y += vec.y
        this.z += vec.z
        return this
    }

    /**
     * Returns the result of vector subtraction.
     * @param {Vec3} vec
     * @returns {Vec3}
     */
    sub(vec) {
        return new Vec3(this.x - vec.x, this.y - vec.y, this.z - vec.z)
    }

    /**
     * Subtracts a vector from this one.
     * @param {Vec3} vec
     * @returns {Vec3}
     */
    subFrom(vec) {
        this.x -= vec.x
        this.y -= vec.y
        this.z -= vec.z
        return this
    }

    /**
     * Returns the result of vector scalar multiplication.
     * @param {number} scalar
     * @returns {Vec3}
     */
    mult(scalar) {
        return new Vec3(this.x * scalar, this.y * scalar, this.z * scalar)
    }

    /**
     * Multiplies this vector's components by a scalar.
     * @param {number} scalar
     * @returns {Vec3}
     */
    multBy(scalar) {
        this.x *= scalar
        this.y *= scalar
        this.z *= scalar
        return this
    }

    /**
     * Returns the result of vector scalar division.
     * @param {number} scalar
     * @returns {Vec3}
     */
    div(scalar) {
        return new Vec3(this.x / scalar, this.y / scalar, this.z / scalar)
    }

    /**
     * Divides this vector's components by a scalar.
     * @param {number} scalar
     * @returns {Vec3}
     */
    divBy(scalar) {
        this.x /= scalar
        this.y /= scalar
        this.z /= scalar
        return this
    }
    
    /**
     * Returns the dot product of 2 vectors.
     * @param {Vec3} vec
     * @returns {number}
     */
    dot(vec) {
        return this.x * vec.x + this.y * vec.y + this.z * vec.z
    }

    /**
     * Returns the cross product of 2 vectors.
     * @param {Vec3} vec
     * @returns {Vec3}
     */
    cross(vec) {
        return new Vec3(
            this.y * vec.z - this.z * vec.y,
            this.z * vec.x - this.x * vec.z,
            this.x * vec.y - this.y * vec.x
        )
    }

    /**
     * Returns the vector rotated around the x axis by a specified angle.
     * @param {number} angle
     * @returns {Vec3}
     */
    rotX(angle) {
        const sin = Math.sin(angle)
        const cos = Math.cos(angle)
        return new Vec3(
            this.x,
            this.y * cos - this.z * sin,
            this.y * sin + this.z * cos
        )
    }

    /**
     * Returns the vector rotated around the y axis by a specified angle.
     * @param {number} angle
     * @returns {Vec3}
     */
    rotY(angle) {
        const sin = Math.sin(angle)
        const cos = Math.cos(angle)
        return new Vec3(
             this.x * cos - this.z * sin,
             this.y,
            -this.x * sin + this.z * cos
        )
    }

    /**
     * Returns the vector rotated around the z axis by a specified angle.
     * @param {number} angle
     * @returns {Vec3}
     */
    rotZ(angle) {
        const sin = Math.sin(angle)
        const cos = Math.cos(angle)
        return new Vec3(
            this.x * cos - this.y * sin,
            this.x * sin + this.y * cos,
            this.z
        )
    }

    // /**
    //  * Returns a vector rotated around a given vector by a specified angle.
    //  * @param {Vec3} vec
    //  * @param {number} angle
    //  * @returns {Vec3}
    //  */
    // rotAround(vec, angle) {
    //     const sin = Math.sin(angle)
    //     const cos = Math.cos(angle)
    //     vec = vec.norm()
    //     return this
    //     .mult(cos)
    //     .add(
    //         vec.cross(this).mult(sin)
    //     )
    //     .add(

    //     )
    // }

    /**
     * Returns a vector with the same direction but scaled down to a length of 1.
     * @returns {Vec3}
     */
    norm() {
        const length = this.len()
        if (length == 0) {
            return new Vec3(0, 0, 0)
        }
        return new Vec3(this.x / length, this.y / length, this.z / length)
    }

    /**
     * Returns an opposite vector.
     * @returns {Vec3}
     */
    opposite() {
        return new Vec3(-this.x, -this.y, -this.z)
    }

    /**
     * Rounds the components of this vector to the nth decimal place.
     * @param {number} n 
     * @returns {Vec3}
     */
    round(n) {
        this.x = round(this.x, n)
        this.y = round(this.y, n)
        this.z = round(this.z, n)
        return this
    }

    /**
     * Returns a vector linearly interpolated between 2 vectors by a given amount.
     * @param {Vec3} vec
     * @param {number} amount
     * @returns {Vec3}
     */
    lerp(vec, amount) {
        return new Vec3(
            this.x * (1 - amount) + vec.x * amount,
            this.y * (1 - amount) + vec.y * amount,
            this.z * (1 - amount) + vec.z * amount
        )
    }

    /**
     * Linearly interpolates between 2 vectors by a given amount.
     * @param {Vec3} vec
     * @param {number} amount
     * @returns {Vec3}
     */
    lerpTo(vec, amount) {
        this.x = this.x * (1 - amount) + vec.x * amount
        this.y = this.y * (1 - amount) + vec.y * amount
        this.z = this.z * (1 - amount) + vec.z * amount
        return this
    }

    /**
     * Returns the result of matrix vector multiplication.
     * @param {Mat3x3} mat
     * @returns {Vec3}
     */
    multMat(mat) {
        return new Vec3(
            this.x * mat.m[0][0] + this.y * mat.m[1][0] + this.z * mat.m[2][0],
            this.x * mat.m[0][1] + this.y * mat.m[1][1] + this.z * mat.m[2][1],
            this.x * mat.m[0][2] + this.y * mat.m[1][2] + this.z * mat.m[2][2]
        )
    }

    /**
     * Multiplies this vector by a matrix.
     * @param {Mat3x3} mat
     * @returns {Vec3}
     */
    multByMat(mat) {
        const x = this.x * mat.m[0][0] + this.y * mat.m[1][0] + this.z * mat.m[2][0]
        const y = this.x * mat.m[0][1] + this.y * mat.m[1][1] + this.z * mat.m[2][1]
        const z = this.x * mat.m[0][2] + this.y * mat.m[1][2] + this.z * mat.m[2][2]
        this.x = x
        this.y = y
        this.z = z
        return this
    }

    /**
     * Returns the result of matrix vector multiplication.
     * @param {Mat4x4} mat
     * @returns {Vec3}
     */
    multMat4(mat) {
        return new Vec3(
            this.x * mat.m[0][0] + this.y * mat.m[1][0] + this.z * mat.m[2][0] + mat.m[3][0],
            this.x * mat.m[0][1] + this.y * mat.m[1][1] + this.z * mat.m[2][1] + mat.m[3][1],
            this.x * mat.m[0][2] + this.y * mat.m[1][2] + this.z * mat.m[2][2] + mat.m[3][2]
        )
    }

    /**
     * Returns the result of matrix vector multiplication.
     * @param {Mat4x4} mat
     * @returns {Vec3}
     */
    multByMat4(mat) {
        const x = this.x * mat.m[0][0] + this.y * mat.m[1][0] + this.z * mat.m[2][0] + mat.m[3][0]
        const y = this.x * mat.m[0][1] + this.y * mat.m[1][1] + this.z * mat.m[2][1] + mat.m[3][1]
        const z = this.x * mat.m[0][2] + this.y * mat.m[1][2] + this.z * mat.m[2][2] + mat.m[3][2]
        this.x = x
        this.y = y
        this.z = z
        return this
    }
}

class Mat3x3 {
    /**
     * A 3x3 matrix.
     * @param {number[][]} columns 
     */
    constructor(columns=new Array(3).fill(new Array(3).fill(0))) {
        this.m = columns
    }

    /**
     * Returns a string representation of the matrix's components with basis vectors organized in rows.
     * @returns {string}
     */
    toString() {
        return this.m[0][0] + ', \t' + this.m[0][1] + ', \t' + this.m[0][2] + '\n' +
               this.m[1][0] + ', \t' + this.m[1][1] + ', \t' + this.m[1][2] + '\n' +
               this.m[2][0] + ', \t' + this.m[2][1] + ', \t' + this.m[2][2] + '\n'
    }

    /**
     * Returns the transpose of a matrix.
     * @returns {Mat3x3}
     */
    transpose() {
        return new Mat3x3([
            [this.m[0][0], this.m[1][0], this.m[2][0]],
            [this.m[0][1], this.m[1][1], this.m[2][1]],
            [this.m[0][2], this.m[1][2], this.m[2][2]]
        ])
    }

    /**
     * Returns the inverse of a matrix.
     * @returns {Mat3x3}
     */
    inv() {
        return new Mat3x3([
            [this.m[1][1] * this.m[2][2] - this.m[1][2] * this.m[2][1], this.m[0][2] * this.m[2][1] - this.m[0][1] * this.m[2][2], this.m[0][1] * this.m[1][2] - this.m[0][2] * this.m[1][1]],
            [this.m[1][2] * this.m[2][0] - this.m[1][0] * this.m[2][2], this.m[0][0] * this.m[2][2] - this.m[0][2] * this.m[2][0], this.m[0][2] * this.m[1][0] - this.m[0][0] * this.m[1][2]],
            [this.m[1][0] * this.m[2][1] - this.m[1][1] * this.m[2][0], this.m[0][1] * this.m[2][0] - this.m[0][0] * this.m[2][1], this.m[0][0] * this.m[1][1] - this.m[0][1] * this.m[1][0]]
        ]).multScalar(1 / this.determinant())
    }
    
    /**
     * Rounds all the entries of this matrix to the nth decimal place.
     * @param {number} n 
     * @returns {Mat3x3}
     */
    round(n) {
        this.m[0][0] = round(this.m[0][0], n)
        this.m[0][1] = round(this.m[0][1], n)
        this.m[0][2] = round(this.m[0][2], n)
        this.m[1][0] = round(this.m[1][0], n)
        this.m[1][1] = round(this.m[1][1], n)
        this.m[1][2] = round(this.m[1][2], n)
        this.m[2][0] = round(this.m[2][0], n)
        this.m[2][1] = round(this.m[2][1], n)
        this.m[2][2] = round(this.m[2][2], n)
        return this
    }

    /**
     * Returns the determinant of a matrix.
     * @returns {number}
     */
    determinant() {
        return this.m[0][0] * (this.m[1][1] * this.m[2][2] - this.m[2][1] * this.m[1][2])
             - this.m[1][0] * (this.m[0][1] * this.m[2][2] - this.m[0][2] * this.m[2][1])
             + this.m[2][0] * (this.m[0][1] * this.m[1][2] - this.m[0][2] * this.m[1][1])
    }

    /**
     * Returns the result of matrix to matrix addition.
     * @param {Mat3x3} mat
     * @returns {Mat3x3}
     */
    addMat(mat) {
        return new Mat3x3([
            [this.m[0][0] + mat.m[0][0], this.m[0][1] + mat.m[0][1], this.m[0][2] + mat.m[0][2]],
            [this.m[1][0] + mat.m[1][0], this.m[1][1] + mat.m[1][1], this.m[1][2] + mat.m[1][2]],
            [this.m[2][0] + mat.m[2][0], this.m[2][1] + mat.m[2][1], this.m[2][2] + mat.m[2][2]]
        ])
    }

    /**
     * Returns the result of matrix scalar multiplication.
     * @param {number} scalar 
     * @returns {Mat3x3}
     */
    multScalar(scalar) {
        return new Mat3x3([
            [this.m[0][0] * scalar, this.m[0][1] * scalar, this.m[0][2] * scalar],
            [this.m[1][0] * scalar, this.m[1][1] * scalar, this.m[1][2] * scalar],
            [this.m[2][0] * scalar, this.m[2][1] * scalar, this.m[2][2] * scalar]
        ])
    }

    /**
     * Returns the result of matrix matrix multiplication.
     * @param {Mat3x3} mat 
     * @returns {Mat3x3}
     */
    multMat(mat) {
        return new Mat3x3([
            [
                this.m[0][0] * mat.m[0][0] + this.m[0][1] * mat.m[1][0] + this.m[0][2] * mat.m[2][0],
                this.m[0][0] * mat.m[0][1] + this.m[0][1] * mat.m[1][1] + this.m[0][2] * mat.m[2][1],
                this.m[0][0] * mat.m[0][2] + this.m[0][1] * mat.m[1][2] + this.m[0][2] * mat.m[2][2]
            ],
            [
                this.m[1][0] * mat.m[0][0] + this.m[1][1] * mat.m[1][0] + this.m[1][2] * mat.m[2][0],
                this.m[1][0] * mat.m[0][1] + this.m[1][1] * mat.m[1][1] + this.m[1][2] * mat.m[2][1],
                this.m[1][0] * mat.m[0][2] + this.m[1][1] * mat.m[1][2] + this.m[1][2] * mat.m[2][2]
            ],
            [
                this.m[2][0] * mat.m[0][0] + this.m[2][1] * mat.m[1][0] + this.m[2][2] * mat.m[2][0],
                this.m[2][0] * mat.m[0][1] + this.m[2][1] * mat.m[1][1] + this.m[2][2] * mat.m[2][1],
                this.m[2][0] * mat.m[0][2] + this.m[2][1] * mat.m[1][2] + this.m[2][2] * mat.m[2][2]
            ]
        ])
	}

    /**
     * Multiplies this matrix by a matrix.
     * @param {Mat3x3} mat 
     * @returns {Mat3x3}
     */
    multByMat(mat) {
        const m00 = this.m[0][0] * mat.m[0][0] + this.m[0][1] * mat.m[1][0] + this.m[0][2] * mat.m[2][0]
        const m01 = this.m[0][0] * mat.m[0][1] + this.m[0][1] * mat.m[1][1] + this.m[0][2] * mat.m[2][1]
        const m02 = this.m[0][0] * mat.m[0][2] + this.m[0][1] * mat.m[1][2] + this.m[0][2] * mat.m[2][2]
        const m10 = this.m[1][0] * mat.m[0][0] + this.m[1][1] * mat.m[1][0] + this.m[1][2] * mat.m[2][0]
        const m11 = this.m[1][0] * mat.m[0][1] + this.m[1][1] * mat.m[1][1] + this.m[1][2] * mat.m[2][1]
        const m12 = this.m[1][0] * mat.m[0][2] + this.m[1][1] * mat.m[1][2] + this.m[1][2] * mat.m[2][2]
        const m20 = this.m[2][0] * mat.m[0][0] + this.m[2][1] * mat.m[1][0] + this.m[2][2] * mat.m[2][0]
        const m21 = this.m[2][0] * mat.m[0][1] + this.m[2][1] * mat.m[1][1] + this.m[2][2] * mat.m[2][1]
        const m22 = this.m[2][0] * mat.m[0][2] + this.m[2][1] * mat.m[1][2] + this.m[2][2] * mat.m[2][2]
        this.m[0][0] = m00
        this.m[0][1] = m01
        this.m[0][2] = m02
        this.m[1][0] = m10
        this.m[1][1] = m11
        this.m[1][2] = m12
        this.m[2][0] = m20
        this.m[2][1] = m21
        this.m[2][2] = m22
        return this
	}

    /**
     * Returns an identity matrix.
     * @returns {Mat3x3}
     */
    static identity() {
        return new Mat3x3([
            [1, 0, 0],
            [0, 1, 0],
            [0, 0, 1]
        ])
    }

    /**
     * Returns a x rotation matrix.
     * @param {number} angle
     * @returns {Mat3x3}
     */
    static rotX(angle) {
        const sin = Math.sin(angle)
        const cos = Math.cos(angle)
        return new Mat3x3([
            [1,   0,    0 ],
            [0,  cos,  sin],
            [0, -sin,  cos]
        ])
    }

    /**
     * Returns a y rotation matrix.
     * @param {number} angle
     * @returns {Mat3x3}
     */
    static rotY(angle) {
        const sin = Math.sin(angle)
        const cos = Math.cos(angle)
        return new Mat3x3([
            [cos, 0, -sin],
            [ 0,  1,   0 ],
            [sin, 0,  cos]
        ])
    }

    /**
     * Returns a z rotation matrix.
     * @param {number} angle
     * @returns {Mat3x3}
     */
    static rotZ(angle) {
        const sin = Math.sin(angle)
        const cos = Math.cos(angle)
        return new Mat3x3([
            [ cos, sin, 0],
            [-sin, cos, 0],
            [  0,   0,  1]
        ])
    }
}    

class Mat4x4 {
    /**
     * A 4x4 matrix.
     * @param {number[][]} columns 
     */
    constructor(columns=new Array(4).fill(new Array(4).fill(0))) {
        this.m = columns
    }


    /**
     * Returns the result of matrix matrix multiplication.
     * @param {Mat4x4} mat 
     * @returns {Mat4x4}
     */
    multMat(mat) {
        return new Mat4x4([
            [
                this.m[0][0] * mat.m[0][0] + this.m[0][1] * mat.m[1][0] + this.m[0][2] * mat.m[2][0] + this.m[0][3] * mat.m[3][0],
                this.m[0][0] * mat.m[0][1] + this.m[0][1] * mat.m[1][1] + this.m[0][2] * mat.m[2][1] + this.m[0][3] * mat.m[3][1],
                this.m[0][0] * mat.m[0][2] + this.m[0][1] * mat.m[1][2] + this.m[0][2] * mat.m[2][2] + this.m[0][3] * mat.m[3][2],
                this.m[0][0] * mat.m[0][3] + this.m[0][1] * mat.m[1][3] + this.m[0][2] * mat.m[2][3] + this.m[0][3] * mat.m[3][3]
            ],
            [
                this.m[1][0] * mat.m[0][0] + this.m[1][1] * mat.m[1][0] + this.m[1][2] * mat.m[2][0] + this.m[1][3] * mat.m[3][0],
                this.m[1][0] * mat.m[0][1] + this.m[1][1] * mat.m[1][1] + this.m[1][2] * mat.m[2][1] + this.m[1][3] * mat.m[3][1],
                this.m[1][0] * mat.m[0][2] + this.m[1][1] * mat.m[1][2] + this.m[1][2] * mat.m[2][2] + this.m[1][3] * mat.m[3][2],
                this.m[1][0] * mat.m[0][3] + this.m[1][1] * mat.m[1][3] + this.m[1][2] * mat.m[2][3] + this.m[1][3] * mat.m[3][3]
            ],
            [
                this.m[2][0] * mat.m[0][0] + this.m[2][1] * mat.m[1][0] + this.m[2][2] * mat.m[2][0] + this.m[2][3] * mat.m[3][0],
                this.m[2][0] * mat.m[0][1] + this.m[2][1] * mat.m[1][1] + this.m[2][2] * mat.m[2][1] + this.m[2][3] * mat.m[3][1],
                this.m[2][0] * mat.m[0][2] + this.m[2][1] * mat.m[1][2] + this.m[2][2] * mat.m[2][2] + this.m[2][3] * mat.m[3][2],
                this.m[2][0] * mat.m[0][3] + this.m[2][1] * mat.m[1][3] + this.m[2][2] * mat.m[2][3] + this.m[2][3] * mat.m[3][3]
            ],
            [
                this.m[3][0] * mat.m[0][0] + this.m[3][1] * mat.m[1][0] + this.m[3][2] * mat.m[2][0] + this.m[3][3] * mat.m[3][0],
                this.m[3][0] * mat.m[0][1] + this.m[3][1] * mat.m[1][1] + this.m[3][2] * mat.m[2][1] + this.m[3][3] * mat.m[3][1],
                this.m[3][0] * mat.m[0][2] + this.m[3][1] * mat.m[1][2] + this.m[3][2] * mat.m[2][2] + this.m[3][3] * mat.m[3][2],
                this.m[3][0] * mat.m[0][3] + this.m[3][1] * mat.m[1][3] + this.m[3][2] * mat.m[2][3] + this.m[3][3] * mat.m[3][3]
            ]
        ])
	}

    // C.a00 = A.a00 * B.a00 + A.a01 * B.a10 + A.a02 * B.a20 + A.a03 * B.a30;
    // C.a01 = A.a00 * B.a01 + A.a01 * B.a11 + A.a02 * B.a21 + A.a03 * B.a31;
    // C.a02 = A.a00 * B.a02 + A.a01 * B.a12 + A.a02 * B.a22 + A.a03 * B.a32;
    // C.a03 = A.a00 * B.a03 + A.a01 * B.a13 + A.a02 * B.a23 + A.a03 * B.a33;

    // C.a10 = A.a10 * B.a00 + A.a11 * B.a10 + A.a12 * B.a20 + A.a13 * B.a30;
    // C.a11 = A.a10 * B.a01 + A.a11 * B.a11 + A.a12 * B.a21 + A.a13 * B.a31;
    // C.a12 = A.a10 * B.a02 + A.a11 * B.a12 + A.a12 * B.a22 + A.a13 * B.a32;
    // C.a13 = A.a10 * B.a03 + A.a11 * B.a13 + A.a12 * B.a23 + A.a13 * B.a33;

    // C.a20 = A.a20 * B.a00 + A.a21 * B.a10 + A.a22 * B.a20 + A.a23 * B.a30;
    // C.a21 = A.a20 * B.a01 + A.a21 * B.a11 + A.a22 * B.a21 + A.a23 * B.a31;
    // C.a22 = A.a20 * B.a02 + A.a21 * B.a12 + A.a22 * B.a22 + A.a23 * B.a32;
    // C.a23 = A.a20 * B.a03 + A.a21 * B.a13 + A.a22 * B.a23 + A.a23 * B.a33;

    // C.a30 = A.a30 * B.a00 + A.a31 * B.a10 + A.a32 * B.a20 + A.a33 * B.a30;
    // C.a31 = A.a30 * B.a01 + A.a31 * B.a11 + A.a32 * B.a21 + A.a33 * B.a31;
    // C.a32 = A.a30 * B.a02 + A.a31 * B.a12 + A.a32 * B.a22 + A.a33 * B.a32;
    // C.a33 = A.a30 * B.a03 + A.a31 * B.a13 + A.a32 * B.a23 + A.a33 * B.a33;
}

// class Vec4 {
//     constructor(x=0, y=0, z=0, w=1) {
//         this.x = x
//         this.y = y
//         this.z = z
//         this.w = w
//     }

//     /**
//      * Returns the result of matrix vector multiplication.
//      * @param {Mat3x3} mat
//      * @returns {Vec3}
//      */
//     multMat(mat) {
//         return new Vec3(
//             this.x * mat.m[0][0] + this.y * mat.m[1][0] + this.z * mat.m[2][0],
//             this.x * mat.m[0][1] + this.y * mat.m[1][1] + this.z * mat.m[2][1],
//             this.x * mat.m[0][2] + this.y * mat.m[1][2] + this.z * mat.m[2][2]
//         )
//     }

//     /**
//      * Multiplies this vector by a matrix.
//      * @param {Mat3x3} mat
//      * @returns {Vec3}
//      */
//     multByMat(mat) {
//         this.x = this.x * mat.m[0][0] + this.y * mat.m[1][0] + this.z * mat.m[2][0]
//         this.y = this.x * mat.m[0][1] + this.y * mat.m[1][1] + this.z * mat.m[2][1]
//         this.z = this.x * mat.m[0][2] + this.y * mat.m[1][2] + this.z * mat.m[2][2]
//         return this
//     }
// }

class Complex {
    static i = new Complex(0, 1)
    static E = new Complex(Math.E, 0)
    static PI = new Complex(Math.PI, 0)
    /**
     * A complex number.
     * @param {number} real 
     * @param {number} imag 
     */
    constructor(real, imag) {
        this.r = real
        this.i = imag
    }

    /**
     * Creates a complex number from a 2D vector.
     * @param {Vec2} vec 
     * @returns {Complex}
     */
    static fromVec2(vec) {
        return new Complex(vec.x, vec.y)
    }

    /**
     * Returns the number as a string.
     * @returns {string}
     */
    toString() {
       return this.r + ' + ' + this.i + 'i' 
    }

    /**
     * Converts a complex number to a 2D vector.
     * @returns {Vec2}
     */
    toVec2() {
        return new Vec2(this.r, this.i)
    }

    /**
     * Returns a copy of this number.
     * @returns {Complex}
     */
    clone() {
        return new Complex(this.r, this.i)
    }

    /**
     * Assigns components of another complex number to this one.
     * @param {Complex} vec
     * @returns {Complex}
     */
    assign(vec) {
        this.r = vec.r
        this.i = vec.i
        return this
    }

    /**
     * Returns a complex number with all components rounded to the nth decimal place.
     * @param {number} [n]
     * @returns {Complex}
     */
    round(n) {
        return new Complex(round(this.r, n), round(this.i, n))
    }

    /**
     * Returns the result of complex number addition.
     * @param {Complex} number 
     * @returns {Complex}
     */
    add(number) {
        return new Complex(this.r + number.r, this.i - number.i)
    }

    /**
     * Adds a complex number to this one.
     * @param {Complex} number 
     * @returns {Complex}
     */
    addTo(number) {
        this.r += number.r
        this.i += number.i
        return this
    }

    /**
     * Returns the result of complex number subtraction.
     * @param {Complex} number
     * @returns {Complex}
     */
    sub(number) {
        return new Complex(this.r - number.r, this.i - number.i)
    }

    /**
     * Subtracts a complex number from this one.
     * @param {Complex} number 
     * @returns {Complex}
     */
    subFrom(number) {
        this.r -= number.r
        this.i -= number.i
        return this
    }

    /**
     * Returns the result of complex number multiplication.
     * @param {Complex} number 
     * @returns {Complex}
     */
    mult(number) {
        return new Complex(this.r * number.r - this.i * number.i, this.i * number.r + number.i * this.r)
    }

    /**
     * Multiplies this number by another complex number.
     * @param {Complex} number 
     * @returns {Complex}
     */
    multBy(number) {
        const r = this.r * number.r - this.i * number.i
        const i = this.i * number.r + number.i * this.r
        this.r = r
        this.i = i
        return this
    }

    /**
     * Returns the result of complex real multiplication.
     * @param {number} number 
     * @returns {Complex}
     */
    multReal(number) {
        return new Complex(this.r * number, this.i * number)
    }

    /**
     * Multiplies this number by a real number.
     * @param {number} number 
     * @returns {Complex}
     */
    multByReal(number) {
        this.r *= number
        this.i *= number
        return this
    }

    /**
     * Returns the result of complex number division.
     * @param {Complex} number 
     * @returns {Complex}
     */
    div(number) {
        const conjugate = number.conjugate()
        return this.mult(conjugate).divReal(number.mult(conjugate).r)
    }

    /**
     * Divides this number by another complex number.
     * @param {Complex} number 
     * @returns {Complex}
     */
    divBy(number) {
        const conjugate = number.conjugate()
        return this.multBy(conjugate).divByReal(number.mult(conjugate).r)
    }

    /**
     * Returns the result of complex real division.
     * @param {number} number 
     * @returns {Complex}
     */
    divReal(number) {
        return new Complex(this.r / number, this.i / number)
    }

    /**
     * Divides this number by a real number.
     * @param {number} number 
     * @returns {Complex}
     */
    divByReal(number) {
        this.r /= number
        this.i /= number
        return this
    }

    /**
     * Returns a complex number raised to a complex power n.
     * @param {Complex} n 
     * @returns {Complex}
     */
    pow(n) {
        // I took this code from https://www.mathsisfun.com/numbers/complex-number-calculator.html.
        if (n.i == 0) {
            if (n.r == -2) return new Complex(1, 0).div(this.mult(this))
            if (n.r == -1) return new Complex(1, 0).div(this)
            if (n.r == 0) return new Complex(1, 0)
            if (n.r == 1) return this
            if (n.r == 2) return this.mult(this)
            if (n.r == 3) return this.mult(this.mult(this))
        }
        const mag = Math.sqrt(this.r * this.r + this.i * this.i)
        const t = Math.atan2(this.i, this.r)
        const re = Math.pow(mag, n.r) * Math.exp(-n.i * t) * Math.cos(n.r * t + n.i * Math.log(mag))
        const im = Math.pow(mag, n.r) * Math.exp(-n.i * t) * Math.sin(n.r * t + n.i * Math.log(mag))
        return new Complex(re, im)
    }

    /**
     * Returns the complex conjugate of a complex number(a + bi -> a - bi). 
     * @returns {Complex}
     */
    conjugate() {
        return new Complex(this.r, -this.i)
    }

    /**
     * Returns the distance from to origin of a coordinate system to the position of this number on a 2D plane.
     * @returns {number}
     */
    len() {
        return Math.sqrt(this.r * this.r + this.i * this.i)
    }
}

/**
 * Check wether 2 numbers are nearly equal.
 * @param {number} number1 
 * @param {number} number2 
 * @param {number} difference 
 */
function isNearlyEqual(number1, number2, difference=0.001) {
    return Math.abs(number1 - number2) < difference
}

/**
 * Return a random integer between min and max.
 * @param {number} min
 * @param {number} max
 * @returns {number}
 */
function randInt(min, max) {
    min = Math.ceil(min)
    max = Math.floor(max)
    return Math.floor(Math.random() * (max - min + 1) + min)
}

/**
 * Returns a random hex color.
 * @returns {string}
 */
function randomColor() {
    return '#' + Math.floor(Math.random()*16777215).toString(16)
}

/**
 * Return a random item from an array.
 * @param {any[]} array
 * @returns {any}
 */
function arrayRandom(array) {
    return array[Math.floor(Math.random() * array.length)]
}

/**
 * Converts radians to degrees.
 * @param {number} rad
 * @returns {number}
 */
function radToDeg(rad) {
    return rad * 180 / Math.PI
}

/**
 * Converts degrees to radians.
 * @param {number} deg
 * @returns {number}
 */
function degToRad(deg) {
    return deg * Math.PI / 180 
}

/**
 * Returns the number x rounded to n decimal places.
 * @param {number} x 
 * @param {number} [n=0] 
 * @returns {number}
 */
function round(x, n=0) {
    return Math.round((x + Number.EPSILON) * 10 ** n) / 10 ** n
}

/**
 * An implementation of the python's range function.
 * @param {number} start 
 * @param {number} [end] 
 * @param {number} [step=1] 
 */
function range(start, end, step=1) {
    if (typeof end === 'undefined') {
        end = start
        start = 0
    }
    if ((step < 0 && start <= end) || (step > 0 && start >= end)) {
        return []
    }
    const result = []
    for (let i = start; step > 0 ? i < end : i > end; i += step) {
        result.push(i)
    }
    return result
}

/**
 * Returns the factorial of n.
 * @param {number} n
 */
function factorial(n) {
    if (n < 0) 
        return undefined
    let out = 1
    while (n > 1) {
        out *= n
        n -= 1
    }
    return out
}

/**
 * Returns the number of combinations of k items from a set of n items.
 * @param {number} n 
 * @param {number} k 
 */
function combination(n, k) {
    return factorial(n) / (factorial(k) * factorial(n-k))
}

/**
 * Returns the average of an array of numbers.
 * @param {number[]} array
 * @returns {number}
 */
function average(array) {
    let result = 0
    for (const number of array) {
        result += number
    }
    return result / array.length
}

/**
 * Return the result of linear interpolation.
 * @param {number} min
 * @param {number} max
 * @param {number} amount
 * @returns {number}
 */
function lerp(min, max, amount) {
    return min * (1 - amount) + max * amount
}

class PRNG {
    static modulus = 281474976710656
    static multiplier = 25214903917
    static increment = 11
    static normalizer = 0.00000000000000355271

    /**
     * An implementation of the linear congruential generator with parameters from java.util.Random.
     * @param {number} seed 
     */
    constructor(seed) {
        this.value = seed
    }

    /**
     * Returns the next integer in the sequence.
     */
    nextInt() {
        return this.value = (this.value * PRNG.multiplier + PRNG.increment) % PRNG.modulus
    }

    /**
     * Returns the next normalized float in the sequence.
     */
    next() {
        return this.nextInt() * PRNG.normalizer
    }
}

class CanvasRecorder {
    /**
     * Records a canvas to a webm.
     * @param {HTMLCanvasElement} canvas
     * @param {number} framerate
     */
    constructor(canvas, framerate) {
        this.canvas = canvas
        this.framerate = framerate
        this.recordedChunks = []
        this.mediaRecorder
    }

    handleDataAvailable(event) {
        if (event.data.size > 0) {
            this.recordedChunks.push(event.data)
        }   
    }

    /**
     * Starts the canvas recording.
     */
    start() {
        const stream = this.canvas.captureStream(this.framerate)
        const options = { mimeType: "video/webm; codecs=vp8" }

        this.mediaRecorder = new MediaRecorder(stream, options)
        this.mediaRecorder.ondataavailable = this.handleDataAvailable.bind(this)
        this.mediaRecorder.start()
    }

    /**
     * Stops the canvas recording.
     */
    stop() {
        this.mediaRecorder.stop()
    }

    /**
     * Opens a download prompt for the recorded video.
     * @param {string} [filename='canvas']
     */
    download(filename='canvas') {
        if (this.recordedChunks.length) {
            const blob = new Blob(this.recordedChunks, {
                type: "video/webm"
            })
            const url = URL.createObjectURL(blob);
            const a = document.createElement("a")
            document.body.appendChild(a)
            a.style = "display: none"
            a.href = url
            a.download = filename + '.webm'
            a.click()
            URL.revokeObjectURL(url)
        }
        else {
            setTimeout(() => {
                this.download(filename)
            })
        }
    }
}

class InputHTML {
    /**
     * Creates a html input element. This is supposed to be used with input types range and number.
     * @param {string} name
     * @param {string} type
     * @param {number} min
     * @param {number} max
     * @param {number} step
     */
    constructor(name, type, min, max, step, defaultValue) {
        this.input = document.createElement('input')
        this.input.type = type
        this.input.min = min
        this.input.max = max
        this.input.step = step

        this.input.value = (defaultValue !== undefined) ? defaultValue : (min + max) / 2

        this.name = document.createElement('div')
        this.name.innerText = name

        this.display = document.createElement('div')
        this.display.innerText = this.input.value

        this.element = document.createElement('div')
        this.element.style.textAlign = 'center'
        this.element.style.float = 'left'
        this.element.appendChild(this.name)
        this.element.appendChild(this.input)
        this.element.appendChild(this.display)

        this.input.addEventListener('input', e => {
            this.display.innerText = e.target.value
        })

        document.getElementById('inputs').appendChild(this.element)
    }

    /**
     * Returns the value of the input.
     */
    value() {
        return Number(this.input.value)
    }
}

class ButtonHTML {
    /**
     * Creates a html button element.
     * @param {string} name Button name.
     * @param {function} fun Function to execute on button press.
     */
    constructor(name, fun) {
        this.button = document.createElement('button')
        this.button.innerText = name
        document.getElementById('inputs').appendChild(this.button)
        this.button.addEventListener('click', fun)
    }
}

class CheckboxHTML {
    constructor(name, checked, unchecked, defaultValue=false) {
        this.input = document.createElement('input')
        this.input.type = 'checkbox'
        this.input.checked = defaultValue

        this.name = document.createElement('div')
        this.name.innerText = name

        this.element = document.createElement('div')
        this.element.style.textAlign = 'center'
        this.element.style.float = 'left'
        this.element.appendChild(this.name)
        this.element.appendChild(this.input)

        document.getElementById('inputs').appendChild(this.element)

        this.input.addEventListener('input', e => {
            if (e.target.checked) {
                checked()
            }
            else {
                unchecked()
            }
        })
    }
}

class InputPointer {
    /**
     * Allows to get the mouse position relative to the graph scale, position and translation.
     * @param {Graph} graph
     */
    constructor(graph) {
        this.graph = graph
        this.pointer = {
            x: 0,
            y: 0,
            pressed: false
        }

        graph.canvas.addEventListener('pointermove', this)
        graph.canvas.addEventListener('pointerdown', this)
        graph.canvas.addEventListener('pointerup', this)
    }

    /**
     * Handles pointer events.
     * @param {object} e 
     */
    handleEvent(e) {
        switch (e.type) {
            case 'pointermove': {
                this.handlePointerMove(e)
                break
            }

            case 'pointerdown': {
                this.handlePointerDown(e)
                break
            }
            
            case 'pointerup': {
                this.handlePointerUp(e)
                break
            }
        }
    }

    /**
     * Handles the pointermove event.
     * @param {object} e 
     */
    handlePointerMove(e) {
        const pos = this.adjustMousePosition(e.clientX, e.clientY)
        this.pointer.x = pos.x
        this.pointer.y = pos.y
    }

    /**
     * Handles the pointerdown event.
     * @param {object} e 
     */
    handlePointerDown(e) {
        const pos = this.adjustMousePosition(e.clientX, e.clientY)
        this.pointer.x = pos.x
        this.pointer.y = pos.y
        this.pointer.pressed = true
    }

    /**
     * Handles the pointerup event.
     * @param {object} e 
     */
    handlePointerUp(e) {
        const pos = this.adjustMousePosition(e.clientX, e.clientY)
        this.pointer.x = pos.x
        this.pointer.y = pos.y
        this.pointer.pressed = false
    }

    /**
     * Returns a position converted to be relative to the graphs position scale and size.
     * @param {number} x 
     * @param {number} y 
     */
    adjustMousePosition(x, y) {
        const rect = this.graph.canvas.getBoundingClientRect()
        return {
            x: (x - rect.left - this.graph.translationX) / this.graph.scaleX,
            y: (y - rect.top - this.graph.translationY) / this.graph.scaleY
        }
    }

    /**
     * Returns the current pointer position.
     * @returns {Vec2}
     */
    getPos() {
        return new Vec2(this.pointer.x, this.pointer.y)
    }

    /**
     * Returns the current pointer position on the x axis.
     * @returns {number}
     */
    getPosX() {
        return this.pointer.x
    }

    /**
     * Returns the current pointer position on the y axis.
     * @returns {number}
     */
    getPosY() {
        return this.pointer.y
    }

    /**
     * Returns if the pointer is pressed.
     * @returns {boolean}
     */
    isPressed() {
        return this.pointer.pressed
    }
}