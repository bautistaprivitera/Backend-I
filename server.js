const express = require('express');
const productsRouter = require('./routes/products');
const cartsRouter = require('./routes/carts');

const app = express();
const port = 8080;

app.use(express.json());

app.get('/', (req, res) => {
  res.send('Hola desde express');
});

app.use('/api/products', productsRouter);
app.use('/api/carts', cartsRouter);

app.use((req, res) => {
  res.status(404).json({ error: 'Ruta no encontrada' });
});

app.listen(port, () => {
  console.log(`Servidor corriendo en http://localhost:${port}`);
});
