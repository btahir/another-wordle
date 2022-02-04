import { useRouter } from 'next/router'
import { caesarShift } from '../utils/helpers'

function PlayPage() {
  const router = useRouter()
  const unshifted = caesarShift(router.query.word, -7)
  return <div>{unshifted}</div>
}

export default PlayPage
