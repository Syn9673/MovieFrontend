import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { useEffect, useRef, useState } from 'react'

import { faCaretDown, faSearch } from '@fortawesome/free-solid-svg-icons'
import styles from '../styles/Navbar.module.sass'

import Link from 'next/link'
import {
  Box,
  Menu,
  MenuButton,
  MenuGroup,
  useColorMode,
  MenuList,
  MenuItem,
  MenuDivider
} from '@chakra-ui/react'

import colors from '../src/colors'
import { NavbarProps } from '../src/types/components'

import Router from 'next/router'
import { deleteCookie } from 'cookies-next'

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
      !(window.scrollY <= (ref.current?.clientHeight ?? 0))
    ),
    logout = () => {
      deleteCookie('crackedflix-user-token')
      Router.push('/auth')
    },
    purchase = () => Router.push('/payments')

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
              colors.darker :
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
        
        <Menu>
          <MenuButton as={Box}>
            <FontAwesomeIcon icon={faCaretDown} />
          </MenuButton>

          <MenuList fontSize='md' color='initial'>
            <MenuGroup>
              <MenuItem onClick={purchase}>
                Purchase Plans
              </MenuItem>
            </MenuGroup>

            <MenuDivider />

            <MenuGroup>
              <MenuItem onClick={logout}>
                Logout
              </MenuItem>
            </MenuGroup>
          </MenuList>
        </Menu>
      </Box>
    </Box>
  )
}

export default Navbar