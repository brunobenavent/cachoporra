import { check, validationResult } from "express-validator"
import Usuario from "../models/Usuario.js"
import bcryptjs from 'bcrypt'
import { generarId, generarJWT } from "../helpers/tokens.js"
import { emailRegistro, emailOlvidePassword } from "../helpers/emails.js"


const formularioLogin = (req, res) => {
  res.render('auth/login', {
    pagina: 'Iniciar sesión'
  })
}
const autenticar = async(req, res) => {
  const {email, password} = req.body
  // Validación
  await check('email').isEmail().withMessage('El email es obligatorio').run(req)
  await check('password').not().isEmpty().withMessage('El Password es obligatorio').run(req)

  let resultado = validationResult(req)
  // Verificar que el resultado esté vacío
  if(!resultado.isEmpty()){
    // Errores
    return res.render('auth/login', {
      pagina: 'Iniciar Sesión',
      errores: resultado.array()
    })
  }
  const usuario = await Usuario.findOne({email})


  if(!usuario){
    return res.render('auth/login', {
      pagina: 'Iniciar Sesión',
      errores: [{msg: 'El Usuario no existe'}]
    })
  }
  if(!usuario.confirmado){
    return res.render('auth/login', {
      pagina: 'Iniciar Sesión',
      errores: [{msg: 'Tu cuenta no ha sido confirmada'}]
    })
  }
  // Revisar Password
  const validPassword = bcryptjs.compareSync(password, usuario.password)
  if (!validPassword){
    return res.render('auth/login', {
      pagina: 'Iniciar Sesión',
      errores: [{msg: 'El Password es erroneo'}]
    })
  }
  // Autenticar usuario
  const token = await generarJWT(usuario.uid)
  console.log(token)

  // Almacenar en un cookie

  return res.cookie('_token', token, {
    httpOnly: true,

  }).redirect('/partidos')

}

const formularioRegistro = (req, res) => {
  res.render('auth/registro', {
    pagina: 'Crea tu cuenta',
  })
}
const registrar = async(req, res) => {

  const {nombre, email, password} = req.body
  // Validación
  await check('nombre').notEmpty().withMessage('El nombre es obligatorio').run(req)
  await check('email').isEmail().withMessage('El email no es válido').run(req)
  await check('password').isLength({min:6}).withMessage('El password es obligatorio y contener almenos 6 carácteres').run(req)
  await check('repetir_password', 'Los passwords no coinciden').equals(req.body.password).run(req)

  let resultado = validationResult(req)
  // Verificar que el resultado esté vacío
  if(!resultado.isEmpty()){
    // Errores
    return res.render('auth/registro', {
      pagina: 'Crear Cuenta',
      errores: resultado.array(),
      usuario: {
        nombre,
        email
      }
    })
  }

  // Verificar que usuario no esté duplicado
  const existeUsuario = await Usuario.findOne({email})
  if(existeUsuario){
    return res.render('auth/registro', {
      pagina: 'Crear Cuenta',
      errores: [{
        msg: "El usuario ya existe"
      }],
      usuario: {
        nombre,
        email
      }
    })
  }
  const usuario = new Usuario({nombre, email, password})

  // hasear la password
  const salt = bcryptjs.genSaltSync();
  usuario.password = bcryptjs.hashSync(password, salt)
  usuario.token = generarId()

  // Guardar en DB
  await usuario.save()

  //Envía email de confirmación
  emailRegistro({
    nombre: usuario.nombre,
    email: usuario.email,
    token: usuario.token
  })

  // Mostrar mensaje de confirmación
  res.render('templates/mensaje', {
    pagina: 'Cuenta Creada Correctamente',
    mensaje: 'Hemos enviado un email de confirmación, presiona en el enlace'  
  })
}

const confirmar = async(req, res) => {
  const {token} = req.params
  console.log(token)

// Verificar si el token es válido
const usuario = await Usuario.findOne({token})
if (!usuario){
  return res.render('auth/confirmar-cuenta', {
    pagina: 'Error al confirmar tu cuenta',
    mensaje: 'Hubo un error al confirmar tu cuenta, intenta de nuevo',
    error: true
  })
}

// Confirmar la cuenta
  usuario.confirmado = true
  usuario.token = null
  await usuario.save()
  res.render('auth/confirmar-cuenta', {
    pagina: 'Cuenta Confirmada',
    mensaje: 'La cuenta se confirmó correctamente'
  })
}

const formularioOlvidePassword = (req, res) => {
  res.render('auth/olvide-password', {
    pagina: 'Recupera tu acceso a cachoporra'
  })
}

const resetPassword = async(req, res) => {

  const {email} = req.body

  // Validación
  await check('email').isEmail().withMessage('El email no es válido').run(req)

  let resultado = validationResult(req)
  // Verificar que el resultado esté vacío
  if(!resultado.isEmpty()){
    // Errores
    return res.render('auth/olvide-password', {
      pagina: 'Recupera tu acceso a cachoporra',
      errores: resultado.array(),
    })
  }
  // Buscar al usuario
  const usuario = await Usuario.findOne({email})
  if (!usuario){
    return res.render('auth/olvide-password', {
      pagina: 'Recupera tu acceso a cachoporra',
      errores: [{msg: "El email no pertenece a ningún usuario" }]
    })
  }

  // Generar un token y enviar el email
  usuario.token =  generarId()
  await usuario.save()

  // Enviar email
  emailOlvidePassword({
    email: usuario.email,
    nombre: usuario.nombre,
    token: usuario.token
  })
  // Renderizar un mensaje
   // Mostrar mensaje de confirmación
   res.render('templates/mensaje', {
    pagina: 'Reestablece tu password',
    mensaje: 'Hemos enviado un email con las instrucciones'  
  })
}

const comprobarToken = async(req, res) => {
  const { token } = req.params

  const usuario = await Usuario.findOne({token})
  if(!usuario){
    return res.render('auth/confirmar-cuenta', {
      pagina: 'Reestablece tu password',
      mensaje: 'Hubo un error al validar tu información',
      error: true
    })
  }

  //Mostrar formulario para modificar el password

  res.render('auth/reset-password', {
    página: 'Reestablece tu Password',

  })
}

const nuevoPassword = async(req, res) => {
  // Validar el Password
  await check('password').isLength({min:6}).withMessage('El password es obligatorio y contener almenos 6 carácteres').run(req)
  let resultado = validationResult(req)
  // Verificar que el resultado esté vacío
  if(!resultado.isEmpty()){
    // Errores
    return res.render('auth/reset-password', {
      pagina: 'Reestablece tu Password',
      errores: resultado.array()
    })
  }
  // Identificar quien hace el cambio
  const { token } = req.params
  const { password } = req.body
  const usuario = await Usuario.findOne({token})


  // hasear la password
  const salt = bcryptjs.genSaltSync();
  usuario.password = bcryptjs.hashSync(password, salt)
  usuario.token = null

  await usuario.save()
  res.render('auth/confirmar-cuenta', {
    pagina: 'Password Reestablecido',
    mensaje: 'El Password se guardó correctamente'
  })
}

export {
  formularioLogin,
  autenticar,
  formularioRegistro,
  registrar,
  confirmar,
  formularioOlvidePassword,
  resetPassword,
  comprobarToken,
  nuevoPassword
}
