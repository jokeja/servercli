const http = require('http')
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
}).listen(8888)