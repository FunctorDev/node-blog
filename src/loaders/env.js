const dotenv = require('dotenv');

const result = dotenv.config();

if (result.error) {
  throw result.error;
}

export default result.parsed;
