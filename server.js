//bringing mongoose the library in to talk to database mongodb
const express = require("express");
const mongoose = require("mongoose");
const bodyparser = require("body-parser");
const passport = require("passport"); //this refers to the library not passport.js file.
const users = require("./routes/api/users");
const posts = require("./routes/api/posts");
const profile = require("./routes/api/profile");
const app = express();

//bodyparser configuration. bodyparser lib. is used abve so that whatever the data we recieve from the user comes to us in JSON format. express is the first place where the information will come.
app.use(bodyparser.urlencoded({extended: false}));
app.use(bodyparser.json());

//Passport configuration to decode jwt bearer token, else passport has a big library to decode. Passport has a large file so it is always a better practice to create a new file named passport in config instead of dumping everything in server.js and call it here.
app.use(passport.initialize());
require('./config/passport')(passport); //bringing or calling out the passport.js and executing it.

//to talk to database we need connectionn string Db config which is talking to mongoURI
const db = require('./config/keys').mongoURI;

//connect to mongodb with the variable we use db
mongoose
  .connect(db)
  .then(() => console.log("mongodb connected"))
  .catch((err) => console.log(err));

//creating first route
app.get("/", (req, res) => res.send("Hello"));

//use routes to connect to the main like in angular app component connects to the child components and telling you if you come to users then go to users and same goes for profile and posts.
app.use("/api/users", users);
app.use("/api/profile", profile);
app.use("/api/posts", posts);

const port = 9000;
app.listen(port, () =>
  console.log(`Server is running successfully on port ${port}`)
);
