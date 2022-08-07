// Types from MovieBackend

import { MutableRefObject } from 'react'

interface IEpisodeData {
  title: string
  desc?: string

  thumbnail?: string
}

interface ISeriesData {
  seasons: number
  episodes: IEpisodeData[][]
}

interface IVideoMeta {
  title: string
  desc?: string
}

interface ITrailerData {
  show?: boolean
  url: string
}

interface ILockData {
  until: number
  hide?: boolean
}

interface IVideoImageData {
  poster?: string
  cover?: string

  thumbnail: string
}

interface IVideoMiscData {
  video?: string
  subs?: string

  pinned?: boolean
  upcoming?: boolean
}

interface IVideoData {
  _id: string

  addedAt?: number
  available?: boolean

  series?: ISeriesData
  meta: IVideoMeta

  trailer?: ITrailerData
  lock?: ILockData
  
  runtime?: number
  images?: IVideoImageData

  misc?: IVideoMiscData
  badges: string[]
}

/*interface ICustomVideoProps {
  src: string
  autoFullScreen?: boolean

  className?: string

  autoPlay?: boolean
  videoProps?: JSX.IntrinsicElements['video']

  noPip?: boolean
  videoRef?: MutableRefObject<any>

  width?: number
  height?: number

  noBackButton?: boolean
  title?: string

  subtitle?: string  
  captions?: string

  onNext?: () => void
  onPrevious?: () => void

  minimalControls?: boolean
}*/

export type {
  ISeriesData,
  IEpisodeData,

  IVideoMeta,
  ITrailerData,

  ILockData,
  IVideoData,

  IVideoImageData,
  IVideoMiscData,

  //ICustomVideoProps
}