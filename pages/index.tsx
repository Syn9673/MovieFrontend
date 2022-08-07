import Button from '../components/Button'
import Badge from '../components/Badge'

import styles from '../styles/Index.module.css'
import Navbar from '../components/Navbar'

import colors from '../src/colors'
import ChangeTheme from '../components/ChangeTheme'

import Search from '../components/Search'
import { useEffect, useState } from 'react'

import Section from '../components/Section'
import { useColorMode } from '@chakra-ui/react'

import { IVideoData } from '../src/types'
import axios from 'axios'

const MAX_DESC_IN_HEADER = 250;

const IndexPage = (
  { pinned, upcoming, main }: {
    pinned: IVideoData[],
    upcoming: IVideoData[],
    main: IVideoData[]
  }
) => {
  const { colorMode } = useColorMode(),
    [searchShown, setSearchShown] = useState(false),
    [video, setVideo] = useState<IVideoData>(null as any),
    [hasLoaded, setHasLoaded] = useState(false),
    onCloseSearch = () => setSearchShown(false),
    onClickItem = (item: IVideoData) => {
      if (item._id === video._id) return

      setVideo(item)
      window.scroll(
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

      setVideo(rand)
      setHasLoaded(true)
    },
    []
  )

  return hasLoaded ? (
    <>
      <Navbar
        onClickSearch={() => setSearchShown(true)}
      />
      <ChangeTheme />
      
      <Search
        isOpen={searchShown}
        onClose={onCloseSearch}
      />

      <div className={styles.container}>
        <div className={styles.header}>
          <div className={styles.bg}>
            <img
              src={video.images?.thumbnail ?? ''}
            />
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
                {video.meta.title}
              </div>

              {
                video.badges ? (
                  <div className={styles.badges}>
                    {
                      video.badges?.map(
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
                  video.meta.desc?.substring(0, MAX_DESC_IN_HEADER) + (
                    (video.meta.desc?.length ?? 0) > MAX_DESC_IN_HEADER ? '...' : ''
                  )
                }
              </div>

              <div className={styles.buttons}>
                <Button color='cyan' centered className={styles.button}>
                  Play
                </Button>

                <Button color='purple' centered className={styles.button}>
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
  ) : null
}

const getServerSideProps = async () => {
  try {
    const res = await axios(`${process.env.API_URL}/content`),
      content = res.data?.value as (
        {
          otherVideos: IVideoData[]
          mainVideos: IVideoData[]
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

export default IndexPage