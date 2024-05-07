# FROM nginx:latest
# COPY *.conf /etc/nginx/conf.d

FROM httpd:2.4-alpine
WORKDIR /usr/local/apache2
ADD httpd.conf conf
ADD dist htdocs