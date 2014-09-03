'use strict'
var Leafly = require('../leafly')
var config = require('./config')
var leafly
beforeEach(function(){
  leafly = new Leafly(config)
})

describe('Leafly Strain Search', function(){
  it('Should find `Blue Dream`', function(done){
    leafly.search("Blue Dream").then(function(res){
      expect(res.name).toBe("Blue Dream")
      done()
    })
  })
})
