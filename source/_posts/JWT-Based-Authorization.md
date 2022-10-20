---
title: JWT Based Authorization
cover: /images/jwt.svg
thumbnail: /images/jwt.svg
date: 2022-10-20 15:15:49
categories:
- tech
tags:
- tech
- jwt
- authorization
---

## Ref
1. [JWT](https://jwt.io/introduction)
2. [JSON Web Token Tutorial: An Example in Laravel and AngularJS](https://www.toptal.com/web/cookie-free-authentication-with-json-web-tokens-an-example-in-laravel-and-angularjs)
<!--more-->
## Usage
- An open standard([RFC 7519](https://tools.ietf.org/html/rfc7519)) for transmitting encrypted, digitally signed JSON object information which can be verified and trusted.
- Most common use is putting it in the `Authorization` header to authenticate request identity. Also a good fit for SSO authentication.

## Structure

**Header.Payload.Signature**

Example:

``` js
 // Header. Algorithm and type. Encoded in base64.
base64enc({  "alg": "HS256",
  "typ": "JWT"
}),
// Payload. Encoded in base64.
{ 
  "sub": "1234567890",
  "name": "John Doe",
  "admin": true
},
// Signature.
// Use HMAC SHA256 algorithm to take the encoded header, the encoded payload, a secret, the algorithm specified in the header all together and sign that.
HMACSHA256(
  base64UrlEncode(header) + "." +
  base64UrlEncode(payload),
  secret)
```

Properties in payload part is called *claims*. Standard claim names see [here](https://www.iana.org/assignments/jwt/jwt.xhtml).

The signature is used to verify the message wasn't tampered with along the way, and, in the case of tokens signed with a private key, it can also verify that the sender of the JWT is who it says it is.

![Example JWT](/images/jwt_example.png)

[Online playground here](https://jwt.io/#debugger-io)

Things to note
- If claim `exp` is not set, then the JWT token will never expire.

## Node.js example

