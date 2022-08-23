import { PayPalButtons } from '@paypal/react-paypal-js'
import styles from '../styles/Paypal.module.sass'

import axios from 'axios'
import { getCookie } from 'cookies-next'

import Router from 'next/router'

const Paypal = (
  { tier }: { tier: number }
) => {
  const createOrder = async () => {
      try {
        const token = getCookie('crackedflix-user-token'),
          res = await axios.post(
            process.env.API_URL + '/orders',
            { tier },
            {
              headers: {
                Authorization: token as string
              }
            }
          )

        return res.data.value?.id
      } catch {
        return ''
      }
    },
    onApprove = async (data: any) => {
      try {
        await axios.post(
          process.env.API_URL + `/order/${data.orderID}`
        )

        console.log('Approved!')
        Router.push('/payments/success')
      } catch {
        Router.push('/payments/failed')
      }
    }

  return (
    <div className={styles.paypalButton}>
      <PayPalButtons
        style={ 
          {
            color: 'blue',
            label: 'pay',
            tagline: false,
            layout: 'horizontal'
          }
        }
        createOrder={createOrder}
        onApprove={onApprove}
      />
    </div>
  )
}

export default Paypal