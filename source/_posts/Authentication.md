---
title: Authentication
date: 2023-02-20 11:02:10
cover: /images/auth.svg
thumbnail: /images/auth.svg
toc: true
categories:
- tech
tags:
- tech
- authentication
---

## Refs
- [HTTP Auth](https://developer.mozilla.org/en-US/docs/Web/HTTP/Authentication)
- [Authorizing request](https://learning.postman.com/docs/sending-requests/authorization/)

## Authentication Schemes

### Basic

- This is the simplest form of HTTP authentication, where the client sends the username and password in base64 encoded text as part of the HTTP header. The server then checks the username and password against a user database and sends a response indicating whether the authentication was successful or not. This scheme is not very secure, as the password is transmitted in clear text and can be intercepted by anyone who is listening on the network.

### Bearer

- A token-based scheme that is set in the `Authorization` header in the format `Bearer <token>`.
- "Bearer" means the client is the bearing the token.
- Bearer token mostly uses JWT.

### Digest

- This is a more secure form of HTTP authentication that uses a cryptographic hash to protect the password. When the client sends the username and password, the server sends a challenge that includes a nonce value. The client then computes a hash of the password and other information, including the nonce, and sends the hash back to the server. The server then checks the hash to authenticate the user.

### OAuth2

- See my `OAuth2` blog.