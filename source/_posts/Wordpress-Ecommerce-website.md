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

## Install each component individually

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
;extension=gd
// uncomment
extension=openssl
extension=mysqli
extension=gd

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

## Install by XAMPP

1. [Download](https://sourceforge.net/projects/xampp/files/XAMPP%20Windows/) and install

2. Copy `wordpress` to `D:/xampp/htodcs`

3. Open Mysql Admin, add database and user.

4. Visit `localhost/wordpress` and configure wordpress

## Configure site

### Install theme and plugins

1. Plugins->Add New, search for `woocommerce` and install

- If not able to install online, download the plugin file and install from file.

2. Others

- May encounter a dozen of plugins unable to directly install online, download them and install from file.

- Use [Astra](https://wordpress.org/themes/astra/) theme. May unable to install online, download and install.

- Use [Elementor page builder.](https://wordpress.org/plugins/elementor/)

- Enable `gd` extension by uncommenting `;extension=gd` in `PHP.ini`

### Configure

1. Settings->Permalinks, set Permalink structure to `Post name` to enhance SEO.

2. Enable Astra
  - Appearance->Themes
  - Enable Astra
  - Click theme details and then click Astra Options

  ![Install Importer Plugin](/images/astra_options1.png) 

3. Configure Starter Template for Astra

  - Install [Starter Templates plugin](https://wordpress.org/plugins/astra-sites/) and activate it
  - Click `See Library`
  - Choose `Elementor` for page builder
  - Select a template and apply

4. Now customize your website.

### Other Important Plugins

- Yoast SEO: Improve SEO
- Contact Form 7: Make customer contact you easier
- UpdraftPlus: Backup website
- MonsterInsights: Integrates Google Analysis
- Paypal, Stripe, AliPay: Payment

## Maintenance

### Backup website

- Method 1: Tools->Export/Import

- Method 2: [Bluehost Site Migrator](https://wordpress.org/plugins/bluehost-site-migrator/)