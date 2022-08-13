import { useColorMode } from '@chakra-ui/react'
import { faMoon, faSun } from '@fortawesome/free-solid-svg-icons'

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import styles from '../styles/Theme.module.sass'

const ChangeTheme = () => {
  const { colorMode, toggleColorMode } = useColorMode()

  return (
    <div className={styles.theme}>
      <div
        onClick={toggleColorMode}
      >
        <FontAwesomeIcon
          icon={
            colorMode === 'dark' ? 
              faSun : 
              faMoon
          }
        />
      </div>
    </div>
  )
}

export default ChangeTheme