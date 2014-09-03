'use strict'
var curl = require('node-curl'),
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
  this.sendRequest = function(defer, url){
    curl
    ( url
    , { HTTPHEADER:
        [ "app_id:" + this.appId
        , "app_key:" + this.key
        ]
      }
    , function(err){
        if(err)
          defer.reject(new Error(err))
        defer.resolve(JSON.parse(this.body))
      }
    )
  }
}

Leafly.prototype.search = function(options){
  if(strain)
    var strain = toSlug(strain);
  if(!options.take || options.take > 50)
    options.take = 50
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
  var url = this.url + "strains/" + toSlug(strain)
  this.sendRequest(deferred, url)
  return deferred.promise;
}



/**
 * Converts to Slug
 * @private
 * @params {String} strain
 * @returns {String} slug
 */
var toSlug = function(strain){
  return strain
    .toLowerCase()
    .split(" ")
    .join("-")
}

module.exports = Leafly
