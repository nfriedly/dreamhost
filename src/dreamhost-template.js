'use strict';

const Module = require('./base.js');

/**
 * Dreamhost JS API
 *
 * Initializes and provides all submodules with the given key
 *
 * https://help.dreamhost.com/hc/en-us/sections/203903178-API-Application-Programming-Interface-
 *
 * @constructor
 */
class Dreamhost {
  constructor(options) {
    this.module = new Module(options);
  }
}
