
import { useEffect, useState } from 'react';
import Slider from '../component/HomePage/Slider';
import BestSellers from '../component/HomePage/BestSellers';
import { fetchData, getSavedDataFromLocalStorage } from '../component/Header';

export function HomePage() {

  const [slider, setSlider]= useState([]);
  const [allProducts, setAllProducts] = useState([]);
  const bestSellers = [...allProducts?.filter(el=> el.best_seller == 'true')];
  const currentLanguage = localStorage.getItem('Blossom-Belle-Language') || 'en';

  console.log(bestSellers);
  

  useEffect(()=>{
    loadingData();
    sessionStorage.setItem('My_data', JSON.stringify(true));
    sessionStorage.setItem('Checkout_data', JSON.stringify(false));
    sessionStorage.setItem('Confirm_data', JSON.stringify(false));
  },[])


  async function loadingData() {

    const savedData = getSavedDataFromLocalStorage();
    if (savedData) {
        setSlider(savedData.sliderData);
        setAllProducts([...savedData.makeupData,...savedData.skincareData,...savedData.brushData,...savedData.hairData ]);
        // .catch(error => {
        //   console.log(error);
        // })
        
    }

    if (currentLanguage) {
        fetchData(currentLanguage)
            .then(data => {
                setSlider(data.sliderData);
                setAllProducts([...data.makeupData,...data.skincareData,...data.brushData,...data.hairData ]);
                localStorage.setItem('fetchedData', JSON.stringify(data));
            })
            .catch(error => {
                console.error("An error occurred while fetching data:", error);
            });
    }

}

  return (
    <div>
      { <Slider slider={slider} />}
    <h2 className='heading'> best sellers </h2>
    <div className='bestsellers'>
       {<BestSellers bestSellers={bestSellers} />}
      </div>

      <h2 className='heading'>Limited edition</h2>
      {/* <div className='limitedEdition'>
          <div className='box'>
            <img src={img4} alt="" />
            <p>Lorem ipsum dolor sit amet consectetur </p>
            <i className=" hearth fa-regular fa-heart mr-4"></i>
            <i className=" basket fa-solid fa-bag-shopping mr-4"></i>
            <div>
              <i className="fa-solid fa-star"></i>
              <i className="fa-solid fa-star"></i>
              <i className="fa-solid fa-star"></i>
              <i className="fa-solid fa-star"></i>
              <i className="fa-regular fa-star"></i>
            </div>
            <span className=' text-lg'>$20.00</span>
          </div>
          <div className='box'>
            <img src={img4} alt="" />
            <p>Lorem ipsum dolor sit amet consectetur </p>
            <i className=" hearth fa-regular fa-heart mr-4"></i>
            <i className=" basket fa-solid fa-bag-shopping mr-4"></i>
            <div>
              <i className="fa-solid fa-star"></i>
              <i className="fa-solid fa-star"></i>
              <i className="fa-solid fa-star"></i>
              <i className="fa-solid fa-star"></i>
              <i className="fa-regular fa-star"></i>
            </div>
            <span className=' text-lg'>$20.00</span>
          </div>
          <div className='box'>
            <img src={img4} alt="" />
            <p>Lorem ipsum dolor sit amet consectetur </p>
            <i className=" hearth fa-regular fa-heart mr-4"></i>
            <i className=" basket fa-solid fa-bag-shopping mr-4"></i>
            <div>
              <i className="fa-solid fa-star"></i>
              <i className="fa-solid fa-star"></i>
              <i className="fa-solid fa-star"></i>
              <i className="fa-solid fa-star"></i>
              <i className="fa-regular fa-star"></i>
            </div>
            <span className=' text-lg'>$20.00</span>
          </div>
      </div>

      <h2 className='h2'>your skin</h2>
      <div className='yourskin'>
        <div className='image'>
        <img src={img4} alt="" />
        </div> 
        <div className='content'>
          <h3>Lorem ipsum dolor</h3>
          <h4>Lorem ipsum dolor</h4>
          <p>Lorem ipsum dolor</p>
          </div> 

      </div> */}
    </div>
  )
}
