module.exports = {
  reactStrictMode: true,
  ignoreDuringBuilds: true,
  async redirects() {
    return [
      {
        source: '/',
        destination: '/goals',
        permanent: true,
      },
    ];
  },
};
