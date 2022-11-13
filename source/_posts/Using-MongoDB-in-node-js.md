---
title: Using MongoDB in node.js
date: 2022-11-01 15:55:09
cover: /images/mongo.png
thumbnail: /images/mongo.png
toc: true
categories:
- tech
tags:
- tech
- mongo
- mongodb
- noSql
---

## Ref

<!-- more -->

## Concepts

### What is MongoDB

- A leading document, NoSQL database.
- Highly available, scalable.
- Flexible schema.

### Document and scale-out

- Instead of storing tablesof rows or columns like RDBMS, record in MongoDB is document based in BSON, which is a binary representation for JSON.
- Document format makes data:
  - highly flexible
  - allowing varaitions in structure
  - allowing partial complete data
  - can embed one document in another
- Based on scale-out architecture, a structure which enables many small machines to work together to create fast systems and handle huge amounts of data.
  - With it, MongoDB can scale.

BSON Example:

``` json
{
  "_id": 1,
  "name": {
    "first": "Ada",
    "last": "Lovelace"
  },
  "title": "The First Programmer",
  "interests": ["mathematics", "programming"]
}
```

### Glossary

- **Database**: Container for collections.
- **Colletion**: A group of documents. No schema enforced. But documents should be grouped for similar purpose.
- **Document**: A set of key-value pairs. Dynamic schema.
- **Embedded Documents**: Embedded documents are like join in SQL.


### When to use

- Big Data
- Content Management and Delivery
- Mobile and Social Infrastructure
- Data Hub


## Hands-on

### Installation and running

- Install MongoDB Community Server.
- Go to `<install_folder>/bin`, run `mongod`.
  - You got: `NonExistentPath: Data directory: D:\\data\\db\\ not found`. Need to override this pre-configuration first.
- `mongod` can run with command line parameters or read from a config file. Let's just use command line first.  
- Run `mongod --dbpath D:/mongodata/data --logpath D:/mongodata/log/mongod.log  --port 27017 --bind_ip 0.0.0.0`. 27017 is default port. Bind ip to `0.0.0.0` to avoid default `127.0.0.1` binding.
- Now the server is on.

### MongoDB shell

- For servers >= 6.0, shell not longer shipped along with.
- [Download mongosh](https://www.mongodb.com/try/download/shell)

### MongoDB Compass

- The official GUI tool for MongoDB.

