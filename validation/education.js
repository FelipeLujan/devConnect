//this file contains the rules for user registration
const validator = require("validator"); //the input to validator must be a string
const isEmpty = require("./is-empty");

//this function will be reached from the outside to validate user input when registering
module.exports = function validateEducation(data) {
  //this errors object will be populated with errors coming from the following validations
  let errors = {};

  data.school = !isEmpty(data.school) ? data.school : "";
  data.degree = !isEmpty(data.degree) ? data.degree : "";
  data.fieldofstudy = !isEmpty(data.fieldofstudy) ? data.fieldofstudy : "";
  data.from = !isEmpty(data.from) ? data.from : "";
  data.to = !isEmpty(data.to) ? data.to : "";

  /*The way validator works, is checking if the given input complies with the method(isEmail, isLength..)
                if so, return true
                - input to be check must be a string*/
  if (validator.isEmpty(data.school)) {
    errors.school = "Please the name of your school, or type self-taught.";
  }

  if (validator.isEmpty(data.degree)) {
    errors.degree = "Please enter the name of the degree, or type self-taught";
  }

  if (validator.isEmpty(data.fieldofstudy)) {
    errors.fieldofstudy = "Field of study is required";
  }
  if (validator.isEmpty(data.from)) {
    errors.from = "From date is required";
  }

  return {
    //"errors" is an object with the errors collected form the checks
    //isValid will be a boolean resulting from evaluating isEmpty
    errors: errors,
    isValid: isEmpty(errors)
  };
};

// module.exports = validateExperience;
