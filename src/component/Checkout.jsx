import React, { useState } from 'react'
import Visa from "../Images/visa.png"
import Master from "../Images/MasterCard_Logo.svg.png";
import Arca from "../Images/Arca.png";
import axios from '../axios';
export function Checkout({ setMyData, setCheckoutData, setConfirmData, basketProductsCurrentLang, setBasketProductsQuantity, total, checkoutDataArr, toggle, setToggle}) {

    const [nameError, setNameError] = useState("");
    const [lastNameError, setLastNameError] = useState("");
    const [emailError, setEmailError] = useState(""); 
    const [phoneError, setPhoneError] = useState(""); 
    const [streetError, setStreetError] = useState("");
    const [regionError, setRegionError] = useState("");
    
    const Name_regEx = /^[a-zA-Z]{3,}$/;
    const LastName_regEx = /^[a-zA-Z]{3,}$/;
    const Email_regEx = /^[a-zA-Z0-9._%+-]+@(?:mail\.ru|gmail\.com|yahoo\.com|outlook\.com|aol\.com|icloud\.com|protonmail\.com|yandex\.com|zoho\.com|gmx\.com|hotmail\.com|live\.com)$/;
    const Phone_regEx = /^(?:\+374|0)\d{8}$/;

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

        const nameInput = document.querySelector('input[name="firstName"]');
        const lastNameInput = document.querySelector('input[name="lastName"]');
        const emailInput = document.querySelector('input[name="email"]');
        const phoneInput = document.querySelector('input[name="phone"]');
        const streetInput = document.querySelector('input[name="street"]');
        const regionInput = document.querySelector('input[name="region"]');

        const name = nameInput.value.trim();
        const lastName = lastNameInput.value.trim();
        const email = emailInput.value.trim();
        const phone = phoneInput.value.trim();
        const street = streetInput.value.trim();
        const region = regionInput.value.trim();

        let hasError = false;

        if(!email){
            setEmailError(checkoutDataArr?.[24])
        }else{
            if (!email.match(Email_regEx)) {
                setEmailError(checkoutDataArr?.[20]);
                hasError = true;
            } else {
                setEmailError("");
            }
        }

        if(!name){
            setNameError(checkoutDataArr?.[24])
        }else{
            if (!name.match(Name_regEx)) {
                setNameError(checkoutDataArr?.[21]);
                hasError = true;
            } else {
                setNameError("");
            }
        }

        if(!lastName){
            setLastNameError(checkoutDataArr?.[24])
        }else{
            if (!lastName.match(LastName_regEx)) {
                setLastNameError(checkoutDataArr?.[22]);
                hasError = true;
            } else {
                setLastNameError("");
            }
        }

        if (!street) {
            setStreetError(checkoutDataArr?.[24]);
            hasError = true;
        } else {
            setPhoneError("");
        }

        if (!region) {
            setRegionError(checkoutDataArr?.[24]);
            hasError = true;
        } else {
            setPhoneError("");
        }

        if(!phone){
            setPhoneError(checkoutDataArr?.[24]);
        }else{
            if (!phone.match(Phone_regEx)) {
                setPhoneError(checkoutDataArr?.[23]);
                hasError = true;
            } else {
                setPhoneError("");
            }
        }

        if(hasError){
            window.scroll({
                top: 350,
                left: 0,
                behavior: 'smooth' // You can use 'smooth' for smooth scrolling or 'auto' for instant scrolling
              });
            return 
        }

        if(toggle === 1){
            let path = [];
            let arr = basketProductsCurrentLang.map(el => {
                path.push(el.path);
                return {
                    image: el.image,
                    quantity: el.quantity - el.quantityForOrder
                }
            });
            try{
                const response = await axios.post('/api/purchases/add', { 
                    products: basketProductsCurrentLang 
                });

                for(let i = 0; i<arr.length; i++){
                    await axios.put(`/api/${path[i]}/editforuser`, arr[i])
                }

                
            }catch(err){
                console.log(err.response);
            }

            sessionStorage.clear();
            setBasketProductsQuantity(0);
        }

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
                    <input type="text" name="email" required='required' /> <span>{checkoutDataArr?.[2]}</span>
                    {emailError && <p className="error">{emailError}</p>}
                </div>  
                <div className='InputBox'>
                    <input type="text" name="firstName" required='required' /> <span>{checkoutDataArr?.[3]}</span>
                    {nameError && <p className="error">{nameError}</p>}
                </div>
                <div className='InputBox'>
                    <input type="text" name="lastName" required='required' /> <span>{checkoutDataArr?.[4]}</span>
                    {lastNameError && <p className="error">{lastNameError}</p>}
                </div>
                <div className='InputBox'>
                    <input type="text" name="street" required='required' /> <span>{checkoutDataArr?.[5]}</span>
                    {streetError && <p className="error">{streetError}</p>}
                </div>
                <div className='InputBox'>
                    <input type="text" name="region" required='required' /> <span>{checkoutDataArr?.[6]}</span>
                    {regionError && <p className="error">{regionError}</p>}
                </div>
                <div className='InputBox'>
                    <input type="text" name='phone' required='required' /> <span>{checkoutDataArr?.[7]}</span>
                    {phoneError && <p className="error">{phoneError}</p>}
                </div>
                {/*   */}
                    {/* <input type="number" required='required' className='Comment' /> <span>{checkoutDataArr?.[8]}</span> */}
                    {/* <textarea required='required'></textarea> <span>{checkoutDataArr?.[8]}</span>
                </div> */}
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
                    <div className={toggle === 2 ? 'Payment_image active': 'Payment_image'} onClick={()=>setToggle(2)}>
                        <img src={Master} alt="" />
                    </div>
                    <div className={toggle === 2 ? 'Payment_image active': 'Payment_image'} onClick={()=>setToggle(2)}>
                        <img src={Arca} alt="" />
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
