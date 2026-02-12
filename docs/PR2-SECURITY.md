# PR #2 - Sécurisation des Secrets & API Proxy

## 🎯 Objectif
Protéger les clés API en les déplaçant côté serveur et créer un proxy API pour masquer les credentials sensibles.

## 🔐 Problème Identifié

### Avant (❌ Risque Sécurité)
```javascript
// client/public/config.js - EXPOSÉ PUBLIQUEMENT
window.APP_CONFIG = {
  TOMTOM_API_KEY: 'YOUR_KEY_HERE',  // ⚠️ Visible dans le source
  GOOGLE_MAPS_API_KEY: 'YOUR_KEY'    // ⚠️ Peut être volée et abusée
}
```

**Risques:**
- Clés API exposées dans le bundle client
- Quotas épuisés par des tiers malveillants
- Coûts imprévus si usage abusif
- Pas de rate limiting par utilisateur

### Après (✅ Sécurisé)
```typescript
// server/index.ts - API KEYS côté serveur uniquement
import 'dotenv/config';

app.post('/api/maps/route', async (req, res) => {
  const tomtomKey = process.env.TOMTOM_API_KEY; // Jamais exposée
  // Appel API avec la clé serveur
});
```

## 📦 Changements

### Fichiers Créés
1. **[`.env`](.env)** - Variables d'environnement réelles (NON commité)
2. **[`client/src/lib/api.ts`](client/src/lib/api.ts)** - Client API centralisé

### Fichiers Modifiés
1. **[`.env.example`](.env.example)** - Template mis à jour avec commentaires
2. **[`.gitignore`](.gitignore)** - Ajoute `.env*` pour éviter les commits accidentels
3. **[`server/index.ts`](server/index.ts)** - 3 nouveaux endpoints API proxy
4. **[`package.json`](package.json)** - Ajout dépendance `dotenv`

### Fichiers à Supprimer (optionnel)
- `client/public/config.js` - Plus nécessaire, remplacé par proxy API

## 🔧 Nouveaux Endpoints API

### 1. POST `/api/maps/route`
Calcul d'itinéraire via TomTom (proxy)

**Request:**
```json
{
  "origin": "47.3769,8.5417",
  "destination": "46.5197,6.6323"
}
```

**Response:**
```json
{
  "routes": [...],
  "summary": {
    "lengthInMeters": 150000,
    "travelTimeInSeconds": 5400
  }
}
```

### 2. POST `/api/maps/geocode`
Géocodage d'adresses via TomTom

**Request:**
```json
{
  "query": "Genève Aéroport, Suisse"
}
```

**Response:**
```json
{
  "results": [
    {
      "position": { "lat": 46.238, "lon": 6.109 },
      "address": { "freeformAddress": "..." }
    }
  ]
}
```

### 3. GET `/api/config`
Configuration publique de l'app

**Response:**
```json
{
  "appVersion": "1.0.0",
  "environment": "production",
  "features": {
    "mapsEnabled": true,
    "emailEnabled": false
  }
}
```

## 🚀 Installation

### 1. Installer Dépendance
```bash
npm install
```

### 2. Configurer Variables d'Environnement
```bash
# Copier le template
cp .env.example .env

# Éditer .env et remplir les vraies clés
nano .env
```

**Exemple `.env`:**
```bash
PORT=3000
NODE_ENV=production
APP_VERSION=1.0.0

# ⚠️ Remplacer par vos vraies clés
TOMTOM_API_KEY=votre_cle_tomtom_ici
GOOGLE_MAPS_API_KEY=votre_cle_google_ici

VITE_APP_BASE_URL=https://romuo.ch
VITE_API_BASE_URL=https://romuo.ch/api
```

### 3. Build et Déployer
```bash
npm run build
npm run deploy
```

## ✅ Tests de Validation

### 1. Vérifier que dotenv charge les variables
```bash
npm run build
node dist/server/index.js

# Dans un autre terminal:
curl http://localhost:3000/api/config
```

**Résultat attendu:**
```json
{
  "appVersion": "1.0.0",
  "environment": "production",
  "features": {
    "mapsEnabled": true,
    "emailEnabled": false
  }
}
```

