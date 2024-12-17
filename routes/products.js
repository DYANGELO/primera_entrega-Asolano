const express = require('express');
const router = express.Router();

let productos = [
  { id: 1, title: 'Producto 1', description: 'Descripción 1', code: 'P001', price: 100, status: true, stock: 50, category: 'Electrónica', thumbnails: ['img1.jpg', 'img2.jpg'] },
  { id: 2, title: 'Producto 2', description: 'Descripción 2', code: 'P002', price: 200, status: true, stock: 30, category: 'Hogar', thumbnails: ['img3.jpg'] },
  { id: 3, title: 'Producto 3', description: 'Descripción 3', code: 'P003', price: 300, status: true, stock: 20, category: 'Deportes', thumbnails: ['img4.jpg'] }
];


router.get('/', (req, res) => {
  let limit = parseInt(req.query.limit) || productos.length;
  let resultado = productos.slice(0, limit);
  res.json(resultado);
});


router.get('/:pid', (req, res) => {
  const id = parseInt(req.params.pid);
  const producto = productos.find(p => p.id === id);
  if (!producto) {
    return res.status(404).json({ error: 'Producto no encontrado' });
  }
  res.json(producto);
});


router.post('/', (req, res) => {
  const { title, description, code, price, stock, category, thumbnails = [] } = req.body;


  if (!title || !description || !code || !price || !stock || !category) {
    return res.status(400).json({ error: 'Faltan campos obligatorios' });
  }


  const nuevoId = productos.length > 0 ? productos[productos.length - 1].id + 1 : 1;


  const nuevoProducto = {
    id: nuevoId,
    title,
    description,
    code,
    price,
    status: true,  
    stock,
    category,
    thumbnails
  };


  productos.push(nuevoProducto);


  res.status(201).json(nuevoProducto);
});


router.put('/:pid', (req, res) => {
  const id = parseInt(req.params.pid);
  const productoIndex = productos.findIndex(p => p.id === id);
  
  if (productoIndex === -1) {
    return res.status(404).json({ error: 'Producto no encontrado' });
  }

  const { title, description, code, price, stock, category, thumbnails = [] } = req.body;

  if (!title || !description || !code || !price || !stock || !category) {
    return res.status(400).json({ error: 'Faltan campos obligatorios' });
  }

 
  productos[productoIndex] = {
    ...productos[productoIndex], 
    title,
    description,
    code,
    price,
    stock,
    category,
    thumbnails
  };

  res.json(productos[productoIndex]);
});


router.delete('/:pid', (req, res) => {
  const id = parseInt(req.params.pid);
  const productoIndex = productos.findIndex(p => p.id === id);
  
  if (productoIndex === -1) {
    return res.status(404).json({ error: 'Producto no encontrado' });
  }


  productos.splice(productoIndex, 1);
  res.status(200).json({ message: 'Producto eliminado' });
});

module.exports = router;



