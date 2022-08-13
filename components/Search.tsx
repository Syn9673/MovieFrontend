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

const Search = (
  {
    isOpen,
    onClose,

    initial
  }: SearchProps
) => {
  const [searchInput, setSearchInput] = useState(initial ?? ''),
    { colorMode } = useColorMode(),
    onClickSearch = () => {
      Router.push(
        `/browse/${searchInput}`
      )
    }

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
          <Input
            placeholder='Content Title'
            size='lg'
            onChange={(e) => setSearchInput(e.target.value)}
            value={searchInput}
          />
        </ModalBody>

        <ModalFooter>
          <Button
            color='green'
            fullWidth
            centered
            onClick={
              () => {
                onClickSearch()
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