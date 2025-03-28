# Production environment
FROM nginx:alpine AS production

# Copy the nginx configuration file
COPY ./nginx.conf /etc/nginx/nginx.conf

EXPOSE 5173
CMD ["nginx", "-g", "daemon off;"]