var gravity
var friction
var canvas
var beep
var fb
var player
var targets
var game
var score
var token = 0
var splashToken = 1
var skipPointer = 0

var settings = {
    name: 'Spiller',
    sound: true,
    difficulty: 'middel',
    color: '#ff6347',
    coins: 0,
    owned: ['#ff6347']
}

var games = [
    { id: 'hop', title: 'Hop', help: 'Pile flytter · mellemrum eller klik hopper' },
    { id: 'skyd', title: 'Skyd', help: 'Klik skyder mod musen' },
    { id: 'traek', title: 'Træk', help: 'Træk i bolden og slip' }
]

var wares = [
    { name: 'Tomat', col: '#ff6347', cost: 0 },
    { name: 'Himmel', col: '#87ceeb', cost: 10 },
    { name: 'Grøn', col: '#3cb371', cost: 10 },
    { name: 'Guld', col: '#ffd700', cost: 30 }
]

var back = {
    hop: '#243044',
    skyd: '#2c241c',
    traek: '#1c2a24'
}

var hopFoot
var hopReach

function setup() {
    gravity = createVector(0, 0.48)
    friction = 0.99
    canvas = createCanvas(windowWidth, windowHeight)
    select('#spil').child(canvas)
    beep = new Audio('../api_lib/sounds/beep.mp3')
    loadLocal()
    fillForm()
    wire()
    if (typeof db !== 'undefined') {
        fb = new Firebase('spilcentral')
        fb.listen(showScores, 50, 'points')
    }
    currentPage = '#splash'
    armSplash()
}

function draw() {
    if (currentPage != '#spil' || !player) return
    background(back[game])
    if (game == 'hop') runHop()
    if (game == 'skyd') runSkyd()
    if (game == 'traek') runTraek()
}

function windowResized() {
    resizeCanvas(windowWidth, windowHeight)
}

function wire() {
    select('#splash-go').mousePressed(goForside)
    select('#play-hop').mousePressed(function() { startGame('hop') })
    select('#play-skyd').mousePressed(function() { startGame('skyd') })
    select('#play-traek').mousePressed(function() { startGame('traek') })
    select('#to-settings').mousePressed(function() { shiftPage('#indstillinger') })
    select('#to-scores').mousePressed(function() { shiftPage('#highscore') })
    select('#to-shop').mousePressed(openShop)
    select('#set-save').mousePressed(function() {
        readSettings()
        showToast('Indstillinger gemt')
        shiftPage('#forside')
    })
    select('#set-back').mousePressed(function() { shiftPage('#forside') })
    select('#score-back').mousePressed(function() { shiftPage('#forside') })
    select('#shop-back').mousePressed(function() { shiftPage('#forside') })
    select('#stop').mousePressed(finish)
}

function armSplash() {
    startTimer(3, 0, 'top-right', function() {
        if (splashToken != 1) return
        if (currentPage != '#splash') return
        goForside()
    })
}

function goForside() {
    splashToken = 0
    selectAll('.timer').map(function(el) { el.remove() })
    paintLook()
    shiftPage('#forside')
}

function info(id) {
    for (var i = 0; i < games.length; i++) {
        if (games[i].id == id) return games[i]
    }
}

function tuning() {
    var table = {
        let: { size: 74, speed: 2.4, seconds: 25, part: 0.72, drag: 200, bullet: 16, g: 0.55 },
        middel: { size: 52, speed: 3.6, seconds: 20, part: 0.5, drag: 140, bullet: 12, g: 0.62 },
        svær: { size: 34, speed: 5.2, seconds: 15, part: 0.32, drag: 90, bullet: 9, g: 0.72 }
    }
    var t = Object.assign({}, table[settings.difficulty] || table.middel)
    var reach = Math.max(180, (windowHeight - 140) * t.part)
    t.jump = Math.sqrt(2 * t.g * reach)
    t.speed = t.speed * Math.max(1, windowWidth / 1100)
    return t
}

