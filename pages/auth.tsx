import HCaptcha from '@hcaptcha/react-hcaptcha'
import axios from 'axios'

import { useRef, useState } from 'react'
import {
  Box,
  Flex,
  FormControl,
  FormLabel,
  Heading,
  Input,
  Switch,
  Text,
  useColorMode
} from '@chakra-ui/react'

import styles from '../styles/Login.module.sass'
import ChangeTheme from '../components/ChangeTheme'

import Button from '../components/Button'
import { setCookie } from 'cookies-next'

import Router from 'next/router'

const routes = [
  '/users?token=true',
  '/users/token'
]

const LoginPage = () => {
  // states
  const { colorMode } = useColorMode(),
    [errorMessage, setErrorMessage] = useState(''),
    [email, setEmail] = useState(''),
    [password, setPassword] = useState(''),
    [isLogin, setIsLogin] = useState(true),
    [successMessage, setSuccessMessage] = useState('')

  // refs
  const hCaptcha = useRef<HCaptcha>(null)

  // callbacks
  const onVerify = async (token: string) => {      
      // send request here
      try {
        const res = await axios.post(
          process.env.API_URL + routes[Number(isLogin)],
          {
            captchaResponse: token,
            email,
            password
          }
        )
        
        if (res.data?.error)
          setErrorMessage(res.data.message ?? 'Request Failed')
        else if (!res.data?.error) { // success
          setCookie(
            'crackedflix-user-token',
            res.data.value,
            { maxAge: 60 * 60 * 24 }
          )

          const message = isLogin ? (
              'logged in'
            ) : 'created your account'
            
          setSuccessMessage(`Successfully ${message}. Redirecting...`)
          setTimeout(() => Router.push('/browse'), 2000)
        }
      } catch(e) {
        const err = e as any

        if (err.response?.data?.message)
          setErrorMessage(err.response.data.message)
        else setErrorMessage(err.message)
      }
    },
    onButtonClick = () => {
      hCaptcha.current?.execute()
      hCaptcha.current?.resetCaptcha()

      setErrorMessage('')
      setSuccessMessage('')
    }
    

  return (
    <>
      <ChangeTheme />

      <Flex
        className={styles.container}
        justify='center'
        align='center'
        wrap='wrap'
        padding='5px'
      >
        <Box
          bg={
            colorMode === 'dark' ? 'gray.700' : 'white'
          }
          boxSize='md'
          shadow='xl'
          paddingX='20px'
        >
          <Flex
            flexDirection='column'
            wrap='wrap'
            gap='4'
            justify='center'
            height='100%'
          >
            <Flex
              flexDirection='column'
              wrap='wrap'
            >
              <Heading>
                {
                  isLogin ? 'Login' : 'Sign Up'
                }
              </Heading>

              <Text color='gray.400'>
                to CrackedFlix
              </Text>
            </Flex>

            <FormControl>
              <FormLabel>Email Address</FormLabel>
              <Input
                type='email'
                placeholder='user@example.com'
                onChange={(e) => setEmail(e.target.value)}
              />
            </FormControl>

            <FormControl>
              <FormLabel>Password</FormLabel>
              <Input
                type='password'
                placeholder='Secure Password'
                onChange={(e) => setPassword(e.target.value)}
              />
            </FormControl>

            <FormControl>
              <Flex align='center'>
                <FormLabel>Don&apos;t have an account?</FormLabel>
                <Switch
                  onChange={() => setIsLogin(!isLogin)}
                  isChecked={!isLogin}
                />
              </Flex>
            </FormControl>

            <Flex
              flexDirection='column'
              align='center'
              wrap='wrap'
              textAlign='center'
            >
              <HCaptcha
                sitekey={process.env.CAPTCHA_SITE_KEY ?? ''}
                ref={hCaptcha}
                size='invisible'
                onVerify={onVerify}
              />

              <Button
                color='purple'
                onClick={onButtonClick}
                centered
                style={{ width: '100%' }}
              >
                Submit
              </Button>

              {
                errorMessage ? (
                  <Text color='red.300'>
                    {errorMessage}
                  </Text>
                ) : null
              }

              {
                successMessage ? (
                  <Text color='green.300'>
                    {successMessage}
                  </Text>
                ) : null
              }
            </Flex> 
          </Flex>
        </Box>
      </Flex>
    </>
  )
}

export default LoginPage