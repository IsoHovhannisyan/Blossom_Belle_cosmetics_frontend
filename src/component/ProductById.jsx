import React, { useEffect, useState } from 'react'
import axios from '../axios'
import { useNavigate, useSearchParams } from 'react-router-dom';
import { fetchData, getSavedDataFromLocalStorage } from './Header';
import '../css/Product/ProductById.css';
import { IntrestingProducts } from './IntrestingProducts';

export function ProductById() {

    const [product, setProduct] = useState()
    const [productLabel, setProductLabel] = useState();
    const [currentCategory, setCurrentCategory] = useState([]);
    const currentLanguage = localStorage.getItem('Blossom-Belle-Language') || 'en';
    const [toggle, setToggle] = useState(1);
    const [showIntrestingProducts, setShowIntrestingProducts] = useState(false);
    const [searchParams] = useSearchParams();
    const path = searchParams.get('path');
    const id = searchParams.get('id');
    const pathName = path+'Data';
    const navigate = useNavigate();

    
    const [quantity, setQuantity] = useState(1);



    useEffect(()=>{
        loadingData();
    },[])
    
    
      async function loadingData() {

        const productData = await axios.get(`/api/${path}/${id}`);
        setProduct(productData.data);
        console.log(productData.data);
    
        const savedData = getSavedDataFromLocalStorage();
        if (savedData) {
            setProductLabel(savedData.ProductLabelData);
            setCurrentCategory(savedData[pathName].filter(el=> el.category === productData.data.category && el.id !== productData.data.id).slice(0,4));
            setShowIntrestingProducts(true);
        }
    
        if (currentLanguage) {
            fetchData(currentLanguage)
                .then(data => {
                    setProductLabel(data.ProductLabelData);
                    setCurrentCategory(data[pathName].filter(el=> el.category === productData.data.category && el.id !== productData.data.id).slice(0,4));
                    localStorage.setItem('fetchedData', JSON.stringify(data));
                })
                .catch(error => {
                    console.error("An error occurred while fetching data:", error);
                });
        }

        setShowIntrestingProducts(true);
    }

    const refreshPage = (path, id)=>{
        navigate(`/product?path=${path}&id=${id}`);
        window.location.reload();
    }


  return (
     showIntrestingProducts && <div className='Product'>
     <div className='Box'>
         <div className='Image'>
         <img src={`https://blossom-belle-cosmetics.vercel.app${product?.image}`} alt="" />
         </div>
         <div className='Title'>
             <h2>{product?.title}</h2>
             <h3>{productLabel?.[0]?.note}</h3>
         </div>
         <div className='Price'>
             <div className='BoxPrice'>
                 <h2>{product?.price * quantity} ֏</h2>
             </div>
             <div className='quantity'>
                 <div onClick={()=> quantity !== 1 ? setQuantity(quantity-1): setQuantity(1)} className={ quantity !== 1 ? 'cursor-pointer': ''}>-</div>
                 <div>{quantity}</div>
                 <div onClick={()=> setQuantity(quantity+1)} className=' cursor-pointer'>+</div>
             </div>
             <div className='BoxBtn'>
                 <button className='btn'>{productLabel?.[0]?.btn_text}</button>
             </div>
             <div className='BoxFav'>
                 <button className='Fav'>{productLabel?.[0]?.basket_text}<i className="fa-regular fa-heart ml-[.5rem]"></i></button>
             </div>
             

             
         </div>
     </div>
     <div className='DetailAndDelivery'>
         <div className='Title'>
             <div onClick={()=> setToggle(1)} className={toggle === 1 ? 'show': 'notshow'}>{productLabel?.[0]?.detail_text}</div>
             <div onClick={()=> setToggle(2)} className={toggle === 2 ? 'show': 'notshow'}>{productLabel?.[0]?.delivery_text}</div>
         </div>
         <div className='DetailOrDelivery'>
             {
                 toggle === 1 ? <div>{product?.descr}</div>: <div>{productLabel?.[0]?.delivery}</div>
             }
         </div>
     </div>
     <div className='IntrestingProducts'>
             {currentCategory.map(el => <div className='Product' onClick={()=>refreshPage(el?.path, el?.id)} key={el?.id}>
              <div className='image'>
              <img src={`https://blossom-belle-cosmetics.vercel.app${el.image}`} alt="" />
                 </div>
                 <div>{el?.title}</div>
                 <div>{el?.price}֏</div>
             </div>)}
     </div>
 </div>
  )
}
