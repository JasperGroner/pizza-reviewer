import React, { useState } from 'react'
import { SliderData } from './SliderData';
import { FaArrowAltCircleRight, FaArrowAltCircleLeft } from 'react-icons/fa'

const PizzaBanner = ({ slides }) => {
  const [current, setCurrent] = useState(0)
  const length = slides.length

  const nextSlide = () => {
    setCurrent(current === length - 1 ? 0 : current + 1)
  }

  const prevSlide = () => {
    setCurrent(current === 0 ? length - 1 : current - 1)
  }

  if (!Array.isArray(slides) || slides.length <= 0) {
    return null;
  }
  // why not to use && for conditional rendering
  // https://medium.com/geekculture/stop-using-for-conditional-rendering-in-react-a0f7b96200f8
  return (
    <>
    <div className='slider'>
      <FaArrowAltCircleLeft className='left-arrow' onClick={prevSlide}/>
      <FaArrowAltCircleRight className='right-arrow' onClick={nextSlide}/>
      {SliderData.map((slide, index) => {
        return (
          <div className={index === current ? "slide active" : "slide"} key={index}>
            {index === current ? (<img src={slide.image} alt="pizzaImage"  className='image' />) : null}
          </div>
        )
      })
      }
    </div>
    </>
  );
}

export default PizzaBanner