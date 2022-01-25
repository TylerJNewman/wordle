interface Props {
  wordle: string
}

const LossContent = ({wordle}: Props) => {
  return (
    <div className="mt-3 text-center sm:mt-0 sm:ml-4 sm:text-left">
      <div className="mt-2">
        <p className="text-7xl text-center text-blue-600">Game Over!!!</p>
      </div>
      <div className="mt-2">
        <p className="text-3xl text-center text-blue-600">
          The word is {wordle}
        </p>
      </div>
      <div className="mt-2">
        <p className="text-7xl text-center text-gray-500">😔</p>
      </div>
    </div>
  )
}

export default LossContent
