var express = require('express');
var app = express();
var port = process.env.port || 8020;

app.use(express.static(__dirname));
app.get('/', function (req, res) {
    res.sendfile('./index.html');
});

app.listen(port);