### 2. Tester le proxy de routing
```bash
curl -X POST http://localhost:3000/api/maps/route \
  -H "Content-Type: application/json" \
  -d '{"origin":"47.3769,8.5417","destination":"46.5197,6.6323"}'
```

### 3. Tester le géocodage
```bash
curl -X POST http://localhost:3000/api/maps/geocode \
  -H "Content-Type: application/json" \
  -d '{"query":"Genève Aéroport"}'
```

### 4. Vérifier que les clés ne sont PAS dans le bundle client
```bash
# Le bundle ne doit JAMAIS contenir la vraie clé API
grep -r "TOMTOM_API_KEY" dist/client/
# Résultat attendu: aucun match
```

## 🔒 Sécurité Renforcée

### Protection Implémentée
✅ Clés API jamais exposées au client  
✅ Variables d'environnement dans `.env` (ignoré par git)  
✅ Validation des paramètres d'entrée  
✅ Gestion d'erreurs sans leak d'info système  
✅ Proxy API avec logs serveur  

### Prochaines Améliorations (PR #5)
- Rate limiting par IP (express-rate-limit)
- CORS configuré pour domaines autorisés uniquement
- Helmet.js pour headers de sécurité CSP
- Cache Redis pour limiter appels TomTom

## 📊 Usage Client

### Avant (ancien config.js)
```javascript
// ❌ Exposé publiquement
const key = window.APP_CONFIG.TOMTOM_API_KEY;
fetch(`https://api.tomtom.com/...?key=${key}`);
```

### Après (API proxy sécurisée)
```typescript
// ✅ Utilise le proxy serveur
import { calculateRoute, geocodeAddress } from '@/lib/api';

const route = await calculateRoute(
  '47.3769,8.5417',
  '46.5197,6.6323'
);
```

## ⚠️ Migration

### Étapes de Migration
1. ✅ Créer `.env` avec les vraies clés
2. ✅ Vérifier que `.env` est dans `.gitignore`
3. ✅ Build et tester les endpoints `/api/*`
4. ✅ Mettre à jour le code client pour utiliser `api.ts`
5. ⚠️ Supprimer `client/public/config.js` (optionnel)
6. ✅ Déployer et tester en production

### Variables d'Environnement en Production (VPS)

**Option 1: Fichier .env sur le serveur**
```bash
# Sur le VPS
cd /var/www/romuo
nano .env
# Coller les vraies clés
pm2 restart romuo-vtc
```

**Option 2: PM2 Ecosystem**
```javascript
// ecosystem.config.cjs
module.exports = {
  apps: [{
    env_production: {
      TOMTOM_API_KEY: 'votre_vraie_cle',
      // ...
    }
  }]
};
```

## 🔄 Rollback

### Si les endpoints API ne fonctionnent pas
```bash
# 1. Vérifier les logs
npm run logs:pm2

# 2. Vérifier que dotenv est installé
npm list dotenv

# 3. Vérifier que .env existe et est valide
cat .env

# 4. Redémarrer avec reload de l'env
pm2 restart romuo-vtc --update-env
```

### Rollback complet vers config.js (temporaire)
```bash
# Restaurer l'ancien système
git checkout HEAD~1 client/public/config.js
pm2 restart romuo-vtc
```

## ✅ Checklist de Validation

- [ ] `dotenv` installé (`npm list dotenv`)
- [ ] `.env` créé avec vraies clés API
- [ ] `.env` dans `.gitignore` (vérifier avec `git status`)
- [ ] Build réussi (`npm run build`)
- [ ] `/api/config` retourne la config
- [ ] `/api/maps/route` calcule un itinéraire
- [ ] `/api/maps/geocode` trouve des adresses
- [ ] Aucune clé API dans `dist/client/` (`grep -r "YOUR_" dist/`)
- [ ] PM2 redémarre avec les nouvelles env vars
- [ ] Tests en production validés

## 🎯 Prochaine PR #3

Une fois PR #2 validée:
- **Optimisation Build** (code splitting React/Maps/UI)
- **Compression Brotli** pour réduire la taille du bundle
- **Cache stratégique** pour assets statiques
