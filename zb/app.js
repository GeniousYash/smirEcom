require("dotenv").config();
const express = require('express');
const app = express();
const port = process.env.PORT || 4040;
const indexRouter = require('./routes/index');
const connectToDb = require("./config/db");
const authRouter = require("./routes/auth");
const adminRouter = require("./routes/admin");
const productRouter = require("./routes/product");
require("./config/google_oauth_config");
const expressSession = require("express-session");
const path = require("path");
const cookieParser = require("cookie-parser");

app.set("view engine", "ejs");
app.use(express.static(path.join(__dirname, "public")));
app.use(express.json());
app.use(express.urlencoded({extended:true}));
app.use(expressSession({
    resave: false,
    saveUninitialized: false,
    secret: process.env.SESSION_SECRET,
}))
app.use(cookieParser());

// require("./config/db");
connectToDb();
app.use("/", indexRouter);
app.use("/auth", authRouter);
app.use("/admin", adminRouter);
app.use("/products", productRouter);


app.listen(port, ()=>{
    console.log(`Server Started on PORT ${port}`);
});
