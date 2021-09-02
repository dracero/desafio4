import productos from './api/productos.js';
import rutas from "./rutas.js";

//leo todos los productos y los muestro
rutas.get('/', (req, res) => {
  const prods = productos.getAll()
  if (prods.length === 0) {
    throw new Error('No hay productos cargados')
  }
  res.json(prods)
})

//leo un id particular
rutas.get('/:id', (req, res) => {
  const { id } = req.params
  const prods = productos.getById(id)
  if (prods === undefined) throw new Error('producto no encontrado')
  res.json(prods)
})

//ingreso los productos, los persisto en memoria
rutas.post('/', (req, res) => {
  console.log(req.query);
  const producto = productos.save(
    req.query.title,
    req.query.price,
    req.query.thumbnail
  )
  res.status(201).json(producto)
})

//modifica un valor segun el id
rutas.put('/:id', (req, res) => {
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
rutas.delete('/:id', (req, res) => {
  const { id } = req.params
  const prods = productos.delById(id)
  if (prods === undefined) throw new Error('producto no encontrado')
  res.json(prods)
})