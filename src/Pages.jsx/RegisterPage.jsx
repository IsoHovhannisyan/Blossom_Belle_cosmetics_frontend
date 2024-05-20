import { useState, useEffect } from "react";
import "../css/Authorization/RegisterPage.css";
import axios from "../axios";
import { useNavigate } from "react-router-dom";
import FadeLoader from "react-spinners/FadeLoader";

export function RegisterPage({ currentLanguage }) {
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();
  const [registerLogin, setRegisterLogin] = useState([]);
  const [nameError, setNameError] = useState("");
  const [lastNameError, setLastNameError] = useState(""); 
  const [phoneError, setPhoneError] = useState(""); 
  const [emailError, setEmailError] = useState(""); 
  const [passwordError, setPasswordError] = useState(""); 
  const [confirmPasswordError, setConfirmPasswordError] = useState(""); 

  const Name_regEx = /^[a-zA-Z]{3,}$/;
  const LastName_regEx = /^[a-zA-Z]{3,}$/;
  const Phone_regEx = /^(?:\+374|0)\d{8}$/;
  const Email_regEx = /^[a-zA-Z0-9._%+-]+@(?:mail\.ru|gmail\.com|yahoo\.com|outlook\.com|aol\.com|icloud\.com|protonmail\.com|yandex\.com|zoho\.com|gmx\.com|hotmail\.com|live\.com)$/;
  const Password_regEx = /^.{4,}$/;

  let registerLabelArr = registerLogin?.[0]?.register.split(',  ');

  useEffect(() => {
    loadingData();
    sessionStorage.setItem('My_data', JSON.stringify(true));
    sessionStorage.setItem('Checkout_data', JSON.stringify(false));
    sessionStorage.setItem('Confirm_data', JSON.stringify(false));
  }, [])
  

  async function loadingData() {
    setLoading(true)
    try {
      const [authLabelData] = await Promise.all([
        axios.get(`/api/auth?lang=${currentLanguage}`),
      ])
      setRegisterLogin(authLabelData.data);
      setLoading(false)
    } catch (error) {
      console.error("An error occurred:", error);
      throw error;
    }
  }

  const handleFormSubmit = async (event) => {
    event.preventDefault();
    const nameInput = document.querySelector('input[name="firstName"]');
    const lastNameInput = document.querySelector('input[name="lastName"]');
    const phoneInput = document.querySelector('input[name="phone"]');
    const emailInput = document.querySelector('input[name="email"]');
    const passwordInput = document.querySelector('input[name="password"]');
    const confirmPasswordInput = document.querySelector('input[name="confirmPassword"]');

    const name = nameInput.value.trim();
    const lastName = lastNameInput.value.trim();
    const phone = phoneInput.value.trim();
    const email = emailInput.value.trim();
    const password = passwordInput.value.trim();
    const confirmPassword = confirmPasswordInput.value.trim();

    let hasError = false;

    if (!name.match(Name_regEx)) {
      setNameError(registerLabelArr?.[9]);
      hasError = true;
    } else {
      setNameError("");
    }

    if (!lastName.match(LastName_regEx)) {
      setLastNameError(registerLabelArr?.[10]);
      hasError = true;
    } else {
      setLastNameError("");
    }

    if (!phone.match(Phone_regEx)) {
      setPhoneError(registerLabelArr?.[11]);
      hasError = true;
    } else {
      setPhoneError("");
    }

    if (!email.match(Email_regEx)) {
      setEmailError(registerLabelArr?.[12]);
      hasError = true;
    } else {
      setEmailError("");
    }

    if (!password.match(Password_regEx)) {
      setPasswordError(registerLabelArr?.[13]);
      hasError = true;
    } else {
      setPasswordError("");
    }

    if (password !== confirmPassword) {
      setConfirmPasswordError(registerLabelArr?.[14]);
      hasError = true;
    } else {
      setConfirmPasswordError("");
    }
    if(hasError){
        window.scroll({
          top: 200,
          left: 0,
          behavior: 'smooth' // You can use 'smooth' for smooth scrolling or 'auto' for instant scrolling
        });
        return 
    }

    const Register = {
        name: name + ' ' + lastName,
        email,
        password,
        phoneNumber: phone,
        role: 'user'
    }

    try{
        const UserRegister = await axios.post('/api/user/register', Register);

        sessionStorage.setItem("user_token", JSON.stringify(UserRegister.data.token))
        sessionStorage.setItem("user_name", JSON.stringify(UserRegister.data.name))
        sessionStorage.setItem("user_id", JSON.stringify(UserRegister.data.id));
        sessionStorage.setItem("user_favorites", JSON.stringify(UserRegister.data.favorites))
        navigate('/');
        window.location.reload();
        
    }catch(err){
        if(err.response.data.message == 'Пользователь с таким email уже существует') {
            setEmailError(registerLabelArr?.[15])
        }
        console.log(err.response.data.message)
        return
    }

  };

  return (
    !loading ?<div className='Login'>
      <div className='LoginBox'>
        <div className='Login_title_box'>
          <h2 className='Login_title'>{registerLabelArr?.[0]}</h2>
          <h3 className='Login_text'>{registerLabelArr?.[1]}</h3>
        </div>
        <form className='Authorization' onSubmit={handleFormSubmit}>
          <div className='InputBox'>
            <input type="text" name="firstName" required='required' /> <span>{registerLabelArr?.[2]}</span>
          </div>
          {nameError && <p className="error">{nameError}</p>}
          <div className='InputBox'>
            <input type="text" name="lastName" required='required' /> <span>{registerLabelArr?.[3]}</span>
          </div>
          {lastNameError && <p className="error">{lastNameError}</p>}
          <div className='InputBox'>
            <input type="text" name="phone" required='required' /> <span>{registerLabelArr?.[4]}</span>
          </div>
          {phoneError && <p className="error">{phoneError}</p>}
          <div className='InputBox'>
            <input type="text" name="email" required='required' /> <span>{registerLabelArr?.[5]}</span>
          </div>
          {emailError && <p className="error">{emailError}</p>}
          <div className='InputBox'>
            <input type="password" name="password" required='required' /> <span>{registerLabelArr?.[6]}</span>
          </div>
          {passwordError && <p className="error">{passwordError}</p>}
          <div className='InputBox'>
            <input type="password" name="confirmPassword" required='required' /> <span>{registerLabelArr?.[7]}</span>
          </div>
          {confirmPasswordError && <p className="error">{confirmPasswordError}</p>}
          <input type="submit" value={registerLabelArr?.[8]} className='login_btn' />
        </form>
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













