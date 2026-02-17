/**
 * Vercel serverless entry — forwards all /api/* requests to the Express app.
 * Deploy backend with Root Directory = "backend" and this handles the API.
 */
const app = require('../src/app');
module.exports = app;
