import {useState, useEffect} from 'react'
import { fetchData, getSavedDataFromLocalStorage } from '../component/Header';
import { Shampoo } from '../component/Hair/Shampoo';
import { Conditioner } from '../component/Hair/Conditioner';
import { HairOil } from '../component/Hair/HairOil';
import { HairMask } from '../component/Hair/HairMask';
import '../css/Hair/HairPage.css'



export function HairPage() {
  // localStorage.clear();

  const [hair, setHair] = useState([]);
  const [categories,setCategories] = useState([]);
  const currentLanguage = localStorage.getItem('Blossom-Belle-Language') || 'en';

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
      setHair(savedData.hairData.filter(el => el.lang == currentLanguage));
      setCategories(savedData.navbarData.filter(el => el.lang == currentLanguage)[0].categories.split(', '));
    }
    // else{
    //   fetchData()
    //     .then(data => {
    //       setHair(data.hairData.filter(el => el.lang == currentLanguage));
    //       setCategories(data.navbarData.filter(el => el.lang == currentLanguage)[0].categories.split(', '));
    //     })
    //     .catch(error => {
    //       console.error("An error occurred while fetching data:", error);
    //     });
    // }
    
  }

  return (
    <div className='Hair '>
        <div className='HairNav'>
          <div className='LinkDiv' onClick={()=> setToggle(1)}>{categories[17]}</div>
          <div className='LinkDiv' onClick={()=> setToggle(2)}>{categories[18]}</div>
          <div className='LinkDiv' onClick={()=> setToggle(3)}>{categories[19]}</div>
          <div className='LinkDiv' onClick={()=> setToggle(4)}>{categories[20]}</div>
      </div>

      <div className='products'>
        <div className={toggle === 1 ? "box show": 'box'}> {<Shampoo hair={hair} />}</div>
        <div className={toggle === 2 ? "box show": 'box'}> {<Conditioner hair={hair} />}</div>
        <div className={toggle === 3 ? "box show": 'box'}> {<HairOil hair={hair} />}</div>
        <div className={toggle === 4 ? "box show": 'box'}> {<HairMask hair={hair} />}</div>
      </div>

    </div>
  )
}
