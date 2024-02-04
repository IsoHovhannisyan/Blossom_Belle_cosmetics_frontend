import React, { useState } from 'react'

export function Selector({setPercent, navbarForSelectors, navbarSaleForSelectors, categoriesForSelectors, setAssortment ,assortments, categories,setCategory, formData,setFormData}) {

    const sortedNavbar = navbarForSelectors?.filter((el,index) => index != 0 && index != navbarForSelectors.length-1);
    const sortedCategories = [...categories];
    let obj ={}

    const handleCategories = ['face','eye','cheeks','lips','mouisturizers','Cleansers','masks','sunscreens', 'Eye Brushes', 'Lip Brushes', 'Face Brushes', 'Cheek Brushes','shampoos', 'conditioners','Hair Oils', 'Hair Masks'];
    let handleCategoriesforSearch = handleCategories?.map((el,index) => {
        return obj[el] = categoriesForSelectors[index];
    })

    console.log(obj);


    const onSelectPercent = (percent)=>{
        setFormData({...formData, percent})
        if(percent != 'Select Percent'){
            setPercent(percent)
        }else{
            setPercent(null)
        }
    }

    const onSelectAssortments = (category)=>{
        setFormData({...formData, category})
        if(category != 'Select Category'){
            setCategory('')
            setAssortment(category)
        }else{
            setCategory('')
            setAssortment(null)
        }
    }

    
    const onSelectCategory = (type)=>{
        setFormData({...formData, type})
        if(type != 'Select Type'){
            setCategory(type)
        }else{
            setCategory(null)
        }
    }

    const onSelectAssortment = (category)=>{
        setFormData({...formData, category})
    }


  return (
    <div className='Selectors'>
        <select className=' Selector bg-black text-white' value={formData.percent} onChange={(e)=> onSelectPercent(e.target.value)}>
            <option value='Select Percentage'>{navbarSaleForSelectors[2]}</option>
            <option value="25">25%</option>
            <option value="50">50%</option>
        </select>

        <select className=' Selector bg-black text-white' value={formData.category} id='SaleProduct' onChange={(e)=> onSelectAssortments(e.target.value)}>
            <option value='Select Category'>{navbarSaleForSelectors[3]}</option>
            {
                sortedNavbar?.map((el,index)=> <option className='Option' value={assortments[index]}>{el}</option>)
            }

        </select>

        <select className=' Selector bg-black text-white' value={formData.type} onChange={(e)=> onSelectCategory(e.target.value)}>
            <option value='Select Type'>{navbarSaleForSelectors[4]}</option>
            {
                sortedCategories.map((el,index)=> <option value={el}>{obj[el]}</option>)
            }
        </select>

        {/* <div className='Selector'>
            
            <div onClick={(e)=> console.log(e.target.id)} id={formData.category}> {formData.category}</div>

            <ul>
                {
                    sortedNavbar?.map(el => <li onClick={(e)=> onSelectAssortment(e.target.id)} id={el}>{el}</li>)
                }
                
            </ul>
        </div> */}
        
    </div>
        
  )
}
