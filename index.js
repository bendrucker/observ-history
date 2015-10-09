'use strict'

var window = require('global/window')
var document = require('global/document')
var history = window.history
var Event = require('geval')
var path = require('document-pathname')
var popState = require('popstate')

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
    popState(function onPopState () {
      broadcast(path())
    })
  })
}

function pushState (path) {
  if (!history) return
  history.pushState(undefined, document.title, path)
}

function noop () {}
