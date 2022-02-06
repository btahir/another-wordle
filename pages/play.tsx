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

function Word({ row, col, setColNum, currentWordArray, setCurrentWordArray }) {
  function handleChange(e) {
    const { maxLength, value, name } = e.target
  
    // Check if no of char in field == maxlength
    if (value.length >= maxLength) {
      // It should not be last input field
      if (col <= 4) {
        const nextfield = document.querySelector(
          `input[name=word-${row}-${col + 1}]`
        )

        // If found, focus the next field
        if (nextfield !== null) {
          nextfield.focus()
        }
        setColNum(col + 1)
        let temp = currentWordArray
        temp[col] = value
        setCurrentWordArray(temp)
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
        if(col >= 0) {
          const temp = currentWordArray
          // pop last element
          temp.pop()
          setCurrentWordArray(temp)
          col > 0 ? setColNum(col - 1) : null
        }        
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
  const [currentWordArray, setCurrentWordArray] = useState([])
  const router = useRouter()

  console.log('currentWordArray', currentWordArray)

  // initial focus
  useEffect(() => {
    focusField()
  }, [rowNum])
  // const unshifted = caesarShift(router.query.word, -7)
  // console.log(router.query.word)

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
                    currentWordArray={currentWordArray}
                    setCurrentWordArray={setCurrentWordArray}
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
