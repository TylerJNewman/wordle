import React from 'react'

interface Props {
  board: any[]
}

const Board = ({board}: Props) => {
  return (
    <div className="flex flex-col items-center justify-center w-full flex-1 text-center max-w-lg">
      <div
        id="board"
        className="w-[350px] h-[420px] p-[10px] grid grid-rows-6 gap-[5px]"
      >
        {board.map((row: any[], i) => (
          <div
            key={`row-${i}`}
            className="row grid grid-cols-5 gap-[5px] font-mono text-white text-sm text-center font-bold leading-6 bg-stripes-fuchsia rounded-lg"
          >
            {row.map((letter: string | null, i) => (
              <div
                key={`col-${i}`}
                className={`tile flex items-center justify-center text-5xl ${
                  letter ? 'bg-gray-500' : 'border-2 border-gray-300'
                } `}
              >
                {letter?.toUpperCase()}
              </div>
            ))}
          </div>
        ))}
      </div>
    </div>
  )
}

export default Board
