import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { auth } from "./firebase";
import { getAuth, onAuthStateChanged, signOut } from "firebase/auth";


function Home() {
  const [userEmail, setUserEmail] = useState('');
  const navigate = useNavigate();
  const auth = getAuth();

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        setUserEmail(user.email);
      } else {
        navigate('/login');
      }
    });

    // Cleanup subscription on unmount
    return () => unsubscribe();
  }, [navigate]);

  const handleLogout = async () => {
    try {
      await signOut(auth);
      navigate('/login');
    } catch (error) {
      alert(error.message);
    }
  };
  return (
    <div>
      <h1>Welcome, {userEmail}!</h1>
      <button onClick={handleLogout}>Logout</button>
    </div>
  );
}

export default Home;
