---
title: Redis
date: 2022-06-21 10:41:55
tags:
- tech
- redis
---
![redis](/images/redis.png)
## What is redis
An **distributed in-memory key-value** database.
distributed: redis can scale from a single instance to a distributed system.
in-memory: that's why redis is fast and commonly serves as cache.
key-value: redis stores key-value pairs.

## Why redis
As an in-memory cache, redis is much faster than traditional RDBMS.
Helps reduce database workload.

## Install
Server: See offical install procedure [here](https://redis.io/docs/getting-started/installation/install-redis-on-linux/).
As no offical windows install file provided, tporadowski provides an [unoffical install file](https://github.com/tporadowski/redis/releases).

Client: redis server ships with a cli tool `redis-cli`. For GUI client, check [RedisInsight](https://redis.io/download/) out.

## Config
### Difference between redis.windows-service.conf and redis.windows.conf
`redis.windows-service.conf`: Configuration file for windows service.
`reids.windows.conf`: Configuration file for command line.

### Security
Default redis requires no auth, but cannot access from machine other than localhost.
To enable remote access (only tested on windows):
In file `redis.windows-service.conf`: 
  1. Comment `bind 127.0.0.1`(line 64). This makes redis listen to all interfaces.
  2. Change `procted-mode yes` to `protected-mode no`(line 83). All clients are now able to connect in.
  3. Uncomment `requirepass foobared`(line 503) and replace `foobared` to your own password.

## Commands
`redis-cli`: connects to localhost on port 6379.
`redis-cli -h [host] -p [port] -a [password]`: connect to specified host and port. If password contains special character, wrap it in quotes.

