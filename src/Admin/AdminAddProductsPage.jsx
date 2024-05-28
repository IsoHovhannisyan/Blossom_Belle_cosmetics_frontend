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
  const [collectionImages, setCollectionImages] = useState([]);
  const [purchaseData, setPurchaseData] = useState([]);
  const [purchases,setPurchases] = useState([]);
  console.log(purchases, "hesa !!!!!!1");
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



  useEffect(() => {
    if (!token) {
      navigate('/manager');
    }
  
    fetchProducts();
    fetchPurchases();
  }, []);
  
  useEffect(() => {
    if (allProducts.length > 0 && purchaseData.length > 0) {
      // Filter purchases for the last 3 months initially
      purchaseFilter(3);
    }
  }, [allProducts, purchaseData]);
  
  const fetchProducts = async () => {
    try {
      const [
        makeupData,
        skincareData,
        brushData,
        hairData,
        giftData,
        sliderData,
        imagesData,
      ] = await Promise.all([
        axios.get(`/api/makeup`),
        axios.get(`/api/skincare`),
        axios.get(`/api/brush`),
        axios.get(`/api/hair`),
        axios.get(`/api/gift`),
        axios.get(`/api/slider`),
        axios.get(`/api/collection_images`),
      ]);
  
      const allProductsData = [
        ...makeupData.data,
        ...skincareData.data,
        ...brushData.data,
        ...hairData.data,
        ...giftData.data,
        ...sliderData.data,
      ];
  
      setAllProducts(allProductsData);
      setCollectionImages(imagesData.data);
      setLoading(false);
    } catch (error) {
      console.error("An error occurred:", error);
      throw error;
    }
  };
  
  const fetchPurchases = async () => {
    try {
      const purchasesData = await axios.get(`/api/purchases`);
      setPurchaseData(purchasesData.data);
    } catch (error) {
      console.error("An error occurred:", error);
      throw error;
    }
  };


  const removeProduct = async (image) => {
    if (!token) {
      alert('Token is missing. Please log in first.');
      return;
    }

    for (const el of collectionImages) {
      if (el.image_name === image) {
        try {
          await axios.post(`/api/collection_images/remove/${el.id}`, {
            fileName: image
          }, { headers });
        } catch (error) {
          console.error("An error occurred images:", error);
        }
      }
    }

    for (const el of allProducts) {
      if (el.image === image) {
        try {
          await axios.post(`/api/${el.path}/remove/${el.id}`, null, { headers });
        } catch (error) {
          console.error("An error occurred products:", error);
        }
      }
    }
  };

  const submitHandler = async (e) => {
    e.preventDefault();

    if (!assortments) {
      return alert('Fill in the ASSORTMENT field');
    }

    if (!image) {
      return alert('Fill in the IMAGE field');
    }

    const formData = new FormData();
    formData.append('folder', assortments);
    formData.append('image', image);

    try {
      if (assortments === 'slider') {
        const imageResponse = await axios.post('/api/collection_images/add', formData, { headers });
        const sliderDataAm = {
          lang: "am",
          category: assortments,
          path: assortments,
          image: imageResponse.data.image_name
        };
        const sliderDataEn = {
          lang: "en",
          category: assortments,
          path: assortments,
          image: imageResponse.data.image_name
        };
        await axios.post('/api/slider/add', sliderDataAm, { headers });
        await axios.post('/api/slider/add', sliderDataEn, { headers });
      } else {
        if (categoryData === '' || title === '' || descrAm === '' || descrEn === '' || price === '' || New === '' || bestSeller === '' || quantity === '') {
          return alert('All fields are required');
        }

        const imageResponse = await axios.post('/api/collection_images/add', formData, { headers });
        const DataEn = {
          lang: 'en',
          category: categoryData,
          title,
          descr: descrEn,
          price,
          new: New === 'null' ? null : New,
          best_seller: bestSeller === 'null' ? null : 'true',
          sale: sale ? Number(sale) : null,
          image: imageResponse.data.image_name,
          quantity: Number(quantity),
          btn_text: 'Watch',
          path: assortments
        };
        const DataAm = {
          lang: 'am',
          category: categoryData,
          title,
          descr: descrAm,
          price,
          new: New === 'null' ? null : New,
          best_seller: bestSeller === 'null' ? null : 'true',
          sale: sale ? Number(sale) : null,
          image: imageResponse.data.image_name,
          quantity: Number(quantity),
          btn_text: 'Դիտել',
          path: assortments
        };

        await axios.post(`/api/${assortments}/add`, DataEn, { headers });
        await axios.post(`/api/${assortments}/add`, DataAm, { headers });
      }
    } catch (err) {
      console.error(err);
    }
  };

  const productSales = purchases.reduce((acc, purchase) => {
    const { productId, numberOfSellers } = purchase;
    acc[productId] = (acc[productId] || 0) + numberOfSellers;
    return acc;
  }, {});

  const purchaseFilter = (num)=>{
    console.log(num);
    const threeMonthsAgo = new Date();
      threeMonthsAgo.setMonth(threeMonthsAgo.getMonth() - num);
      // Filter purchases made in the last 3 months
      const recentPurchases = purchaseData?.filter(purchase => new Date(purchase.purchaseTime) > threeMonthsAgo);

      // Aggregate numberOfSellers for each productId
      const productsSold = recentPurchases.reduce((acc, purchase) => {
        console.log(purchase);
        const {  productTitle, numberOfSellers } = purchase;
        const existingProduct = acc.find(item => item.productTitle === productTitle);
        if (existingProduct) {
          existingProduct.numberOfSellers += numberOfSellers;
        } else {
          acc.push({ ...purchase });
        }
        return acc;
      }, []);
      productsSold.sort((a, b) => b.numberOfSellers - a.numberOfSellers);
      console.log(productsSold);

      setPurchases(productsSold);
  }


  return (
    <div>
        <div className='AdminAllProducts w-full'>
        <div className='AllProductsTitle w-[100%]  flex items-center justify-center border border-gray-300 border-solid border-1 text-center sticky top-0 left-0 bg-white p-0'>
            <div className=' w-[20%] p-4 border-r-2 font-bold'>id</div>
            <div className=' w-[20%] p-4 border-r-2 font-bold'>category</div>
            <div className=' w-[20%] p-4 border-r-2 font-bold'>title</div>
            <div className=' w-[8%] p-4 border-r-2 font-bold'>quantity</div>
            <div className=' w-[8%] p-4 border-r-2 font-bold'>new</div>
            <div className=' w-[8%] p-4 border-r-2 font-bold h-full'>best seller</div>
            <div className=' w-[8%] p-4 border-r-2 font-bold'>sale</div>
            <div className=' w-[8%] p-4 border-r-2 font-bold'>action</div>
        </div>
        
          {
                productsByCurrentLang?.map(el => {
                  // Find the total sales for the current product from the purchases array
                  const totalSales = productSales[el.id] || 0;
                  let isQuantityLow;
                  if(totalSales > 11){
                    const halfTotalSales = totalSales / 2;
            
                  // Determine if the remaining quantity is less than half of the total sales
                    isQuantityLow = el.quantity < halfTotalSales;
                  }else{
                    const halfTotalSales = 6;
                    isQuantityLow = el.quantity < halfTotalSales;
                  } 
            
                  return (
                    <div key={el.id} className='AllProducts w-[100%] flex items-center border border-gray-300 border-solid border-1 text-center p-0'>
                      <div className=' w-[20%] h-[5rem] pt-6 border-r-2 font-bold'>{el.id}</div>
                      <div className=' w-[20%] h-[5rem] pt-6 border-r-2 font-bold'>{el.category ? el.category : "null"}</div>
                      <div className=' w-[20%] h-[5rem] pt-6 border-r-2 font-bold'>{el.title ? el.title : "null"}</div>
                      <div className={`w-[8%] h-[5rem] pt-6 border-r-2 font-bold}`}>
                        <div className={isQuantityLow ? 'bg-red-500 w-90% h-90%': ''}>
                        {el.quantity ? el.quantity : "0"}
                        </div>
                      </div>
                      <div className=' w-[8%] h-[5rem] pt-6 border-r-2 font-bold'>{el.new ? el.new : 'false'}</div>
                      <div className=' w-[8%] h-[5rem] pt-6 border-r-2 font-bold'>{el.best_seller ? el.best_seller : 'false'}</div>
                      <div className=' w-[8%] h-[5rem] pt-6 border-r-2 font-bold'>{el.sale ? el.sale : '0'}</div>
                      <div className=' w-[8%] h-[5rem] pt-6 border-r-2 font-bold'>
                        <button className='Admin_Products_btn' onClick={() => removeProduct(el.image)}>
                          Delete
                        </button>
                      </div>
                    </div>
                  );
                })}
              </div>
            
              <h2 className='heading'>Statistics</h2>
              
              <select className=' Selector bg-black text-white p-2 mb-4 z-10' onChange={(e)=> purchaseFilter(+(e.target.value))}>
                  {/* <option value='Select Percentage' disabled>Select the sale period</option> */}
                  <option value="3" selected>sales in the last three months</option>
                  <option value="1">last month's sales</option>
              </select>

              <div className='Statistics w-full max-h-[30vh] overflow-auto'>
                <div className='w-[100%] flex items-center border border-gray-300 border-solid border-1 text-center sticky top-0 left-0 bg-white'>
                  <div className=' w-[25%] p-4 border-r-2 font-bold'>ID</div>
                  <div className=' w-[25%] p-4 border-r-2 font-bold'>Category</div>
                  <div className=' w-[25%] p-4 border-r-2 font-bold'>Title</div>
                  <div className=' w-[25%] p-4 border-r-2 font-bold'>Number Of Sellers</div>
                </div>
            
                {purchases?.map(el => (
                  <div className='w-[100%] flex items-center border border-gray-300 border-solid border-1 text-center'>
                    <div className=' w-[25%] p-4 border-r-2'>{el.productId}</div>
                    <div className=' w-[25%] p-4 border-r-2'>{el.productCategory}</div>
                    <div className=' w-[25%] p-4 border-r-2'>{el.productTitle}</div>
                    <div className=' w-[25%] p-4 border-r-2'>{el.numberOfSellers}</div>
                  </div>
                ))}
              </div>
            
              <h2 className='heading'>Add Products</h2>
              <div className='AddProduct'>
                <form onSubmit={submitHandler}>
                  <div className='General'>
                    <div className='GeneralSelect'>
                      <select onChange={(e) => setAssortments(e.target.value)}>
                        <option disabled selected>Select Assortment</option>
                        {navbar.map(el => <option key={el}>{el}</option>)}
                      </select>
                      <select onChange={(e) => setCategoryData(e.target.value)}>
                        <option disabled selected>Select Category</option>
                        {category.map(el => <option key={el}>{el}</option>)}
                      </select>
                      <select disabled={assortments === 'slider'} onChange={(e) => setNew(e.target.value)}>
                        <option disabled selected>New?</option>
                        <option>{"null"}</option>
                        <option>{"true"}</option>
                      </select>
                      <select disabled={assortments === 'slider'} onChange={(e) => setBestSeller(e.target.value)}>
                        <option disabled selected>Best Seller?</option>
                        <option>{"null"}</option>
                        <option>{"true"}</option>
                      </select>
                      <select disabled={assortments === 'slider'} onChange={(e) => setSale(e.target.value)}>
                        <option disabled selected>Sale?</option>
                        <option>25</option>
                        <option>50</option>
                      </select>
                    </div>
                    <div className='GeneralInput'>
                      <p>Title</p>
                      <div>
                        <input type='text' disabled={assortments === 'slider'} value={title} onChange={(e) => setTitle(e.target.value)} />
                      </div>
                      <p>Price</p>
                      <div>
                        <input type='number' disabled={assortments === 'slider'} value={price} onChange={(e) => setPrice(e.target.value)} />
                      </div>
                      <p>Quantity</p>
                      <div>
                        <input type='number' disabled={assortments === 'slider'} value={quantity} onChange={(e) => setQuantity(e.target.value)} />
                      </div>
                      <p>Image</p>
                      <div>
                        <input type='file' onChange={(e) => setImage(e.target.files[0])} />
                      </div>
                    </div>
                  </div>
                  <div className='Separately'>
                    <div className='DescrBox'>
                      <p>Description En</p>
                      <textarea disabled={assortments === 'slider'} value={descrEn} onChange={(e) => setDescrEn(e.target.value)} />
                    </div>
                    <div className='DescrBox'>
                      <p>Description Am</p>
                      <textarea disabled={assortments === 'slider'} value={descrAm} onChange={(e) => setDescrAm(e.target.value)} />
                    </div>
                  </div>
                  <button type='submit'> ADD </button>
                </form>
              </div>
            </div>
            
  )
}
