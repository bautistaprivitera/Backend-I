const express = require('express');
const handlebars = require('express-handlebars');
const viewsRouter = require('./routes/view.router.js');

const app = express();
const port = 8080;

//Config de handlebars
app.engine('handlebars', handlebars.engine())
app.set('views', './views');
app.set('view engine','handlebars');

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

//Rutas
app.use('/', viewsRouter);

//Error por si no encuentra la ruta
app.use((req, res) => {
  res.status(404).json({ error: 'Ruta no encontrada' });
});

//URL del server
app.listen(port, () => {
  console.log(`Servidor corriendo en http://localhost:${port}`);
});
