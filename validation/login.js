const validator = require("validator");
const isEmpty = require("./is-empty"); //it will connect the isEmpty validator function we created on is-empty.js

//here (data) means req.body.name, req.body.email etc. 
module.exports = function validateLoginInput(data) {
  let errors = {};

  if (!validator.isEmail(data.email)) {
    errors.email = "Email is required";
  }
  if (isEmpty(data.email)) {
    errors.email = "Please put a valid email";
  }
  if (isEmpty(data.password)) {
    errors.password = "Password field is required";
  }
  if (!validator.isLength(data.password, { min: 6, max: 20 })) {
    errors.password = "Password must be between 6 and 20 characters";
  }
  return {
    errors,
    isValid: isEmpty(errors)
  };
};