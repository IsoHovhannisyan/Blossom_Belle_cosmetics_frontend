import React, { useEffect, useState } from 'react'
import axios from '../axios';
import '../css/Footer/Footer.css'

export function Footer({footer}) {

  const currentLanguage = localStorage.getItem('Blossom-Belle-Language') || 'en';
  const links = footer?.[0]?.links?.split(', ');
  const phone = footer?.[0]?.phone?.split(', ');

  return (
    <div className='Footer_border'>
      <div className='Footer'>
            <div className='Footer_Links'>
            <div className='LinkBox'>
              <div className='Footer_link'><a href='/aboutus' className='LinkHeading'>{links?.[0]}</a></div>
              <div className='Footer_link'><a href='/help'>{links?.[1]}</a></div>
            </div>
            <div className='LinkBox'>
              <div className='Footer_link'><a href='/' className='LinkHeading'>{links?.[2]}</a></div>
              <div className='Footer_link'><a href='/'>{links?.[3]}</a></div>
              <div className='Footer_link'><a href='/delivery'>{links?.[4]}</a></div>
            </div>
            <div className='LinkBox'>
              <div className='Footer_link'><a href='/new' className='LinkHeading'>{links?.[5]}</a></div>
              <div className='Footer_link'><a href='/sale'>{links?.[6]}</a></div>
              <div className='Footer_link'><a href='/gifts'>{links?.[7]}</a></div>
            </div>
            </div>
            <div className='Footer_Phone'>
              <div className='flex justify-center items-center gap-4 mt-[2rem]'>
                <div className='Phone_box'>
                  <i className="Icone fa-solid fa-phone"></i>
                </div>
                <p>
                  {phone?.[0]}
                </p>
                <p>+374 55 55 55 55</p>
              </div>
            </div>
            <div className='Developed_By'>
              <div className='Footer_Blossom'>
                ©Blossom Belle Cosmetics
              </div>
              <div>
                {phone?.[1]}
              </div>
            </div>
        </div>
    </div>
  
  )
}
