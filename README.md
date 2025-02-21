# React + Vite

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react/README.md) uses [Babel](https://babeljs.io/) for Fast Refresh
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react-swc) uses [SWC](https://swc.rs/) for Fast Refresh

## lancer l'image docker :

```shell
docker pull ghcr.io/univ-smb-m1-isc-2025/trading-assistant-gr1-web:main

```

```shell
docker build -t trademate-web .
```

```shell
docker run -p 80:80 --name trademate-web trademate-web
```