function startGame(kind) {
    readSettings()
    if (settings.name == '') {
        showToast('Skriv et navn', 1800, 'warning')
        shiftPage('#indstillinger')
        return
    }
    var t = tuning()
    game = kind
    score = 0
    gravity = createVector(0, t.g)
    friction = 0.99
    resizeCanvas(windowWidth, windowHeight)

    if (kind == 'hop') {
        player = new JumpingBall(width / 2, height - 40, 70, null, t.jump, settings.color, [true, true, true, true])
    }
    if (kind == 'skyd') {
        player = new ShootingBall(width * 0.22, height / 2, 70, null, t.speed, t.bullet, settings.color, [true, true, true, true])
    }
    if (kind == 'traek') {
        player = new SpringBall(width * 0.18, height * 0.62, 70, null, t.drag, settings.color, [false, false, false, false])
    }
    makeTargets(t)

    var g = info(kind)
    select('#hud-title').html(g.title + ' · ' + settings.difficulty)
    select('#hud-score').html(0)
    select('#hud-help').html(g.help)
    select('#spil').child(canvas)
    shiftPage('#spil')
    skipPointer = millis() + 300
    beginRound(t.seconds)
}

function makeTargets(t) {
    targets = []
    hopFoot = height - 40
    hopReach = (t.jump * t.jump) / (2 * t.g)
    for (var i = 0; i < 4; i++) {
        var worth = game == 'traek' ? 10 + i * 10 : 10 + i * 5
        var size = game == 'traek' ? t.size + 16 - i * 10 : t.size
        var xSpeed = t.speed * (i % 2 ? 1 : -1)
        if (game == 'traek') xSpeed *= 0.45
        var bounds = [true, true, true, true]
        var x = random(width * 0.4, width - 80)
        var y = random(90, height * 0.55)
        if (game == 'hop') {
            bounds = [true, true, false, false]
            x = random(80, width - 80)
            y = hopY(i / 3)
        }
        targets.push(new Target(
            x, y,
            Math.max(30, size),
            null,
            ['#ffd700', '#87ceeb', '#dda0dd', '#ffa07a'][i],
            xSpeed,
            0,
            bounds,
            worth
        ))
    }
}

function hopY(span) {
    var minLift = Math.max(110, hopReach * 0.28)
    var maxLift = Math.max(minLift + 48, hopReach * 0.92)
    var y = hopFoot - minLift - (maxLift - minLift) * span
    if (y < 80) y = 80
    return y
}

function runHop() {
    var glide = tuning().speed * 2.1
    if (keyIsDown(LEFT_ARROW)) player.velocity.x = -glide
    else if (keyIsDown(RIGHT_ARROW)) player.velocity.x = glide
    else player.velocity.x *= 0.8
    noStroke()
    fill(255, 28)
    rect(0, height - 14, width, 14)
    player.update()
    player.constrain()
    hitTargets(player)
    player.show()
}

function runSkyd() {
    var hx = mouseX - player.position.x
    var hy = mouseY - player.position.y
    if (hx != 0 || hy != 0) player.heading.set(hx, hy)
    player.velocity.set(0, 0)
    player.update()
    player.bullets.map(function(b) {
        targets.map(function(t) {
            if (t.taken || !b.hit(t)) return
            var n = t.take()
            if (!n) return
            scorePoint(n)
            recycle(t)
            b.position.x = -999
        })
    })
    targets.map(function(t) {
        t.update()
        t.constrain()
        t.show()
    })
    player.show()
}

function runTraek() {
    var near = dist(mouseX, mouseY, player.position.x, player.position.y) < player.diam / 2
    if (mouseIsPressed && !player.isFlying && (player.isDragging || near)) player.drag()
    player.update()
    if (player.isFlying) {
        hitTargets(player, function() { player.reset() })
        if (
            player.position.x < 0 ||
            player.position.x > width ||
            player.position.y > height
        ) player.reset()
    } else {
        targets.map(function(t) {
            t.update()
            t.constrain()
            t.show()
        })
    }
    player.show()
}

function hitTargets(hitter, after) {
    targets.map(function(t) {
        t.update()
        t.constrain()
        if (hitter.hit(t)) {
            var n = t.take()
            if (n) {
                scorePoint(n)
                recycle(t)
                if (after) after()
            }
        }
        t.show()
    })
}

function recycle(t) {
    if (game == 'hop') {
        t.place(random(80, width - 80), hopY(random()))
        return
    }
    t.place(random(width * 0.4, width - 80), random(80, height * 0.55))
}

