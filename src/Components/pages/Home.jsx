import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
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
    <div style={{ 
      display: 'flex', 
      flexDirection: 'column', 
      alignItems: 'center', 
      justifyContent: 'center', 
      height: '100vh', 
    }}>
      <div style={{ 
        backdropFilter: 'blur(4px)', 
        backgroundColor: 'rgba(255, 255, 255, 0.7)',
        padding: '20px',
        borderRadius: '10px',
      }}>
        <h1 style={{ fontWeight: 'bold' }}>Welcome to the user authentication web application using react,</h1>
        <h1 style={{ fontWeight: 'bold' }}>Hello {userEmail}!</h1>
        <button onClick={handleLogout} style={{ fontWeight: 'bold' }}>Logout</button>
      </div>
    </div>
  );
}

export default Home;
