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
class Rewards extends BaseDreamHostModule {
 /**
 * rewards-add_promo_code
 * 
 * @param {Object} params
 * @param code
 * @param description
 * @param bonus_domregs
 * @param bonus_ips
 * @param discount_month
 * @param discount_1year
 * @param discount_2year
 * @return {Promise<Object>}
 */
 addPromoCode(params) {
  return this.request("rewards-add_promo_code", params);
 }

 /**
 * rewards-disable_promo_code
 * 
 * @param {Object} params
 * @param code
 * @return {Promise<Object>}
 */
 disablePromoCode(params) {
  return this.request("rewards-disable_promo_code", params);
 }

 /**
 * rewards-enable_promo_code
 * 
 * @param {Object} params
 * @param code
 * @return {Promise<Object>}
 */
 enablePromoCode(params) {
  return this.request("rewards-enable_promo_code", params);
 }

 /**
 * rewards-list_promo_codes
 * 
 * @param {Object} params
 * @return {Promise<Object>}
 */
 listPromoCodes(params) {
  return this.request("rewards-list_promo_codes", params);
 }

 /**
 * rewards-promo_details
 * 
 * @param {Object} params
 * @param code
 * @return {Promise<Object>}
 */
 promoDetails(params) {
  return this.request("rewards-promo_details", params);
 }

 /**
 * rewards-referral_log
 * 
 * @param {Object} params
 * @param [period]
 * @return {Promise<Object>}
 */
 referralLog(params) {
  return this.request("rewards-referral_log", params);
 }

 /**
 * rewards-referral_summary
 * 
 * @param {Object} params
 * @param [period]
 * @return {Promise<Object>}
 */
 referralSummary(params) {
  return this.request("rewards-referral_summary", params);
 }

 /**
 * rewards-remove_promo_code
 * 
 * @param {Object} params
 * @param code
 * @return {Promise<Object>}
 */
 removePromoCode(params) {
  return this.request("rewards-remove_promo_code", params);
 }
}

module.exports = Rewards;
