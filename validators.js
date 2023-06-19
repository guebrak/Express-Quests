const Joi = require('joi');

const validateMovie = (req, res, next) => {
  const schema = Joi.object({
    title: Joi.string().required(),
    year: Joi.number().integer().min(1800).max(2030),
    genre: Joi.string().required(),
    director: Joi.string().required(),
  });

  const { error } = schema.validate(req.body);
  if (error) {
    return res.status(422).json({ error: error.details[0].message });
  }

  next();
};

const validateUser = (req, res, next) => {
  const schema = Joi.object({
    firstname: Joi.string().required(),
    lastname: Joi.string().required(),
    email: Joi.string().email().required(),
    password: Joi.string().required(),
    city: Joi.string(),
    language: Joi.string(),
  });

  const { error } = schema.validate(req.body);
  if (error) {
    return res.status(422).json({ error: error.details[0].message });
  }

  next();
};



  module.exports = {
    validateMovie,
    validateUser,
  };