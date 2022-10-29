---
title: CORS and withCredentials
date: 2022-10-29 18:21:26
cover: /images/cors.webp
thumbnail: /images/cors.webp
toc: true
categories:
- tech
tags:
- tech
- cors
- credentials
- withCredentials
---

## Ref
1. [CORS tutorial](https://auth0.com/blog/cors-tutorial-a-guide-to-cross-origin-resource-sharing/)
2. [关于CORS和withCredentials](https://juejin.cn/post/6844903938936799245)

## Origin
- Two URLs have the same origin if protocol, port and host are the same.

## SOP
- SOP stands for Same Origin Policy.
- SOP restricts how a document or script by one origin to access resource from another origin.
- For example, a malicious website may try to read data from a webmail service which the user is signed into or the user's company intranet.
- SOP is implementated by browser.

## CORS
- CORS stands for Cross-Origin Resource Sharing.
- CORS enables interaction between different origins.
- To enable CORS, server must inlucde a few headers to tell browser that it allows requests from the requesting origin.

For example, here's a request:

```
GET /sensitive-victim-data HTTP/1.1
Host: vulnerable-website.com
Origin: https://malicious-website.com
Cookie: sessionid=...
```

And server responds with:

```
HTTP/1.1 200 OK
Access-Control-Allow-Origin: https://malicious-website.com
...
```

With `Access-Control-Allow-Origin` set to the requesting origin or `*`, the browser will readily accept consequent responses.

However, This server granted access to a malicious request. To prevent such things from happening, a white-list should be implemented to filter the origins of the requests.


## CORS request types

### Simple request

- `GET`/`POST`/`HEAD`
- [CORS safe-listed header](https://fetch.spec.whatwg.org/#cors-safelisted-request-header)
- Content-Type: `application/x-www-form-urlencoded`/`multipart/form-data`/`text/plain`
- No event listeners registered on any `XMLHttpRequestUpload` object
- No `ReadableStream` object is used in the request

### Preflight request

- If not simple request, then it's preflight request.
- Preflight request send an `OPTIONS` request to server to determine if server understands the CORS protocol.
- An `OPTIONS` carries the following headers:
  - `Access-Control-Request-Method`: The intended method of the request (e.g., GET or POST)
  - `Access-Control-Request-Headers`: An indication of the custom headers that will be sent with the request
  - `Origin`: The usual origin header that contains the script's current origin

```
curl -i -X OPTIONS localhost:3001/api/ping \
-H 'Access-Control-Request-Method: GET' \
-H 'Access-Control-Request-Headers: Content-Type, Accept' \
-H 'Origin: http://localhost:3000'
```

- "I would like to make a GET request with the Content-Type and Accept headers from http://localhost:3000 - is that possible?".

The server will include some `Access-Control-*` headers within the response to indicate whether the request that follows will be allowed or not. These include:

- `Access-Control-Allow-Origin`s: The origin that is allowed to make the request, or * if a request can be made from any origin
- `Access-Control-Allow-Methods`: A comma-separated list of HTTP methods that are allowed
- `Access-Control-Allow-Headers`: A comma-separated list of the custom headers that are allowed to be sent
- `Access-Control-Max-Age`: The maximum duration that the response to the preflight request can be cached before another call is made

The response would then be examined by the browser to decide whether to continue with the request or to abandon it.

```
HTTP/1.1 204 No Content
Access-Control-Allow-Origin: *
Access-Control-Allow-Methods: GET,HEAD,PUT,PATCH,POST,DELETE
Vary: Access-Control-Request-Headers
Access-Control-Allow-Headers: Content-Type, Accept
Content-Length: 0
Date: Fri, 05 Apr 2019 11:41:08 GMT
Connection: keep-alive
```

## withCredentials

- The `XMLHttpRequest.withCredentials` property is a `boolean` value that indicates whether or not **cross-site** Access-Control requests should be made using credentials such as **cookies, authorization headers or TLS client certificates**. 
- Setting withCredentials has no effect on same-origin requests.

- In addition, this flag is also used to indicate when cookies are to be ignored in the response. The default is false.
- `XMLHttpRequest` respons  es from a different domain cannot set cookie values for their own domain unless `withCredentials` is set to true before making the request. 
- The third-party cookies obtained by setting `withCredentials` to true will still honor same-origin policy and hence can not be accessed by the requesting script through `document.cookie` or from response headers.

