import React, { useState } from 'react'
import Visa from "../Images/visa.png"
export default function Checkout({basketLabel, setMyData, setCheckoutData, setConfirmData, basketProductsCurrentLang, total}) {

    const [checkoutDataArr, setCheckoutDataArr] = useState(basketLabel?.[0]?.checkout_data.split(',  '));

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
                    <div className='Payment_image'>
                        <h3>Cash On Delivery</h3>
                    </div>
                    <div className='Payment_image'>
                        <img src={Visa} alt="" />
                    </div>
                    <div className='Payment_image'>
                        <img src={Visa} alt="" />
                    </div>
                    <div className='Payment_image'>
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
                <div className='back' onClick={()=> {
                    setCheckoutData(false);
                    setMyData(true);
                    setConfirmData(false)
                }}>
                    <button>{checkoutDataArr?.[16]}</button>
                </div>
                <div className='btn'>
                    <button>{checkoutDataArr?.[17]}</button>
                </div>
        </div>
        
    </div>
  )
}
