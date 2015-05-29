var r = require('rethinkdb')
var mapRows = require('../lib/mapRows')
var htmlify = require('../lib/htmlify')('bird')

module.exports = function birdWatch (conn, done) {
  // turn bird data into pages
  r.table('birds').run(conn, mapRows({
    transform: htmlify,
    done: function (err) { done(err, conn) }
  }))

  // Watch for changes
  r.table('birds').changes().run(conn, mapRows({
    transform: function (row) { return htmlify(row.new_val) }
  }))
}
