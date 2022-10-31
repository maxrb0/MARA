module.exports = function(sequelize, dataTypes) {
    let alias = "products";

    let cols = {
        product_id:{
            type: dataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        product_name:{
            type: dataTypes.STRING
        },
        product_price:{
            type: dataTypes.INTEGER
        },
        product_description:{
            type: dataTypes.STRING
        },
        product_image_front:{
            type: dataTypes.STRING
        },
        product_image_back:{
            type: dataTypes.STRING
        },
        category_id:{
            type: dataTypes.INTEGER
        }

    }

    let config = {
        tableName: "products",
        timestamps: false
    }

    let Product = sequelize.define(alias, cols, config);

    return Product;

}