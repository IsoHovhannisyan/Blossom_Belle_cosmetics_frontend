
import Carousel from 'react-multi-carousel';
import 'react-multi-carousel/lib/styles.css';

export default function BestSellers(props) {

    const responsive = {
        superLargeDesktop: {
          breakpoint: { max: 4000, min: 3000 },
          items: 4
        },
        desktop: {
          breakpoint: { max: 3000, min: 1024 },
          items: 4
        },
        tablet: {
          breakpoint: { max: 1024, min: 464 },
          items: 3
        },
        mobile: {
          breakpoint: { max: 464, min: 0 },
          items: 2
        }
      };
  return (
    <div className='w-full h-[30rem]'>

        <Carousel 
        responsive={responsive} 
        swipeable={true}
        draggable={true}
        ssr={true}
        infinite={true}
        autoPlay={props.deviceType !== "mobile" ? true : false}
        autoPlaySpeed={2000}
        keyBoardControl={true}
        transitionDuration={500}
        containerClass="carousel-container"
        removeArrowOnDeviceType={["tablet", "mobile"]}
        deviceType={props.deviceType}
        dotListClass="custom-dot-list-style"
        itemClass="carousel-item-padding-40-px"
        >
            {
                props.slider.map(el => <div className=' w-full h-full' key={el.id}>
                    <img src={`https://blossom-belle-cosmetics.vercel.app${el.image}`} alt="" className=' w-full h-full'/>
                </div>)
            }
            
        </Carousel>
    </div>
  )
}
