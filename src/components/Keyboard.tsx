import React from 'react'

interface Props {
  keyboard: any[][]
}

const Keyboard = ({keyboard}: Props) => {
  return (
    <div className="m-h-[200px] flex flex-col items-center justify-center w-full flex-1 text-center max-w-lg">
      {keyboard.map((row, i) => (
        <div
          key={`row-${i}`}
          className="row mb-2 touch-manipulation mr-auto flex w-full"
        >
          {row.map((col, i) => {
            return (
              <button
                key={`col-${i}`}
                className={`bg-gray-300 h-[58px] mr-[6px] flex  items-center justify-center rounded ${
                  col === 'Enter' || typeof col !== 'string'
                    ? 'flex-[1.5] text-sm'
                    : 'flex-1'
                }`}
              >
                {col}
              </button>
            )
          })}
        </div>
      ))}
    </div>
  )
}

export default Keyboard
