var fs = require('fs')
var path = require('path')
var Handlebars = require('handlebars')
var slugify = require("underscore.string/slugify")

/*
  Turn a db row into html.
  Expects to find a template in the `../pages` dir with `name.hbs`.
  Will use `row.slug` or `row.name` as the output file name.
 */
module.exports = function htmlify (name) {
  return function (row) {
    console.log('htmlify:', row.name)
    var slug = row.slug || slugify(row.name)
    var tplFile = name + '.hbs'
    var htmlFile = slug + '.html'
    fs.readFile(path.join(__dirname, '..', 'pages', tplFile), {encoding: 'utf8'}, function (err, res) {
      var tpl = Handlebars.compile(res)
      var html = tpl(row)
      var htmlFilePath = path.join(__dirname, '..', 'dist', htmlFile)
      fs.writeFile(htmlFilePath, html, function (err) {
        if (err) return console.error(err)
      })
    })
  }
}
