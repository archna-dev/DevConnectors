const validator = require ("validator");
const isEmpty = require ("./is-empty"); //it will connect the isEmpty validator function we created on is-empty.js

//here (data) means req.body.name, req.body.email etc. 
module.exports = function validateRegisterInput(data){
  let errors = {};

  if(!validator.isLength (data.name, { min: 2, max: 30 })){
    errors.name = "Name must be between 2 and 30 characters";
  }

  if(!validator.isEmail(data.email)){
    errors.email = "Email is required";
  }
  if(isEmpty(data.email)){
    errors.email = "Please put a valid email";
  }
  if (isEmpty(data.password)) {
    errors.password = "Password field is required";
  }
  if (isEmpty(data.password2)) {
    errors.password2 = "Confirm password field is required";
  }
  if (!validator.equals(data.password, data.password2)){
    errors.password2 = "Confirm password don't match"
  }
  if (!validator.isLength(data.password, { min: 6, max: 20 })) {
    errors.password = "Password must be between 6 and 20 characters";
  }
  return {
    errors,
    isValid: isEmpty(errors)
  };
};