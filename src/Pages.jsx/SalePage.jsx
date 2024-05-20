import React from 'react'
import {useState, useEffect} from 'react'
import { fetchData, getSavedDataFromLocalStorage } from '../component/Header';
import { useNavigate } from 'react-router-dom';
import New from "../Images/new_1.png";
import Best from '../Images/best_seller_1.png';
import '../css/Sale/SalePage.css';
import { Selector } from '../component/Sale/Selector';
import useAuth from '../Auth/useAuth';
import axios from '../axios';

import FadeLoader from "react-spinners/FadeLoader";



export function SalePage({basketProductsQuantity, setBasketProductsQuantity}) {

  const currentLanguage = localStorage.getItem('Blossom-Belle-Language') || 'en';


  const [productCategory, setProductCategory] = useState();
  const [allCategories, setAllCategories] = useState([]);
  const [navbarForSelectors, setNavbarForSelectors] = useState([]);
  const [navbarSaleForSelectors,setNavbarSaleForSelectors] = useState([]);
  const [categoriesForSelectors, setCategoriesForSelectors] = useState([])
  const [loading, setLoading] = useState(true);
  const [formData, setFormData] = useState({
    percent: 'Select Percentage',
    category: 'Select Category',
    type: 'Select Type'
})
  const [percent, setPercent] = useState(null);
  const assortments = ['makeup', 'skincare', 'brush', 'hair', 'gift'];
  const [assortment, setAssortment] = useState('');
  const [category, setCategory] = useState('');
  let categories = new Set(allCategories?.filter(el => el.lang == currentLanguage).map(el => {
    
    if(assortment){
      if(el.path == assortment){
        console.log(el.category);
        return el.category
      }  
    }
  }));
  
  categories.delete(undefined)

  const Sale = allCategories?.filter(el => el.lang == currentLanguage).filter(el => {
    if(percent === null){
      if(assortment){
        if(category){
          return el.sale != percent && el.path == assortment && el.category == category;
        }else{
          return el.sale != percent && el.path == assortment
        }
      }else if(category){
        return el.sale != percent && el.category == category;
      }else{
        return el.sale != percent
      }
    }
    if(percent == 25){
      if(assortment){
        if(category){
          return el.sale == percent && el.path == assortment && el.category == category;
        }else{
          return el.sale == percent && el.path == assortment
        }
      }else if(category){
        return el.sale == percent && el.category.toLowerCase() == category;
      }else{
        return el.sale == percent
      }
    }
    if(percent == 50){
      if(assortment){
        if(category){
          return el.sale == percent && el.path == assortment && el.category == category;
        }else{
          return el.sale == percent && el.path == assortment
        }
      }else if(category){
        return el.sale == percent && el.category.toLowerCase() == category;
      }else{
        return el.sale == percent
      }
    }     
  }
    )
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

  useEffect(()=>{
    loadingData()
    sessionStorage.setItem('My_data', JSON.stringify(true));
    sessionStorage.setItem('Checkout_data', JSON.stringify(false));
    sessionStorage.setItem('Confirm_data', JSON.stringify(false));
  },[])

  async function loadingData(){

    try{
      const [
        navbarData,
        makeupData,
        skincareData,
        brushData,
        hairData,
        giftData
      ] = await Promise.all([
        axios.get(`/api/navbar?lang=${currentLanguage}`),
        axios.get(`/api/makeup?lang=${currentLanguage}`),
        axios.get(`/api/skincare?lang=${currentLanguage}`),
        axios.get(`/api/brush?lang=${currentLanguage}`),
        axios.get(`/api/hair?lang=${currentLanguage}`),
        axios.get(`/api/gift?lang=${currentLanguage}`),
      ])
      setNavbarForSelectors(navbarData.data?.[0]?.navbar.split(', '))
      setNavbarSaleForSelectors(navbarData.data.filter(el => el.lang == currentLanguage)[0]?.sale.split(', '))
      setCategoriesForSelectors(navbarData.data?.[0]?.categories.split(', ').filter(el=>  el.slice(0,3) !== "New" && el.slice(0,3) !== "Նոր") )
      setAllCategories([...makeupData.data,...skincareData.data,...brushData.data,...hairData.data, ...giftData.data]);
      setLoading(false)
    }catch (error) {
      console.error("An error occurred:", error);
      throw error;
  }
  }
  const navigate = useNavigate();

  const mouseMoveFunc = (index)=>{
    if(index > 9){
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
    if(index > 9){
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

  const onClearFilter = ()=>{
    setFormData({
        percent: 'Select Percentage',
        category: 'Select Category',
        type: 'Select Type'
    })
    setPercent(null);
    setAssortment(null)
    setCategory(null)

}
  return !loading ?<div>

    <Selector setPercent={setPercent} assortments={assortments} navbarSaleForSelectors={navbarSaleForSelectors} navbarForSelectors={navbarForSelectors} categoriesForSelectors={categoriesForSelectors} setAssortment={setAssortment} categories={categories} setCategory={setCategory} formData={formData} setFormData={setFormData}/>
    <div className='Sale '>

      {Sale?.length > 0 ? Sale?.map((el,index) => <div className={el.sale ? 'Product active' : 'Product' } 
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
      <div className='title'>{el.title.length > 20 ? el.title.slice(0,20) + '...': el.title}</div>
        <div className='brandName'>Blossom Belle</div>
        {
          el.sale ? <div className='Price_discount'><div className='PriceAndPercent'><div className='Price_deleted'>{el.price}֏</div> <div className='Percent_Discount'>{el.sale}%</div></div> <div className='Price_Discounted'>{el.price - el.price * el.sale / 100}֏</div></div>: <div className='price'>{el.price}֏</div>
        }
      <button className='btn_text' id={index} onClick={()=> navigate(`/product?path=${el.path}&id=${el.id}`)}>
            {el.btn_text}
          </button>
          <div className='shopping' id={index}>
            <i className=' fa-solid fa-bag-shopping' onClick={()=> handleShoppingClick(el)}></i>
          </div>
          <div className='heart' id={index} onClick={() => handleHeartClick(el.image)}>
            <i className={activeHearts.has(el.image) ? ' active fa-solid fa-heart' : 'fa-regular fa-heart'}></i>
          </div>
      </div>): <div className='SaleEmpty'>
                <div className='SaleBox'>
                    <div className='QtyBox'>
                        <div className='Quantity'>
                            <h2>0</h2>
                        </div>
                    </div>
                    
                    <div className='Text'>
                        <h3>{navbarSaleForSelectors[0]}</h3>
                    </div>
                    <div className='BtnBox'>
                        <div className='Btn' onClick={()=> onClearFilter()} >
                            <button>{navbarSaleForSelectors[1]}</button>
                        </div>
                    </div>
                    
                </div>
                
               
               
            </div>}

      </div>
      </div>:
      <div className='FadeLoader'>
      <FadeLoader
            color='#006699'
            loading={loading}
            size={100}
            aria-label="Loading Spinner"
            data-testid="loader"
          />
      </div>
}