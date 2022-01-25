// @ts-expect-error
import {words} from 'popular-english-words'

const {getWordRank} = words

const isWord = (word: string) => getWordRank(word) === -1

export default isWord
