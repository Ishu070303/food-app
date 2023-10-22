import React from 'react';
import { LoginBg } from '../assets';

const Login = () => {
  return (
    <div className='w-screen h-screen relative overflow-hidden flex'>
        {/* background color */}
        <img 
        src={LoginBg} className='w-full h-full object-cover absolute top-0 left-0' 
        alt='' 
        />

        {/* content box */}
        <div className='flex flex-col items-center bg-lightOverlay w-[80%] md:w-508 h-full z-10 backdrop-blur-md absolute right-0'>

        </div>

    </div>
  )
}

export default Login 