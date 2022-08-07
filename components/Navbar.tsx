import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { useEffect, useRef, useState } from 'react'

import { faBars, faSearch } from '@fortawesome/free-solid-svg-icons'
import styles from '../styles/Navbar.module.css'

import Link from 'next/link'
import { useColorMode } from '@chakra-ui/react'

import colors from '../src/colors'

interface NavbarProps {
  onClickSearch: () => void
  position?: 'fixed' | 'sticky'

  forceShadow?: boolean
  noTransparent?: boolean
}

const Navbar = (
  {
    onClickSearch,
    position = 'fixed',
    forceShadow,
    noTransparent
  }: NavbarProps
) => {
  const [navNotSeen, setNavNotSeen] = useState(false),
    ref = useRef<HTMLDivElement>(),
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
    <div
      ref={ref as any}
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
      <div className={styles.navLeft}>
        <Link href='/'>
          <div className={styles.title}>
            CrackedFlix
          </div>
        </Link>
      </div>

      <div className={styles.navRight}>
        <div className={styles.icon}>
          <FontAwesomeIcon
            icon={faSearch}
            onClick={onClickSearch}
          />
        </div>

        <div>
          <FontAwesomeIcon icon={faBars} />
        </div>
      </div>
    </div>
  )
}

export default Navbar