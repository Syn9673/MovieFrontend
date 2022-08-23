import { Alert, AlertDescription, AlertIcon, AlertTitle, Link } from '@chakra-ui/react'
import styles from '../../styles/Payment.module.sass'

import NextLink from 'next/link'

const PaymentSuccess = () => (
  <div className={styles.container}>
    <Alert
      status='error'
      variant='subtle'
      flexDirection='column'
      alignItems='center'
      justifyContent='center'
      textAlign='center'
      height='200px'
      borderRadius='md'
      maxWidth='lg'
    >
      <AlertIcon boxSize='40px' mr={0} />
      <AlertTitle mt={4} mb={1} fontSize='lg'>
        Payment Failed
      </AlertTitle>
      <AlertDescription maxWidth='sm'>
        <div>
          Payment has failed. Money wasn't deducted from your account. Please try again.
        </div>

        <NextLink
          href='/'
          passHref
        >
          <Link color='cyan.300'>
            Return to home page
          </Link>
        </NextLink>
      </AlertDescription>
    </Alert>
  </div>
)

export default PaymentSuccess