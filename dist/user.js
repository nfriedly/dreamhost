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
class User extends BaseDreamHostModule {
 /**
 * user-add_user
 * 
 * @param {Object} params
 * @param params.type
 * @param params.username
 * @param params.gecos
 * @param [params.server]
 * @param [params.shell_type]
 * @param [params.password]
 * @param [params.enhanced_security]
 * @return {Promise<Object>}
 */
 addUser(params) {
  return this.request("user-add_user", params);
 }

 /**
 * user-list_users
 * 
 * @param {Object} params
 * @return {Promise<Object>}
 */
 listUsers(params) {
  return this.request("user-list_users", params);
 }

 /**
 * user-list_users_no_pw
 * 
 * @param {Object} params
 * @return {Promise<Object>}
 */
 listUsersNoPw(params) {
  return this.request("user-list_users_no_pw", params);
 }

 /**
 * user-remove_user
 * 
 * @param {Object} params
 * @param params.username
 * @param [params.type]
 * @param [params.remove_all]
 * @return {Promise<Object>}
 */
 removeUser(params) {
  return this.request("user-remove_user", params);
 }
}

module.exports = User;
