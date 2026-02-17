/**
 * @name Hotel Room Booking System
 * @author Md. Samiur Rahman (Mukul)
 * @description Hotel Room Booking and Management System Software ~ Developed By Md. Samiur Rahman (Mukul)
 * @copyright ©2023 ― Md. Samiur Rahman (Mukul). All rights reserved.
 * @version v0.0.1
 *
 */

const fs = require('fs');
const path = require('path');
const appRoot = require('app-root-path');
const FileStreamRotator = require('file-stream-rotator');
const morgan = require('morgan');

function morganLogger() {
  // On Vercel/serverless, filesystem is read-only; use stdout only
  if (process.env.VERCEL) {
    return morgan('combined');
  }
  try {
    const LOGS_FOLDER = path.join(appRoot.path, 'logs', 'access');
    if (!fs.existsSync(path.join(appRoot.path, 'logs'))) {
      fs.mkdirSync(path.join(appRoot.path, 'logs'));
    }
    if (!fs.existsSync(LOGS_FOLDER)) {
      fs.mkdirSync(LOGS_FOLDER);
    }
    const accessLogStream = FileStreamRotator.getStream({
      date_format: 'YYYY-MM-DD',
      filename: path.join(LOGS_FOLDER, 'access-%DATE%.log'),
      frequency: 'daily',
      verbose: false
    });
    return morgan('combined', { stream: accessLogStream });
  } catch (err) {
    return morgan('combined');
  }
}

module.exports = morganLogger;
