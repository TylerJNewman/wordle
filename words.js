const fs = require('fs')

try {
  const data = fs.readFileSync('./words.txt', 'utf8')
  const array = data
    .split('\n')
    .filter(word => word.length === 5)
    .filter(
      word => !word.split('').some(x => x === '-' || x === '.' || x === "'"),
    )
  fs.writeFileSync('./words.json', JSON.stringify(array))
  console.log(data)
} catch (err) {
  console.error(err)
}
