import { Swiper, SwiperSlide } from 'swiper/react'
import { Navigation, Pagination } from 'swiper'

import styles from '../styles/Browse.module.sass'
import { useColorMode } from '@chakra-ui/react'

import { VideoData } from '../src/types/data'

interface SectionProps {
  data: VideoData[]
  title: string
  
  onClickItem: (item: VideoData) => void
}

const Section = (
  {
    data,
    title,
    onClickItem
  }: SectionProps
) => {
  const { colorMode } = useColorMode()

  return (
    <div className={styles.section}>
      <div
        className={styles.sectionTitle}
        style={
          { textShadow: `2px 2px 4px ${colorMode === 'dark' ? '#121212' : '#7c7c7c'}` }
        }
      >
        {title}
      </div>
      
      <div>
        <Swiper 
          slidesPerView='auto'
          spaceBetween={10}
          pagination={
            {
              clickable: true,
              dynamicBullets: true
            }
          }
          navigation
          modules={
            [Navigation, Pagination]
          }
        >
          {
            data.map(
              (value: any, index: number) => (
                <SwiperSlide
                  key={index}
                  className={styles.carouselItem}
                  onClick={
                    () => onClickItem(value)
                  }
                >
                  <img
                    src={value.images.poster}
                    loading='lazy'
                  />
                </SwiperSlide>
              )
            )
          }
        </Swiper>
      </div>
    </div>
  )
}

export default Section