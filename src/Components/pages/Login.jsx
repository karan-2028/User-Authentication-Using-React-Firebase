
import React,{useState} from "react";
import './Login.css';
import { FaUserAlt,FaLock } from "react-icons/fa";
import { getAuth,signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "./firebase";
import { Link, useHistory, useNavigate } from 'react-router-dom';
import { FirebaseError } from "firebase/app";



function Login() {
    
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate();
    const auth = getAuth();
       
  

     const handleSubmit = async (e) => {
        e.preventDefault();
        
       
    try {
      await signInWithEmailAndPassword(auth, email, password);
      navigate('/home');
    } catch (error) {
      alert(error.message);
    }
  };
  
    return (
    <div>
        <form onSubmit={handleSubmit} className='wrapper'>

            <h1>Login</h1>
            <div className="input-box">
                <input type="email" placeholder='Your Email'   required
                value={email}
                onChange={(e) =>setEmail(e.target.value) }
                />
                <FaUserAlt className='icon'/>
            </div>
            <div className="input-box">
                <input type="password" placeholder='password'  
                 required
                 value={password}
                 onChange={(e) =>setPassword(e.target.value) }
                 />
                <FaLock className='icon' />
            </div>


            <button type='submit'>Login</button>

            <div className="Login-button">
            <p> Create an account? <Link to ="/signup">Create account</Link> </p>
            </div>
        </form>

    </div>
  )
}
export default Login;