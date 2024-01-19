import { click } from '@testing-library/user-event/dist/click';
import React, { useEffect, useRef, useState } from 'react'
import { useSpring, animated } from 'react-spring';
import LoadingModal from './LoadingModal';
const ItemSelectModal = ({isOpen, onClose, userDatas, setFitMeProducts, setIsClick}) => {
  const ref = useRef();
  const [products, setProducts] = useState([]);
  const [selectedItems, setSelectedItems] = useState([]);
  const [clickedItem, setClickedItem] = useState([]);
  const [isLoadingModalOpen, setLoadingModalOpen] = useState(false);
  const [isAlert, setIsAlert] = useState(false);
  useEffect(() => {
    setProducts(userDatas)
    console.log(products, 'products')
  }, [userDatas])
  useEffect(() => {
    // 모달이 열릴 때마다 scrollTop을 0으로 설정
    if (isOpen) {
      ref.current.scrollTop = 0;
    }
  }, [isOpen]);
  const handleSelectWheel = (e) => {
    if(e.cancelable)
      e.preventDefault()

    ref.current.scrollTop += (e.deltaY)
    
  }
  useEffect(() => {
    setIsAlert(false)
  },[selectedItems])
  const handleSelectClick = (product, index) => {
    if (!clickedItem.includes(index)) {
      setSelectedItems((prevArray) => [...prevArray, product]);
      setClickedItem((prevClicked) => [...prevClicked, index]);
    } else {
      // 다시 클릭 시 배열에서 요소 삭제
      setSelectedItems((prevArray) => prevArray.filter((item) => item !== product));
      setClickedItem((prevClicked) => prevClicked.filter((clickedIndex) => clickedIndex !== index));
    }

  }
  const handleConfirmClick = async () => {
    if (selectedItems.length === 0) {
      setIsAlert(true)
      return
    }
    setLoadingModalOpen(true)
    console.log(selectedItems, 'fetch')
    setTimeout(async () => {
      try {
          const response = await fetch('http://10.125.121.220:8080/getlist', {
              method: 'POST',
              headers: {
                  'Content-Type': 'application/json'
              },
              body: JSON.stringify({selectList: selectedItems})
          });

          if (response.ok) {
              const data = await response.json();
              console.log(data, 'data')
              localStorage.setItem("storedData", JSON.stringify(data))
              setFitMeProducts(data)
              setIsClick(true)
              onClose()
          } else {
              console.error('서버 응답 오류', response.status);
          }
      } catch (error) {
          console.error('오류', error);
      }
      // 원하는 작업이 완료되면 로딩 상태를 다시 닫기
      setLoadingModalOpen(false);
  }, 4000);
  }
  const closeLoadingModal = () => {
    setLoadingModalOpen(false)
  } 
  useEffect(() => {
    console.log(selectedItems)
  }, [clickedItem])
  useEffect(() => {
    setClickedItem([])
    setSelectedItems([])
  }, [onClose])
    const modalAnimation = useSpring({
        opacity: isOpen ? 1 : 0,
        transform: `translateY(${isOpen ? 0 : 60}%)`,
        config: {
          duration: 300, // 애니메이션 지속 시간 (ms)
        },
        reverse: !isOpen, // isModalOpen이 false가 되면 애니메이션을 초기화
      });
  return (
    <>
    <LoadingModal isOpen={isLoadingModalOpen} onClose={closeLoadingModal} setIsAlert={setIsAlert}/>
    <div className={`modal ${isOpen ? 'block' : 'hidden'} absolute inset-0 h-full w-full bg-transparent z-30`}>
      <animated.div
        style={{ ...modalAnimation, top: '28%', height: '20%' }}
        className={`modal-content absolute w-1/2 left-1/4 top-0 transform -translate-x-1/2 -translate-y-1/2 bg-black rounded-3xl border-2 border-white`}>
        {isLoadingModalOpen && <div className='w-full h-full absolute bg-black rounded-3xl opacity-70'></div>}
        <div className='w-full' style={{height:'88%'}}>
          <div className='flex items-center  px-5 my-3 '>
            <div className='w-1/2 font-KIMM_Bold text-2xl text-white'>내 구매 목록<span className='text-sm ml-4'> 선택한 상품과 유사한 상품을 추천해드립니다</span></div>
            <div className='w-1/2 flex justify-end font-KIMM_Bold gap-1 items-end'>
                  <div className={`text-red-400 text-sm  ${isAlert ? 'block':'hidden'}`}>하나 이상의 상품을 선택해주세요.</div>
                  <div className='bg-green-400  px-2 py-1 hover:bg-black hover:text-white cursor-pointer rounded-lg' onClick={handleConfirmClick}>Confirm</div>
                  <div className='bg-white px-2 py-1 hover:bg-black hover:text-white cursor-pointer rounded-lg' onClick={onClose}>Close</div>
            </div>
          </div>
          <div className='grid grid-cols-3 gap-4 w-full h-full overflow-hidden px-5' ref={ref} onWheel={handleSelectWheel}>
            
            {products && products.map((product, index) => (
              <div key={product.seq} className='w-full font-KIMM_Bold'>
                <div className='w-full h-48 cursor-pointer' 
                      style={{backgroundImage: `url(${product.imageUrl})`, backgroundSize: 'cover', border : `${clickedItem.includes(index) ? '4px solid rgb(253, 186, 116)' : ''}`}} 
                      onClick={() => handleSelectClick(product.prodCode, index)}></div>
                <div className='flex justify-between mt-1'>
                  <div className='text-white text-xs'>이름</div>
                  <div className='text-orange-300 text-xs'>{product.prodName}</div>
                </div>
                <div className='flex justify-between'>
                  <div className='text-white text-xs'>가격</div>
                  <div className='text-orange-300 text-xs'>{product.prodPrice}</div>
                </div>
            </div>
            ))}  
          </div>
        </div>
      </animated.div>
    </div>
    </>
  )
}

export default ItemSelectModal
