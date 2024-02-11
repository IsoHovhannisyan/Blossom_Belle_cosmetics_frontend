import { useEffect, useState } from 'react'
import '../css/Makeup/Makeup.css';
import { Face } from '../component/Makeup/Face';
import { Eye } from '../component/Makeup/Eye';
import { Cheek } from '../component/Makeup/Cheek';
import { Lip } from '../component/Makeup/Lip';
import FadeLoader from "react-spinners/FadeLoader";
import axios from '../axios';


export function MakeupPage() {

  const currentLanguage = localStorage.getItem('Blossom-Belle-Language') || 'en';

  const [makeUp, setMakeup] = useState([]);
  const [categories,setCategories] = useState([]);
  const [loading, setLoading] = useState(true);

  const [toggle, setToggle] = useState(1);

  useEffect(()=>{
    loadingData()
    sessionStorage.setItem('My_data', JSON.stringify(true));
    sessionStorage.setItem('Checkout_data', JSON.stringify(false));
    sessionStorage.setItem('Confirm_data', JSON.stringify(false));
  },[currentLanguage])

  async function loadingData(){
    // const savedData = getSavedDataFromLocalStorage();
    // if (savedData) {
    //   setMakeup(savedData.makeupData.filter(el => el.lang == currentLanguage));
    //   setCategories(savedData.navbarData?.filter(el => el.lang == currentLanguage)[0].categories.split(', '));
    // }else{
    //   fetchData()
    //     .then(data => {
    //       setMakeup(data.makeupData.filter(el => el.lang == currentLanguage))
    //       setCategories(data.navbarData.filter(el => el.lang == currentLanguage));
    //       console.log(data);
    //     })
    //     .catch(error => {
    //       console.error("An error occurred while fetching data:", error);
    //     });
    // }
    if(currentLanguage){
      try{
        const [
          makeupData,
          navbarData
        ] = await Promise.all([
          axios.get(`/api/makeup?lang=${currentLanguage}`),
          axios.get(`/api/navbar?lang=${currentLanguage}`),
        ])
        setMakeup(makeupData.data);
        setCategories(navbarData.data[0].categories.split(', '));
        setLoading(false);
      }catch (error) {
        console.error("An error occurred:", error);
        throw error;
      }
    }
    
  }

  return (
    !loading ? <div className='Products_Div'>
      <div className='Products_Categories'>
        <div className='Products_Categories_Box'>
          <div className={toggle === 1 ? 'LinkDiv active': 'LinkDiv'} onClick={()=> setToggle(1)}>{categories?.[5]}</div>
          <div className={toggle === 2 ? 'LinkDiv active': 'LinkDiv'} onClick={()=> setToggle(2)}>{categories?.[6]}</div>
          <div className={toggle === 3 ? 'LinkDiv active': 'LinkDiv'} onClick={()=> setToggle(3)}>{categories?.[7]}</div>
          <div className={toggle === 4 ? 'LinkDiv active': 'LinkDiv'} onClick={()=> setToggle(4)}>{categories?.[8]}</div>
        </div>    
      </div>
      <div className='Products_Box'>
        <div className={toggle === 1 ? "box show": 'box'}> {<Face makeUp={makeUp} />}</div>
        <div className={toggle === 2 ? "box show": 'box'}> {<Eye makeUp={makeUp}/>}</div>
        <div className={toggle === 3 ? "box show": 'box'}> {<Cheek makeUp={makeUp} />}</div>
        <div className={toggle === 4 ? "box show": 'box'}> {<Lip makeUp={makeUp} />}</div>
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
