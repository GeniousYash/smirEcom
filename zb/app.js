require("dotenv").config();
const express = require('express');
const app = express();
const cors = require('cors');
const port = process.env.PORT || 4040;



const corsOptions = {
    origin: 'http://localhost:5173',  // Specify the allowed origin
    methods: ['GET', 'POST', 'PUT', 'PATCH' , 'DELETE'],
    allowedHeaders: ['Content-Type', 'Authorization'],
    credentials: true,                // Allow credentials
  };
app.options("*", cors(corsOptions));
app.use(cors(corsOptions));


// Router
const indexRouter = require('./routes/index');
const connectToDb = require("./config/db");
const authRouter = require("./routes/auth");
const adminRouter = require("./routes/admin");
const productRouter = require("./routes/product");
const categoriesRouter = require("./routes/category");
const userRouter = require("./routes/user");
const cartRouter = require("./routes/cart");
const paymentRouter = require("./routes/payment");
const orderRouter = require("./routes/order");

// Dependencies
require("./config/google_oauth_config");
const expressSession = require("express-session");
const path = require("path");
const cookieParser = require("cookie-parser");
const passport = require("passport");
app.set("view engine", "ejs");
app.use(express.static(path.join(__dirname, "public")));
app.use(express.json());
app.use(express.urlencoded({extended:true}));
app.use(expressSession({
    resave: false,
    saveUninitialized: false,
    secret: process.env.SESSION_SECRET,
}));
app.use(passport.initialize());
app.use(passport.session());
app.use(cookieParser());

// MongoDB Connection
connectToDb();

// Routes
app.use("/", indexRouter);
app.use("/auth", authRouter);
app.use("/admin", adminRouter);
app.use("/products", productRouter);
app.use("/categories", categoriesRouter);
app.use("/users", userRouter);
app.use("/cart", cartRouter);
app.use("/payment", paymentRouter);
app.use("/order", orderRouter);

// Server Listen
app.listen(port, ()=>{
    console.log(`Server Started on PORT ${port}`);
});
