/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,

  env: {
    CAPTCHA_SITE_KEY: '8ac8abc6-9aba-4cbc-a600-ad5df1f82889',
    API_URL: 'http://localhost:8080/api',

    PAYPAL_CLIENT_ID: 'AZkYOvmHW1sxQxbEGZaosAsUudgDBQe9UKpwkJHQKunUf8fDm2oy2LcDUZz0OkO3E3oshUcXFtlwc7EX'
  }
}

module.exports = nextConfig
