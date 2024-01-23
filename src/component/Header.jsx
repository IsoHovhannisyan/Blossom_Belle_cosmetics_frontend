
import { NavLink as Link, useNavigate } from 'react-router-dom'
import axios from '../axios';
import { SelectLanguage } from './SelectLanguage';
import '../css/SelectLanguage/SelectLanguage.css';
import '../css/Header/Header.css';
import { useEffect, useState } from 'react';

export async function fetchData(language) {

  try {
      const [
          sliderData,
          makeupData,
          skincareData,
          hairData,
          brushData,
          ProductLabelData,
          BasketLabelData,
          navbarData,
      ] = await Promise.all([
          axios.get(`/api/slider?lang=${language}`),
          axios.get(`/api/makeup?lang=${language}`),
          axios.get(`/api/skincare?lang=${language}`),
          axios.get(`/api/hair?lang=${language}`),
          axios.get(`/api/brush?lang=${language}`),
          axios.get(`/api/product?lang=${language}`),
          axios.get(`/api/basket?lang=${language}`),
          axios.get(`/api/navbar?lang=${language}`),
      ]);

      const data = {
          sliderData: sliderData.data,
          makeupData: makeupData.data,
          skincareData: skincareData.data,
          hairData: hairData.data,
          brushData: brushData.data,
          ProductLabelData: ProductLabelData.data,
          BasketLabelData: BasketLabelData.data,
          navbarData: navbarData.data
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

export function Header({navbar}) {

    const [scrollDown, setScrollDown] = useState(false);
    const [showNavBar, setShowNavBar] = useState(false);


    useEffect(() => {
        window.addEventListener('scroll', onScrollWindow);
    }, []);

    const onScrollWindow = () => {
        if (window.innerWidth < 1250) {
            setScrollDown(false);
        } else {
            setShowNavBar(false);
            if (window.scrollY > 10) setScrollDown(true);
            else setScrollDown(false);
        }
    };

    const navigate = useNavigate();
    console.log(navbar);

  return (
    <div className='Header'>

        <div className='HeaderTop'>
            <div className='HeaderLeft'>
                <i className=" Icone fa-solid fa-unlock-keyhole"></i>
                <div className='Div'>{navbar?.[0]?.log.split(', ')[0]}</div>
                <div className='border'></div>
                <div className='Div'>{navbar?.[0]?.log.split(', ')[1]}</div>
                <div className='border'></div>
                <i className=" Icone fa-solid fa-bag-shopping" onClick={()=> navigate('/basket')}></i>
                <i className=" Icone fa-regular fa-heart"></i>
            </div>
            <div className='HeaderRight'>
                <i className="Icone fa-solid fa-phone"></i>
                <div className='Div'>+374 55 55 55 55</div>
                    <SelectLanguage />
                
            </div>

        </div>
        
            {/* <form action="">
            <i className=" Search fa-solid fa-magnifying-glass"></i>
                <input type="search" placeholder='Search' />
            </form>
            <div>
                <Link to='/' className='Link mr-[5rem]'>BLOSSOM BELLE</Link>
            </div>
            <div>
                <i className="fa-regular fa-heart mr-4"></i>
                <i className="fa-regular fa-user mr-4"> </i>
                <div onClick={()=> navigate('/basket')}>
                    <i className="fa-solid fa-bag-shopping mr-4"></i>
                    {showQuantity && basketQuantity}
                </div>
                
            </div> */}
            {/* <div className=' components'>
                <Link to='/new' className='Link' >New <div className='DivLink'></div></Link>
                <Link to='/makeup' className='Link'>Makeup</Link>
                <Link to='/skincare' className='Link'>Skincare</Link>
                <Link to='/brushes' className='Link'>Brushes</Link>
                <Link to='/hair' className='Link'>Hair</Link>
                <Link to='/gifts' className='Link'>Gifts</Link>
                <Link to='/sale' className='Link'>Sale</Link>
       
            </div> */}

            <div className='BlossomBelle'>

                <div className='AboutDelivery'>
                    <div>
                        <div className='row1'>
                            {navbar?.[0]?.delivery.split(', ')[0]}
                        </div>
                        <div className='row2'>{navbar?.[0]?.delivery.split(', ')[1]}</div>
                        <div className='row3'>{navbar?.[0]?.delivery.split(', ')[2]}</div>
                    </div>
                    
                    <div className='CarIcone'>
                        <i className="fa-solid fa-car-side"></i>
                    </div>

                    <div className={scrollDown ? 'Blossom_text active': 'Blossom_text'} onClick={()=>(navigate('/'))}>
                        <div>Blossom Belle</div>
                        <div>Cosmetics</div>
                </div>
                    
                </div>
                
            </div>

            <div className='HeaderNavbar'>

                <Link to={`/new`} className='Link' >{navbar?.[0]?.navbar.split(', ')[0]}</Link>
                <Link to={`/makeup`} className='Link' >{navbar?.[0]?.navbar.split(', ')[1]}</Link>
                <Link to={`/skincare`} className='Link' >{navbar?.[0]?.navbar.split(', ')[2]}</Link>
                <Link to={`/brushes`} className='Link' >{navbar?.[0]?.navbar.split(', ')[3]}</Link>
                <Link to={`/hair`} className='Link' >{navbar?.[0]?.navbar.split(', ')[4]}</Link>
                <Link to={`/gifts`} className='Link' >{navbar?.[0]?.navbar.split(', ')[5]}</Link>
                <Link to={`/sale`} className='Link' >{navbar?.[0]?.navbar.split(', ')[6]}</Link>

            </div>

    </div>
  )
}
