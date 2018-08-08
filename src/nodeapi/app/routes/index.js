const routes = require('./routes')
const room = require('./room')
const show = require('./show')

module.exports = (app, db) => {
  routes(app, db)
  room(app, db)
  show(app, db)
}
