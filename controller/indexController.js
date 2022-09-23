const fs = require("fs");
const path = require("path");
const productsFilePath = path.join(__dirname, "../Data/productsData.json");
const products = JSON.parse(fs.readFileSync(productsFilePath, "utf-8"));
const toThousand = (n) => n.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");

const indexController = {
    home:(req,res)=>{
        const products = JSON.parse(fs.readFileSync(productsFilePath, "utf-8"));

        const laLiga = products.filter((p) => p.category == "La liga");
        const PremierLeague = products.filter((p) => p.category == "Premier League");
        const SeleccionesDelMundo = products.filter((p) => p.category == "Selecciones Del Mundo");
        const PrimeraDivisionColombiana = products.filter((p) => p.category == "Primera Division Colombiana");
        const PrimeraDivisionArgentina = products.filter((p) => p.category == "Primera Division Argentina");

        res.render("home", {
            productos: products, toThousand,
            Laliga: laLiga,
            PremierLeague: PremierLeague,
            SeleccionesDelMundo: SeleccionesDelMundo,
            PrimeraDivisionColombiana: PrimeraDivisionColombiana,
            PrimeraDivisionArgentina: PrimeraDivisionArgentina
        });

    },
    cart:(req,res)=>{
        const products = JSON.parse(fs.readFileSync(productsFilePath, "utf-8"));
        res.render("product-cart")
    },

    detail:(req,res)=>{
        const products = JSON.parse(fs.readFileSync(productsFilePath, "utf-8"));
        const ID = products.find(product => product.id  == req.params.id);
        res.render("product-detail", {productos: ID});
    },

    crea:(req,res)=>{
        res.render("crea-producto")
    },

    store: (req, res) => {

        const products = JSON.parse(fs.readFileSync(productsFilePath, "utf-8"));

        const productNew = {
            id: Date.now(),
            name: req.body.nameCamiseta,
            price: req.body.priceCamiseta,
            category: req.body.category,
            description: req.body.descriptonCamiseta,
            imageFrente: "image-default.png",
            imageBack: "image-default.png"
        };

        if (req.files) {
            productNew.imageFrente = req.files[0].filename
            productNew.imageBack = req.files[1].filename
        }


        products.push(productNew);

        const data = JSON.stringify(products, null, " ");
    fs.writeFileSync(productsFilePath, data);
    res.redirect("/");
    },



    
    edit:(req,res)=>{
        const products = JSON.parse(fs.readFileSync(productsFilePath, "utf-8"));

        const productoToEdit = products.find((p) => p.id == req.params.id);
        res.render("editar-producto", { pToEdit: productoToEdit });
    },

    update: (req, res) => {
        const products = JSON.parse(fs.readFileSync(productsFilePath, "utf-8"));

        products.forEach((p) => {
            if (p.id == req.params.id) {
                p.name =   req.body.nameCamiseta,
                p.price = req.body.priceCamiseta,
                p.category =  req.body.category,
                p.description =  req.body.descriptonCamiseta
            
                //hacer logica de si el usuario edita una sola imagen

                if (req.file) {
                    fs.unlinkSync("./public/design/products/" + p.imageFrente );
                    p.imageFrente = req.file.filename;
                    // fs.unlinkSync("./public/design/products/" + p.imageBack );
                    // p.imageBack = req.file.filename;
                  }

                  if (req.file) {
                    fs.unlinkSync("./public/design/products/" + p.imageBack );
                    p.imageBack = req.file.filename;
                  }
            }
        });


        const data = JSON.stringify(products, null, ' ');
        fs.writeFileSync(productsFilePath, data);

         console.log(req.params.id)

        res.redirect("/product-detail/" + req.params.id);
    },


    //Se puede usar un or (||) dentreo del if  
      
    delete:(req,res)=>{
        let products = JSON.parse(fs.readFileSync(productsFilePath, "utf-8"));
        let producto = products.find((p) => p.id == req.params.id);

        products = products.filter((p) => p.id != req.params.id);

        if (producto.imageFrente != "image-default.png") {
            fs.unlinkSync("./public/design/products/" + producto.imageFrente);
        }
        if (producto.imageBack != "image-default.png") {
            fs.unlinkSync("./public/design/products/" + producto.imageBack);
        }

        let data = JSON.stringify(products, null, " ");
        fs.writeFileSync(productsFilePath, data);

        res.redirect("/")
    },
    
};

module.exports = indexController;