import express from 'express';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';
import os from 'os';
import 'dotenv/config';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const app = express();
const PORT = process.env.PORT || 3000;

// Application state tracking
let startTime = Date.now();
let requestCount = 0;

// Request counter middleware
app.use((req, res, next) => {
  requestCount++;
  next();
});

// JSON body parser for API routes
app.use(express.json());

// Security headers
app.use((req, res, next) => {
  res.setHeader('X-Content-Type-Options', 'nosniff');
  res.setHeader('X-Frame-Options', 'DENY');
  res.setHeader('X-XSS-Protection', '1; mode=block');
  res.setHeader('Referrer-Policy', 'strict-origin-when-cross-origin');
  next();
});

// ======================
// API ROUTES (before static files)
// ======================

// Proxy for TomTom API - hides API key from client
app.post('/api/maps/route', async (req, res) => {
  try {
    const { origin, destination } = req.body;
    
    if (!origin || !destination) {
      return res.status(400).json({ error: 'Origin and destination required' });
    }

    const tomtomKey = process.env.TOMTOM_API_KEY;
    if (!tomtomKey) {
      console.error('TOMTOM_API_KEY not configured');
      return res.status(500).json({ error: 'Maps service not configured' });
    }

    // Call TomTom Routing API
    const url = `https://api.tomtom.com/routing/1/calculateRoute/${origin}:${destination}/json?key=${tomtomKey}`;
    const response = await fetch(url);
    
    if (!response.ok) {
      throw new Error(`TomTom API error: ${response.status}`);
    }

    const data = await response.json();
    res.json(data);
  } catch (error) {
    console.error('Route calculation error:', error);
    res.status(500).json({ error: 'Route calculation failed' });
  }
});

// Proxy for TomTom Geocoding
app.post('/api/maps/geocode', async (req, res) => {
  try {
    const { query } = req.body;
    
    if (!query) {
      return res.status(400).json({ error: 'Query required' });
    }

    const tomtomKey = process.env.TOMTOM_API_KEY;
    if (!tomtomKey) {
      return res.status(500).json({ error: 'Geocoding service not configured' });
    }

    const url = `https://api.tomtom.com/search/2/geocode/${encodeURIComponent(query)}.json?key=${tomtomKey}&countrySet=CH&limit=5`;
    const response = await fetch(url);
    
    if (!response.ok) {
      throw new Error(`TomTom Geocoding error: ${response.status}`);
    }

    const data = await response.json();
    res.json(data);
  } catch (error) {
    console.error('Geocoding error:', error);
    res.status(500).json({ error: 'Geocoding failed' });
  }
});

// Config endpoint - provides only safe client configuration
app.get('/api/config', (req, res) => {
  res.json({
    appVersion: process.env.APP_VERSION || '1.0.0',
    environment: process.env.NODE_ENV || 'development',
    // Only expose non-sensitive config
    features: {
      mapsEnabled: !!process.env.TOMTOM_API_KEY,
      emailEnabled: !!process.env.EMAIL_API_KEY
    }
  });
});

// Serve static files from dist/client
const clientPath = join(__dirname, '..', 'client');
app.use(express.static(clientPath, {
  maxAge: '1y',
  etag: true,
  lastModified: true,
  setHeaders: (res, path) => {
    if (path.endsWith('.html')) {
      res.setHeader('Cache-Control', 'no-cache');
    }
  }
}));

// Enhanced health check endpoint with metrics
app.get('/health', (req, res) => {
  const uptime = Math.floor((Date.now() - startTime) / 1000);
  const memUsage = process.memoryUsage();
  
  res.json({
    status: 'ok',
    timestamp: new Date().toISOString(),
    uptime: `${uptime}s`,
    memory: {
      used: Math.round(memUsage.heapUsed / 1024 / 1024),
      total: Math.round(os.totalmem() / 1024 / 1024),
      heapTotal: Math.round(memUsage.heapTotal / 1024 / 1024)
    },
    requests: requestCount,
    version: process.env.APP_VERSION || '1.0.0',
    nodeVersion: process.version,
    env: process.env.NODE_ENV || 'development'
  });
});

// SPA fallback - serve index.html for all non-API routes
app.get('*', (req, res) => {
  res.sendFile(join(clientPath, 'index.html'));
});

const server = app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
  console.log(`Environment: ${process.env.NODE_ENV || 'development'}`);
  console.log(`Version: ${process.env.APP_VERSION || '1.0.0'}`);
  console.log(`Process ID: ${process.pid}`);
});

// Graceful shutdown handling
process.on('SIGTERM', () => {
  console.log('SIGTERM received, closing server gracefully...');
  server.close(() => {
    console.log('Server closed successfully');
    process.exit(0);
  });
  
  // Force close after 10s if graceful shutdown fails
  setTimeout(() => {
    console.error('Forced shutdown after timeout');
    process.exit(1);
  }, 10000);
});

process.on('SIGINT', () => {
  console.log('SIGINT received, closing server gracefully...');
  server.close(() => {
    console.log('Server closed successfully');
    process.exit(0);
  });
});
