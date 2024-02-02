import React from 'react'
import {useState, useEffect} from 'react'
import { fetchData, getSavedDataFromLocalStorage } from '../component/Header';
import { useNavigate } from 'react-router-dom';
import New from "../Images/new_1.png";
import Best from '../Images/best_seller_1.png';
import '../css/Sale/SalePage.css';
import { Selector } from '../component/Sale/Selector';



export function SalePage() {

  const [productCategory, setProductCategory] = useState();
  const [allCategories, setAllCategories] = useState([]);
  const [navbarForSelectors, setNavbarForSelectors] = useState([]);
  const [categoriesForSelectors, setCategoriesForSelectors] = useState([])
  const [percent, setPercent] = useState(null);
  const assortments = ['makeup', 'skincare', 'brush', 'hair', 'gift'];
  const [assortment, setAssortment] = useState('');
  let categories = new Set(allCategories?.map(el => {
    
    if(assortment){
      if(el.path == assortment){
        console.log(el.category);
        return el.category
      }  
    }else{
      return undefined
    }
  }));
  categories.delete(undefined)
  // const categories = ['face','eye','cheek','lips','mouisturizers','Cleansers','mask','sunscreen', 'eyeBrushes','lipBrushes','faceBrushes','cheekBrush','shampoo','conditioner','hairOils','hairMask']

  console.log(categories);
  const [category, setCategory] = useState('');
  const Sale = allCategories?.filter(el => {
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

  const currentLanguage = localStorage.getItem('Blossom-Belle-Language') || 'en ';

  const [toggle, setToggle] = useState(1);

  useEffect(()=>{
    loadingData()
    sessionStorage.setItem('My_data', JSON.stringify(true));
    sessionStorage.setItem('Checkout_data', JSON.stringify(false));
    sessionStorage.setItem('Confirm_data', JSON.stringify(false));
  },[])

  async function loadingData(){
    const savedData = getSavedDataFromLocalStorage();
    if (savedData) {
      // setMakeup(savedData.makeupData);
      // setSkincare(savedData.skincareData)
      // setBrush(savedData.brushData);
      // setHair(savedData.hairData);
      setNavbarForSelectors(savedData.navbarData?.[0]?.navbar.split(', '))
      setCategoriesForSelectors(savedData.navbarData?.[0]?.categories.split(', '))
      setAllCategories([...savedData.makeupData,...savedData.skincareData,...savedData.brushData,...savedData.hairData]);

      setProductCategory(savedData)

    }

    if (currentLanguage) {
      fetchData(currentLanguage)
        .then(data => {
          // setMakeup(data.makeupData);
          // setSkincare(data.skincareData)
          // setBrush(data.brushData);
          // setHair(data.hairData);
          setNavbarForSelectors(data.navbarData?.[0]?.navbar.split(', '))
          setCategoriesForSelectors(data.navbarData?.[0]?.categories.split(', '))
          setAllCategories([...data.makeupData,...data.skincareData,...data.brushData,...data.hairData]);
          setProductCategory(data)
          localStorage.setItem('fetchedData', JSON.stringify(data));
        })
        .catch(error => {
          console.error("An error occurred while fetching data:", error);
        });
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
  return <div>

    <Selector setPercent={setPercent} assortments={assortments} navbarForSelectors={navbarForSelectors} categoriesForSelectors={categoriesForSelectors} setAssortment={setAssortment} categories={categories} setCategory={setCategory}/>
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
      </div>): <div>dzer voronacy chka </div> }

      </div>
      </div>
}