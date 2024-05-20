import React, { useState, useEffect } from 'react';
import '../css/BasketPage/BasketPage.css';
import { useNavigate } from 'react-router-dom';
import axios from '../axios';

export function Payment({ toggle, payment, basketProductsCurrentLang, setBasketProductsQuantity }) {
    const navigate = useNavigate();
    const [cardNumber, setCardNumber] = useState('');
    const [expiry, setExpiry] = useState('');
    const [cvv, setCvv] = useState('');
    const [cardNumberError, setCardNumberError] = useState('');
    const [expiryError, setExpiryError] = useState('');
    const [cvvError, setCvvError] = useState('');

    useEffect(() => {
        if (toggle === 1) {
            sessionStorage.clear();
            setBasketProductsQuantity(0);
        }
    }, [toggle]);

    const handleCardNumberChange = (event) => {
        let value = event.target.value;
        value = value.replace(/\D/g, '');
        if (value.length > 16) {
            value = value.slice(0, 16);
        }
        setCardNumber(value);
        setCardNumberError('');
    };

    const handleExpiryChange = (event) => {
        let value = event.target.value;
        value = value.replace(/\D/g, '');
        if (value.length > 2) {
            value = `${value.slice(0, 2)}/${value.slice(2, 4)}`;
        }
        const month = value.slice(0, 2);
        if (parseInt(month, 10) < 1 || parseInt(month, 10) > 12) {
            value = value.slice(0, 1);
        }
        setExpiry(value);
        setExpiryError('');
    };

    const handleSubmit = async (event) => {
        event.preventDefault();
        if (cardNumber.length !== 16 || expiry.length !== 5 || cvv.length !== 3) {
            if (cardNumber.length !== 16) {
                setCardNumberError('Please enter a valid 16-digit card number.');
            }
            if (expiry.length !== 5) {
                setExpiryError('Please enter a valid expiry date in MM/YY format.');
            }
            if (cvv.length !== 3) {
                setCvvError('Please enter a valid 3-digit CVV.');
            }
            return;
        }
        if (toggle === 2) {
            let path = [];
            let arr = basketProductsCurrentLang.map(el => {
                path.push(el.path);
                return {
                    image: el.image,
                    quantity: el.quantity - el.quantityForOrder
                };
            });
            try {

                const response = await axios.post('/api/purchases/add', { 
                    products: basketProductsCurrentLang 
                });


                for (let i = 0; i < arr.length; i++) {
                    await axios.put(`/api/${path[i]}/editforuser`, arr[i]);
                }
            } catch (err) {
                console.log(err.response);
            }
        }

        sessionStorage.setItem('Toggle', JSON.stringify(1));
        setCardNumberError('');
        setExpiryError('');
        setCvvError('');
        window.location.reload();
    };

    return (
        toggle === 1 ?
        <div className='Payment_Delivery'>
            <div className='Check_Box'>
                <div className='Check_Box_I'>
                    <i className="fa-solid fa-check"></i>
                </div>
            </div>
            <div className='Payment_Delivery_Text'>
                <h2>{payment?.[5]}</h2>
            </div>
            <div className='Payment_Delivery_Btn' onClick={() => navigate('/')}>
                <button>{payment?.[6]}</button>
            </div>
        </div> :
        <div className='Payment_Cart'>
            <form action="" className='Payment_Cart_Form' onSubmit={handleSubmit}>
                <p>{payment?.[1]}*</p>
                <div className='Cart_Numbers'>
                    <input
                        type="number"
                        value={cardNumber}
                        placeholder='1236 2314 1538 9765'
                        maxLength={16}
                        onChange={handleCardNumberChange}
                    />
                </div>
                {cardNumberError && <p className="error">{cardNumberError}</p>}
                <div className='flex justify-between items-start w-full'>
                    <div className='w-[45%]'>
                        <p>{payment?.[2]}*</p>
                        <div className='Cart_Date'>
                            <input
                                type="text"
                                value={expiry}
                                placeholder='MM/YY'
                                maxLength={5}
                                onChange={handleExpiryChange}
                            />
                        </div>
                        {expiryError && <p className="error">{expiryError}</p>}
                    </div>
                    <div className='w-[45%]'>
                        <p>{payment?.[3]}*</p>
                        <div className='Cart_Password'>
                            <input
                                type="password"
                                value={cvv}
                                placeholder='***'
                                maxLength={3}
                                onChange={(e) => setCvv(e.target.value)}
                            />
                        </div>
                        {cvvError && <p className="error">{cvvError}</p>}
                    </div>
                </div>
                <div className='Payment_Cart_Btn'>
                    <input type="submit" value={payment?.[4]} />
                </div>
            </form>
        </div>
    )
}













