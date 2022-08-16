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
  Select,
  Box,
  ModalFooter
} from '@chakra-ui/react'
import { ContentModalProps } from '../src/types/components'

import Badge from './Badge'
import Button from './Button'

import Router from 'next/router'
import styles from '../styles/ContentModal.module.sass'

const ContentModal = (
  {
    isOpen,
    onClose,
    data,
    onSeasonChange,
    episodes = [],
    season
  }: ContentModalProps
) => {
  const onClickPlay = () => {
    if (!data) return
    Router.push(`/browse/${data._id}`)
  }

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
    >
      <ModalOverlay />
      <ModalContent borderRadius='md'>
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
                <Select
                  placeholder='List of Seasons'
                  onChange={
                    (e) => {
                      const season = parseInt(e.target.value || '1')
                      if (onSeasonChange)
                        onSeasonChange(season)
                    }
                  }
                >
                  {
                    data.series?.episodes.map(
                      (_, index) => (
                        <option
                          value={(index + 1).toString()}
                          key={index}
                        >
                          Season {index + 1}
                        </option>
                      )
                    )
                  }
                </Select>
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
          <Button
            color='green'
            fullWidth
            centered
            onClick={onClickPlay}
          >
            Play
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  )
}

export default ContentModal