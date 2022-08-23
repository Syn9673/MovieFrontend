import { Alert, AlertDescription, AlertIcon, AlertTitle, Link } from '@chakra-ui/react'
import styles from '../../styles/Payment.module.sass'

import NextLink from 'next/link'

const PaymentSuccess = () => (
  <div className={styles.container}>
    <Alert
      status='success'
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
        Payment Successful
      </AlertTitle>
      <AlertDescription maxWidth='sm'>
        <div>
          Payment was successful. Plan has been applied to your account.
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