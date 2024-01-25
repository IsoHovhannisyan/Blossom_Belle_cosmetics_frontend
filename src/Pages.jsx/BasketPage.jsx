import React, { useEffect, useState } from 'react'
import { fetchData, getSavedDataFromLocalStorage } from '../component/Header';
import '../css/BasketPage/BasketPage.css';
import { useNavigate } from 'react-router-dom';
import Checkout from '../component/Checkout';

export function BasketPage() {

    const [basketLabel, setBasketLabel] = useState([]);
    const [productLabel, setProductLabel] = useState();
    const [myData, setMyData] = useState(true);
    const [checkoutData, setCheckoutData] = useState(false)
    const [confirmData, setConfirmData] = useState(false);
    const navigate = useNavigate();
    const currentLanguage = localStorage.getItem('Blossom-Belle-Language') || 'en';
    let [sessionStorageBasketProducts, setSessionStorageBasketProducts] = useState(JSON.parse(sessionStorage.getItem('Basket-Products')));
    const total = sessionStorageBasketProducts != null ? sessionStorageBasketProducts.reduce((sum,el) => sum + el.quantityForOrder * el.price, 0): null;

    useEffect(()=>{
        loadingData();
    },[])

    console.log(sessionStorageBasketProducts);
    
    
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
            product.quantityForOrder -= 1;
            setSessionStorageBasketProducts(sessionStorageBasketProducts.map(el => {
                if(product.id === el.id) return product;
                return el
            }))
        }else{
            product.quantityForOrder = 1;
            setSessionStorageBasketProducts(sessionStorageBasketProducts.map(el => {
                if(product.id === el.id) return product;
                return el
            }))
        }
        return product
    }

    const plus = (product)=>{
        product.quantityForOrder += 1;
        setSessionStorageBasketProducts(sessionStorageBasketProducts.map(el => {
            if(product.id === el.id) return product;
            return el
        }));
    }

    const refreshProducts = ()=>{
        sessionStorage.setItem('Basket-Products', JSON.stringify(sessionStorageBasketProducts));
    }

    const removeProduct = (id)=>{
        let Products = sessionStorageBasketProducts.filter(el=> el.id !== id);
        setSessionStorageBasketProducts(Products);
        sessionStorage.setItem('Basket-Products',JSON.stringify(Products))
    }

    

  return (
    <div>
        {
            sessionStorageBasketProducts != false && sessionStorageBasketProducts != null  ? <div className='NotEmptyBasket'>

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
                            sessionStorageBasketProducts.map((el, index) => <div className='BasketProduct'>
                                <div className='Image'>
                                    <img src={`https://blossom-belle-cosmetics.vercel.app${el?.image}`} alt="" />
                                </div>

                                <div className='Title '>
                                    <h3 className=' text-[1.5rem]'>{el.title}</h3>
                                </div>

                                <div className=' w-[15%] flex justify-between items-center'>
                                    <div className='Quantity'>
                                        <div className='minus' onClick={()=> minus(el)}><i className="fa-solid fa-minus"><div></div></i></div>
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
                                    <div onClick={()=> removeProduct(el.id)}><i className="fa-solid fa-xmark text-red-600 text-[25px] cursor-pointer"></i></div>
                                </div>
                                
                                
                            </div>)
                        }
                    </div>

                    <div className='ClearBasket'>
                        <div><i className="fa-solid fa-xmark text-red-600 text-[25px] cursor-pointer"></i></div>
                        <div className='clearText' onClick={()=> {
                            sessionStorage.clear();
                            setSessionStorageBasketProducts(null)
                            }
                            }>{basketLabel?.[0]?.basket_clear}</div>
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
                                <button className='' onClick={()=> {
                                    setMyData(false);
                                    setCheckoutData(true)
                                    setConfirmData(false);
                                    }
                                    }
                                    >{basketLabel?.[0]?.checkout}</button>
                            </div>
                        </div>
                        
                        
                    </div>
                    </div>}

                    {checkoutData && <Checkout basketLabel={basketLabel} />}



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
