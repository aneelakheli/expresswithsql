const { check } = require("express-validator");

module.exports =function validate(params) {
    console.log(params)
  try {
    const result = [];
    params.forEach((element) => {
      switch (element) {
        case "name":
          result.push(
            check("name", "name is check.")
              .notEmpty()
              .withMessage("Name is required")
          );
          break;
        case "email":
          result.push(
            check("email", "email is invalid")
              .notEmpty()
              .withMessage("email is required.")
          );
          break;
        case "phoneNumber":
          result.push(
            check("phoneNumber", "phone number is invalid")
              .notEmpty()
              .withMessage("phone number is invalid")
          );
      }
    });
    return result
  } catch (error) {
    console.log(error);
  }
}
