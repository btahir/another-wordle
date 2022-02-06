import { classNames } from '@/utils/helpers'
import { QWERTY } from '@/utils/constants'

export default function KeyBoard({ wordColors, handleKeyBoardClick }) {
  function resolveKeyBoardRow(arr) {
    return arr.map((letter) => {
      return (
        <button
          onClick={() => handleKeyBoardClick(letter)}
          key={letter}
          className={classNames(
            wordColors[letter] === 'G'
              ? 'bg-green-400'
              : wordColors[letter] === 'Y'
              ? 'bg-yellow-400'
              : wordColors[letter] === 'B'
              ? 'bg-slate-400'
              : 'bg-slate-200',
            'm-1 rounded px-2 py-2 text-sm font-medium sm:px-3 sm:py-4 sm:text-base'
          )}
        >
          {letter}
        </button>
      )
    })
  }

  return (
    <div className="mx-auto mt-24 text-center">
      <div>{resolveKeyBoardRow(QWERTY[0])}</div>
      <div>{resolveKeyBoardRow(QWERTY[1])}</div>
      <div>{resolveKeyBoardRow(QWERTY[2])}</div>
    </div>
  )
}
