
const rewireCssModules = require('react-app-rewire-css-modules');
const path = require('path');

module.exports = (config, env) => {                                                                             

    // adds support for css modules 
    config = rewireCssModules(config, env);
    config.resolve = {
        alias: {
          'components': path.resolve(__dirname, 'src', 'components')
        }
    };
    return config;
}