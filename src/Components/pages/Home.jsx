import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { getAuth, onAuthStateChanged, signOut } from "firebase/auth";

function Home() {
  const [userEmail, setUserEmail] = useState('');
  const navigate = useNavigate();
  const auth = getAuth();

  // BMI Calculator states
  const [height, setHeight] = useState(0);
  const [weight, setWeight] = useState(0);
  const [bmi, setBmi] = useState(0);
  const [bmiCategory, setBmiCategory] = useState('');

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
   //CODE FOR BMI CALCULATOR 
   
  const calculateBMI = () => {
    let heightInMeters = height / 100; // assuming the height is in centimeters
    let bmi = weight / (heightInMeters * heightInMeters);
    bmi = bmi.toFixed(2);
    setBmi(bmi);

    // Determine the BMI category
    if (bmi < 16) {
      setBmiCategory('Severe Thinness');
    } else if (bmi >= 16 && bmi < 17) {
      setBmiCategory('Moderate Thinness');
    } else if (bmi >= 17 && bmi < 18.5) {
      setBmiCategory('Mild Thinness');
    } else if (bmi >= 18.5 && bmi < 25) {
      setBmiCategory('Normal');
    } else if (bmi >= 25 && bmi < 30) {
      setBmiCategory('Overweight');
    } else if (bmi >= 30 && bmi < 35) {
      setBmiCategory('Obese Class I');
    } else if (bmi >= 35 && bmi < 40) {
      setBmiCategory('Obese Class II');
    } else {
      setBmiCategory('Obese Class III');
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
        <h3 style={{ fontWeight: 'bold' }}>Welcome to the user authentication web application using react,</h3>
        <h2 style={{ fontWeight: 'bold' }}>Hello {userEmail}!</h2>
       
        <div>
          <h2>BMI Calculator</h2>
          <label>
            Height (in cm):
            <input type="number" value={height} onChange={e => setHeight(e.target.value)} />
          </label>
          <label>
            Weight (in kg):
            <input type="number" value={weight} onChange={e => setWeight(e.target.value)} />
          </label>
          <button onClick={calculateBMI}>Calculate</button>
          {bmi > 0 && <p>Your BMI is {bmi}, which is considered {bmiCategory}.</p>}
          <h1> </h1>
          <button onClick={handleLogout} style={{ fontWeight: 'bold' }}>Logout</button>
        </div>
      </div>
    </div>
  );
}

export default Home;
