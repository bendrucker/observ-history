'use strict'

var window = require('global/window')
var history = window.history
var document = require('global/document')
var location = document.location || {}
var Event = require('geval')

module.exports = History()

function History () {
  observable.set = pushState
  var listen = PopState()

  return observable

  function observable (fn) {
    return fn ? listen(fn) : path()
  }
}

function PopState () {
  return !history ? noop : Event(function (broadcast) {
    window.addEventListener('popstate', onPopState)
    function onPopState () {
      broadcast(path())
    }
  })
}

function pushState (path) {
  if (!history) return
  history.pushState(undefined, document.title, path)
}

function path () {
  return location.pathname || ''
}

function noop () {}
