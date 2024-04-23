# FROM nginx:latest
# COPY *.conf /etc/nginx/conf.d

FROM httpd:2.4-alpine
COPY ./httpd.conf /usr/local/apache2/conf/httpd.conf