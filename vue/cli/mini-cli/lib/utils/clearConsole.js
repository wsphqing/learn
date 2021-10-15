const readline = require('readline')

module.exports = function clearConsloe(title) {
  console.log(process.stdout)
  if (process.stdout.isTTY) {
    const blank = '\n'.repeat(process.stdout.rows)
    readline.cursorTo(process.stdout, 0, 0)
    readline.clearScreenDown(process.stdout)
    if (title) {
      console.log(title)
    }
  }
}