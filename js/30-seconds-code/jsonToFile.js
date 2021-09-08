const fs = require('fs')

const JSONToFile = (obj, filename) => {
  fs.writeFileSync(`${filename}.json`, JSON.stringify(obj, null, 2))
}

JSONToFile({ test: 'is passed' }, 'testJsonFile')