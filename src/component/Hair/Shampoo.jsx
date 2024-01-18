import React from 'react'
import { useNavigate } from 'react-router-dom';

export function Shampoo({hair}) {
  let res = hair.filter(el=> el.category == 'shampoo');
  const shampoo = res;
  
  const navigate = useNavigate();

  return (
    <div className='Products'>
      {
        shampoo.map(el => <div className='Product' onClick={()=> navigate(`/product?path=${el.path}&id=${el.id}`)} key={el.id}>
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
