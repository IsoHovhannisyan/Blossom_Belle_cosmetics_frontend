import React, { useEffect, useState } from 'react'
import axios from '../axios';
import '../css/Admin/AdminAddProductsPage.css';
import { useNavigate } from 'react-router-dom';

export function AdminAddProductsPage() {

  const currentLanguage = localStorage.getItem('Blossom-Belle-Language') || 'en';
  const token = sessionStorage.getItem('token');

  const headers = {
    'Authorization': `Bearer ${token}`,
  };
   
  const [allProducts, setAllProducts] = useState([]);
  const productsByCurrentLang = allProducts?.filter(el=> el.lang == currentLanguage);
  const [navbarForSelectors, setNavbarForSelectors] = useState([]);
  const [navbarSaleForSelectors,setNavbarSaleForSelectors] = useState([]);
  const [categoriesForSelectors, setCategoriesForSelectors] = useState([])
  const [collectionImages, setCollectionImages] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate()

  const navbar = ['makeup', 'skincare', 'brush', 'hair', 'gift','slider']
  // const [lang, setLang] = useState('en')
  let   category = '';
  const   [categoryData, setCategoryData] = useState('');
  const [title, setTitle] = useState('');
  const [descrAm, setDescrAm] = useState('');
  const [descrEn, setDescrEn] = useState('');
  const btnText = ['Watch', 'Դիտել'];
  const [price, setPrice] = useState('');
  const [quantity, setQuantity] = useState('');
  const [assortments, setAssortments] = useState('');
  const [New,setNew] = useState('');
  const [bestSeller,setBestSeller] = useState('');
  const [sale,setSale] = useState('')
  const [image, setImage] = useState('');
  let categories = new Set(allProducts?.filter(el => el.lang == currentLanguage).map(el => {
    if(assortments){
      if(el.path == assortments){
        return el.category
      }  
    }
  }));
  categories.delete(undefined)
  category = [...categories];

  console.log(collectionImages);

  useEffect(()=>{
    if(!token){
      navigate('/admin')
    }
    fetchProducts();
  },[])

  const fetchProducts = async()=>{
    try{
      const [
        navbarData,
        makeupData,
        skincareData,
        brushData,
        hairData,
        giftData,
        sliderData,
        imagesData
      ] = await Promise.all([
        axios.get(`http://localhost:8000/api/navbar`),
        axios.get(`http://localhost:8000/api/makeup`),
        axios.get(`http://localhost:8000/api/skincare`),
        axios.get(`http://localhost:8000/api/brush`),
        axios.get(`http://localhost:8000/api/hair`),
        axios.get(`http://localhost:8000/api/gift`),
        axios.get(`http://localhost:8000/api/slider`),
        axios.get(`http://localhost:8000/api/collection_images`),
      ])
      setNavbarForSelectors(navbarData.data?.[0]?.navbar.split(', '))
      setNavbarSaleForSelectors(navbarData.data.filter(el => el.lang == currentLanguage)[0]?.sale.split(', '))
      setCategoriesForSelectors(navbarData.data?.[0]?.categories.split(', '))
      setAllProducts([...makeupData.data,...skincareData.data,...brushData.data,...hairData.data, ...giftData.data, ...sliderData.data]);
      setCollectionImages(imagesData.data);
      setLoading(false)
    }catch (error) {
      console.error("An error occurred:", error);
      throw error;
  }
  }

  const removeProduct = (image)=> {

      if(token == null){
        alert('Token is missing. Please log in first.');
        return
      }
      allProducts.map(async(el)=> {
        if(el.image == image){
          try{
            await axios.post(`http://localhost:8000/api/${el.path}/remove/${el.id}`, null, { headers });
            return el
          }catch(error){
            console.error("An error occurred products:", error);
          }
        }
        return el
      });

      collectionImages.map(async(el)=>{
        if(el.image_name == image){
          try{
            await axios.post(`http://localhost:8000/api/collection_images/remove/${el.id}`, {
              fileName: image
            },
            { headers });
          }catch(error){
            console.error("An error occurred images:", error);
          }
        }
        return el
      })
    
  }

  const submitHandler = async(e)=>{
    e.preventDefault();

    if(!assortments){
      return alert('fill in the ASSORTMENT field')
    }

    if(!image){
      return alert('fill in the IMAGE field')
    }

    const formData = new FormData();
    formData.append('folder', assortments);
    formData.append('image', image);




    try{


      if(assortments == 'slider'){
        const imageResponse = await axios.post('http://localhost:8000/api/collection_images/add', formData, { headers } );
        const sliderDataAm = {
          lang: "am",
          category: assortments,
          path:   assortments,
          image: imageResponse.data.image_name
        }
        const sliderDataEn = {
          lang: "en",
          category: assortments,
          path:   assortments,
          image: imageResponse.data.image_name
        }
        const categoryResponseEn = await axios.post('http://localhost:8000/api/slider/add', sliderDataEn, { headers })
        const categoryResponseAm = await axios.post('http://localhost:8000/api/slider/add', sliderDataAm, { headers })
      }else{
        if(categoryData == '' || title == '' || descrAm == '' || descrEn == '' || price == '' || New == '' || bestSeller == '' || quantity == '' ){
          return alert('all fields are required')
        }
        const imageResponse = await axios.post('http://localhost:8000/api/collection_images/add', formData, { headers } );
        const DataEn = {
          lang: 'en',
          category: categoryData,
          title,
          descr: descrEn,
          price,
          new: New == 'null' ? null: New,
          best_seller: bestSeller == 'null' ? null: 'true',
          sale: sale ? Number(sale): null,
          image: imageResponse.data.image_name,
          quantity: Number(quantity),
          btn_text: 'Watch',
          path: assortments
        }
        const DataAm = {
          lang: 'am',
          category: categoryData,
          title,
          descr: descrAm,
          price,
          new: New == 'null' ? null: New,
          best_seller: bestSeller == 'null' ? null: 'true',
          sale: sale ? Number(sale): null,
          image: imageResponse.data.image_name,
          quantity: Number(quantity),
          btn_text: 'Դիտել',
          path: assortments
        }

        const categoryResponseEn = await axios.post(`http://localhost:8000/api/${assortments}/add`, DataEn, { headers })
        const categoryResponseAm = await axios.post(`http://localhost:8000/api/${assortments}/add`, DataAm, { headers })
      }
      console.log('ok');
    }catch(err){
      console.log(err);
    }
  }

  return (
    <div>
        <div className='AdminAllProducts'>
        <table>
        <thead>
          <tr>
            <th>id</th>
            <th>category</th>
            <th>title</th>
            <th>quantity</th>
            <th>new</th>
            <th>best seller</th>
            <th>sale</th>
            <th>action</th>
          </tr>
        </thead>
        
        <tbody>
          {
            productsByCurrentLang?.map(el => <tr key={el.id}>
              <td>{el.id}</td>
              <td>{el.category ? el.category: "null"}</td>
              <td>{el.title ? el.title: "null"}</td>
              <td>{el.quantity ? el.quantity: "null"}</td>
              <td>{el.new ? el.new: 'false'}</td>
              <td>{el.best_seller ? el.best_seller: 'false'}</td>
              <td>{el.sale ? el.sale: '0'}</td>
              <td>
                <button className='Admin_Products_btn' onClick={()=> navigate(`/admin/edit/product?path=${el.path}&image=${el.image}&id=${el.id}`)}>
                  Edit
                </button>
                <button className='Admin_Products_btn' onClick={()=> removeProduct(el.image)}>
                  Delete
                </button>
              </td>
            </tr>)
          }
        </tbody>
        </table>
        </div>

        <h2 className='heading'>Admin Add</h2>
        <div className='AddProduct'>
          <form onSubmit={submitHandler}>
            {/* <select onChange={(e)=> setLang(e.target.value)}>
              <option>en</option>
              <option>am</option>
            </select> */}
            <div className='General'>

            <div className='GeneralSelect'>

            <select onChange={(e)=> {
              setAssortments(e.target.value)
              }}>
              <option disabled selected>Select Assortment</option>
              {
                navbar.map(el=> <option>{el}</option>)
              }
            </select>
            <select onChange={(e)=> {
              setCategoryData(e.target.value)
              }}>
              <option disabled selected>Select Category</option>
              {
                category.map(el=> <option>{el}</option>)
              }
            </select>
            <select disabled={assortments == 'slider' ? 'disabled': ''} onChange={(e)=> {
                setNew(e.target.value)
              }}>
              <option disabled selected>New?</option>
              <option>{"null"}</option>
              <option>{"true"}</option>
            </select>
            <select disabled={assortments == 'slider' ? 'disabled': ''} onChange={(e)=> {
                setBestSeller(e.target.value)
              }}>
              <option disabled selected>Best Seller?</option>
              <option>{"null"}</option>
              <option>{"true"}</option>
            </select>
            <select disabled={assortments == 'slider' ? 'disabled': ''} onChange={(e)=> {
                setSale(e.target.value)
              }}>
              <option disabled selected>Sale?</option>
              <option>25</option>
              <option>50</option>
            </select>
            
            </div>

            <div className='GeneralInput'>
            
            <p>Title</p>
            <div>
              <input type='text' disabled={assortments == 'slider' ? 'disabled': ''} value={title} onChange={(e)=> setTitle(e.target.value)} />
            </div>

            <p>Price</p>
            <div>
              <input type='number' disabled={assortments == 'slider' ? 'disabled': ''} value={price} onChange={(e)=> setPrice(e.target.value)} />
            </div>

            <p>Quantity</p>
            <div>
              <input type='number' disabled={assortments == 'slider' ? 'disabled': ''} value={quantity} onChange={(e)=> setQuantity(e.target.value)} />
            </div>

            <p>Image</p>
            <div>
              <input type='file' onChange={(e)=> setImage(e.target.files[0])} />
            </div>

            </div>

            </div>
            
            <div className='Separately'>
              <div className='DescrBox'>
                <p>Description En</p>
                <textarea disabled={assortments == 'slider' ? 'disabled': ''} value={descrEn} onChange={(e)=> setDescrEn(e.target.value)}/>
              </div>
              
              <div className='DescrBox'>
                <p>Description Am</p>
                <textarea disabled={assortments == 'slider' ? 'disabled': ''} value={descrAm} onChange={(e)=> setDescrAm(e.target.value)}/>
              </div>
              
            </div>

            <button type='submit'> ADD </button>
          </form>
            
        </div>
    </div>
  )
}
