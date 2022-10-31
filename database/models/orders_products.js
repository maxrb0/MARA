module.exports = function(sequelize, dataTypes) {
    let alias = "orders_products";

    let cols = {
        orders_products_id:{
            type: dataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        order_id:{
            type: dataTypes.INTEGER
        },
        product_id:{
            type: dataTypes.INTEGER
        },

    }

    let config = {
        tableName: "orders_products",
        timestamps: false
    }

    let orders_products = sequelize.define(alias, cols, config);

    return orders_products;

}