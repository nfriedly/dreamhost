'use strict';

const Module = require('./base.js');

/**
 * Dreamhost JS API
 *
 * Initializes and provides all submodules with the given key
 *
 * https://help.dreamhost.com/hc/en-us/sections/203903178-API-Application-Programming-Interface-
 */
class Dreamhost {
  /**
   * @param {Object} options
   * @constructor
   */
  constructor(options) {
    this.module = new Module(options);
  }
}

module.exports = Dreamhost;
