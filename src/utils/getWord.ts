// @ts-expect-error
import {words} from 'popular-english-words'

const {getWordAtPosition, getWordRank} = words

const randomIntegerInRange = (min: number, max: number) =>
  Math.floor(Math.random() * (max - min + 1)) + min

const getWord = () => {
  while (true) {
    let number = randomIntegerInRange(500, 1000)
    let word = getWordAtPosition(number)
    if (word.length === 5) {
      return word
    }
  }
}

export default getWord
