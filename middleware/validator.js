const { validationResult } = require("express-validator");
const { SetErrorResponse } = require("../utils/responseSetter");

exports.validator = (req, res, next) => {
  try {
    const validationResultTrue = validationResult(req);
    if (!validationResultTrue.isEmpty()) {
      const validateError =
        validationResultTrue.array({ onlyFirstError: true })[0].path +
        " :" +
        validationResultTrue.array({ onlyFirstError: true })[0].msg;
      throw new SetErrorResponse(400, validateError);
    }
    next();
  } catch (error) {
    res.json(error);
  }
};
