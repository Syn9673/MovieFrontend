import { GetServerSidePropsContext } from 'next'
import Navbar from '../../components/Navbar'

import axios from 'axios'
import Search from '../../components/Search'

import { IVideoData } from '../../src/types'
import { useEffect, useState } from 'react'

import { Spinner, Text, Heading } from '@chakra-ui/react'
import styles from '../../styles/Search.module.css'

import ChangeTheme from '../../components/ChangeTheme'
import colors from '../../src/colors'

const SearchPage = (
  { query, videos }: {
    query: string,
    videos: IVideoData[]
  }
) => {
  const [searchShown, setSearchShown] = useState(false),
    [hasLoaded, setHasLoaded] = useState(false),
    onCloseSearch = () => setSearchShown(false),
    onClickSearch = () => setSearchShown(true)

  useEffect(
    () => {
      setHasLoaded(true)
    },
    []
  )

  return hasLoaded ? (
    <>
      <Navbar
        onClickSearch={onClickSearch}
        position='sticky'
        forceShadow
        noTransparent
      />

      <Search
        onClose={onCloseSearch}
        isOpen={searchShown}
        initial={query}
      />

      <ChangeTheme />

      <div className={styles.container}>
        <Heading size='lg'>
          Search results for: '{query}'
        </Heading>

        <div className={styles.results}>
          {
            videos.length > 0 ? (
              videos.map(
                (video, index) => (
                  <div
                    key={index}
                    className={styles.result}
                  >
                    <img
                      src={video.images?.poster}
                    />

                    <Text fontWeight={700}>
                      {video.meta.title}
                    </Text>
                  </div>
                )
              )
            ) : (
              <Text>
                No content match with: '{query}'
              </Text>
            )
          }
        </div>
      </div>
    </>
  ) : (
    <div className={styles.spinner}>
      <Spinner
        size='xl'
        thickness='4px'
        color='#AA55FF'
        label='Loading search results...'
      />

      <Text fontSize='xl'>Loading search results...</Text>
    </div>
  )
}

const getServerSideProps = async (ctx: GetServerSidePropsContext) => {
  try {
    const res = await axios(
        `${process.env.API_URL}/videos/find/${encodeURIComponent(ctx.query.title as string)}`
      ),
      videos = res.data?.value ?? []
  
    return {
      props: {
        query: ctx.query.title,
        videos
      }
    }
  } catch {  
    return {
      props: {
        query: ctx.query.title,
        videos: []
      }
    }
  }
}

export { getServerSideProps }

export default SearchPage