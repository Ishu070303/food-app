const functions = require("firebase-functions");
const admin = require("firebase-admin");
require("dotenv").config();

const serviceAccountKey = require('./serviceAccountKey.json');
const express = require('express');

const app = express();

//bdy parser for our JSON Data
app.use(express.json());

//cross origin 
const cors = require('cors');
app.use(cors({ origin: true}));
app.use((req, res, next) => {
    res.set("Access-Control-Allow-Origin", "*");
    res.set("Cross-Origin-Opener-Policy", "same-origin");
    res.set("Cross-Origin-Embedder-Policy", "require-corp");
    next();
});

//Firebase credentials
admin.initializeApp({
    credential: admin.credential.cert(serviceAccountKey)
});

//ap endpoints 
app.get("/", (req, res) => {
  return res.send("Hello world");
});

const userRoute = require('./routes/user');
app.use("/api/users", userRoute);

const productRoute = require('./routes/products');
app.use("/api/products/", productRoute);

exports.app = functions.https.onRequest(app);