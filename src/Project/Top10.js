import { hover } from '@testing-library/user-event/dist/hover';
import React, { useEffect, useRef, useState } from 'react'

const Top10 = () => {
  const [isHover, setIsHover] = useState(0);
  const [containerWidth, setContainerWidth] = useState(0);
  const [clientLeft, setClientLeft] = useState(0);   
  const [top10Image, setTop10Image] = useState([]);
  const [top10Click, setTop10Click] = useState(0);
  const [tempNum, setTempNum] = useState(0);
  const [isTop10Hover, setTop10Hover] = useState(null);
  const previousXRef = useRef(0);
  const hoverAnimation = (num) => {
    setIsHover(num)
    if (num === 0) {
      setIsHover(top10Click)
    }
  }

  const ref = useRef();
  const [isDragging, setIsDragging] = useState(false);
  const [previousX, setPreviousX] = useState(0);
  const div = ref.current;
  const refId = useRef(null);
  useEffect(() => {
    setIsHover(isHover)
  }, [hoverAnimation])
  const handleMouseMove = (e) => {
    e.preventDefault()
    if (!isDragging || !div || refId.current) {
      return;
    }
  
    refId.current = requestAnimationFrame(() => {
        let delta = 0;
        if (div) {
            if (previousXRef.current >= div.clientWidth) {
              delta = e.clientX - (previousXRef.current - div.scrollLeft);
              console.log(delta, 'delta')
            }
            else {
              delta = e.clientX - previousXRef.current
              console.log(delta, 'delta')
            }
            
            console.log(div.scrollWidth, 'scrollWidth')
            console.log(div.clientWidth, 'clientWidth')
            if (div.scrollWidth > div.clientWidth) {
                div.scrollLeft -= (delta);
                console.log(div.scrollLeft, 'scrollLeft')
                setClientLeft(div.scrollLeft)
                // setPreviousX(e.clientX);
              } 
          }
          refId.current = null;
  
      // 아래 예제에서 같이 사용될 코드(지금은 몰라도 무관합니다.)
      tickEvent.current.tickCnt += 1;
    });
  };
// 추가된 변수
const tickEvent = useRef({ start: new Date(), tickCnt: 0 });


const handleMouseDown = (e) => {
    e.preventDefault()
    setIsDragging(true);
    
    if (div.scrollLeft >= div.clientWidth) {
      previousXRef.current = e.clientX + div.scrollLeft;
    }
    else {
      previousXRef.current = e.clientX;
    }
    
    console.log(previousX, 'mouseDown')
    // 추가된 코드
    tickEvent.current = { start: new Date(), tickCnt: 0 };
};
useEffect(() => {
    if (div) {
        div.scrollLeft = previousX;
    }
  }, [previousX, div]);
useEffect(() => {

    console.log('div value:', div);
  }, [div]);
const handleMouseUp = (e) => {
    setIsDragging(false);
    // 추가된 코드
    console.log(`${(+new Date() - +tickEvent.current.start) / 1000}초`, tickEvent.current.tickCnt);
};
const handleMouseEnter = (e) => {
  setIsDragging(false)
}

const fetchTop10View = async (num) => {
  let temp = num;
  if (num === 1) {
    num = 'OUTER'
  }
  else if (num === 2) {
    num = 'TOP'
  }
  else if (num === 3) {
    num = 'PANTS'
  }
  else if (num === 4) {
    num = 'SKIRT'
  }
  else if (num === 5) {
    num = 'INNER'
  }
  else if (num === 6) {
    num = 'SET'
  }
  try {
    const response = await fetch(`http://10.125.121.220:8080/best?category=${num}`, {
      method: 'GET',
      headers: {
        'Content-Type' : 'application/json' 
      }
    })
    if (response.ok) {
      console.log('top10 성공')
      const data = await response.json()
      setTop10Image(data)
      console.log(data, 'data')
      setTop10Click(temp)
      // setIsHover(temp)
    }
    else {
      console.log('실패')
    }
  } catch (error) {
    console.error('오류', error)
  }
}

const handleTop10Click = (num) => {
  div.scrollLeft = 0;
  if (tempNum === num && top10Click !== 0) {
    setTop10Click(0)
    return
  }
  setTempNum(num)
  fetchTop10View(num)
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
      <div className='absolute flex h-full mt-32' style={{width:'80%'}}>
        <div onClick={() => handleTop10Click(1)} className={`relative w-1/2 h-1/3 bg-black cursor-pointer rounded-l-3xl ${top10Click === 1 ? 'rounded-3xl border-2 border-white z-10' : ''}`} style={{ backgroundImage: `url('/img/OUTER.jpg')`, backgroundSize: 'cover' , transform: `${top10Click === 1 ? 'scale(105%)' : 'scale(100%)'}`}} onMouseEnter={() => hoverAnimation(1)} onMouseLeave={() => hoverAnimation(0)} >
          
          <>
            <div className={`absolute w-full h-full bg-black opacity-30 ${top10Click === 1 ? 'rounded-3xl': ''}`} ></div>
          <div className='flex w-full h-full justify-center items-center'>
            <span className={`absolute font-KIMM_Bold ${top10Click === 1 ? 'text-orange-300 text-4xl':'text-white  text-3xl'}`}>OUTER</span>
          </div>
          </>
        </div>
        <div onClick={() => handleTop10Click(2)} className={`relative w-1/2 h-1/3 bg-black cursor-pointer ${top10Click === 2 ? 'rounded-3xl border-2 border-white z-10' : ''}`} style={{ backgroundImage: `url('/img/TOP.jpg')`, backgroundSize: 'cover', transform: `${top10Click === 2 ? 'scale(105%)' : 'scale(100%)'}` }} onMouseEnter={() => hoverAnimation(2)} onMouseLeave={() => hoverAnimation(0)}>
  
          <>
            <div className={`absolute w-full h-full bg-black opacity-30 ${top10Click === 2 ? 'rounded-3xl': ''}`}></div>
          <div className='flex w-full h-full justify-center items-center'>
            <span className={`absolute  font-KIMM_Bold  ${top10Click === 2 ? 'text-orange-300 text-4xl':'text-white  text-3xl'}`}>TOP</span>
          </div>
          </>
  
        </div>
        <div onClick={() => handleTop10Click(3)} className={`relative w-1/2 h-1/3 bg-black cursor-pointer ${top10Click === 3 ? 'rounded-3xl border-2 border-white z-10' : ''}`} style={{ backgroundImage: `url('/img/PANTS.jpg')`, backgroundSize: 'cover', transform: `${top10Click === 3 ? 'scale(105%)' : 'scale(100%)'}` }} onMouseEnter={() => hoverAnimation(3)} onMouseLeave={() => hoverAnimation(0)}>

          <>
            <div className={`absolute w-full h-full bg-black opacity-30 ${top10Click === 3 ? 'rounded-3xl': ''}`}></div>
          <div className='flex w-full h-full justify-center items-center'>
            <span className={`absolute  font-KIMM_Bold ${top10Click === 3 ? 'text-orange-300 text-4xl':'text-white  text-3xl'}`}>PANTS</span>
          </div>
          </>

        </div>
        <div onClick={() => handleTop10Click(5)} className={`relative w-1/2 h-1/3 bg-black cursor-pointer ${top10Click === 5 ? 'rounded-3xl border-2 border-white z-10' : ''}`} style={{ backgroundImage: `url('/img/INNER.jpg')`, backgroundSize: 'cover' ,transform: `${top10Click === 5 ? 'scale(105%)' : 'scale(100%)'}` }} onMouseEnter={() => hoverAnimation(5)} onMouseLeave={() => hoverAnimation(0)}>
 
          <>
            <div className={`absolute w-full h-full bg-black opacity-30  ${top10Click === 5 ? 'rounded-3xl': ''}`}></div>
          <div className='flex w-full h-full justify-center items-center'>
            <span className={`absolute  font-KIMM_Bold ${top10Click === 5 ? 'text-orange-300 text-4xl':'text-white  text-3xl'}`}>INNERWARE</span>
          </div>
          </>

        </div>
        <div onClick={() => handleTop10Click(6)} className={`relative w-1/2 h-1/3 bg-black cursor-pointer rounded-r-3xl ${top10Click === 6 ? 'rounded-3xl border-2 border-white z-10' : ''}`} style={{ backgroundImage: `url('/img/SET.jpg')`, backgroundSize: 'cover', transform: `${top10Click === 6 ? 'scale(105%)' : 'scale(100%)'}` }} onMouseEnter={() => hoverAnimation(6)} onMouseLeave={() => hoverAnimation(0)}>

          <>
            <div className={`absolute w-full h-full bg-black opacity-30 rounded-r-3xl  ${top10Click === 6 ? 'rounded-3xl': ''}`}></div>
          <div className='flex w-full h-full justify-center items-center'>
            <span className={`absolute font-KIMM_Bold ${top10Click === 6 ? 'text-orange-300 text-4xl':'text-white  text-3xl'}`}>SET</span>
          </div>
          </>
=
        </div>
      </div>
      <div className={`${top10Image.length === 0 | top10Click === 0 ? 'hidden' : 'block'} flex-col items-center px-5 gap-5 absolute h-2/5 bottom-14 bg-orange-100 rounded-xl w-full`}
>
        <div className='w-full font-KIMM_Bold text-2xl my-3 text-center'>고객님들이 가장 많이 선택해주신 상품</div>
        <div className='flex gap-5'
                                      ref={ref}
                                      onMouseDown={handleMouseDown}
                                      onMouseMove={handleMouseMove}
                                      onMouseUp={handleMouseUp}
                                      onMouseEnter={handleMouseEnter}
                                      style={{overflowX: 'hidden', minWidth: `${containerWidth}px`, scrollbarWidth:'thin'}}> 
        {top10Image.map((item, index) => (
            <div key={index} onMouseEnter={() => setTop10Hover(index)} onMouseLeave={() => setTop10Hover(null)}>
              
              <div className='relative' style={{width: '400px' ,height:'300px'}}>
                <div className={`${isTop10Hover === index ? 'block' : 'hidden'} absolute w-full h-full bg-black opacity-60 rounded-2xl cursor-pointer `}></div>
                <div className={`${isTop10Hover === index ? 'block' : 'hidden'} absolute text-white font-KIMM_Bold text-xl w-full flex flex-col justify-center h-full gap-8 pl-14 cursor-pointer`}>
                  <div className='w-full flex gap-36'>
                    <div className='w-auto'>이름</div>
                    <div>{item.prodName}</div>
                  </div>
                  <div className='w-full flex gap-36'>
                    <div>가격</div>
                    <div>{item.prodPrice}</div>
                  </div>
                </div>
                <img className='h-full w-full cursor-pointer rounded-2xl' src={item.imageUrl} alt='하의 이미지' />
              </div>
            </div>
          ))}
          </div>
      </div>
    </div>
  )
}

export default Top10
