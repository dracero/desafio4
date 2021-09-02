import express, { Router } from 'express';
import cors from "cors";

// creo una app de tipo express
const app = express();
const router = new Router();
app.use(cors());
app.use(express.json());
app.use('/api/productos', router);
app.use(express.urlencoded({ extended: false }));

//Pongo el puerto que se pide en el enunciado
const port = 8080
const server = app.listen(process.env.PORT || port, () => {
  console.log(`servidor escuchando en http://localhost:${port}`)
})

//salida enb caso de error
server.on('error', error => {
  console.log('error en el servidor:', error)
})

//Manejo de errores con app express.
app.use((error, req, res, next) => {
    res.status(400).json({ error: error.message })
  })

export default router;