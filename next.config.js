/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,

  env: {
    CAPTCHA_SITE_KEY: '8ac8abc6-9aba-4cbc-a600-ad5df1f82889',
    API_URL: 'http://localhost:8080/api',

    PAYPAL_CLIENT_ID: 'ATHwo0fjvsjSAraV-aQXo2ZNM0Fy4gie1mUcHBHEO9K5tXIwGfB166b8egqMOGUneela36QTfOhWg33O'
  }
}

module.exports = nextConfig
