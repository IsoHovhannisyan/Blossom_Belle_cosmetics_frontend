import React, { useState } from 'react'
import Visa from "../Images/visa.png"
export default function Checkout({basketLabel}) {

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
        
    </div>
  )
}
