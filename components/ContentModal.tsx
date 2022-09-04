import {
  Image,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalCloseButton,
  ModalHeader,
  Divider,
  Flex,
  ModalBody,
  Text,
  Box,
  ModalFooter,
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
  Button,
  useColorMode
} from '@chakra-ui/react'
import { ContentModalProps } from '../src/types/components'

import Badge from './Badge'
import CustomButton from './Button'

import Router from 'next/router'
import styles from '../styles/ContentModal.module.sass'

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faChevronDown } from '@fortawesome/free-solid-svg-icons'

import colors from '../src/colors'

const ContentModal = (
  {
    isOpen,
    onClose,
    data,
    onSeasonChange = () => {},
    episodes = [],
    season
  }: ContentModalProps
) => {
  const onClickPlay = () => {
      if (!data) return
      Router.push(`/browse/${data._id}`)
    },
    { colorMode } = useColorMode()

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
    >
      <ModalOverlay />
      <ModalContent
        borderRadius='md'
        bg={
          colorMode === 'dark' ?
            colors.dark :
            colors.light
        }
      >
        <Image
          src={data?.images?.thumbnail ?? ''}
          fallbackSrc='https://via.placeholder.com/1920x1080'
          width='100%'
          borderTopRadius='md'
          alt='Thumbnail'
        />

        <ModalCloseButton />

        <ModalHeader>
          {data?.meta.title ?? 'No Title Provided.'}
        </ModalHeader>

        <Divider />

        <ModalBody>
          <Flex
            flexDirection='column'
            gap='2'
          >
            <Flex gap='2'>
              {
                data?.badges?.map(
                  (badge, index) => (
                    <Badge
                      color='green'
                      key={index}
                    >
                      {badge}
                    </Badge>
                  )
                )
              }
            </Flex>

            <Text>
              {data?.meta.desc ?? 'No Description available.'}
            </Text>

            {
              data?.series ? (
                <Menu>
                  <MenuButton
                    as={Button}
                    rightIcon={
                      <FontAwesomeIcon
                        icon={faChevronDown}
                      />
                    }
                  >
                    {season ? 'Season ' + season : 'List of Seasons'}
                  </MenuButton>
                  <MenuList>
                    {
                      data.series?.episodes.map(
                        (_, index) => (
                          <MenuItem
                            key={index}
                            onClick={() => onSeasonChange(index + 1)}
                          >
                            Season {index + 1}
                          </MenuItem>
                        )
                      )
                    }
                  </MenuList>
                </Menu>
              ) : null
            }
          </Flex>
        </ModalBody>

        <Divider />

        { /* Episodes */ }
        {
          episodes.map(
            (episode, index) => (
              <Box
                key={index}
                className={styles.episode}
                padding='10px'
                paddingX='30px'
                onClick={
                  () => Router.push(
                    `/browse/${data?._id}?s=${season}&e=${index + 1}`
                  )
                }
              >
                <Flex flexDirection='column'>
                  <Text
                    fontFamily='Bebas Neue'
                    fontSize='3xl'
                  >
                    {episode.title}
                  </Text>

                  <Text fontFamily='Lato' color='gray.400'>
                    {episode.desc ?? 'No description provided.'}
                  </Text>
                </Flex>
              </Box>
            )
          )
        }

        <ModalFooter>
          <CustomButton
            color={data?.available ? 'green' : 'red'}
            fullWidth
            centered
            onClick={onClickPlay}
            disabled={!data?.available}
          >
            {
              data?.available ? 'Play' : 'Coming Soon'
            }
          </CustomButton>
        </ModalFooter>
      </ModalContent>
    </Modal>
  )
}

export default ContentModal