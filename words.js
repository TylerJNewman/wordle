const fs = require('fs')

try {
  const data = fs.readFileSync('./words.txt', 'utf8')
  const array = data.split('\n').filter(word => word.length === 5)
  fs.writeFileSync('./words.json', JSON.stringify(array))
  console.log(data)
} catch (err) {
  console.error(err)
}
