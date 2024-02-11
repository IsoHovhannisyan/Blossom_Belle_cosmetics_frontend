import React from 'react'
import '../css/DeliveryPage/DeliveryPage.css';

export default function DeliveryPage({Delivery_Heading,Delivery}) {
  return (
    <div className='Delivery_Page'>
        <div className='Delivery_Page_Heading'>{Delivery_Heading?.[0]}</div>
        <div className='Delivery_Page_Note'>{Delivery_Heading?.[1]}</div>
        <div className='Delivery_Page_Text'>{Delivery?.[0]}</div>
        <div className='Delivery_Page_Heading'>{Delivery_Heading?.[2]}</div>
        <div className='Delivery_Page_Text'>{Delivery?.[1]}</div>
    </div>
  )
}
