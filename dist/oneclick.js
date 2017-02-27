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
class Oneclick extends BaseDreamHostModule {
 /**
 * oneclick-catalog
 * 
 * @param {Object} params
 * @return {Promise<Object>}
 */
 catalog(params) {
  return this.request("oneclick-catalog", params);
 }

 /**
 * oneclick-describe_app
 * 
 * @param {Object} params
 * @param app_id
 * @return {Promise<Object>}
 */
 describeApp(params) {
  return this.request("oneclick-describe_app", params);
 }

 /**
 * oneclick-destroy_custom
 * 
 * @param {Object} params
 * @param install_id
 * @param deletefiles
 * @return {Promise<Object>}
 */
 destroyCustom(params) {
  return this.request("oneclick-destroy_custom", params);
 }

 /**
 * oneclick-install_custom
 * 
 * @param {Object} params
 * @param app_id
 * @param url
 * @param [database]
 * @param [repository]
 * @return {Promise<Object>}
 */
 installCustom(params) {
  return this.request("oneclick-install_custom", params);
 }

 /**
 * oneclick-list_custom
 * 
 * @param {Object} params
 * @return {Promise<Object>}
 */
 listCustom(params) {
  return this.request("oneclick-list_custom", params);
 }

 /**
 * oneclick-update
 * 
 * @param {Object} params
 * @param install_id
 * @return {Promise<Object>}
 */
 update(params) {
  return this.request("oneclick-update", params);
 }

 /**
 * oneclick-update_all
 * 
 * @param {Object} params
 * @return {Promise<Object>}
 */
 updateAll(params) {
  return this.request("oneclick-update_all", params);
 }
}

module.exports = Oneclick;
