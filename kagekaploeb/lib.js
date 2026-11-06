// Minimal helpers — no p5, no api_lib
var currentPage

function $(sel) {
  var el = typeof sel === 'string' ? document.querySelector(sel) : sel
  if (!el) return null
  return {
    el: el,
    html: function(v) {
      if (v === undefined) return el.innerHTML
      el.innerHTML = v
      return this
    },
    text: function(v) {
      if (v === undefined) return el.textContent
      el.textContent = v
      return this
    },
    attr: function(name, v) {
      if (v === undefined) return el.getAttribute(name)
      el.setAttribute(name, v)
      return this
    },
    removeAttr: function(name) {
      el.removeAttribute(name)
      return this
    },
    addClass: function(c) {
      el.classList.add(c)
      return this
    },
    removeClass: function(c) {
      el.classList.remove(c)
      return this
    },
    on: function(evt, fn) {
      el.addEventListener(evt, fn)
      return this
    },
    child: function(node) {
      el.appendChild(node.el || node)
      return this
    },
    clear: function() {
      el.innerHTML = ''
      return this
    },
    value: function() {
      return el.value
    }
  }
}

function $$ (sel) {
  return Array.prototype.slice.call(document.querySelectorAll(sel)).map(function(el) {
    return $(el)
  })
}

function el(tag, html) {
  var node = document.createElement(tag)
  if (html != null) node.innerHTML = html
  return $(node)
}

function showToast(txt, timeout, type) {
  timeout = timeout || 2000
  type = type || 'notify'
  var toast = document.getElementById('toast')
  if (!toast) return
  toast.textContent = txt
  toast.className = 'toastShow ' + type
  clearTimeout(showToast._t)
  showToast._t = setTimeout(function() {
    toast.className = ''
  }, timeout)
}

function shiftPage(newPageId) {
  var id = newPageId.charAt(0) === '#' ? newPageId.slice(1) : newPageId
  if (currentPage) {
    var oldId = currentPage.charAt(0) === '#' ? currentPage.slice(1) : currentPage
    var old = document.getElementById(oldId)
    if (old) old.classList.remove('show')
  }
  var next = document.getElementById(id)
  if (next) next.classList.add('show')
  currentPage = '#' + id
}
