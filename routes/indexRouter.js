const express = require('express');
const router = express.Router();
const multer = require("multer")
const indexController = require ("../controller/indexController");



    var storage = multer.diskStorage({
    //ESTO ES DONDE SE VA A GUARDAR LA IMAGEN NUEVA AUTOMATICAMENTE
    destination: function (req, file, cb) {
      cb(null, "/images");
    },
    //CONFIGURAMOS EL NOMBRE DE COMO SE VA A GUARDAR
  filename: function (req, file, cb) {
    console.log({ file });

    cb(null, Date.now() + "" + file.originalname);
  },
});

const uploadImg = multer({ storage });


//muestra el home
router.get("/",indexController.home);


//Muestra el carrito de productos
router.get("/productCart",indexController.cart);


//Mustra el detalle de producto
router.get("/productDetail/:id",indexController.detail);


//muestra el crear producto
router.get("/crea",indexController.crea);
router.post("/", indexController.store);


//muestra el editar producto
router.get("/edit/:id",indexController.edit);
router.put("/edit/:id" ,indexController.update);




module.exports = router;