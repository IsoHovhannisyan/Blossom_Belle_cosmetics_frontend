import React, { useEffect, useState,CSSProperties } from 'react'
import { Routes, Route } from 'react-router-dom'
import { Header } from './component/Header'
import { Footer } from './component/Footer'
import { HomePage } from './Pages.jsx/HomePage'
import { NewPage } from './Pages.jsx/NewPage'
import { MakeupPage } from './Pages.jsx/MakeupPage'
import { HairPage } from './Pages.jsx/HairPage'
import { GiftsPage } from './Pages.jsx/GiftsPage'
import { SalePage } from './Pages.jsx/SalePage'
import { SkincarePage } from './Pages.jsx/SkincarePage'
import { BrushPage } from './Pages.jsx/BrushPage'
import { NewMakeup } from './component/New/NewMakeup'
import { NewSkinCare } from './component/New/NewSkinCare'
import { NewBrushes } from './component/New/NewBrushes'
import { NewHairCare } from './component/New/NewHairCare'
import { NewGifts } from './component/New/NewGifts'
import { ProductById } from './component/ProductById'
import { BasketPage } from './Pages.jsx/BasketPage'
import { fetchData, getSavedDataFromLocalStorage } from './component/Header';
import { LoginPage } from './Pages.jsx/LoginPage'
import { RegisterPage } from './Pages.jsx/RegisterPage'
import { HelpPage } from './Pages.jsx/HelpPage'
import { ContactPage } from './Pages.jsx/ContactPage'
import { AboutUsPage } from './Pages.jsx/AboutUsPage'
import DeliveryPage from './Pages.jsx/DeliveryPage'
import { AdminLoginPage } from './Admin/AdminLoginPage'
import { AdminAddProductsPage } from './Admin/AdminAddProductsPage'
import { AdminEditProductPage} from './Admin/AdminEditProductPage'
import axios from './axios'
import FadeLoader from "react-spinners/FadeLoader"

export function App() {


  const currentLanguage = localStorage.getItem('Blossom-Belle-Language') || 'en';
  const [basketQuantity, setBasketQuantity] = useState(0);
  const [showQuantity, setShowQuantity] = useState(false);
  const [basketProductsQuantity, setBasketProductsQuantity] = useState(JSON.parse(sessionStorage.getItem('Basket-Products'))?.filter(el=> el.lang === currentLanguage).length) || '0';
  const [navbar, setNavbar] = useState([]);
  const [footer, setFooter] = useState([]);
  const [show,setShow] = useState(sessionStorage.getItem('show') ? JSON.parse(sessionStorage.getItem('show')): false)
  const [loading, setLoading] = useState(true);

  useEffect(async() => {
    
      if(show == false){
        fetchData()
          .then(data => {
            setNavbar(data.navbarData.filter(el => el.lang == currentLanguage));
            setFooter(data.footerData.filter(el => el.lang == currentLanguage));
          })
          .then(()=>{
            setLoading(false);
            setShow(true)
          })
          .catch(error => {
            console.error("An error occurred while fetching data:", error);
          });
      }
    
    const savedData = getSavedDataFromLocalStorage();
    if (savedData) {
      setNavbar(savedData.navbarData.filter(el => el.lang == currentLanguage));
      console.log(savedData.footerData.filter(el => el.lang == currentLanguage));
      setFooter(savedData.footerData.filter(el => el.lang == currentLanguage));
      setLoading(false);
      setShow(true)
      // setFooter(savedData.footer);
    }
      
  }, [currentLanguage]);


  return (

    show != false ?  <div className=''>
      <div className='HeaderBackground'></div>
      <div className=' flex justify-center items-center'>
      <div className='App'>
      <Header navbar={navbar} basketProductsQuantity={basketProductsQuantity} />
        <Routes >
          <Route path='/login' element={<LoginPage currentLanguage={currentLanguage} />} />
          <Route path='/register' element={<RegisterPage currentLanguage={currentLanguage}  />} />
          <Route path='/'  element={<HomePage show={show} setShow={setShow}/>}/>
          <Route path='/new' element={<NewPage/>} />
          <Route path='/makeup'  element={<MakeupPage />} />
          <Route path='/hair'  element={< HairPage />} />

          <Route path='/gifts'  element={< GiftsPage />}/>
          <Route path='/sale'  element={< SalePage />}/>
          <Route path='/skincare'  element={< SkincarePage/>} />
          <Route path='/brushes'  element={< BrushPage/>} />

          <Route path='/basket' element={<BasketPage basketProductsQuantity={basketProductsQuantity} setBasketProductsQuantity={setBasketProductsQuantity} />} />
          <Route path='/product' element={< ProductById basketQuantity={basketQuantity} setBasketQuantity={setBasketQuantity} setShowQuantity={setShowQuantity} showQuantity={showQuantity} basketProductsQuantity={basketProductsQuantity} setBasketProductsQuantity={setBasketProductsQuantity} />}  />

          <Route path='/aboutus' element={<AboutUsPage About_Us={footer?.[0]?.about_us?.split('///')}/>} />
          <Route path='/delivery' element={<DeliveryPage Delivery_Heading={footer?.[0]?.delivery_heading?.split(', ')} Delivery={footer?.[0]?.delivery?.split('///')} />}/>
          <Route path='/help' element={< HelpPage helpHeading={footer?.[0]?.help_heading?.split(', ')} help={footer?.[0]?.help?.split('///')}/>} />
          
          <Route path='/admin'  element={< AdminLoginPage />}/>
          <Route path='/admin/add/product' element={<AdminAddProductsPage />} />
          <Route path='/admin/edit/product'  element={< AdminEditProductPage />}/>
          
        </Routes>
      <Footer footer={footer} />
    </div>
      </div>
    </div>: <div className='FetchingProducts'>
      <div>
        <div className='FetchingProducts_text'>
            <h2>Blossom Belle</h2>
            <h3>Cosmetics</h3>
        </div>
        <div className='FetchingProducts_Loader'>
          <FadeLoader
            color='#006699'
            loading={loading}
            size={100}
            aria-label="Loading Spinner"
            data-testid="loader"
          />
        </div>
      </div>
      </div>
  )
}

