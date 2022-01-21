import Board from 'components/Board'
import Keyboard from 'components/Keyboard'
import Layout from 'components/Layout'

const deleteSvg = <img src="/delete.svg" alt="delete icon" />
const qwerty = 'qwertyuiopasdfghjklzxcvbnm'.split('')
const topRow = qwerty.slice(0, 9)
const middleRow = qwerty.slice(9, 18)
const bottomRow = ['Enter', ...qwerty.slice(18), deleteSvg]
const keyboard = [topRow, middleRow, bottomRow]
const generateRow = () => Array(5).fill(null)
const board = Array(6).fill(generateRow())

export default function Home() {
  return (
    <Layout>
      <Board board={board} />
      <Keyboard keyboard={keyboard} />
    </Layout>
  )
}
