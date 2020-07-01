const express = require('express');
const app = express();
const BodyParser = require('body-parser');
const MongoClient = require('mongodb').MongoClient;
const ObjectId = require('mongodb').ObjectID;
const hbs = require('express-handlebars');

const EventEmitter = require('events');
const emitter = new EventEmitter();

// Emitter example
emitter.on('messageLogged', function(){
  console.log("messaged logged successfully");
})

emitter.emit('messageLogged');

// Callback example
const doCallback = (callback) => {
  setTimeout(() => {
      callback("There have some error",undefined);
  },2000)
}


doCallback((error, result) => {
   if(error) {
      console.log(error);
   }
});

// Promises example
const doPromises = new Promise((resolved, rejected) => {
   setTimeout(()=>{
      resolved("The promise issue is solved");
   },2000)
});

doPromises.then((result) => {
  console.log(result);
}).catch((error) => {
  console.log(error);
});


app.use(BodyParser.json());
app.use(BodyParser.urlencoded({extended:true}));

const CONNECTION_URL = "mongodb://localhost:27017";
const DATABASE_NAME = "example";
var databse , collection;

// MongoDB configuration
app.listen('5000',function(){
	MongoClient.connect(CONNECTION_URL, {useNewUrlParser : true}, function(error, client) {
		if(error) {
			throw error;
		}

        database = client.db(DATABASE_NAME);
        collection = database.collection("customers");
        console.log("Connected with"+ DATABASE_NAME);
	})
})

// Sample APIs
app.post('/register', function(req, res){
    collection.insert(req.body, function(error, result){
    	if(error) {
    		return res.status(500).send(error);
    	}

    	res.send(result);
    })
})

app.post('/register', function(req, res){
    collection.insert(req.body, function(error, result){
    	if(error) {
    		return res.status(500).send(error);
    	}

    	res.send(result);
    })
})

app.get('/customers', function(req, res){
    collection.find({}).toArray(function(error, result){
       if(error) {
       	    return res.status(500).send(error);
       }

       res.send(result);
    })
})

app.get('/customers/:id', function(req, res){
    collection.findOne({"_id": new ObjectId(req.params.id)}, function(error, result) {
    	if(error) {
    	    return res.status(500).send(error);
    	}

    	res.send(result);
    })
})

// view engine setup
app.set('view engine', 'hbs');
app.engine( 'hbs', hbs({
  extname: '.hbs',
  defaultView: 'home',
  layoutsDir: __dirname + '/views/layouts/',
  partialsDir: __dirname + '/views/partials/',
  helpers: {
      getShortComment(comment) {
          if (comment.length < 64) {
              return comment;
          }

          return comment.substring(0, 61) + '...';
      }
  }

}))


// app.get('/', function(req, res) {
//   res.render('home', {layout: 'main', template: 'home-template'});
// });

app.get('/', (req, res) => {
    res.render('home', {
      post: [
            {
              author: 'Janith Kasun',
              image: 'https://picsum.photos/500/500',
              comments: [
                'This is the first comment',
                'This is the second comment',
                'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vestibulum nec fermentum ligula. Sed vitae erat lectus.'
              ]
            },
            {
              author: 'Mousam Kasun',
              image: 'https://picsum.photos/500/500',
              comments: [
                'This is the first comment',
                'This is the second comment',
                'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vestibulum nec fermentum ligula. Sed vitae erat lectus.'
              ]
            },
            {
              author: 'Mousam Kasun',
              image: 'https://picsum.photos/500/500',
              comments: [
                'This is the first comment',
                'This is the second comment',
                'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vestibulum nec fermentum ligula. Sed vitae erat lectus.'
              ]
            },
            {
              author: 'Mousam Kasun',
              image: 'https://picsum.photos/500/500',
              comments: [
                'This is the first comment',
                'This is the second comment',
                'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vestibulum nec fermentum ligula. Sed vitae erat lectus.'
              ]
            },
            {
              author: 'Mousam Kasun',
              image: 'https://picsum.photos/500/500',
              comments: [
                'This is the first comment',
                'This is the second comment',
                'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vestibulum nec fermentum ligula. Sed vitae erat lectus.'
              ]
            },
            {
              author: 'Mousam Kasun',
              image: 'https://picsum.photos/500/500',
              comments: [
                'This is the first comment',
                'This is the second comment',
                'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vestibulum nec fermentum ligula. Sed vitae erat lectus.'
              ]
            },
            {
              author: 'Mousam Kasun',
              image: 'https://picsum.photos/500/500',
              comments: [
                'This is the first comment',
                'This is the second comment',
                'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vestibulum nec fermentum ligula. Sed vitae erat lectus.'
              ]
            }
            ]
    });
});