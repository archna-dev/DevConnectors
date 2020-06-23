//bringing mongoose the library in to talk to database mongodb 
const express = require('express');
const mongoose = require('mongoose');
const users = require('./routes/api/users');
const posts = require('./routes/api/posts');
const profile = require('./routes/api/profile');



const app = express();

//to talk to database we need connectionn string Db config which is talking to mongoURI
const db = require ('./config/keys').mongoURI;

//connect to mongodb with the variable we use db
mongoose.connect(db)
  .then(() => console.log('mongodb connected'))
  .catch(err => console.log(err));
  
//creating first route
app.get ('/', (req, res)=>res.send('Hello'));

//use routes to connect to the main like in angular app component connects to the child components and telling you if you come to users then go to users and same goes for profile and posts.
app.use('/api/users', users);
app.use('/api/profile', profile);
app.use('/api/posts', posts);


const port = 9000;
app.listen(port, () => console.log(`Server is running successfully on port ${port}`));