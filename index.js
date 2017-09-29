var SERVER_NAME = 'product-api';
var PORT = 8000;
var HOST = '127.0.0.1';

//request counters
var getCounter = 0;
var postCounter = 0;

var restify = require('restify')

  // Get a persistence engine for the products
  , productsSave = require('save')('products')
  
    // Create the restify server
    , server = restify.createServer({ name: SERVER_NAME})

    server.listen(PORT, HOST, function () {
        console.log('Server %s listening at %s', server.name, server.url)
        console.log('Resources:')
        console.log(' /products')
        console.log(' /products/:id')  
      })

      server
      // Allow the use of POST
      .use(restify.fullResponse())
    
      // Maps req.body to req.params so there is no switching between them
      .use(restify.bodyParser())
    
    // Get all products in the system
    server.get('/products', function (req, res, next) {
    
      // Find every entity within the given collection
      productsSave.find({}, function (error, products) {
    
        // Return all of the products in the system
        res.send(products)
        getCounter++;
        console.log('Processed request count --> sendGet: ' +getCounter + ', sendPost: ' + postCounter)
      })
    })

    // Get a single product by their products id
server.get('/products/:id', function (req, res, next) {
    
      // Find a single product by their id within save
      productsSave.findOne({ _id: req.params.id }, function (error, product) {
    
        // If there are any errors, pass them to next in the correct format
        if (error) return next(new restify.InvalidArgumentError(JSON.stringify(error.errors)))
    
        if (product) {
          // Send the product if no issues
          res.send(product)
          getCounter++;
          console.log('Processed request count --> sendGet: ' +getCounter + ', sendPost: ' + postCounter)
        } else {
          // Send 404 header if the product doesn't exist
          res.send(404)
        }
      })
    })

    // Create a new product
server.post('/products', function (req, res, next) {
    
      // Make sure name is defined
      if (req.params.name === undefined ) {
        // If there are any errors, pass them to next in the correct format
        return next(new restify.InvalidArgumentError('name must be supplied'))
      }
      if (req.params.price === undefined ) {
        // If there are any errors, pass them to next in the correct format
        return next(new restify.InvalidArgumentError('price must be supplied'))
      }
      var newProduct = {
            name: req.params.name, 
            price: req.params.price
        }

          // Create the product using the persistence engine
          productsSave.create(newProduct, function (error, product) {
    
        // If there are any errors, pass them to next in the correct format
        if (error) return next(new restify.InvalidArgumentError(JSON.stringify(error.errors)))
    
        // Send the product if no issues
        res.send(201, product)
        postCounter++;
        console.log('Processed request count --> sendGet: ' + getCounter + ', sendPost: ' + postCounter)
      })
    })

    // Delete product with the given id
server.del('/products/:id', function (req, res, next) {
    
      // Delete the product with the persistence engine
      productsSave.delete(req.params.id, function (error, product) {
    
        // If there are any errors, pass them to next in the correct format
        if (error) return next(new restify.InvalidArgumentError(JSON.stringify(error.errors)))
    
        // Send a 200 OK response
        res.send()
      })
    })

        // Delete all products
server.del('/products', function (req, res, next) {
    
      // Delete the product with the persistence engine
      productsSave.deleteMany({},function (error, product) {
    
        // If there are any errors, pass them to next in the correct format
        if (error) return next(new restify.InvalidArgumentError(JSON.stringify(error.errors)))
    
        // Send a 200 OK response
        res.send(204)
      })
    })