const indexController = {
    home:(req,res)=>{


        
        res.render("home")
    },
    cart:(req,res)=>{
        res.render("productCart")
    },
    detail:(req,res)=>{
        res.render("productDetail")
    },
    crea:(req,res)=>{
        res.render("crea")
    },
    edit:(req,res)=>{
        res.render("edit")
    },
    
};

module.exports = indexController;