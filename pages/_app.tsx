import type { AppProps } from 'next/app'
import Head from 'next/head' 
 
// styles
import '../styles/globals.css'
import 'swiper/css'

import 'swiper/css/pagination'
import 'swiper/css/navigation'

const App = (
  { Component, pageProps } : AppProps
) => (
  <>
    <Head>
      <title>CrackedFlix</title>
      <meta name="viewport" content="initial-scale = 1.0,maximum-scale = 1.0" />
    </Head>

    <Component {...pageProps} />
  </>
)

export default App