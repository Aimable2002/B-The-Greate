import { Button } from '@nextui-org/react';
import React, { useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import useLogin from '../hook/useLogin';

const Login = () => {
    const { login } = useLogin()
  const [input, setInput] = useState({
    userName: "",
    password: "",
  });

  const labelsMap = {
    'Last Name': 'userName',
    'Password': 'password',
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
      userName: input.userName,
      password: input.password,
    };
    console.log('inputs:', parsedInput);
    await login(parsedInput);
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
                label === 'Last Name' ? 'Anne' : 
                label === 'Password' ? 'Anne@12.' : ''
              } 
              onChange={handleChange}
            />
          </label>
        ))}
      </div>

      <div className='w-full px-6 flex flex-col gap-4 mt-4'>
        <Button size='xxlg' onClick={handleSubmit1}>Login</Button>
      </div>
      <div className='text-center mt-5'>
          <p>No account yet  <Link to='/Register'><i className='text-green-500'>Signup</i></Link></p>
        </div>
        <div className='text-center mt-5'>
          <p>Escape to Login  <Link to='/'><i className='text-green-500'>Move Home</i></Link></p>
        </div>
    </div>
  );
};

export default Login;