const nextConfig = {
  reactStrictMode: true,
  publicRuntimeConfig: {
    // Will be available on both server and client
    API_BASE_URL: process.env.API_BASE_URL
  },
  // Avoid "EMFILE: too many open files" on macOS by using polling for file watching
  webpack: (config, { dev }) => {
    if (dev) {
      config.watchOptions = {
        poll: 1000,
        ignored: ['**/node_modules', '**/.git', '**/.next']
      };
    }
    return config;
  }
};

module.exports = nextConfig;