function scorePoint(n) {
    score += n
    select('#hud-score').html(score)
    blip()
}

function blip() {
    if (!settings.sound) return
    beep.currentTime = 0
    var p = beep.play()
    if (p) p.catch(function() {})
}

function beginRound(seconds) {
    token++
    var mine = token
    startTimer(seconds, 0, 'top-right', function() {
        if (mine != token) return
        finish()
    })
}

function finish() {
    if (currentPage != '#spil') return
    token++
    selectAll('.timer').map(function(el) { el.remove() })
    var data = {
        name: settings.name,
        points: score,
        game: game,
        difficulty: settings.difficulty
    }
    if (fb && score > 0) fb.save(data)
    settings.coins += score
    saveLocal()
    paintLook()
    showToast(score + ' point i ' + info(game).title)
    shiftPage('#highscore')
}

function showScores(list) {
    games.map(function(g) {
        var box = select('#board-' + g.id)
        if (!box) return
        box.html('')
        var rows = list.filter(function(d) { return d.game == g.id })
        if (!rows.length) {
            box.html('Ingen endnu')
            return
        }
        rows.map(function(d) {
            box.child(createDiv(d.points + ' · ' + d.name + ' · ' + (d.difficulty || '')))
        })
    })
}

function openShop() {
    paintShop()
    shiftPage('#shop')
}

function paintShop() {
    select('#coins').html(settings.coins + ' mønter')
    var box = select('#wares')
    box.html('')
    wares.map(function(w) {
        var owned = settings.owned.indexOf(w.col) != -1
        var label = w.name
        if (owned) label += settings.color == w.col ? ' · valgt' : ' · brug'
        else label += ' · ' + w.cost
        var b = createButton(label)
        b.addClass('ware')
        if (settings.color == w.col) b.addClass('on')
        b.style('background', w.col)
        b.mousePressed(function() { pickWare(w) })
        box.child(b)
    })
}

function pickWare(w) {
    var owned = settings.owned.indexOf(w.col) != -1
    if (!owned) {
        if (settings.coins < w.cost) {
            showToast('Du mangler mønter', 1600, 'warning')
            return
        }
        settings.coins -= w.cost
        settings.owned.push(w.col)
    }
    settings.color = w.col
    saveLocal()
    paintLook()
    paintShop()
    showToast(w.name + ' er valgt')
}

function readSettings() {
    var name = txt('#set-name').trim()
    settings.name = name
    settings.sound = select('#set-sound').elt.checked
    settings.difficulty = select('#set-diff').value()
    saveLocal()
}

function fillForm() {
    select('#set-name').value(settings.name)
    select('#set-sound').elt.checked = settings.sound
    select('#set-diff').value(settings.difficulty)
    paintLook()
}

function paintLook() {
    select('#coins-front').html(settings.coins + ' mønter')
    select('#swatch').style('background', settings.color)
}

function loadLocal() {
    try {
        var raw = localStorage.getItem('spilcentral')
        if (!raw) return
        var data = JSON.parse(raw)
        if (data.name) settings.name = data.name
        if (typeof data.sound == 'boolean') settings.sound = data.sound
        if (data.difficulty) settings.difficulty = data.difficulty
        if (data.color) settings.color = data.color
        if (typeof data.coins == 'number') settings.coins = data.coins
        if (data.owned && data.owned.length) settings.owned = data.owned
    } catch (e) {}
}

function saveLocal() {
    localStorage.setItem('spilcentral', JSON.stringify(settings))
}

function mousePressed() {
    if (millis() < skipPointer) return
    if (currentPage != '#spil' || mouseY < 72) return
    if (game == 'hop') player.jump()
    if (game == 'skyd') player.shoot()
}

function mouseReleased() {
    if (millis() < skipPointer) return
    if (currentPage != '#spil' || game != 'traek' || !player) return
    if (player.isDragging) player.launch()
}

function keyPressed() {
    if (currentPage == '#spil' && game == 'hop' && key == ' ') player.jump()
    if (key == ' ' || keyCode == LEFT_ARROW || keyCode == RIGHT_ARROW || keyCode == UP_ARROW || keyCode == DOWN_ARROW) return false
}
