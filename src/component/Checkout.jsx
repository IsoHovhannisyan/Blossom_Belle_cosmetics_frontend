import React, { useState } from 'react'
import Visa from "../Images/visa.png"
import axios from '../axios';
export function Checkout({basketLabel, setMyData, setCheckoutData, setConfirmData, basketProductsCurrentLang, total, checkoutDataArr, toggle, setToggle, allBasketProducts}) {

    const BackBasketPage = ()=>{
        setMyData(true);
        setCheckoutData(false)
        setConfirmData(false);
        sessionStorage.setItem('My_data', JSON.stringify(true));
        sessionStorage.setItem('Checkout_data', JSON.stringify(false));
        sessionStorage.setItem('Confirm_data', JSON.stringify(false));
    }

    const ChangeBasketPage = async()=>{
        // if(toggle === 1){
        //     try{
        //         for(let i = 0; i< allBasketProducts.length; i++){
        //             let res = await axios.get(`/api/${allBasketProducts[0].path}/${allBasketProducts[0].id}`);
        //             console.log(res);
        //             const headers = {
        //                 'Authorization': `Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY1OWQ3YTE0MjFkMTNjNmEzMTEyOWE4YyIsImlhdCI6MTcwNzUxNjg4MywiZXhwIjoxNzEwMTA4ODgzfQ.wM1HtMiRRuXMOm7hGjwxNX28yRGjB8_1p-FMr8ix5QA`,
        //               };
        //             const data = {
        //                 best_seller: allBasketProducts[i].best_seller,
        //                 btn_text: allBasketProducts[i].btn_text,
        //                 category: allBasketProducts[i].category,
        //                 descr: allBasketProducts[i].descr,
        //                 image: allBasketProducts[i].image,
        //                 lang: allBasketProducts[i].lang,
        //                 new: allBasketProducts[i].new,
        //                 path: allBasketProducts[i].path,
        //                 price: allBasketProducts[i].price,
        //                 quantity: allBasketProducts[i].quantity - allBasketProducts[i].quantityForOrder,
        //                 sale: allBasketProducts[i].sale,
        //                 title: allBasketProducts[i].title
        //             }
        //             await axios.put(`/api/${allBasketProducts[i].path}/edit/${allBasketProducts[i].id}`, data, { headers })
        //             // eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY1OWQ3YTE0MjFkMTNjNmEzMTEyOWE4YyIsImlhdCI6MTcwNzUxNjg4MywiZXhwIjoxNzEwMTA4ODgzfQ.wM1HtMiRRuXMOm7hGjwxNX28yRGjB8_1p-FMr8ix5QA
        //         };
        //     }catch (error) {
        //         console.log(error);
        //         // throw error;
        //     }
        //     // let res = await axios.get(`/api/${allBasketProducts[0].path}/${allBasketProducts[0].id}`)
        //     // console.log(res);
        // }
        setMyData(false);
        setCheckoutData(false)
        setConfirmData(true);
        sessionStorage.setItem('My_data', JSON.stringify(false));
        sessionStorage.setItem('Checkout_data', JSON.stringify(false));
        sessionStorage.setItem('Confirm_data', JSON.stringify(true));
        sessionStorage.setItem('Toggle', JSON.stringify(toggle));
    }

  return (
    <div className='Checkout_data'>
        <div className=' flex justify-center items-center'>
        <div className='DataBox'>
            <div className='Checkout_data_text'>
                <h3>{checkoutDataArr?.[0]}</h3>
                <a href="/login">{checkoutDataArr?.[1]}</a>
            </div>
            <div className='Data'>
                <div className='InputBox'>
                    <input type="text" required='required' /> <span>{checkoutDataArr?.[2]}*</span>
                </div>
                <div className='InputBox'>
                    <input type="text" required='required' /> <span>{checkoutDataArr?.[3]}</span>
                </div>
                <div className='InputBox'>
                    <input type="text" required='required' /> <span>{checkoutDataArr?.[4]}</span>
                </div>
                <div className='InputBox'>
                    <input type="text" required='required' /> <span>{checkoutDataArr?.[5]}</span>
                </div>
                <div className='InputBox'>
                    <input type="text" required='required' /> <span>{checkoutDataArr?.[6]}</span>
                </div>
                <div className='InputBox'>
                    <input type="number" required='required' /> <span>{checkoutDataArr?.[7]}</span>
                </div>
                <div className='CommentBox'>
                    {/* <input type="number" required='required' className='Comment' /> <span>{checkoutDataArr?.[8]}</span> */}
                    <textarea required='required'></textarea> <span>{checkoutDataArr?.[8]}</span>
                </div>
            </div>

            <div className='Payment_method'>
                <div className='PaymentTitleBox'>
                    <h2 className='Payment_title'>{checkoutDataArr?.[9]}</h2>
                </div>
                <div className='PaymentBox'>
                    <div className={toggle === 1 ? 'Payment_image active': 'Payment_image'} onClick={()=>setToggle(1)}>
                        <h3>Cash On Delivery</h3>
                    </div>
                    <div className={toggle === 2 ? 'Payment_image active': 'Payment_image'} onClick={()=>setToggle(2)}>
                        <img src={Visa} alt="" />
                    </div>
                </div>
                
            </div>
            
        </div>
        </div>
        <div className='Order_summary'>
            <div className='Order_summary_title'>
                <h3>{checkoutDataArr?.[13]}</h3>
            </div>
            <div className='Order_summary_products'>
                {
                    basketProductsCurrentLang.map(el => <div className='Order_summary_product'>
                        <div className='ImageAndTitle'>
                            <div className='image'>
                                <img src={`https://blossom-belle-cosmetics.vercel.app${el.image}`} alt="" />
                            </div>
                            <div className='title'>
                                <h3>{el.title}</h3>
                            </div>
                        </div>
                        <div>
                            <h3>({el.quantityForOrder})</h3>
                        </div>
                    </div>)
                }
                
            </div>
            {/* <div>
                <h3>{checkoutDataArr?.[14]}</h3>
            </div> */}
            <div className=' flex justify-between items-center'>
                <h3 className=' font-bold'>{checkoutDataArr?.[15]}</h3>
                <h3 className=' font-bold'>{total}</h3>
            </div>
        </div>

        <div className='buttons'>
                <div className='back' onClick={()=> BackBasketPage()}>
                    <button>{checkoutDataArr?.[16]}</button>
                </div>
                <div className='btn' onClick={()=> ChangeBasketPage()}>
                    <button>{checkoutDataArr?.[17]}</button>
                </div>
        </div>
        
    </div>
  )
}
