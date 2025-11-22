const express = require('express');
const dotenv = require('dotenv');
dotenv.config();
const mongoose = require('mongoose');
const path = require('path');
const { createServer } = require('http');
const { Server } = require('socket.io');
const exphbs = require('express-handlebars');
const cookieParser = require('cookie-parser');
const passport = require('./src/config/passport.config');

const productService = require('./src/services/product.service');

const productsRouter = require('./src/routes/products.router');
const cartsRouter = require('./src/routes/carts.router');
const viewsRouter = require('./src/routes/views.router');
const usersRouter = require('./src/routes/users.router');
const sessionsRouter = require('./src/routes/sessions.router');

const app = express();
const PORT = process.env.PORT || 8080;
const httpServer = createServer(app);
const io = new Server(httpServer);

mongoose.connect(process.env.MONGO_URI)
  .then(() => {
    console.log("Conectado a la base de datos de Mongo Atlas")
  })
  .catch(error => {
    console.error("La conexión no se ha podido realizar", error)
  });


// Middlewares
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, 'public')));
app.use(cookieParser());
app.use(passport.initialize());

// Handlebars
app.engine('handlebars', exphbs.engine());
app.set('view engine', 'handlebars');
app.set('views', path.join(__dirname, 'views'));

// Routers
app.use('/api/products', productsRouter);
app.use('/api/carts', cartsRouter);
app.use('/api/users', usersRouter);
app.use('/api/sessions', sessionsRouter);
app.use('/', viewsRouter);

// WebSocket
io.on('connection', async socket => {
  // Enviar lista actual
  socket.emit('products', await productService.getProducts());

  // Crear producto desde formulario
  socket.on('new-product', async data => {
    await productService.addProduct(data);
    const updatedProducts = await productService.getProducts();
    io.emit('products', updatedProducts);
  });

  // Eliminar producto
  socket.on('delete-product', async id => {
    await productService.deleteProduct(id);
    const updatedProducts = await productService.getProducts();
    io.emit('products', updatedProducts);
  });
});

httpServer.listen(PORT, () => {
  console.log(`Servidor corriendo en http://localhost:${PORT}`);
});
