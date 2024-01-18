import { useEffect, useState } from 'react'
import { fetchData, getSavedDataFromLocalStorage } from '../component/Header';
import '../css/Makeup/Makeup.css';
import { Face } from '../component/Makeup/Face';
import { Eye } from '../component/Makeup/Eye';
import { Cheek } from '../component/Makeup/Cheek';
import { Lip } from '../component/Makeup/Lip';


export function MakeupPage() {

  const [makeUp, setMakeup] = useState([]);
  const currentLanguage = localStorage.getItem('Blossom-Belle-Language') || 'en ';

  const [toggle, setToggle] = useState(1);

  useEffect(()=>{
    loadingData()
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
    <div className='Makeup'>
      <div className='MakeupNav'>
          <div className='LinkDiv' onClick={()=> setToggle(1)}>Face</div>
          <div className='LinkDiv' onClick={()=> setToggle(2)}>Eye</div>
          <div className='LinkDiv' onClick={()=> setToggle(3)}>Cheek</div>
          <div className='LinkDiv' onClick={()=> setToggle(4)}>Lip</div>
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
