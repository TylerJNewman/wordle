import {useKey} from 'rooks'

import Board from 'components/Board'
import Keyboard from 'components/Keyboard'
import Layout from 'components/Layout'
import {useState} from 'react'

const deleteSvg = <img src="/delete.svg" alt="delete icon" />
const qwerty = 'qwertyuiopasdfghjklzxcvbnm'.split('')
const topRow = qwerty.slice(0, 9)
const middleRow = qwerty.slice(9, 18)
const bottomRow = ['Enter', ...qwerty.slice(18), deleteSvg]
const keyboard = [topRow, middleRow, bottomRow]
const generateRow = () => Array(5).fill(null)
const initialBoard = Array(6).fill(generateRow())

export default function Home() {
  const [word, setWord] = useState('')
  const [board, setBoard] = useState(initialBoard)
  const [rowIndex, setRowIndex] = useState(0)

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
    const updatedRow = board[rowIndex].map((el: null | string, i: number) =>
      newWord[i] ? newWord[i] : null,
    )
    newBoard[rowIndex] = updatedRow
    setBoard(newBoard)
  }

  useKey(qwerty, addLetter)
  useKey(['Backspace'], deleteLetter)
  useKey(['Enter'], () => {})

  return (
    <Layout>
      <Board board={board} />
      <Keyboard keyboard={keyboard} />
    </Layout>
  )
}
