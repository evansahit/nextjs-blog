const { PHASE_DEVELOPMENT_SERVER } = require('next/constants')

module.exports = (phase) => {
  if (phase === PHASE_DEVELOPMENT_SERVER) {
    return {
      env: {
        mongodb_username: 'evans',
        mongodb_password: 'icEOzJHuGdGTl4Ra',
        mongodb_clustername: 'cluster0',
        mongodb_database: 'blog-dev',
      },
    }
  }

  return {
    env: {
      mongodb_username: 'evans',
      mongodb_password: 'icEOzJHuGdGTl4Ra',
      mongodb_clustername: 'cluster0',
      mongodb_database: 'blog',
    },
  }
}
