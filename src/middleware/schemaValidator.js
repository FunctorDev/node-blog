import { includes } from 'ramda';

export default (schema, isApi = false, useJoiError = true) => {
  // useJoiError determines if we should respond with the base Joi error
  const _useJoiError = useJoiError === true;

  // enabled HTTP methods for request data validation
  const _supportedMethods = ['post', 'put', 'delete'];

  // Joi validation options
  const _validationOptions = {
    abortEarly: false, // abort after the last validation error
    allowUnknown: true, // allow unknown keys that will be ignored
    stripUnknown: true, // remove unknown keys from the validated data
  };

  // return the validation middleware
  return (req, res, next) => {
    const method = req.method.toLowerCase();
    console.log(req.body)

    if (includes(method, _supportedMethods)) {
      if (schema) {
        // Validate req.body using the schema and validation options
        return schema
          .validateAsync(req.body, _validationOptions)
          .then((data) => {
            req.body = data;
            next();
          })
          .catch((err) => {
            // console.log('validateAsync: ', err);

            const JoiError = err.details;

            // Custom Error
            const CustomError = {
              status: 'failed',
              error:
                'Invalid request data. Please review request and try again.',
            };

            if (isApi) {
              res.status(422).json(_useJoiError ? JoiError : CustomError);
            } else {
              req.joiError = _useJoiError ? JoiError : CustomError;
              next();
            }
          });
      }
    }

    next();
  };
};
