import React from 'react'

interface Props {
  keyboard: any[][]
  matchTypes: any
}

const BG_COLOR = {
  NO_MATCH: 'bg-gray-400',
  PARTIAL_MATCH: 'bg-yellow-400',
  PERFECT_MATCH: 'bg-green-400',
}

const Keyboard = ({keyboard, matchTypes}: Props) => {
  return (
    <div className="m-h-[200px] flex flex-col items-center justify-center w-full flex-1 text-center max-w-lg">
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
              key === 'Enter' || typeof key !== 'string'
                ? 'flex-[1.5] text-sm'
                : 'flex-1'

            return (
              <button
                key={`col-${i}`}
                className={`${backgroundColor} h-[58px] mr-[6px] flex  items-center justify-center rounded ${size}`}
              >
                {key}
              </button>
            )
          })}
        </div>
      ))}
    </div>
  )
}

export default Keyboard
