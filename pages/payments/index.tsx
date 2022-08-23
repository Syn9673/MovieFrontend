import { GetServerSideProps } from 'next'
import axios from 'axios'

import { Plan } from '../../src/types/data'
import {
  Box,
  Flex,
  Heading,
  Text,
  useColorMode
} from '@chakra-ui/react'

import styles from '../../styles/Plans.module.sass'
import colors from '../../src/colors'

import ChangeTheme from '../../components/ChangeTheme'
import Paypal from '../../components/Paypal'

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCheckCircle } from '@fortawesome/free-solid-svg-icons'

const Payments = (
  { plans }: {
    plans: Plan[]
  }
) => {
  const { colorMode } = useColorMode()

  return (
    <Flex
      width='100vw'
      height='100vh'
      flexDirection='column'
      wrap='wrap'
      justify='center'
      align='center'
      gap='10'
    >
      <ChangeTheme />

      <Heading size='2xl'>
        Choose a Plan
      </Heading>

      <Flex
        wrap='wrap'
        gap='5'
      >
        {
          plans.length > 0 ? (
            plans.map(
              (plan, index) => (
                <Box
                  key={index}
                  bg={colorMode === 'dark' ? colors.slightDark : 'gray.300'}
                  shadow='lg'
                  borderRadius='md'
                  className={styles.box}
                >
                  <Flex
                    justify='center'
                    flexDirection='column'
                    className={styles.plan}
                    align='center'
                    gap='3'
                    height='100%'
                  >
                    <Heading size='lg'>
                      {plan.name}
                    </Heading>

                    <Flex
                      flexDirection='column'
                      align='center'
                      justify='center'
                    >
                      {
                        plan.features.map(
                          (feature, index) => (
                            <Flex
                              key={index}
                              justify='center'
                              align='center'
                              gap='1'
                            >
                              <FontAwesomeIcon
                                color='#0BF275'
                                icon={faCheckCircle}
                              />

                              <Text
                                fontSize='sm'
                                color='gray.600'
                                key={index}
                                textAlign='center'
                              >
                                {feature}
                              </Text>
                            </Flex>
                          )
                        )
                      }
                    </Flex>

                    <Text>
                      *at ${plan.price}/month
                    </Text>

                    <Paypal tier={plan.tier} />
                  </Flex>
                </Box>
              )
            )
          ) : (
            <Text>
              No Plans found.
            </Text>
          )
        }
      </Flex>
    </Flex>
  )
}

const getServerSideProps: GetServerSideProps = async () => {
  try {
    const res = await axios(
      process.env.API_URL + '/plans'
    )

    return {
      props: {
        plans: res.data.value
      }
    }
  } catch {}

  return {
    props: { plans: [] }
  }
}

export { getServerSideProps }
export default Payments