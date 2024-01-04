import { hover } from '@testing-library/user-event/dist/hover';
import React, { useState } from 'react'

const Top10 = () => {
  const [isHover, setIsHover] = useState(0);

  const hoverAnimation = (num) => {
    setIsHover(num)
    console.log(num, 'num')
  }

  return (
    <div className='relative w-full h-full flex justify-center'>
      {/* <div className='cursor-pointer absolute w-1/2 bg-white flex' style={{top: '72%', left:'25%', height:'8%'}}>
        {isHover === 1 ? <div className='absolute bg-black w-1/4 h-full opacity-90 flex items-center justify-center' onMouseOver={() => hoverAnimation(1)} onMouseLeave={() => hoverAnimation(0)}><span className='text-white text-4xl font-KIMM_Bold'>TOP</span></div> : null }
        <div className='w-1/4 bg-black cursor-pointer' style={{ backgroundImage: `url('/img/상의.png')`, backgroundSize: 'cover' }} onMouseEnter={() => hoverAnimation(1)}></div>
        {isHover === 2 && <div className='absolute bg-black w-1/4 left-1/3 h-full opacity-90 flex items-center justify-center' onMouseOver={() => hoverAnimation(2)} onMouseLeave={() => hoverAnimation(0)}><span className='text-white text-4xl font-KIMM_Bold'>PANTS</span></div>}
        <div className='w-1/4 bg-black cursor-pointer' style={{ backgroundImage: `url('/img/하의.png')`, backgroundSize: 'cover' }} onMouseEnter={() => hoverAnimation(2)}></div>
        {isHover === 3 && <div className='absolute bg-black w-1/4 left-2/3 h-full opacity-90 flex items-center justify-center'onMouseOver={() => hoverAnimation(3)} onMouseLeave={() => hoverAnimation(0)}><span className='text-white text-4xl font-KIMM_Bold'>ETC.</span></div>}
        <div className='w-1/4 bg-black cursor-pointer' style={{ backgroundImage: `url('/img/양말.png')`, backgroundSize: 'cover' }} onMouseEnter={() => hoverAnimation(3)}></div>
        {isHover === 4 && <div className='absolute bg-black w-1/4 left-2/3 h-full opacity-90 flex items-center justify-center'onMouseOver={() => hoverAnimation(4)} onMouseLeave={() => hoverAnimation(0)}><span className='text-white text-4xl font-KIMM_Bold'>ETC.</span></div>}
        <div className='w-1/4 bg-black cursor-pointer' style={{ backgroundImage: `url('/img/양말.png')`, backgroundSize: 'cover' }} onMouseEnter={() => hoverAnimation(4)}></div>
      </div> */}
      <div className='absolute flex w-3/4 h-full mt-32'>
        <div className='relative w-1/2 h-1/3 bg-black cursor-pointer' style={{ backgroundImage: `url('/img/상의.png')`, backgroundSize: 'cover' }} onMouseEnter={() => hoverAnimation(1)} onMouseLeave={() => hoverAnimation(0)}>
          { isHover === 1 ? 
          <>
            <div className='absolute w-full h-full bg-black opacity-80'></div>
          <div className='flex w-full h-full justify-center items-center'>
            <span className='absolute text-orange-500 font-KIMM_Bold text-4xl'>TOP</span>
          </div>
          </>
          : ''}
        </div>
        <div className='relative w-1/2 h-1/3 bg-black cursor-pointer' style={{ backgroundImage: `url('/img/하의.png')`, backgroundSize: 'cover' }} onMouseEnter={() => hoverAnimation(2)} onMouseLeave={() => hoverAnimation(0)}>
          { isHover === 2 ? 
          <>
            <div className='absolute w-full h-full bg-black opacity-80'></div>
          <div className='flex w-full h-full justify-center items-center'>
            <span className='absolute text-orange-500 font-KIMM_Bold text-4xl'>PANTS</span>
          </div>
          </>
          : ''}
        </div>
        <div className='relative w-1/2 h-1/3 bg-black cursor-pointer' style={{ backgroundImage: `url('/img/양말.png')`, backgroundSize: 'cover' }} onMouseEnter={() => hoverAnimation(3)} onMouseLeave={() => hoverAnimation(0)}>
          { isHover === 3 ? 
          <>
            <div className='absolute w-full h-full bg-black opacity-80'></div>
          <div className='flex w-full h-full justify-center items-center'>
            <span className='absolute text-orange-500 font-KIMM_Bold text-4xl'>ETC.</span>
          </div>
          </>
          : ''}
        </div>
        <div className='relative w-1/2 h-1/3 bg-black cursor-pointer' style={{ backgroundImage: `url('/img/상의.png')`, backgroundSize: 'cover' }} onMouseEnter={() => hoverAnimation(4)} onMouseLeave={() => hoverAnimation(0)}>
          { isHover === 4 ? 
          <>
            <div className='absolute w-full h-full bg-black opacity-80'></div>
          <div className='flex w-full h-full justify-center items-center'>
            <span className='absolute text-orange-500 font-KIMM_Bold text-4xl'>OUTER</span>
          </div>
          </>
          : ''}
        </div>
      </div>
    </div>
  )
}

export default Top10
