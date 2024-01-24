import React, { useEffect, useState } from 'react'
import "../css/Authorization/LoginPage.css";
import { fetchData, getSavedDataFromLocalStorage } from '../component/Header';

export function LoginPage({currentLanguage}) {


    const [loginLabel,setLoginLabel] = useState([]);
    let loginLabelArr = loginLabel?.[0]?.login.split(',  ');
    console.log(loginLabel);

    
  useEffect(()=>{
    loadingData();
  },[])


  async function loadingData() {

    const savedData = getSavedDataFromLocalStorage();
    if (savedData) {
        setLoginLabel(savedData.authLabelData);
    }

    if (currentLanguage) {
        fetchData(currentLanguage)
            .then(data => {
                setLoginLabel(data.authLabelData);
                localStorage.setItem('fetchedData', JSON.stringify(data));
            })
            .catch(error => {
                console.error("An error occurred while fetching data:", error);
            });
    }

}

  return (
  <div className='Login'>
    <div className='LoginBox'>
    <div className='Login_title_box'>
        <h2 className='Login_title'>{loginLabelArr?.[0]}</h2>
        <h3 className='Login_text'>{loginLabelArr?.[1]}</h3>
    </div>
        <div>

        </div>

        <form className='Authorization'>
            <div className='InputBox'>
                <input type="text" required='required' /> <span>{loginLabelArr?.[2]}</span>
            </div>

            <div className='InputBox'>
                <input type="password" required='required' /> <span>{loginLabelArr?.[3]}</span>
            </div>

            <div className='forgotPassword'>
                <h3>{loginLabelArr?.[4]}</h3>
            </div>
            
            <input type="submit" value={loginLabelArr?.[5]} className='login_btn'/>

            <div className='Register_text'>
                <div className='left'></div>
                <a href='/register'>{loginLabelArr?.[6]}</a>
                <div className='right'></div>
            </div>
            
        </form >


        {/* <div className='Login_button'>
            
        </div> */}

        <div className='login_text_bottom'>
            <h3>{loginLabelArr?.[7]}</h3>
        </div>
    </div>
        

    </div>
    )
}
