import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { useEffect, useRef, useState } from 'react'

import { faBars, faSearch } from '@fortawesome/free-solid-svg-icons'
import styles from '../styles/Navbar.module.css'

import Link from 'next/link'
import { useColorMode } from '@chakra-ui/react'
import colors from '../src/colors'

const Navbar = () => {
  const [navNotSeen, setNavNotSeen] = useState(false),
    ref = useRef<HTMLDivElement>(),
    { colorMode } = useColorMode(),
    onScroll = () => setNavNotSeen(
      !(window.scrollY < (ref.current?.clientHeight ?? 0) / 2)
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
          color: !navNotSeen && colorMode === 'light' ? 'white' : undefined,
          backgroundColor: navNotSeen ? (
            colorMode === 'dark' ?
              colors.dark :
              colors.light
          ) : 'transparent',
          boxShadow: navNotSeen ? (
            '0px 2px 10px ' + (
              colorMode === 'dark' ?
                colors.dark :
                colors.light
            )
          ) : 'none'
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
          <FontAwesomeIcon icon={faSearch}/>
        </div>

        <div>
          <FontAwesomeIcon icon={faBars} />
        </div>
      </div>
    </div>
  )
}

export default Navbar