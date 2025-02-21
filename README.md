# TradeMate

## lancer l'image docker :

```shell
docker pull ghcr.io/univ-smb-m1-isc-2025/trading-assistant-gr1-web:main

```

```shell
docker build -t trademate-web .
```

```shell
docker run -p 5173:5173 --name trademate-web trademate-web
```
