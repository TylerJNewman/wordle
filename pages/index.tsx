import {useKey} from 'rooks'

import Board from 'components/Board'
import Keyboard from 'components/Keyboard'
import Layout from 'components/Layout'
import {useEffect, useState} from 'react'
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

const deleteSvg = <img src="/delete.svg" alt="delete icon" />
const qwerty = 'qwertyuiopasdfghjklzxcvbnm'.split('')
const topRow = qwerty.slice(0, 9)
const middleRow = qwerty.slice(9, 18)
const bottomRow = ['Enter', ...qwerty.slice(18), deleteSvg]
const keyboard = [topRow, middleRow, bottomRow]
const generateRow = () => Array(5).fill({letter: null, match: null})
const initialBoard = Array(6).fill(generateRow())

export interface Tile {
  letter: string | null
  match: string | null
}

export default function Home() {
  const [wordle, setWordle] = useState('')
  const [word, setWord] = useState('')
  const [board, setBoard] = useState(initialBoard)
  const [rowIndex, setRowIndex] = useState(0)

  useEffect(() => {
    setWordle(getWord())
  }, [])

  const incrementRow = () => setRowIndex(rowIndex + 1)
  const clearWord = () => setWord('')

  const addLetter = ({key}: {key: string}) => {
    if (word.length < 5) {
      const newWord = word + key
      setWord(newWord)
      updateBoard(newWord)
    }
  }

  const deleteLetter = () => {
    if (word.length > 0) {
      const newWord = word.slice(0, word.length - 1)
      setWord(newWord)
      updateBoard(newWord)
    }
  }

  const updateBoard = (newWord: string) => {
    const newBoard = [...board]
    const updatedRow = board[rowIndex].map(({match}: Tile, i: number) =>
      newWord[i] ? {letter: newWord[i], match} : {letter: null, match},
    )
    newBoard[rowIndex] = updatedRow
    setBoard(newBoard)
  }

  const checkWord = () => {
    if (word.length < 5) return
    if (word === wordle) alert('congrats')
    const newBoard = [...board]
    const updatedRow = board[rowIndex].map(({letter}: Tile, i: number) => {
      const index = wordle.indexOf(letter as string)
      let match = 'NO_MATCH'
      if (index >= 0) match = 'PARTIAL_MATCH'
      if (index === i) match = 'PERFECT_MATCH'
      return {letter, match}
    })
    newBoard[rowIndex] = updatedRow
    setBoard(newBoard)
    clearWord()
    incrementRow()
  }

  console.log(wordle)

  useKey(qwerty, addLetter)
  useKey(['Backspace'], deleteLetter)
  useKey(['Enter'], checkWord)

  return (
    <Layout>
      <Board board={board} />
      <Keyboard keyboard={keyboard} />
    </Layout>
  )
}
