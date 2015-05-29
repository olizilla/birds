var r = require('rethinkdb')
var mapRows = require('../lib/mapRows')
var htmlify = require('../lib/htmlify')('order')

module.exports = function deriveOrder (conn, done) {
  // find all the orders
  var orders = [];
  r.table('birds').run(conn, mapRows({
    //TODO: this should be a map-reduce query on the rethink db.
    transform: function (row) {
      orders.push(row.order) // TODO: we want a list o birds too to show examples from.
    },
    done: function (err) {
      htmlify({
        name: 'Order',
        orders: orders.map(function (item) { return { name: item}})
      })
      done(err, conn)
    }
  }))

  // TODO: Watch for changes
  //r.table('birds').changes().run(conn, mapRows({
  //  transform: function (row) { return htmlify(row.new_val) }
  //}))
}
