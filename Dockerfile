# Production environment
FROM nginx:alpine AS production

# Copy the nginx configuration file
COPY ./nginx.conf /etc/nginx/nginx.conf

EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]