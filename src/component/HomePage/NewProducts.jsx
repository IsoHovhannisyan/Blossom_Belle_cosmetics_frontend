import Carousel from 'react-multi-carousel';
import 'react-multi-carousel/lib/styles.css';
import { useNavigate } from 'react-router-dom';
import New from "../../Images/new_1.png"
import Best from '../../Images/best_seller_1.png'
import '../../css/HomePage/NewProducts.css';

export default function NewProducts(props) {
    const navigate = useNavigate();

    const responsive = {
        superLargeDesktop: {
          breakpoint: { max: 4000, min: 3000 },
          items: 6
        },
        desktop: {
          breakpoint: { max: 3000, min: 1024 },
          items: 6
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
      const mouseMoveFunc = (index)=>{
        console.log(index);
        if(index > 999){
            index = String(index).split('');
            let btn_text = document.querySelectorAll(`#\\3${index[0]} ${index[1]}${index[2]}${index[3]}`);
            
            for(let i = 0; i<btn_text.length; i++){
              btn_text[i].classList.add('active')
            }
        }
        else if(index > 99){
            index = String(index).split('');
            let btn_text = document.querySelectorAll(`#\\3${index[0]} ${index[1]}${index[2]}`);
            
            for(let i = 0; i<btn_text.length; i++){
              btn_text[i].classList.add('active')
            }
        }
        else if(index > 9){
          index = String(index).split('');
          let btn_text = document.querySelectorAll(`#\\3${index[0]} ${index[1]}`);
          
          for(let i = 0; i<btn_text.length; i++){
            btn_text[i].classList.add('active')
          }
      }else{
        let btn_text = document.querySelectorAll(`#\\3${index} `);
    
        for(let i = 0; i<btn_text.length; i++){
          btn_text[i].classList.add('active')
          }
        }
      }
    
      const mouseLeaveFunc = (index)=>{
        if(index > 999){
            index = String(index).split('');
            let btn_text = document.querySelectorAll(`#\\3${index[0]} ${index[1]}${index[2]}${index[3]}`);
            
            for(let i = 0; i<btn_text.length; i++){
              btn_text[i].classList.remove('active')
            }
        }
        else if(index > 99){
            index = String(index).split('');
            let btn_text = document.querySelectorAll(`#\\3${index[0]} ${index[1]}${index[2]}`);
            
            for(let i = 0; i<btn_text.length; i++){
              btn_text[i].classList.remove('active')
            }
        }
        else if(index > 9){
          index = String(index).split('');
          let btn_text = document.querySelectorAll(`#\\3${index[0]} ${index[1]}`);
          for(let i = 0; i<btn_text.length; i++){
            btn_text[i].classList.remove('active')
          }
        }else{
          let btn_text = document.querySelectorAll(`#\\3${index} `);
          for(let i = 0; i<btn_text.length; i++){
            btn_text[i].classList.remove('active')
          }
          }
      }
  return (
    <div className='New_Products w-full h-[30rem]'>

        <Carousel 
        responsive={responsive} 
        swipeable={true}
        draggable={true}
        ssr={true}
        infinite={true}
        autoPlay={props.deviceType !== "mobile" ? true : false}
        autoPlaySpeed={1500}
        keyBoardControl={true}
        transitionDuration={500}
        containerClass="carousel-container"
        removeArrowOnDeviceType={["tablet", "mobile"]}
        deviceType={props.deviceType}
        dotListClass="custom-dot-list-style"
        itemClass="carousel-item-padding-40-px"
        >
            {
                props.newProducts.map((el,index) => <div className='Product' 
                onClick={()=> navigate(`/product?path=${el.path}&id=${el.id}`)} 
                onMouseMove={()=> mouseMoveFunc(index + props.indexForNewProducts)}
                onMouseLeave={()=> mouseLeaveFunc(index + props.indexForNewProducts)} 
                key={el.id}
                >
                <div className='image'>
                  <div className='ImageBackground' id={index + props.indexForNewProducts}></div>
                  <img src={`https://blossom-belle-cosmetics.vercel.app${el.image}`} id={index + props.indexForNewProducts} className='img' alt="" />
                  <div className={el.new ? 'new active': 'new'}>
                    <img src={New} alt="" />
                  </div>
                  <div className={el.best_seller ? 'best active': 'best'}>
                    <img src={Best} alt="" />
                  </div>
                </div>
                <div className='title'>{el.title.length > 25 ? el.title.slice(0,25) + '...': el.title}</div>
                <div className='brandName'>Blossom Belle</div>
                <div className='price'>{el.price}֏</div>
                <button className='btn_text' id={index + props.indexForNewProducts}>{el.btn_text}</button>
                <div className='shopping' id={index + props.indexForNewProducts}><i className=" fa-solid fa-bag-shopping"></i></div>
                <div className='heart' id={index + props.indexForNewProducts}><i className=" fa-regular fa-heart"></i></div>
              </div>)
            }
            
        </Carousel>
    </div>
  )
}

