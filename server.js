var express = require('express'),
app = express(),
// history = require('connect-history-api-fallback'), // 如果使用HTML5 History，则需要此插件
port = process.env.PORT || 8081

// app.use(history()) // 如果使用HTML5 History，则需要此插件
app.use(express.static('public'))

app.listen(port)

console.log('API server started on: ' + port)