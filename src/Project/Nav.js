import React, { useState } from 'react';
import { IoMdMenu, IoMdClose } from 'react-icons/io';
import LoginModal from './LoginModal';
const Nav = ({ isNavVisible, setNavVisible , buttonColor, handleButtonClick, screenId, isModalOpen, openMyModal, isLogin}) => {
  // const [isModalOpen, setModalOpen] = useState(false);
  
  const toggleNav = () => {
    console.log('내비게이션 토글 클릭됨');
    setNavVisible(!isNavVisible);
  };

  // const handleButtonClick = (screenId) => {
  //   console.log(screenId, 'screenId');
  //   const screenPosition = (screenId - 1) * window.innerHeight;
  //   console.log(screenPosition, 'screenPosition');
  //   window.scrollTo({
  //     top: screenPosition,
  //   });

  // };
  const openModal = () => {

    isModalOpen(true);
  };

  // const closeModal = () => {
  //   setModalOpen(false);
  // };
  return (
    <>
    
    <div className='flex fixed w-full z-20'>
      {isNavVisible ? (
        <IoMdClose
          className='text-4xl fixed m-10 text-white z-30 cursor-pointer'
          onClick={toggleNav}
        />
      ) : (
        <IoMdMenu
          className='text-4xl fixed m-10 text-white z-30 cursor-pointer'
          onClick={toggleNav}
        />
      )}
      <div className='w-full'>
        <div className={`text-white bg-black bg-opacity-50 ${isNavVisible ? '' : 'hidden'} flex justify-center w-full h-full items-center`}>
          <ul className='flex w-3/4 justify-around font-KIMM_Bold text-3xl'>
            <li
              className={` cursor-pointer ${buttonColor === 1 ? 'text-orange-400' : ''} py-10`}
              onClick={() => handleButtonClick(1)}
            >
              Home
            </li>
            <li
              className={`cursor-pointer ${buttonColor === 2 ? 'text-orange-400' : ''} py-10`}
              onClick={() => handleButtonClick(2)}
            >
              Style
            </li>
            <li
              className={` cursor-pointer py-10`}
              onClick={!isLogin ? openModal : openMyModal}><span>{!isLogin ? 'LOGIN' : 'MYPAGE'}</span>
            </li>
            <li
              className={`cursor-pointer ${buttonColor === 3 ? 'text-orange-400' : ''} py-10`}
              onClick={() => handleButtonClick(3)}
            >
              Product
            </li>
            <li
              className={`cursor-pointer ${buttonColor === 4 ? 'text-orange-400' : ''} py-10`}
              onClick={() => handleButtonClick(4)}
            >
              Coordi
            </li>
            {/* <ul className='flex items-center'> */}
            {/* <li className='mr-5 cursor-pointer'  onClick={openModal}>LOGIN</li> */}
            {/* <li className=' cursor-pointer'>SignUp</li> */}
            {/* </ul> */}
          </ul>
          
        </div>
      </div>
    </div>
    </>
  );
};

export default Nav;
