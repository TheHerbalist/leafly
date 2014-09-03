'use strict'
var Leafly = require('../leafly')
var config = require('./config')
var leafly
beforeEach(function(){
  leafly = new Leafly(config)
})

describe('Leafly Strain Details', function(){
  it('Should return the Strain Details for Blue Dream', function(done){
    leafly.strain("Blue Dream").then(function(res){
      console.log('Response', res)
      expect(res.name).toBe("Blue Dream")
      done()
    })
  })
})
