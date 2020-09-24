
const Minimist = require('minimist')
/**
 * 
 * @param {*} argv process 参数 
 */
exports.findPort = function (argv) {
  let args = new Minimist(argv.splice(2), {})
  console.log(args)
  console.log(args.port)
  return args.port || 8888
}