const express = require('express');
const app = express();
const BodyParser = require('body-parser');
const MongoClient = require('mongodb').MongoClient;
const ObjectId = require('mongodb').ObjectID;
const hbs = require('express-handlebars');

const EventEmitter = require('events');
const emitter = new EventEmitter();


app.use(BodyParser.json());
app.use(BodyParser.urlencoded({extended:true}));

const CONNECTION_URL = "mongodb://localhost:27017";
const DATABASE_NAME = "mydb";
var databse , collection;

// MongoDB configuration
app.listen('3000',function(){
    MongoClient.connect(CONNECTION_URL, {useNewUrlParser : true}, function(error, client) {
        if(error) {
            throw error;
        }

        database = client.db(DATABASE_NAME);
        collection = database.collection("products");
        console.log("Connected with"+ DATABASE_NAME);
    })
})

collection.find({}).toArray();

