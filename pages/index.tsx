import { useRouter } from 'next/router'
import { useState } from 'react'
import { caesarShift } from '@/utils/helpers'
import { RANDOM_WORDS } from '@/words/index'
import SEO from '@/components/SEO'

const ALPHABET = [
  'A',
  'B',
  'C',
  'D',
  'E',
  'F',
  'G',
  'H',
  'I',
  'J',
  'K',
  'L',
  'M',
  'N',
  'O',
  'P',
  'Q',
  'R',
  'S',
  'T',
  'U',
  'V',
  'W',
  'X',
  'Y',
  'Z',
]

export default function Home() {
  const [word, setWord] = useState('')
  const router = useRouter()

  function handleGenerate(e) {
    e.preventDefault()
    for (const letter of word.split('')) {
      if (!ALPHABET.includes(letter.toUpperCase())) {
        alert('Your word can only have letters!')
        return
      }
    }
    const shifted = caesarShift(word, 7)
    router.push(`/play?word=${shifted}`)
  }

  function handleRandom() {
    const randomIdx = Math.round(Math.random() * (RANDOM_WORDS.length - 1))
    const randomWord = RANDOM_WORDS[randomIdx]
    const shifted = caesarShift(randomWord, 7)
    router.push(`/play?word=${shifted}`)
  }

  return (
    <div className="flex min-h-screen flex-col items-center justify-center py-2">
      <SEO />

      <main className="flex w-full flex-1 flex-col items-center justify-start px-4 text-center">
        <h1 className="mt-6 text-3xl font-bold sm:text-4xl">
          Welcome to{' '}
          <a className="inline-block text-blue-600" href="https://nextjs.org">
            Your Wordle
          </a>
        </h1>

        <p className="sm:text;lg mt-3 text-base text-slate-600">
          Generate your custom wordle and share with friends.
        </p>

        <div className="mt-12">
          <form onSubmit={handleGenerate} className="">
            <div className="flex">
              <label className="mr-4 text-lg font-semibold">Your Word</label>
              <input
                type="text"
                minLength={5}
                maxLength={5}
                required
                className="w-48 rounded-lg border border-blue-200 bg-blue-50 px-2 py-1 placeholder-blue-400 sm:w-64"
                placeholder="Add your word"
                value={word}
                onChange={(e) => setWord(e.target.value)}
              />
            </div>
            <div className="mt-12 flex items-center">
              <button
                type="submit"
                className="mr-4 rounded-lg bg-blue-600 px-3 py-2 font-medium text-white hover:bg-blue-700"
              >
                Generate Wordle
              </button>
              <button
                onClick={handleRandom}
                className="rounded-lg border border-blue-600 px-3 py-2 font-medium text-blue-600 hover:text-blue-700"
              >
                Random Wordle
              </button>
            </div>
          </form>
        </div>
      </main>

      <footer className="flex h-20 w-full items-center justify-center border-t">
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
