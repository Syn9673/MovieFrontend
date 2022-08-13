import HCaptcha from '@hcaptcha/react-hcaptcha'
import axios from 'axios'

import { useState } from 'react'
import {
  Box,
  Flex,
  FormControl,
  FormLabel,
  Heading,
  Input,
  useColorMode
} from '@chakra-ui/react'

import styles from '../styles/Login.module.sass'
import ChangeTheme from '../components/ChangeTheme'
import Button from '../components/Button'

const LoginPage = () => {
  // states
  const { colorMode } = useColorMode(),
    [captchaResponse, setCaptchaResponse] = useState(''),
    [requestError, setRequestError] = useState('')

  // callbacks
  const onVerify = (token: string) => setCaptchaResponse(token),
    onSubmit = () => {}

  return (
    <>
      <ChangeTheme />

      <Box>
        <Flex
          className={styles.container}
          justify='center'
          align='center'
          flexDirection='column'
          gap='4'
        >
          <Heading textAlign='center'>
            CrackedFlix Login
          </Heading>

          { /* Login Form */ }
          <Box bgColor='gray.800'>
            <Flex
              my='16'
              mx='8'
              flexDirection='column'
              gap='4'
            >
              <FormControl>
                <FormLabel>Email Address</FormLabel>
                <Input
                  type='email'
                />
              </FormControl>

              <FormControl>
                <FormLabel>Password</FormLabel>
                <Input
                  type='password'
                />
              </FormControl>

              <HCaptcha
                sitekey={''}
                onVerify={onVerify}
              />

              <Button
                color='green'
                centered
              >
                Login
              </Button>
            </Flex>
          </Box>
        </Flex>
      </Box>
    </>
  )
}

export default LoginPage