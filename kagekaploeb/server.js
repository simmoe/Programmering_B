#!/usr/bin/env node
var http = require('http')
var fs = require('fs')
var path = require('path')
var os = require('os')

var PORT = Number(process.env.PORT) || 8787
var ROOT = __dirname
var REPO = path.join(__dirname, '..')

var TYPES = {
  '.html': 'text/html; charset=utf-8',
  '.js': 'text/javascript; charset=utf-8',
  '.css': 'text/css; charset=utf-8',
  '.png': 'image/png',
  '.jpg': 'image/jpeg',
  '.svg': 'image/svg+xml',
  '.mp3': 'audio/mpeg',
  '.ico': 'image/x-icon'
}

function lanIp() {
  var nets = os.networkInterfaces()
  for (var name of Object.keys(nets)) {
    for (var net of nets[name]) {
      if (net.family === 'IPv4' && !net.internal) return net.address
    }
  }
  return '127.0.0.1'
}

function resolve(urlPath) {
  var clean = decodeURIComponent(urlPath.split('?')[0])
  if (clean === '/') clean = '/index.html'
  if (clean.startsWith('/api_lib/')) {
    return path.join(REPO, clean.slice(1))
  }
  return path.join(ROOT, clean.replace(/^\//, ''))
}

var server = http.createServer(function(req, res) {
  var file = resolve(req.url || '/')
  if (!file.startsWith(ROOT) && !file.startsWith(path.join(REPO, 'api_lib'))) {
    res.writeHead(403)
    res.end('Forbidden')
    return
  }
  fs.readFile(file, function(err, data) {
    if (err) {
      res.writeHead(404)
      res.end('Not found')
      return
    }
    res.writeHead(200, { 'Content-Type': TYPES[path.extname(file)] || 'application/octet-stream' })
    res.end(data)
  })
})

server.listen(PORT, '0.0.0.0', function() {
  var ip = lanIp()
  console.log('')
  console.log('Kagekapløb kører')
  console.log('  Fællesskærm:  http://' + ip + ':' + PORT + '/')
  console.log('  Telefon:      http://' + ip + ':' + PORT + '/phone.html')
  console.log('')
  console.log('Åbn fællesskærmen på projektoren. QR-koden peger på telefonen.')
  console.log('Ctrl+C stopper serveren.')
  console.log('')
})
