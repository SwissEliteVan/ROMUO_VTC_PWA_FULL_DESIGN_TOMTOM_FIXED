import express from 'express';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';
import { existsSync } from 'fs';
import os from 'os';
import 'dotenv/config';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const app = express();
const PORT = process.env.PORT || 3000;

// Application state tracking
let startTime = Date.now();
let requestCount = 0;

// ======================
// MIDDLEWARES
// ======================

// Request counter
app.use((req, res, next) => {
  requestCount++;
  next();
});

// JSON body parser
app.use(express.json());

// Security headers
app.use((req, res, next) => {
  res.setHeader('X-Content-Type-Options', 'nosniff');
  res.setHeader('X-Frame-Options', 'DENY');
  res.setHeader('X-XSS-Protection', '1; mode=block');
  res.setHeader('Referrer-Policy', 'strict-origin-when-cross-origin');
  next();
});

// Content Security Policy - OPTIMISÉE
app.use((req, res, next) => {
  const isDev = process.env.NODE_ENV !== 'production';
  const cspDirectives = [
    "default-src 'self'",
    "script-src 'self' 'unsafe-inline' 'unsafe-eval' https://*.launchdarkly.com",
    "style-src 'self' 'unsafe-inline' https://fonts.googleapis.com",
    "font-src 'self' data: https://fonts.gstatic.com",
    "img-src 'self' data: https://*.tomtom.com",
    `connect-src 'self' https://*.tomtom.com https://*.launchdarkly.com ws: wss: ${isDev ? 'http://localhost:3000 http://localhost:3001' : ''}`,
    "frame-src 'none'",
    "object-src 'none'",
    "manifest-src 'self'"
  ];
  
  res.setHeader('Content-Security-Policy', cspDirectives.join('; '));
  next();
});

// ======================
// STATIC FILES - CORRIGÉ AVEC FALLBACK
// ======================

// Déterminer le chemin des fichiers statiques avec plusieurs possibilités
const possiblePaths = [
  join(__dirname, '..', 'dist'),
  join(process.cwd(), 'dist'),
  join(__dirname, '..', 'client', 'dist'),
  join(__dirname, '..', 'build'),
  join(__dirname, '..', 'public')
];

let clientPath = null;
for (const path of possiblePaths) {
  const indexPath = join(path, 'index.html');
  if (existsSync(indexPath)) {
    clientPath = path;
    console.log(`✅ Fichiers statiques trouvés dans: ${clientPath}`);
    break;
  }
}

// Si aucun chemin trouvé, utiliser le chemin par défaut et afficher une erreur
if (!clientPath) {
  clientPath = join(__dirname, '..', 'dist');
  console.error(`⚠️ ATTENTION: index.html non trouvé dans les chemins testés`);
  console.error(`   Utilisation du chemin par défaut: ${clientPath}`);
  console.error(`   Exécutez "npm run build:client" pour générer les fichiers`);
}

// Servir les fichiers statiques
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

// ======================
// API ROUTES
// ======================

// Proxy TomTom Routing
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

// Proxy TomTom Geocoding
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

// Config endpoint
app.get('/api/config', (req, res) => {
  res.json({
    appVersion: process.env.APP_VERSION || '1.0.0',
    environment: process.env.NODE_ENV || 'development',
    features: {
      mapsEnabled: !!process.env.TOMTOM_API_KEY,
      emailEnabled: !!process.env.EMAIL_API_KEY
    }
  });
});

// Health check
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

// ======================
// SPA FALLBACK - DOIT ÊTRE EN DERNIER
// ======================
app.get('*', (req, res) => {
  // Ne pas intercepter les routes API
  if (req.path.startsWith('/api/')) {
    return res.status(404).json({ error: 'API endpoint not found' });
  }
  
  const indexPath = join(clientPath, 'index.html');
  
  // Vérifier si le fichier existe
  if (existsSync(indexPath)) {
    res.sendFile(indexPath);
  } else {
    console.error(`❌ ERREUR CRITIQUE: index.html non trouvé à ${indexPath}`);
    res.status(500).send(`
      <html>
        <head><title>Erreur</title></head>
        <body>
          <h1>Erreur de configuration</h1>
          <p>Le fichier index.html n'a pas été trouvé.</p>
          <p>Chemin recherché: ${indexPath}</p>
          <p>Exécutez <strong>npm run build:client</strong> pour générer les fichiers.</p>
        </body>
      </html>
    `);
  }
});

// ======================
// SERVER START
// ======================
const server = app.listen(PORT, () => {
  console.log('\n===========================================');
  console.log('🚀 ROMUO VTC - SERVEUR DÉMARRÉ');
  console.log('===========================================');
  console.log(`📍 Port: ${PORT}`);
  console.log(`📍 Environnement: ${process.env.NODE_ENV || 'development'}`);
  console.log(`📍 Version: ${process.env.APP_VERSION || '1.0.0'}`);
  console.log(`📍 PID: ${process.pid}`);
  console.log(`📍 Fichiers statiques: ${clientPath}`);
  console.log(`📍 Index.html trouvé: ${existsSync(join(clientPath, 'index.html')) ? '✅' : '❌'}`);
  console.log(`📍 Health check: http://localhost:${PORT}/health`);
  console.log(`📍 Application: http://localhost:${PORT}`);
  console.log('===========================================\n');
});

// ======================
// GRACEFUL SHUTDOWN
// ======================
const gracefulShutdown = (signal) => {
  console.log(`\n${signal} reçu, arrêt gracieux du serveur...`);
  server.close(() => {
    console.log('✅ Serveur fermé avec succès');
    process.exit(0);
  });
  
  setTimeout(() => {
    console.error('❌ Arrêt forcé après timeout');
    process.exit(1);
  }, 10000);
};

process.on('SIGTERM', () => gracefulShutdown('SIGTERM'));
process.on('SIGINT', () => gracefulShutdown('SIGINT'));

// Gestion des erreurs non catchées
process.on('uncaughtException', (err) => {
  console.error('❌ Uncaught Exception:', err);
  gracefulShutdown('UNCAUGHT_EXCEPTION');
});

process.on('unhandledRejection', (reason, promise) => {
  console.error('❌ Unhandled Rejection at:', promise, 'reason:', reason);
});