var x = 20
var speed = 10
var r = 40

var gravity = 1
var hor_x 
var hor_speed = 0
var hor_r = 20
var hor_y = 0
var hor_velo = .9
var friction = .99


//P5 setup() bliver kaldt EN gang før siden vises 
function setup(){
    var canvas = createCanvas(windowWidth, windowHeight)
    canvas.parent('#page1')

    hor_x = windowWidth / 2
}


//draw kører 60 / sekundet 
function draw() {
    //vi kan sætte draw frameRate her 
    frameRate(60)

    background(220, 100, 50)

    //håndter kugle 1 
    fill('lightblue')
    circle(x, 100, r)

    x = x + speed

    if(x > windowWidth - r/2 || x < 0 + r/2){
        speed = -speed
    }

    //håndter kugle 2 
    fill(100, 80, 220)
    noStroke()

    //fald ned mod jorden
    hor_velo += gravity
    hor_velo *= friction
    hor_y += hor_velo
    circle(hor_x, hor_y, hor_r)

    if(hor_y > windowHeight - hor_r/2){
        hor_y = windowHeight - hor_r/2
        hor_velo = -hor_velo
    }

    select('#info').html(round(hor_velo, 2))
}

function keyPressed(){
    console.log(key)
    if(key == " "){
        hor_velo += -10
    }
}
