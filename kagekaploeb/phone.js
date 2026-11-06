var client
var me = ''
var myTaps = 0
var phase = 'lobby'
var tapArmed = false

function setup() {
  noCanvas()
  currentPage = '#join'
  fillNames()
  wire()
  connectMqtt()
}

function fillNames() {
  var sel = select('#name')
  PLAYERS.forEach(function(n) {
    sel.child(createElement('option', n).attribute('value', n))
  })
}

function wire() {
  select('#join-btn').mousePressed(join)
  var tap = select('#tap')
  tap.elt.addEventListener('pointerdown', function(e) {
    e.preventDefault()
    sendTap()
  }, { passive: false })
}

function connectMqtt() {
  client = mqtt.connect('wss://mqtt.nextservices.dk')
  client.on('connect', function() {
    client.subscribe(TOPIC)
    showToast('Forbundet')
    publish({ action: 'who' })
  })
  client.on('message', function(_topic, buf) {
    var msg
    try { msg = JSON.parse(buf.toString()) } catch (e) { return }
    if (!msg || !msg.action) return
    if (msg.action == 'countdown') onCountdown(msg)
    if (msg.action == 'go') onGo(msg)
    if (msg.action == 'done') onDone(msg)
    if (msg.action == 'reset') onReset()
    if (msg.action == 'denied' && msg.name == me) {
      showToast(msg.reason || 'Kan ikke joine', 2500, 'warning')
    }
    if (msg.action == 'state' && me && msg.joined && msg.joined.indexOf(me) >= 0) {
      if (msg.phase == 'play') onGo(msg)
      if (msg.phase == 'done') onDone(msg)
      if (msg.phase == 'lobby') {
        phase = 'lobby'
        shiftPage('#wait')
      }
    }
  })
}

function publish(obj) {
  if (!client || !client.connected) return
  client.publish(TOPIC, JSON.stringify(obj))
}

function join() {
  me = select('#name').value()
  if (!me) return
  publish({ action: 'join', name: me })
  select('#me-label').html(me)
  select('#play-me').html(me)
  select('#done-me').html(me)
  shiftPage('#wait')
}

function onCountdown(msg) {
  if (!me) return
  phase = 'countdown'
  tapArmed = false
  select('#tap').attribute('disabled', true)
  select('#play-status').html(msg.from > 0 ? String(msg.from) : '…')
  select('#my-taps').html('0')
  myTaps = 0
  shiftPage('#play')
}

function onGo(msg) {
  if (!me) return
  phase = 'play'
  tapArmed = true
  myTaps = 0
  select('#tap').removeAttribute('disabled')
  select('#play-status').html('NU — bank løs!')
  select('#my-taps').html('0')
  shiftPage('#play')
  if (msg.ms) {
    setTimeout(function() {
      if (phase == 'play') {
        tapArmed = false
        select('#tap').attribute('disabled', true)
        select('#play-status').html('Tid!')
      }
    }, msg.ms)
  }
}

function sendTap() {
  if (!tapArmed || phase != 'play' || !me) return
  myTaps++
  select('#my-taps').html(String(myTaps))
  publish({ action: 'tap', name: me })
}

function onDone(msg) {
  if (!me) return
  phase = 'done'
  tapArmed = false
  var winners = (msg.winners || []).map(function(w) { return w.name })
  var won = winners.indexOf(me) >= 0
  select('#done-title').html(won ? 'Du får kage' : 'Ikke denne gang')
  select('#done-text').html(
    won
      ? 'Plads ' + (winners.indexOf(me) + 1) + ' · ' + myTaps + ' taps'
      : myTaps + ' taps. Vinderne: ' + winners.join(', ')
  )
  shiftPage('#done')
}

function onReset() {
  me = ''
  myTaps = 0
  phase = 'lobby'
  tapArmed = false
  shiftPage('#join')
}
