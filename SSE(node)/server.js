const http = require('http')
const fs = require('fs')
const path = require('path')

const getRandomInt = (max) => Math.floor(Math.random() * max)

let data
function sse(req, res) {
  res.setHeader('Content-Type', 'text/event-stream') //заголовки, чтобы браузер знал, что ему идёт поток
  res.setHeader('Cache-Control', 'no-cache') //отключаем кэш
  res.setHeader('Connection', 'keep-alive') //постоянное соединение

  let id = 0

  const timer = setInterval(() => {
    //data = getRandomInt(100)
    if (data !== undefined && data !== '') {
      res.write(`data: some data ${data}\n`) //отправляем чанк данных
      res.write(`id: ${++id}\n`)
      res.write('\n')
    }
  }, 1000)

  setTimeout(() => {
    clearInterval(timer)
    res.write(`event: end-of-stream\n`)
    res.write(`data: this is the end\n`)
    res.write('\n')
    res.end('Ok')
  }, 5000)
}

http
  .createServer((req, res) => {
    const url = new URL(`http://${req.headers.host}${req.url}`)

    if (url.pathname === '/stream') {
      sse(req, res)
      return
    }

    if (url.pathname === '/send-message') {
      data = url.searchParams.get('message')
      res.end(data)
    }

    const fileStream = fs.createReadStream(path.join(__dirname, 'index.html'))
    fileStream.pipe(res)
  })
  .listen(8080, () => {
    console.log('Server started on port 8080')
  })
