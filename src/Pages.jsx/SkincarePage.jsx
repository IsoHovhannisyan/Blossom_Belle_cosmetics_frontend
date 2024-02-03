import React from 'react'
import '../css/Skincare/Skincare.css'
import { Mouisturizers } from "../component/Skincare/Mouisturizers";
import { Cleansers } from "../component/Skincare/Cleansers";
import { Masks } from "../component/Skincare/Masks";
import { Sunscreen } from "../component/Skincare/Sunscreen";
import { useEffect, useState } from 'react'
import { fetchData, getSavedDataFromLocalStorage } from '../component/Header';


export function SkincarePage() {

  const currentLanguage = localStorage.getItem('Blossom-Belle-Language') || 'en';

  const [skincare, setSkincare] = useState([]);
  const [categories,setCategories] = useState([]);
  const [toggle, setToggle] = useState(1);

  useEffect(()=>{
    loadingData();
    sessionStorage.setItem('My_data', JSON.stringify(true));
    sessionStorage.setItem('Checkout_data', JSON.stringify(false));
    sessionStorage.setItem('Confirm_data', JSON.stringify(false));
  },[])

  async function loadingData(){
    const savedData = getSavedDataFromLocalStorage();
    if (savedData) {
      setSkincare(savedData.skincareData.filter(el => el.lang == currentLanguage));
      setCategories(savedData.navbarData.filter(el => el.lang == currentLanguage)[0].categories.split(', '));
    }else{
      fetchData()
        .then(data => {
          setSkincare(data.skincareData.filter(el => el.lang == currentLanguage))
          setCategories(data.navbarData.filter(el => el.lang == currentLanguage)[0].categories.split(', '));
        })
        .catch(error => {
          console.error("An error occurred while fetching data:", error);
        });
    }
  }

  return (
    <div className='Skincare '>
      <div className='SkincareNav'>
          <div className='LinkDiv' onClick={()=> setToggle(1)}>{categories[9]}</div>
          <div className='LinkDiv' onClick={()=> setToggle(2)}> {categories[10]}</div>
          <div className='LinkDiv' onClick={()=> setToggle(3)}>{categories[11]}</div>
          <div className='LinkDiv' onClick={()=> setToggle(4)}>{categories[12]}</div>
      </div>

      <div className='products'>
        <div className={toggle === 1 ? "box show": 'box'}> {< Mouisturizers skincare={skincare}/>}</div>
        <div className={toggle === 2 ? "box show": 'box'}> {<Cleansers skincare={skincare}/>}</div>
        <div className={toggle === 3 ? "box show": 'box'}> {<Masks skincare={skincare} />}</div>
        <div className={toggle === 4 ? "box show": 'box'}> {<Sunscreen skincare={skincare} />}</div>
      </div>
    </div>
  )
}
