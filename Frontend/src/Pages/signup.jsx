// // src/Pages/SignUpPage.jsx
// import { SignUp } from "@clerk/clerk-react";

// export default function SignUpPage() {
//   return <SignUp />;
// }



import { Button } from '@nextui-org/react';
import React, { useRef, useState } from 'react';
import useSignup from '../hook/useSignup';
import { Link } from 'react-router-dom';

const Signup = () => {
  const { signup } = useSignup();
  const [input, setInput] = useState({
    fullName: "",
    userName: "",
    email: "",
    Phone_number: '',
    age: "",
    gender: "",
    password: "",
    confirmPassword: ""
  });

  const labelsMap = {
    'First Name': 'fullName',
    'Last Name': 'userName',
    'Email': 'email',
    'Phone Number': 'Phone_number',
    'gender': 'gender',
    'Password': 'password',
    'Re-Type password': 'confirmPassword'
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setInput((prev) => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit1 = async (e) => {
    e.preventDefault();
    // const parsedInput = Object.keys(labelsMap).reduce((acc, label) => {
    //   acc[label] = input[labelsMap[label]];
    //   return acc;
    // }, {});

    const parsedInput = {
      fullName: input.fullName,
      userName: input.userName,
      email: input.email,
      Phone_number: input.Phone_number,
      age: input.age,
      gender: input.gender,
      password: input.password,
      confirmPassword: input.confirmPassword,
    };
    console.log('inputs:', parsedInput);
    await signup(parsedInput);
  };

  return (
    <div className='w-[100%] flex flex-col flex-1'>
      <div className='w-full px-6 flex flex-col gap-4 mt-10'>
        <div className='text-center mb-5'>
          <h1 className=''>Sign To <i className='text-green-500'>AgasobanuyeStores</i></h1>
          <i className='text-sm'>All fields are required</i>
        </div>
        {Object.keys(labelsMap).map((label, index) => (
          <label 
            key={index}
            className="input input-bordered flex items-center w-full gap-2"
          >
            {label}
            <input 
              type="text" 
              name={labelsMap[label]} 
              className="grow w-full" 
              placeholder={
                label === 'First Name' ? 'Maria' : 
                label === 'Last Name' ? 'Anne' : 
                label === 'Email' ? 'example@gmail.com' : 
                label === 'Phone Number' ? '0787888888' : 
                label === 'gender' ? 'Male or Female' : 
                label === 'Password' ? 'Anne@12.' :
                label === 'Re-Type password' ? 'Anne@12.' : ''
              } 
              onChange={handleChange}
            />
          </label>
        ))}
      </div>

      <div className='w-full px-6 flex flex-col gap-4 mt-4'>
        <Button size='xxlg' onClick={handleSubmit1}>Signup</Button>
      </div>
      <div className='text-center mt-5'>
          <p>Have account  <Link to='/login'><i className='text-green-500'>Login</i></Link></p>
        </div>
    </div>
  );
};

export default Signup;



