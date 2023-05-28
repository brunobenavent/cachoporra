import express from 'express'
import dotenv from 'dotenv'
// import cors from 'cors'

import scrapRoutes from './routes/scrapRoutes.js'
import usuarioRoutes from './routes/usuarioRoutes.js'
import db from './config/db.js'



// Configurar dotenv
dotenv.config()

// Crear la app
const app = express()

// Conexión a la Base de Datos
await db()

// Habilitar pub
app.set('view engine', 'pug')
app.set('views', './views')


// ***************MIDDLEWARES******************
// Carpeta pública
app.use(express.static('public'))

// CORS
// app.use(cors());

// Lectura y parseo del body
app.use(express.json())

// Habilitar lectura de datos de formularios
app.use(express.urlencoded({extended:true}))

// Routing
app.use('/auth', usuarioRoutes)
app.use('/api/resultados', scrapRoutes)

// Definir un puerto y arrancar el proyecto
const port =  process.env.PORT || 8080;
app.listen(port, () => {
    console.log(`Servidor corriendo en el puerto ${port}`)
})