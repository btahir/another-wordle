import Head from 'next/head'

function SEO() {
  return (
    <Head>
      <title>Another Wordle</title>
      <link rel="icon" href="/favicon.ico" />
      <meta name="twitter:card" content="summary_large_image" key="twcard" />
      <meta
        property="og:url"
        content="https://twitter-images.vercel.app"
        key="ogurl"
      />
      <meta
        property="og:image"
        content="https://twitter-images.vercel.app/preview.jpeg"
        key="ogimage"
      />
      <meta
        property="og:title"
        content="Twitter Card Image Creator"
        key="ogtitle"
      />
      <meta
        property="og:description"
        content="Instantly create perfectly sized Twitter Images"
        key="ogdesc"
      />
    </Head>
  )
}

export default SEO
