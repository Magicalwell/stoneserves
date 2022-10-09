const fs = require('fs');
const yaml = require('js-yaml');
const path = require('path');

const configFileNameObj = {
  development: 'dev',
  test: 'test',
  production: 'prod',
};

const env = process.env.NODE_ENV;

export default () => {
  return yaml.load(
    fs.readFileSync(
      path.join(__dirname, `./${configFileNameObj[env]}.yml`),
      'utf8',
    ),
  ) as Record<string, any>;
};
