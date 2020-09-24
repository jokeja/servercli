const http = require('http')
const utils = require('./lib/utils')

let port = utils.findPort(process.argv)

let server = http.createServer((req, res) => {
  console.log(req.url)
  console.log(req.method)
  console.log(req)
  console.log('------------------------------------------------------------------------')
  let data = ''
  req.on('data', (chunk) => {
    data += chunk
    console.log(arguments)
    console.log(data)
  })
  req.on('end', () => {
  })
  res.write('-----------------------')
  res.end()
}).listen(port)