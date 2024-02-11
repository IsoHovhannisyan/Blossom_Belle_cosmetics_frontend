import React from 'react'
import '../css/BasketPage/BasketPage.css'
import { useNavigate } from 'react-router-dom'

export function Payment({toggle, payment}) {


    const navigate = useNavigate();


  return (
    toggle === 1 ?<div className='Payment_Delivery'>
        <div className='Check_Box'>
            <div className='Check_Box_I'>
            <i className="fa-solid fa-check"></i>
            </div>
        </div>
        <div className='Payment_Delivery_Text'><h2>{payment?.[5]}</h2></div>
        <div className='Payment_Delivery_Btn' onClick={()=> navigate('/')}>
            <button>{payment?.[6]}</button>
        </div>
        
    </div>:
    <div className='Payment_Cart'>
        {/* <h2 className=' text-left mt-[1rem] mb-[2rem]'>{payment?.[0]}</h2>
        <div className='Payment_Inputs'>
                <div className='InputBox'>
                    <input type="text" required='required' placeholder=''/> <span>{payment?.[1]}*</span>
                </div>
                <div className='InputBox'>
                    <input type="text" required='required' /> <span>{payment?.[2]}</span>
                </div>
                <div className='InputBox'>
                    <input type="text" required='required' /> <span>{payment?.[3]}</span>
                </div>
                <button className='btn'>{payment?.[4]}</button>
        </div> */}

        <form action="" className='Payment_Cart_Form'>
            <p>{payment?.[1]}*</p>
            <div className='Cart_Numbers'>
                <input type="number" placeholder='1236 2314 1538 9765' />
            </div>
            <div className=' flex justify-between items-center w-[100%]'>
                <div>
                    <p>{payment?.[2]}*</p>
                    <div className='Cart_Date'>
                        <input type="date" placeholder='' />
                    </div>
                </div>
                <div>
                    <p>{payment?.[3]}*</p>
                    <div className='Cart_Password'>
                        <input type="password" placeholder='***' />
                    </div>
                </div>
            </div>
            
            <div className='Payment_Cart_Btn'>
                <input type="submit" value={payment?.[4]} />
            </div>
            
        </form>

    </div>
  )
}
