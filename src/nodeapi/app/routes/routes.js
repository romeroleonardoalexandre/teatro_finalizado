var database = require('../db.js')

module.exports = (app, db) => {

  app.get('/teste', (req, res) => {
    console.log("teste")
    res.json({
      teste: "true",
      items: [{
        id: '1'
      },{
        id: '2'
      }]
    })
  })

  app.post('/connects', (req, res) => {
    console.log(req.body)
    res.end()
  })

}
