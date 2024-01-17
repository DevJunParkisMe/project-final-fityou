import React, { useEffect, useState } from 'react'
import { useSpring, animated } from 'react-spring';
import styles from './Modal.module.css'
const SurveyModal = ({isOpen, onOpen, onClose, screenId, isLogin, signUpSeq}) => {
  
  const itemsPerPage = 8; // 한 번에 보여지는 아이템 수
  const totalItems = 24;
  const [hoverStates, setHoverStates] = useState(Array(24).fill(false)); // 8개의 요소에 대한 hover 상태 배열 초기화
  const totalPages = Math.ceil(totalItems / itemsPerPage);
  const [startIndex, setStartIndex] = useState(0);
  const [elementArray, setElementArray] = useState([]);
  const [clickedElements, setClickedElements] = useState([]);
// 초기 topValue 설정
  let topValue = '3%';
  // screenId가 2인 경우 38%로 설정
  if (screenId === 2) {
    topValue = '23%';
  }
  // screenId가 3인 경우 80%로 설정
  else if (screenId === 3) {
    topValue = '53%';
  }
  else if (screenId === 4) {
    topValue = '78%';
  }
  const modalAnimation = useSpring({
    opacity: isOpen ? 1 : 0,
    transform: `translateY(${isOpen ? 0 : 60}%)`,
    config: {
      duration: 300, // 애니메이션 지속 시간 (ms)
    },
    reverse: !isOpen, // isModalOpen이 false가 되면 애니메이션을 초기화
  });

  const fetchMemberLike = async () => {
    try {
      const response = await fetch(`http://10.125.121.220:8080/memlike`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({like: elementArray, seq: signUpSeq})
      })  
      if (response.ok) {
        console.log("like 등록 성공")
        console.log(response, 'like confirm data')
        setElementArray([])
        setClickedElements([])
        onClose()
      }
      else {
        console.log("등록 실패")
      }
    } catch (error) {
      console.error("오류", error)
    }
  }

  const handleMouseEnter = (index) => {
    setHoverStates((prevStates) => prevStates.map((state, i) => (i === index ? true : state)));
  };

  const handleMouseLeave = (index) => {
    setHoverStates((prevStates) => prevStates.map((state, i) => (i === index ? false : state)));
  };


  const handleNextBtn = () => {
    setStartIndex((prevIndex) => Math.min(prevIndex + itemsPerPage, totalItems - itemsPerPage));
  };

  const handlePrevBtn = () => {
    setStartIndex((prevIndex) => Math.max(prevIndex - itemsPerPage, 0));
  };
  const handleElementClick = (index) => {
    const element = document.querySelector(`span.element-${index}`);
    if (element) {
      // 중복된 요소가 없는 경우에만 추가
      if (!clickedElements.includes(index)) {
        setElementArray((prevArray) => [...prevArray, element.textContent]);
        setClickedElements((prevClicked) => [...prevClicked, index]);
      } else {
        // 다시 클릭 시 배열에서 요소 삭제
        setElementArray((prevArray) => prevArray.filter((item) => item !== element.textContent));
        setClickedElements((prevClicked) => prevClicked.filter((clickedIndex) => clickedIndex !== index));
      }
    }
  };
  useEffect(()=> {
    console.log(elementArray)
  }, [elementArray])
  return (
    <div className={`modal ${isOpen ? 'block' : 'hidden'} absolute inset-0 h-full w-full bg-transparent z-50`}>
        <animated.div  
        style={{ ...modalAnimation, top: topValue, left: '17%'}}
        className={`modal-content absolute w-2/3 h-1/4  top-0 transform -translate-x-1/2 -translate-y-1/2 bg-black rounded-3xl`}>
            <span className="close text-3xl absolute top-2 right-4 cursor-pointer text-white z-40" onClick={onClose}>
                &times;
            </span>
            <div className='grid grid-rows-2 grid-cols-4 w-full bg-white opacity-70 rounded-t-3xl' style={{height: "70%"}}>
            {[...Array(itemsPerPage)].map((_, index) => {
            const realIndex = startIndex + index;
            return (
              <div
                key={index}
                className={`w-full h-full relative ${clickedElements.includes(realIndex) ? styles.animatedClick : styles.animatedClickReverse}`}
                onMouseEnter={() => handleMouseEnter(realIndex)}
                onMouseLeave={() => handleMouseLeave(realIndex)}
                onClick={() => handleElementClick(realIndex)}
              >
                {realIndex < totalItems && (
                <>
                <div className={`${hoverStates[realIndex] ? 'block' : 'hidden'}`}>
                  <div className={`absolute bg-black opacity-30 w-full cursor-pointer h-full ${index === 0 ? 'rounded-tl-3xl' : (index === 3 ? 'rounded-tr-3xl' : '')}`}></div>
                  <span
                    className={`text-pink-300 text-3xl font-KIMM_Bold opacity-100 absolute cursor-pointer element-${realIndex}`}
                    style={{ top: '50%', left: '50%', transform: 'translate(-50%, -50%)' }}
                  >
                    {realIndex === 0 && 'RETRO'}
                    {realIndex === 1 && 'ROMANTIC'}
                    {realIndex === 2 && 'RESORT'}
                    {realIndex === 3 && 'MANISH'}
                    {realIndex === 4 && 'MODERN'}
                    {realIndex === 5 && 'MILITARY'}
                    {realIndex === 6 && 'SEXY'}
                    {realIndex === 7 && 'SOPHISTICATED'}
                    {realIndex === 8 && 'STREET'}
                    {realIndex === 9 && 'SPORTY'}
                    {realIndex === 10 && 'AVANGARD'}
                    {realIndex === 11 && 'ORIENTAL'}
                    {realIndex === 12 && 'WESTERN'}
                    {realIndex === 13 && 'GENDERLESS'}
                    {realIndex === 14 && 'COUNTRY'}
                    {realIndex === 15 && 'CLASSIC'}
                    {realIndex === 16 && 'KITCH'}
                    {realIndex === 17 && 'TOMBOY'}
                    {realIndex === 18 && 'PUNK'}
                    {realIndex === 19 && 'FEMININ'}
                    {realIndex === 20 && 'FREPPY'}
                    {realIndex === 21 && 'HIPPY'}
                    {realIndex === 22 && 'HIPHOP'}
                    {realIndex === 23 && 'EMPTY'}
                  </span>
                </div>
                <div className={`bg-white w-full h-full rounded-tl-3xl rounded-tr-3xl cursor-pointer`}>
                  <img className={`w-full h-full ${index === 0 ? 'rounded-tl-3xl' : (index === 3 ? 'rounded-tr-3xl' : '')}`} 
                      src={`img/Survey/${realIndex === 0 
                      ? 'RETRO' : realIndex === 1 
                      ? 'ROMANTIC' : realIndex === 2 
                      ? 'RESORT' : realIndex === 3 
                      ? 'MANISH' : realIndex === 4 
                      ? 'MODERN' : realIndex === 5 
                      ? 'MILITARY' : realIndex === 6 
                      ? 'SEXY' : realIndex === 7 
                      ? 'SOPHISTICATED' : realIndex === 8 
                      ? 'STREET' : realIndex === 9 
                      ? 'SPORTY' : realIndex === 10 
                      ? 'AVANGARD' : realIndex === 11 
                      ? 'ORIENTAL' : realIndex === 12 
                      ? 'WESTERN' : realIndex === 13 
                      ? 'GENDERLESS' : realIndex === 14 
                      ? 'COUNTRY' : realIndex === 15 
                      ? 'CLASSIC' : realIndex === 16 
                      ? 'KITCH' : realIndex === 17 
                      ? 'TOMBOY' : realIndex === 18 
                      ? 'PUNK' : realIndex === 19 
                      ? 'FEMININ' : realIndex === 20 
                      ? 'FREPPY' : realIndex === 21 
                      ? 'HIPPY' : realIndex === 22 
                      ? 'HIPHOP' : 'EMPTY'}.jpg`} alt={`style-${realIndex}`} />
                </div>
                </>
                  )}
              </div>
            );
          })}
            </div>
            <div className='w-full flex bg-black rounded-b-3xl' style={{height: '10%'}}>
                <h1 className='flex-1 font-KIMM_Bold flex items-center justify-center text-2xl text-white'>Choose Your Style !</h1>
                <div className='flex-1 h-full flex px-5 items-center'>
                    <div className='w-full h-2/3 mr-5 bg-lime-700 flex items-center justify-center text-white font-KIMM_Bold cursor-pointer rounded-xl hover:bg-black' onClick={handlePrevBtn}><span>Prev</span></div>
                    <div className='w-full h-2/3 mr-5 bg-slate-600 flex items-center justify-center text-white font-KIMM_Bold cursor-pointer rounded-xl hover:bg-black' onClick={handleNextBtn}><span>Next</span></div>
                    <div className='w-full h-2/3 bg-rose-900 flex items-center justify-center text-white font-KIMM_Bold cursor-pointer rounded-xl hover:bg-black' onClick={fetchMemberLike}><span>Confirm</span></div>
                </div>
            </div>
        </animated.div>
    </div>
  )
}

export default SurveyModal
