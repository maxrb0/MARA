const express = require('express');
const router = express.Router();
const multer = require("multer");
const path = require("path");
const { body } = require("express-validator");


const userController = require ("../controller/userController");



let storage = multer.diskStorage({
    //ESTO ES DONDE SE VA A GUARDAR LA IMAGEN NUEVA AUTOMATICAMENTE
    destination: function (req, file, cb) {
        cb(null, "public/design/images-users");
    },

    //CONFIGURAMOS EL NOMBRE DE COMO SE VA A GUARDAR
    filename: function (req, file, cb) {
        console.log({ file });

        // cb(null, file.fieldname + "-" + Date.now());
        cb(null, Date.now() + "" + file.originalname);
    },
});

const upload = multer({ storage });






//VALIDACIONES REGISTRO
const validaciones = [
    body("name").notEmpty().withMessage("debes agregar un nombre"),
    body("user").notEmpty().withMessage("debes agregar un nombre de usuario"),
    body("email").isEmail().withMessage("debes ingresar un email"),
    body("address").notEmpty().withMessage("debes agregar una dirección"),
    body("password").notEmpty().withMessage("debes agregar una contraseña"),
    body("password").isLength({min:8}).withMessage("la contraseña debe tener mínimo 8 caracteres"),
    body("password").matches(/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])[a-zA-Z\d@$.!%*#?&]/,).withMessage("la contraseña debe tener un numero, una mayúscula y una minúscula "),
    body("pass_confirm").custom(async (pass_confirm, {req}) => {
        const password = req.body.password
        if(password !== pass_confirm){
          throw new Error("Las contraseñas deben ser las mismas")
        }
    })
]


//Validaciones Login
const validacionesLog = [
    body("email").isEmail().withMessage("Debes ingresar un email")
]




const guestMiddlware = require("../middlewares/guest-middlewares");
const authMiddlware = require("../middlewares/auth-middleware");


// router.get("/",userController.perfil);

//Ingresar al login//
router.get("/login", guestMiddlware, userController.login);
router.post("/login", validacionesLog, userController.login2);

//Ingresar al registro//
router.get("/register", guestMiddlware, userController.register);
//Procesar el registro//
router.post("/register", upload.single("img"), validaciones, userController.register2);


//Mostrar perfil
router.get("/perfil", authMiddlware, userController.perfil);


router.get('/logout', userController.logout);




module.exports = router;