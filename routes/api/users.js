const express = require("express");
const gravatar = require("gravatar");
const bcrypt = require("bcryptjs"); //this will break the password in non human readable format using salt and hash function
const jwt = require("jsonwebtoken");
const passport = require("passport");
const router = express.Router();
const User = require("../../models/User");
const keys = require("../../config/keys");  
const validateRegisterInput = require("../../validation/register");
const validateLoginInput = require("../../validation/login");

//.........REGISTER.........................................................
//@route POST api/users/register
//@desc Register user
//@access Public

router.post('/register', (req, res) => {
  //validation
  const {errors, isValid} = validateRegisterInput(req.body);

  if (!isValid) {
    return res.status(400).json(errors);
  }

  User.findOne({ email: req.body.email })
    .then((user) => {
      if (user) {
        return res.status(400).json({ email: "Email already exisits" });
      } else {
        const avatar = gravatar.url(req.body.email, {
          s: "200",
          r: "pg",
          d: "mm",
        });
        const newUser = new User({
          name: req.body.name,
          email: req.body.email,
          avatar, //that means both sides left:right are the same
          password: req.body.password,
        });

        //we are first generating the salt and on successful calling of salt we are calling another function and then hash
        bcrypt.genSalt(10, (err, salt) => {
          if (err) throw err;
          bcrypt.hash(newUser.password, salt, (err, hash) => {
            if (err) throw errtwo;

            newUser.password = hash;
            newUser
              .save()
              .then((user) => res.json(user))
              .catch((err) => console.log(err));
          });
        });
      }
    })
    .catch((err) => console.log(err));
});

//router.get("/test", (req, res) => res.json({ msg: "User works!" })); //test route

//.........LOGIN.........................................................
//@route POST api/users/login
//@desc Login user / returning a token
//@access Public

router.post("/login", (req, res) => {

  //validation
  const { errors, isValid } = validateLoginInput(req.body);

  if (!isValid) {
    return res.status(400).json(errors);
  }
  const email = req.body.email;
  const password = req.body.password;

  //Find user by email and here email means req.body.email and if not find the user then 404 is generally a message given for not found messages
  User.findOne({ email })
    .then(user => {
      if (!user) {
        return res.status(404).json({ email: 'Email not found' });
      }
      //Check password if the user is in the system and give me hash version of password, here password is a plain version of password and user.password is hash version of password. catch is when a function fails to execute.
      bcrypt.compare(password, user.password)
      .then(isMatch => {
        if (isMatch) {
         // We will remove this part of the code when using payload: return res.json({ msg: 'success'});
         //payload make it unique
          const payload = {id: user.id, email: user.email, name: user.name, avatar: user.avatar};
         //sign token
          jwt.sign(payload, 
            keys.secretOrKey,
            {expiresIn: 3600}, 
            (err, token) => {
              return res.json({
                token: 'Bearer ' + token
              });
            })
        
        } else {
          return res.status(400).json({ password: 'password is incorrect' });
        }
      });
    })
    .catch();
});

//@route GWT api/users/login
//@desc Return current user
//@access Private means you need to be authenticated to get to see the data of this route. For pvt route there are three parameters.
router.get('/current' , 
  passport.authenticate('jwt', {session:false}),
  (req,res) => {
  return res.json(req.user);
})
module.exports = router;
