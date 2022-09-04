import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { useEffect, useRef, useState } from 'react'

import { faCaretDown, faSearch, faUserCircle } from '@fortawesome/free-solid-svg-icons'
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
  MenuDivider,
  Flex
} from '@chakra-ui/react'

import colors from '../src/colors'
import { NavbarProps } from '../src/types/components'

import Router from 'next/router'
import { deleteCookie, getCookie } from 'cookies-next'

import { User } from '../src/types/data'
import Api from '../src/api'

const Navbar = (
  {
    onClickSearch,
    position = 'fixed',
    forceShadow,
    noTransparent
  }: NavbarProps
) => {
  // states
  const [navNotSeen, setNavNotSeen] = useState(false),
    [user, setUser] = useState<User>(),
    { colorMode } = useColorMode()

  // refs
  const ref = useRef<HTMLDivElement>(null)

  // callbacks
  const onScroll = () => setNavNotSeen(
      !(window.scrollY <= (ref.current?.clientHeight ?? 0))
    ),
    logout = () => {
      deleteCookie('crackedflix-user-token')
      Router.push('/auth')
    },
    login = () => Router.push('/auth'),
    purchase = () => Router.push('/payments'),
    userPage = () => Router.push('/user')

  useEffect(
    () => {
      const token = getCookie('crackedflix-user-token') as string
      if (token && !user) {
        (
          async() => {
            const userData = await Api.call(
              {
                url: process.env.API_URL + '/user',
                method: 'GET',
                token
              }
            ) as User

            if (userData)
              setUser(userData)
          }
        )()
      }

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
            {
              user ? (
                <>
                  <MenuGroup>
                    <MenuItem onClick={userPage}>
                      <Flex
                        justify='center'
                        align='center'
                        gap='2'
                      >
                        <FontAwesomeIcon icon={faUserCircle} />

                        {user.username}
                      </Flex>
                    </MenuItem>
                  </MenuGroup>

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
                </>
              ) : (
                <>
                  <MenuGroup>
                    <MenuItem onClick={login}>
                      Login
                    </MenuItem>
                  </MenuGroup>
                </>
              )
            }
          </MenuList>
        </Menu>
      </Box>
    </Box>
  )
}

export default Navbar