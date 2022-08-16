import { VideoProps } from '../../src/types/components'
import {
  Box,
  Flex,
  Popover,
  PopoverArrow,
  PopoverBody,
  PopoverCloseButton,
  PopoverContent,
  PopoverHeader,
  PopoverTrigger,
  Text,
  Tooltip,
  useColorMode
} from '@chakra-ui/react'

import Slider from '../Slider'
import {
  useState,
  useRef,
  useEffect,
  KeyboardEvent
} from 'react'

import VideoTimer from './controls/Timer'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

import {
  faArrowLeft,
  faCircleLeft,
  faCircleRight,
  faCompress,
  faExpand,
  faPause,
  faPlay,
  faRotateLeft,
  faRotateRight,
  faVolumeHigh,
  faVolumeLow,
  faVolumeMute,
  faClosedCaptioning
} from '@fortawesome/free-solid-svg-icons'
import { convertMsToTrackTime } from '../../src/utils'

import screenfull from 'screenfull'
import Router from 'next/router'

// styling
import styles from '../../styles/Video.module.sass'

const Video = (
  {
    width,
    height,
    captionsPath,
    crossOrigin,
    onNext,
    onPrev,
    videoTitle,
    videoSubtitle,
    src,
    controls = true,
    autoPlay,
    noBackButton,
    loop
  }: VideoProps
) => {
  // refs
  const container = useRef<HTMLDivElement>(null),
    video = useRef<HTMLVideoElement>(null),
    bottomControls = useRef<HTMLDivElement>(null),
    textTrack = useRef<HTMLTrackElement>(null)

  // states
  const [controlsHidden, setControlsHidden] = useState(true),
    [currentTime, setCurrentTime] = useState(0),
    [duration, setDuration] = useState(0),
    [isPlaying, setIsPlaying] = useState(autoPlay ? true : false),
    [isFullScreen, setIsFullScreen] = useState(false),
    [captionsShown, setCaptionsShown] = useState(!!captionsPath),
    [bottomControlsHeight, setBottomControlsHeight] = useState(0),
    [captionsValue, setCaptionsValue] = useState(''),
    [showTrackToolTip, setShowTrackTooltip] = useState(false),
    [lastMouseMovement, setLastMouseMovement] = useState(0),
    [volume, setVolume] = useState(1),
    { colorMode } = useColorMode()

  // callbacks
  const showControls = () => {
      setControlsHidden(false)
    },
    hideControls = () => setControlsHidden(true),
    advanceVideo = (value: number) => {
      setCurrentTime((time) => time + value)

      if (video.current)
        video.current.currentTime += value
    },
    onTimeUpdate = () => {
      if (Date.now() > lastMouseMovement + 3000)
        setControlsHidden(true)

      if (video.current) {
        if (!isNaN(video.current.duration) && duration !== video.current.duration)
          setDuration(video.current.duration)

        setCurrentTime(video.current.currentTime)
      }
    },
    togglePlay = () => {
      if (video.current) {
        if (video.current.paused) video.current.play()
        else video.current.pause()
      }
    },
    toggleFullScreen = async () => {
      if (screenfull.isEnabled) {
        if (screenfull.isFullscreen) await screenfull.exit()
        else await screenfull.request(
          container.current ?? undefined,
          { navigationUI: 'hide' }
        )
      }
    },
    onCueChange = (ev: Event) => {
      const elem = ev.target as HTMLTrackElement,
        cue = (elem.track?.activeCues ?? [])[0] as any

      setCaptionsValue(cue?.text ?? '')
    },
    toggleCaptions = () => setCaptionsShown(!captionsShown),
    onFullScreenChange = () => setIsFullScreen(screenfull.isFullscreen),
    onExit = () => Router.back(),
    adjustVolume = (value: number) => {
      setVolume(value)
      
      if (video.current)
        video.current.volume = value
    },
    triggerLastMouse = () => {
      setLastMouseMovement(Date.now())
      setControlsHidden(false)
    },
    onKeyDown = (e: KeyboardEvent) => {
      if (!controls) return

      switch (e.code) {
        case 'Space':
          e.preventDefault()
          togglePlay()

          break
          
        case 'ArrowLeft':
          e.preventDefault()
          advanceVideo(-5)
          
          break

        case 'ArrowRight':
          e.preventDefault()
          advanceVideo(5)

          break

        case 'KeyF':
        case 'F11':
          e.preventDefault()
          toggleFullScreen()

          break
      }
    }

  useEffect(
    () => {
      setBottomControlsHeight(bottomControls.current?.offsetHeight ?? 0)

      if (video.current && !isNaN(video.current.duration))
        setDuration(video.current.duration)

      const videoContainer = container.current,
        textTrackContainer = textTrack.current

      videoContainer?.addEventListener('fullscreenchange', onFullScreenChange)
      textTrackContainer?.addEventListener('cuechange', onCueChange)
      
      return () => {
        videoContainer?.removeEventListener('fullscreenchange', onFullScreenChange)
        textTrackContainer?.removeEventListener('cuechange', onCueChange)
      }
    },
    []
  )

  return (
    <Box
      className={styles.videoContainer}
      width={width}
      height={height}
      onMouseEnter={showControls}
      onMouseLeave={hideControls}
      ref={container}
      color='white'
      userSelect='none'
      onMouseMove={triggerLastMouse}
      onClick={triggerLastMouse}
      tabIndex={0}
      onKeyDown={onKeyDown}
    >
      {
        controls ? (
          <>
            {
              noBackButton ? null : (
                <Box
                  className={styles.backButton}
                  fontSize='xl'
                  visibility={
                    controlsHidden ? 'hidden' : 'visible'
                  }
                >
                  <FontAwesomeIcon
                    icon={faArrowLeft}
                    onClick={onExit}
                  />
                </Box>
              )
            }

            <Box
              className={styles.metaInfo}
              fontSize='xl'
              visibility={
                controlsHidden ? 'hidden' : 'visible'
              }
            >
              <Flex flexDirection='column'>
                <Text>
                  {videoTitle}
                </Text>

                <Text
                  fontSize='md'
                  color='gray.500'
                >
                  {videoSubtitle}
                </Text>
              </Flex>
            </Box>

            {
              captionsShown ? (
                <Box
                  className={styles.captions}
                  bottom={bottomControlsHeight ?? 0}
                >
                  <pre>
                    {captionsValue}
                  </pre>
                </Box>
              ) : null
            }

            <Box
              ref={bottomControls}
              className={styles.bottomControls}
              visibility={
                controlsHidden ? 'hidden' : 'visible'
              }
            >
              <Flex
                flexDirection='column'
                gap='2'
              >
                <Flex
                  flexDirection='row'
                  gap='4'
                >
                  <Slider
                    max={duration === 0 ? undefined : duration}
                    value={currentTime}
                    label={convertMsToTrackTime(currentTime * 1000)}
                    onTrackChange={(value) => advanceVideo(value - currentTime)}
                    onMouseEnter={() => setShowTrackTooltip(true)}
                    onMouseLeave={() => setShowTrackTooltip(false)}
                    isToolTipShown={showTrackToolTip}
                    toolTipContainer={container}
                  />

                  <VideoTimer
                    currentTime={currentTime}
                    duration={duration}
                  />

                  <Flex
                    flexDirection='row'
                    gap='4'
                    className={styles.episodeButtons}
                  >
                    <Text>
                      <FontAwesomeIcon
                        icon={faCircleLeft}
                        onClick={onPrev}
                      />
                    </Text>

                    <Text>
                      <FontAwesomeIcon
                        icon={faCircleRight}
                        onClick={onNext}
                      />
                    </Text>
                  </Flex>
                </Flex>

                <Flex flexDirection='row'>
                  <Flex
                    flexDirection='row'
                    width='100%'
                    fontSize='xl'
                    gap='4'
                    className={styles.extraControls}
                  >
                    <Text>
                      <FontAwesomeIcon
                        icon={
                          isPlaying ? faPause : faPlay
                        }
                        onClick={togglePlay}
                      />
                    </Text>

                    <Popover
                      closeOnBlur={false}
                      closeOnEsc={true}
                    >
                      <PopoverTrigger>
                        <Text>
                          <FontAwesomeIcon
                            icon={
                              volume === 0 ? faVolumeMute : (
                                volume >= .5 ? faVolumeHigh : faVolumeLow
                              )
                            }
                          />
                        </Text>
                      </PopoverTrigger>
                      <PopoverContent
                        _focus={{ boxShadow: 'none !important' }}
                        bg={colorMode === 'dark' ? '#121212' : 'white'}
                        color={colorMode === 'dark' ? 'white' : 'black'}
                        border='none'
                        borderRadius='none'
                      >
                        <PopoverArrow
                          bg={colorMode === 'dark' ? '#121212' : 'white'}
                        />
                        <PopoverCloseButton />
                        <PopoverHeader border='none'>
                          Change Volume
                        </PopoverHeader>
                        <PopoverBody padding='20px'>
                          <Slider
                            max={1}
                            value={volume}
                            onTrackChange={adjustVolume}
                            label={volume.toString()}
                            step={.1}
                            toolTipContainer={container}
                            blendTrackBtnWithTheme
                          />
                        </PopoverBody>
                      </PopoverContent>
                    </Popover>

                    <Text>
                      <FontAwesomeIcon
                        icon={faRotateLeft}
                        onClick={() => advanceVideo(-5)}
                      />
                    </Text>

                    <Text>
                      <FontAwesomeIcon
                        icon={faRotateRight}
                        onClick={() => advanceVideo(5)}
                      />
                    </Text>
                  </Flex>

                  <Flex
                    flexDirection='row'
                    justify='flex-end'
                    fontSize='xl'
                    width='100%'
                    gap='4'
                    className={styles.extraControls}
                  >
                    {
                      captionsPath ? (
                        <Tooltip
                          color='white'
                          label={
                            `${captionsShown ? 'Disable' : 'Enable'} Captions`
                          }
                          hasArrow
                          placement='top'
                          portalProps={
                            { containerRef: container }
                          }
                          bgColor='purple.500'
                        >
                          <Text >
                            <FontAwesomeIcon
                              icon={faClosedCaptioning}
                              onClick={toggleCaptions}
                            />
                          </Text>
                        </Tooltip>
                      ) : null
                    }

                    <Text>
                      <FontAwesomeIcon
                        icon={
                          isFullScreen ? faCompress : faExpand
                        }
                        onClick={toggleFullScreen}
                      />
                    </Text>
                  </Flex>
                </Flex>
              </Flex>
            </Box>
          </>
        ) : null
      } 
 
      <video
        ref={video}
        onContextMenu={(e) => e.preventDefault()}
        src={src}
        autoPlay={autoPlay}
        onClick={togglePlay}
        onDoubleClick={toggleFullScreen}
        onTimeUpdate={onTimeUpdate}
        onPlay={() => setIsPlaying(true)}
        onPause={() => setIsPlaying(false)}
        crossOrigin={crossOrigin}
        loop={loop}
      >
        {
          captionsPath ? (
            <track
              ref={textTrack}
              src={captionsPath + '/english.vtt'}
              kind='captions'
              default
              srcLang='en'
            />
          ) : null
        }
      </video>
    </Box>
  )
}

export default Video