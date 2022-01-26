import React from 'react'
import {Tile} from '../../pages'

interface Props {
  board: any[]
}

const BG_COLOR = {
  NO_MATCH: 'bg-gray-400',
  PARTIAL_MATCH: 'bg-yellow-400',
  PERFECT_MATCH: 'bg-green-400',
}

// width: 100vw; 420
// height: 120vw; 350  w-[350px] h-[420px]

const Board = ({board}: Props) => {
  return (
    <div className="flex flex-col items-center justify-center w-full flex-1 text-center max-w-lg">
      <div
        id="board"
        className="w-[100vw] h-[120vw] xs:w-[350px] xs:h-[420px] p-[10px] grid grid-rows-6 gap-[5px]"
      >
        {board.map((row: any[], i) => (
          <div
            key={`row-${i}`}
            className="row grid grid-cols-5 gap-[5px] font-mono text-white text-sm text-center font-bold leading-6 bg-stripes-fuchsia rounded-lg"
          >
            {row.map(({letter, match}: Tile, i) => {
              const testedForMatch = typeof match === 'string'
              const fontColor = testedForMatch ? 'text-white' : 'text-black'
              const border = testedForMatch ? '' : 'border-2 border-gray-300'
              // @ts-expect-error
              const backgroundColor = testedForMatch ? BG_COLOR[match] : ''
              return (
                <div
                  key={`col-${i}`}
                  className={`tile flex items-center justify-center text-4xl  ${fontColor} ${border} ${backgroundColor}`}
                >
                  {letter?.toUpperCase()}
                </div>
              )
            })}
          </div>
        ))}
      </div>
    </div>
  )
}

export default Board
