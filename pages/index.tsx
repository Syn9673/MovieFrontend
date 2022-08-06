import Button from '../components/Button'
import Badge from '../components/Badge'

import styles from '../styles/Index.module.css'
import { Swiper, SwiperSlide } from 'swiper/react'

import { Navigation, Pagination } from 'swiper'

const Test = () => {
  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <div className={styles.bg}>
          <img
            src='/wandavision_thumbnail.jpg'
          />
        </div>

        <div className={styles.overlay}>
          <div className={styles.content}>
            <div className={styles.title}>
              Wanda Vision
            </div>

            <div className={styles.badges}>
              <Badge color='green'>
                HD
              </Badge>

              <Badge color='green'>
                Captions
              </Badge>
            </div>

            <div className={styles.desc}>
              Marvel Studios' WandaVision blends the style of classic sitcoms with the Marvel Cinematic Universe in which Wanda Maximoff and Vision – two superpowered beings living their ideal suburban life – begin to suspect that everything is not as it seems.
            </div>

            <div className={styles.buttons}>
              <Button color='cyan' centered className={styles.button}>
                Play
              </Button>

              <Button color='purple' centered className={styles.button}>
                More Info
              </Button>
            </div>
          </div>
        </div>
      </div>

      <div className={styles.bodyContent}>
        <div className={styles.section}>
          <div className={styles.sectionTitle}>
            Pinned Content
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
                [
                  Navigation,
                  Pagination
                ]
              }
            >
              <SwiperSlide className={styles.carouselItem}>
                <img src='/ms_marvel.jpg' />
              </SwiperSlide>

              <SwiperSlide className={styles.carouselItem}>
                <img src='/hawkeye.jpg' />
              </SwiperSlide>

              <SwiperSlide className={styles.carouselItem}>
                <img src='/far_from_home.jpg' />
              </SwiperSlide>

              <SwiperSlide className={styles.carouselItem}>
                <img src='/whatif.jpg' />
              </SwiperSlide>

              <SwiperSlide className={styles.carouselItem}>
                <img src='/sod.png' />
              </SwiperSlide>
            </Swiper>
          </div>
        </div>

        <div className={styles.section}>
          <div className={styles.sectionTitle}>
            Upcoming Content
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
                [
                  Navigation,
                  Pagination
                ]
              }
            >
              <SwiperSlide className={styles.carouselItem}>
                <img src='/ms_marvel.jpg' />
              </SwiperSlide>

              <SwiperSlide className={styles.carouselItem}>
                <img src='/hawkeye.jpg' />
              </SwiperSlide>

              <SwiperSlide className={styles.carouselItem}>
                <img src='/far_from_home.jpg' />
              </SwiperSlide>

              <SwiperSlide className={styles.carouselItem}>
                <img src='/whatif.jpg' />
              </SwiperSlide>

              <SwiperSlide className={styles.carouselItem}>
                <img src='/sod.png' />
              </SwiperSlide>
            </Swiper>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Test