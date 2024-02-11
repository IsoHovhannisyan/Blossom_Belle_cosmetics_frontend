import React, { useEffect, useState } from 'react'
import axios from '../axios';
import '../css/Footer/Footer.css'

export function Footer() {

  const currentLanguage = localStorage.getItem('Blossom-Belle-Language') || 'en';
  const [links, setLinks] = useState([]);
  const [phone, setPhone] = useState([]);

  useEffect(()=>{
    loadingData()
  },[])

  async function loadingData(){
    try{
      const footerData = await axios.get(`/api/footer?lang=${currentLanguage}`)
      setLinks(footerData.data[0].links.split(', '));
      setPhone(footerData.data[0].phone.split(', '))

    }catch (error) {
      console.error("An error occurred:", error);
      throw error;
  }
  }

  return (
    <div className='Footer_border'>
      <div className='Footer'>
            <div className='Footer_Links'>
            <div className='LinkBox'>
              <div className='Footer_link'><a href='/aboutus' className='LinkHeading'>{links[0]}</a></div>
              <div className='Footer_link'><a href='/help'>{links[1]}</a></div>
            </div>
            <div className='LinkBox'>
              <div className='Footer_link'><a href='/' className='LinkHeading'>{links[2]}</a></div>
              <div className='Footer_link'><a href='/'>{links[3]}</a></div>
              <div className='Footer_link'><a href='/delivery'>{links[4]}</a></div>
            </div>
            <div className='LinkBox'>
              <div className='Footer_link'><a href='/new' className='LinkHeading'>{links[5]}</a></div>
              <div className='Footer_link'><a href='/sale'>{links[6]}</a></div>
              <div className='Footer_link'><a href='/gifts'>{links[7]}</a></div>
            </div>
            </div>
            <div className='Footer_Phone'>
              <div className='flex justify-center items-center gap-4 mt-[2rem]'>
                <div className='Phone_box'>
                  <i className="Icone fa-solid fa-phone"></i>
                </div>
                <p>
                  {phone[0]}
                </p>
                <p>+374 55 55 55 55</p>
              </div>
            </div>
            <div className='Developed_By'>
              <div className='Footer_Blossom'>
                ©Blossom Belle Cosmetics
              </div>
              <div>
                {phone[1]}
              </div>
            </div>
        </div>
    </div>
  
  )
}
