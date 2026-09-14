var gravity 
var friction  
var b
var f 
var points = 1000
var bSound
var bgMusic
var blomkaal
var roedkaal
var floatingBalls = []

async function setup() {
  blomkaal = await loadImage('./assets/blomkaal.png')
  roedkaal = await loadImage('./assets/roedkaal.png')
  bSound = new Audio('./assets/pling.mp3')
  bSound.volume = 0.1
  bgMusic = new Audio('./assets/chiptune.mp3')
  bgMusic.loop = true
  bgMusic.volume = 0.25
  shiftPage('#page1')
  var c = createCanvas(windowWidth, windowHeight)
  select('#page2').child(c)
  select('#startButton').mousePressed(()=>
    {
      startGame()
      shiftPage('#page2')
    })
  select('#restartButton').mousePressed(()=>{    
    startGame()
    shiftPage('#page2')
  })
  
  gravity = createVector(0, 0.5)
  friction = 0.99

  select('#info').html(points)

  b = new Ball(windowWidth/2, 0, 160, blomkaal, 12)
  frameRate(0)
}

function startGame(){
  frameRate(60)
  points = 1000
  if (bgMusic.paused) bgMusic.play()
    startTimer(1, 12, 'top-right', ()=>{
      bgMusic.pause()
      bgMusic.currentTime = 0
      select('#stats').html(`<h1>${points} point</h1>`)
      frameRate(0)
      shiftPage('#page3')
    })
}

function draw() {
  background(100, 10)
  
  b.update()
  b.constrain()
  b.show()

  if(frameCount % 120 == 0){
    f = new FloatingBall(100, 100, 110, roedkaal, 0, 12)
    floatingBalls.push(f)
  }

  floatingBalls.map( f => {
    if(b.hit(f)){
      points--
      bSound.currentTime = 0
      bSound.play()
    }
    f.update()
    f.constrain()
    f.show()
  })

  select('#info').html(points)

}

function keyPressed(){
  if(key == " "){
    b.jump()
  }
}

