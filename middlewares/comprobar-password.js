import { check } from "express-validator"

const comprobarPassword = (req, res)=>{
   return check('repetir_password').equals(req.body.password)
    
}


export {
    comprobarPassword
}