const express = require('express');
const router = express.Router();

let carritos = [
  { id: 1, products: [{ product: 1, quantity: 2 }, { product: 2, quantity: 1 }] },
  { id: 2, products: [{ product: 3, quantity: 1 }] }
];


let productos = [
  { id: 1, title: 'Producto 1', description: 'Descripción 1', code: 'P001', price: 100, status: true, stock: 50, category: 'Electrónica', thumbnails: ['img1.jpg', 'img2.jpg'] },
  { id: 2, title: 'Producto 2', description: 'Descripción 2', code: 'P002', price: 200, status: true, stock: 30, category: 'Hogar', thumbnails: ['img3.jpg'] },
  { id: 3, title: 'Producto 3', description: 'Descripción 3', code: 'P003', price: 300, status: true, stock: 20, category: 'Deportes', thumbnails: ['img4.jpg'] }
];

router.get('/:cid', (req, res) => {
  const cid = parseInt(req.params.cid);
  const carrito = carritos.find(c => c.id === cid);

  if (!carrito) {
    return res.status(404).json({ error: 'Carrito no encontrado' });
  }

  const productosEnCarrito = carrito.products.map(item => {
    const producto = productos.find(p => p.id === item.product);
    return { ...producto, quantity: item.quantity };
  });

  res.json({ id: carrito.id, products: productosEnCarrito });
});

router.post('/:cid/product/:pid', (req, res) => {
  const cid = parseInt(req.params.cid);
  const pid = parseInt(req.params.pid);

  const carrito = carritos.find(c => c.id === cid);
  const producto = productos.find(p => p.id === pid);

  if (!carrito) {
    return res.status(404).json({ error: 'Carrito no encontrado' });
  }

  if (!producto) {
    return res.status(404).json({ error: 'Producto no encontrado' });
  }

  const productoEnCarrito = carrito.products.find(item => item.product === pid);

  if (productoEnCarrito) {
    productoEnCarrito.quantity += 1;
  } else {
    carrito.products.push({ product: pid, quantity: 1 });
  }

  res.status(201).json({ id: carrito.id, products: carrito.products });
});

module.exports = router;
