/**
 * @name Hotel Room Booking System
 * @author Md. Samiur Rahman (Mukul)
 * @description Hotel Room Booking and Management System Software ~ Developed By Md. Samiur Rahman (Mukul)
 * @copyright ©2023 ― Md. Samiur Rahman (Mukul). All rights reserved.
 * @version v0.0.1
 *
 */

const currentDateTime = require('../lib/current.date.time');

/**
 * function to all API same formatted success response provider
 * @param {Number} resultCode API response defined custom result_code
 * @param {String} title API response title based on result_code
 * @param {String} message API response your defined message
 * @param {*} data Send any kind of data in API response
 * @param {*} maintenance API provide any kind of maintenance information
 * @returns success response return for all API's
 */
exports.successResponse = (resultCode, title, message, data, maintenance) => ({
  result_code: resultCode,
  time: currentDateTime(),
  maintenance_info: maintenance || null,
  result: {
    title, message, data
  }
});

/**
 * Normalize error to a string so it never serializes as {} (e.g. raw Error objects).
 */
const normalizeError = (error) => {
  if (error == null) return 'Unknown error';
  if (typeof error === 'string') return error;
  if (error instanceof Error) return error.message || String(error);
  if (typeof error === 'object' && typeof error.message === 'string') return error.message;
  return String(error);
};

/**
 * function to all API same formatted error response provider
 * @param {Number} resultCode API response defined custom result_code
 * @param {String} title API response title based on result_code
 * @param {*} error Send any kind or error in API response
 * @param {*} maintenance API provide any kind of maintenance information
 * @returns error response return for all API's
 */
exports.errorResponse = (resultCode, title, error, maintenance) => ({
  result_code: resultCode,
  time: currentDateTime(),
  maintenance_info: maintenance || null,
  result: {
    title,
    error: normalizeError(error)
  }
});
