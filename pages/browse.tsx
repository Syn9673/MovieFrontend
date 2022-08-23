import styles from '../styles/Browse.module.sass'
import {
  Heading,
  Image,
  useColorMode
} from '@chakra-ui/react'

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
import ContentModal from '../components/ContentModal'

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCaretRight } from '@fortawesome/free-solid-svg-icons'

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
    // eslint-disable-next-line react-hooks/exhaustive-deps
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
    // eslint-disable-next-line react-hooks/exhaustive-deps
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
                <Image
                  alt='Thumbnail'
                  src={data?.images?.thumbnail ?? ''}
                  fallbackSrc='https://via.placeholder.com/1920x1080'
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
                  color='purple'
                  centered
                  className={styles.button}
                  onClick={() => setModalOpen(true)}
                  filled
                  icon={
                    <FontAwesomeIcon
                      icon={faCaretRight}
                    />
                  }
                >
                  View More
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
                  <Image
                    alt='Poster'
                    src={video.images?.poster ?? ''}
                    onClick={() => onClickItem(video)}
                    loading='lazy'
                    fallbackSrc='https://via.placeholder.com/140'
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