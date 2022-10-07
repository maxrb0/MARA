function guestMiddleware(req, res, next) {
    //Evitar entrar al formulario de registro y login si ya está loggeado
    if (req.session.userLogged) {
        return res.redirect("/user/perfil")
    }else{
        return res.redirect("/user/login")
    }
    // next()
}

module.exports = guestMiddleware