---
title: Wordpress Ecommerce website
date: 2022-12-20 11:38:48
cover: /images/wordpress.jpg
thumbnail: /images/wordpress.jpg
toc: true
categories:
- tech
tags:
- tech
- wordpress
- ecommerce
- woocommerce
---

## Install
[Ref](https://www.howtosolutions.net/2021/07/install-wordpress-php-apache-mysql-on-windows-for-beginners/)

### Setup wordpress and mysql

1. [Download wordpress](https://wordpress.org/download/)
<!--more-->

2. Download [MySql Community Server](https://dev.mysql.com/downloads/mysql/) and install

3. Configure MySql

- Default admin username: `root`.

- Open MySql 8.0 Command Line Client

```
mysql> CREATE DATABASE wordpress;
Query OK, 1 row affected (0.00 sec)

mysql> CREATE USER 'wordpress'@'localhost' IDENTIFIED BY '86915998cdt';
Query OK, 0 rows affected (0.01 sec)

mysql> GRANT ALL PRIVILEGES ON wordpress.* TO 'wordpress'@'localhost';
Query OK, 0 rows affected (0.01 sec)

mysql> FLUSH PRIVILEGES;
Query OK, 0 rows affected (0.01 sec) 
```

### Setup PHP

- [Download 8.2 Thread Safe](https://windows.php.net/download#php-8.2)
- Note: Use non-threa-safe for nginx and thread-safe for apache, [See here](https://stackoverflow.com/questions/1623914/what-is-thread-safe-or-non-thread-safe-in-php)
- Copy `php.ini-development` to `php.ini` and edit:

```
;extension_dir = "ext"
// change to
;extension_dir = "D:\tools\php-8.2.0-Win32-vs16-x64\ext"

;extension=openssl
;extension=mysqli
// uncomment
extension=openssl
extension=mysqli

upload_max_filesize = 2M
post_max_size = 8M
// change to
upload_max_filesize = 128M
post_max_size = 128M
```


### Setup Apache

- [Download](https://www.apachehaus.com/cgi-bin/download.plx) 
- Copy `wordpress` folder into the `htdocs` folder of nginx.
- Edit `conf/httpd.conf`:

```
Define SRVROOT "/Apache24"
// change to 
Define SRVROOT "D:\tools\Apache24"

DocumentRoot "${SRVROOT}/htdocs"
<Directory "${SRVROOT}/htdocs">
  AllowOverride None
// change to
DocumentRoot "${SRVROOT}/htdocs/wordpress"
<Directory "${SRVROOT}/htdocs/wordpress">
  AllowOverride All

<IfModule dir_module>
    DirectoryIndex index.html
</IfModule>
// change to 
<IfModule dir_module>
    DirectoryIndex index.html index.php
</IfModule>



#LoadModule rewrite_module modules/mod_rewrite.so
// uncomment
LoadModule rewrite_module modules/mod_rewrite.so

// Add
LoadModule php_module "D:\tools\php-8.2.0-Win32-vs16-x64\php8apache2_4.dll
PHPIniDir "D:\tools\php-8.2.0-Win32-vs16-x64"

#AddHandler cgi-script .cgi
// change to
AddHandler application/x-httpd-php .php
```

### Run and debug

- Go to `localhost:80`, the install script runs automatically.
- If error occurs, debug it:

Edit `wp-config.php`:

``` php
define( 'WP_DEBUG', false );
// change to
define( 'WP_DEBUG', true );

define( 'WP_DEBUG_DISPLAY', false );

define( 'WP_DEBUG_LOG', true );
```

Now there's a `debug.log` in `wp-content` folder.

You may got this in `debug.log`:

```
Call to undefined function mysql_connect()
```

It means `mysqli` extension is not enabled. Run `php -m` to see all enabled modules.
Or the following php:

``` html
<pre>
<?php print_r(get_loaded_extensions()); ?>
</pre>

<pre>
<?php phpinfo(); ?>
</pre>
```

Check out if modules and `.ini` file are configured correctly.

## Configure site

