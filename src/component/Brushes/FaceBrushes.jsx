import React from 'react'
import { useNavigate } from 'react-router-dom';

export function FaceBrushes({brush}) {
  let res = brush.filter(el=> el.category == 'faceBrushes');
    const faceBrushes = res;
    
    const navigate = useNavigate();
  
    return (
      <div className='Products'>
        {
          faceBrushes.map(el => <div className='Product' onClick={()=> navigate(`/product?path=${el.path}&id=${el.id}`)} key={el.id}>
            <div className='image'>
            <img src={`https://blossom-belle-cosmetics.vercel.app${el.image}`} alt="" />
            </div>
            <div>{el.title}</div>
            <div>{el.price}֏</div>
          </div>)
        }
      </div>
    )
}
