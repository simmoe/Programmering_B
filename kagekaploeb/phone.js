var client
var me = ''
var myTaps = 0
var phase = 'lobby'
var tapArmed = false

function boot() {
  currentPage = '#join'
  fillNames()
  wire()
  connectMqtt()
}

function fillNames() {
  var sel = document.getElementById('name')
  sel.innerHTML = ''
  PLAYERS.forEach(function(n) {
    var opt = document.createElement('option')
    opt.value = n
    opt.textContent = n
    sel.appendChild(opt)
  })
}

function wire() {
  document.getElementById('join-btn').addEventListener('click', function(e) {
    e.preventDefault()
    joinGame()
  })
  document.getElementById('tap').addEventListener('pointerdown', function(e) {
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

function joinGame() {
  me = document.getElementById('name').value
  if (!me) return
  publish({ action: 'join', name: me })
  $('#me-label').text(me)
  $('#play-me').text(me)
  $('#done-me').text(me)
  shiftPage('#wait')
}

function onCountdown(msg) {
  if (!me) return
  phase = 'countdown'
  tapArmed = false
  $('#tap').attr('disabled', true)
  $('#play-status').text(msg.from > 0 ? String(msg.from) : '…')
  $('#my-taps').text('0')
  myTaps = 0
  shiftPage('#play')
}

function onGo(msg) {
  if (!me) return
  phase = 'play'
  tapArmed = true
  myTaps = 0
  $('#tap').removeAttr('disabled')
  $('#play-status').text('NU — bank løs!')
  $('#my-taps').text('0')
  shiftPage('#play')
  if (msg.ms) {
    setTimeout(function() {
      if (phase == 'play') {
        tapArmed = false
        $('#tap').attr('disabled', true)
        $('#play-status').text('Tid!')
      }
    }, msg.ms)
  }
}

function sendTap() {
  if (!tapArmed || phase != 'play' || !me) return
  myTaps++
  $('#my-taps').text(String(myTaps))
  publish({ action: 'tap', name: me })
}

function onDone(msg) {
  if (!me) return
  phase = 'done'
  tapArmed = false
  var winners = (msg.winners || []).map(function(w) { return w.name })
  var won = winners.indexOf(me) >= 0
  $('#done-title').text(won ? 'Du får kage' : 'Ikke denne gang')
  $('#done-text').text(
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

document.addEventListener('DOMContentLoaded', boot)
