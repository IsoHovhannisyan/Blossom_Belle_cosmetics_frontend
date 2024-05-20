import React, { useEffect, useState } from 'react'
import { fetchData, getSavedDataFromLocalStorage } from '../component/Header';
import '../css/BasketPage/BasketPage.css';
import { useNavigate } from 'react-router-dom';
import {Checkout} from '../component/Checkout';
import { Payment } from '../component/Payment';
import FadeLoader from "react-spinners/FadeLoader";
import axios from '../axios';

export function BasketPage({basketProductsQuantity, setBasketProductsQuantity}) {

    const currentLanguage = localStorage.getItem('Blossom-Belle-Language') || 'en';
    const [allBasketProducts, setAllBasketProducts] = useState(JSON.parse(sessionStorage.getItem('Basket-Products')));
    const [basketLabel, setBasketLabel] = useState([]);
    const [productLabel, setProductLabel] = useState();
    const [myData, setMyData] = useState(sessionStorage.getItem('My_data') != null ? JSON.parse(sessionStorage.getItem('My_data')): true);
    const [checkoutData, setCheckoutData] = useState(JSON.parse(sessionStorage.getItem('Checkout_data')));
    const [confirmData, setConfirmData] = useState(JSON.parse(sessionStorage.getItem('Confirm_data')));
    const [buttonDisabled, setButtonDisabled] = useState(false);
    const [toggle, setToggle] = useState(sessionStorage.getItem('Toggle') ? JSON.parse(sessionStorage.getItem('Toggle')): 1);
    const navigate = useNavigate();
    const [basketProductsCurrentLang, setBasketProductsCurrentLang] = useState(allBasketProducts != null ?allBasketProducts.filter(el => el.lang == currentLanguage): null);
    const total = basketProductsCurrentLang != null ? basketProductsCurrentLang.reduce((sum,el) => {
        if(el.sale != null){
            return sum + (el.quantityForOrder * (el.price - el.price * el.sale / 100))
        }else{
            return sum + el.quantityForOrder * el.price
        }
        
    
    }, 0): null;
    const [checkoutDataArr, setCheckoutDataArr] = useState();
    const [loading, setLoading] = useState(true);


    useEffect(()=>{
        loadingData();
    },[]) 
    
      async function loadingData() {
        try{
            const [
                basketLabelData,
                productLabelData
            ] = await Promise.all([
              axios.get(`/api/basket?lang=${currentLanguage}`),
              axios.get(`/api/product?lang=${currentLanguage}`),
            ])
            setBasketLabel(basketLabelData.data);
            setCheckoutDataArr(basketLabelData.data[0].checkout_data.split(',  '));
            setProductLabel(productLabelData.data);
            setLoading(false)
          }catch (error) {
            console.error("An error occurred:", error);
            throw error;
        }
    }

    const minus = (product)=>{
        if(product.quantityForOrder !== 1){
            setAllBasketProducts(allBasketProducts.map(el => {
                if(product.image === el.image) {
                    if(el.quantityForOrder <= el.quantity+1){
                        setButtonDisabled(false);
                    }
                    el.quantityForOrder -= 1;
                    return el
                };
                return el
            }))
        }else{
            
            setAllBasketProducts(allBasketProducts.map(el => {
                if(product.image === el.image) {
                    el.quantityForOrder = 1;
                    return el
                };
                return el
            }))
        }
        return product
    }

    const ChangeBasketPage = ()=>{
        if(basketProductsCurrentLang.some(el => el.quantityForOrder > el.quantity)){
            setButtonDisabled(true);
            return
        }
        sessionStorage.setItem('Basket-Products', JSON.stringify(allBasketProducts))
        setMyData(false);
        setCheckoutData(true)
        setConfirmData(false);
        sessionStorage.setItem('My_data', JSON.stringify(false));
        sessionStorage.setItem('Checkout_data', JSON.stringify(true));
        sessionStorage.setItem('Confirm_data', JSON.stringify(false));
    }

    const plus = (product)=>{
        setAllBasketProducts(allBasketProducts.map(el => {
            if(product.image === el.image) {
                el.quantityForOrder += 1;
                return el
            };
            return el
        }));
    }

    const refreshProducts = ()=>{
        if(basketProductsCurrentLang.some(el => el.quantityForOrder > el.quantity)){
            return console.log('barev');
        }
        sessionStorage.setItem('Basket-Products', JSON.stringify(allBasketProducts));
    }

    const removeProduct = (image)=>{
        let Products = allBasketProducts.filter(el=> el.image !== image);
        setAllBasketProducts(Products);
        setBasketProductsCurrentLang(Products.filter(el => el.lang == currentLanguage))
        setBasketProductsQuantity(basketProductsQuantity - 1);
        sessionStorage.setItem('Basket-Products',JSON.stringify(Products))
    }

    

  return (
    <div>
        {
            basketProductsCurrentLang != false && basketProductsCurrentLang != null  ? !loading ? <div className='NotEmptyBasket'>

                <div className='Basket'>
                    <div className='Title'>
                        <h2>{basketLabel?.[0]?.title}</h2>
                    </div>
                    <div className=' Sequence'>
                        <div>
                            <h2 className={myData ? 'active': ''}>1</h2>
                            <h3 className={myData ? 'active': ''}>{basketLabel?.[0]?.mybasket}</h3>
                        </div>
                        <div>
                            <i className='fa-solid fa-arrow-right'></i>
                        </div>
                        <div>
                            <h2 className={checkoutData ? 'active': ''}>2</h2>
                            <h3 className={checkoutData ? 'active': ''}>{basketLabel?.[0]?.data}</h3>
                        </div>
                        <div>
                            <i className='fa-solid fa-arrow-right'></i>
                        </div>
                        <div>
                            <h2 className={confirmData ? 'active': ''}>3</h2>
                            <h3 className={confirmData ? 'active': ''}>{basketLabel?.[0]?.confirmation}</h3>
                        </div>
                    </div>

                    {myData && <div className=' BasketBox'>
                    <div className='BasketProducts'>
                        {
                            basketProductsCurrentLang.map((el, index) => <div className='BasketProduct'>
                                <div className='Image' onClick={()=> navigate(`/product?path=${el.path}&id=${el.id}`)}>
                                    <img src={`https://blossom-belle-cosmetics.vercel.app${el?.image}`} alt="" />
                                </div>

                                <div className='Basket_Product_Title'>
                                    <h3 className=''>{el.title}</h3>
                                </div>

                                <div className=' w-[15%] flex justify-between items-center'>
                                    <div className='Quantity'>
                                        <div className='minus' onClick={()=> minus(el)}><i className="fa-solid fa-minus"></i></div>
                                        <div className='qty'>{el.quantityForOrder}</div>
                                        <div className='plus' onClick={()=> plus(el)}><i className="fa-solid fa-plus"></i></div>
                                        <div className={el.quantityForOrder > el.quantity ? 'ProductQtyText active': 'ProductQtyText'}>
                                            <i className="fa-solid fa-xmark "></i>
                                            <div className='Insufficient'>
                                                <p>{productLabel?.[0]?.product_qty_text.split(', ')[0]}</p>
                                                <div className='flex justify-center items-center'>
                                                    <p>{el.quantity}</p>
                                                    <p>{productLabel?.[0]?.product_qty_text.split(', ')[1]}</p>
                                                </div>
                                                
                                            </div>
                                            
                                            
                                        </div>
                                    </div>
                                    <div onClick={()=> refreshProducts()}>
                                        <i className="fa-solid fa-rotate-right text-green-600 cursor-pointer text-[20px]"></i>
                                    </div>
                                     
                                </div>
                                {el.sale != null ? <div className='Price_One_Product'>
                                    <h3 className=''>{el.price - el.price * el.sale / 100}֏</h3>
                                </div>:
                                <div className='Price_One_Product'>
                                    <h3 className=''>{el.price}֏</h3>
                                </div>}
                                <div className=' flex justify-center items-center'>
                                    {el.sale != null ? <div className='Price_Few_Products '>
                                        <h3 className='h3'>{(el.price - el.price * el.sale / 100)* el.quantityForOrder}֏</h3>
                                    </div>:
                                    <div className='Price_Few_Products '>
                                        <h3 className='h3'>{el.price * el.quantityForOrder}֏</h3>
                                    </div> }
                                    <div onClick={()=> removeProduct(el.image)}><i className="fa-solid fa-xmark text-red-600 text-[25px] cursor-pointer"></i></div>
                                </div>
                                
                                
                            </div>)
                        }
                    </div>

                    <div className='ClearBasket' onClick={()=> {
                            sessionStorage.clear();
                            setAllBasketProducts(null)
                            setBasketProductsCurrentLang(null)
                            setBasketProductsQuantity(0);
                            }
                            }>
                            <div className=' flex items-center'>
                                <div><i className="fa-solid fa-xmark text-red-600 text-[25px] cursor-pointer"></i></div>
                                <div className='clearText'>{basketLabel?.[0]?.basket_clear}</div>
                            </div>
                                
                            <div className='ReviewBasket'>
                                {buttonDisabled ? <div>{basketLabel?.[0]?.checkout_data?.split(',  ')[19]}</div>: <div></div> }
                            </div>
                        
                    </div>

                    <div className='TotalAndButtons'>
                        <div className=' Total'>
                            <div>{basketLabel?.[0]?.total}</div>
                            <h2>{total} ֏</h2>
                        </div>
                        <div className=' buttons'>
                            <div className='Continue' onClick={()=> navigate('/')}>
                                <button className=''>{basketLabel?.[0]?.continueshop}</button> 
                            </div>
                            <div className='btn'>
                                <button className='' onClick={()=> ChangeBasketPage()}>
                                    {basketLabel?.[0]?.checkout}</button>
                            </div>
                        </div>
                        
                        
                    </div>
                    </div>
                    }

                    {checkoutData && <Checkout basketLabel={basketLabel} setMyData={setMyData} setCheckoutData={setCheckoutData} setConfirmData={setConfirmData} basketProductsCurrentLang={basketProductsCurrentLang} setBasketProductsQuantity={setBasketProductsQuantity} total={total} checkoutDataArr={checkoutDataArr} toggle={toggle} setToggle={setToggle} allBasketProducts={allBasketProducts} />}

                    {confirmData && <Payment toggle={toggle} payment={basketLabel?.[0]?.payment?.split(', ')} basketProductsCurrentLang={basketProductsCurrentLang} setBasketProductsQuantity={setBasketProductsQuantity}/> }

                </div>
                
            </div>:<div className='FadeLoader'>
                <FadeLoader
                    color='#006699'
                    loading={loading}
                    size={100}
                    aria-label="Loading Spinner"
                    data-testid="loader"
                    />
            </div>:
            !loading ?
            <div className='BasketEmpty'>
                <div className='Basket'>
                    <div className='Title'>
                        <h2>{basketLabel?.[0]?.title}</h2>
                    </div>
                    <div className='QtyBox'>
                        <div className='Quantity'>
                            <h2>0</h2>
                        </div>
                    </div>
                    
                    <div className='Text'>
                        <h3>{basketLabel?.[0]?.empty_text}</h3>
                    </div>
                    <div className='BtnBox'>
                        <div className='Btn' onClick={() => navigate('/')} >
                            <button>{basketLabel?.[0]?.btn_text}</button>
                        </div>
                    </div>
                    
                </div>
            </div>:<div className='FadeLoader'>
                <FadeLoader
                    color='#006699'
                    loading={loading}
                    size={100}
                    aria-label="Loading Spinner"
                    data-testid="loader"
                    />
            </div>

        }
    </div>
  )
}
