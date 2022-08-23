import { Box } from '@chakra-ui/react'
import { PayPalButtons, PayPalScriptProvider } from '@paypal/react-paypal-js'

import ChangeTheme from '../components/ChangeTheme'
import Input from '../components/Input'

import axios from 'axios'
import Paypal from '../components/Paypal'

const Test = () => (
  
  <Paypal tier={2} />
)

/*<Box className='pay'>
      <PayPalScriptProvider
      options={
        {
          'client-id': ''
        }
      }
    >
      <PayPalButtons
        style={
          { color: 'blue', label: 'pay', tagline: false, layout: 'horizontal' }
        }
        createOrder={
          async () => {
            const res = await axios.post(
              'http://localhost:8080/api/orders/',
              { orderID: '2' }
            )

            console.log(res.data)
            return res.data.value.id
          }
        }

        onApprove={
          async (data, actions) => {
            console.log(data)
            const res = await axios.post(
              `http://localhost:8080/api/order/${data.orderID}`
            )

            console.log(res.data)
            return
          }
        }
      />
    </PayPalScriptProvider>
      </Box>*/

export default Test