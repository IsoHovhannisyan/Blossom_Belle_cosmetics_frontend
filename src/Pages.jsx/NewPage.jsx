import {useState, useEffect} from 'react'
import { fetchData, getSavedDataFromLocalStorage } from '../component/Header';
import '../css/New/New.css';
import { NewMakeup } from '../component/New/NewMakeup';
import { NewSkinCare } from '../component/New/NewSkinCare';
import { NewBrushes } from '../component/New/NewBrushes';
import { NewHairCare } from '../component/New/NewHairCare';
import { NewGifts } from '../component/New/NewGifts';
import FadeLoader from "react-spinners/FadeLoader";
import axios from '../axios';



export function NewPage() {
  const [makeup, setMakeup] = useState([]);
  const [skincare, setSkincare] = useState([]);
  const [brush, setBrush] = useState([]);
  const [hair, setHair] = useState([]);
  const [categories,setCategories] = useState([]);
  const [loading, setLoading] = useState(true);

  const currentLanguage = localStorage.getItem('Blossom-Belle-Language') || 'en';

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
    //   setMakeup(savedData.makeupData.filter(el => el.lang == currentLanguage));
    //   setSkincare(savedData.skincareData.filter(el => el.lang == currentLanguage))
    //   setBrush(savedData.brushData.filter(el => el.lang == currentLanguage));
    //   setHair(savedData.hairData.filter(el => el.lang == currentLanguage));
    //   setCategories(savedData.navbarData.filter(el => el.lang == currentLanguage)[0].categories.split(', '));

    // }else{
    //   fetchData()
    //     .then(data => {
    //       setMakeup(data.makeupData.filter(el => el.lang == currentLanguage));
    //       setSkincare(data.skincareData.filter(el => el.lang == currentLanguage))
    //       setBrush(data.brushData.filter(el => el.lang == currentLanguage));
    //       setHair(data.hairData.filter(el => el.lang == currentLanguage));
    //       setCategories(data.navbarData.filter(el => el.lang == currentLanguage)[0].categories.split(', '));
    //     })
    //     .catch(error => {
    //       console.error("An error occurred while fetching data:", error);
    //     });
    // }
      try{
        const [
          makeupData,
          skincareData,
          brushData,
          hairData,
          navbarData
        ] = await Promise.all([
          axios.get(`/api/makeup?lang=${currentLanguage}`),
          axios.get(`/api/skincare?lang=${currentLanguage}`),
          axios.get(`/api/brush?lang=${currentLanguage}`),
          axios.get(`/api/hair?lang=${currentLanguage}`),
          axios.get(`/api/navbar?lang=${currentLanguage}`),
        ])
        setMakeup(makeupData.data);
        setSkincare(skincareData.data)
        setBrush(brushData.data)
        setHair(hairData.data)
        setCategories(navbarData.data[0].categories.split(', '));
        setLoading(false);
      }catch (error) {
        console.error("An error occurred:", error);
        throw error;
      }
  }
  return (
    !loading ?<div className='Products_Div '>
        <div className='Products_Categories'>
          <div className='Products_Categories_Box'>
            <div className={toggle === 1 ? 'LinkDiv active': 'LinkDiv'} onClick={()=> setToggle(1)}>{categories?.[0]}</div>
            <div className={toggle === 2 ? 'LinkDiv active': 'LinkDiv'} onClick={()=> setToggle(2)}>{categories?.[1]}</div>
            <div className={toggle === 3 ? 'LinkDiv active': 'LinkDiv'} onClick={()=> setToggle(3)}>{categories?.[2]}</div>
            <div className={toggle === 4 ? 'LinkDiv active': 'LinkDiv'} onClick={()=> setToggle(4)}>{categories?.[3]}</div>
            <div className={toggle === 5 ? 'LinkDiv active': 'LinkDiv'} onClick={()=> setToggle(5)}>{categories?.[4]}</div>
          </div>
      </div>
      <div className='Products_Box'>
        <div className={toggle === 1 ? "box show": 'box'}> {<NewMakeup makeup={makeup} />}</div>
        <div className={toggle === 2 ? "box show": 'box'}> {< NewSkinCare skincare={skincare} />}</div>
        <div className={toggle === 3 ? "box show": 'box'}> {< NewBrushes brush={brush} />}</div>
        <div className={toggle === 4 ? "box show": 'box'}> {< NewHairCare hair={hair} />}</div>
        <div className={toggle === 5 ? "box show": 'box'}> {< NewGifts />}</div>
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
