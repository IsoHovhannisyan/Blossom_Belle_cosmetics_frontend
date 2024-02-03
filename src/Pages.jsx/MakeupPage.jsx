import { useEffect, useState } from 'react'
import { fetchData, getSavedDataFromLocalStorage } from '../component/Header';
import '../css/Makeup/Makeup.css';
import { Face } from '../component/Makeup/Face';
import { Eye } from '../component/Makeup/Eye';
import { Cheek } from '../component/Makeup/Cheek';
import { Lip } from '../component/Makeup/Lip';


export function MakeupPage() {

  const [makeUp, setMakeup] = useState([]);
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
      setMakeup(savedData.makeupData.filter(el => el.lang == currentLanguage));
      setCategories(savedData.navbarData?.filter(el => el.lang == currentLanguage)[0].categories.split(', '));
    }else{
      fetchData()
        .then(data => {
          setMakeup(data.makeupData.filter(el => el.lang == currentLanguage))
          setCategories(data.navbarData.filter(el => el.lang == currentLanguage)[0].categories.split(', '));
          console.log(data);
        })
        .catch(error => {
          console.error("An error occurred while fetching data:", error);
        });
    }
  }

  return (
    <div className='Makeup'>
      <div className='MakeupNav'>
          <div className='LinkDiv' onClick={()=> setToggle(1)}>{categories?.[5]}</div>
          <div className='LinkDiv' onClick={()=> setToggle(2)}>{categories?.[6]}</div>
          <div className='LinkDiv' onClick={()=> setToggle(3)}>{categories?.[7]}</div>
          <div className='LinkDiv' onClick={()=> setToggle(4)}>{categories?.[8]}</div>
      </div>
      <div className='products'>
        <div className={toggle === 1 ? "box show": 'box'}> {<Face makeUp={makeUp} />}</div>
        <div className={toggle === 2 ? "box show": 'box'}> {<Eye makeUp={makeUp}/>}</div>
        <div className={toggle === 3 ? "box show": 'box'}> {<Cheek makeUp={makeUp} />}</div>
        <div className={toggle === 4 ? "box show": 'box'}> {<Lip makeUp={makeUp} />}</div>
      </div>
      
    </div>

  )
}
