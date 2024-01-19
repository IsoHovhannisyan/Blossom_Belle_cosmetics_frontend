
import { NavLink as Link } from 'react-router-dom'
import axios from '../axios';

export async function fetchData(language) {

  try {
      const [
          sliderData,
          makeupData,
          skincareData,
          hairData,
          brushData,
          ProductLabelData,
      ] = await Promise.all([
          axios.get(`/api/slider?lang=${language}`),
          axios.get(`/api/makeup?lang=${language}`),
          axios.get(`/api/skincare?lang=${language}`),
          axios.get(`/api/hair?lang=${language}`),
          axios.get(`/api/brush?lang=${language}`),
          axios.get(`/api/product?lang=${language}`),
      ]);

      const data = {
          sliderData: sliderData.data,
          makeupData: makeupData.data,
          skincareData: skincareData.data,
          hairData: hairData.data,
          brushData: brushData.data,
          ProductLabelData: ProductLabelData.data
      };

      localStorage.setItem('fetchedData', JSON.stringify(data));
      return data;
  } catch (error) {
      console.error("An error occurred:", error);
      throw error;
  }
}

export function getSavedDataFromLocalStorage() {
  const savedData = localStorage.getItem('fetchedData');
  if (savedData) {
      return JSON.parse(savedData);
  }
  return null;
}

export function Header() {


  return (
    <div className='Header flex justify-between items-center relative'>
        
            <form action="">
            <i className=" Search fa-solid fa-magnifying-glass"></i>
                <input type="search" placeholder='Search' />
            </form>
            <div>
                <Link to='/' className='Link mr-[5rem]'>SEPHORA</Link>
            </div>
            <div>
                <i className="fa-regular fa-heart mr-4"></i>
                <i className="fa-regular fa-user mr-4"> </i>
                <i className="fa-solid fa-bag-shopping mr-4"></i>
            </div>
            <div className=' components'>
                <Link to='/new' className='Link' >New <div className='DivLink'></div></Link>
                <Link to='/makeup' className='Link'>Makeup</Link>
                <Link to='/skincare' className='Link'>Skincare</Link>
                <Link to='/brushes' className='Link'>Brushes</Link>
                <Link to='/hair' className='Link'>Hair</Link>
                <Link to='/gifts' className='Link'>Gifts</Link>
                <Link to='/sale' className='Link'>Sale</Link>
       
            </div>

    </div>
  )
}
