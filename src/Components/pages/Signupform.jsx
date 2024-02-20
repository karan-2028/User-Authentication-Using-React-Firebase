
import React,{useState} from "react";
import './Signupform.css';
import { FaUserAlt,FaLock } from "react-icons/fa";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { auth } from "./firebase";
import { useNavigate } from 'react-router-dom';
import { Link } from 'react-router-dom';



const Signupform = () => {
    
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
   
    
     const navigate = useNavigate();
       
      


    const handleSubmit = async(e) =>{
        e.preventDefault();
        
        try{
            const userCredential = await createUserWithEmailAndPassword(auth, email, password);
            console.log(userCredential);
            const user = userCredential.user;
            localStorage.setItem('token', user.accessToken);
            localStorage.setItem('user', JSON.stringify(user));
            navigate("/");
        }catch (error){
            console.error(error);
        }

    }
    
  
    return (
    <div>
        <form onSubmit={handleSubmit} className='wrapper'>

            <h1>Signup</h1>
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

            <div className="input-box">
                <input type="password" placeholder='password confirmation'   required/>
                <FaLock className='icon' />
            </div>

            <button type='submit'>Signup</button>

            <div className="signup-button">
            <p> Already have an account? <Link to ="/login">Login</Link></p>
            </div>
        </form>

    </div>
  )
}
export default Signupform;