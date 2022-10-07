const user = require("../models/User.js");
const path = require("path");
const usersFilePath = path.join(__dirname, '../data/usersData.json');

const userModel = require("../models/User.js")

function userLoggedMiddleware(req, res, next) {
    //Variable local para usar, y mostrar elementos al usuario logeado

    res.locals.isLogged = false;

    let emailInCookie = req.cookies.recordarEmail;
    let userFromCookie = userModel.findByField('email', emailInCookie);

    if (userFromCookie) {
        req.session.userLogged = userFromCookie;
    }

    if (req.session.userLogged) {
        res.locals.isLogged = true;
        res.locals.userLogged = req.session.userLogged;
    }

    next();
}

module.exports = userLoggedMiddleware





// // Authentication and Authorization Middleware
// let auth = function(req, res, next) {
//     const users = JSON.parse(fs.readFileSync(usersFilePath, "utf-8"));
//     for(let i = 0; i < users.length; i++){
//     if (req.session && req.session.user == users[i].user)
//       return next();
//     else
//       return res.sendStatus(401);
//     }
//   };

//   // Login endpoint
//   app.get('/login', function (req, res) {
//     if (!req.query.username || !req.query.password) {
//       res.send('login failed');    
//     } else if(req.query.username === "amy" || req.query.password === "amyspassword") {
//       req.session.user = "amy";
//       res.send("login success!");
//     }
//   });
  
//   // Logout endpoint
//   app.get('/logout', function (req, res) {
//     req.session.destroy();
//     res.send("logout success!");
//   });