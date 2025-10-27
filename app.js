const fs = require('fs').promises;

fs.writeFile('archivo.txt', 'Este es mi archivo de texto')
    .then(() => console.log('Archivo creado'))
    .catch(error => console.error(error));

fs.readFile('archivo.txt', 'utf-8')
    .then(() => console.log('Archivo leído'))
    .catch((error) => console.error("Error al leer el archivo", error));

