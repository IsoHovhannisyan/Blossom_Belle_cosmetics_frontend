
import {useState, useEffect} from 'react'
import axios from '../axios';
import FadeLoader from "react-spinners/FadeLoader";
import { GiftsSet } from '../component/Gifts/GiftsSet';

export function GiftsPage({basketProductsQuantity, setBasketProductsQuantity}) {
  const currentLanguage = localStorage.getItem('Blossom-Belle-Language') || 'en';
  const [gift, setGift] = useState([]);
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
    try{
      const [
        giftData,
        navbarData
      ] = await Promise.all([
        axios.get(`/api/gift?lang=${currentLanguage}`),
        axios.get(`/api/navbar?lang=${currentLanguage}`),
      ])

      console.log(giftData);
      setGift(giftData?.data);
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
          <div className={toggle === 1 ? 'LinkDiv active': 'LinkDiv'} onClick={()=> setToggle(1)}>{categories[21]}</div>
          {/* <div className={toggle === 2 ? 'LinkDiv active': 'LinkDiv'} onClick={()=> setToggle(2)}>{categories[14]}</div> */}
        </div>
      </div>

      <div className='Products_Box'>
        <div className={toggle === 1 ? "box show": 'box'}> {< GiftsSet gift={gift} basketProductsQuantity={basketProductsQuantity} setBasketProductsQuantity={setBasketProductsQuantity}/>}</div>
        {/* <div className={toggle === 2 ? "box show": 'box'}> {< LipBrushes brush={brush} />}</div> */}
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
