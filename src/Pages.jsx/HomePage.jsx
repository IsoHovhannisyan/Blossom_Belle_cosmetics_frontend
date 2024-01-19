
import { useEffect, useState } from 'react';
import Slider from '../component/HomePage/Slider';
import BestSellers from '../component/HomePage/BestSellers';
import { fetchData, getSavedDataFromLocalStorage } from '../component/Header';

export function HomePage() {

  const [slider, setSlider]= useState([]);
  const currentLanguage = localStorage.getItem('Blossom-Belle-Language') || 'am';


  useEffect(()=>{
    loadingData();
  },[])


  async function loadingData() {

    const savedData = getSavedDataFromLocalStorage();
    if (savedData) {
        setSlider(savedData.sliderData);
    }

    if (currentLanguage) {
        fetchData(currentLanguage)
            .then(data => {
                setSlider(data.sliderData);
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
       {<BestSellers slider={slider} />}
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
