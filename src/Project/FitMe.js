import React, { useEffect, useRef, useState } from 'react';
import { useSpring, animated } from 'react-spring';
import styles from './FitMe.module.css'
import { BsArrowClockwise } from "react-icons/bs";
import { FiChevronsLeft } from "react-icons/fi";
import { FiChevronsRight } from "react-icons/fi";
import ItemSelectModal from './ItemSelectModal';
const FitMe = ({screenId, isModalOpen, setModalOpen, isClick, setIsClick, userDatas}) => {
    // const [isClick, setIsClick] = useState(false);
    const [containerWidth, setContainerWidth] = useState(0);
    const [clientLeft, setClientLeft] = useState(0);   
    let prodCodeArr = []
    let prodImgUrlArr = []
    const previousXRef = useRef(0);
    const [products, setProducts] = useState([]);
    const [isHover, setIsHover] = useState(false);
    const [isImgClick, setIsImgClick] = useState(false);
    const [clickedItem, setClickedItem] = useState({});
    const [selectedImageIndex, setSelectedImageIndex] = useState(null);
    const [isItemSelectModal, setItemSelectModal] = useState(false)
    const [latestDatas, setLatestDatas] = useState([])
    useEffect(()=>{
      console.log(products, 'fitme')
    },[products])
    const getStyleValue = (styleCode) => {
      switch (styleCode) {
        case 1:
          return '레트로(RETRO)';
        case 2:
          return '로맨틱(ROMANTIC)';
        // Add cases for styles 3 to 23 as needed
        case 3:
          return '리조트(RESORT)';
        case 4:
          return '매니시(MANISH)';
        case 5:
          return '모던(MODERN)';
        case 6:
          return '밀리터리(MILITARY)';
        case 7:
          return '섹시(SEXY)';
        case 8:
          return '소피스트케이티드(SOPHISTCATED)';
        case 9:
          return '스트리트(STREET)';
        case 10:
          return '스포티(SPORTY)';
        case 11:
          return '아방가르드(AVANGARD)';
        case 12:
          return '오리엔탈(ORIENTAL)';
        case 13:
          return '웨스턴(WESTERN)';
        case 14:
          return '젠더리스(GENDERLESS)';
        case 15:
          return '컨트리(COUNTRY)';
        case 16: 
          return '클래식(CLASSIC)';
        case 17:
          return '키치(KITCH)';
        case 18: 
          return '톰보이(TOMBOY)';
        case 19:
          return '펑크(PUNK)';
        case 20:
          return '페미닌(FEMININ)';
        case 21:
          return '프레피(PREPPY)';
        case 22:
          return '히피(HIPPIE)';          
        case 23:
          return '힙합(HIPHOP)';
        case 24:
          return '없음(EMPTY)';
        default:
          return 'Default value for unknown style';
      }
    };
    const handleMouseEnterArrow = () => {
      setIsHover(true)
    }
    const handleMouseLeaveArrow = () => {
      setIsHover(false)
    }
    const handleLeftClick = () => {
      div.scrollLeft = 0
    }
    const handleRightClick = () => {
      // div가 존재하고, 스크롤 가능한 너비가 현재 스크롤 위치보다 큰 경우에만 스크롤합니다.
      if (div && div.scrollWidth > div.clientWidth) {
        // 스크롤 가능한 전체 너비에서 현재의 스크롤 위치와 보이는 영역의 너비를 뺀 값을 계산합니다.
        const scrollEndPosition = div.scrollWidth - div.clientWidth;
        
        // div의 스크롤 위치를 계산한 값으로 이동시킵니다.
        div.scrollLeft = scrollEndPosition;
      }
    };
    // useEffect(()=>{
    //   setProducts(JSON.parse(localStorage.getItem('storedData')))
    // },[localStorage.getItem('storedData')])
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
    


      const handleFYSClick = async () => {
        if (localStorage.getItem('jwtToken')) {
          if (userDatas.prodInfo.length === 0) {
            try {
              const storedImgUrls = localStorage.getItem('imgUrls');
        
              if (storedImgUrls) {
                setProducts(JSON.parse(storedImgUrls));
                setIsClick(true)
              } else {
                const response = await fetch('http://10.125.121.220:8080/recommend', {
                  method: 'GET',
                  headers: {
                    'Content-Type': 'application/json',
                    'Authorization': localStorage.getItem('jwtToken'),
                  },
                });
        
                if (response.ok) {
                  const data = await response.json();
                  console.log(data, 'data')
                  setProducts(data);
                  localStorage.setItem('imgUrls', JSON.stringify(data));
                  setIsClick(true);
                } else {
                  console.log('실패');
                }
              }
            } catch (error) {
              console.error('오류', error);
            }
          } 
          else {
            const storedData = localStorage.getItem('storedData')
            if(storedData) {
              console.log(storedData, 'fitme')
              setProducts(JSON.parse(storedData));
              setIsClick(true)
            }
            else {
              try {
                const response = await fetch('http://10.125.121.220:8080/latest', {
                  method:'GET',
                  headers: {
                    'Content-Type' : 'application/json',
                    'Authorization' : localStorage.getItem('jwtToken')
                  }
                })
                if (response.ok) {
                  const data = await response.json();
                  console.log(data, 'data')
                  setLatestDatas(data)
                  setItemSelectModal(true)
                  // setIsClick(true)
                }
              } catch (error) {
                console.error('오류',error)
              }   
            }
                  
          }
        } else {
          setModalOpen(true);
        }
      };
      
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
                    div.scrollLeft -= (delta/5);
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

    // useEffect(() => {
    //     if (ref.current) {
    //       setContainerWidth(ref.current.clientWidth);
    //     }
    //   }, [images]);

    
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

    const handleReClick = async () => {
      div.scrollLeft = 0
      if (userDatas.prodInfo.length === 0) {
        try {
          const response = await fetch('http://10.125.121.220:8080/recommend' , {
            method: 'GET',
            headers: {
              'Content-Type' : 'application/json',
              'Authorization' : localStorage.getItem('jwtToken')
            }
          })
          
          if (response.ok) {
            const data = await response.json()
            setProducts(data)   
          }
        } catch (error) {
          console.error('오류', error)
        }
  
        setIsImgClick(false)
      }
      else {
        try {
          const response = await fetch('http://10.125.121.220:8080/latest', {
          method: 'GET',
          headers: {
            'Content-Type' : 'application/json',
            'Authorization' : localStorage.getItem('jwtToken')
          }
          })
          if (response.ok) {
            const data = await response.json()
            setLatestDatas(data)
            setItemSelectModal(true)
          }
        } catch (error) {
          console.error('오류', error)
        }
      }
    }

    const handleImgClick = (item, index) => {
      setIsImgClick(true);
      setClickedItem(item)
      setSelectedImageIndex(index);
      if (selectedImageIndex == index) {
        setSelectedImageIndex(null)
        setIsImgClick(false)
      }
    }

    useEffect(()=>{
      setIsImgClick(false);
      setSelectedImageIndex(null);
      if(isClick) {
        div.scrollLeft = div.scrollTop
      }

    },[isClick])

    const handleWheel = (e) => {
      if (e.cancelable)
        e.preventDefault();

      div.scrollLeft += (e.deltaY + e.deltaX);
    }
    
    const itemSelectModalClose = () => {
      setItemSelectModal(false);
    }

    return (
      <>
        <ItemSelectModal isOpen={isItemSelectModal} onClose={itemSelectModalClose} userDatas={latestDatas} setFitMeProducts={setProducts} setIsClick={setIsClick}/>
        <div className='overflow-x-auto'>
            <animated.div 
            className={`${styles.animatedDiv} cursor-pointer flex justify-center items-center bg-orange-300 absolute left-1/2 transform -translate-x-1/2 -translate-y-1/2 mx-auto shadow-lg rounded-full`} 
            style={{...FitMeAnimation, ...ClickAnimation, pointerEvents: isClick ? 'none' : 'auto' , top:'37%'}} 
            onClick={handleFYSClick}>
                <span className={`font-KIMM_Bold text-2xl text-white ${styles.spinSpan}`}>Find Your Style</span>
            </animated.div>
            <animated.div
            className='absolute bg-orange-100  rounded-2xl p-5 items-center w-full'
            style={{...SecondDivAnimation, display: isClick ? '' : 'none', top: '28%', height: '21%', overflowX: 'auto',overflowY: 'hidden', minWidth: `${containerWidth}px`, scrollbarWidth:'thin'}}
            onMouseEnter={handleMouseEnterArrow}
            onMouseLeave={handleMouseLeaveArrow}>
                <div className='w-full px-3 text-left font-KIMM_Bold text-2xl flex gap-3 items-center'>고객님을 위한 추천 스타일<BsArrowClockwise  className='text-3xl border-2 border-black text-white bg-black cursor-pointer rounded-lg hover:bg-orange-500 hover:border-orange-500'  onClick={handleReClick}/></div>
               {isHover ?
                <> 
                  <div className='absolute h-10 text-8xl text-gray-200 top-1/4 transform left-10 -translate-x-1/4 -translate-y-3/4 z-10 cursor-pointer' onClick={handleLeftClick}><FiChevronsLeft className={`${styles.arrowLeft}`} /></div>
                  <div className='absolute h-10 text-8xl text-gray-200 top-1/4 right-1 transform -translate-x-1/4 -translate-y-3/4 z-10 cursor-pointer'onClick={handleRightClick}><FiChevronsRight className={`${styles.arrowRight}`}/></div>
                </>
                : ''}
                <div className='flex gap-1' style={{overflowX : 'hidden',}}
                            ref={ref}
                            onMouseDown={handleMouseDown}
                            onMouseMove={handleMouseMove}
                            onMouseUp={handleMouseUp}
                            onMouseEnter={handleMouseEnter}
                            onWheel={handleWheel}>                            
                  {products.map((item, index) => (
                  <div key={index}>
                    <div   className={`py-3 px-3`} style={{width: '400px' ,height:'350px'}}>
                      <img className={`hover:opacity-90 h-full w-full cursor-pointer rounded-3xl  ${selectedImageIndex === index ? 'border-8 border-orange-300'  : ''}`} 
                            src={item.imageUrl} 
                            alt='하의 이미지' 
                            onClick={() => handleImgClick(item, index)}
                            style={{boxShadow : `${selectedImageIndex === index ? '' : ''}`}}/>
                    </div>
                  </div>
                ))}
                </div>
                <div className='bg-black w-auto h-1/2 rounded-3xl text-white mt-1 mx-3'>
                  { isImgClick && 
                    <div className=' flex items-center justify-around h-full font-KIMM_Bold text-3xl'>
                      <div className='flex flex-col justify-around items-center h-full w-1/3'>
                          <div className='h-1/2 flex items-center'><span className='border-b-2'>상품명</span></div>
                          <div className='h-1/2 text-orange-300'>{clickedItem.prodName}</div>
                      </div>
                      <div className='flex flex-col justify-around items-center h-full w-1/3'>
                          <div className='h-1/2 flex items-center'><span className='border-b-2'>가격</span></div>
                          <div className='h-1/2 text-orange-300'>{clickedItem.prodPrice}</div>
                      </div>
                      <div className='flex flex-col justify-around items-center h-full w-1/3'>
                          <div className='h-1/2 flex items-center'><span className='border-b-2'>스타일</span></div>
                          <div className='h-1/2 text-orange-300'>{getStyleValue(clickedItem.styleCode)}</div>
                      </div>
                    </div>
                  }
                </div>
            </animated.div>
            
        </div>
      </>
    );
}

export default FitMe;
