const express = require('express');
const path = require("path");
const indexRouter = require("./routes/indexRouter");
const userRouter = require("./routes/userRouter");

const app = express();

app.set("view engine", "ejs");


app.use("/", indexRouter);
app.use("/", userRouter);




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
    console.log('Servidor funcionando');
});

