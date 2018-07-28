'use strict';
const envConfig = require(`./app/env_config`)
module.exports = appInfo => {
    // const config = exports = {};
    // config.keys = appInfo.name + '_1532700025048_734';
    return {
        keys: `${appInfo.name}_1532700025048_734`,
        ...envConfig
    };
};
