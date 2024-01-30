import React, { useEffect, useState } from 'react'
import { fetchData, getSavedDataFromLocalStorage } from '../component/Header';
import '../css/BasketPage/BasketPage.css';
import { useNavigate } from 'react-router-dom';
import {Checkout} from '../component/Checkout';

export function BasketPage({basketProductsQuantity, setBasketProductsQuantity}) {

    const currentLanguage = localStorage.getItem('Blossom-Belle-Language') || 'en';
    const [allBasketProducts, setAllBasketProducts] = useState(JSON.parse(sessionStorage.getItem('Basket-Products')));
    const [basketLabel, setBasketLabel] = useState([]);
    const [productLabel, setProductLabel] = useState();
    const [myData, setMyData] = useState(sessionStorage.getItem('My_data') != null ? JSON.parse(sessionStorage.getItem('My_data')): true);
    const [checkoutData, setCheckoutData] = useState(JSON.parse(sessionStorage.getItem('Checkout_data')));
    const [confirmData, setConfirmData] = useState(JSON.parse(sessionStorage.getItem('Confirm_data')));
    const [buttonDisabled, setButtonDisabled] = useState(false);
    const navigate = useNavigate();
    const [basketProductsCurrentLang, setBasketProductsCurrentLang] = useState(allBasketProducts != null ?allBasketProducts.filter(el => el.lang == currentLanguage): null);
    const total = basketProductsCurrentLang != null ? basketProductsCurrentLang.reduce((sum,el) => sum + el.quantityForOrder * el.price, 0): null;
    const [checkoutDataArr, setCheckoutDataArr] = useState();

    useEffect(()=>{
        loadingData();
    },[])

    console.log(myData);
    
    
      async function loadingData() {
    
        const savedData = getSavedDataFromLocalStorage();
        if (savedData) {
            setBasketLabel(savedData.BasketLabelData);
            setProductLabel(savedData.ProductLabelData);
        }
    
        if (currentLanguage) {
            fetchData(currentLanguage)
                .then(data => {
                    setBasketLabel(data.BasketLabelData);
                    setCheckoutDataArr(data.BasketLabelData[0].checkout_data.split(',  '));
                    setProductLabel(data.ProductLabelData);
                    localStorage.setItem('fetchedData', JSON.stringify(data));
                })
                .catch(error => {
                    console.error("An error occurred while fetching data:", error);
                });
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
            basketProductsCurrentLang != false && basketProductsCurrentLang != null  ? <div className='NotEmptyBasket'>

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

                                <div className='Title '>
                                    <h3 className=' text-[1.5rem]'>{el.title}</h3>
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
                                <div className=' text-[30px]'>
                                    <h3 className=''>{el.price}֏</h3>
                                </div>
                                <div className=' flex justify-center items-center'>
                                    <div className=' PriceQty text-[30px] mr-[2rem]'>
                                        <h3 className='h3'>{el.price * el.quantityForOrder}֏</h3>
                                    </div>
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

                    {checkoutData && <Checkout basketLabel={basketLabel} setMyData={setMyData} setCheckoutData={setCheckoutData} setConfirmData={setConfirmData} basketProductsCurrentLang={basketProductsCurrentLang} total={total} checkoutDataArr={checkoutDataArr} />}

                </div>
                
            </div>:
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
                        <div className='Btn' onClick={()=> navigate('/')} >
                            <button>{basketLabel?.[0]?.btn_text}</button>
                        </div>
                    </div>
                    
                </div>
                
               
               
            </div>
        }
    </div>
  )
}
