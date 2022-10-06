const path = require("path");
const fs = require("fs");
const usersFilePath = path.join(__dirname, '../data/usersData.json');
const users = JSON.parse(fs.readFileSync(usersFilePath, "utf-8"));
const { validationResult} = require("express-validator")
const UserModel = require("../models/user.js")

const userController = {
    login:(req,res)=>{
        res.render("login")
    },
     //loguearse 
     login2: function (req, res) {
        res.redirect("/")
    },
    //base de la verificacion de usuario
    //Verificar si hay cookie y session
    verificacion:(req,res)=>{
        const users = JSON.parse(fs.readFileSync(usersFilePath, "utf-8"));
        let user = users.find((u) => u.user == req.params.user && u.pass == req.params.pass);
        if(!user.isEmpty()){
            //enviarle los datos de user
            res.redirect("/", user);
        }else{
            res.redirect("/login");
        }
    },

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
                birthday: req.body.birthday,
                address: req.body.address,
                password: req.body.password,
                pass_confirm: req.body.pass_confirm,
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

            res.redirect("/user");
            }


        }else{
            res.render('register', { 
                errors: errors.mapped(),
                old: req.body 
            })
        }
        console.log(req.body);
        

    },
    
    perfil:(req,res)=>{
        const users = JSON.parse(fs.readFileSync(usersFilePath, "utf-8"));
        let usuario = users.find((p) => p.id == req.params.id);
        res.render("perfil", { user: usuario })
        
    },

    users:(req,res)=>{
        res.render("users")
    },
    
};

module.exports = userController;