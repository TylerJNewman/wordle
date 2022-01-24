import {useEffect, useState} from 'react'
import {Transition} from '@headlessui/react'
import {Tile as TileProps} from '../../pages'

const BG_COLOR = {
  NO_MATCH: 'bg-gray-400',
  PARTIAL_MATCH: 'bg-yellow-400',
  PERFECT_MATCH: 'bg-green-400',
}
interface Props {
  isOpen: boolean | null
  onClose: () => void
}

interface EscapeButtonProps {
  handleClose: () => void
}

const matches = {
  w: 'PERFECT_MATCH',
  a: 'PARTIAL_MATCH',
}

const row = 'weary'.split('').map((letter: string) => ({
  letter,
  match: null,
}))

const rowWithMatches = row.map(({letter}: TileProps) => ({
  letter,
  // @ts-expect-error
  match: matches[letter] ?? 'NO_MATCH',
}))

const Header = ({handleClose}: EscapeButtonProps) => (
  <header className="flex justify-between w-full text-center max-w-lg h-12 items-center text-base">
    <div className="spacer" />
    <div className="text font-bold">How To Play</div>
    <div
      onClick={handleClose}
      className="modal-close cursor-pointer flex flex-col items-center"
    >
      <svg
        className="fill-current text-black"
        xmlns="http://www.w3.org/2000/svg"
        width={18}
        height={18}
        viewBox="0 0 18 18"
      >
        <path d="M14.53 4.53l-1.06-1.06L9 7.94 4.53 3.47 3.47 4.53 7.94 9l-4.47 4.47 1.06 1.06L9 10.06l4.47 4.47 1.06-1.06L10.06 9z" />
      </svg>
    </div>
  </header>
)

const Tile = ({letter, match}: TileProps) => {
  const testedForMatch = typeof match === 'string'
  const fontColor = testedForMatch ? 'text-white' : 'text-black'
  const border = testedForMatch ? '' : 'border-2 border-gray-300'
  // @ts-expect-error
  const backgroundColor = testedForMatch ? BG_COLOR[match] : ''
  return (
    <div
      className={`tile flex items-center justify-center text-2xl  ${fontColor} ${border} ${backgroundColor} w-11 h-11`}
    >
      {letter?.toUpperCase()}
    </div>
  )
}

function Overlay({isOpen, onClose}: Props) {
  const [open, setOpen] = useState(false)

  useEffect(() => {
    if (isOpen) {
      setOpen(true)
    }
  }, [isOpen])

  const handleClose = () => {
    setOpen(false)
    onClose()
  }

  return (
    <Transition
      appear={true}
      show={open}
      enter="transition-opacity duration-75"
      enterFrom="opacity-0"
      enterTo="opacity-100"
      leave="transition-opacity duration-150"
      leaveFrom="opacity-100"
      leaveTo="opacity-0"
    >
      <div className="fixed inset-0 bg-white flex  flex-col items-center text-sm">
        <Header handleClose={handleClose} />
        <div className="w-full border-b border-gray-300 max-w-lg content-between space-y-4 pb-4 ">
          <p>
            Guess the <span className="font-bold">WORDLE</span> in 6 tries.
          </p>
          <p>
            Each guess must be a valid 5 letter word. Hit the enter button to
            submit.
          </p>
          <p>
            After each guess, the color of the tiles will change to show how
            close your guess was to the word.
          </p>
        </div>
        <div className="w-full  max-w-lg content-between space-y-4 py-4">
          <p className="font-bold">Example</p>
          <p>
            <div className="row flex gap-[5px] font-mono text-white text-sm text-center font-bold leading-6 bg-stripes-fuchsia rounded-lg">
              {row.map(({letter, match}: TileProps, i) => (
                <div key={i}>
                  <Tile letter={letter} match={match} />
                </div>
              ))}
            </div>
          </p>
          <p>
            After each guess, the color of the tiles will change to show how
            close your guess was to the word.
          </p>
          <p>
            <div className="row flex gap-[5px] font-mono text-white text-sm text-center font-bold leading-6 bg-stripes-fuchsia rounded-lg">
              {rowWithMatches.map(({letter, match}: TileProps, i) => (
                <div key={i}>
                  <Tile letter={letter} match={match} />
                </div>
              ))}
            </div>
          </p>
          <p>
            The letter <span className="font-bold">W </span>is in the word and
            in the correct spot.
          </p>
          <p>
            The letter <span className="font-bold">A </span>is in the word but
            in the wrong spot.
          </p>
          <p>
            The letters <span className="font-bold">E</span>,{' '}
            <span className="font-bold">R</span> and{' '}
            <span className="font-bold">Y</span> are not in the word in any
            spot.
          </p>
        </div>
      </div>
    </Transition>
  )
}

export default Overlay
