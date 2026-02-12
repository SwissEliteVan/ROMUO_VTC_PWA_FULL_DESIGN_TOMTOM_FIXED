module.exports = {
  apps: [{
    name: 'romuo-vtc',
    script: './dist/server/index.js',
    instances: 2,
    exec_mode: 'cluster',
    env_production: {
      NODE_ENV: 'production',
      PORT: 3000,
      APP_VERSION: process.env.npm_package_version || '1.0.0'
    },
    max_memory_restart: '300M',
    error_file: './logs/error.log',
    out_file: './logs/out.log',
    log_date_format: 'YYYY-MM-DD HH:mm:ss Z',
    merge_logs: true,
    autorestart: true,
    watch: false,
    max_restarts: 10,
    min_uptime: '10s'
  }]
};
