/*

 88           88                       88
 88           ""                       88
 88                                    88
 88,dPPYba,   88  8b,dPPYba,   ,adPPYb,88  ,adPPYba,
 88P'    "8a  88  88P'   "Y8  a8"    `Y88  I8[    ""
 88       d8  88  88          8b       88   `"Y8ba,
 88b,   ,a8"  88  88          "8a,   ,d88  aa    ]8I
 8Y"Ybbd8"'   88  88           `"8bbdP"Y8  `"YbbdP"'

 */

var r = require('rethinkdb')
var async = require('async')

// TODO: load all pages automagically.
var bird = require('./pages/bird')
var order = require('./pages/order')

var db = {
  host: 'localhost',
  port: 28015,
  name: 'test',
  table: 'birds',
  connection: null
}

// DO IT!
ready()

function ready () {
  async.waterfall(
    [
      connect,
      initDb,
      bird,
      order
    ],
    function () {
      console.log('BIRDS ready! Changes to the db will be logged...')
    }
  )
}

function connect (done) {
  r.connect({host: db.host, port: db.port}, function (err, conn) {
    db.connection = conn
    done(err, conn)
  })
}

// Insert testData if empty
function initDb (conn, done) {
  r.db(db.name).tableList().run(db.connection, function (err, tables) {
    if (err) return done(err)
    if (tables.indexOf(db.table) >= 0) return done(err, conn)
    r.db(db.name).tableCreate(db.table).run(db.connection, function (err, res) {
      r.table().insert(testData()).run(db.connection, function (err, res) { done(err, conn) })
    })
  })
}

function testData () {
  return [
    {
      name: 'Eurasian blue tit',
      species: 'C. caeruleus',
      genus: 'Cyanistes',
      image:'https://upload.wikimedia.org/wikipedia/commons/thumb/8/86/Eurasian_blue_tit_Lancashire.jpg/1920px-Eurasian_blue_tit_Lancashire.jpg'
    },
    {
      name: 'Steller\'s jay',
      species: 'C. stelleri',
      genus: 'Cyanocitta',
      image:'http://media.columbian.com/img/croppedphotos/2013/06/17/stellar-jay.jpg'
    }
  ]
}
