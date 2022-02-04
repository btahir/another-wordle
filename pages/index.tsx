import Head from 'next/head'
import Link from 'next/link'

export default function Home() {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center py-2">
      <Head>
        <title>Your Wordle</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className="flex w-full flex-1 flex-col items-center justify-start px-20 text-center">
        <h1 className="mt-6 text-3xl font-bold sm:text-4xl">
          Welcome to{' '}
          <a className="text-blue-600 inline-block" href="https://nextjs.org">
            Your Wordle
          </a>
        </h1>

        <p className="mt-3 text-base sm:text;lg text-slate-600">
          Generate your custom wordle and share with friends.
        </p>

        <div className="mt-6 space-y-12">
          <div className="mb-12 flex items-end">
            <div className="mr-2 text-lg font-semibold">Your Word</div>
            <input
              className="w-64 rounded-lg border border-blue-200 bg-blue-50 px-2 py-1 placeholder-blue-400"
              placeholder="Add your word"
            />
          </div>
          <Link passHref href="/">
            <a className="rounded-lg bg-blue-600 px-3 py-2 font-medium text-white hover:bg-blue-700">
              Generate Wordle
            </a>
          </Link>
        </div>
      </main>

      <footer className="flex h-24 w-full items-center justify-center border-t">
        <a
          className="flex items-center justify-center"
          href="https://twitter.com/deepwhitman"
          target="_blank"
          rel="noopener noreferrer"
        >
          Built with <span className='mx-1 text-blue-600'>&#9829;</span> by Bilal Tahir          
        </a>
      </footer>
    </div>
  )
}
