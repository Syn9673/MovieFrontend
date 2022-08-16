import axios from 'axios'
import { GetServerSideProps } from 'next'

import ChangeTheme from '../../../components/ChangeTheme'
import Navbar from '../../../components/Navbar'

import Search from '../../../components/Search'
import { useEffect, useState } from 'react'

import { EpisodeData, VideoData } from '../../../src/types/data'
import {
  Box,
  Flex,
  Heading,
  Image,
  Spinner,
  Text
} from '@chakra-ui/react'

import { getCookie } from 'cookies-next'
import ContentModal from '../../../components/ContentModal'

import styles from '../../../styles/Search.module.sass'
import Router from 'next/router'

const SearchPage = (
  { title }: {
    title?: string
  }
) => {
  const [videos, setVideos] = useState<VideoData[]>([]),
    [hasLoaded, setHasLoaded] = useState(false),
    [modalOpen, setModalOpen] = useState(false),
    [season, setSeason] = useState(''),
    [episodes, setEpisodes] = useState<EpisodeData[]>([]),
    [data, setData] = useState<VideoData>(),
    [searchOpen, setSearchOpen] = useState(false),
    [query, setQuery] = useState(title ?? '')

  // callbacks
  const getVideos = async (input: string = '') => {
      try {
        const res = await axios(
            process.env.API_URL + '/videos/find/' + input ?? '',
            {
              headers: { authorization: getCookie('crackedflix-user-token') ?? '' }
            }
          ),
          data = res.data as { value: VideoData[] }

        setVideos(data.value)
      } catch {}

      setHasLoaded(true)
    },
    onSearch = async (input?: string) => {
      setQuery(input ?? '')
      setHasLoaded(false)

      setVideos([])
      await getVideos(input)

      Router.push(
        `/browse/search/${input ?? ''}`,
        undefined,
        { shallow: true }
      )
    }

  useEffect(
    () => {
      getVideos(query ?? title)
        .catch(console.error)
    },
    []
  )


  return (
    <>
      <ChangeTheme />

      <Search
        isOpen={searchOpen}
        onClose={() => setSearchOpen(false)}
        initial={title}
        onSearch={onSearch}
      />

      <ContentModal
        isOpen={modalOpen}
        onClose={
          () => {
            setModalOpen(false)

            setSeason('')
            setEpisodes([])
          }
        }
        data={data}
        onSeasonChange={
          (season) => {
            setSeason(season.toString())
            setEpisodes(
              data?.series?.episodes[season - 1] ?? []
            )
          }
        }
        episodes={episodes}
        season={season}
      />

      <Box
        width='100%'
        height='100vh'
        display='flex'
        flexDirection='column'
        alignItems='center'
        gap='4'
      >
        <Navbar
          onClickSearch={() => setSearchOpen(true)}
          forceShadow
          noTransparent
          position='sticky'
        />

        {
          hasLoaded ? (
            videos.length > 0 ? (
              <>
                <Heading>
                  Search results for: '{query}'
                </Heading>

                <Flex
                  flexDirection='row'
                  gap='4'
                  wrap='wrap'
                  justifyContent='center'
                >
                  {
                    videos.map(
                      (video, index) => (
                        (
                          <Image
                            className={styles.result}
                            key={index}
                            src={video.images?.poster ?? ''}
                            width='140px'
                            onClick={
                              () => {
                                setData(video)
                                setModalOpen(true)
                              }
                            }
                          />
                        )
                      )
                    )
                  }
                </Flex>
              </>
            ) : (
              <Text>
                No videos match with: '{query}'
              </Text>
            )
          ) : (
            <Box
              height='100vh'
              display='flex'
              flexDirection='column'
              justifyContent='center'
              alignItems='center'
            >
              <Spinner color='purple.500' size='xl' thickness='4px' />
              <Text>
                Loading...
              </Text>
            </Box>
          )
        }
      </Box>
    </>
  )
}

const getServerSideProps: GetServerSideProps = async (ctx) => {
  const { title } = ctx.query

  return {
    props: { title: encodeURIComponent(title as string ?? '') }
  }
}

export { getServerSideProps }

export default SearchPage