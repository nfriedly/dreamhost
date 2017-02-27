'use strict';

// creates a global pollyfill
require('isomorphic-fetch');
const qs = require('querystring');


/**
 * Base module for each Dreamhost API module
 *
 * @private
 * @constructor
 *
 * @param {Object} options
 * @param {String} options.key - DreamHost API Key - get one at https://panel.dreamhost.com/?tree=home.api
 * @param {String} [options.api=https://api.dreamhost.com/] - URL of Dreamhost API
 */
class BaseDreamHostModule {
  constructor(options) {
    if (!options.apiKey) {
      throw new Error('Please specify the Dreamhost API key as the `key: "YOUR_KEY"` option. Get one at https://panel.dreamhost.com/?tree=home.api');
    }

    this.key = options.key;
    this.apiCommands = options.api || 'https://api.dreamhost.com/?';
    if (this.api.indexOf('?') === -1) {
      this.apiCommands += '?';
    }
  }

  /**
   * Helper method to set command and make API Calls
   * @param cmd
   * @param params
   * @returns Promise<Object>
   */
  request(cmd, params={}) {
    params.cmd = cmd;
    params.key = this.key;
    return fetch(this.api + qs.stringify(params))
  }
}
