import axios from 'axios'
import { useEffect, useState } from 'react'

import Video from '../../components/video'
import {
  VideoData,
  SeriesData
} from '../../src/types/data'

import { GetServerSidePropsContext } from 'next'
import { getCookie } from 'cookies-next'

const WatchVideo = (
  props: {
    season: string
    episode: string,
    data: VideoData
  }
) => {
  const [currentEpisode, setCurrentEpisode] = useState(Number(props.episode)),
    [currentSeason, setCurrentSeason] = useState(Number(props.season)),
    [hasLoaded, setHasLoaded] = useState(false),
    [videoUrl, setVideoUrl] = useState(''),
    [captionUrl, setCaptionUrl] = useState(''),
    [videoTitle, setVideoTitle] = useState(''),
    videoSubtitle = props.data.series ? (
        props.data.meta?.title ?? ''
      ) : ''

  const getVideoUrl = () => {
    if (props.data.trailer?.show && props.data.trailer?.url)
      return props.data.trailer?.url

    const series = props.data.series

    if (series) {
      return (props.data.misc?.video ?? '') +
        `/S${currentSeason}/E${currentEpisode}` +
        '.mp4'
    } else return (props.data.misc?.video ?? '') + '/video.mp4'
  },
    getCaptionUrl = () => {
      const subPath = `/S${currentSeason}/E${currentEpisode}`,
        url = props.data.misc?.subs ?? ''

      if (!props.data.series)
        return url
      else return url + subPath
    },
    getVideoTitle = () => {
      if (!props.data.series) return props.data.meta?.title
      else {
        const pattern = 'S{season}:E{episode} "{title}"',
          episode = props.data.series.episodes[currentSeason - 1][currentEpisode - 1]

        return pattern.replace(
            '{season}',
            currentSeason.toString()
          )
          .replace(
            '{episode}',
            currentEpisode.toString()
              .padStart(2, '0')
          )
          .replace(
            '{title}',
            episode.title ?? ''
          )
      }
    },
    checkEpisodeValidity = (series: SeriesData) => {
      if (currentSeason > series.seasons) return false
      else {
        const season = series.episodes[currentSeason - 1]
        if (!season || !season[currentEpisode - 1]) return false
        else return true
      }
    },
    nextEpisode = () => {
      const series = props.data.series
      if (
        !series || (
          currentSeason >= series.seasons &&
          currentEpisode >= series.episodes[currentSeason - 1].length
        )
      ) return // disallow movies, last episode at last season

      const season = series.episodes[currentSeason - 1]
      if (currentEpisode >= season.length) { // last episode
        setCurrentSeason(currentSeason + 1)
        setCurrentEpisode(1)
      } else setCurrentEpisode(currentEpisode + 1)
    },
    previousEpisode = () => {
      const series = props.data.series
      if (
        !series || (
          currentSeason <= 1 &&
          currentEpisode <= 1
        )
      ) return // disallow movies, first episode at first season

      if (currentEpisode <=  1) { // first episode
        setCurrentSeason(currentSeason - 1)
        setCurrentEpisode(series.episodes[currentSeason - 1].length)
      } else setCurrentEpisode(currentEpisode - 1)
    }
  useEffect(
    () => {
      // series check
      const series = props.data.series
      if (series && !checkEpisodeValidity(series)) {
        setCurrentEpisode(1)
        setCurrentSeason(1)
      }

      setHasLoaded(true)
      setVideoUrl(getVideoUrl())

      setCaptionUrl(getCaptionUrl())
      setVideoTitle(getVideoTitle())
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    []
  )

  useEffect(
    () => {
      setVideoUrl(getVideoUrl())
      setCaptionUrl(getCaptionUrl())

      setVideoTitle(getVideoTitle())
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [currentEpisode, currentSeason]
  )

  return hasLoaded ? (
    <Video
      width='100vw'
      height='100vh'
      
      src={videoUrl}
      videoSubtitle={videoSubtitle}

      onNext={nextEpisode}
      onPrev={previousEpisode}

      captionsPath={captionUrl}
      videoTitle={videoTitle}

      autoPlay
      crossOrigin='anonymous'

      autoPlayNextOnFinish
    />
  ) : null
}

const getServerSideProps = async (context: GetServerSidePropsContext) => {
  const {
    s: season,
    e: episode,
    id
  } = context.query

  // get video data

  try {
    const res = await axios(
      `${process.env.API_URL}/video/${id}`,
      {
        headers: {
          Authorization: getCookie('crackedflix-user-token')
        }
    )

    return {
      props: {
        season: isNaN(season as any) ? '1' : season,
        episode: isNaN(episode as any) ? '1' : episode,
        data: res.data?.value
      }
    }
  } catch {
    return {
      props: {
        season: isNaN(season as any) ? '1' : season,
        episode: isNaN(episode as any) ? '1' : episode,
        data: {}
      }
    }
  }
}

export { getServerSideProps }

export default WatchVideo
