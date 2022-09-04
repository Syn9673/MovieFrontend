import { Flex, Heading, Text } from '@chakra-ui/react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

import Button from '../components/Button'
import { faArrowRight } from '@fortawesome/free-solid-svg-icons'

import Router from 'next/router'

const User = () => (
  <Flex
    justify='center'
    align='center'
    width='100vw'
    height='100vh'
    direction='column'
    gap='2'
  >
    <Heading>
      Oops!
    </Heading>
    
    <Text>
      This page is still under construction. Please come back again soon.
    </Text>

    <Button
      color='red'
      icon={
        <FontAwesomeIcon icon={faArrowRight} />
      }
      onClick={
        () => Router.back()
      }
    >
      Go Back
    </Button>
  </Flex>
)

export default User