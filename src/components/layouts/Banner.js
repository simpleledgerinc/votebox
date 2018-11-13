import React from 'react';
import 'react-responsive-carousel/lib/styles/carousel.min.css';
import { Carousel } from 'react-responsive-carousel';

const banners = ['banner.png', 'banner.png', 'banner.png'];
const Banner = () => {
  return (
    <div>
      <Carousel autoPlay={true} showStatus={false} showIndicators={false} showThumbs={false} infiniteLoop={true} interval={5000}>
        { banners.map((banner, index) => {
          return (
            <div key={index} style={{objectFit: 'cover'}}>
              <img alt='banner' width='100%' src={'assets/img/' +  banner} />
            </div>
          )
        })}
      </Carousel>
    </div>
  )
}

export default Banner;