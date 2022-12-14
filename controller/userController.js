const path = require("path");
const fs = require("fs");
const usersFilePath = path.join(__dirname, '../data/usersData.json');
const users = JSON.parse(fs.readFileSync(usersFilePath, "utf-8"));
const { validationResult} = require("express-validator")
const UserModel = require("../models/user.js")
const bcrypt = require('bcryptjs');

const userController = {

    register:(req,res)=>{
        res.render("register")
    },

    register2: (req, res) => {

        let errors = validationResult(req)
        if (errors.isEmpty()) {
            const users = JSON.parse(fs.readFileSync(usersFilePath, "utf-8"));
        
            const userNew = {
                id: Date.now(),
                name: req.body.name,
                user: req.body.user,
                email: req.body.email,
                birthday: req.body.birth_date,
                address: req.body.address,
                password: bcrypt.hashSync(req.body.password, 10),
                img: "img_user_default.png"
            };


            if (req.file) {
                userNew.img = req.file.filename;
            }

            let usuarioDB = UserModel.findByField("email", req.body.email)
            //el usuario esta en la base de datos?
             if (usuarioDB) {
                res.render('register', {
                    errors: {
                        email:{
                            msg: "este email ya esta registrado"
                        }
                    },
                    old: req.body
                })
            }else{
                users.push(userNew);

            const data = JSON.stringify(users, null, ' ');
            fs.writeFileSync(usersFilePath, data);

            res.redirect("perfil");
            }


        }else{
            res.render('register', { 
                errors: errors.mapped(),
                old: req.body 
            })
        }
        console.log(req.body);
        

    },

        //Mostrar formulario de login//
login: (req, res) => {
    res.render("login")
},

//Loguearse//
login2: function (req, res) {
    let errors = validationResult(req)
    if (errors.isEmpty()) {

        let userToLog = UserModel.findByField("email", req.body.email)
        if (userToLog) {
            let isOkThePass = bcrypt.compareSync(req.body.password, userToLog.password)
            if (isOkThePass) {
                delete userToLog.password;
                req.session.userLogged = userToLog;
                if (req.body.recordarme) {
                    res.cookie('recordarEmail', req.body.email, { maxAge: 90000 })
                }

                return res.redirect("perfil");
            } else {
                return res.render("login", {
                    errors: {
                        email: {
                            msg: "Las credenciales son inv??lidas"
                        }
                    }
                })
            }

        } else {
            res.render("login", {
                errors: {
                    email: {
                        msg: "Este email no est?? registrado"
                    }
                }
            })
        }


    } else {
        res.render('login', {
            errors: errors.mapped(),
            old: req.body
        })
    }

},
    perfil: (req, res) => {
        return res.render("perfil", {
            user: req.session.userLogged
        });

    },
   

    logout: (req, res) => {
        res.clearCookie('recordarEmail');
        req.session.destroy();
        return res.redirect('/');
    },

    
};

module.exports = userController;