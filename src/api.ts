import { APIOptions } from '../src/types/components'
import axios from 'axios'

class Api {
  public static async call(
    {
      url,
      method,
      captcha,
      token
    }: APIOptions
  ) {
    try {
      const axiosOptions: any = {
        url,
        method: method?.toLowerCase() ?? 'get',
        headers: {},
        body: undefined
      }

      if (token)
        axiosOptions.headers.Authorization = token
      
      if (captcha && axiosOptions.body)
        axiosOptions.body.captchaResponse = captcha
        
      const res = await axios(axiosOptions)
      return res.data?.value
    } catch { 
      return false
    }
  } 
}

export default Api