const express = require('express');
const path = require("path");
const methodOverride = require("method-override");
const session = require("express-session");
const cookieParser = require("cookie-parser") 

const app = express();


//requerir rutas
const indexRouter = require("./routes/indexRouter");
const userRouter = require("./routes/userRouter");

const userLoggedMiddleware = require("./middlewares/userLogged-middleware");



app.set("view engine", "ejs");

app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use(cookieParser());
app.use(methodOverride('_method'));
app.use(session({
    secret: "Mundo de las camisetas", resave: false, saveUninitialized: false
}));

app.use(userLoggedMiddleware);



app.use("/", indexRouter);
app.use("/user", userRouter);





app.use(express.static(path.join(__dirname,'/public')));

// app.get('/', (req,res)=>{
//     res.sendFile(__dirname + '/views/home.html');
// });

// app.get('/register', (req,res)=>{
//     res.sendFile(__dirname + '/views/register.html');
// });

// app.get('/login', (req,res)=>{
//     res.sendFile(__dirname + '/views/login.html');
// });

// app.get('/productCart', (req,res)=>{
//     res.sendFile(__dirname + '/views/productCart.html');
// });

// app.get('/productDetail', (req,res)=>{
//     res.sendFile(__dirname + '/views/productDetail.html');
// });




app.listen(3030, ()=>{
    console.log('Servidor funcionando en el puerto 3030');
});

