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
    
};

module.exports = indexController;