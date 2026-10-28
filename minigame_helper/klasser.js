class Target extends Ball {
  constructor(x, y, r, img, col, xSpeed, ySpeed, bounds, worth) {
    super(x, y, r, img, col, xSpeed, ySpeed, bounds)
    this.worth = worth
    this.taken = false
  }

  take() {
    if (this.taken) return 0
    this.taken = true
    return this.worth
  }

  place(x, y) {
    this.position.set(x, y)
    this.taken = false
  }

  show() {
    if (this.taken) return
    super.show()
    fill(0)
    noStroke()
    textAlign(CENTER, CENTER)
    textSize(this.diam * 0.28)
    text(this.worth, this.position.x, this.position.y)
  }
}

Firebase.prototype.save = function(name, points) {
  var data
  if (typeof name === 'object') data = Object.assign({}, name)
  else data = { name: name, points: points }
  data.timestamp = firebase.firestore.FieldValue.serverTimestamp()
  this.ref.add(data)
}
