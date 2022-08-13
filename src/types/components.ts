import { RefObject } from 'react'

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

export type {
  VideoProps,
  VideoTimerProps,

  BadgeProps,
  ButtonProps,

  NavbarProps,
  SearchProps,

  CustomSliderProps
}