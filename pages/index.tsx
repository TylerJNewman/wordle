import {useKey} from 'rooks'
import toast, {Toaster} from 'react-hot-toast'

import Board from 'components/Board'
import Keyboard from 'components/Keyboard'
import Layout from 'components/Layout'
import {useEffect, useState} from 'react'
// @ts-expect-error
import {words} from 'popular-english-words'
import Modal from 'components/Modal'
import throttle from 'utils/throttle'
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
const uppercaseQwerty = 'qwertyuiopasdfghjklzxcvbnm'.toUpperCase().split('')
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

interface MatchType {
  [type: string]: string
}

export default function Home() {
  const [wordle, setWordle] = useState('')
  const [word, setWord] = useState('')
  const [board, setBoard] = useState(initialBoard)
  const [rowIndex, setRowIndex] = useState(0)
  const [displayModal, setDisplayModal] = useState(false)
  const [matchTypes, setMatchTypes] = useState<MatchType>({})

  useEffect(() => {
    setWordle(getWord())
  }, [])

  const incrementRow = () => setRowIndex(rowIndex + 1)
  const clearWord = () => setWord('')
  const openModal = () => setDisplayModal(true)
  const closeModal = () => setDisplayModal(false)

  const wordIsCorrect = word === wordle
  const gameIsLost = !wordIsCorrect && rowIndex === 5

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

  const notify = throttle(() => toast('Not in the word list'))

  const checkWord = () => {
    if (word.length < 5) return
    if (getWordRank(word) === -1) {
      notify()
      return
    }
    if (wordIsCorrect || gameIsLost) {
      openModal()
      setBoard(initialBoard)
      clearWord()
      return
    }
    const newBoard = [...board]
    let _matchTypes = {...matchTypes}
    const updatedRow = board[rowIndex].map(({letter}: Tile, i: number) => {
      const index = wordle.indexOf(letter as string)
      let match = 'NO_MATCH'
      if (index >= 0) match = 'PARTIAL_MATCH'
      if (index === i) match = 'PERFECT_MATCH'
      if (letter) {
        _matchTypes[letter.toLowerCase()] = match
      }
      setMatchTypes(_matchTypes)
      return {letter, match}
    })
    newBoard[rowIndex] = updatedRow
    setBoard(newBoard)
    clearWord()
    incrementRow()
  }

  useKey([...qwerty, ...uppercaseQwerty], addLetter)
  useKey(['Backspace'], deleteLetter)
  useKey(['Enter'], checkWord)

  console.log(wordle)

  const SuccessContent = () => {
    return (
      <div className="mt-3 text-center sm:mt-0 sm:ml-4 sm:text-left">
        <div className="mt-2">
          <p className="text-7xl text-blue-600">You win!!!</p>
        </div>
        <div className="mt-2">
          <p className="text-7xl text-center text-gray-500">🥳🎉🎊</p>
        </div>
      </div>
    )
  }

  const LossContent = () => {
    return (
      <div className="mt-3 text-center sm:mt-0 sm:ml-4 sm:text-left">
        <div className="mt-2">
          <p className="text-7xl center text-blue-600">Game Over!!!</p>
        </div>
        <div className="mt-2">
          <p className="text-7xl text-center text-gray-500">😔</p>
        </div>
      </div>
    )
  }

  return (
    <Layout>
      <Board board={board} />
      <Keyboard keyboard={keyboard} matchTypes={matchTypes} />
      <Modal
        onClose={closeModal}
        isOpen={displayModal}
        message={wordIsCorrect ? <SuccessContent /> : <LossContent />}
      />
      <Toaster
        position="top-center"
        reverseOrder={false}
        gutter={8}
        containerClassName=""
        containerStyle={{top: 100}}
        toastOptions={{
          // Define default options
          className: '',
          duration: 700,
        }}
      />
    </Layout>
  )
}
