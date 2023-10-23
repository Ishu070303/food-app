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
app.use(( req, res, next) => {
    res.set("Access-Control-Allow-Origin", "*");
    next();
});

//Firebase credentials
admin.initializeApp({
    credential: admin.credential.cert(serviceAccount)
});