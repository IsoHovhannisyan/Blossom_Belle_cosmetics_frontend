import React, { useEffect, useState } from 'react'
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

export function App() {

  const [basketQuantity, setBasketQuantity] = useState(0);
  const [showQuantity, setShowQuantity] = useState(false);
  const [basketProducts, setBasketProducts] = useState([]);

  return (
    <div>
      <Header basketQuantity={basketQuantity} setBasketQuantity={setBasketQuantity} setShowQuantity={setShowQuantity} showQuantity={showQuantity}  />
        <Routes >
          <Route path='/'  element={<HomePage />}/>
          <Route path='/new' element={<NewPage/>}>
            <Route path='/new' element={<NewMakeup />}/>
            <Route path='/new/skincare' element={<NewSkinCare/>}/>
            <Route path='/new/brashes' element={<NewBrushes/>}/>
            <Route path='/new/haircare' element={<NewHairCare/>}/>
            <Route path='/new/gifts' element={<NewGifts/>}/>
          </Route>
          <Route path='/makeup'  element={<MakeupPage />} />
          <Route path='/hair'  element={< HairPage />} />

          <Route path='/gifts'  element={< GiftsPage />}/>
          <Route path='/sale'  element={< SalePage />}/>
          <Route path='/skincare'  element={< SkincarePage/>} />
          <Route path='/brushes'  element={< BrushPage/>} />

          <Route path='/basket' element={<BasketPage />} />
          <Route path='/product' element={< ProductById basketQuantity={basketQuantity} setBasketQuantity={setBasketQuantity} setShowQuantity={setShowQuantity} showQuantity={showQuantity} />}  />
          

        </Routes>
      <Footer/>
    </div>
  )
}

