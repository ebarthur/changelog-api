import merge from 'lodash.merge';

process.env.NODE_ENV = process.env.NODE_ENV || 'development';

const stage = process.env.STAGE || 'local';
let envConfig;

// dynamically require each config depending on the stage we're in
if (stage === 'production') {
  envConfig = require('./prod').default;
} else if (stage === 'testing') {
  envConfig = require('./testing').default;
} else {
  envConfig = require('./local').default;
}

const defaultConfig = {
  stage,
  env: process.env.NODE_ENV,
  secrets: { jwt: process.env.JWT_SECRET, dbUrl: process.env.DATABASE_URL },
  port: require('./local').default.port,
  logging: false,
};

export default merge(defaultConfig, envConfig);
