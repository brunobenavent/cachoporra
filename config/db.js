import mongoose from "mongoose"

const db = async() =>{
    try {
        await mongoose.connect( process.env.MONGODB_CNN, {
            useNewUrlParser:true,
            useUnifiedTopology:true,
            //useCreateIndex:true,
            //useFindAndModify: false
        } )

        console.log('Base de datos online')

    } catch (error) {
        console.log(error)
        throw new Error('Error al inicializar la base de datos')
    }
}

export default db