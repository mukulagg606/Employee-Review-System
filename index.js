const express = require('express'); // requiring express, 
const port = 8000; // assigning port
const app = express(); 

// requiring express-ejs-layout, it will help in rendering the page.
const expressLayout = require('express-ejs-layouts');

// requring DataBase
const db = require('./config/mongoose');

const bodyParser = require('body-parser');

// requiring mongo-store, so that we can use the existing user even after server start
const MongoStore = require('connect-mongo');

// For getting the output from req.body(it will parse the upcoming request to String or Arrays).
app.use(bodyParser.urlencoded({extended:false}));
// For using the file in assets folder.
app.use(express.static('./assets'));

// Setting up the view engine
app.set('view engine','ejs');
app.set('views','./views');

app.use(expressLayout);

// setting up the router, following MVC structure.
app.use('/' , require('./routes/index'));


// Setting up the server at the given port
app.listen(port, function(err){
    if(err){
        console.log("Error in running the app.");
        return ;
    }
    console.log("Server is up and running at port ", + port);
});