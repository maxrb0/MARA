const fs = require("fs");
const path = require("path");

const productsFilePath = path.join(__dirname, "../Data/productsData.json");

const indexController = {
    home:(req,res)=>{
        const products = JSON.parse(fs.readFileSync(productsFilePath, "utf-8"));

        const laLiga = products.filter((p) => p.category == "La liga");
        const PremierLeague = products.filter((p) => p.category == "Premier League");
        const SeleccionesDelMundo = products.filter((p) => p.category == "Selecciones Del Mundo");
        const PrimeraDivisionColombiana = products.filter((p) => p.category == "Primera Division Colombiana");
        const PrimeraDivisionArgentina = products.filter((p) => p.category == "Primera Division Argentina");

        res.render("home", {
            productos: products,
            Laliga: laLiga,
            PremierLeague: PremierLeague,
            SeleccionesDelMundo: SeleccionesDelMundo,
            PrimeraDivisionColombiana: PrimeraDivisionColombiana,
            PrimeraDivisionArgentina: PrimeraDivisionArgentina
          });

    },
    cart:(req,res)=>{
        const products = JSON.parse(fs.readFileSync(productsFilePath, "utf-8"));
        res.render("productCart")
    },

    detail:(req,res)=>{
        const products = JSON.parse(fs.readFileSync(productsFilePath, "utf-8"));
        const ID = products.find(product => product.id  == req.params.id);
        res.render("productDetail", {productos: ID});
    },

    crea:(req,res)=>{
        const products = JSON.parse(fs.readFileSync(productsFilePath, "utf-8"));
        res.render("crea")
    },

    store: (req, res) => {

        const productNew = {
            id: Date.now(),
            name: req.body.name,
            price: req.body.price,
            category: req.body.category,
            description: req.body.description,
            imageFrente: "image-default.png",
            imageBack: "image-default.png"
        };

        const products = JSON.parse(fs.readFileSync(productsFilePath, "utf-8"));

        products.push(productNew);

        const data = JSON.stringify(products, null, ' ');
        fs.writeFileSync(productsFilePath, data);

        res.redirect("/");
    },



    
    edit:(req,res)=>{
        const products = JSON.parse(fs.readFileSync(productsFilePath, "utf-8"));
        res.render("edit")
    },

    delete:(req,res)=>{
        const products = JSON.parse(fs.readFileSync(productsFilePath, "utf-8"));
        res.redirect("home")
    },
    
};

module.exports = indexController;