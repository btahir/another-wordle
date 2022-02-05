import { useRouter } from 'next/router'
import { caesarShift } from '../utils/helpers'
import { useEffect, useState, useRef } from 'react'

const WORD_MAP = [
  { id: 0, val: [0, 1, 2, 3, 4] },
  { id: 1, val: [0, 1, 2, 3, 4] },
  { id: 2, val: [0, 1, 2, 3, 4] },
  { id: 3, val: [0, 1, 2, 3, 4] },
  { id: 4, val: [0, 1, 2, 3, 4] },
  ,
]

function Word({ row, col, setColNum }) {
  function handleChange(e) {
    const { maxLength, value, name } = e.target
    console.log(row, col)

    // Check if no of char in field == maxlength
    if (value.length >= maxLength) {
      // It should not be last input field
      if (col <= 4) {
        const nextfield = document.querySelector(
          `input[name=word-${row}-${col + 1}]`
        )
        console.log(nextfield)

        // If found, focus the next field
        if (nextfield !== null) {
          nextfield.focus()
        }
        col <= 4 ? setColNum(col + 1) : null
      }
    }
  }

  function handleKeyDown(e) {
    if (e.key === 'Enter') {
      console.log('do validate')
    }
    if (e.key === 'Backspace') {
      const currentField = document.querySelector(
        `input[name=word-${row}-${col}]`
      )
      // delete current value
      currentField.value = ''
      if (col > 0) {
        const nextfield = document.querySelector(
          `input[name=word-${row}-${col - 1}]`
        )
        if (nextfield !== null) {
          nextfield.focus()
        }
        col > 0 ? setColNum(col - 1) : null
      }
    }
  }

  return (
    <input
      id={`word-${row}-${col}`}
      name={`word-${row}-${col}`}
      className="pointer-events-none h-12 w-12 border border-slate-400"
      minLength={1}
      maxLength={1}
      onKeyDown={handleKeyDown}
      onChange={handleChange}
    />
  )
}

function PlayPage() {
  const [rowNum, setRowNum] = useState(0)
  const [colNum, setColNum] = useState(0)
  const router = useRouter()

  // initial focus
  useEffect(() => {
    focusField()
  }, [rowNum])
  // const unshifted = caesarShift(router.query.word, -7)

  function focusField() {
    const currentField = document.querySelector(
      `input[name=word-${rowNum}-${colNum}]`
    )
    currentField.focus()
  }

  return (
    <div className="mx-auto w-full max-w-6xl" onClick={focusField}>
      <h1 className="mt-6 mb-12 text-center text-3xl font-bold text-blue-600">
        Guess My Wordle
      </h1>
      <div className="mx-auto space-y-2 text-center">
        {WORD_MAP.map((item) => {
          return (
            <div key={item.id} className="space-x-2">
              {item.val.map((subItem, index) => {
                return (
                  <Word
                    row={item.id}
                    col={index}
                    setColNum={setColNum}
                    key={index}
                  />
                )
              })}
            </div>
          )
        })}
      </div>
    </div>
  )
}

export default PlayPage
