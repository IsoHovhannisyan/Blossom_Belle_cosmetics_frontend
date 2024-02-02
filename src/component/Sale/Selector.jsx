import React, { useState } from 'react'

export function Selector({setPercent, navbarForSelectors, categoriesForSelectors, setAssortment ,assortments, categories,setCategory}) {

    const sortedNavbar = navbarForSelectors?.filter((el,index) => index != 0 && index != navbarForSelectors.length-1);
    const sortedCategories = [...categories];
    const [formData, setFormData] = useState({
        percent: 'Select Percent',
        assortments: 'Select Assortments',
        category: 'Select Category'
    })

    let res = categoriesForSelectors?.filter((el,index)=> el.slice(0,3) != 'New');

    const onSelectPercent = (percent)=>{
        setFormData({...formData, percent})
        if(percent != 'Select Percent'){
            setAssortment('')
            setPercent(percent)
        }else{
            setAssortment('')
            setPercent(null)
        }
    }

    const onSelectAssortments = (assortments)=>{
        setFormData({...formData, assortments})
        if(assortments != 'Select Assortments'){
            setCategory('')
            setAssortment(assortments)
        }else{
            setCategory('')
            setAssortment(null)
        }
    }

    
    const onSelectCategory = (category)=>{
        setFormData({...formData, category})
        if(category != 'Select Category'){
            setCategory(category)
        }else{
            setCategory(null)
        }
    }
    // console.log(sortedCategories);

  return (
    <div className='Selectors'>
        <select className=' Selector bg-black text-white' value={formData.percent} onChange={(e)=> onSelectPercent(e.target.value)}>
            <option value='Select Percent'>Select Percent</option>
            <option value="25">25%</option>
            <option value="50">50%</option>
        </select>

        <select className=' Selector bg-black text-white' value={formData.assortments} onChange={(e)=> onSelectAssortments(e.target.value)}>
            <option value='Select Assortments'>Select Assortments</option>
            {
                sortedNavbar?.map((el,index)=> <option value={assortments[index]}>{el}</option>)
            }

        </select>

        <select className=' Selector bg-black text-white' value={formData.category} onChange={(e)=> onSelectCategory(e.target.value)}>
            <option value='Select Category'>Select Category</option>
            {
                sortedCategories.map((el,index)=> <option value={el}>{el}</option>)
            }
            <option value="" selected disabled hidden>Choose here</option>

        </select>
    </div>
        
  )
}
