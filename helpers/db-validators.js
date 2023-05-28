import Usuario from '../models/Usuario.js'

// const esRolValido = async(rol ='') =>{
//     const existeRol = await Role.findOne({rol})
//     if(!existeRol){
//         throw new Error (`El rol ${rol} no está registrado en la base de datos`)
//     }
// }
//verificar si el correo existe
const emailExiste = async (email = '')=>{
    const existeEmail =  await Usuario.findOne({email})
    if(existeEmail){
        throw new Error (`El email ${email} ya existe en la base de datos`)
    }
} 
//verificar si el usuario existe
const existeUsuarioPorId = async (id)=>{
    const existeUsuario =  await Usuario.findById(id)
    if(!existeUsuario){
        throw new Error (`El usuario ${id} no existe en la base de datos`)
    }
}


//verificar si la categoria existe
// const existeCategoriaPorId = async (id)=>{
//     const existeCategoria =  await Categoria.findById(id)
//     if(!existeCategoria){
//         throw new Error (`La categoría ${id} no existe en la base de datos`)
//     }
// } 
//verificar si el producto existe
// const existeProductoPorId = async (id)=>{
//     const existeproducto =  await Producto.findById(id)
//     if(!existeproducto){
//         throw new Error (`El producto ${id} no existe en la base de datos`)
//     }
// }

// Validar colecciones permitidas
// const coleccionesPermitidas = ( coleccion = '', colecciones = [] ) => {

//     const incluida = colecciones.includes( coleccion )

//     if(!incluida) {
//        throw new Error(`La colección ${coleccion} no es permitida, ${colecciones}`) 
//     }
//     return true

// }


export {
    // esRolValido,
    emailExiste,
    existeUsuarioPorId,
    // existeCategoriaPorId,
    // existeProductoPorId,
    // coleccionesPermitidas
}