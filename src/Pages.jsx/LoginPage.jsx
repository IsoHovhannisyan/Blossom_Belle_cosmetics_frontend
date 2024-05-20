import React, { useEffect, useState } from 'react'
import "../css/Authorization/LoginPage.css";
import axios from '../axios';
import FadeLoader from "react-spinners/FadeLoader";
import { useNavigate } from 'react-router-dom';

export function LoginPage({currentLanguage}) {

    const navigate = useNavigate();

    const [loading, setLoading] = useState(true);
    const [loginLabel,setLoginLabel] = useState([]);
    const [email, setEmail] = useState('');
    const [password,setPassword] = useState('');
    const [forgotPWD,setForgotPWD] = useState(false);
    const [phoneNumberEntered, setPhoneNumberEntered] = useState(false)
    const [userEmail,setUserEmail] = useState('');
    const [codeEntered, setCodeEntered] = useState(false);
    const [passwordChanged, setPasswordChanged] = useState(false);
    const [isDisabled,setIsDisabled] = useState(false); 
    const [phoneNumber,setPhoneNumber] = useState('');
    const [phoneError, setPhoneError] = useState("");
    const [verificCode,setVerificCode] = useState('');
    const [codeError, setCodeError] = useState('')
    const [newPassword, setNewPassword] = useState('');
    const [newPasswordError, setNewPasswordError] = useState('');
    const [emailError, setEmailError] = useState('');
    const [passwordError, setPasswordError] = useState('');

    let loginLabelArr = loginLabel?.[0]?.login.split(',  ');


    const Phone_regEx = /^(?:\+374|0)\d{8}$/;
    const verificationCode_regEx = /^\d{4}$/;
    const Password_regEx = /^.{4,}$/;

    
  useEffect(()=>{
    loadingData();
    sessionStorage.setItem('My_data', JSON.stringify(true));
    sessionStorage.setItem('Checkout_data', JSON.stringify(false));
    sessionStorage.setItem('Confirm_data', JSON.stringify(false));
  },[])


  async function loadingData() {
    setLoading(true);    
    try {
      const [authLabelData] = await Promise.all([
        axios.get(`/api/auth?lang=${currentLanguage}`),
      ])
      setLoginLabel(authLabelData.data);
      setLoading(false);
    } catch (error) {
      console.error("An error occurred:", error);
      throw error;
    }
  }

  const HandleSubmit = async(e)=>{
    e.preventDefault();
    setLoading(true);
    const emailInput = document.querySelector('input[name="email"]');
    const passwordInput = document.querySelector('input[name="password"]');


    const email = emailInput.value.trim();
    const password = passwordInput.value.trim();
    
    const data = {
        email,
        password,
    }
    try{

        const user = await axios.post("/api/user/login", data);
        setEmailError('')
        setPasswordError('');
        sessionStorage.setItem("user_token", JSON.stringify(user.data.token))
        sessionStorage.setItem("user_name", JSON.stringify(user.data.name))
        sessionStorage.setItem("user_id", JSON.stringify(user.data.id));
        sessionStorage.setItem("user_favorites", JSON.stringify(user.data.favorites))
        

    }catch(error){
        if(error.response.data.message == "Incorrect email"){
            setEmailError('Էլ․ հասցեն սխալ է:')
            setPasswordError('');
            setLoading(false);
        }else if (error.response.data.message == "Incorrect password"){
            setPasswordError('Գաղտնաբառը սխալ է!');
            setEmailError('')
            setLoading(false);
        }
        return
    }
    navigate('/');
    setLoading(false)
    window.location.reload();
  }

  const handleForgotPasswordSubmit = async (e) => {
    e.preventDefault();
    setIsDisabled(true);

    setPhoneError("");

    const phoneInput = document.querySelector('input[name="phone"]');

    let phone = phoneInput.value.trim();

    let hasError = false;

    if (!phone.match(Phone_regEx)) {
        setPhoneError(loginLabelArr?.[9]);
        hasError = true;
      } else {
        setPhoneError("");
      }

    if(hasError){
        setIsDisabled(false);
        return 
    }

    if (phone.startsWith('0')) {
        phone = '+374' + phone.substring(1);
    }

    const data = {
        phoneNumber: phone
    }
    try{
        const sendSMS = await axios.post('http://localhost:8000/api/user/forgotPassword', data)
    }catch(err){
        setIsDisabled(false);
        setPhoneError(loginLabelArr?.[17])
        return
    }
    setIsDisabled(false);
    setPhoneNumberEntered(true);
}

const handleVerificationSubmit = async (e) => {
    e.preventDefault();
    setIsDisabled(true);
    setCodeError("");

    const codeInput = document.querySelector('input[name="code"]');

    const code = codeInput.value.trim();

    let hasError = false;

    if (!code.match(verificationCode_regEx)) {
        setCodeError(loginLabelArr?.[13]);
        hasError = true;
    } else {
        setCodeError("");
    }

    if(hasError){
        setIsDisabled(false);
        return 
    }

    const data = {
        phoneNumber,
        verificationCode: verificCode
    }
    try{
        const verifyCode = await axios.post("http://localhost:8000/api/user/verifyCode", data)

        setUserEmail(verifyCode.data.message);
    }catch(err){
        setCodeError(loginLabelArr?.[14])
        setIsDisabled(false);
        return 
    }

    setIsDisabled(false);
    setCodeEntered(true);
}

const handlePasswordChange = async (e) => {
    e.preventDefault();
    setIsDisabled(true);

    const newPasswordInput = document.querySelector('input[name="newPassword"]');


    const password = newPasswordInput.value.trim();

    let hasError = false;

    if (!password.match(Password_regEx)) {
        setNewPasswordError(loginLabelArr?.[15]);
        hasError = true;
    } else {
        setNewPasswordError("");
    }

    if(hasError){
        setIsDisabled(false);
        return 
    }

    const data = {
        phoneNumber,
        verificationCode: verificCode,
        newPassword,
    }
    try{
        const changePassword = await axios.post("http://localhost:8000/api/user/resetPassword", data)

        console.log(changePassword.data);
    }catch(err){
        console.log(err);
        setIsDisabled(false);
        return 
    }
    setIsDisabled(false);
    setPasswordChanged(true);
}

const backToLogin = async(e)=>{
    e.preventDefault();
    setForgotPWD(false);
    setPhoneNumberEntered(false);
    setCodeEntered(false);
    setPasswordChanged(false);
    setPhoneNumber("");
    setVerificCode("");
    setNewPassword("");

}

  return (
  !loading ? <div className='Login'>
    <div className='LoginBox'>
    <div className='Login_title_box'>
        <h2 className='Login_title'>{loginLabelArr?.[0]}</h2>
        <h3 className='Login_text'>{loginLabelArr?.[1]}</h3>
    </div>
    {!forgotPWD ? <form className='Authorization' onSubmit={HandleSubmit}>
            <div className='InputBox'>
                <input type="text" name="email" value={email} onChange={(e)=> setEmail(e.target.value)} required='required' /> <span>{loginLabelArr?.[2]}</span>
            </div>
            {emailError && <p className="error">{emailError}</p>}

            <div className='InputBox'>
                <input type="password" name="password" value={password} onChange={(e)=> setPassword(e.target.value)} required='required' /> <span>{loginLabelArr?.[3]}</span>
            </div>
            {passwordError && <p className="error">{passwordError}</p>}

            <div className='forgotPassword cursor-pointer' onClick={()=> setForgotPWD(true)}>
                <h3>{loginLabelArr?.[4]}</h3>
            </div>
            
            <input type="submit" value={loginLabelArr?.[5]} className='login_btn'/>

            <div className='Register_text'>
                <div className='left'></div>
                <a href='/register'>{loginLabelArr?.[6]}</a>
                <div className='right'></div>
            </div>
            
        </form >:
        !phoneNumberEntered ? (
        <form className='Authorization' onSubmit={handleForgotPasswordSubmit}>
            <div className='InputBox'>
                    <input type="text" name='phone' required='required' value={phoneNumber} onChange={(e)=> setPhoneNumber(e.target.value)} /> <span>{loginLabelArr?.[8]}</span>
            </div>
            {phoneError && <p className="error">{phoneError}</p>}
            <input type="submit" value={loginLabelArr?.[10]} disabled={isDisabled} className='login_btn uppercase'/>
            <button className='login_btn uppercase' onClick={()=> setForgotPWD(false)}>{loginLabelArr?.[11]}</button>

            <div className='Register_text'>
                <div className='left'></div>
                <a href='/register'>{loginLabelArr?.[6]}</a>
                <div className='right'></div>
            </div>
            
        </form >
        ):
        !codeEntered ? (
        <form className='Authorization' onSubmit={handleVerificationSubmit}>
            <div className='InputBox'>
                    <input type="text" required='required' name='code' value={verificCode} onChange={(e)=> setVerificCode(e.target.value)} /> <span>{loginLabelArr?.[12]}</span>
            </div>
            {codeError && <p className="error">{codeError}</p>}
            <input type="submit" value={loginLabelArr?.[10]} disabled={isDisabled} className='login_btn uppercase'/>
            <button className='login_btn uppercase' onClick={()=> {
                setForgotPWD(false);
                setPhoneNumberEntered(false)
                }
                }>{loginLabelArr?.[11]}</button>

            <div className='Register_text'>
                <div className='left'></div>
                <a href='/register'>{loginLabelArr?.[6]}</a>
                <div className='right'></div>
            </div>
            
        </form >
        ):
        !passwordChanged ? (
            <form className='Authorization' onSubmit={handlePasswordChange}>
            <div className='InputBox'>
                    <input type="password" required='required' name='newPassword' value={newPassword} onChange={(e)=> setNewPassword(e.target.value)} /> <span>{loginLabelArr?.[3]}</span>
            </div>
            {newPasswordError && <p className="error">{newPasswordError}</p>}
            <input type="submit" value={loginLabelArr?.[10]} disabled={isDisabled} className='login_btn uppercase'/>
            <button className='login_btn uppercase' onClick={()=> {
                setPasswordChanged(false)
                setCodeEntered(false)
                setPhoneNumberEntered(false)
                setForgotPWD(false)
                }
                }>{loginLabelArr?.[11]}</button>

            <div className='Register_text'>
                <div className='left'></div>
                <a href='/register'>{loginLabelArr?.[6]}</a>
                <div className='right'></div>
            </div>
            
        </form >
            
        ):
        <div className='Changed_Password'>
            <div className='Check_Box'>
                <div className='Check_Box_I'>
                    <i className="fa-solid fa-check"></i>
                </div>
            </div>
            <div className='Changed_Password_Text'>
                <h3 className=' text-center text-green-700 lowercase'>{userEmail}</h3>
                <h2 className=' text-center'>{loginLabelArr?.[16]}</h2>
            </div>
            <div className='Changed_Password_Btn' onClick={(e)=> backToLogin(e)} >
                <button>{loginLabelArr?.[5]}</button>
            </div>
        </div> 
        }


        {/* <div className='Login_button'>
            
        </div> */}

        <div className='login_text_bottom'>
            <h3>{loginLabelArr?.[7]}</h3>
        </div>
    </div>
        

    </div>:
    <div className='FadeLoader'>
    <FadeLoader
          color='#006699'
          loading={loading}
          size={100}
          aria-label="Loading Spinner"
          data-testid="loader"
        />
    </div>
    )
}
