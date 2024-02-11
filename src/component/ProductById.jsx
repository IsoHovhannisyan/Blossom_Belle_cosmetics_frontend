import React, { useEffect, useState } from 'react'
import axios from '../axios'
import {  useNavigate, useSearchParams } from 'react-router-dom';
import { fetchData, getSavedDataFromLocalStorage, AllCategories } from './Header';
import '../css/Product/ProductById.css';
import New from "../Images/new_1.png"
import Best from '../Images/best_seller_1.png'
import FadeLoader from "react-spinners/FadeLoader";

export function ProductById({setBasketQuantity,setShowQuantity, basketProductsQuantity, setBasketProductsQuantity }) {

    const [quantity, setQuantity] = useState(1);

    const currentLanguage = localStorage.getItem('Blossom-Belle-Language') || 'en';

    const [product, setProduct] = useState()
    const [productLabel, setProductLabel] = useState();
    const [currentCategory, setCurrentCategory] = useState([]);
    const [currentProductAnotherLang,setCurrentProductAnotherLang] = useState([]);
    const [toggle, setToggle] = useState(1);
    const [buttonDisabled, setButtonDisabled] = useState(true);
    const [showIntrestingProducts, setShowIntrestingProducts] = useState(false);
    const [loading, setLoading] = useState(true);
    const [searchParams] = useSearchParams();
    const path = searchParams.get('path');
    const id = searchParams.get('id');
    const pathName = path+'Data';
    const navigate = useNavigate();

    let basketQuantity = 1;

    useEffect(()=>{
        loadingData();
    },[])
    
    
      async function loadingData() {
        // const savedData = getSavedDataFromLocalStorage();
        // if (savedData) {
        //     setProductLabel(savedData.ProductLabelData.filter(el => el.lang == currentLanguage));
        //     setProduct(savedData[pathName].filter(el => el.lang == currentLanguage).filter(el => el.image == productData.data.image)[0])
        //     setCurrentCategory(savedData[pathName].filter(el => el.lang == currentLanguage).filter(el=> el.category === productData.data.category && el.id !== productData.data.id).slice(0,4));
        //     setCurrentProductAnotherLang(savedData[pathName].filter(el=> el.image == productData.data.image));
        //     setLoading(false);
        //     setButtonDisabled(false)
        // }else {
        //     fetchData()
        //         .then(data => {
        //             setProductLabel(savedData.ProductLabelData.filter(el => el.lang == currentLanguage));
        //             setProduct(savedData[pathName].filter(el => el.lang == currentLanguage).filter(el => el.image == productData.data.image)[0])
        //             setCurrentCategory(savedData[pathName].filter(el => el.lang == currentLanguage).filter(el=> el.category === productData.data.category && el.id !== productData.data.id).slice(0,4));
        //             setCurrentProductAnotherLang(savedData[pathName].filter(el=> el.image == productData.data.image));
        //             setButtonDisabled(false)
        //         })
        //         .catch(error => {
        //             console.error("An error occurred while fetching data:", error);
        //         });
        // }

        try{
            const [
                productLabelData,
                productData,
                productsData,
            ] = await Promise.all([
                axios.get(`/api/product`),
                axios.get(`/api/${path}/${id}`),   
                axios.get(`/api/${path}`),
            ])
            setProductLabel(productLabelData.data.filter(el => el.lang == currentLanguage));
            setProduct(productsData.data.filter(el => el.lang == currentLanguage).filter(el => el.image == productData.data.image)[0])
            setCurrentCategory(productsData.data.filter(el => el.lang == currentLanguage).filter(el=> el.id !== productData.data.id && el.new == 'true').slice(0,5));
            setCurrentProductAnotherLang(productsData.data.filter(el=> el.image == productData.data.image));
            setLoading(false);
            setButtonDisabled(false)
        }catch(error){
            console.error("An error occurred while fetching data:", error);
        }
        setShowIntrestingProducts(true);
    }

    const refreshPage = (path, id)=>{
        navigate(`/product?path=${path}&id=${id}`);
        window.location.reload();
    }

    const handleSubmit = (e)=>{
        e.preventDefault();
        setBasketQuantity( basketQuantity + quantity);

        if(sessionStorage.getItem('Basket-Products') != null){
            currentProductAnotherLang[0].quantityForOrder = quantity;
            currentProductAnotherLang[1].quantityForOrder = quantity;
            let sessionStorageProducts = JSON.parse(sessionStorage.getItem('Basket-Products'));
            let findProductInSesionStorage = false;
            for(let elem of sessionStorageProducts){
                if(elem.image == product.image){
                    elem.quantityForOrder += quantity;
                    findProductInSesionStorage = true;
                }
            }
            if(findProductInSesionStorage){
                sessionStorage.setItem('Basket-Products', JSON.stringify([...sessionStorageProducts]))
            }else{
                setBasketProductsQuantity(basketProductsQuantity + 1);
                sessionStorage.setItem('Basket-Products', JSON.stringify([...sessionStorageProducts,...currentProductAnotherLang]));
            }
        }else{
            currentProductAnotherLang[0].quantityForOrder = quantity;
            currentProductAnotherLang[1].quantityForOrder = quantity;
            setBasketProductsQuantity(1);
            sessionStorage.setItem('Basket-Products', JSON.stringify([...currentProductAnotherLang]));
            console.log(JSON.parse(sessionStorage.getItem('Basket-Products')));
        }
        setShowQuantity(true);
        setQuantity(1);   
    }

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

    // setProduct(sessionStorage.getItem('Product-Lang') != null && JSON.parse(sessionStorage.getItem('Product-Lang'))[0]);


  return (
     showIntrestingProducts ? <div className='Product'>
     <div className='Box'>
         <div className='Image'>
            <img src={`https://blossom-belle-cosmetics.vercel.app${product?.image}`} alt="" />
            <div className={product?.new ? 'new active': 'new'}>
                <img src={New} alt="" />
            </div>
            <div className={product?.best_seller ? 'best active': 'best'}>
                <img src={Best} alt="" />
            </div>
         </div>
         <div className='Product_Text'>
             <h2 className='Product_Title'>{product?.title}</h2>
             <h3 className='Product_Note'>{productLabel?.[0]?.note}</h3>
         </div>
         <div className='Price'>
            {product?.sale != null ? <div className='BoxPrice'>
                 <div className='Price_Div'><div className='Real_Price_deleted'>{product?.price}֏</div><div className='Price_Discounted'>{(product?.price - product?.price * product?.sale / 100)* quantity}֏</div> <div className='Number_of_Percent'>{product?.sale}%</div> </div>
             </div>:
            <div className='BoxPrice'>
                <h2>{product?.price * quantity} ֏</h2>
            </div>
             }
             
             <div className='quantity'>
                 <div onClick={()=> quantity !== 1 ? setQuantity(quantity-1): setQuantity(1)} className={ quantity !== 1 ? 'ProductMinus cursor-pointer': 'ProductMinus'}><i className="fa-solid fa-minus"></i></div>
                 <div className='Number_Quantity'>{quantity}</div>
                 <div onClick={()=> setQuantity(quantity+1)} className='ProductPlus cursor-pointer'><i className="fa-solid fa-plus"></i></div>
             </div>
             <div className='Product_Stock'>
                <div>
                    {productLabel?.[0]?.product_qty_text.split(', ')[0]}
                </div>
                <div>
                    {product?.quantity}
                </div>
                <div>
                    {productLabel?.[0]?.product_qty_text.split(', ')[1]}
                </div>
                
             </div>
             <div className='BoxBtn'>
                 <button className='btn' disabled={buttonDisabled} onClick={handleSubmit}>{productLabel?.[0]?.btn_text}</button>
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
     <div className='Products'>
      {
        currentCategory.map((el,index) => <div className={el.sale ? 'Product sale active' : 'Product sale' }  
        onClick={()=>refreshPage(el?.path, el?.id)} 
        onMouseMove={()=> mouseMoveFunc(index)}
        onMouseLeave={()=> mouseLeaveFunc(index)} 
        key={el.id}
        >
        <div className='image'>
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
        <button className='btn_text' id={index}>{el.btn_text}</button>
        <div className='shopping' id={index}><i className=" fa-solid fa-bag-shopping"></i></div>
        <div className='heart' id={index}><i className=" fa-regular fa-heart"></i></div>
      </div>)
      }
    </div>
 </div>:
    <div className=' w-full h-[60vh] flex justify-center items-center'><FadeLoader
        color='#006699'
        loading={loading}
        size={100}
        aria-label="Loading Spinner"
        data-testid="loader"
        />
    </div>
  )
}
