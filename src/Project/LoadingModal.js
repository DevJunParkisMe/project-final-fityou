import React from 'react'
import { useSpring, animated } from 'react-spring';
import Timer from './Component/Timer';
const LoadingModal = ({isOpen, onClose, setIsAlert}) => {
    const modalAnimation = useSpring({
        opacity: isOpen ? 1 : 0,
        transform: `translateY(${isOpen ? 0 : 60}%)`,
        config: {
            duration: 300, // 애니메이션 지속 시간 (ms)
        },
        reverse: !isOpen, // isModalOpen이 false가 되면 애니메이션을 초기화
    });
  return (
    <div className={`modal ${isOpen ? 'block' : 'hidden'} absolute inset-0 h-full w-full bg-transparent z-40`}>
    <animated.div
      style={{ ...modalAnimation, top: '35%', height: '5%' }}
      className={`modal-content absolute w-1/2 left-1/4 top-0 transform -translate-x-1/2 -translate-y-1/2 bg-black rounded-3xl `}>
        <span className="close text-3xl absolute top-2 right-4 cursor-pointer text-white" onClick={onClose}>
          &times;
        </span>
        <div className='w-full h-full flex flex-col gap-5 justify-center items-center'>
            <Timer onClose={onClose} setIsAlert={setIsAlert}/>
            <div className="w-10 h-10 border-t-2 border-orange-500 animate-spin rounded-full"></div>
        </div>
    </animated.div>
  </div>
  )
}

export default LoadingModal
