interface EpisodeData {
  title: string
  desc?: string

  thumbnail?: string
}

interface SeriesData {
  seasons: number
  episodes: EpisodeData[][]
}

interface VideoMeta {
  title: string
  desc?: string
}

interface TrailerData {
  show?: boolean
  url: string
}

interface LockData {
  until: number
  hide?: boolean
}

interface VideomageData {
  poster?: string
  cover?: string

  thumbnail: string
}

interface VideoMiscData {
  video?: string
  subs?: string

  pinned?: boolean
  upcoming?: boolean
}

interface VideoData {
  _id: string

  addedAt?: number
  available?: boolean

  series?: SeriesData
  meta: VideoMeta

  trailer?: TrailerData
  lock?: LockData
  
  runtime?: number
  images?: VideomageData

  misc?: VideoMiscData
  badges: string[]
}

export type {
  SeriesData,
  EpisodeData,

  VideoMeta,
  TrailerData,

  LockData,
  VideoData,

  VideomageData,
  VideoMiscData,
}