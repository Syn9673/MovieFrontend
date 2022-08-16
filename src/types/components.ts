import { RefObject } from 'react'
import type { InputProps } from '@chakra-ui/react'
import { EpisodeData, VideoData } from './data'

interface VideoProps {
  width?: number | string
  height?: number | string

  captionsPath?: string
  crossOrigin?: string

  onNext?: () => void
  onPrev?: () => void

  videoTitle?: string
  videoSubtitle?: string

  src?: string
  controls?: boolean

  autoPlay?: boolean
  noBackButton?: boolean

  loop?: boolean
}

interface VideoTimerProps {
  currentTime: number
  duration: number
}

interface BadgeProps {
  color?: string
}

interface ButtonProps  {
  color?: string
  disabled?: boolean

  icon?: JSX.Element
  centered?: boolean

  filled?: boolean
  fullWidth?: boolean
}

interface NavbarProps {
  onClickSearch: () => void
  position?: 'fixed' | 'sticky'

  forceShadow?: boolean
  noTransparent?: boolean
}

interface SearchProps {
  isOpen: boolean
  onClose: () => void

  initial?: string
  onSearch?: (input?: string) => void
}

interface CustomSliderProps {
  max?: number
  value?: number

  onTrackChange?: (value: number) => void
  onMouseEnter?: () => void

  onMouseLeave?: () => void
  toolTipContainer?: RefObject<HTMLElement>

  isToolTipShown?: boolean
  label?: string,

  ref?: RefObject<HTMLDivElement>
  step?: number

  blendTrackBtnWithTheme?: boolean
  orientation?: 'horizontal' | 'vertical'
}

interface ContentModalProps {
  isOpen: boolean
  onClose: () => void

  data?: VideoData
  onSeasonChange?: (season: number) => void

  episodes?: EpisodeData[]
  onClickPlay?: (video?: VideoData) => void

  season?: string | number
}

export type {
  VideoProps,
  VideoTimerProps,

  BadgeProps,
  ButtonProps,

  NavbarProps,
  SearchProps,

  CustomSliderProps,
  ContentModalProps
}