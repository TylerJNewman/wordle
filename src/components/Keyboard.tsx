import React from 'react'

interface Props {
  keyboard: any[][]
  matchTypes: any
  addLetter: ({key}: {key: string}) => void
  deleteLetter: () => void
  checkWord: () => void
}

const BG_COLOR = {
  NO_MATCH: 'bg-gray-400',
  PARTIAL_MATCH: 'bg-yellow-400',
  PERFECT_MATCH: 'bg-green-400',
}

const isBackspace = (key: string) => typeof key !== 'string' || key === ''
const isEnter = (key: string) => key === 'Enter'

const Keyboard = ({
  keyboard,
  matchTypes,
  addLetter,
  deleteLetter,
  checkWord,
}: Props) => {
  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    // @ts-expect-error
    const value = event.target.innerText
    if (isEnter(value)) {
      checkWord()
    } else if (isBackspace(value)) {
      deleteLetter()
    } else {
      addLetter({key: value})
    }
  }

  return (
    <div className="m-h-[200px] flex flex-col items-center justify-center w-full flex-1 text-center max-w-lg">
      <div className="flex flex-col items-center justify-center w-full flex-1 ml-3">
        {keyboard.map((row, i) => (
          <div
            key={`row-${i}`}
            className="row mb-2 touch-manipulation mr-auto flex w-full"
          >
            {row.map((key, i) => {
              const matchType = matchTypes[key] ?? ''
              // @ts-expect-error
              const backgroundColor = BG_COLOR[matchType] ?? 'bg-gray-300'
              const size =
                isEnter(key) || isBackspace(key)
                  ? 'flex-[1.5] text-sm'
                  : 'flex-1'

              return (
                <button
                  key={`col-${i}`}
                  onClick={handleClick}
                  className={`${backgroundColor} h-[58px] mr-[6px] flex items-center justify-center rounded ${size}`}
                >
                  {key}
                </button>
              )
            })}
          </div>
        ))}
      </div>
    </div>
  )
}

export default Keyboard
