import styles from '../styles/Browse.module.sass'
import { useColorMode } from '@chakra-ui/react'

import Video from '../components/video'
import Button from '../components/Button'

import { useEffect, useState } from 'react'
import Navbar from '../components/Navbar'

import Search from '../components/Search'
import { VideoData } from '../src/types/data'

import colors from '../src/colors'
import Badge from '../components/Badge'

import Section from '../components/Section'
import axios from 'axios'

const BrowsePage = (
  { pinned, upcoming, main }: {
    pinned: VideoData[],
    upcoming: VideoData[],
    main: VideoData[]
  }
) => {
  //states
  const [data, setData] = useState<VideoData>(),
    [trailerTimeout, setTrailerTimeout] = useState<NodeJS.Timeout>(),
    [showVideo, setShowVideo] = useState(false),
    [searchOpen, setSearchOpen] = useState(false),
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
    }

  useEffect(
    () => {
      const randNumber = Math.floor(Math.random() * main.length),
        rand = main[randNumber]

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
      <Navbar
        onClickSearch={() => setSearchOpen(true)}
      />

      <Search
        isOpen={searchOpen}
        onClose={() => setSearchOpen(false)}
      />

      <div className={styles.container}>
        <div className={styles.header}>
          <div className={styles.bg}>
            {
              showVideo ? (
                <Video
                  src={data?.trailer?.url ?? ''}
                  controls={false}
                  autoPlay
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
                >
                  Play
                </Button>

                <Button
                  color='purple'
                  centered
                  className={styles.button}
                >
                  More Info
                </Button>
              </div>
            </div>
          </div>
        </div>

        <div className={styles.bodyContent}>
          <Section
            data={pinned}
            title='Pinned Shows & Movies'
            onClickItem={onClickItem}
          />

          <Section
            data={upcoming}
            title='Upcoming Shows & Movies'
            onClickItem={onClickItem}
          />

          <Section
            data={main}
            title='Top 20 Shows & Movies'
            onClickItem={onClickItem}
          />
        </div>
      </div>
    </>
  )
}


const getServerSideProps = async () => {
  try {
    const res = await axios(`${process.env.API_URL}/content`),
      content = res.data?.value as (
        {
          otherVideos: VideoData[]
          mainVideos: VideoData[]
        }
      ),
      main = content?.mainVideos ?? [],
      pinned = content?.mainVideos?.filter((val) => val.misc?.pinned),
      upcoming = content?.mainVideos?.filter((val) => val.misc?.upcoming)


    return { props: { main, pinned, upcoming } }
  } catch {
    return { props: {} }
  }
}

export { getServerSideProps }

export default BrowsePage