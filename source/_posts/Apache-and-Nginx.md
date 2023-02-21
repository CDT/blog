---
title: Apache vs Nginx, Proxy
date: 2022-09-16 11:37:08
cover: /images/apache_vs_nginx.webp
thumbnail: /images/apache_vs_nginx.webp
categories:
- tech
toc: true
tags:
- tech
- apache
- nginx
- proxy
- forward proxy
- reverse proxy
---

## Refs
1. [Forward and reverse proxy explained](https://juejin.cn/post/7095321237122990116)
<!--more-->

## What and why
### Apache and Nginx
- Apache: HTTP server, most popular web server, alias `httpd`
- Nginx: HTTP server, reverse proxy server, mail proxy server, generic TCP/UDP proxy server

### Proxy
- Proxy: a server application that acts as an intermediary between a client requesting a resource and the server providing that resource.

- Forward proxy: Proxy for cilents
- Forward proxy purposes:
  - 1. get over GFW
  - 2. Hide client IP
  - 3. Accelerate network access: Usually forward proxy servers holds a large cache which accelerates network access by using cache

![forward proxy](/images/forward-proxy.png)

- Reverse proxy: Proxy for servers
- Reverse proxy purposes:
  - 1. Load balancing
  - 2. Hide server IP
  - 3. Accelerate network access: Work in a similar way as forward proxy
  - 4. Network security: reverse proxy can serve as a fireawll for servers

![reverse proxy](/images/reverse-proxy.png)

![Forward and Reverse Proxy](/images/forward_reverse_proxy.jpg)

## Apache

### Connect Apache and PHP

- In most cases, Apache uses thread-safe version of PHP.

#### Connect PHP7:

``` conf, httpd.conf
LoadModule php7_module "D:/tools/php-7.4.33-Win32-vc15-x64/php7apache2_4.dll"

<IfModule dir_module>
    DirectoryIndex index.html index.php // add index.php
</IfModule>


<IfModule mime_module>
  AddHandler application/x-httpd-php .php
  AddType application/x-httpd-php .php .html
</IfModule>


PHPIniDir "D:/tools/php-7.4.33-Win32-vc15-x64"
```

### Connect PHP8

- note that module name is not `php8_module` but `php_module`.

### Run Apache

- by `cmd`:
  - cd `D:/apache24/bin`
  - `httpd`

- as a service:
  - cd `D:/apache24/bin`
  - `httpd -k install`: install `Apache2.4` service
  - `net start apache2.4`
  - Restart: `net stop apache2.4` + `net start apache2.4` or `httpd -k restart`

## Nginx
- Nginx: HTTP server, reverse proxy server, mail proxy server, generic TCP/UDP proxy server

### Commands
- `nginx`: start server
- `nginx -s reload`: reoad configuration file
- `nginx -s stop`: fast shutdown
- `nginx -s quit`: graceful shutdown

### Configuration
- [Nginx configuration](http://nginx.org/en/docs/beginners_guide.html)

### Nginx as static server
```
server {
  listen 8081;
  # All requests go to D:/files.
  # If other location blocks does not have a root directive, requests go here.
  root D:/files;
}
```


```
http {
  server {
    listen 8081;
  
    location / {
      # Other request will fall back here
      root D:/other_files;  
    }

    location /images/ {
      # http://localhost:8081/images/test.png will send D:/files/images/test.png file 
      root D:/files;
    }
  }
}
```

### Nginx as HTTP proxy

```
server {
  listen 8081;
	  
  location / {
	  # http://localhost:8081 will be redirected to http://dcis.tjh.com
	  proxy_pass http://dcis.tjh.com;
  }
}
```

### Nginx as TCP proxy

```
stream {
    server {
	    listen 6666;
	    proxy_pass db.his.tjh.com:1521;
      # Connect to oracle at localhost:6666 wil be redirected to db.his.tjh.com:1521
    }
}
```