/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,

  env: {
    CAPTCHA_SITE_KEY: '8ac8abc6-9aba-4cbc-a600-ad5df1f82889',
    CAPTCHA_SECRET_KEY_: '0x369E149Add1376dEE1bd2D33adB01d4B802ef3B5',

    API_URL: 'http://localhost:8080/api'
  }
}

module.exports = nextConfig
