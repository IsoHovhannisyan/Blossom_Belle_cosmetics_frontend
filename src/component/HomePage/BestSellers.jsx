import Carousel from 'react-multi-carousel';
import 'react-multi-carousel/lib/styles.css';
import { useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import New from "../../Images/new_1.png"
import Best from '../../Images/best_seller_1.png'
import '../../css/HomePage/BestSellers.css';
import useAuth from '../../Auth/useAuth';
import axios from '../../axios';


export default function BestSellers(props) {

    const navigate = useNavigate();

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

      const isLoggedIn = useAuth();
    
      const [userId, setUserId] = useState(sessionStorage.getItem('user_id') ? JSON.parse(sessionStorage.getItem('user_id')) : '');
      const [activeHearts, setActiveHearts] = useState(new Set());
      const [favorites, setFavorites] = useState('');
    
      useEffect(() => {
        const storedActiveHearts = JSON.parse(localStorage.getItem('activeHearts'));
        if (storedActiveHearts) {
          setActiveHearts(new Set(storedActiveHearts));
        }
        const fetchFavorites = async () => {
          try {
            if (isLoggedIn) {
              const response = await axios.get(`/api/user/${userId}/favorites`);
              const { favorites } = response.data;
              setFavorites(favorites);
              setActiveHearts(new Set(favorites.split(',')));
              localStorage.setItem('activeHearts', JSON.stringify(favorites)); // Store favorites as string
            }
          } catch (error) {
            console.error('Error fetching favorites:', error);
          }
        };
    
        fetchFavorites();
      }, [isLoggedIn, userId]);
    
      const handleHeartClick = async (image) => {
        if (!isLoggedIn) {
          navigate('/login');
          return;
        }
      
        const updatedActiveHearts = new Set(activeHearts);
        if (updatedActiveHearts.has(image)) {
          updatedActiveHearts.delete(image);
        } else {
          updatedActiveHearts.add(image);
        }
        setActiveHearts(updatedActiveHearts);
        
        // Convert updated active hearts set to array
        const updatedFavoritesArray = Array.from(updatedActiveHearts);
        
        // Update the user favorites string by joining the array
        const updatedFavoritesString = updatedFavoritesArray.join(',');
        setFavorites(updatedFavoritesString);
        localStorage.setItem('activeHearts', JSON.stringify(updatedFavoritesArray));
      
        try {
          await axios.put(`/api/user/${userId}/favorites`, {
            favorites: updatedFavoritesString,
          });
          console.log('Favorites updated successfully');
        } catch (error) {
          console.error('Error updating favorites:', error);
        }
      };
    
      const handleShoppingClick = async (el) => {
        const modelName = el.path;
        const image = el.image;
        let existingProducts = JSON.parse(sessionStorage.getItem('Basket-Products')) || [];
    
        try {
            const matchingProducts = existingProducts.filter(product => product.image === image);
    
            if (matchingProducts.length > 0) {
                // Update quantity for all matching products
                matchingProducts.forEach(product => {
                    product.quantityForOrder += 1;
                });
            } else {
                // Fetch products data from the server
                const productsData = await axios.get(`/api/user/findProductByImage?modelName=${modelName}&image=${image}`);
                const newProducts = productsData.data.map(product => ({ ...product, quantityForOrder: 1 }));
                existingProducts.push(...newProducts);
    
                // Update basket products quantity
                props.setBasketProductsQuantity(props.basketProductsQuantity + newProducts.length);
            }
    
            // Update sessionStorage with the updated products
            sessionStorage.setItem('Basket-Products', JSON.stringify(existingProducts));
        } catch (error) {
            // Handle errors
            console.error('Error handling shopping click:', error);
            // Optionally, you can provide user feedback about the error.
        }
    };


      const mouseMoveFunc = (index)=>{
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
    <div className='Best_Sellers w-full h-[30rem]'>

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
                props.bestSellers.map((el,index) => 
              <div className='Product' 
              onMouseMove={()=> mouseMoveFunc(index)}
              onMouseLeave={()=> mouseLeaveFunc(index)} 
              key={el.id}
              >
              <div className='image' onClick={()=> navigate(`/product?path=${el.path}&id=${el.id}`)} >
                <div className='ImageBackground' id={index}></div>
                <img src={`https://blossom-belle-cosmetics.vercel.app${el.image}`} id={index} className='img' alt="" />
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
                <button className='btn_text' id={index} onClick={()=> navigate(`/product?path=${el.path}&id=${el.id}`)}>
                  {el.btn_text}
                </button>
                <div className='shopping' id={index}>
                  <i className=' fa-solid fa-bag-shopping' onClick={()=> handleShoppingClick(el)}></i>
                </div>
                <div className='heart' id={index} onClick={() => handleHeartClick(el.image)}>
                  <i className={activeHearts.has(el.image) ? ' active fa-solid fa-heart' : 'fa-regular fa-heart'}></i>
                </div>
            </div>)
            }
            
        </Carousel>
    </div>
  )
}

