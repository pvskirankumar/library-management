const express = require("express");
const passport = require('passport');
const session = require('express-session');
const bodyParser = require("body-parser");
const cors = require('cors');
require('dotenv').config();

const app = express();
require("./config/passport");

app.use(session({ secret: "keyboard cat", resave: false, saveUninitialized: true }));

app.use(passport.initialize());
app.use(passport.session());

const bookRoutes = require("./routes/bookRoutes");
const authRoutes = require("./routes/authRouter");
const adminRoutes = require("./routes/adminRoute");

app.use(cors());
app.use(bodyParser.json());
app.use("/api/books", bookRoutes);
app.use('/api/auth', authRoutes);
app.use("/api/admin/books", adminRoutes);

app.listen(3002, () => console.log("Backend is running on port 3002."));