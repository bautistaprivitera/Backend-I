const express = require('express');
const app = express();
const port = 8080;

app.use(express.json());

app.get('/', (req, res) => {
    res.send('Hola desde express');
});

app.listen(port, () => {
    console.log(`Servidor corriendo en http://localhost:${port}`);
})