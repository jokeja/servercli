
const Minimist = require('minimist')
/**
 * 
 * @param {*} argv process 参数 
 */
exports.findPort = function (argv) {
  let args = new Minimist(argv.splice(2), {})
  return args.port || 8888
}

// mode production正式环境
exports.initEnv = function (argv) {
  let args = new Minimist(argv.splice(2), {})
  process.env.MODE_ENV = args.mode || 'development'
}