import { useEffect, useState } from 'react'

import SEO from '@/components/SEO'
import Modal from '@/components/Modal'
import Word from '@/components/Word'
import KeyBoard from '@/components/KeyBoard'

import { caesarShift } from '@/utils/helpers'
import { ALPHABET_COLORS, ROW_COLORS, WORD_MAP } from '@/utils/constants'
import { useRouter } from 'next/router'
import { DuplicateIcon } from '@heroicons/react/solid'

export default function PlayPage() {
  const [rowNum, setRowNum] = useState<number>(0)
  const [colNum, setColNum] = useState<number>(0)
  const [selectedWordArray, setSelectedWordArray] = useState<string[]>([])
  const [currentWordArray, setCurrentWordArray] = useState<string[]>([])
  const [wordColors, setWordColors] = useState<any>(ALPHABET_COLORS)
  const [rowColors, setRowColors] = useState<string[][]>(ROW_COLORS)
  const [submittedRowNum, setSubmittedRowNum] = useState<number>(-1)
  const [showCopy, setShowCopy] = useState<boolean>(false)
  const [finished, setFinished] = useState<boolean>(false)
  const [winning, setWinning] = useState<boolean>(false)
  const router = useRouter()

  // get word
  useEffect(() => {
    if (router && router.query.word) {
      const unshifted: string[] = caesarShift(String(router.query.word), -7)
        .toUpperCase()
        .split('')
      setSelectedWordArray(unshifted)
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
    ) as HTMLElement
    currentField?.focus()
  }

  function copyURL() {
    setShowCopy(true)
    navigator.clipboard.writeText(
      `https://another-wordle.vercel.app${router.asPath}`
    )
    focusField()
    setTimeout(function () {
      setShowCopy(false)
    }, 1500)
  }

  function handleValidation(row: number): void {
    let tempMap: any = wordColors
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
      setFinished(true)
      setWinning(true)
    }
    if (rowNum === 5) {
      setFinished(true)
    }
  }

  function handleKeyBoardClick(l: string): void {
    // It should not be last input field
    if (l === 'ENTER') {
      if (currentWordArray.length < 5) {
        alert('Not Enough Letters!')
      } else {
        handleValidation(rowNum)
      }
    } else if (l === 'BACK') {
      if (colNum > 4) {
        setColNum(4)
        return
      }
      const currentField = document.querySelector(
        `input[name=word-${rowNum}-${colNum}]`
      ) as HTMLInputElement
      // delete current value
      currentField!.value = ''
      if (colNum > 0) {
        const nextfield = document.querySelector(
          `input[name=word-${rowNum}-${colNum - 1}]`
        ) as HTMLElement
        if (nextfield !== null) {
          nextfield.focus()
        }
        if (colNum >= 0) {
          const temp = currentWordArray
          // pop last element
          temp.pop()
          setCurrentWordArray(temp)
          colNum > 0 ? setColNum(colNum - 1) : null
        }
      }
    } else {
      if (colNum <= 4) {
        const currentField = document.querySelector(
          `input[name=word-${rowNum}-${colNum}]`
        ) as HTMLInputElement
        // update current value
        currentField!.value = l

        const nextfield = document.querySelector(
          `input[name=word-${rowNum}-${colNum + 1}]`
        ) as HTMLElement

        // If found, focus the next field
        if (nextfield !== null) {
          nextfield?.focus()
        }
        let temp: any = currentWordArray
        temp[colNum] = l
        setCurrentWordArray(temp)
        setColNum(colNum + 1)
      }
    }
  }

  return (
    <div className="mx-auto w-full max-w-2xl">
      <Modal
        finished={finished}
        winning={winning}
        selectedWordArray={selectedWordArray}
      />
      <SEO />
      <h1 className="my-6 text-center text-3xl font-bold text-blue-600">
        Guess My Wordle
      </h1>
      <div className="my-6 mx-auto flex items-center justify-center text-center">
        <span className="mr-2 font-medium">Share Link</span>
        <input
          className="rounded border border-slate-300 bg-slate-100 px-2 py-1"
          readOnly
          value={`https://another-wordle.vercel.app${router.asPath}`}
        />
        <button className="relative" onClick={copyURL}>
          <DuplicateIcon className="ml-2 h-6 w-6 text-blue-500" />
          {showCopy ? (
            <div className="absolute inset-x-0 top-0 -translate-y-8 transform text-center text-sm text-slate-900">
              Copied!
            </div>
          ) : null}
        </button>
      </div>
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
                    colNum={colNum}
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
      <KeyBoard
        wordColors={wordColors}
        handleKeyBoardClick={handleKeyBoardClick}
      />

      <footer className="fixed inset-x-0 bottom-0 flex h-20 w-full items-center justify-center border-t">
        <a
          className="flex items-center justify-center"
          href="https://twitter.com/deepwhitman"
          target="_blank"
          rel="noopener noreferrer"
        >
          Built with <span className="mx-1 text-blue-600">&#9829;</span> by
          Bilal Tahir
        </a>
      </footer>
    </div>
  )
}
