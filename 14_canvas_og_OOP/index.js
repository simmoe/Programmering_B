//P5 setup() bliver kaldt EN gang før siden vises 
function setup(){
    var canvas = createCanvas(windowWidth, windowHeight)
    canvas.parent('#page1')
}

var x = 0
var speed = 10

function draw() {
    background(220, 100, 50)

    fill('lightblue')
    circle(x, 100, 50)

    x = x + speed

    if(x > windowWidth){
        x = 0
    }
}
