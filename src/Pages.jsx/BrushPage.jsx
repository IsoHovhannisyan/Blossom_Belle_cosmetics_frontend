import { useEffect, useState } from 'react'
import { fetchData, getSavedDataFromLocalStorage } from '../component/Header';
import { EyeBrushes } from '../component/Brushes/EyeBrushes'
import { LipBrushes } from '../component/Brushes/LipBrushes'
import { FaceBrushes } from '../component/Brushes/FaceBrushes'
import { CheekBrushes } from '../component/Brushes/CheekBrushes'
import '../css/Brushes/Brushes.css';


export function BrushPage() {
  const [brush, setBrush] = useState([]);
  const currentLanguage = localStorage.getItem('Blossom-Belle-Language') || 'en ';

  const [toggle, setToggle] = useState(1);

  useEffect(()=>{
    loadingData()
  },[])

  async function loadingData(){
    const savedData = getSavedDataFromLocalStorage();
    if (savedData) {
      setBrush(savedData.brushData);
    }

    if (currentLanguage) {
      fetchData(currentLanguage)
        .then(data => {
          setBrush(data.brushData)
          localStorage.setItem('fetchedData', JSON.stringify(data));
        })
        .catch(error => {
          console.error("An error occurred while fetching data:", error);
        });
    }
  }
  return (
    <div className='Brushes '>
      <div className='BrushesNav'>
          <div className='LinkDiv' onClick={()=> setToggle(1)}>Eye Brushes</div>
          <div className='LinkDiv' onClick={()=> setToggle(2)}>Lip Brushes </div>
          <div className='LinkDiv' onClick={()=> setToggle(3)}>Face Brushes</div>
          <div className='LinkDiv' onClick={()=> setToggle(4)}>Cheek Brushes</div>
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
