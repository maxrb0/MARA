const express = require('express');
const router = express.Router();
const multer = require("multer");

const indexController = require ("../controller/indexController");



var storage = multer.diskStorage({
  destination: function (req, files, cb) {
    cb(null, "public/design");
  },
  filename: function (req, files, cb) {
    console.log({ files });

    cb(null, Date.now() + "" + files.originalname);
  },
});

const upload = multer({ storage });


//muestra el home
router.get("/",indexController.home);


//Muestra el carrito de productos
router.get("/product-cart",indexController.cart);


//Mustra el detalle de producto
router.get("/product-detail/:id",indexController.detail);
router.delete("/product-detail/:id", indexController.delete)

//muestra el crear producto
router.get("/crea",indexController.crea);
router.post("/indexRouter/crea", upload.any(), indexController.store);
// router.post("/indexRouter/crea", upload.single("imageBack"), indexController.store);



//muestra el editar producto
router.get("/edit/:id",indexController.edit);
router.put("/edit/:id", upload.any("imageFrente","imageBack"), indexController.update);
// router.put("/edit/:id", upload.single("imageBack"), indexController.update);





module.exports = router;