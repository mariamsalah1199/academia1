const Joi = require("joi");

module.exports = {
  loginValidation: request => {
    const loginSchema = {
      email: Joi.string()
        .email()
        .required(),
      password: Joi.string().required()
    };
    return Joi.validate(request, loginSchema);
  },

  registerValidation: request => {
    const registerSchema = {
      username: Joi.string()
        .min(3)
        .max(100),
      email: Joi.string()
        .min(5)
        .max(100),
      password: Joi.string().min(3)
    };
    return Joi.validate(request, registerSchema);
  }
};
