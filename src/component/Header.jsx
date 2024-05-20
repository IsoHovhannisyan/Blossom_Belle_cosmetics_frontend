
import { NavLink as Link, useNavigate } from 'react-router-dom'
import axios from '../axios';
import { SelectLanguage } from './SelectLanguage';
import '../css/SelectLanguage/SelectLanguage.css';
import '../css/Header/Header.css';
import { useEffect, useState } from 'react';
import logo from "../Images/logo3.jpg"

export async function AllCategories(){
    try {
        const [
            makeupData,
            skincareData,
            hairData,
            brushData,
        ] = await Promise.all([
            axios.get('/api/makeup'),
            axios.get('/api/skincare'),
            axios.get('/api/hair'),
            axios.get('/api/brush'),
        ]);
  
        const data = {
            makeupData: makeupData.data,
            skincareData: skincareData.data,
            hairData: hairData.data,
            brushData: brushData.data,
        };
        return data;
    } catch (error) {
        console.error("An error occurred:", error);
        throw error;
    }
}

export async function fetchData() {

    try {
        const [
            navbarData,
            footerData,
        ] = await Promise.all([
            axios.get(`/api/navbar`),
            axios.get(`/api/footer`),
        ]);
  
        const data = {
            navbarData: navbarData.data,
            footerData: footerData.data
        };
        
        sessionStorage.setItem('show', JSON.stringify('true'));
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

export function Header({navbar, basketProductsQuantity}) {
    
    const currentLanguage = localStorage.getItem('Blossom-Belle-Language') || 'en';
    const navigate = useNavigate();

    const [isLoggedIn, setIsLoggedIn] = useState(sessionStorage.getItem('user_token') || null);
    const [userName, setUserName] = useState( sessionStorage.getItem('user_name') ? JSON.parse(sessionStorage.getItem('user_name')): null)

    const [scrollDown, setScrollDown] = useState(false);
    const [showNavBar, setShowNavBar] = useState(false);
    // useEffect(()=>{
    //     basketProductsQuantity = JSON.parse(sessionStorage.getItem('Basket-Products'))?.filter(el=> el.lang === currentLanguage).length;
    // },[basketProductsQuantity])

    useEffect(() => {
        window.addEventListener('scroll', onScrollWindow);
    }, []);

    const onScrollWindow = () => {
        // if (window.innerWidth < 1100) {
        //     setScrollDown(false);
        // } else {
            
            if (window.scrollY > 10) setScrollDown(true);
            else setScrollDown(false);
        // }
    };

    const logoutFunc = ()=>{
        sessionStorage.setItem("user_token", '');
        localStorage.setItem("activeHearts", null);

        navigate('/');
        window.location.reload();

    }

  return (
    <div className='Header'>

        <div className='HeaderTop'>
            <div className='HeaderLeft'>
                {isLoggedIn ? <i className=" Icone fa-solid fa-user"></i>: <i className=" Icone fa-solid fa-unlock-keyhole"></i>}
                {isLoggedIn ? <div className='Div'>{userName}</div>: <div className='Div' onClick={()=> navigate('/login')}>{navbar?.[0]?.log.split(', ')[0]}</div>}
                <div className='border'></div>
                {isLoggedIn ? <i className=" Div fa-solid fa-right-from-bracket" onClick={()=> logoutFunc()}></i>: <div className='Div' onClick={()=> navigate('/register')}>{navbar?.[0]?.log.split(', ')[1]}</div>}
                <div className='border'></div>
                {basketProductsQuantity != null && basketProductsQuantity != '0' ? <i className=" Icone fa-solid fa-bag-shopping" onClick={()=> navigate('/basket')}><div className=''>{basketProductsQuantity}</div></i>
                :
                <i className=" Icone fa-solid fa-bag-shopping" onClick={()=> navigate('/basket')}></i>
                }
                
                <i className=" Icone fa-regular fa-heart" onClick={()=> {
                    if(sessionStorage.getItem("user_token")){
                        navigate('/favorites')
                    }else{
                        navigate('/login')
                    }
                }}></i>
            </div>
            <div className='HeaderRight'>
                <i className="Icone fa-solid fa-phone"></i>
                <div className='Div'>+374 55 55 55 55</div>
                    <SelectLanguage />
            </div>

        </div>

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
                        <div className='BlossomLogo'>
                            <img src={logo} alt="" />
                        </div>
                        
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
