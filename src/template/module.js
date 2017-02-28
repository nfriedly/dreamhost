'use strict';

const BaseDreamHostModule = require('./base.js');

/**
 * ModuleName module
 *
 * @constructor
 * @param {Object} options
 * @param {String} options.key - DreamHost API Key
 * @param {String} [options.api=https://api.dreamhost.com/] DreamHost API URL
 */
class ModuleName extends BaseDreamHostModule {

  // note: this method isn't actually used by the complete-template.js codemod,
  // but it is representative of the output
  /**
   * methodName
   *
   * @param {Object} params
   * @param {String} params.foo
   * @param {String} params.bar
   * @return {Promise.<Object>}
   */
  methodName(params) {
    return this.request('module-cmd_name', params);
  }
}

module.exports = ModuleName;
