import styles from '../styles/Browse.module.sass'
import { Box, Divider, Flex, Heading, Modal, ModalBody, ModalCloseButton, ModalContent, ModalFooter, ModalHeader, ModalOverlay, Select, Text, useColorMode } from '@chakra-ui/react'

import Video from '../components/video'
import Button from '../components/Button'

import { useEffect, useRef, useState } from 'react'
import Navbar from '../components/Navbar'

import Search from '../components/Search'
import { EpisodeData, VideoData } from '../src/types/data'

import colors from '../src/colors'
import Badge from '../components/Badge'

import axios from 'axios'
import Router from 'next/router'

import { deleteCookie, getCookie } from 'cookies-next'
import { GetServerSideProps } from 'next'
import ChangeTheme from '../components/ChangeTheme'

const BrowsePage = (
  { content = [] }: { content: VideoData[] }
) => {
  // refs
  const container = useRef<HTMLDivElement>(null)

  //states
  const [data, setData] = useState<VideoData>(),
    [trailerTimeout, setTrailerTimeout] = useState<NodeJS.Timeout>(),
    [showVideo, setShowVideo] = useState(false),
    [searchOpen, setSearchOpen] = useState(false),
    [modalOpen, setModalOpen] = useState(false),
    [hasInteracted, setHasInteracted] = useState(false),
    [season, setSeason] = useState(''),
    [episodes, setEpisodes] = useState<EpisodeData[]>([]),
    { colorMode } = useColorMode()

  // Callbacks
  const timeoutCb = () => setShowVideo(true),
    onClickItem = (item: VideoData) => {
      if (item._id === data?._id) return
      setData(item)

      window.scrollTo(
        {
          top: 0,
          left: 0,
          behavior: 'smooth'
        }
      )
    },
    onClickPlay = (video?: VideoData) => {
      if (!video) return
      Router.push(`/browse/${video._id}`)
    }

  useEffect(
    () => {
      const randNumber = Math.floor(Math.random() * content.length),
        rand = content[randNumber]

      setData(rand)

      setTrailerTimeout(
        setTimeout(timeoutCb, 4000)
      )

      return () => clearTimeout(trailerTimeout)
    },
    []
  )

  useEffect(
    () => {
      setShowVideo(false)

      if (trailerTimeout)
        clearTimeout(trailerTimeout)

      setTrailerTimeout(
        setTimeout(timeoutCb, 4000)
      )

      return () => clearTimeout(trailerTimeout)
    },
    [data]
  )

  return (
    <>
      <ChangeTheme />

      <Navbar
        onClickSearch={() => setSearchOpen(true)}
      />

      <Search
        isOpen={searchOpen}
        onClose={() => setSearchOpen(false)}
      />

      <Modal
        isOpen={modalOpen}
        onClose={
          () => {
            setModalOpen(false)

            setSeason('')
            setEpisodes([])
          }
        }   
      >
        <ModalOverlay />
        <ModalContent
          borderRadius='0'
        >
          <img
            src={data?.images?.thumbnail ?? ''}
            alt='Header Image'
            width='100%'
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

                        setSeason(season.toString())
                        setEpisodes(
                          data?.series?.episodes[season - 1] ?? []
                        )
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
              onClick={() => onClickPlay(data)}
            >
              Play
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>

      <div
        className={styles.container}
        ref={container}
        onClick={() => setHasInteracted(true)}
      >
        <div className={styles.header}>
          <div className={styles.bg}>
            {
              showVideo && hasInteracted ? (
                <Video
                  src={data?.trailer?.url ?? ''}
                  controls={false}
                  autoPlay
                  loop
                />
              ) : (
                <img
                  placeholder='Thumbnail Image'
                  src={data?.images?.thumbnail ?? ''}
                />
              )
            }
          </div>

          <div
            className={styles.overlay}
            style={
              {
                boxShadow: 'inset 0 -30px 15px -10px ' + (
                  colorMode === 'light' ?
                    colors.light :
                    colors.dark
                )
              }
            }
          >
            <div className={styles.content}>
              <div className={styles.title}>
                {data?.meta.title}
              </div>

              {
                data?.badges ? (
                  <div className={styles.badges}>
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
                  </div>
                ) : null
              }

              <div className={styles.desc}>
                {
                  data?.meta.desc?.substring(0, 256) + (
                    (data?.meta.desc?.length ?? 0) > 256 ? '...' : ''
                  )
                }
              </div>

              <div className={styles.buttons}>
                <Button
                  color='cyan'
                  centered
                  className={styles.button}
                  disabled={!data || !data.available}
                  onClick={() => onClickPlay(data)}
                >
                  Play
                </Button>

                <Button
                  color='purple'
                  centered
                  className={styles.button}
                  onClick={() => setModalOpen(true)}
                >
                  More Info
                </Button>
              </div>
            </div>
          </div>
        </div>

        <div>
          <Heading>
            Shows & Movies
          </Heading>
        </div>

        <div className={styles.bodyContent}>
          {
            content.map(
              (video, index) => (
                <div key={index}>
                  <img
                    src={video.images?.poster ?? ''}
                    onClick={() => onClickItem(video)}
                    loading='lazy'
                  />
                </div>
              )
            )
          }
        </div>
      </div>
    </>
  )
}


const getServerSideProps: GetServerSideProps = async (context) => {
  const token = getCookie(
    'crackedflix-user-token',
    {
      req: context.req,
      res: context.res
    }
  )

  try {
    const res = await axios(
        `${process.env.API_URL}/videos`,
        { headers: { authorization: token?.toString() ?? '' } }
      )

      const content = res.data?.value as VideoData[]
      
    return { props: { content } }
  } catch(err) {  
    const e = err as any

    if (e.response?.data?.userTokenInvalid)
      deleteCookie('crackedflix-user-token')
    
    return {
      props: {},
      redirect: {
        destination: '/auth'
      }
    }
  }
}

export { getServerSideProps }

export default BrowsePage