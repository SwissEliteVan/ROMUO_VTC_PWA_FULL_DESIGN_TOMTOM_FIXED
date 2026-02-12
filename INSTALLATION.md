# 🚀 Guide d'Installation Production - ROMUO VTC

## ⚡ PR #1 - Process Manager + Zero-Downtime Deployment

### 📋 Fichiers Créés/Modifiés

#### ✅ Nouveaux Fichiers
- [`ecosystem.config.cjs`](ecosystem.config.cjs) - Configuration PM2
- [`scripts/deploy.sh`](scripts/deploy.sh) - Script de déploiement automatisé
- [`docs/PR1-DEPLOYMENT.md`](docs/PR1-DEPLOYMENT.md) - Documentation complète
- [`INSTALLATION.md`](INSTALLATION.md) - Ce fichier

#### ✅ Fichiers Modifiés  
- [`server/index.ts`](server/index.ts) - Healthcheck enrichi + graceful shutdown
- [`package.json`](package.json) - Scripts PM2 ajoutés

---

## 🔧 Installation sur VPS

### Commandes d'Installation

```bash
# 1. Installer PM2 globalement
npm install -g pm2

# 2. Créer le dossier logs
mkdir -p logs

# 3. Rendre le script de déploiement exécutable (Linux/Mac)
chmod +x scripts/deploy.sh

# 4. Build initial
npm install
npm run build

# 5. Démarrage avec PM2
npm run start:pm2

# 6. Sauvegarder la configuration
pm2 save

# 7. Auto-démarrage au boot du serveur
pm2 startup systemd
# ⚠️ Copier-coller et exécuter la commande affichée

# 8. Vérifier que tout fonctionne
npm run status:pm2
curl http://localhost:3000/health
```

---

## ✅ Tests de Validation

### 1. Healthcheck Enrichi
```bash
curl http://localhost:3000/health | jq
```

**Résultat attendu:**
```json
{
  "status": "ok",
  "uptime": "120s",
  "memory": { "used": 45, "total": 16384 },
  "requests": 42,
  "version": "1.0.0"
}
```

### 2. Cluster Mode (2 instances)
```bash
npm run status:pm2
```
Vérifier: 2 instances "online"

### 3. Zero-Downtime Reload
```bash
npm run deploy
```
Le site reste accessible pendant le déploiement

### 4. Auto-Restart
```bash
# Tuer une instance
pm2 delete romuo-vtc

# Redémarrer
npm run start:pm2
```
L'app redémarre automatiquement

---

## 🔄 Workflow de Déploiement

### Déploiement Standard
```bash
cd /var/www/romuo
git pull
npm run deploy
```

Le script [`deploy.sh`](scripts/deploy.sh) fait automatiquement:
1. Build client + serveur
2. Test du healthcheck  
3. PM2 reload sans downtime
4. Affichage du status

---

## ⚠️ Rollback

### Rollback Rapide
```bash
git log --oneline -5
git checkout <commit-hash-precedent>
npm run deploy
```

### Rollback d'Urgence
```bash
pm2 stop romuo-vtc
pm2 delete romuo-vtc
node dist/server/index.js
```

---

## 📊 Monitoring

### Commandes Utiles
```bash
# Status
npm run status:pm2

# Logs temps réel
npm run logs:pm2

# Redémarrage
npm run reload:pm2

# Dashboard interactif
pm2 monit
```

### Métriques via /health
- Uptime
- Mémoire utilisée
- Nombre de requêtes
- Version de l'app

---

## 📁 Structure des Logs
```
logs/
├── error.log    # Erreurs uniquement
└── out.log      # Sortie standard (console.log)
```

---

## 🎯 Prochaines PR

Une fois PR #1 validée:

- **PR #2** - Sécurisation secrets (proxy API TomTom)
- **PR #3** - Build optimisé (code splitting)
- **PR #4** - Logs structurés (Winston)
- **PR #5** - Rate limiting
- **PR #6** - CI/CD robuste (SSH au lieu de FTP)

---

## 🆘 Dépannage

### PM2 ne démarre pas
```bash
pm2 kill
npm install -g pm2
npm run start:pm2
```

### Port 3000 déjà utilisé
```bash
# Trouver le processus
lsof -i :3000
# Tuer le processus
kill -9 <PID>
```

### Logs non créés
```bash
mkdir -p logs
chmod 755 logs
pm2 restart romuo-vtc
```

---

## ✅ Checklist de Validation Finale

- [ ] PM2 installé (`pm2 --version`)
- [ ] Build réussi (`npm run build`)
- [ ] Healthcheck actif (`curl localhost:3000/health`)
- [ ] 2 instances cluster (`npm run status:pm2`)
- [ ] Auto-restart testé
- [ ] Zero-downtime reload testé (`npm run deploy`)
- [ ] Logs présents dans `./logs/`
- [ ] PM2 startup configuré
- [ ] Rollback testé

**Une fois validé → Commit + Push → Passer à PR #2**
