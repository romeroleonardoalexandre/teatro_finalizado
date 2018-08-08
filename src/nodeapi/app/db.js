var MongoClient = require('mongodb').MongoClient

var state = {
  db: null,
}

exports.connect = function(url, done, error) {
  if (state.db) return done(db)

  MongoClient.connect(url, function(err, database) {
    if (err) return error(err)
    var db = database.db('teatro')
    var collection = db.collection('connect')
    collection.insert({when: new Date()})
    state.db = db
    done(db)
  })
}

exports.get = function() {
  return state.db
}

exports.close = function(done) {
  if (state.db) {
    state.db.close(function(err, result) {
      state.db = null
      state.mode = null
      done(err)
    })
  }
}
