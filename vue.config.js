const webpack = require("webpack");
let { env: { IP, NODE_ENV } } = process;
IP = IP || '';
console.log("-----vue.config.js");

module.exports = {
  chainWebpack: config => {
    config.plugin("define").use(webpack.DefinePlugin, [
      {
        "process.env": {
          IP: `"${IP}"`,
          NODE_ENV: `"${NODE_ENV}"`
        }
      }
    ]);
  }
};
