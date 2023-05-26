
const formularioLogin = async(req, res) => {
  res.render('auth/login', {
    pagina: 'Inicia sesión'
  })
}

const formularioRegistro = async(req, res) => {
  res.render('auth/registro', {
    pagina: 'Crea tu cuenta'
  })
}



export {
  formularioLogin,
  formularioRegistro
}
