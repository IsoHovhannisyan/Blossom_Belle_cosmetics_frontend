import React, { useEffect, useState } from 'react'
import Carousel from 'react-multi-carousel';
import 'react-multi-carousel/lib/styles.css';
import "../../css/HomePage/Slider.css";

export default function Slider(props) {

    const responsive = {
        superLargeDesktop: {
          breakpoint: { max: 4000, min: 3000 },
          items: 1
        },
        desktop: {
          breakpoint: { max: 3000, min: 1024 },
          items: 1
        },
        tablet: {
          breakpoint: { max: 1024, min: 464 },
          items: 1
        },
        mobile: {
          breakpoint: { max: 464, min: 0 },
          items: 1
        }
      };

    // const [currentSlide, setCurrentSlide] = useState(1);

    // const nextSlide = ()=>{
    //     if(currentSlide !== slider.length){
    //         setCurrentSlide(currentSlide+1);
    //     }else{
    //         setCurrentSlide(1);
    //     }
    // }

    // const prevSlide = ()=>{
    //     if(currentSlide !== 1){
    //         setCurrentSlide(currentSlide - 1);
    //     }else{
    //         setCurrentSlide(slider.length);
    //     }
    // }

    // useEffect(()=>{
    //     const interval = setInterval(() => {
    //         nextSlide();
    //     }, 7000);

    //     return () => clearInterval(interval);
    // },[currentSlide])

  return (
    <div className=' slider'>
        <Carousel 
        responsive={responsive} 
        swipeable={true}
        draggable={true}
        showDots={true}
        ssr={true}
        infinite={true}
        autoPlay={props.deviceType !== "mobile" ? true : false}
        autoPlaySpeed={4000}
        keyBoardControl={true}
        transitionDuration={1000}
        containerClass="carousel-container"
        removeArrowOnDeviceType={["tablet", "mobile"]}
        deviceType={props.deviceType}
        dotListClass="custom-dot-list-style"
        itemClass="carousel-item-padding-1000-px"
        >
            {
                props.slider.map(el => <div className=' image' key={el.id}>
                    <img src={`http://localhost:8000/${el.image}`} alt="" />
                </div>)
            }
            
        </Carousel>
    </div>
  )
}
