import { Swiper, SwiperSlide } from 'swiper/react'
import { Navigation, Pagination } from 'swiper'

import styles from '../styles/Index.module.css'
import { useColorMode } from '@chakra-ui/react'

import { IVideoData } from '../src/types'

interface SectionProps {
  data: IVideoData[]
  title: string
  
  onClickItem: (item: IVideoData) => void
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