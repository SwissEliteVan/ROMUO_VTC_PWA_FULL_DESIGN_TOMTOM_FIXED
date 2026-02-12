#!/bin/bash
set -e

echo "🚀 Starting deployment..."

# Build
npm run build

# Test build
echo "🧪 Testing build..."
node dist/server/index.js &
PID=$!
sleep 3
curl -f http://localhost:3000/health || { kill $PID; exit 1; }
kill $PID
echo "✅ Build test passed"

# Deploy with PM2 reload (zero downtime)
echo "📦 Reloading application..."
pm2 reload ecosystem.config.cjs --env production

echo "✅ Deployment complete"
echo "📊 Application status:"
pm2 status
