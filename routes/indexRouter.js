const express = require('express');
const router = express.Router();

const indexController = require ("../controller/indexController");


router.get("/",indexController.home);
router.get("/productCart",indexController.cart);
router.get("/productDetail",indexController.detail);




module.exports = router;