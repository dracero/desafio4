import express from 'express';
import productos from './api/productos.js';

// creo una app de tipo express
const app = express()
app.use(express.json())
app.use(express.urlencoded({ extended: false }))

//leo todos los productos y los muestro
app.get('/api/productos', (req, res) => {
  const prods = productos.getAll()
  if (prods.length === 0) {
    throw new Error('No hay productos cargados')
  }
  res.json(prods)
})

//leo un id particular
app.get('/api/productos/:id', (req, res) => {
  const { id } = req.params
  const prods = productos.getById(id)
  if (prods === undefined) throw new Error('producto no encontrado')
  res.json(prods)
})

//ingreso los productos, los persisto en memoria
app.post('/api/productos', (req, res) => {
  console.log(req.query);
  const producto = productos.save(
    req.query.title,
    req.query.price,
    req.query.thumbnail
  )
  res.status(201).json(producto)
})

//modifica un valor segun el id
app.put('/api/productos/:id', (req, res) => {
  console.log(req.query);
  const { id } = req.params
  const producto = productos.update(
    id,
    req.query.title,
    req.query.price,
    req.query.thumbnail
  )
  if (producto === undefined) throw new Error('producto no encontrado')
  res.json(producto)
})

//borro el producto indicado
app.delete('/api/productos/:id', (req, res) => {
  const { id } = req.params
  const prods = productos.delById(id)
  if (prods === undefined) throw new Error('producto no encontrado')
  res.json(prods)
})

//Manejo de errores
app.use((error, req, res, next) => {
  res.status(400).json({ error: error.message })
})

//Pongo el puerto que se pide en el enunciado
const puerto = 8080
const server = app.listen(puerto, () => {
  console.log(`servidor escuchando en http://localhost:${puerto}`)
})

//salida enb caso de error
server.on('error', error => {
  console.log('error en el servidor:', error)
})