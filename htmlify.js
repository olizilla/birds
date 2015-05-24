var fs = require('fs')
var Handlebars = require('handlebars')
var slugify = require("underscore.string/slugify");

module.exports = function (row) {
  console.log(row)
  fs.readFile('./page.hbs', {encoding: 'utf8'}, function (err, res) {
    var tpl = Handlebars.compile(res)
    // TODO: what if name change
    var thing = row.new_val
    var slug = slugify(thing.name)
    var filename = './dist/' + slug + '.html'
    fs.writeFile(filename, tpl(thing), function (err) {
      if (err) return console.error(err)
      console.log('wrote', filename)
    })
  })
}
