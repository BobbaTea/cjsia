// Hey ur pretty curious. This is a custom made canvas animation thing ...


const canvas = document.querySelector('canvas')
const c = canvas.getContext('2d')

canvas.width = innerWidth
canvas.height = innerHeight
const maxRadius = 7
const minRadius = 2
const numCircles = Math.floor((70 / 842400) * canvas.width * canvas.height)
const maxVel = 2
const minVel = -2
var circles = Array(numCircles)

// document.addEventListener('resize', rsz)
function rsz() {
    // stahp = true
    // cancelAnimationFrame(animframe)
    // circles = Array(numCircles)
    // // init()
    // canvas.width = innerWidth
    // canvas.height = innerHeight
    console.log("a")
}

function randomIntFromRange(min, max) {
    return Math.floor(Math.random() * (max - min + 1) + min)
}

function distance(x1, y1, x2, y2) {
    const xDist = x2 - x1
    const yDist = y2 - y1
    return Math.sqrt(Math.pow(xDist, 2) + Math.pow(yDist, 2))
}

class Circle {
    constructor(a, b, c) {

        if ((a === undefined)) {
            this.x = randomIntFromRange(4, canvas.width - 4)
        } else {
            this.x = a
        }

        if ((b === undefined)) {
            this.y = randomIntFromRange(4, canvas.height - 4)
        } else {
            this.y = b
        }

        this.c = c
        this.radius = randomIntFromRange(minRadius, maxRadius)
        this.yvel = (Math.random() * (minVel + maxVel) - minVel) * Math.pow(this.radius / maxRadius, 5) + 0.08;
        this.xvel = (Math.random() * (minVel + maxVel) - minVel) * Math.pow(this.radius / maxRadius, 5) + 0.08;
        this.o = (Math.pow(this.radius / maxRadius, 2) * 0.5) + 0.06
        this.draw()
    }

    update() {
        this.x += this.xvel; // + noise.perlin2(this.x/100 , this.y/200 );
        this.y += this.yvel; //+ noise.perlin2(this.x /200, this.y/100 );
        if (this.x <= 0) {
            this.x += canvas.width
        } else if (this.x >= canvas.width) {
            this.x -= canvas.width
        }

        if (this.y <= 0) {
            this.y += canvas.height
        } else if (this.y >= canvas.height) {
            this.y -= canvas.height
        }


        this.draw()
    }

    draw() {
        c.beginPath()
        c.lineWidth = 0.7;
        c.fillStyle = 'rgb(' + Math.floor((this.x / canvas.width) * 255) + ',0,' + Math.floor(((canvas.width - this.x) / canvas.width) * 255) + ')'
        c.ellipse(this.x, this.y, this.radius, this.radius, Math.PI / 4, 0, 2 * Math.PI)
        c.globalAlpha = this.o * ((Math.random() * 0.3) + 0.7);
        c.fill()
    }
}
Circle.numCreated = 0;

function init() {
    for (var i = 0; i < numCircles; i++) {
        circles[i] = new Circle(undefined, undefined, true)
    }
 }
var animframe = 0
function animate() {
    requestAnimationFrame(animate)
    c.clearRect(0, 0, canvas.width, canvas.height)
    for (var i = 0; i < circles.length; i++) {
        circles[i].update()
    }
}
// document.body.style.background = "linear-gradient(to bottom right, rgba(0, 204, 255, 0.404), rgba(255, 230, 0, 0.336))";

init()
animate()