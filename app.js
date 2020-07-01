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


app.get('/', (req, res) => {
    res.render('home', {
      post: [
            {
              author: 'Mousam Roy',
              title: 'Docker with Magento 2 on centOS',
              body: "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.",
              url: "/post/2"
            }
            ]
    });
});

app.get('/post/:id', (req, res) => {
    res.render('post', {
      post: [
              {
                author: 'Mousam Roy',
                title: 'Docker with Magento 2 on centOS',
                body: "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum."
              }
            ]
    });
});