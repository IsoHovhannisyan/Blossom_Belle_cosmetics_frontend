import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import New from '../../Images/new_1.png';
import Best from '../../Images/best_seller_1.png';
import useAuth from '../../Auth/useAuth';
import axios from '../../axios';

export function Cleansers({skincare, basketProductsQuantity, setBasketProductsQuantity}) {
  let res = skincare.filter(el=> el.category == 'Cleansers');
  const cleansers = res;
  const isLoggedIn = useAuth();
  const navigate = useNavigate();

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

  const handleShoppingClick = (el) => {
    let existingProducts = JSON.parse(sessionStorage.getItem('Basket-Products'));
  
    // Check if existingProducts is null or undefined
    if (existingProducts === null || existingProducts === undefined) {
      existingProducts = []; // Initialize existingProducts as an empty array
    }
  
    console.log(existingProducts);
  
    const existingProductIndex = existingProducts.findIndex(product => product.image === el.image);
    if (existingProductIndex !== -1) {
      existingProducts[existingProductIndex].quantityForOrder += 1;
    } else {
      setBasketProductsQuantity(basketProductsQuantity + 1);
      const newProduct = { ...el, quantityForOrder: 1 };
      existingProducts.push(newProduct);
    }
  
    // Update sessionStorage with the updated products
    sessionStorage.setItem('Basket-Products', JSON.stringify(existingProducts));
  };
  
  

  const mouseMoveFunc = (index) => {
    if (index > 9) {
      index = String(index).split('');
      let btn_text = document.querySelectorAll(`#\\3${index[0]} ${index[1]}`);

      for (let i = 0; i < btn_text.length; i++) {
        btn_text[i].classList.add('active');
      }
    } else {
      let btn_text = document.querySelectorAll(`#\\3${index} `);

      for (let i = 0; i < btn_text.length; i++) {
        btn_text[i].classList.add('active');
      }
    }
  };

  const mouseLeaveFunc = (index) => {
    if (index > 9) {
      index = String(index).split('');
      let btn_text = document.querySelectorAll(`#\\3${index[0]} ${index[1]}`);
      for (let i = 0; i < btn_text.length; i++) {
        btn_text[i].classList.remove('active');
      }
    } else {
      let btn_text = document.querySelectorAll(`#\\3${index} `);
      for (let i = 0; i < btn_text.length; i++) {
        btn_text[i].classList.remove('active');
      }
    }
  };

  return (
    <div className='Products'>
      {cleansers.map((el, index) => (
        <div
          className={el.sale ? 'Product active' : 'Product'}
          onMouseMove={() => mouseMoveFunc(index)}
          onMouseLeave={() => mouseLeaveFunc(index)}
          key={el.id}
        >
          <div className='image' onClick={()=> navigate(`/product?path=${el.path}&id=${el.id}`)}>
            <div className='ImageBackground' id={index}></div>
            <img src={`http://localhost:8000/${el.image}`} id={index} className='img' alt='' />
            <div className={el.new ? 'new active' : 'new'}>
              <img src={New} alt='' />
            </div>
            <div className={el.best_seller ? 'best active' : 'best'}>
              <img src={Best} alt='' />
            </div>
          </div>
          <div className='title'>{el.title.length > 20 ? el.title.slice(0, 20) + '...' : el.title}</div>
          <div className='brandName'>Blossom Belle</div>
          {el.sale ? (
            <div className='Price_discount'>
              <div className='PriceAndPercent'>
                <div className='Price_deleted'>{el.price}֏</div> <div className='Percent_Discount'>{el.sale}%</div>
              </div>{' '}
              <div className='Price_Discounted'>{el.price - (el.price * el.sale) / 100}֏</div>
            </div>
          ) : (
            <div className='price'>{el.price}֏</div>
          )}
          <button className='btn_text' id={index} onClick={()=> navigate(`/product?path=${el.path}&id=${el.id}`)}>
            {el.btn_text}
          </button>
          <div className='shopping' id={index}>
            <i className=' fa-solid fa-bag-shopping' onClick={()=> handleShoppingClick(el)}></i>
          </div>
          <div className='heart' id={index} onClick={() => handleHeartClick(el.image)}>
            <i className={activeHearts.has(el.image) ? ' active fa-solid fa-heart' : 'fa-regular fa-heart'}></i>
          </div>
        </div>
      ))}
    </div>
  );
}