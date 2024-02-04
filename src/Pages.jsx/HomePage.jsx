
import { useEffect, useState } from 'react';
import Slider from '../component/HomePage/Slider';
import BestSellers from '../component/HomePage/BestSellers';
import { fetchData, getSavedDataFromLocalStorage } from '../component/Header';
import NewProducts from '../component/HomePage/NewProducts';

export function HomePage({show, setShow}) {

  const currentLanguage = localStorage.getItem('Blossom-Belle-Language') || 'en';
  const [homePageLabel, setHomePageLabel] = useState([]);
  const [slider, setSlider]= useState([]);
  const [allProducts, setAllProducts] = useState([]);
  const bestSellers = [...allProducts?.filter(el=> el.best_seller == 'true' && el.lang == currentLanguage)];
  const newProducts = [...allProducts?.filter(el=> el.new == 'true' && el.lang == currentLanguage)]
  const indexForNewProducts = bestSellers.length;

  console.log(homePageLabel);
  

  useEffect(()=>{
    loadingData();
    sessionStorage.setItem('My_data', JSON.stringify(true));
    sessionStorage.setItem('Checkout_data', JSON.stringify(false));
    sessionStorage.setItem('Confirm_data', JSON.stringify(false));
  },[])


  async function loadingData() {

    const savedData = getSavedDataFromLocalStorage();
    if (savedData) {
      setHomePageLabel(savedData.homeLabelData.filter(el => el.lang == currentLanguage)[0].label.split(', '));
      setSlider(savedData.sliderData.filter(el => el.lang == currentLanguage));
      setAllProducts([...savedData.makeupData,...savedData.skincareData,...savedData.brushData,...savedData.hairData ]);
      // .catch(error => {
      //   console.log(error);
      // })
      
  }
  else{
    fetchData()
          .then(data => {
              setSlider(data.sliderData.filter(el => el.lang == currentLanguage));
              setAllProducts([...data.makeupData,...data.skincareData,...data.brushData,...data.hairData ]);
          })
          .catch(error => {
              console.error("An error occurred while fetching data:", error);
          });
        }
}

  return (
      
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
  )
}
