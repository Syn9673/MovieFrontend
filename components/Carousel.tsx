import { useEffect, useState, useRef } from 'react'

interface CarouselProps {
  widthOfItem: number
}

const Carousel = (
  { widthOfItem, ...props }: CarouselProps & JSX.IntrinsicElements['div']
) => {
  const [innerWidth, setInnerWidth] = useState(0),
    ref = useRef<HTMLDivElement>(null),
    onResize = () => {
      setInnerWidth(window.innerWidth)
      console.log('Max that can fit:', Math.trunc(ref.current?.offsetWidth as number / widthOfItem))
    }

  useEffect(
    () => {
      window.addEventListener('resize', onResize)
      return () => window.removeEventListener('resize', onResize)
    },
    []
  )

  return (
    <div
      ref={ref as any}
      style={{ backgroundColor: 'red' }}
    >
      {props.children}
    </div>
  )
}

export default Carousel