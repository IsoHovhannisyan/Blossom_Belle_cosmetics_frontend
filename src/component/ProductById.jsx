import React, { useEffect, useState } from 'react'
import axios from '../axios'
import { json, useNavigate, useSearchParams } from 'react-router-dom';
import { fetchData, getSavedDataFromLocalStorage, AllCategories } from './Header';
import '../css/Product/ProductById.css';

export function ProductById({setBasketQuantity,setShowQuantity }) {

    const [quantity, setQuantity] = useState(1);

    const currentLanguage = localStorage.getItem('Blossom-Belle-Language') || 'en';

    const [product, setProduct] = useState()
    const [productLabel, setProductLabel] = useState();
    const [currentCategory, setCurrentCategory] = useState([]);
    let   [currentProductAnotherLang,setCurrentProductAnotherLang] = useState([]);
    const [toggle, setToggle] = useState(1);
    const [buttonDisabled, setButtonDisabled] = useState(true);
    const [showIntrestingProducts, setShowIntrestingProducts] = useState(false);
    const [searchParams] = useSearchParams();
    const path = searchParams.get('path');
    const id = searchParams.get('id');
    const pathName = path+'Data';
    const navigate = useNavigate();

    let basketQuantity = 1;

    // console.log(currentProductAnotherLang);




    useEffect(()=>{
        loadingData();
    },[])
    
    
      async function loadingData() {

        const productData = await axios.get(`/api/${path}/${id}`);

        AllCategories()
        .then(data=> {
            setCurrentProductAnotherLang(data[pathName].filter(el=> el.image == productData.data.image));
        }).catch(error => {
            console.error("An error occurred while fetching data:", error);
        });    
        const savedData = getSavedDataFromLocalStorage();
        if (savedData) {
            setProductLabel(savedData.ProductLabelData);
            setProduct(savedData[pathName].filter(el => el.image == productData.data.image)[0])
            console.log(savedData[pathName].filter(el => el.image == productData.image)[0]);
            setCurrentCategory(savedData[pathName].filter(el=> el.category === productData.data.category && el.id !== productData.data.id).slice(0,4));
        }
    
        if (currentLanguage) {
            fetchData(currentLanguage)
                .then(data => {
                    setProductLabel(data.ProductLabelData);
                    setProduct(data[pathName].filter(el => el.image == productData.data.image)[0])
                    setCurrentCategory(data[pathName].filter(el=> el.category === productData.data.category && el.id !== productData.data.id).slice(0,4));
                    setButtonDisabled(false)
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
                sessionStorage.setItem('Basket-Products', JSON.stringify([...sessionStorageProducts,...currentProductAnotherLang]));
            }
        }else{
            currentProductAnotherLang[0].quantityForOrder = quantity;
            currentProductAnotherLang[1].quantityForOrder = quantity;
            sessionStorage.setItem('Basket-Products', JSON.stringify([...currentProductAnotherLang]));
            console.log(JSON.parse(sessionStorage.getItem('Basket-Products')));
        }
        setShowQuantity(true);
        setQuantity(1);   
    }

    // setProduct(sessionStorage.getItem('Product-Lang') != null && JSON.parse(sessionStorage.getItem('Product-Lang'))[0]);


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
             <div className='flex justify-left items-center gap-1 mb-[1rem] text-[1.2rem]'>
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
