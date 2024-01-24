
import { useState,  useEffect } from "react";
import "../css/Authorization/RegisterPage.css";
import { fetchData, getSavedDataFromLocalStorage } from '../component/Header';

export function RegisterPage({currentLanguage}) {
  const [registerLogin,setRegisterLogin] = useState([]);
    let registerLabelArr = registerLogin?.[0]?.register.split(',  ');
    // console.log(loginLabel);

    
  useEffect(()=>{
    loadingData();
  },[])


  async function loadingData() {

    const savedData = getSavedDataFromLocalStorage();
    if (savedData) {
      setRegisterLogin(savedData.authLabelData);
    }

    if (currentLanguage) {
        fetchData(currentLanguage)
            .then(data => {
              setRegisterLogin(data.authLabelData);
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
        <h2 className='Login_title'>{registerLabelArr?.[0]}</h2>
        <h3 className='Login_text'>{registerLabelArr?.[1]}</h3>
    </div>
        <div>

        </div>

        <form className='Authorization'>
            <div className='InputBox'>
                <input type="text" required='required' /> <span>{registerLabelArr?.[2]}</span>
            </div>

            <div className='InputBox'>
                <input type="text" required='required' /> <span>{registerLabelArr?.[3]}</span>
            </div>

            <div className='InputBox'>
                <input type="phone" required='required' /> <span>{registerLabelArr?.[4]}</span>
            </div>

            <div className='InputBox'>
                <input type="text" required='required' /> <span>{registerLabelArr?.[5]}</span>
            </div>

            <div className='InputBox'>
                <input type="password" required='required' /> <span>{registerLabelArr?.[6]}</span>
            </div>

            <div className='InputBox'>
                <input type="password" required='required' /> <span>{registerLabelArr?.[7]}</span>
            </div>          
            <input type="submit" value={registerLabelArr?.[8]} className='login_btn'/>

            
        </form >
    </div>
        

    </div>
    )
}

