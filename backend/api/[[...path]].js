/**
 * Vercel serverless entry — forwards all requests to the Express app.
 * Lazy-loads the app so load errors are caught and returned for debugging.
 */
let app;

function getApp() {
  if (!app) {
    app = require('../src/app');
  }
  return app;
}

module.exports = (req, res) => {
  try {
    getApp()(req, res);
  } catch (err) {
    console.error('Serverless function error:', err);
    res.statusCode = 500;
    res.setHeader('Content-Type', 'application/json');
    res.end(
      JSON.stringify({
        error: 'FUNCTION_INVOCATION_FAILED',
        message: err.message || String(err),
        stack: process.env.NODE_ENV === 'production' ? undefined : err.stack
      })
    );
  }
};
