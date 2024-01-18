import {useState, useEffect} from 'react'
import { fetchData, getSavedDataFromLocalStorage } from '../component/Header';
import { Shampoo } from '../component/Hair/Shampoo';
import { Conditioner } from '../component/Hair/Conditioner';
import { HairOil } from '../component/Hair/HairOil';
import { HairMask } from '../component/Hair/HairMask';
import '../css/Hair/HairPage.css'



export function HairPage() {

  const [hair, setHair] = useState([]);
  const currentLanguage = localStorage.getItem('Blossom-Belle-Language') || 'en ';

  const [toggle, setToggle] = useState(1);

  useEffect(()=>{
    loadingData()
  },[])

  async function loadingData(){
    const savedData = getSavedDataFromLocalStorage();
    if (savedData) {
      setHair(savedData.hairData);
    }

    if (currentLanguage) {
      fetchData(currentLanguage)
        .then(data => {
          setHair(data.hairData)
          localStorage.setItem('fetchedData', JSON.stringify(data));
        })
        .catch(error => {
          console.error("An error occurred while fetching data:", error);
        });
    }
  }

  return (
    <div className='Hair '>
        <div className='HairNav'>
          <div className='LinkDiv' onClick={()=> setToggle(1)}>Shampoo</div>
          <div className='LinkDiv' onClick={()=> setToggle(2)}>Conditioner</div>
          <div className='LinkDiv' onClick={()=> setToggle(3)}>Hair Oil</div>
          <div className='LinkDiv' onClick={()=> setToggle(4)}>Hair Mask</div>
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
