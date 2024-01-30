import {useState, useEffect} from 'react'
import { fetchData, getSavedDataFromLocalStorage } from '../component/Header';
import '../css/New/New.css';
import { NewMakeup } from '../component/New/NewMakeup';
import { NewSkinCare } from '../component/New/NewSkinCare';
import { NewBrushes } from '../component/New/NewBrushes';
import { NewHairCare } from '../component/New/NewHairCare';
import { NewGifts } from '../component/New/NewGifts';



export function NewPage() {
  const [makeup, setMakeup] = useState([]);
  const currentLanguage = localStorage.getItem('Blossom-Belle-Language') || 'en ';

  const [toggle, setToggle] = useState(1);

  useEffect(()=>{
    loadingData()
    sessionStorage.setItem('My_data', JSON.stringify(true));
    sessionStorage.setItem('Checkout_data', JSON.stringify(false));
    sessionStorage.setItem('Confirm_data', JSON.stringify(false));
  },[])

  async function loadingData(){
    const savedData = getSavedDataFromLocalStorage();
    if (savedData) {
      setMakeup(savedData.makeupData);
    }

    if (currentLanguage) {
      fetchData(currentLanguage)
        .then(data => {
          setMakeup(data.makeupData)
          localStorage.setItem('fetchedData', JSON.stringify(data));
        })
        .catch(error => {
          console.error("An error occurred while fetching data:", error);
        });
    }
  }
  return (
    <div className='New '>
        <div className='NewNav'>
          <div className='LinkDiv' onClick={()=> setToggle(1)}>New Makeup</div>
          <div className='LinkDiv' onClick={()=> setToggle(2)}>New Skincare</div>
          <div className='LinkDiv' onClick={()=> setToggle(3)}>New Brushes</div>
          <div className='LinkDiv' onClick={()=> setToggle(4)}>New Haircare</div>
          <div className='LinkDiv' onClick={()=> setToggle(5)}>New Gifts</div>
      </div>
      <div className='products'>
        <div className={toggle === 1 ? "box show": 'box'}> {<NewMakeup makeup={makeup} />}</div>
        <div className={toggle === 2 ? "box show": 'box'}> {< NewSkinCare />}</div>
        <div className={toggle === 3 ? "box show": 'box'}> {< NewBrushes />}</div>
        <div className={toggle === 4 ? "box show": 'box'}> {< NewHairCare />}</div>
        <div className={toggle === 5 ? "box show": 'box'}> {< NewGifts />}</div>
      </div>

    </div>
  )
}
