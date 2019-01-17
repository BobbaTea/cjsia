const canvas = document.querySelector('canvas')
const c = canvas.getContext('2d')

canvas.width = innerWidth
canvas.height = innerHeight
const maxRadius = 8
const minRadius = 2
const numCircles = Math.floor((300 / 842400) * canvas.width * canvas.height)
const maxVel = 2
const minVel = -2
const dopacity = 0.0001
var circles = Array(numCircles)
var mx = 0
var my = 0
var click = 1;
var curDist = 100;
var disperse = false
var perlinVal = 50;
document.addEventListener('mousemove', mouse);

function mouse(e) {
    mx = e.clientX
    my = e.clientY
}

document.addEventListener('mousedown', clickd);
document.addEventListener('mouseup', clicku);
document.addEventListener('keydown', disperser);
document.addEventListener('keyup', dispersen);

function disperser() {
    disperse = true
}

function dispersen() {
    disperse = false
}

function clickd() {
    click = 0
}

function clicku() {
    click = 1
}

document.addEventListener('resize', rsz)

function rsz() {
    canvas.width = innerWidth
    canvas.height = innerHeight
}

function map(val, in_min, in_max, out_min, out_max) {
    return (val - in_min) * (out_max - out_min) / (in_max - in_min) + out_min;
}


function randomIntFromRange(min, max) {
    return Math.floor(Math.random() * (max - min + 1) + min)
}

function getRandomColor() {
    var r = randomIntFromRange(0, 255),
        g = randomIntFromRange(0, 255),
        b = randomIntFromRange(0, 255)
    return 'rgb(' + r + ',' + g + ',' + b + ')';
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
        this.yvel = (Math.random() * (minVel + maxVel) - minVel) * Math.pow(this.radius / maxRadius, 4) + 0.08;
        this.xvel = (Math.random() * (minVel + maxVel) - minVel) * Math.pow(this.radius / maxRadius, 4) + 0.08;
        this.o = (Math.pow(this.radius / maxRadius, 2) * 0.9) + 0.08
        this.draw()
    }

    update() {


        if (!this.c) {
            if (disperse) {
                this.c = true;
            }
        } else {
            this.x += this.xvel; // + noise.perlin2(this.x/100 , this.y/200 );
            this.y += this.yvel; //+ noise.perlin2(this.x /200, this.y/100 );
        }

        if (Math.abs(distance(this.x, this.y, mx, my)) <= curDist && this.o > 0.6) {
            this.xvel -= ((mx - this.x) / curDist) * maxVel
            this.yvel -= ((my - this.y) / curDist) * maxVel
        } else {
            if (Math.abs(this.xvel) >= maxVel) {
                this.xvel *= 0.8
            }
            if (Math.abs(this.yvel) >= maxVel) {
                this.yvel *= 0.8
            }

        }
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
        var a = canvas.width - this.x;
        var b = this.x;
        c.fillStyle = "rgb(" + map(a, 0, canvas.width, 0, 220) + ",0," + map(b, 0, canvas.width, 0, 255) +
            ")"
        c.ellipse(this.x, this.y, this.radius, this.radius, Math.PI / 4, 0, 2 * Math.PI)
        c.globalAlpha = this.o;
        c.fill()
    }
}
Circle.numCreated = 0;

function init() {
    for (var i = 0; i < numCircles; i++) {
        circles[i] = new Circle(undefined, undefined, true)
    }
}

function animate() {
    requestAnimationFrame(animate)

    c.clearRect(0, 0, canvas.width, canvas.height)
    c.fillText('CJSIA', 0, 0)
    if (click == 0) {
        circles.push(new Circle(mx, my, false))
    }
    for (var i = 0; i < circles.length; i++) {
       if(i==0){
           console.log(circles[i].x)
       }
        circles[i].update()
    }
    // window.open(canvas.toDataURL(), '_blank')
    // document.querySelector("body").style.background = "url(" + canvas.toDataURL() + ")"
    // document.body.style.background = "url(" + canvas.toDataURL() + ")";

}

init()
animate()