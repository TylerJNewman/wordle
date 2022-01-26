import words from './commonWords.json'

const randomIntegerInRange = (min: number, max: number) =>
  Math.floor(Math.random() * (max - min + 1)) + min

const getWord = () => {
  while (true) {
    let number = randomIntegerInRange(0, words.length - 1)
    let word = words[number]
    return word
  }
}

export default getWord
