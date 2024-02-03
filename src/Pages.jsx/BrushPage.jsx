import { useEffect, useState } from 'react'
import { fetchData, getSavedDataFromLocalStorage } from '../component/Header';
import { EyeBrushes } from '../component/Brushes/EyeBrushes'
import { LipBrushes } from '../component/Brushes/LipBrushes'
import { FaceBrushes } from '../component/Brushes/FaceBrushes'
import { CheekBrushes } from '../component/Brushes/CheekBrushes'
import '../css/Brushes/Brushes.css';


export function BrushPage() {
  const [brush, setBrush] = useState([]);
  const [categories,setCategories] = useState([]);
  const currentLanguage = localStorage.getItem('Blossom-Belle-Language') || 'en';

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
      setBrush(savedData.brushData.filter(el => el.lang == currentLanguage));
      setCategories(savedData.navbarData.filter(el => el.lang == currentLanguage)[0].categories.split(', '));
    }
    else {
      fetchData()
        .then(data => {
          setBrush(data.brushData.filter(el => el.lang == currentLanguage))
          setCategories(savedData.navbarData.filter(el => el.lang == currentLanguage)[0].categories.split(', '));
        })
        .catch(error => {
          console.error("An error occurred while fetching data:", error);
        });
    }
  }
  return (
    <div className='Brushes '>
      <div className='BrushesNav'>
          <div className='LinkDiv' onClick={()=> setToggle(1)}>{categories[13]}</div>
          <div className='LinkDiv' onClick={()=> setToggle(2)}>{categories[14]}</div>
          <div className='LinkDiv' onClick={()=> setToggle(3)}>{categories[15]}</div>
          <div className='LinkDiv' onClick={()=> setToggle(4)}>{categories[16]}</div>
      </div>

      <div className='products'>
        <div className={toggle === 1 ? "box show": 'box'}> {< EyeBrushes brush={brush}/>}</div>
        <div className={toggle === 2 ? "box show": 'box'}> {< LipBrushes brush={brush} />}</div>
        <div className={toggle === 3 ? "box show": 'box'}> {< FaceBrushes brush={brush} />}</div>
        <div className={toggle === 4 ? "box show": 'box'}> {< CheekBrushes brush={brush} />}</div>
      </div>
    </div>
  )
}
