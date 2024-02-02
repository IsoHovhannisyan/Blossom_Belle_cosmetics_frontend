import { useNavigate } from 'react-router-dom';
import New from "../../Images/new_1.png"
import Best from '../../Images/best_seller_1.png'

export function HairOil({hair}) {
  let res = hair.filter(el=> el.category == 'hairOils');
  const hairOil = res;
  
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
        hairOil.map((el,index) => <div className={el.sale ? 'Product active' : 'Product' }  
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
      </div>)
      }
    </div>
  )
}
