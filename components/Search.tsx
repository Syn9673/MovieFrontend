import {
  Input,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay
} from '@chakra-ui/react'
import { useRef, useState } from 'react'

import Button from './Button'
import Router from 'next/router'

interface SearchProps {
  isOpen: boolean
  onClose: () => void

  initial?: string
}

const Search = (
  {
    isOpen,
    onClose,

    initial
  }: SearchProps
) => {
  const ref = useRef(null),
    [searchInput, setSearchInput] = useState(initial ?? ''),
    onClickSearch = () => {
      Router.push(
        `/browse/${searchInput}`
      )
    }

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      initialFocusRef={ref}
      blockScrollOnMount={false}
      isCentered
    >
      <ModalOverlay style={{ outline: 'none' }} />
      <ModalContent>
        <ModalCloseButton />

        <ModalHeader>
          Search for Content
        </ModalHeader>
        
        <ModalBody>
          <Input
            placeholder='Content Title'
            size='lg'
            ref={ref}
            onChange={
              (e) => setSearchInput(e.target.value)
            }
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