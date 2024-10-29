import React, { useState } from 'react';
import axios from 'axios';
import { toast } from 'react-hot-toast'

const useSignup = () => {
  const [loading, setLoading] = useState(false);
  const signup = async ({ fullName, userName, age, gender, email, Phone_number, password, confirmPassword }) => {
    const success = handleErr(fullName, userName,  gender, email, Phone_number, password, confirmPassword)
    if(!success)return
    setLoading(true);
    try {
      const res = await axios.post('/api/auth/signup', {
        fullName,
        userName,
        age,
        gender,
        Phone_number,
        email,
        password,
        confirmPassword
      });
      const data = res.data;

      if (data.error) {
        throw new Error('Signup error: ' + data.error.message);
      }

      console.log('Signup successful');
      localStorage.setItem('online-user', JSON.stringify(data));
      window.location = '/';
    } catch (error) {
      console.error('Error in useSignup:', error.message);
    } finally {
      setLoading(false);
    }
  };

  return { loading, signup };
};

export default useSignup;


function handleErr (fullName, userName,  email, gender, Phone_number, password, confirmPassword) {
  if(!fullName || !userName || !email || !gender || !Phone_number || !password || !confirmPassword){
    toast.error('Please fill all required fields.');
    return false
  }else{
    return true
  }
}
