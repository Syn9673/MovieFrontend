import {
  Input,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  useColorMode
} from '@chakra-ui/react'
import { useState } from 'react'

import Button from './Button'
import Router from 'next/router'

import colors from '../src/colors'
import { SearchProps } from '../src/types/components'

import styles from '../styles/Input.module.sass'
import CustomInput from './Input'

const Search = (
  {
    isOpen,
    onClose,

    initial,
    onSearch
  }: SearchProps
) => {
  const [searchInput, setSearchInput] = useState(initial ?? ''),
    { colorMode } = useColorMode()

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      blockScrollOnMount={false}
      isCentered
    >
      <ModalOverlay style={{ outline: 'none' }} />
      <ModalContent
        borderRadius='0'
        bg={
          colorMode === 'dark' ?
            colors.dark :
            colors.light
        }
      >
        <ModalCloseButton />

        <ModalHeader>
          Search for Shows & Videos
        </ModalHeader>
        
        <ModalBody>
          <CustomInput
            placeholder='Content Title'
            size='lg'
            onChange={(e) => setSearchInput(e.target.value)}
            value={searchInput}
            className={styles.input}
          />
        </ModalBody>

        <ModalFooter>
          <Button
            color='green'
            fullWidth
            centered
            onClick={
              () => {
                if (!onSearch)
                  Router.push(`/browse/search/${searchInput}`)                
                else onSearch(searchInput)
                
                onClose()
              }
            }
          >
            Search
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  )
}

export default Search