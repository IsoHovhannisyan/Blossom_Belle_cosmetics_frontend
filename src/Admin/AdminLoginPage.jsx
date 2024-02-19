import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from '../axios';
import '../css/Admin/AdminLoginPage.css';

export function AdminLoginPage() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate('');

    const performLogin = async (email, password) => {
        try {
            const response = await axios.post('http://localhost:8000/api/user/login', { email, password });

            if (response.status === 200) {
                const token = response.data.token;
                sessionStorage.setItem('token', token);
                navigate('/admin/add/product');
                console.log(response.status);
            }
        } catch {
            alert('Login failed. Please try again.');
        }
    };

    const handleLogin = async (e) => {
        e.preventDefault();
        await performLogin(email, password);
    };

    return (
        <div className="Admin">
            <div className='Login_title'>Admin Login</div>
            <div className="login-container">
                <form onSubmit={handleLogin} className='Authorization'>

                    <div className='InputBox'>
                        <input 
                        type="email" 
                        required='required' 
                        onChange={(e) => setEmail(e.target.value)} /> <span>Email</span>
                    </div>

                    <div className='InputBox'>
                        <input 
                        type="password" 
                        required='required' 
                        onChange={(e) => setPassword(e.target.value)}/> <span>Password</span>
                    </div>
                    <input type="submit" value="Login" className='login_btn' />
                </form>
            </div>
        </div>
    )
}