# Production environment
FROM nginx:alpine

# Suppression du fichier de configuration par défaut de Nginx
RUN rm -rf /etc/nginx/conf.d
COPY nginx.conf /etc/nginx/conf.d/default.conf

EXPOSE 5173

CMD ["nginx", "-g", "daemon off;"]