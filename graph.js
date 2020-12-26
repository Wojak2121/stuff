class Graph {
    /**
     * A graph.
     */
    constructor() {
        this.canvas
        this.ctx

        this.font = 'arial'

        this.scaleX = 0
        this.scaleY = 0

        this.translationX = 0
        this.translationY = 0

        this.functionPrecision = 2
        this.functionPrecisionStep = 0.01

        this.setupCanvas()
    }
    
    /**
     * Creates the graph's canvas and sets it's default properties.
     * @returns {HTMLCanvasElement} Canvas
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
     * @param {number} width Width of the graph's canvas.
     * @param {number} height Height of the graph's canvas.
     */
    setSize(width, height) {
        this.canvas.width = width
        this.canvas.height = height
    }

    /**
     * Returns a function graph that goes from the left to the right of the graph.
     * @param {function} fun Function to plot.
     * @param {string} color Color.
     * @param {number} step Distance between every point (e.g. 0.01)
     * @param {number} precision How many decimals points to check (e.g. 2)
     * @returns {FunctionGraph} Plotted function.
     */
    getFunctionGraph(fun, color, step, precision) {
        const start = Math.trunc(-this.translationX / this.scaleX) - 1
        const end = Math.trunc((-this.translationX + this.canvas.width) / this.scaleX) + 1
        return new FunctionGraph(fun, start, end, color, step, precision)
    }

    /**
     * Draws axis.
     * @param {number} lineWidth Line width.
     * @param {string} color Color.
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
     * Draws a grid.
     * @param {number} step Distance between each line.
     * @param {number} width Line width.
     * @param {string} color Color.
     */
    drawGrid(step=1, width=1, color='black') {
        const ctx = this.ctx

        const scaleX = this.scaleX * step
        const scaleY = this.scaleY * step
        const scaleAbsX = Math.abs(scaleX)
        const scaleAbsY = Math.abs(scaleY)

        const startX = this.translationX % scaleX - scaleAbsX
        const startY = this.translationY % scaleY - scaleAbsY
        const endX = startX + this.canvas.width + scaleAbsX
        const endY = startY + this.canvas.height + scaleAbsX

        ctx.strokeStyle = color
        ctx.lineWidth = width
        ctx.beginPath()
        for (let x = startX; x < endX; x += scaleAbsX) {
            this.ctx.moveTo(x, startY)
            this.ctx.lineTo(x, endY)
        }
        for (let y = startY; y < endY; y += scaleAbsY) {
            this.ctx.moveTo(startX, y)
            this.ctx.lineTo(endX, y)
        }
        this.ctx.stroke()
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
     * Centers the graph on the x axis.
     */
    centerY() {
        this.translationY = this.canvas.height * 0.5
    }

    /**
     * Sets the translation of the graph to the given values.
     * @param {number} x Translation on the x axis.
     * @param {number} y Translation on the y axis.
     */
    setTranslation(x, y) {
        this.translationX = x
        this.translationY = y
    }

    /**
     * Sets the translation of the graph on the x axis.
     * @param {number} x Translation on the x axis.
     */
    setTranslationX(x) {
        this.translationX = x
    }
    
    /**
     * Sets the translation of the graph on the y axis.
     * @param {number} x Translation on the y axis.
     */
    setTranslationY(y) {
        this.translationY = y
    }

    /**
     * Translates the graph by the given values.
     * @param {number} x Translation on the x axis.
     * @param {number} y Translation on the y axis.
     */
    translate(x = g.canvas.width * 0.5, y = g.canvas.height * 0.5) {
        // probably should change this function
        this.translationX += x
        this.translationY += y
    }

    /**
     * Sets the scale of the graph to the given values.
     * @param {number} x Scale on the x axis.
     * @param {number} y Scale on the u axis.
     */
    setScale(x, y) {
        this.scaleX = x
        this.scaleY = y
    }

    /**
     * Sets the scale of the graph on the x axis.
     * @param {number} x Scale on the x axis.
     */
    setScaleX(x) {
        this.scaleX = x
    }
    
    /**
     * Sets the scale of the graph on the y axis.
     * @param {number} y Scale on the y axis.
     */
    setScaleY(y) {
        this.scaleY = y
    }

    /**
     * Scales the graph by the given values.
     * @param {number} x Scale on the y axis.
     * @param {number} y Scale on the x axis.
     */
    scale() {
        // probably should change this function
        this.scaleX *= x
        this.scaleY *= y
    }

    /**
     * Sets the font of the graph.
     * @param {string} font Font
     */
    setFont(font) {
        this.font = font
        this.ctx.font = font
    }

    /**
     * Clears the graph's background.
     */
    clearBackground() {
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height)
    }

    /**
     * Fills the graph's background with a color.
     * @param {string} color Color.
     */
    fillBackground(color) {
        this.ctx.fillStyle = color
        this.ctx.fillRect(0, 0, this.canvas.width, this.canvas.height)
    }

    /**
     * Draws a line.
     * @param {Vec2} pos1 Start.
     * @param {Vec2} pos2 End.
     * @param {string} color Color.
     * @param {number} width Width.
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
     * @param {Vec2} start Start.
     * @param {Vec2} end End.
     * @param {string} [color='black'] Color.
     * @param {number} width Width.
     */
    drawArrow(start, end, color = 'black', width=Shape2D.defaultLineWidth) {
        const ctx = this.ctx
    
        const s = new Vec2(start.x * this.scaleX, start.y * this.scaleY)
        const e = new Vec2(end.x * this.scaleX, end.y * this.scaleY)
        const final = e.clone().subtract(s)
        const length = final.length()
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

        p1.add(s)
        p2.add(s)

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
     * @param {Vec2} pos Position.
     * @param {string} color Color.
     * @param {number} radius Radius.
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
     * @param {Vec2[]} points Points to draw.
     * @param {string} color Color.
     * @param {number} radius Radius of the points.
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
        ctx.moveTo(graph.points[0].x * this.scaleX, graph.points[0].y * this.scaleY)
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
     * Draws a shape defined by it's points.
     * @param {Vec2[]} points Points the shape is made of.
     * @param {string} [outlineColor='black'] Color of the the shape's outline.
     * @param {string} [fillColor='black'] Color of the shape's fill.
     * @param {boolean} [fill=false] Should the shape be filled.
     * @param {number} [fillOpacity=0.2] Opacity of the shape's fill.
     * @param {boolean} [closed=true] Should the last point of the shape be connected to the first one.
     * @param {number} [outlineWidth=5] Width of the shape's outline.
     */
    drawShape(points, outlineColor='black', fillColor='black', fill=false, fillOpacity=0.2, closed=true, outlineWidth=5) {
        const ctx = this.ctx
        ctx.beginPath()
        ctx.moveTo(points[0].x * this.scaleX + this.translationX, points[0].y * this.scaleY + this.translationY)
        for (let i = 1; i < points.length; i++) {
            ctx.lineTo(points[i].x * this.scaleX + this.translationX, points[i].y * this.scaleY + this.translationY)
        }

        if (closed) {
            ctx.lineTo(points[0].x * this.scaleX + this.translationX, points[0].y * this.scaleY + this.translationY)
            if (fill) {
                ctx.globalAlpha = fillOpacity
                ctx.fillStyle = fillColor
                ctx.fill()
                ctx.globalAlpha = 1
            }
        }
        ctx.strokeStyle = outlineColor
        ctx.lineWidth = outlineWidth
        ctx.stroke()
    }

    /**
     * Draws text.
     * @param {string} text Text.
     * @param {number} x Text's x position.
     * @param {number} y Text's y position.
     * @param {string} color Text's color.
     * @param {number} size Text's size.
     * @param {string} baseline Text's baseline.
     * @param {string} algin Text's align.
     */
    drawText(text, x, y, color='black', size=30, baseline='bottom', algin='center') {
        const ctx = this.ctx
        ctx.font = size + 'px ' + this.font
        ctx.textBaseline = baseline
        ctx.textAlign = algin
        ctx.fillStyle = color
        ctx.fillText(text, x * this.scaleX + this.translationX, y * this.scaleY + this.translationY)
    }

    /**
     * Draws an object on the graph.
     * Objects this method work with: Shape2D, Text, FunctionGraph
     * @param {} object The object to draw.
     */
    draw(object) {
        if (object instanceof Text2D) {
            this.drawText(object.text, object.pos.x, object.pos.y, object.color, object.size, object.baseline, object.align)
        } 
        else if (object instanceof FunctionGraph) {
            this.drawFunctionGraph(object)
        }
        else if (object instanceof Shape2D) {
            this.drawShape(object.points, object.outlineColor, object.fillColor, object.fill, object.fillOpacity, object.closed, object.outlineWidth)
        }
    }
}

class Text2D {
    /**
     * A text object. The name is Text2d because Text is taken by default.
     * @param {string} text Displayed text.
     * @param {Vec2} pos Text position.
     * @param {string} [color='black'] Text color.
     * @param {number} [size=30] Text size.
     */
    constructor(text, pos, color='black', size=30) {
        this.text = text
        this.pos = pos
        this.color = color
        this.size = size
        this.baseline = 'bottom'
        this.align = 'center'
    }
}

class TextPoint extends Text2D {
    /**
     * Sets the text to the position of the text.
     * @param {Vec2} pos Text position.
     * @param {string} color Text color.
     * @param {number} size Text size.
     */
    constructor(pos, color, size) {
        super(pos.x + ' ' + pos.y, pos, color, size)
    }
}

class Shape2D {
    static shapeCount = 0
    static colors = ['red', 'green', 'darkblue', 'magenta', 'orange', 'lightblue', 'purple', 'yellowgreen', 'darkyellow', 'aqua', 'darkpurple', 'grey']
    static defaultLineWidth = 5
    static defaultFillOpacity = 0.2
    /**
     * A shape defined by points.
     * @param {Vec2[]} points Points the shape is made of.
     * @param {string} color Color of the shape and it's outline.
     * @param {boolean} [fill=false] Should the shape should be draw filled (by default the fill will have 20% opacity).
     * @param {boolean} [closed=true] Should the last point of the shape should be connected to the first one.
     */
    constructor(points, color, fill = false, closed = true) {
        this.points = points
        const shapeColor = color || Shape2D.colors[Shape2D.shapeCount++] || 'black' 
        this.fillColor = shapeColor
        this.outlineColor = shapeColor
        this.outlineWidth = Shape2D.defaultLineWidth
        this.fillOpacity = Shape2D.defaultFillOpacity
        this.fill = fill
        this.closed = closed
    }

    /**
     * Creates a copy of the object
     */
    clone() {
        const shape = Object.assign(new Shape2D, JSON.parse(JSON.stringify(this)))
        shape.points = shape.points.map(point => new Vec2(point.x, point.y, point.w))
        return shape
    }

    /**
     * Creates a shape from points defined in a string.
     * Example: "1,2 10,2, 5,3"
     * @param {string} string String in which the shape's points are defined in.
     */
    static fromString(string) {
        const points = []
        string = string.split(' ').map(point => {
            const [x, y] = point.split(',')
            points.push(new Vec2(Number(x), Number(y)))
        })
        return points
    }
}

class Rectangle extends Shape2D {
    /**
     * Rectangle.
     * @param {Vec2} pos1 First corner of the rectangle.
     * @param {Vec2} pos2 Opposite corner.
     * @param {string} color Color.
     * @param {boolean} fill Should it be filled.
     */
    constructor(pos1, pos2, color, fill) {
        pos2 = pos2.subtract(pos1)
        super(
            [
                new Vec2(pos1.x, pos1.y), 
                new Vec2(pos1.x + pos2.x, pos1.y),
                new Vec2(pos1.x + pos2.x, pos1.y + pos2.y),
                new Vec2(pos1.x, pos1.y + pos2.y)
            ],
            color, fill, true
        )
    }
}

class RegularPolygon extends Shape2D {
    /**
     * Regular polygon.
     * @param {Vec2} pos Position.
     * @param {number} pointCount How many points should it be made of. How detailed should it be.
     * @param {number} radius Radius.
     * @param {string} color Color.
     * @param {boolean} fill Should it be filled.
     */
    constructor(pos, pointCount = 3, radius = 5, color, fill) {
        const step = Math.PI * 2 / pointCount
        const points = []
        for (let i = 0; i < pointCount; i ++) {
            points.push(new Vec2(pos.x + Math.cos(Math.PI * 0.5 + i * step) * radius, pos.y + Math.sin(Math.PI * 0.5 + i * step) * radius))
        }
        super(points, color, fill, true)
        this.pos = pos
        this.pointCount = pointCount
        this.radius = radius
    }
}

class Circle extends RegularPolygon {
    /**
     * Circle.
     * @param {Vec2} pos Position.
     * @param {number} radius Radius.
     * @param {string} color Color.
     * @param {boolean} fill Should it be filled.
     * @param {number} pointCount How many points should it be made of. How detailed should it be.
     */
    constructor(pos, radius = 5, color, fill, pointCount = 50) {
        super(pos, pointCount, radius, color, fill)
    }
}

class Arc extends Shape2D {
    /**
     * Arc.
     * @param {Vec2} pos Position.
     * @param {number} startAngle Start angle in radians.
     * @param {number} endAngle End angle in radians.
     * @param {number} radius Radius.
     * @param {string} color Color.
     * @param {boolean} fill Should it be filled.
     * @param {number} pointCount How many points should it be made of. How detailed should it be.
     */
    constructor(pos, startAngle, endAngle, radius, color, fill = false, pointCount = 50) {
        const step = (endAngle - startAngle) / pointCount
        const points = []
        for (let i = 0; i < pointCount + 1; i ++) {
            points.push(new Vec2(pos.x + Math.cos(startAngle + i * step) * radius, pos.y + Math.sin(startAngle + i * step) * radius))
        }
        super(points, color, fill, fill)
        this.pos = pos
        this.pointCount = pointCount
        this.radius = radius
    }
}

class Line extends Shape2D {
    /**
     * Line.
     * @param {Vec2} pos1 Start.
     * @param {Vec2} pos2 End.
     * @param {string} color Line color.
     */
    constructor(pos1, pos2, color) {
        super([pos1, pos2], color, false, false)
    }
}

class FunctionGraph extends Shape2D {
    /**
     * A function graph shape.
     * @param {function} fun Function to plot.
     * @param {number} start Start of the graph.
     * @param {number} end End of the graph.
     * @param {string} color Graph's color.
     * @param {number} step Distance between every point (e.g. 0.01)
     * @param {number} precision How many decimals points to check (e.g. 2)
     */
    constructor(fun, start, end, color, step=0.01, precision=2) {
        if (start > end) return new Shape2D([])
        
        const points = []

        for (let x = start; x < end; x += step) {
            const roundedX = Number(x.toFixed(precision))
            let y = fun(roundedX)
            points.push(new Vec2(roundedX, y))
        }
        super(points, color, false, false)
    }
}

class Vec2 {
    /**
     * A 2D vector.
     * @param {number} [x=0] The x component of the vector.
     * @param {number} [y=0] The y component of the vector.
     * @param {number} [w=1] The w component of the vector. Allows for affine transformation. If w is equal to 1 then it represents a position if it is equal to 0 it represents a direction.
     */
    constructor(x=0, y=0, w=1) {
        this.x = x
        this.y = y
        this.w = w
    }
    
    /**
     * Returns the components of the vector formatted as a string.
     * @returns {string} String.
     */
    toString() {
        return `x: ${this.x}, y: ${this.y}`
    }

    /**
     * Returns a copy of this vector.
     */
    clone() {
        return new Vec2(this.x, this.y)
    }

    /**
     * Assigns properties of a vector to this vector.
     * @param {Vec2} vec A vector.
     * @returns {Vec2} This.
     */
    assign(vec) {
        this.x = vec.x
        this.y = vec.y
        return this
    }

    /**
     * Returns a vector with rounded components.
     * @returns {Vec2} Rounded vector.
     */
    round() {
        return new Vec2(Math.round(this.x), Math.round(this.y))
    }

    /**
     * Returns the squared length of this vector.
     * @returns {number} Squared length.
     */
    lengthSqr() {
        return this.x * this.x + this.y * this.y
    }

    /**
     * Returns the length of this vector.
     * @returns {number} Length.
     */
    length() {
        return Math.sqrt(this.lengthSqr())
    }

    /**
     * Returns the squared distance between 2 vectors.
     * @param {Vec2} vec The second vector.
     * @returns Squared distance.
     */
    distanceSqr(vec) {
        return (this.x - vec.x) * (this.x - vec.x) + (this.y - vec.y) * (this.y - vec.y)
    }

    /**
     * Returns the distance between 2 vectors.
     * @param {Vec2} vec The second vector.
     * @returns Distance.
     */
    distance(vec) {
        return Math.sqrt(this.distanceSqr(vec))
    }

    /**
     * Returns a vector with the same direction as this one but with a length of 1.
     * @returns {Vec2}
     */
    normalize() {
        const length = this.length()
        if (length == 0) {
            return new Vec2(0, 0)
        }
        return new Vec2(this.x / length, this.y / length)
    }

    /**
     * Returns the result of vector addition.
     * @param {Vec2} vec The other vector.
     * @returns {Vec2} Result of vector addition
     */
    add(vec) {
        return new Vec2(this.x + vec.x, this.y + vec.y)
    }

    /**
     * Returns the result of vector subtraction.
     * @param {Vec2} vec The other vector.
     * @returns {Vec2} Result of vector subtraction.
     */
    subtract(vec) {
        return new Vec2(this.x - vec.x, this.y - vec.y)
    }

    /**
     * Returns the result of vector by scalar multiplication.
     * @param {number} scalar Scalar.
     * @returns {Vec2} Result of vector by scalar multiplication.
     */
    multiply(scalar) {
        return new Vec2(this.x * scalar, this.y * scalar)
    }

    /**
     * Returns the result of vector by scalar division.
     * @param {number} scalar Scalar.
     * @returns {Vec2} Result of vector by scalar division.
     */
    divide(scalar) {
        return new Vec2(this.x / scalar, this.y / scalar)
    }

    /**
     * Returns the vector rotated around the origin of the coordinate system by a specified angle.
     * @param {number} rad Angle of rotation in radians.
     * @return {number} Rotated vector.
     */
    rotate(rad) {
        const sin = Math.sin(rad)
        const cos = Math.cos(rad)
        const x = this.x * cos - this.y * sin
        const y = this.x * sin + this.y * cos
        return new Vec2(x, y)
    }

    /**
     * Returns the vector rotated counterclockwise around the origin of the coordinate system by a specified angle.
     * @param {number} rad Angle of rotation in radians.
     * @return {number} Rotated vector.
     */
    rotateCounterclockwise(rad) {
        const sin = Math.sin(rad)
        const cos = Math.cos(rad)
        const x = this.x * cos + this.y * sin
        const y = -this.x * sin + this.y * cos
        return new Vec2(x, y)
    }

    /**
     * Returns the vector rotated around the origin of the coordinate system to a specified angle.
     * @param {number} rad Angle of rotation in radians.
     * @return {number} Rotated vector.
     */
    rotateTo(rad) {
        return this.rotate(rad - this.angle())
    }

    /**
     * Returns the vector rotated around the given position by a specified angle.
     * @param {Vec2} pos Point to rotate around.
     * @param {number} rad Angle of rotation in radians.
     * @return {number} Rotated vector.
     */
    rotateAround(pos, rad) {
        const vec = this.subtract(pos).rotate(rad).add(pos)
        return new Vec2(vec.x, vec.y)
    }

    /**
     * Returns a vector with the same magnitude but opposite direction.
     * @returns Negative vector.
     */
    negative() {
        return new Vec2(-this.x, -this.y)
    }

    /**
     * Returns the dot product of 2 vectors. The dot product is equal to the cosine between the vectors.
     * @param {*} vec2 The other vector.
     * @returns Dot product.
     */
    dotProduct(vec) {
        return this.x * vec.x + this.y * vec.y
    }

    /**
     * Return a vector linearly interpolated between 2 vectors.
     * @param {Vec2} vec The other vector.
     * @param {number} amount Amount.
     * @returns {Vec2} Interpolated vector.
     */
    lerp(vec, amount) {
        const x = this.x * (1 - amount) + vec.x * amount
        const y = this.y * (1 - amount) + vec.y * amount
        return new Vec2(x, y)
    }

    /**
     * Returns the arc tan of the vectors components.
     * @returns {number} Angle in radians.
     */
    angle() {
        return Math.atan2(this.y, this.x)
    }

    /**
     * Returns the result of vector by matrix multiplication.
     * @param {Mat3x3} mat 3x3 matrix.
     * @returns {Vec2} Multiplied vector.
     */
    multiplyByMat(mat) {
        const x = this.x * mat.m[0][0] + this.y * mat.m[1][0] + this.w * mat.m[2][0]
        const y = this.x * mat.m[0][1] + this.y * mat.m[1][1] + this.w * mat.m[2][1]
        const w = this.x * mat.m[0][2] + this.y * mat.m[1][2] + this.w * mat.m[2][2]
        return new Vec2(x, y, w)
    }
}

class Mat3x3 {
    /**
     * A 3x3 matrix.
     * @param {[number][]} array Matrix as an array.
     */
    constructor(array) {
        this.m = typeof array !== 'undefined' ? array[0].map((_, col) => array.map(row => row[col])) : Array(3).fill().map(()=>Array(3).fill(0))
    }

    /**
     * Returns an identity matrix. Multiplying a vector by an identity matrix doesn't modify it.
     * @returns {Mat3x3} Identity matrix
     */
    static identityMat() {
        const mat = new Mat3x3()
        mat.m[0][0] = 1
        mat.m[1][1] = 1
        mat.m[2][2] = 1
        return mat
    }

    /**
     * Returns a rotation matrix of the specified angle. Multiplying a vector by a rotation matrix rotates it around the origin of the coordinate plane.
     * @param {number} a Angle of the matrix rotation in radians.
     * @returns {Mat3x3} Rotation matrix
     */
    static rotMat(a) {
        const mat = new Mat3x3()
        const sin = Math.sin(a)
        const cos = Math.cos(a)
        mat.m[0][0] = cos
        mat.m[0][1] = -sin
        mat.m[1][0] = sin
        mat.m[1][1] = cos
        mat.m[2][2] = 1
        return mat
    }

    /**
     * Returns a translation matrix of the specified attributes.
     * @param {number} x The translation on the x axis
     * @param {number} y The translation on the y axis
     */
    static transMat(x, y) {
        const mat = new Mat3x3()
        mat.m[0][0] = 1
        mat.m[1][1] = 1
        mat.m[2][2] = 1
        mat.m[2][0] = x
        mat.m[2][1] = y
        return mat
    }

    /**
     * Returns a scaling matrix of the specified attributes.
     * @param {number} sx Scale factor on the x axis.
     * @param {number} sy Scale factor on the y axis.
     */
    static scaleMat(sx, sy) {
        const mat = new Mat3x3()
        mat.m[0][0] = sx
        mat.m[1][1] = sy
        mat.m[2][2] = 1
        return mat
    }

    /**
     * Return the result of matrix by scalar multiplication.
     * @param {*} scalar Scalar.
     * @return {Mat3x3}  Multiplied matrix.
     */
    multiplyByScalar(scalar) {
        const mat = new Mat3x3()
        mat.m[0][0] = scalar * this.m[0][0]
        mat.m[0][1] = scalar * this.m[0][1]
        mat.m[0][2] = scalar * this.m[0][2]
        mat.m[1][0] = scalar * this.m[1][0]
        mat.m[1][1] = scalar * this.m[1][1]
        mat.m[1][2] = scalar * this.m[1][2]
        mat.m[2][0] = scalar * this.m[2][0]
        mat.m[2][1] = scalar * this.m[2][1]
        mat.m[2][2] = scalar * this.m[2][2]
        return mat
    }

    /**
     * Returns the transpose of this matrix.
     * @returns {Mat3x3} Multiplied matrix.
     */
    transpose() {
        const mat = new Mat3x3()
        mat.m = this.m[0].map((_, col) => this.m.map(row => row[col]))
        return mat
    }

    /**
     * Returns the result of matrix by matrix multiplication.
     * @param {Mat3x3} mat The matrix to multiply by.
     * @returns {Mat3x3} Multiplied matrix
     */
    multiplyByMat(m) {
        const mat = new Mat3x3()
            for (let col = 0; col < 3; col++) {
                for (let row = 0; row < 3; row++) {
                    mat.m[row][col] = this.m[row][0] * m.m[0][col] + this.m[row][1] * m.m[1][col] + this.m[row][2] * m.m[2][col]
                }
            }
        return mat
    }
}

/**
 * Return a random integer between min and max.
 * @param {number} min Min value.
 * @param {number} max Max value.
 * @returns {number} Random number
 */
function random(min, max) {
    min = Math.ceil(min)
    max = Math.floor(max)
    return Math.floor(Math.random() * (max - min + 1) + min)
}

/**
 * Returns a random hex color.
 * @returns {string} Color.
 */
function randomColor() {
    return '#' + Math.floor(Math.random()*16777215).toString(16)
}

/**
 * Return a random item from an array.
 * @param {object[]} array An array.
 * @returns {} Random item
 */
function arrayRandom(array) {
    return array[Math.floor(Math.random() * array.length)]
}

/**
 * Converts radians to degrees.
 * @param {number} rad Angle in radians.
 * @returns {number} Angle in degrees
 */
function radToDeg(rad) {
    return rad * 180 / Math.PI
}

/**
 * Converts degrees to radians.
 * @param {number} deg Angle in degrees.
 * @returns {number} Angle in radians
 */
function degToRad(deg) {
    return deg * Math.PI / 180 
}

/**
 * An implementation of python's range function.
 * @param {number} start 
 * @param {number} end 
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
 * Returns a result of a quadratic equation as an array.
 * @param {number} a 
 * @param {number} b 
 * @param {number} c 
 * @returns {number}
 */
function quadraticEquation(a, b, c) {
    const delta = b ** 2 - 4 * a * c
    const deltaSqrt = Math.sqrt(delta)
    console.log(delta)
    if (delta == 0) {
        // Δ = 0 when the vertex of the parabola is on y = 0.
        return [-b / (2 * a)]
    }
    else if (delta > 0) {
        // Δ > 0 when the parabola's are intersect the y axis.
        return [
            (-b + deltaSqrt) / (2 * a),
            (-b - deltaSqrt) / (2 * a)
        ]
    }
    // Δ < 0 when the parabola's arms don't intersect the y axis.
    return []
}

/**
 * Returns the factorial of n.
 * @param {number} n N
 */
function factorial(n) {
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
 * Return the result of linear interpolation.
 * @param {number} min Min value.
 * @param {number} max Max value.
 * @param {number} amount Amount.
 * @returns {number} Result of linear interpolation.
 */
function lerp(min, max, amount) {
    return min * (1 - amount) + max * amount
}

class CanvasRecorder {
    /**
     * Records a canvas to a webm.
     * @param {HTMLCanvasElement} canvas The canvas to be recorded.
     * @param {number} framerate The framerate of the recording.
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
     */
    download() {
        if (this.recordedChunks.length) {
            const blob = new Blob(this.recordedChunks, {
                type: "video/webm"
            })
            const url = URL.createObjectURL(blob);
            const a = document.createElement("a")
            document.body.appendChild(a)
            a.style = "display: none"
            a.href = url
            a.download = "canvas.webm"
            a.click()
            URL.revokeObjectURL(url)
        }
        else {
            setTimeout(() => {
                this.download()
            })
        }
    }
}

class InputHTML {
    /**
     * Creates a html input element. This is supposed to be used with input types range and number.
     * @param {string} name Input's name.
     * @param {string} type Type of the input.
     * @param {number} min Min value.
     * @param {number} max Max value.
     * @param {number} step Step.
     */
    constructor(name, type, min, max, step, defaultValue) {
        this.input = document.createElement('input')
        this.input.type = type
        this.input.min = min
        this.input.max = max
        this.input.step = step
        this.input.value = defaultValue || (min + max) / 2

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
     * Allows to get the mouse position relative to the graph position and translation.
     * @param {Graph} graph The graph to get the pointer position on.
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

    handlePointerMove(e) {
        const pos = this.adjustMousePosition(e.clientX, e.clientY)
        this.pointer.x = pos.x
        this.pointer.y = pos.y
    }

    handlePointerDown(e) {
        const pos = this.adjustMousePosition(e.clientX, e.clientY)
        this.pointer.x = pos.x
        this.pointer.y = pos.y
        this.pointer.pressed = true
    }

    handlePointerUp(e) {
        const pos = this.adjustMousePosition(e.clientX, e.clientY)
        this.pointer.x = pos.x
        this.pointer.y = pos.y
        this.pointer.pressed = false
    }

    adjustMousePosition(x, y) {
        const rect = this.graph.canvas.getBoundingClientRect()
        return {
            x: (x - rect.left - g.translationX) / g.scaleX,
            y: (y - rect.top - g.translationY) / g.scaleY
        }
    }

    /**
     * Returns the current pointer position.
     * @returns {object}
     */
    getPos() {
        return { x: this.pointer.x, y: this.pointer.y }
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