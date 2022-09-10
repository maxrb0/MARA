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

        res.render("productCart")
    },

    detail:(req,res)=>{
        const products = JSON.parse(fs.readFileSync(productsFilePath, "utf-8"));

        const ID = products.find((product) => product.id  == req.params.id);
        res.render("productDetail", {productos: ID});
    },

    crea:(req,res)=>{
        res.render("crea")
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

        if (req.file) {
            productNew.imageFrente = req.file.filename
            productNew.imageBack = req.file.filename
          }
         
          

        products.push(productNew);

        const data = JSON.stringify(products, null, " ");
    fs.writeFileSync(productsFilePath, data);
    res.redirect("/");
    },



    
    edit:(req,res)=>{
        const products = JSON.parse(fs.readFileSync(productsFilePath, "utf-8"));

        const productoToEdit = products.find((p) => p.id == req.params.id);
        res.render("edit", { pToEdit: productoToEdit });
    },

    update: (req, res) => {
        const products = JSON.parse(fs.readFileSync(productsFilePath, "utf-8"));

        products.forEach((p) => {
            if (p.id == req.params.id) {
                p.name =   req.body.nameCamiseta,
                p.price = req.body.priceCamiseta,
                p.category =  req.body.category,
                p.description =  req.body.descriptonCamiseta
            

                if (req.file) {
                    fs.unlinkSync("./public/design/" + p.imageFrente );
                    p.imageFrente = req.file.filename
                  }

                  if (req.file) {
                    fs.unlinkSync("./public/design/" + p.imageBack );
                    p.imageBack = req.file.filename;
                  }
            }
        });


        const data = JSON.stringify(products, null, ' ');
        fs.writeFileSync(productsFilePath, data);

         console.log(req.params.id)

        res.redirect("/productDetail/" + req.params.id);
    },





    delete:(req,res)=>{
        const products = JSON.parse(fs.readFileSync(productsFilePath, "utf-8"));
        res.redirect("home")
    },
    
};

module.exports = indexController;