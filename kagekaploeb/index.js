var client
var joined = {}
var taps = {}
var phase = 'lobby'
var roundTimer
var countTimer
var endsAt = 0

function boot() {
  buildCakes()
  makeQr()
  wire()
  connectMqtt()
  render()
}

function makeQr() {
  var base = window.location.origin + window.location.pathname.replace(/index\.html$/, '')
  var url = base + (base.endsWith('/') ? '' : '/') + 'phone.html'
  $('#phone-url').text(url)
  $('#qr').clear()
  new QRCode(document.getElementById('qr'), {
    text: url,
    width: 148,
    height: 148,
    correctLevel: QRCode.CorrectLevel.M
  })
}

function buildCakes() {
  var box = $('#cakes').clear()
  for (var i = 0; i < CAKE_SLOTS; i++) {
    var slice = el('div').addClass('cake').attr('data-i', String(i))
    box.child(slice)
  }
}

function wire() {
  $('#start').on('click', startRound)
  $('#reset').on('click', resetAll)
}

function connectMqtt() {
  client = mqtt.connect('wss://mqtt.nextservices.dk')
  client.on('connect', function() {
    client.subscribe(TOPIC)
    showToast('MQTT forbundet')
    publish({ action: 'hello', phase: phase })
  })
  client.on('message', function(_topic, buf) {
    var msg
    try { msg = JSON.parse(buf.toString()) } catch (e) { return }
    if (!msg || !msg.action) return
    if (msg.action == 'join') onJoin(msg)
    if (msg.action == 'tap') onTap(msg)
    if (msg.action == 'who') publishState()
  })
}

function publish(obj) {
  if (!client || !client.connected) return
  client.publish(TOPIC, JSON.stringify(obj))
}

function publishState() {
  publish({
    action: 'state',
    phase: phase,
    joined: Object.keys(joined),
    taps: taps,
    endsAt: endsAt,
    winners: currentWinners()
  })
}

function onJoin(msg) {
  if (!msg.name || PLAYERS.indexOf(msg.name) < 0) return
  if (phase != 'lobby' && phase != 'done') {
    publish({ action: 'denied', name: msg.name, reason: 'Runden er i gang' })
    return
  }
  joined[msg.name] = true
  if (taps[msg.name] == null) taps[msg.name] = 0
  showToast(msg.name + ' er med')
  render()
  publishState()
}

function onTap(msg) {
  if (phase != 'play') return
  if (!joined[msg.name]) return
  taps[msg.name] = (taps[msg.name] || 0) + 1
  renderScores()
}

function startRound() {
  if (Object.keys(joined).length < 1) {
    showToast('Ingen spillere endnu', 2000, 'warning')
    return
  }
  clearTimers()
  Object.keys(joined).forEach(function(n) { taps[n] = 0 })
  phase = 'countdown'
  $('#start').attr('disabled', true)
  render()
  publish({ action: 'countdown', from: 3 })
  var n = 3
  $('#countdown').text(String(n))
  $('#status').text('Gør klar…')
  countTimer = setInterval(function() {
    n--
    if (n > 0) {
      $('#countdown').text(String(n))
      publish({ action: 'countdown', from: n })
      return
    }
    clearInterval(countTimer)
    goPlay()
  }, 1000)
}

function goPlay() {
  phase = 'play'
  endsAt = Date.now() + ROUND_MS
  $('#countdown').text('NU!')
  $('#status').text('Bank løs — ' + (ROUND_MS / 1000) + ' sekunder')
  publish({ action: 'go', endsAt: endsAt, ms: ROUND_MS })
  renderScores()
  roundTimer = setTimeout(finishRound, ROUND_MS)
}

function finishRound() {
  phase = 'done'
  $('#countdown').text('')
  $('#status').text('Kagestykkerne er fordelt')
  $('#start').removeAttr('disabled')
  var winners = currentWinners()
  paintCakes(winners)
  renderScores()
  publish({ action: 'done', winners: winners, taps: taps })
  showToast('Kagen er fordelt')
}

function currentWinners() {
  return Object.keys(joined)
    .map(function(n) { return { name: n, taps: taps[n] || 0 } })
    .sort(function(a, b) { return b.taps - a.taps || a.name.localeCompare(b.name) })
    .slice(0, CAKE_SLOTS)
    .filter(function(p) { return p.taps > 0 })
}

function paintCakes(winners) {
  $$('.cake').forEach(function(slice, i) {
    slice.removeClass('won').html('')
    if (winners[i]) slice.addClass('won').text(winners[i].name)
  })
}

function resetAll() {
  clearTimers()
  joined = {}
  taps = {}
  phase = 'lobby'
  endsAt = 0
  $('#start').removeAttr('disabled')
  $('#countdown').text('')
  $('#status').text('Vent på spillere…')
  paintCakes([])
  render()
  publish({ action: 'reset' })
}

function clearTimers() {
  if (countTimer) clearInterval(countTimer)
  if (roundTimer) clearTimeout(roundTimer)
  countTimer = null
  roundTimer = null
}

function render() {
  var list = $('#joined').clear()
  Object.keys(joined).sort().forEach(function(n) {
    list.child(el('li', n))
  })
  if (phase == 'lobby') {
    $('#status').text(
      Object.keys(joined).length
        ? Object.keys(joined).length + ' med · klar til start'
        : 'Vent på spillere…'
    )
  }
  renderScores()
  if (phase == 'done') paintCakes(currentWinners())
}

function renderScores() {
  var list = $('#scores').clear()
  Object.keys(joined)
    .map(function(n) { return { name: n, taps: taps[n] || 0 } })
    .sort(function(a, b) { return b.taps - a.taps || a.name.localeCompare(b.name) })
    .forEach(function(p) {
      list.child(el('li', p.name + ' <strong>' + p.taps + '</strong>'))
    })
}

document.addEventListener('DOMContentLoaded', boot)
