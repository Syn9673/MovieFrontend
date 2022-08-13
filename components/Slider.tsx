import {
  Slider,
  SliderFilledTrack,
  SliderThumb,
  SliderTrack,
  Tooltip,
  useColorMode
} from '@chakra-ui/react'
import { CustomSliderProps } from '../src/types/components'

const CustomSlider = (
  {
    max,
    value,
    onTrackChange,
    onMouseEnter,
    onMouseLeave,
    toolTipContainer,
    isToolTipShown,
    label,
    ref,
    step = .01,
    blendTrackBtnWithTheme,
    orientation = 'horizontal'
  }: CustomSliderProps
) => {
  const { colorMode } = useColorMode()

  return (
    <Slider
      ref={ref}
      defaultValue={0}
      min={0}
      max={max}
      value={value}
      step={step}
      onChange={onTrackChange}
      onMouseEnter={onMouseEnter}
      onMouseLeave={onMouseLeave}
      orientation={orientation}
    >
      <SliderTrack>
        <SliderFilledTrack bgColor='purple.500'/>
      </SliderTrack>
  
      <Tooltip
        color='white'
        label={label}
        hasArrow
        placement='top'
        isOpen={isToolTipShown}
        portalProps={
          { containerRef: toolTipContainer }
        }
        bgColor='purple.500'
      >
        <SliderThumb
          onKeyDown={(e) => e.preventDefault()}
          _focus={{ boxShadow: 'none !important' }}
          bgColor={
            blendTrackBtnWithTheme ? (
              colorMode === 'dark' ? 'white' : 'purple.500'
            ) : undefined
          }
        />
      </Tooltip>
    </Slider>
  )
}

export default CustomSlider