import { useRouter } from 'next/router'
import { caesarShift, classNames } from '../utils/helpers'
import { useEffect, useState, useRef } from 'react'

const ALPHABET_COLORS = {
  A: 'N',
  B: 'N',
  C: 'N',
  D: 'N',
  E: 'N',
  F: 'N',
  G: 'N',
  H: 'N',
  I: 'N',
  J: 'N',
  K: 'N',
  L: 'N',
  M: 'N',
  N: 'N',
  O: 'N',
  P: 'N',
  Q: 'N',
  R: 'N',
  S: 'N',
  T: 'N',
  U: 'N',
  V: 'N',
  W: 'N',
  X: 'N',
  Y: 'N',
  Z: 'N',
}

const ROW_COLORS = [
  ['N', 'N', 'N', 'N', 'N'],
  ['N', 'N', 'N', 'N', 'N'],
  ['N', 'N', 'N', 'N', 'N'],
  ['N', 'N', 'N', 'N', 'N'],
  ['N', 'N', 'N', 'N', 'N'],
  ['N', 'N', 'N', 'N', 'N'],
]

const WORD_MAP = [
  { id: 0, val: [0, 1, 2, 3, 4] },
  { id: 1, val: [0, 1, 2, 3, 4] },
  { id: 2, val: [0, 1, 2, 3, 4] },
  { id: 3, val: [0, 1, 2, 3, 4] },
  { id: 4, val: [0, 1, 2, 3, 4] },
  { id: 5, val: [0, 1, 2, 3, 4] },
]

const QWERTY = [
  ['Q', 'W', 'E', 'R', 'T', 'Y', 'U', 'I', 'O', 'P'],
  ['A', 'S', 'D', 'F', 'G', 'H', 'J', 'K', 'L'],
  ['ENTER', 'Z', 'X', 'C', 'V', 'B', 'N', 'M', 'BACK'],
]

function Word({
  row,
  col,
  setColNum,
  currentWordArray,
  setCurrentWordArray,
  handleValidation,
  submittedRowNum,
  rowColors,
}) {
  const [currentLetter, setCurrentLetter] = useState('')
  const [currentColor, setCurrentColor] = useState('N')

  useEffect(() => {
    if (submittedRowNum === row) {
      setCurrentColor(rowColors[row][col])
    }
  }, [submittedRowNum])

  function handleChange(e) {
    const { maxLength, value } = e.target
    setCurrentLetter(value.toUpperCase())

    // Check if no of char in field == maxlength
    if (value.length >= maxLength) {
      // It should not be last input field
      if (col <= 4) {
        const nextfield = document.querySelector(
          `input[name=word-${row}-${col + 1}]`
        )

        // If found, focus the next field
        if (nextfield !== null) {
          nextfield?.focus()
        }
        setColNum(col + 1)
        let temp = currentWordArray
        temp[col] = value.toUpperCase()
        setCurrentWordArray(temp)
      }
    }
  }

  function handleKeyDown(e) {
    if (e.key === 'Enter') {
      if (currentWordArray.length < 5) {
        alert('Not Enough Letters!')
      } else {
        handleValidation(row)
      }
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
        if (col >= 0) {
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
      className={classNames(
        currentColor === 'G'
          ? 'bg-green-400'
          : currentColor === 'Y'
          ? 'bg-yellow-400'
          : currentColor === 'B'
          ? 'bg-slate-300'
          : '',
        'pointer-events-none h-12 w-12 border border-slate-400 text-center text-2xl font-extrabold uppercase'
      )}
      minLength={1}
      maxLength={1}
      onKeyDown={handleKeyDown}
      onChange={handleChange}
    />
  )
}

function KeyBoard({ wordColors }) {
  function resolveKeyBoardRow(arr) {
    return arr.map((letter) => {
      return (
        <button
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

function PlayPage() {
  const [rowNum, setRowNum] = useState(0)
  const [colNum, setColNum] = useState(0)
  const [selectedWordArray, setSelectedWordArray] = useState([])
  const [currentWordArray, setCurrentWordArray] = useState([])
  const [wordColors, setWordColors] = useState(ALPHABET_COLORS)
  const [rowColors, setRowColors] = useState(ROW_COLORS)
  const [submittedRowNum, setSubmittedRowNum] = useState(-1)
  const router = useRouter()

  // console.log('currentWordArray', currentWordArray)

  // get word
  useEffect(() => {
    if (router && router.query.word) {
      const unshifted = caesarShift(router.query.word, -7).toUpperCase()
      console.log(unshifted.split(''))
      setSelectedWordArray(unshifted.split(''))
    }
  }, [router])

  // initial focus
  useEffect(() => {
    if (rowNum < 6) {
      focusField()
    }
  }, [rowNum])

  function focusField() {
    const currentField = document.querySelector(
      `input[name=word-${rowNum}-${colNum}]`
    )
    currentField.focus()
  }

  function handleValidation(row) {
    let tempMap = wordColors
    let tempRowColors = rowColors
    let successes = 0
    for (let i = 0; i < 5; i++) {
      const currentLetter = currentWordArray[i]
      if (selectedWordArray.includes(currentLetter)) {
        // letter is in array
        if (selectedWordArray[i] === currentLetter) {
          // letter is in the exact position
          tempMap[currentLetter] = 'G'
          tempRowColors[row][i] = 'G'
          successes += 1
        } else {
          tempMap[currentLetter] = 'Y'
          tempRowColors[row][i] = 'Y'
        }
      } else {
        tempMap[currentLetter] = 'B'
        tempRowColors[row][i] = 'B'
      }
    }
    setWordColors(tempMap)
    setRowColors(tempRowColors)
    setRowNum(rowNum + 1)
    setColNum(0)
    setCurrentWordArray([])
    setSubmittedRowNum(submittedRowNum + 1)
    if (successes === 5) {
      alert('You Win!')
    }
    if (rowNum === 5) {
      alert('Oops! Looks like you ran out of tries.')
    }
  }

  return (
    <div className="mx-auto w-full max-w-2xl" onClick={focusField}>
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
                    key={index}
                    row={item.id}
                    col={index}
                    setColNum={setColNum}
                    currentWordArray={currentWordArray}
                    setCurrentWordArray={setCurrentWordArray}
                    handleValidation={handleValidation}
                    submittedRowNum={submittedRowNum}
                    rowColors={rowColors}
                  />
                )
              })}
            </div>
          )
        })}
      </div>
      <KeyBoard wordColors={wordColors} />
    </div>
  )
}

export default PlayPage
