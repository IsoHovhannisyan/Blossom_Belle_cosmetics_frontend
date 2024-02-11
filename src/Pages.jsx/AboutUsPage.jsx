import React from 'react'
import '../css/AboutUsPage/AboutUsPage.css';

export function AboutUsPage({About_Us}) {
  return (
    <div className='About_Us'>
        <div className='About_Us_Heading'>{About_Us?.[0]}</div>
        <div className='About_Us_Text'>{About_Us?.[1]}</div>
    </div>
  )
}
