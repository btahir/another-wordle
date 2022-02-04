import { useRouter } from 'next/router'
import { caesarShift } from '../utils/helpers'
import { useRef } from 'react'

const WORD_MAP = [
  { id: '11', val: [1, 2, 3, 4, 5] },
  { id: '12', val: [1, 2, 3, 4, 5] },
  { id: '13', val: [1, 2, 3, 4, 5] },
  { id: '14', val: [1, 2, 3, 4, 5] },
  { id: '15', val: [1, 2, 3, 4, 5] },
  ,
]

function Word() {
  return (
    <input
      className="h-12 w-12 border border-slate-400"
      minLength={1}
      maxLength={1}
      onKeyUp={() => console.log('up')}
    />
  )
}

function PlayPage() {
  const router = useRouter()
  console.log(router.query.word)
  // const unshifted = caesarShift(router.query.word, -7)
  return (
    <div className="mx-auto w-full max-w-6xl">
      <h1 className="mt-6 mb-12 text-center text-3xl font-bold text-blue-600">
        Guess My Wordle
      </h1>
      <div className="mx-auto space-y-2 text-center">
        {WORD_MAP.map((item) => {
          return (
            <div key={item.id} className='space-x-2'>
              {item.val.map((subItem, index) => {
                return <Word key={index} />
              })}
            </div>
          )
        })}
      </div>
    </div>
  )
}

export default PlayPage
