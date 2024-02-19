import React from 'react'
import {useState, useEffect} from 'react'
import { fetchData, getSavedDataFromLocalStorage } from '../component/Header';
import { useNavigate } from 'react-router-dom';
import New from "../Images/new_1.png";
import Best from '../Images/best_seller_1.png';
import '../css/Sale/SalePage.css';
import { Selector } from '../component/Sale/Selector';
import axios from '../axios';

import FadeLoader from "react-spinners/FadeLoader";



export function SalePage() {

  const currentLanguage = localStorage.getItem('Blossom-Belle-Language') || 'en';

  const [productCategory, setProductCategory] = useState();
  const [allCategories, setAllCategories] = useState([]);
  const [navbarForSelectors, setNavbarForSelectors] = useState([]);
  const [navbarSaleForSelectors,setNavbarSaleForSelectors] = useState([]);
  const [categoriesForSelectors, setCategoriesForSelectors] = useState([])
  const [loading, setLoading] = useState(true);
  const [formData, setFormData] = useState({
    percent: 'Select Percentage',
    category: 'Select Category',
    type: 'Select Type'
})
  const [percent, setPercent] = useState(null);
  const assortments = ['makeup', 'skincare', 'brush', 'hair', 'gift'];
  const [assortment, setAssortment] = useState('');
  const [category, setCategory] = useState('');
  let categories = new Set(allCategories?.filter(el => el.lang == currentLanguage).map(el => {
    
    if(assortment){
      if(el.path == assortment){
        console.log(el.category);
        return el.category
      }  
    }
  }));
  
  categories.delete(undefined)

  const Sale = allCategories?.filter(el => el.lang == currentLanguage).filter(el => {
    if(percent === null){
      if(assortment){
        if(category){
          return el.sale != percent && el.path == assortment && el.category == category;
        }else{
          return el.sale != percent && el.path == assortment
        }
      }else if(category){
        return el.sale != percent && el.category == category;
      }else{
        return el.sale != percent
      }
    }
    if(percent == 25){
      if(assortment){
        if(category){
          return el.sale == percent && el.path == assortment && el.category == category;
        }else{
          return el.sale == percent && el.path == assortment
        }
      }else if(category){
        return el.sale == percent && el.category.toLowerCase() == category;
      }else{
        return el.sale == percent
      }
    }
    if(percent == 50){
      if(assortment){
        if(category){
          return el.sale == percent && el.path == assortment && el.category == category;
        }else{
          return el.sale == percent && el.path == assortment
        }
      }else if(category){
        return el.sale == percent && el.category.toLowerCase() == category;
      }else{
        return el.sale == percent
      }
    }     
  }
    ) 

  useEffect(()=>{
    loadingData()
    sessionStorage.setItem('My_data', JSON.stringify(true));
    sessionStorage.setItem('Checkout_data', JSON.stringify(false));
    sessionStorage.setItem('Confirm_data', JSON.stringify(false));
  },[])

  async function loadingData(){
    // const savedData = getSavedDataFromLocalStorage();
    // if (savedData) {
    //   setNavbarForSelectors(savedData.navbarData.filter(el => el.lang == currentLanguage)[0]?.navbar.split(', '))
    //   setNavbarSaleForSelectors(savedData.navbarData.filter(el => el.lang == currentLanguage)[0]?.sale.split(', '))
    //   setCategoriesForSelectors(savedData.navbarData.filter(el => el.lang == currentLanguage)[0].categories.split(', ').filter(el => el.slice(0,3) != 'New' && el.slice(0,3) != 'Նոր'))
    //   setAllCategories([...savedData.makeupData,...savedData.skincareData,...savedData.brushData,...savedData.hairData]);

    // }else{
    //   fetchData()
    //     .then(data => {
    //       setNavbarForSelectors(data.navbarData?.[0]?.navbar.split(', '))
    //       setNavbarSaleForSelectors(data.navbarData.filter(el => el.lang == currentLanguage)[0]?.sale.split(', '))
    //       setCategoriesForSelectors(data.navbarData?.[0]?.categories.split(', '))
    //       setAllCategories([...data.makeupData,...data.skincareData,...data.brushData,...data.hairData]);
    //       localStorage.setItem('fetchedData', JSON.stringify(data));
    //     })
    //     .catch(error => {
    //       console.error("An error occurred while fetching data:", error);
    //     });
    // }

    try{
      const [
        navbarData,
        makeupData,
        skincareData,
        brushData,
        hairData,
        giftData
      ] = await Promise.all([
        axios.get(`/api/navbar?lang=${currentLanguage}`),
        axios.get(`/api/makeup?lang=${currentLanguage}`),
        axios.get(`/api/skincare?lang=${currentLanguage}`),
        axios.get(`/api/brush?lang=${currentLanguage}`),
        axios.get(`/api/hair?lang=${currentLanguage}`),
        axios.get(`/api/gift?lang=${currentLanguage}`),
      ])
      setNavbarForSelectors(navbarData.data?.[0]?.navbar.split(', '))
      setNavbarSaleForSelectors(navbarData.data.filter(el => el.lang == currentLanguage)[0]?.sale.split(', '))
      setCategoriesForSelectors(navbarData.data?.[0]?.categories.split(', '))
      setAllCategories([...makeupData.data,...skincareData.data,...brushData.data,...hairData.data, ...giftData.data]);
      setLoading(false)
    }catch (error) {
      console.error("An error occurred:", error);
      throw error;
  }
  }
  const navigate = useNavigate();

  const mouseMoveFunc = (index)=>{
    if(index > 9){
      index = String(index).split('');
      let btn_text = document.querySelectorAll(`#\\3${index[0]} ${index[1]}`);
      
      for(let i = 0; i<btn_text.length; i++){
        btn_text[i].classList.add('active')
      }
  }else{
    let btn_text = document.querySelectorAll(`#\\3${index} `);

    for(let i = 0; i<btn_text.length; i++){
      btn_text[i].classList.add('active')
      }
    }
  }

  const mouseLeaveFunc = (index)=>{
    if(index > 9){
      index = String(index).split('');
      let btn_text = document.querySelectorAll(`#\\3${index[0]} ${index[1]}`);
      for(let i = 0; i<btn_text.length; i++){
        btn_text[i].classList.remove('active')
      }
    }else{
      let btn_text = document.querySelectorAll(`#\\3${index} `);
      for(let i = 0; i<btn_text.length; i++){
        btn_text[i].classList.remove('active')
      }
      }
  }

  const onClearFilter = ()=>{
    setFormData({
        percent: 'Select Percentage',
        category: 'Select Category',
        type: 'Select Type'
    })
    setPercent(null);
    setAssortment(null)
    setCategory(null)

}
  return !loading ?<div>

    <Selector setPercent={setPercent} assortments={assortments} navbarSaleForSelectors={navbarSaleForSelectors} navbarForSelectors={navbarForSelectors} categoriesForSelectors={categoriesForSelectors} setAssortment={setAssortment} categories={categories} setCategory={setCategory} formData={formData} setFormData={setFormData}/>
    <div className='Sale '>

      {Sale?.length > 0 ? Sale?.map((el,index) => <div className={el.sale ? 'Product active' : 'Product' } 
      onClick={()=> navigate(`/product?path=${el.path}&id=${el.id}`)} 
      onMouseMove={()=> mouseMoveFunc(index)}
      onMouseLeave={()=> mouseLeaveFunc(index)} 
      key={el.id}
      >
      <div className='image'>
        <div className='ImageBackground' id={index}></div>
        <img src={`https://blossom-belle-cosmetics.vercel.app${el.image}`} id={index} className='img' alt="" />
        <div className={el.new ? 'new active': 'new'}>
          <img src={New} alt="" />
        </div>
          <div className={el.best_seller ? 'best active': 'best'}>
          <img src={Best} alt="" />
        </div>
      </div>
      <div className='title'>{el.title.length > 20 ? el.title.slice(0,20) + '...': el.title}</div>
        <div className='brandName'>Blossom Belle</div>
        {
          el.sale ? <div className='Price_discount'><div className='PriceAndPercent'><div className='Price_deleted'>{el.price}֏</div> <div className='Percent_Discount'>{el.sale}%</div></div> <div className='Price_Discounted'>{el.price - el.price * el.sale / 100}֏</div></div>: <div className='price'>{el.price}֏</div>
        }
      <button className='btn_text' id={index}>{el.btn_text}</button>
      <div className='shopping' id={index}><i className=" fa-solid fa-bag-shopping"></i></div>
      <div className='heart' id={index}><i className=" fa-regular fa-heart"></i></div>
      </div>): <div className='SaleEmpty'>
                <div className='SaleBox'>
                    <div className='QtyBox'>
                        <div className='Quantity'>
                            <h2>0</h2>
                        </div>
                    </div>
                    
                    <div className='Text'>
                        <h3>{navbarSaleForSelectors[0]}</h3>
                    </div>
                    <div className='BtnBox'>
                        <div className='Btn' onClick={()=> onClearFilter()} >
                            <button>{navbarSaleForSelectors[1]}</button>
                        </div>
                    </div>
                    
                </div>
                
               
               
            </div>}

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
}