import jwt from 'jsonwebtoken'

const generarId = ()=>  Math.random().toString(32).substring(2) + Date.now().toString(32)

const generarJWT = ( uid = '' )=>{
    return new Promise((resolve, reject) =>{
         const payload = { uid }

         jwt.sign(payload, process.env.SECRETORPRIVATEKEY,{
            expiresIn: '1d'
         },  (err, token) =>{
            if(err){
                console.log(err)
                reject('No se pudo generar el JWT')
            }else{
                resolve(token)
            }
         })
    })
}
export{
    generarId,
    generarJWT
}