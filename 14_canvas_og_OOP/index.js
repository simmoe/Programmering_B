var gravity 
var friction  
var b
var f 
var points = 1000
var bSound



async function setup() {
  bSound = await loadSound("/api_lib/sounds/beep.mp3")
  var c = createCanvas(windowWidth, windowHeight)
  select('#page2').child(c)
  select('#startButton').mousePressed(()=>shiftPage('#page2'))
  gravity = createVector(0, 0.5)
  friction = 0.99

  select('#info').html(points)

  b = new Ball(windowWidth/2, 0, 100, "orange", 12)
  f = new FloatingBall(100, 100, 50, "lightblue", 0, 12)
}

function draw() {
  background(100)
  
  b.update()
  b.constrain()
  b.show()

  if(b.hit(f)){
    points--
    bSound.play()
  }

  select('#info').html(points)

  f.update()
  f.constrain()
  f.show()

}

function keyPressed(){
  if(key == " "){
    b.jump()
    f.jump()
  }
}

