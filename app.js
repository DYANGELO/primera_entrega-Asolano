const express = require('express');
const app = express();
const productosRouter = require('./routes/products');
const carritosRouter = require('./routes/carts');

app.use(express.json());

app.get('/', (req, res) => {
    res.send('Bienvenido a la API de Productos y Carritos!');
  });  

app.use('/api/products', productosRouter);
app.use('/api/carts', carritosRouter);

const PORT = 8080;
app.listen(PORT, () => {
  console.log(`Servidor corriendo en http://localhost:${PORT}`);
});
