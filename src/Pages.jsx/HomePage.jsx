
import { useEffect, useState } from 'react';
import Slider from '../component/HomePage/Slider';
import BestSellers from '../component/HomePage/BestSellers';
import { fetchData, getSavedDataFromLocalStorage } from '../component/Header';
import NewProducts from '../component/HomePage/NewProducts';
import '../css/HomePage/HomePage.css'
import axios from '../axios';
import FadeLoader from "react-spinners/FadeLoader";

export function HomePage({show, setShow}) {

  const currentLanguage = localStorage.getItem('Blossom-Belle-Language') || 'en';
  const [homePageLabel, setHomePageLabel] = useState([]);
  const [slider, setSlider]= useState([]);
  const [allProducts, setAllProducts] = useState([]);
  const bestSellers = [...allProducts?.filter(el=> el.best_seller == 'true' && el.lang == currentLanguage)];
  const newProducts = [...allProducts?.filter(el=> el.new == 'true' && el.lang == currentLanguage)]
  const indexForNewProducts = bestSellers.length;
  const [loading, setLoading] = useState(true);
  

  useEffect(()=>{
    loadingData();
    sessionStorage.setItem('My_data', JSON.stringify(true));
    sessionStorage.setItem('Checkout_data', JSON.stringify(false));
    sessionStorage.setItem('Confirm_data', JSON.stringify(false));
  },[])


  async function loadingData() {

  //   const savedData = getSavedDataFromLocalStorage();
  //   if (savedData) {
  //     setHomePageLabel(savedData.homeLabelData.filter(el => el.lang == currentLanguage)[0].label.split(', '));
  //     setSlider(savedData.sliderData.filter(el => el.lang == currentLanguage));
  //     setAllProducts([...savedData.makeupData,...savedData.skincareData,...savedData.brushData,...savedData.hairData ]);
  // }
  // else{
  //   fetchData()
  //         .then(data => {
  //             setSlider(data.sliderData.filter(el => el.lang == currentLanguage));
  //             setAllProducts([...data.makeupData,...data.skincareData,...data.brushData,...data.hairData ]);
  //         })
  //         .catch(error => {
  //             console.error("An error occurred while fetching data:", error);
  //         });
  //       }

        try{
          const [
            homeLabelData,
            sliderData,
            makeupData,
            skincareData,
            brushData,
            hairData,
            giftData
          ] = await Promise.all([
            axios.get(`/api/home_page_label?lang=${currentLanguage}`),
            axios.get(`/api/slider?lang=${currentLanguage}`),
            axios.get(`/api/makeup?lang=${currentLanguage}`),
            axios.get(`/api/skincare?lang=${currentLanguage}`),
            axios.get(`/api/brush?lang=${currentLanguage}`),
            axios.get(`/api/hair?lang=${currentLanguage}`),
            axios.get(`/api/gift?lang=${currentLanguage}`),
          ])
          setHomePageLabel(homeLabelData.data[0].label.split(', '));
          setSlider(sliderData.data);
          setAllProducts([...makeupData.data,...skincareData.data,...brushData.data,...hairData.data,...giftData.data ]);
          setLoading(false);
        }catch (error) {
          console.error("An error occurred:", error);
          throw error;
      } 
}

  return (
    !loading ?<div className='HomePage'>
      <div>
      <div>
          { <Slider slider={slider} />}
      
          <h2 className='heading'>{homePageLabel?.[0]}</h2>

          <div className='bestsellers'>
            {<BestSellers bestSellers={bestSellers} />}
          </div>

          <h2 className='heading'>{homePageLabel?.[1]}</h2>

          <div className='newproducts'>
            {<NewProducts newProducts={newProducts} indexForNewProducts={indexForNewProducts} />}
          </div>

          <h2 className='heading'>{homePageLabel?.[2]}</h2>
        </div>
      </div>
        <div>
          
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
