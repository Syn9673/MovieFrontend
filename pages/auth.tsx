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
  useColorMode,
  useToast
} from '@chakra-ui/react'

import styles from '../styles/Login.module.sass'
import ChangeTheme from '../components/ChangeTheme'

import Button from '../components/Button'
import { setCookie } from 'cookies-next'

import Router from 'next/router'
import colors from '../src/colors'

const routes = [
  '/users?token=true',
  '/users/token'
],
  TOAST_TIMEOUT = 5000

const LoginPage = () => {
  // states
  const { colorMode } = useColorMode(),
    [errorMessage, setErrorMessage] = useState(''),
    [primaryField, setPrimaryField] = useState(''),
    [secondaryField, setSecondaryField] = useState(''),
    [password, setPassword] = useState(''),
    [isLogin, setIsLogin] = useState(true),
    [successMessage, setSuccessMessage] = useState(''),
    toast = useToast()

  // refs
  const hCaptcha = useRef<HCaptcha>(null)

  // callbacks
  const onVerify = async (token: string) => {
      const data: {
        email?: string
        username?: string

        captchaResponse: string
        password: string
      } = {
        captchaResponse: token,
        password
      }

      if (isLogin) {
        if (primaryField.match(/.+@.+\..+/g))
          data.email = primaryField
        else data.username = primaryField
      } else {
        data.username = primaryField
        data.email = secondaryField
      }
    
      // send request here
      try {
        const res = await axios.post(
          process.env.API_URL + routes[Number(isLogin)],
          data
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
            
          toast(
            {
              title: 'Request successful',
              description: `Successfully ${message}. Redirecting...`,
              status: 'success',
              duration: 5000,
              isClosable: true,
              position: 'bottom-right'
            }
          )
          setTimeout(() => Router.push('/browse'), 2000)
        }
      } catch(e) {
        const err = e as any,
          msg = err.response?.data?.message ?? err.message ?? 'Something went wrong.'

        toast(
          {
            title: 'Request Failed',
            description: msg,
            status: 'error',
            duration: TOAST_TIMEOUT,
            isClosable: true,
            position: 'bottom-right'
          }
        )
      }
    },
    onButtonClick = () => {
      hCaptcha.current?.execute()
      hCaptcha.current?.resetCaptcha()

      setErrorMessage('')
      setSuccessMessage('')

      toast(
        {
          title: 'Opening Captcha',
          description: 'Attempting to open captcha.',
          status: 'loading',
          duration: TOAST_TIMEOUT,
          isClosable: true,
          position: 'bottom-right'
        }
      )
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
          bg={colorMode === 'dark' ? colors.slightDark : 'white'}
          boxSize={isLogin ? 'md' : 'lg'}
          shadow='xl'
          paddingX='20px'
          borderRadius='md'
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
                {isLogin ? 'Login' : 'Sign Up'}
              </Heading>

              <Text color='gray.400'>
                to CrackedFlix
              </Text>
            </Flex>

            <FormControl>
              <FormLabel>
                {isLogin ? 'Username or Email' : 'Username'}
              </FormLabel>
              <Input
                type='username'
                placeholder={isLogin ? 'Username or Email' : 'Username'}
                onChange={(e) => setPrimaryField(e.target.value)}
              />
            </FormControl>

            {
              isLogin ? null : (
                <FormControl>
                  <FormLabel>
                    Email Address
                  </FormLabel>
                  <Input
                    type='email'
                    placeholder='user@example.com'
                    onChange={(e) => setSecondaryField(e.target.value)}
                  />
                </FormControl>
              )
            }

            <FormControl>
              <FormLabel>Password</FormLabel>
              <Input
                type='password'
                placeholder='Secure Password'
                onChange={(e) => setPassword(e.target.value)}
              />
            </FormControl>

            <FormControl
              display='flex'
              alignItems='center'
            >
              <FormLabel mb='0'>Don&apos;t have an account?</FormLabel>
              <Switch
                onChange={() => setIsLogin(!isLogin)}
                isChecked={!isLogin}
              />
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
                onError={console.error}
                onOpen={
                  () => {
                    toast(
                      {
                        title: 'Captcha Opened',
                        description: 'Captcha successfully opened.',
                        status: 'success',
                        duration: TOAST_TIMEOUT,
                        isClosable: true,
                        position: 'bottom-right'
                      }
                    )
                  }
                }
              />

              <Button
                color='purple'
                onClick={onButtonClick}
                centered
                fullWidth
              >
                {isLogin ? 'Login' : 'Signup'}
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