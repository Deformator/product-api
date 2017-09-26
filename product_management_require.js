var seneca = require('seneca')().use('product_storage')

seneca.add('role:api, cmd:add-product', function (args, done) {
    console.log("--> cmd:add-product");
    var product =  {
        id: args.id,
        name: args.name,
        price: args.price
    }
    console.log("--> product: " + JSON.stringify(product));
    seneca.act({role: 'product', cmd: 'add', data: product}, function (err, msg) {
        console.log(msg);
        done(err, msg);
    });
});

seneca.add('role:api, cmd:get-all-products', function (args, done) {
    console.log("--> cmd:get-all-products");
    seneca.act({ role: 'product', cmd: 'get-all' }, function (err, msg) {
        console.log(msg);
        done(err, msg);
    });
});

seneca.add('role:api, cmd:delete-all-products', function (args, done) {
    done(null, { cmd: "delete-all-products" });
});