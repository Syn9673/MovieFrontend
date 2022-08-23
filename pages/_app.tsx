import type { AppProps } from 'next/app'
import Head from 'next/head'

import {
  Box,
  ChakraProvider, extendTheme, Spinner, StyleFunctionProps, Text
} from '@chakra-ui/react'
 
// styles
import '../styles/globals.sass'
import 'swiper/css'

import 'swiper/css/pagination'
import 'swiper/css/navigation'

import '@fortawesome/fontawesome-svg-core/styles.css'
import { useEffect, useState } from 'react'

import colors from '../src/colors'
import { PayPalScriptProvider } from '@paypal/react-paypal-js'

const config = {
    initialColorMode: 'dark',
    useSystemColorMode: false,
  },
  theme = extendTheme(
    {
      config,
      styles: {
        global: (props: StyleFunctionProps) => ({
          'html, body': {
            background: props.colorMode === 'dark' ? colors.dark : 'gray.200'
          }
        })
      },
      components: {
        Text: {
          baseStyle: {
            fontFamily: 'Lato'
          }
        },

        Menu: {
          baseStyle: (props: StyleFunctionProps) => ({
            list: {
              bg: props.colorMode === 'dark' ? colors.dark : 'gray.100'
            }
          })
        }
      }
    }
  )

const App = (
  { Component, pageProps } : AppProps
) => {
  const [hasLoaded, setHasLoaded] = useState(false)

  useEffect(
    () => {
      setHasLoaded(true)

      const timeout = setTimeout(
        () => {
          if (!hasLoaded)
            setHasLoaded(true)
        },
        10 * 1000 // max timeout
      )
      return () => clearTimeout(timeout)
    },
    []
  )

  return (
    <>
      <Head>
        <title>CrackedFlix</title>
        <meta name="viewport" content="initial-scale = 1.0,maximum-scale = 1.0" />
      </Head>

      <ChakraProvider theme={theme}>
        <PayPalScriptProvider
          options={
            {
              'client-id': process.env.PAYPAL_CLIENT_ID ?? ''
            } 
          }
        >
          {
            hasLoaded ? (
              <Component {...pageProps} />
            ) : (
              <Box
                height='100vh'
                display='flex'
                flexDirection='column'
                justifyContent='center'
                alignItems='center'
              >
                <Spinner color='purple.500' size='xl' thickness='4px' />
                <Text>
                  Loading...
                </Text>
              </Box>
            )
          }
          </PayPalScriptProvider>
      </ChakraProvider>
    </>
  )
}

export default App