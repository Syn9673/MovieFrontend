import type { AppProps } from 'next/app'
import Head from 'next/head'

import {
  ChakraProvider, extendTheme, StyleFunctionProps
} from '@chakra-ui/react'
 
// styles
import '../styles/globals.sass'
import 'swiper/css'

import 'swiper/css/pagination'
import 'swiper/css/navigation'

import '@fortawesome/fontawesome-svg-core/styles.css'

const config = {
    initialColorMode: 'dark',
    useSystemColorMode: false,
  },
  theme = extendTheme(
    {
      config,
      styles: {
        global: (props: StyleFunctionProps) => ({
          body: {
            bg: props.colorMode === 'dark' ? 'gray.900' : 'gray.200'
          }
        })
      },
      components: {
        Text: {
          baseStyle: {
            fontFamily: 'Lato'
          }
        }
      }
    }
  )

const App = (
  { Component, pageProps } : AppProps
) => {
  return (
    <>
      <Head>
        <title>CrackedFlix</title>
        <meta name="viewport" content="initial-scale = 1.0,maximum-scale = 1.0" />
      </Head>

      <ChakraProvider theme={theme}>
        <Component {...pageProps} />
      </ChakraProvider>
    </>
  )
}

export default App