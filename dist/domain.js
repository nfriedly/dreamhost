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
class Domain extends BaseDreamHostModule {
 /**
 * domain-list_certificates
 * 
 * @param {Object} params
 * @return {Promise<Object>}
 */
 listCertificates(params) {
  return this.request("domain-list_certificates", params);
 }

 /**
 * domain-list_domains
 * 
 * @param {Object} params
 * @return {Promise<Object>}
 */
 listDomains(params) {
  return this.request("domain-list_domains", params);
 }

 /**
 * domain-list_registrations
 * 
 * @param {Object} params
 * @return {Promise<Object>}
 */
 listRegistrations(params) {
  return this.request("domain-list_registrations", params);
 }

 /**
 * domain-registration_available
 * 
 * @param {Object} params
 * @param domain
 * @return {Promise<Object>}
 */
 registrationAvailable(params) {
  return this.request("domain-registration_available", params);
 }
}

module.exports = Domain;
