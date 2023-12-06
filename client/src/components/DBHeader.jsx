import React from 'react';
import { useSelector } from 'react-redux';

const DBHeader = () => {
  const user = useSelector((state) => state.user);

  return (
    <div className='w-full flex items-center justify-between gap-3'>
        <p className=''>
            Welcome to City
            {user?.name && (
                <span>{`Hello, ${user?.name}...!`}</span>
            )}
        </p>
    </div>
  )
}

export default DBHeader;