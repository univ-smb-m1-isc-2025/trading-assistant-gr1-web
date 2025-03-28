# Production environment
FROM nginx:alpine AS production

# Copy the nginx configuration file
COPY --from=build /app/build /usr/share/nginx/html

EXPOSE 5173
CMD ["nginx", "-g", "daemon off;"]