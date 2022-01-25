import {useKey} from 'rooks'
import toast, {Toaster} from 'react-hot-toast'

import Board from 'components/Board'
import Keyboard from 'components/Keyboard'
import Layout from 'components/Layout'
import {useEffect, useState} from 'react'
import Modal from 'components/Modal'
import throttle from 'utils/throttle'
import isWord from 'utils/isWord'
import getWord from 'utils/getWord'
import SuccessContent from 'components/SuccessContent'
import LossContent from 'components/LossContext'

const initialGameState = 'isPlaying'
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
  const [modalIsOpen, setModalIsOpen] = useState(false)
  const [matchTypes, setMatchTypes] = useState<MatchType>({})
  const [gameState, setGameState] = useState(initialGameState)

  useEffect(() => {
    setWordle(getWord())
  }, [])

  const incrementRow = () => setRowIndex(rowIndex + 1)
  const clearWord = () => setWord('')
  const openModal = () => setModalIsOpen(true)
  const closeModal = () => setModalIsOpen(false)
  const resetGameState = () => setGameState(initialGameState)
  const resetGame = () => {
    setBoard(initialBoard)
    clearWord()
    setRowIndex(0)
    setMatchTypes({})
    resetGameState()
    setWordle(getWord())
  }

  const handleModalClose = () => {
    closeModal()
    setTimeout(() => {
      resetGame()
    }, 1000)
  }

  const wordIsCorrect = wordle === word
  const gameIsLost = rowIndex >= 5
  const gameIsOver = wordIsCorrect || gameIsLost

  const winGame = () => setGameState('win')

  const isWin = gameState === 'win'

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
    let w = isWord
    debugger
    if (!isWord(word)) {
      notify()
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

    if (gameIsOver) {
      if (wordIsCorrect) winGame()
      openModal()
      return
    }
  }

  useKey([...qwerty, ...uppercaseQwerty], addLetter)
  useKey(['Backspace'], deleteLetter)
  useKey(['Enter'], checkWord)

  return (
    <>
      <Layout>
        <Board board={board} />
        <Keyboard
          keyboard={keyboard}
          matchTypes={matchTypes}
          addLetter={addLetter}
          deleteLetter={deleteLetter}
          checkWord={checkWord}
        />
        <Modal
          onClose={handleModalClose}
          isOpen={modalIsOpen}
          message={isWin ? <SuccessContent /> : <LossContent wordle={wordle} />}
        />
        <Toaster
          position="top-center"
          reverseOrder={false}
          gutter={8}
          containerClassName=""
          containerStyle={{top: 100}}
          toastOptions={{duration: 700}}
        />
      </Layout>
    </>
  )
}
