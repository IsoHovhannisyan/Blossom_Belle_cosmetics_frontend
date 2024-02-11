import { useEffect, useState } from 'react'
import { fetchData, getSavedDataFromLocalStorage } from '../component/Header';
import { EyeBrushes } from '../component/Brushes/EyeBrushes'
import { LipBrushes } from '../component/Brushes/LipBrushes'
import { FaceBrushes } from '../component/Brushes/FaceBrushes'
import { CheekBrushes } from '../component/Brushes/CheekBrushes'
import FadeLoader from "react-spinners/FadeLoader";
import '../css/Brushes/Brushes.css';
import axios from '../axios';


export function BrushPage() {

  const currentLanguage = localStorage.getItem('Blossom-Belle-Language') || 'en';
  const [brush, setBrush] = useState([]);
  const [categories,setCategories] = useState([]);
  const [loading, setLoading] = useState(true);

  const [toggle, setToggle] = useState(1);

  useEffect(()=>{
    loadingData()
    sessionStorage.setItem('My_data', JSON.stringify(true));
    sessionStorage.setItem('Checkout_data', JSON.stringify(false));
    sessionStorage.setItem('Confirm_data', JSON.stringify(false));
  },[])

  async function loadingData(){
    // const savedData = getSavedDataFromLocalStorage();
    // if (savedData) {
    //   setBrush(savedData.brushData.filter(el => el.lang == currentLanguage));
    //   setCategories(savedData.navbarData.filter(el => el.lang == currentLanguage)[0].categories.split(', '));
    // }
    // else {
    //   fetchData()
    //     .then(data => {
    //       setBrush(data.brushData.filter(el => el.lang == currentLanguage))
    //       setCategories(savedData.navbarData.filter(el => el.lang == currentLanguage)[0].categories.split(', '));
    //     })
    //     .catch(error => {
    //       console.error("An error occurred while fetching data:", error);
    //     });
    // }

    try{
      const [
        brushData,
        navbarData
      ] = await Promise.all([
        axios.get(`/api/brush?lang=${currentLanguage}`),
        axios.get(`/api/navbar?lang=${currentLanguage}`),
      ])
      setBrush(brushData.data);
      setCategories(navbarData.data[0].categories.split(', '));
      setLoading(false)
    }catch (error) {
      console.error("An error occurred:", error);
      throw error;
  }
  }
  return (
    !loading ?<div className='Products_Div'>
      <div className='Products_Categories'>
        <div className='Products_Categories_Box'>
          <div className={toggle === 1 ? 'LinkDiv active': 'LinkDiv'} onClick={()=> setToggle(1)}>{categories[13]}</div>
          <div className={toggle === 2 ? 'LinkDiv active': 'LinkDiv'} onClick={()=> setToggle(2)}>{categories[14]}</div>
          <div className={toggle === 3 ? 'LinkDiv active': 'LinkDiv'} onClick={()=> setToggle(3)}>{categories[15]}</div>
          <div className={toggle === 4 ? 'LinkDiv active': 'LinkDiv'} onClick={()=> setToggle(4)}>{categories[16]}</div>
        </div>
      </div>

      <div className='Products_Box'>
        <div className={toggle === 1 ? "box show": 'box'}> {< EyeBrushes brush={brush}/>}</div>
        <div className={toggle === 2 ? "box show": 'box'}> {< LipBrushes brush={brush} />}</div>
        <div className={toggle === 3 ? "box show": 'box'}> {< FaceBrushes brush={brush} />}</div>
        <div className={toggle === 4 ? "box show": 'box'}> {< CheekBrushes brush={brush} />}</div>
      </div>
    </div>:
    <div className='FadeLoader'>
    <FadeLoader
          color='#006699'
          loading={loading}
          size={100}
          aria-label="Loading Spinner"
          data-testid="loader"
        />
    </div>
  )
}
