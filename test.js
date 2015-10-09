'use strict'

var test = require('tape')
var proxyquire = require('proxyquire')
var EventTarget = require('dom-event-target')

test('history (server)', function (t) {
  var history = proxyquire('./', {
    'global/window': {},
    'global/document': {}
  })

  t.doesNotThrow(history.set, 'pushState is a noop')
  t.doesNotThrow(history, 'onPopState is a noop')
  t.end()
})

test('history (browser)', function (t) {
  t.plan(4)

  var window = new EventTarget()
  var document = {
    title: 'the title'
  }

  window.history = {
    pushState: pushState
  }
  var pop
  var history = proxyquire('./', {
    'global/window': window,
    'global/document': document,
    'document-pathname': function () {
      return '/the/popped/path'
    },
    popstate: function (callback) {
      pop = callback
    }
  })

  history.set('/the/pushed/path')

  function pushState (state, title, path) {
    t.notOk(state)
    t.equal(title, 'the title')
    t.equal(path, '/the/pushed/path')
  }

  history(onPopState)
  pop()

  function onPopState (path) {
    t.equal(path, '/the/popped/path')
  }
})
