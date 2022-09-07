const express = require('express');
const router = express.Router();

const indexController = require ("../controller/indexController");



//muestra el home
router.get("/",indexController.home);


//Muestra el carrito de productos
router.get("/productCart",indexController.cart);


//Mustra el detalle de producto
router.get("/productDetail/:id",indexController.detail);


//muestra el crear producto
router.get("/crea",indexController.crea);


//muestra el crear producto
router.get("/edit",indexController.edit);




module.exports = router;