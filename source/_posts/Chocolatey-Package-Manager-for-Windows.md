---
title: Chocolotey - Package Manager for Windows
date: 2022-10-19 15:36:37
cover: images/chocolatey.svg
thumbnail: images/chocolatey.svg
categories:
- tech
tags:
- tech
- chocolatey
---

On Linux/*nix, we have `apt-get` to manage packages and softwares.
On Mac, we have `brew`.
Is there any equivalent for Windows?
Yes, it's [chocolatey](https://chocolatey.org/).
With chocolatey, finding a package or software is no longer prohibitive in Windows, and also no need to worry about malwares or viruse.
<!--more-->

## Install
[Ref](https://chocolatey.org/install)
Start Powershell as administrator and run the following command:
``` console
Set-ExecutionPolicy Bypass -Scope Process -Force; [System.Net.ServicePointManager]::SecurityProtocol = [System.Net.ServicePointManager]::SecurityProtocol -bor 3072; iex ((New-Object System.Net.WebClient).DownloadString('https://community.chocolatey.org/install.ps1'))
```

After install, run `choco` to test if it's successful.

## Install packages
[Ref](https://community.chocolatey.org/packages)

Find and install packages at [https://community.chocolatey.org/packages](https://community.chocolatey.org/packages).