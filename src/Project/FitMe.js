import React, { useEffect, useRef, useState } from 'react';
import { useSpring, animated } from 'react-spring';
import styles from './FitMe.module.css'
const FitMe = ({screenId, isModalOpen, setModalOpen, isClick, setIsClick}) => {
    // const [isClick, setIsClick] = useState(false);
    const [containerWidth, setContainerWidth] = useState(0);
    const [clientLeft, setClientLeft] = useState(0);    
    const previousXRef = useRef(0);
    const images = [
        { id: '1', src1: 'img/9oz/AJA3CA001.jpg', src2: 'img/9oz/AJA3BL001.jpg' },
        { id: '2', src1: 'img/9oz/AJA3CT001.jpg', src2: 'img/9oz/AJA3BL002.jpg' },
        { id: '3', src1: 'img/9oz/AJA3JK001.jpg', src2: 'img/9oz/AJA3JK002.jpg' },
        { id: '13', src1: 'img/9oz/AJA3JK003.jpg', src2: 'img/9oz/AJA3JP001.jpg' },
        { id: '23', src1: 'img/9oz/AJA3JP002.jpg', src2: 'img/9oz/AJA3JP003.jpg' },
        { id: '33', src1: 'img/9oz/AJA3JP004.jpg', src2: 'img/9oz/AJA3JP005.jpg' },
        { id: '43', src1: 'img/9oz/AJA3JP006.jpg', src2: 'img/9oz/AJA3JP007.jpg' },
        { id: '53', src1: 'img/9oz/AJA3JP008.jpg', src2: 'img/9oz/AJA3JP009.jpg' },
        { id: '63', src1: 'img/9oz/AJA3KT001.jpg', src2: 'img/9oz/AJA3KT002.jpg' },
        { id: '73', src1: 'img/9oz/AJA3PT008.jpg', src2: 'img/9oz/AJA3PT009.jpg' },
        { id: '83', src1: 'img/9oz/AJA3SK001.jpg', src2: 'img/9oz/AJA3TS001.jpg' },
        { id: '93', src1: 'img/9oz/AJA3TS002.jpg', src2: 'img/9oz/AJA3TS003.jpg' },
        { id: '123', src1: 'img/9oz/AJA3TS005.jpg', src2: 'img/9oz/AJA3TS006.jpg' },
        { id: '113', src1: 'img/9oz/AJA3TS007.jpg', src2: 'img/9oz/AJA3TS008.jpg' },
        { id: '133', src1: 'img/9oz/AJA3TS009.jpg', src2: 'img/9oz/AJA3TS010.jpg' },
        { id: '143', src1: 'img/9oz/AJA3VT001.jpg', src2: 'img/9oz/AJA3VT003.jpg' },
        // ... 추가 이미지 정보
      ];
      console.log(isClick,'isClick')
    const FitMeAnimation = useSpring({
        opacity: screenId === 2 ? 1 : 0,
        transform: `translate(${screenId === 2 ? -50 : -50}%, ${screenId === 2 ? -50 : 0}%)`, // X와 Y 모두에 대한 변환 설정,
        config: {
        duration: 700, // 애니메이션 지속 시간 (ms)
        }, 
        loop: screenId === 2,
    });

    const ClickAnimation = useSpring({
        opacity: isClick ? 0 : 1,
        config: {
            duration: 700
        },
        
    })
    const SecondDivAnimation = useSpring({
        opacity: isClick ? 1 : 0,

        config: {
          duration: 700,
        },
      });
    const handleFYSClick = (e) => {
        if (localStorage.getItem('jwtToken')) {
          setIsClick(true)
        }
        else {
          setModalOpen(true)
        }
    }
    // useEffect(() => {
    //   if (isClick) {
    //     setIsClick(false)
    //   }
    //   else {
    //     setIsClick(true)
    //   }
    // }, [localStorage.getItem('jwtToken')])
    const ref = useRef();
    const [isDragging, setIsDragging] = useState(false);
    const [previousX, setPreviousX] = useState(0);
    const div = ref.current;
    const refId = useRef(null);

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

    useEffect(() => {
        if (ref.current) {
          setContainerWidth(ref.current.clientWidth);
        }
      }, [images]);

    
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
    return (
        <div className='overflow-x-auto'>
            <animated.div 
            className={`${styles.animatedDiv} cursor-pointer flex justify-center items-center bg-orange-300 absolute left-1/2 top-1/2 transform -translate-x-1/2 -translate-y-1/2 mx-auto shadow-lg rounded-full`} 
            style={{...FitMeAnimation, ...ClickAnimation, pointerEvents: isClick ? 'none' : 'auto' }} 
            onClick={handleFYSClick}>
                <span className={`font-KIMM_Bold text-2xl text-white`}>Find Your Style</span>
            </animated.div>
            <animated.div

            className='absolute bg-black border-2  rounded-2xl flex p-5 items-center w-full'
            style={{...SecondDivAnimation, display: isClick ? '' : 'none', top: '38%', height: '25%', overflowX: 'auto',minWidth: `${containerWidth}px`, scrollbarWidth:'thin'}}>
                <div className='flex' style={{overflowX : 'hidden',}}
                            ref={ref}
                            onMouseDown={handleMouseDown}
                            onMouseMove={handleMouseMove}
                            onMouseUp={handleMouseUp}
                            onMouseEnter={handleMouseEnter}>                            
                {images.map((image) => (
            <div key={image.id}>
              <div className='p-3' style={{width: '300px' ,height:'300px'}}>
                <img className='hover:opacity-30 h-full w-full cursor-pointer' src={image.src1} alt='하의 이미지' />
              </div>
              <div className='p-3 ' style={{width: '300px',height:'300px'}}>
                <img className='hover:opacity-30 h-full w-full cursor-pointer'  src={image.src2} alt='상의 이미지' />
              </div>
            </div>
          ))}

                </div>
            </animated.div>
        </div>
    );
}

export default FitMe;
