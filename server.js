const { createServer } = require('http')
const { parse } = require('url')
const next = require('next')
const pathMatch = require('path-match')
require('dotenv').config()
const dev = process.env.NODE_ENV !== 'production'
const app = next({ dev })
const handle = app.getRequestHandler()
const route = pathMatch()
const match = route('/journal/:id')
app.prepare()
.then(() => {
  createServer((req, res) => {
    const { pathname } = parse(req.url)
    const params = match(pathname)
    if (params === false) {
      handle(req, res)
      return
    }
    app.render(req, res, '/journal', params)
  })
  .listen(process.env.PORT, (err) => {
    if (err) throw err
    // eslint-disable-next-line no-console
    console.log(`> Ready on http://localhost:${process.env.PORT}`)
  })
})
