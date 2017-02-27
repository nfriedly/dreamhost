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
class Account extends BaseDreamHostModule {
 /**
 * account-domain_usage
 * 
 * @param {Object} params
 * @return {Promise<Object>}
 */
 domainUsage(params) {
  return this.request("account-domain_usage", params);
 }

 /**
 * account-list_accounts
 * 
 * @param {Object} params
 * @return {Promise<Object>}
 */
 listAccounts(params) {
  return this.request("account-list_accounts", params);
 }

 /**
 * account-list_keys
 * 
 * @param {Object} params
 * @return {Promise<Object>}
 */
 listKeys(params) {
  return this.request("account-list_keys", params);
 }

 /**
 * account-status
 * 
 * @param {Object} params
 * @return {Promise<Object>}
 */
 status(params) {
  return this.request("account-status", params);
 }

 /**
 * account-user_usage
 * 
 * @param {Object} params
 * @return {Promise<Object>}
 */
 userUsage(params) {
  return this.request("account-user_usage", params);
 }
}

module.exports = Account;
