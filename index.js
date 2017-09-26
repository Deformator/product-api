var http = require('http');
var plugin = require('product_storage');

var host = '127.0.0.1';
var port = 3000;


seneca.use(plugin)

seneca.act('role:web', {
    use: {
        prefix: '/abservice',
        pin: { role: 'api', cmd: '*' },
        map: {
            'add-product': { POST: true },
            'get-all-products': { GET: true },
            'get-all-products': { POST: true, }
        }
    }
})

var express = require('express');
var app = express();
app.use(require("body-parser").json())
app.use(seneca.export('web'));



app.listen(port)