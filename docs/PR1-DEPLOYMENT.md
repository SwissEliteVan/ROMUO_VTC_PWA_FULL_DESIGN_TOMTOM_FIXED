# PR #1 - Process Manager + Healthcheck Actif

## 🎯 Objectif
Implémenter un système de déploiement zero-downtime avec monitoring basique pour garantir la fiabilité en production.

## 📦 Changements

### Fichiers Créés
1. **`ecosystem.config.cjs`** - Configuration PM2 pour gestion du processus
2. **`scripts/deploy.sh`** - Script de déploiement automatisé avec tests
3. **`docs/PR1-DEPLOYMENT.md`** - Cette documentation

### Fichiers Modifiés
1. **`server/index.ts`** - Healthcheck enrichi + graceful shutdown
2. **`package.json`** - Nouveaux scripts PM2

## 🔧 Installation (VPS)

### Prérequis
- Node.js 18+ installé
- Accès SSH au VPS
- Application déjà buildée une première fois

### Étapes d'Installation

```bash
# 1. Installer PM2 globalement
npm install -g pm2

# 2. Créer le dossier logs
mkdir -p logs

# 3. Build l'application
npm run build

# 4. Premier démarrage avec PM2
npm run start:pm2

# 5. Sauvegarder la configuration PM2
pm2 save

# 6. Configurer le démarrage automatique au boot
pm2 startup systemd
# Copier-coller la commande affichée et l'exécuter

# 7. Vérifier le status
npm run status:pm2
```

## 🧪 Tests de Validation

### 1. Healthcheck Enrichi
```bash
curl http://localhost:3000/health | jq
```

**Réponse attendue:**
```json
{
  "status": "ok",
  "timestamp": "2026-02-12T14:50:00.000Z",
  "uptime": "120s",
  "memory": {
    "used": 45,
    "total": 16384,
    "heapTotal": 60
  },
  "requests": 42,
  "version": "1.0.0",
  "nodeVersion": "v18.x.x",
  "env": "production"
}
```

### 2. Cluster Mode (2 instances)
```bash
npm run status:pm2
```

**Vérifier:**
- 2 instances actives
- Mode: cluster
- Status: online

### 3. Auto-Restart après Crash
```bash
# Simuler un crash
pm2 delete romuo-vtc
npm run start:pm2

# Vérifier redémarrage automatique
npm run status:pm2
```

### 4. Zero-Downtime Reload
```bash
# Build nouvelle version
npm run build

# Reload sans downtime
npm run reload:pm2

# Pendant le reload, vérifier que le site reste accessible:
while true; do curl -s http://localhost:3000/health > /dev/null && echo "✅" || echo "❌"; sleep 0.1; done
```

### 5. Graceful Shutdown
```bash
# Envoyer SIGTERM
pm2 stop romuo-vtc

# Vérifier dans les logs que le shutdown est graceful
npm run logs:pm2 --lines 50
```

## 📊 Commandes PM2 Utiles

```bash
# Status détaillé
npm run status:pm2

# Voir les logs en temps réel
npm run logs:pm2

# Redémarrer (avec downtime)
npm run restart:pm2

# Reload (sans downtime)
npm run reload:pm2

# Arrêter
npm run stop:pm2

# Déployer nouvelle version
npm run deploy
```

## 🔄 Workflow de Déploiement

### Déploiement Manuel
```bash
# Sur le VPS
cd /var/www/romuo
git pull
npm run deploy
```

### Le script `deploy.sh` fait automatiquement:
1. ✅ Build client + server
2. ✅ Test du healthcheck
3. ✅ PM2 reload (zero downtime)
4. ✅ Affichage du status

## ⚠️ Rollback en Cas de Problème

### Rollback Rapide (Version Précédente)
```bash
# 1. Revenir au commit précédent
git log --oneline -5  # Identifier le bon commit
git checkout <commit-hash>

# 2. Rebuild et redéployer
npm run deploy
```

### Rollback d'Urgence (Stopper PM2)
```bash
# Arrêter PM2
pm2 stop romuo-vtc
pm2 delete romuo-vtc

# Revenir au démarrage manuel
node dist/server/index.js
```

### Restauration Complète
```bash
# Si PM2 pose problème
pm2 kill
rm -rf ~/.pm2

# Réinstaller
npm install -g pm2
npm run start:pm2
pm2 save
pm2 startup systemd
```

## 📈 Monitoring

### Métriques Disponibles via /health
- **uptime**: Temps depuis le dernier démarrage
- **memory.used**: RAM consommée par l'app (MB)
- **memory.total**: RAM totale système (MB)
- **requests**: Nombre total de requêtes traitées
- **version**: Version de l'application
- **env**: Environnement (production/development)

### Logs
- **Error logs**: `./logs/error.log`
- **Output logs**: `./logs/out.log`
- **Format**: `YYYY-MM-DD HH:mm:ss Z | message`

### Monitoring PM2
```bash
# Dashboard interactif
pm2 monit

# Status JSON
pm2 jlist

# Métriques
pm2 describe romuo-vtc
```

## 🔐 Sécurité

### Limites de Ressources
- **Max Memory**: 300 MB par instance (auto-restart si dépassé)
- **Max Restarts**: 10 redémarrages en cas de crash répété
- **Min Uptime**: 10s minimum avant de considérer le démarrage réussi

### Graceful Shutdown
- Timeout: 10 secondes max pour terminer les requêtes en cours
- Gestion propre des signaux SIGTERM et SIGINT

## 🎯 Prochaines Étapes (PR #2)

Une fois cette PR validée:
1. **Sécurisation des secrets** (proxy API TomTom)
2. **Optimisation build** (code splitting avancé)
3. **Logs structurés** (Winston + rotation)
4. **Rate limiting** (protection API)

## ✅ Checklist de Validation

- [ ] PM2 installé et configuré
- [ ] `npm run deploy` fonctionne sans erreur
- [ ] Healthcheck retourne des métriques complètes
- [ ] 2 instances cluster actives
- [ ] Auto-restart après crash testé
- [ ] Zero-downtime reload testé
- [ ] Logs accessibles dans `./logs/`
- [ ] PM2 startup au boot configuré
- [ ] Rollback testé et documenté
