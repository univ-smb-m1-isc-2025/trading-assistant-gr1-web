# TradeMate - Assistant de Trading

TradeMate est une application web moderne permettant aux traders de suivre les marchés financiers, d'analyser les actions et de créer des alertes personnalisées.

## Fonctionnalités principales

- 📈 **Visualisation de graphiques** en temps réel pour différents symboles boursiers
- 🔍 **Recherche d'actions** par symbole
- 🔔 **Création d'alertes personnalisées** (variations de prix, croisement de moyennes mobiles, pics de volume, etc.)
- 👤 **Gestion de profil utilisateur**
- 🔐 **Authentification sécurisée** (locale et via Google)

## Technologies utilisées

- **Frontend**: React 19, React Router v7, Styled Components
- **Graphiques**: Lightweight Charts
- **Authentification**: JWT, Google OAuth
- **Déploiement**: Docker, Nginx
- **CI/CD**: GitHub Actions

## Installation et démarrage

### Prérequis

- Node.js (version 18 ou supérieure)
- npm ou yarn

### Installation des dépendances

```shell
npm install
```

### Lancement en mode développement

```shell
npm run dev
```

L'application sera disponible à l'adresse [http://localhost:5173](http://localhost:5173).

### Construction pour la production

```shell
npm run build
```

## Déploiement avec Docker

### Utilisation de l'image pré-construite

```shell
docker pull ghcr.io/univ-smb-m1-isc-2025/trading-assistant-gr1-web:main
```

```shell
docker run -p 80:80 --name trademate-web ghcr.io/univ-smb-m1-isc-2025/trading-assistant-gr1-web:main
```

L'application sera accessible à l'adresse [http://localhost](http://localhost).

## Structure du projet

- `/src/components/pages` - Composants de pages principales
- `/src/components/reusable-ui` - Composants UI réutilisables
- `/src/theme` - Configuration des thèmes et styles

## API Backend

L'application communique avec l'API TradeMate disponible à l'URL suivante :
`https://api.trademate.oups.net/api`

Endpoints principaux :

- `/users` - Gestion des utilisateurs
- `/finance` - Données financières
- `/alerts` - Gestion des alertes

## Licence

Ce projet est sous licence MIT. Voir le fichier LICENSE pour plus de détails.
