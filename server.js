import express from 'express';
import handlebars from 'express-handlebars';
import productsRouter from './routes/products.routes.js';
import { Server } from 'socket.io';
import http from 'http';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import Product from './model/products.model.js';
import cartRouter from './routes/cart.routes.js';
import viewsRouter from './routes/view.routes.js';

const app = express();
app.use(express.static('public'));
app.use('/js', express.static('js'));
const port = 8080;

dotenv.config();

const connectMongo = async () => {
  try { 
    await mongoose.connect(process.env.MONGO_URL);
    console.log('Conectado a la base de datos');
  } catch (error) {
    console.error('Error al conectar a la base de datos', error);
  }
}

await connectMongo();


//Config de handlebars
app.engine('handlebars', handlebars.engine())
app.set('views', './views');
app.set('view engine', 'handlebars');

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

//Rutas
app.use('/', viewsRouter);
app.use('/api/products', productsRouter);
app.use('/api/carts', cartRouter);
app.get("/api/products/debug/count", async (req, res) => {
  try {
    const count = await Product.countDocuments();
    res.json({ count });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});


const server = http.createServer(app);
const io = new Server(server);

app.set('io', io);

//Conexion de sockets
io.on('connection', async (socket) => {

  console.log('Un usuario se ha conectado');

  socket.emit('updateProducts', await Product.find().lean());

  //Agregar producto
  socket.on('newProduct', async (data) => {
    try {
      await Product.create ( {
        title: data.title,
        price: Number(data.price),
        stock: Number(data.stock ?? 0)
    })

    io.emit('updateProducts', await Product.find().lean());
    } catch (error) {
      console.error('Error creando producto');
      socket.emit('No se pudo crear el producto');
    }
  });

  //Eliminar producto
  socket.on('deleteProduct', async (id) => {
    try{
      await Product.findByIdAndDelete(id);
      io.emit('updateProducts', await Product.find().lean());
    }catch (error) {
      console.error('Error eliminando producto');
      socket.emit('No se pudo eliminar el producto');
    }
  });

});

//Error por si no encuentra la ruta
app.use((req, res) => {
  res.status(404).json({ error: 'Ruta no encontrada' });
});

//URL del server
server.listen(port, () => {
  console.log(`Servidor corriendo en http://localhost:${port}`);
});
