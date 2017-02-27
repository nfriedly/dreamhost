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
class Api extends BaseDreamHostModule {
 /**
 * api-list_accessible_cmds
 * 
 * @param {Object} params
 * @return {Promise<Object>}
 */
 listAccessibleCmds(params) {
  return this.request("api-list_accessible_cmds", params);
 }

 /**
 * api-list_keys
 * 
 * @param {Object} params
 * @return {Promise<Object>}
 */
 listKeys(params) {
  return this.request("api-list_keys", params);
 }
}

module.exports = Api;
