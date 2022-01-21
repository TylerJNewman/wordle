import Head from 'next/head'

const svg = (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    height="24"
    viewBox="0 0 24 24"
    width="24"
  >
    <path
      fill="var(--color-tone-1)"
      d="M22 3H7c-.69 0-1.23.35-1.59.88L0 12l5.41 8.11c.36.53.9.89 1.59.89h15c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zm0 16H7.07L2.4 12l4.66-7H22v14zm-11.59-2L14 13.41 17.59 17 19 15.59 15.41 12 19 8.41 17.59 7 14 10.59 10.41 7 9 8.41 12.59 12 9 15.59z"
    ></path>
  </svg>
)

const qwerty = 'qwertyuiopasdfghjklzxcvbnm'.split('')
const topRow = qwerty.slice(0, 9)
const middleRow = qwerty.slice(9, 18)
const bottomRow = ['Enter', ...qwerty.slice(18), svg]
const keyboard = [topRow, middleRow, bottomRow]

const generateRow = () => Array(5).fill(null)
const board = Array(6).fill(generateRow())

export default function Home() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen py-2">
      <Head>
        <title>Create Next App</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <header className="flex items-center justify-center w-full text-center max-w-lg h-12 border-b-2 border-gray-300">
        <div className="text-4xl">Wordle</div>
      </header>

      <main className="flex flex-col items-center justify-center w-full flex-1 text-center max-w-lg">
        <div
          id="board"
          className="w-[350px] h-[420px] p-[10px] grid grid-rows-6 gap-[5px]"
        >
          {board.map(row => (
            <div className="row grid grid-cols-5 gap-[5px] font-mono text-white text-sm text-center font-bold leading-6 bg-stripes-fuchsia rounded-lg">
              {row.map((_: any) => (
                <div className="tile border-2 border-gray-300"></div>
              ))}
            </div>
          ))}
        </div>
      </main>

      <footer className="m-h-[200px] flex flex-col items-center justify-center w-full flex-1 text-center max-w-lg">
        {keyboard.map(row => (
          <div className="row mb-2 touch-manipulation mr-auto flex w-full">
            {row.map(col => (
              <button
                className={`bg-gray-300 h-[58px] mr-[6px] flex  items-center justify-center rounded ${
                  col === 'Enter' || typeof col !== 'string'
                    ? 'flex-[1.5] text-sm'
                    : 'flex-1'
                }`}
              >
                {col}
              </button>
            ))}
          </div>
        ))}
      </footer>
    </div>
  )
}
