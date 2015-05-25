var fs = require('fs')
var path = require('path')
var Handlebars = require('handlebars')
var slugify = require("underscore.string/slugify")

module.exports = function (bird) {
  console.log('htmlify:', bird.name)
  var tplFile = path.join(__dirname, '..', 'templates', 'bird.hbs')
  fs.readFile(tplFile, {encoding: 'utf8'}, function (err, res) {
    var tpl = Handlebars.compile(res)
    // TODO: what if name change
    var slug = bird.slug || slugify(bird.name)
    var htmlFile = path.join(__dirname, '..', 'dist', slug + '.html')
    fs.writeFile(htmlFile, tpl(bird), function (err) {
      if (err) return console.error(err)
      // console.log('wrote', htmlFile)
    })
  })
}
