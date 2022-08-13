import { Flex, Text } from '@chakra-ui/react'
import { VideoTimerProps } from '../../../src/types/components'

import { convertMsToTrackTime } from '../../../src/utils'

const VideoTimer = (
  {
    currentTime,
    duration
  }: VideoTimerProps
) => (
  <Flex
    flexDirection='row'
    gap='2'
  >
    <Text>
      {
        convertMsToTrackTime(
          (
            isNaN(currentTime) ? 0 : currentTime
          ) * 1000
        )
      }
    </Text>

    <Text>/</Text>

    <Text>
      {
        convertMsToTrackTime(
          (
            isNaN(duration) ? 0 : duration
          ) * 1000
        )
      }
    </Text>
  </Flex>
)

export default VideoTimer