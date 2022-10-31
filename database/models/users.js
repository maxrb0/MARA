module.exports = function (sequelize, dataTypes){
    let alias = "users";

    let cols = {
user_id: {
    type : dataTypes.INTEGER,
    primaryKEy: true, 
    autoIncrement: true,
},

user_dni: {
    type: dataTypes.INTEGER,
    unique: true, 
},

user_name: {
type: dataTypes.STRING
},

user_image: {
    type: dataTypes.STRING
    },

user_address: {
        type: dataTypes.STRING
        },

user_pass: {
            type: dataTypes.STRING
            },

user_is_admin:{
    type: dataTypes.BOOLEAN
}
    }

    let config = {
        tableName: "users",
        timestamps: false, 
    }

    let users = sequelize.define(alias, cols, config);

    return users;
}