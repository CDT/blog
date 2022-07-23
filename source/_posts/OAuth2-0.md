---
title: OAuth2.0
date: 2022-07-25 16:51:15
categories:
- tech
- underwork
tags:
- tech
- OAuth2
- authorization
---
**(BLOG STILL IN PROGRESS)**

![](/images/oauth2.jpeg)
## Refs
1. [OAuth2.0](https://oauth.net/2/)
2. [What is OAuth2.0?](https://auth0.com/intro-to-iam/what-is-oauth-2/) 
3. [JSON Web Tokens](https://jwt.io/)

## What is OAuth 2.0 ?
The industry-standard protocol for authorization. 
This specification and its extensions are being developed within the [IETF OAuth Working Group](https://www.ietf.org/mailman/listinfo/oauth).

## Authentication vs Authorization
Authentication verifies the identity of a user or service, and authorization determines their access rights.

## Access token
An Access Token is a piece of data that represents the authorization to access resources on behalf of the end-user. 

OAuth 2.0 doesn’t define a specific format for Access Tokens. However, in some contexts, the JSON Web Token (JWT) format is often used. 

### JWT
An open, industry standard [RFC 7519](https://tools.ietf.org/html/rfc7519) method for representing claims securely between two parties.

You can decode, verify and generate JWT.

Includes:
- Header: Algorithm and token type
- Payload: Data
- Signature: verifies data

![](/images/jwt1.png)

## Roles
**Resource Owner**: The user or system that owns the protected resources and can grant access to them.

**Client**: The client is the system that requires access to the protected resources. To access resources, the Client must hold the appropriate Access Token.

**Authorization Server**: This server receives requests from the Client for Access Tokens and issues them upon successful authentication and consent by the Resource Owner. The authorization server exposes two endpoints: the Authorization endpoint, which handles the interactive authentication and consent of the user, and the Token endpoint, which is involved in a machine to machine interaction.

**Resource Server**: A server that protects the user’s resources and receives access requests from the Client. It accepts and validates an Access Token from the Client and returns the appropriate resources to it.
