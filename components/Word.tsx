import { useEffect, useState } from 'react'
import { classNames } from '@/utils/helpers'

export default function Word({
  row,
  col,
  colNum,
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
        ) as HTMLElement

        // If found, focus the next field
        if (nextfield !== null) {
          nextfield?.focus()
        }
        let temp = currentWordArray
        temp[colNum] = value.toUpperCase()
        setCurrentWordArray(temp)
        setColNum(colNum + 1)
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
      ) as HTMLInputElement
      // delete current value
      currentField!.value = ''
      if (col > 0) {
        const nextfield = document.querySelector(
          `input[name=word-${row}-${col - 1}]`
        ) as HTMLElement
        if (nextfield !== null) {
          nextfield?.focus()
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
