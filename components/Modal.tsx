import { classNames } from '@/utils/helpers'

interface ModalProps {
  finished: boolean
  winning: boolean
  selectedWordArray: string[]
}

export default function Modal({
  finished,
  winning,
  selectedWordArray,
}: ModalProps) {
  return (
    <div
      className={classNames(
        finished ? 'block' : 'hidden',
        'absolute inset-0 top-0 z-20 flex items-center justify-center backdrop-blur-sm'
      )}
    >
      <div className="mx-4 h-48 w-full max-w-sm rounded-lg bg-blue-50 shadow">
        <div className="mt-6 space-y-5 text-center">
          <h2 className="text-2xl font-bold text-blue-600">
            {winning ? 'You Won!' : 'You ran out of tries!'}
          </h2>
          <p className="text-lg text-slate-900">
            The word was{' '}
            <span className="font-bold">{selectedWordArray.join('')}</span>
          </p>
          <a
            className="inline-block rounded-lg bg-blue-600 px-3 py-1 text-lg font-semibold text-white"
            href="/"
          >
            Start Over
          </a>
        </div>
      </div>
    </div>
  )
}
