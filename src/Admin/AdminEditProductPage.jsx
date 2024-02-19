import { useEffect, useState } from 'react'
import axios from '../axios';
import { useNavigate, useSearchParams } from 'react-router-dom';

export function AdminEditProductPage() {
    const [searchParams] = useSearchParams();
    const [product, setProduct] = useState({});
    console.log(product.title);
    const [title, setTitle] = useState('');
    
    useEffect(()=>{
        loadingProduct();
    },[])

    const loadingProduct = async()=>{
        try{
            const ProductData = await axios.get(`/api/${searchParams.get('path')}/${searchParams.get('id')}`)
            setProduct(ProductData.data);
            setTitle(ProductData.data.title)
        }catch(error){

        }
    }

  return (
    <div>
        <form>
            <p>title</p>
            <input type='text' value={title} onChange={(e)=> setTitle(e.target.value)} />
        </form>
    </div>
  )
}
