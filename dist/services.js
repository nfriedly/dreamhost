'use strict';

const BaseDreamHostModule = require("./base.js");

/**
 * ModuleName module
 *
 * @constructor
 * @param {Object} options
 * @param {String} options.key - DreamHost API Key
 * @param {String} [options.api=https://api.dreamhost.com/] DreamHost API URL
 */
class Services extends BaseDreamHostModule {
 /**
 * services-flvencoder
 * 
 * @param {Object} params
 * @param params.url
 * @return {Promise<Object>}
 */
 flvencoder(params) {
  return this.request("services-flvencoder", params);
 }

 /**
 * services-progress
 * 
 * @param {Object} params
 * @param params.token
 * @return {Promise<Object>}
 */
 progress(params) {
  return this.request("services-progress", params);
 }
}

module.exports = Services;
