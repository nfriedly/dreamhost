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
class Domain extends BaseDreamHostModule {
 /**
 * domain-list_certificates
 *
 * @param {Object} params
 * @return {Promise<Array>}
 */
 listCertificates(params) {
  return this.request('domain-list_certificates', params);
 }

 /**
 * domain-list_domains
 *
 * @param {Object} params
 * @return {Promise<Array>}
 */
 listDomains(params) {
  return this.request('domain-list_domains', params);
 }

 /**
 * domain-list_registrations
 *
 * @param {Object} params
 * @return {Promise<Array>}
 */
 listRegistrations(params) {
  return this.request('domain-list_registrations', params);
 }

 /**
 * domain-registration_available
 *
 * @param {Object} params
 * @param {String} params.domain
 * @return {Promise}
 */
 registrationAvailable(params) {
  return this.request('domain-registration_available', params);
 }
}

module.exports = Domain;
