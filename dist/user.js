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
class User extends BaseDreamHostModule {
 /**
 * user-add_user
 *
 * @param {Object} params
 * @param {String} params.type
 * @param {String} params.username
 * @param {String} params.gecos
 * @param {String} [params.server]
 * @param {String} [params.shell_type]
 * @param {String} [params.password]
 * @param {String} [params.enhanced_security]
 * @return {Promise}
 */
 addUser(params) {
  return this.request('user-add_user', params);
 }

 /**
 * user-list_users
 *
 * @param {Object} params
 * @return {Promise<Array>}
 */
 listUsers(params) {
  return this.request('user-list_users', params);
 }

 /**
 * user-list_users_no_pw
 *
 * @param {Object} params
 * @return {Promise<Array>}
 */
 listUsersNoPw(params) {
  return this.request('user-list_users_no_pw', params);
 }

 /**
 * user-remove_user
 *
 * @param {Object} params
 * @param {String} params.username
 * @param {String} [params.type]
 * @param {String} [params.remove_all]
 * @return {Promise}
 */
 removeUser(params) {
  return this.request('user-remove_user', params);
 }
}

module.exports = User;
