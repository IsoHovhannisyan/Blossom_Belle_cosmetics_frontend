import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import New from '../../Images/new_1.png';
import Best from '../../Images/best_seller_1.png';
import useAuth from '../../Auth/useAuth';
import axios from '../../axios';

export function Eye({ makeUp, basketProductsQuantity, setBasketProductsQuantity }) {
  let res = makeUp.filter((el) => el.category === 'eye');
  const eye = res;

  const isLoggedIn = useAuth();
  const navigate = useNavigate();

  const [userId, setUserId] = useState(sessionStorage.getItem('user_id') ? JSON.parse(sessionStorage.getItem('user_id')) : '');
  const [activeHearts, setActiveHearts] = useState(new Set());
  const [favorites, setFavorites] = useState('');

  useEffect(() => {
    const fetchFavorites = async () => {
      try {
        if (isLoggedIn) {
          const response = await axios.get(`/api/user/${userId}/favorites`);
          const { favorites } = response.data;
          setFavorites(favorites);
          setActiveHearts(new Set(favorites.split(',')));
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

    try {
      const updatedFavoritesString = Array.from(updatedActiveHearts).join(',');
      setFavorites(updatedFavoritesString);

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
            setBasketProductsQuantity(basketProductsQuantity + newProducts.length);
        }

        // Update sessionStorage with the updated products
        sessionStorage.setItem('Basket-Products', JSON.stringify(existingProducts));
    } catch (error) {
        // Handle errors
        console.error('Error handling shopping click:', error);
        // Optionally, you can provide user feedback about the error.
    }
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
      {eye.map((el, index) => (
        <div
          className={el.sale ? 'Product active' : 'Product'}
          onMouseMove={() => mouseMoveFunc(index)}
          onMouseLeave={() => mouseLeaveFunc(index)}
          key={el.id}
        >
          <div className='image' onClick={() => navigate(`/product?path=${el.path}&id=${el.id}`)}>
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
          <button className='btn_text' id={index} onClick={() => navigate(`/product?path=${el.path}&id=${el.id}`)}>
            {el.btn_text}
          </button>
          <div className='shopping' id={index}>
            <i className=' fa-solid fa-bag-shopping' onClick={() => handleShoppingClick(el)}></i>
          </div>
          <div className='heart' id={index} onClick={() => handleHeartClick(el.image)}>
            <i className={activeHearts.has(el.image) ? ' active fa-solid fa-heart' : 'fa-regular fa-heart'}></i>
          </div>
        </div>
      ))}
    </div>
  );
}
