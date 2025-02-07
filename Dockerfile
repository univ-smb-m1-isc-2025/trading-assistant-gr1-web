# Base Image 
FROM nginx:alpine

# MAINTAINER of the Dockerfile
MAINTAINER Mathis Feltrin <mathisfeltrin@gmail.com>`

#Copy *
COPY . .

#Expose Nginx Port
EXPOSE 80

#Start NginxService 
CMD ["nginx", "-g", "daemon off;"]