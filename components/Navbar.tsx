import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { useEffect, useRef, useState } from 'react'

import { faBars, faSearch } from '@fortawesome/free-solid-svg-icons'
import styles from '../styles/Navbar.module.sass'

import Link from 'next/link'
import { Box, useColorMode } from '@chakra-ui/react'

import colors from '../src/colors'
import { NavbarProps } from '../src/types/components'

const Navbar = (
  {
    onClickSearch,
    position = 'fixed',
    forceShadow,
    noTransparent
  }: NavbarProps
) => {
  const [navNotSeen, setNavNotSeen] = useState(false),
    ref = useRef<HTMLDivElement>(null),
    { colorMode } = useColorMode(),
    onScroll = () => setNavNotSeen(
      !(window.scrollY <= 0)
    )

  useEffect(
    () => {      
      window.addEventListener('scroll', onScroll)
      return () => window.removeEventListener('scroll', onScroll)
    },
    []
  )

  return (
    <Box
      ref={ref}
      className={styles.nav}
      style={
        { 
          color: !navNotSeen && !noTransparent && colorMode === 'light' ? 'white' : undefined,
          backgroundColor: noTransparent || navNotSeen ? (
            colorMode === 'dark' ?
              colors.dark :
              colors.light
          ) : 'transparent',

          boxShadow: forceShadow || navNotSeen ? (
            '0px 2px 15px ' + (
              colors.shadow
            )
          ) : 'none',
          position
        }
      }
    >
      <Box className={styles.navLeft}>
        <Link href='/'>
          <Box className={styles.title}>
            CrackedFlix
          </Box>
        </Link>
      </Box>

      <Box className={styles.navRight}>
        <Box className={styles.icon}>
          <FontAwesomeIcon
            icon={faSearch}
            onClick={onClickSearch}
          />
        </Box>

        <Box>
          <FontAwesomeIcon icon={faBars} />
        </Box>
      </Box>
    </Box>
  )
}

export default Navbar