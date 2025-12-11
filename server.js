import express from 'express';
import handlebars from 'express-handlebars';
import viewsRouter from './routes/view.router.js';
import { Server } from 'socket.io';
import http from 'http';
let products = require('./products.js');

const app = express();
app.use(express.static('public'));
const port = 8080;

//Config de handlebars
app.engine('handlebars', handlebars.engine())
app.set('views', './views');
app.set('view engine','handlebars');

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

//Rutas
app.use('/', viewsRouter);

const server = http.createServer(app);
const io = new Server(server);

app.set('io', io);

//Conexion de sockets
io.on('connection', (socket) => {

  console.log('Un usuario se ha conectado');

  socket.emit('updateProducts', products); 

  //Agregar producto
  socket.on('newProduct', (data) => {
    const newProduct = {
      id: products.length + 1,
      title: data.title,
      price: Number(data.price)
    }

    products.push(newProduct); 

    io.emit('updateProducts', products);
  });

});

//Eliminar producto
socket.on('deleteProduct', (id) => {
    id = Number(id);
    products = products.filter(p => p.id !== id);
    io.emit('updateProducts', products);
  });

//Error por si no encuentra la ruta
app.use((req, res) => {
  res.status(404).json({ error: 'Ruta no encontrada' });
});

//URL del server
app.listen(port, () => {
  console.log(`Servidor corriendo en http://localhost:${port}`);
});
