import Head from 'next/head'

function SEO() {
  return (
    <Head>
      <title>Another Wordle</title>
      <link rel="icon" href="/favicon.ico" />
      <meta name="twitter:card" content="summary_large_image" key="twcard" />
      <meta
        property="og:url"
        content="https://another-wordle.vercel.app"
        key="ogurl"
      />
      <meta
        property="og:image"
        content="https://another-wordle.vercel.app/preview.jpeg"
        key="ogimage"
      />
      <meta
        property="og:title"
        content="Another Wordle"
        key="ogtitle"
      />
      <meta
        property="og:description"
        content="Generate your custom wordle and share with friends."
        key="ogdesc"
      />
    </Head>
  )
}

export default SEO
