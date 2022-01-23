import {Fragment, useEffect, useRef, useState} from 'react'
import {Dialog, Transition} from '@headlessui/react'

interface Props {
  isOpen: boolean | null
  onClose: () => void
}

interface EscapeButtonProps {
  handleClose: () => void
}

const Header = ({handleClose}: EscapeButtonProps) => (
  <header className="flex justify-between w-full text-center max-w-lg h-12 items-center">
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
      <div className="fixed inset-0 bg-white flex  flex-col items-center">
        <Header handleClose={handleClose} />
        <div className="w-full border-b border-gray-300 max-w-lg content-between space-y-4 pb-4">
          <p> Guess the WORDLE in 6 tries.</p>

          <p>
            Each guess must be a valid 5 letter word. Hit the enter button to
            submit.
          </p>

          <p>
            After each guess, the color of the tiles will change to show how
            close your guess was to the word.
          </p>
        </div>
      </div>
    </Transition>
  )
}

export default Overlay
