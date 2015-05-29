module.exports = function mapRows (opts) {
  opts = opts || {}
  opts.transform = opts.transform || function (row) { return row }
  opts.done = opts.done || function () {}
  return function (err, cursor) {
    if (err) return opts.done(err)
    cursor.each(function (err, row) {
      if (err) return opts.done(err)
      opts.transform(row)
    }, opts.done) // TODO: done is a lie, we're not waiting for the file write (or other async transforms) to complete.
  }
}