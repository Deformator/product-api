var seneca = require('seneca');

var plugin = function(option){
    var seneca = this;

    seneca.add({ role: 'product', cmd: 'add' }, function (msg, respond) {
        this.make('product').data$(msg.data).save$(respond);
    });

    seneca.add({ role: 'product', cmd: 'get-all' }, function (msg, respond) {
        this.make('product').data$(msg.data).save$(respond);
    });

    seneca.add({ role: 'product', cmd: 'delete-all' }, function (msg, respond) {
        this.make('product').data$(msg.data).save$(respond);
    });
}

module.exports = plugin;