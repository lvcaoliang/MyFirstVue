var merge = require('webpack-merge')
var prodEnv = require('./prod.env')

//key值相同的情况下，merge怎么操作？？
module.exports = merge(prodEnv, {
  NODE_ENV: '"development"'
})
