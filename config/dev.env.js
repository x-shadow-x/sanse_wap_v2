var merge = require('webpack-merge')
var prodEnv = require('./prod.env')

module.exports = merge(prodEnv, {
  NODE_ENV: '"development"',
  API_ROOT: '"/api"',
  API_WX_PAY_ROOT: '"/wx_pay_dev"'
})
