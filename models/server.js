import express from 'express'
import cors from 'cors'

import scrapRoutes from '../routes/scrapRoutes.js'
import usuarioRoutes from '../routes/usuarioRoutes.js'



class Server{
    constructor(){
        this.app = express()
        this.port = process.env.PORT;

        this.usuariosPath = '/usuarios'
        this.resultadosPath = '/api/resultados'

        //Conectar a base de datos
        

        //Agregamos las configuraciones
        this.config()

        //Middlewares
        this.middlewares();
        
        //Rutas de mi app
        this.routes();
    }
    async conectarDB(){
        await dbConnection()
    }
    
    middlewares(){
        //CORS
        this.app.use(cors());

        //Lectura y parseo del body
        this.app.use(express.json())

        //Directorio público
        this.app.use(express.static('public'))
    }
    config(){
        // Habilitar Pug
        this.app.set('view engine', 'pug')
        this.app.set('views', './views')

    }

    routes(){
        this.app.use(this.usuariosPath, usuarioRoutes)
        this.app.use(this.resultadosPath, scrapRoutes)
    }


    listen(){
        this.app.listen(this.port, () => {
            console.log(`Servidor corriendo en el puerto ${this.port}`)
        })
    }

}

export default Server;



