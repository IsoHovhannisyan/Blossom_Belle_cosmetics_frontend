import React from 'react'
import { useNavigate } from 'react-router-dom';

export function LipBrushes({brush}) {
    let res = brush.filter(el=> el.category == 'lipBrushes');
    const lipBrushes = res;
    
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
    
  
  
    return (
      <div className='Products'>
        {
          lipBrushes.map((el,index) => <div className='Product' 
          onClick={()=> navigate(`/product?path=${el.path}&id=${el.id}`)} 
          onMouseMove={()=> mouseMoveFunc(index)}
          onMouseLeave={()=> mouseLeaveFunc(index)} 
          key={el.id}
          >
          <div className='image'>
            <div className='ImageBackground' id={index}></div>
            <img src={`https://blossom-belle-cosmetics.vercel.app${el.image}`} id={index} className='img' alt="" />
          </div>
          <div className='title'>{el.title}</div>
          <div className='brandName'>Blossom Belle</div>
          <div className='price'>{el.price}֏</div>
          <button className='btn_text' id={index}>{el.btn_text}</button>
          <div className='shopping' id={index}><i className=" fa-solid fa-bag-shopping"></i></div>
          <div className='heart' id={index}><i className=" fa-regular fa-heart"></i></div>
        </div>)
        }
      </div>
    )
  }
