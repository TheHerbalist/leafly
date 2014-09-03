'use strict'
var Curl = require('node-curl/lib/Curl'),
    Q = require('q')

/**
 * Leafly Singleton
 * @public
 * @params {Object} config
 */
var Leafly = function(config) {
  this.key = config.key
  this.appId = config.appId
  this.url = "http://data.leafly.com/"

  /**
   * Send Curl Request
   * @private
   * @params {Object} Defer - Q defer
   * @params {String} url
   */
  this.sendRequest = function(defer, url, options){
    var curl = new Curl()
    curl.setopt('URL', url)
    curl.setopt
    ( 'HTTPHEADER'
    , [ 'app_id:' + this.appId
      , 'app_key:' + this.key
      ]
    )
    if(options){
      curl.setopt('CURLOPT_POST', 1)
      curl.setopt('CURLOPT_POSTFIELDS', options)
    }

    curl.on('data', function(chunk){
      defer.resolve(JSON.parse(chunk))
    })

    curl.on('error', function(e){
      defer.reject(new Error(e))
    })

    curl.on('end', function(){
      curl.close();
    })

    curl.perform();
  }
  /**
   * Converts to Slug
   * @private
   * @params {String} strain
   * @returns {String} slug
   */
  this.toSlug = function(strain){
    return strain
      .toLowerCase()
      .split(" ")
      .join("-")
  }

}

Leafly.prototype.search = function(strain, options){
  var deferred = Q.defer()
  if(typeof strain === "Object")
    var options = strain
  if(typeof strain === "String")
    options.search = strain
  var url = this.url + "strain"
  this.sendRequest(deferred, url, options)
  return deferred.promise
}

/**
 * Get Strain
 * @public
 * @protoype
 * @params {String} Strain
 * @params {Object} Options
 * @returns {Object} Strain Details
 */
Leafly.prototype.strain = function(strain, options) {
  var deferred = Q.defer()
  if(!strain)
    deferred.reject(new Error('No Strain Specified'))
  var url = this.url + "strains/" + this.toSlug(strain)
  this.sendRequest(deferred, url)
  return deferred.promise;
}



module.exports = Leafly
