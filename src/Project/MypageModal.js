import React, { useEffect, useState } from 'react'
import { useSpring, animated } from 'react-spring';
import DeleteModal from './DeleteModal';
import styles from './Modal.module.css';
const MypageModal = ({isOpen, onClose, logout, userDatas, screenId}) => {
  const [isDeleteModalOpen, setDeleteModalOpen] = useState(false);
  const [pageNum, setPageNum] = useState(1);
  const [products, setProducts] = useState([]);
  const [modClick, setModClick] = useState(false);
  // const products = userDatas.prodInfo
  // 초기 topValue 설정
  let topValue = '3%';
  // screenId가 2인 경우 38%로 설정
  if (screenId === 2) {
    topValue = '28%';
  }
  // screenId가 3인 경우 80%로 설정
  else if (screenId === 3) {
    topValue = '53%';
  }
  else if (screenId === 4) {
    topValue = '78%';
  }
  useEffect(() => {
    setProducts(userDatas.prodInfo)
  }, [userDatas.prodInfo])

  const itemsPerPage = 3;
  const pagesPerSet = 10; // Number of pages to display in each set
  const [currentPage, setCurrentPage] = useState(1);

  // Calculate the total number of pages and sets
  const totalPages = products !== undefined ? Math.ceil(products.length / itemsPerPage) : 0;
  const totalSets = Math.ceil(totalPages / pagesPerSet);

  // Calculate the current set of pages
  const currentSet = Math.ceil(currentPage / pagesPerSet);

  // Calculate the start and end page numbers for the current set
  const startPage = (currentSet - 1) * pagesPerSet + 1;
  const endPage = Math.min(startPage + pagesPerSet - 1, totalPages);

  // Get the products for the current page
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = products !== undefined ? Math.min(startIndex + itemsPerPage, products.length) : 0;
  const currentProducts = products !== undefined ? products.slice(startIndex, endIndex) : [];



  const handlePageChange = (pageNumber) => {
    console.log(pageNumber, 'pageNumber')
    setPageNum(pageNumber)
    setCurrentPage(Math.max(1, Math.min(pageNumber, totalPages)));
  };

  const handleNextSet = () => {
    const nextPageSetStart = startPage + pagesPerSet;
  setCurrentPage(Math.min(nextPageSetStart, totalPages));
  setPageNum(Math.min(nextPageSetStart, totalPages));
  };

  const handlePrevSet = () => {
    setCurrentPage(Math.max(startPage - 1, 1));
    setPageNum(Math.max(startPage - 1, 1))
  };
  const deleteModalOpen = () => {
    setDeleteModalOpen(true)
  }
  const deleteModalClose = () => {
    setDeleteModalOpen(false)
    
  }

  const handleModClick = () => {
    setModClick(true);
  }

  useEffect(() => {
    setPageNum(1)
    setCurrentPage(1)
    setModClick(false)
  }, [onClose])
    const modalAnimation = useSpring({
        opacity: isOpen ? 1 : 0,
        transform: `translateY(${isOpen ? 0 : 60}%)`,
        config: {
          duration: 300, // 애니메이션 지속 시간 (ms)
        },
        reverse: !isOpen, // isModalOpen이 false가 되면 애니메이션을 초기화
      });
    
    const logoutProcess = () => {
      logout()
      onClose()
    }
  return (
    <>
    <DeleteModal isOpen={isDeleteModalOpen} onClose={deleteModalClose} />
    <div className={`modal ${isOpen ? 'block' : 'hidden'} absolute inset-0 h-full w-full bg-transparent z-30 `}>
      
      <animated.div
      style={{ ...modalAnimation, top: topValue, height: '20%'}}
      className={` modal-content absolute w-1/2 left-1/4 top-0 transform -translate-x-1/2 -translate-y-1/2 bg-black rounded-3xl`}>
        <div className={`absolute bg-black w-full h-full opacity-75 z-20 ${isDeleteModalOpen ? 'block' : 'hidden'}`}></div>
        <div className={`absolute ${modClick ? styles.hide : ''} w-full h-full flex flex-col z-10`}>
          <div className='flex rounded-2xl border-2 w-full h-1/6'>
            <div className='flex-1 border-r-2'>
              <div className='flex items-center h-full justify-center'>
                <span className='text-white font-KIMM_Bold text-4xl'>{userDatas.id}<span className='text-white font-KIMM_Bold inline-flex items-end text-sm ml-1'>님 환영합니다 !</span></span>
              </div>
            </div>
            <div className='flex-1 flex-col flex'>
              <div className='flex-1 flex items-center border-b-2 justify-between px-16'>
                <label className='text-white font-KIMM_Bold text-sm '>CustomerNo. </label>
                <span className='text-white font-KIMM_Bold text-2xl'>{userDatas.cusNum}</span>
              </div>
              <div className='flex-1 flex items-center justify-between px-16'>
                <label className='text-white font-KIMM_Bold text-sm'>Age </label>
                <span className='text-white font-KIMM_Bold text-2xl'>{userDatas.age} 대</span>
              </div>
            </div>
          </div>
          <div className='mb-2 flex flex-col h-full'> 
            <label className='text-white font-KIMM_Bold text-2xl ml-4 mb-1 mt-1'>구매내역</label>
            <div className='w-full flex flex-col gap-2 border-2 p-2 rounded-xl h-full'>
            {products && products.length > 0 ? currentProducts.map((product) => (
              <div key={product.seq} className='rounded-lg border-2 text-white px-5 flex justify-center h-full'>
                <div className='flex w-3/4'>
                  <div className='flex-1 w-1/6 p-3'>
                    {/* <img className='w-1/4' src={`${product.imageUrl}`} alt={`Product ${product.id}`} /> */}
                    <div className='w-3/4 h-full' style={{backgroundImage: `url(${product.imageUrl})`, backgroundSize: 'cover'}}></div>
                  </div>
                  <div className='flex-1 flex flex-col gap-2 justify-center font-KIMM_Bold my-1 '>
                    <div>
                      <label>NAME ▷ </label>
                      <label className='text-orange-400'>{product.prodName}</label>
                    </div>
                    <div>
                      <label>SIZE ▷ </label>
                      <label className='text-orange-400'>{product.size}</label>
                    </div>
                    <div>
                      <label>PRICE ▷ </label>
                      <label className='text-orange-400'>{product.prodPrice}</label>
                    </div>
                    <div>
                      <label>DATE ▷ </label>
                      <label className='text-orange-400'>{product.sellDt}</label>
                    </div>
                  </div>
                </div>
              </div>
            )) 
            : <div className='w-full h-full flex items-center justify-center'>
                <span className='text-white font-KIMM_Bold text-xl'>구매한 상품이 없습니다.</span>
              </div>}
          </div>

          {totalPages > 1 && (
          <div className="pagination flex justify-center">
            {currentSet > 1 && (
              <button className='text-white' onClick={handlePrevSet}>&lt;&lt;</button>
            )}

            {Array.from({ length: endPage - startPage + 1 }, (_, index) => (
              <button
                key={startPage + index}
                onClick={() => handlePageChange(startPage + index)}
                className={`${startPage + index === currentPage ? 'active' : ''} hover:underline mx-2 font-KIMM_Bold mt-2 ${pageNum === ( startPage + index ) ? 'text-orange-400 font-bold' : 'text-white'}` }
              >
                {startPage + index}
              </button>
            ))}

            {currentSet < totalSets && (
              <button className='text-white' onClick={handleNextSet}>&gt;&gt;</button>
            )}
          </div>
          )}
          </div>
          <div className='flex gap-2 font-KIMM_Bold items-end justify-end mr-1'>
              <div className='text-black border-2 rounded-md px-3 py-1 bg-white cursor-pointer hover:bg-black hover:text-white' onClick={handleModClick}>MODIFY</div>
              <div className='text-black border-2 rounded-md px-3 py-1 bg-red-500 cursor-pointer hover:bg-black hover:text-white' onClick={deleteModalOpen}>DELETE</div>
              <div className='text-black border-2 rounded-md px-3 py-1 bg-white cursor-pointer hover:bg-black hover:text-white' onClick={logoutProcess}>LOGOUT</div>
              <div className='text-black border-2 rounded-md px-3 py-1 bg-white cursor-pointer hover:bg-black hover:text-white' onClick={onClose}>CLOSE</div>
          </div>
        </div>
        <div className={`  opacity-0 ${modClick ? styles.show : ''} w-full h-full flex flex-col`}>
          <div className='flex rounded-2xl border-2 w-full h-full'>
            <div className='flex-1 border-r-2'>
              <div className='flex items-center h-full justify-center'>
                <span className='text-white font-KIMM_Bold text-4xl'>{userDatas.id}<span className='text-white font-KIMM_Bold inline-flex items-end text-sm ml-1'>님 환영합니다 !</span></span>
              </div>
            </div>
            <div className='flex-1 flex-col flex'>
              <div className='flex-1 flex items-center border-b-2 justify-between px-16'>
                <label className='text-white font-KIMM_Bold text-sm '>CustomerNo. </label>
                <span className='text-white font-KIMM_Bold text-2xl'>{userDatas.cusNum}</span>
              </div>
              <div className='flex-1 flex items-center justify-between px-16'>
                <label className='text-white font-KIMM_Bold text-sm'>Age </label>
                <span className='text-white font-KIMM_Bold text-2xl'>{userDatas.age} 대</span>
              </div>
            </div>
          </div>
          <div className='mb-2 flex flex-col h-full'> 
            <label className='text-white font-KIMM_Bold text-2xl ml-4 mb-1 mt-1'>구매내역</label>
            <div className='w-full flex flex-col gap-2 border-2 p-2 rounded-xl h-full'>
            {products && products.length > 0 ? currentProducts.map((product) => (
              <div key={product.seq} className='rounded-lg border-2 text-white px-5 flex justify-center h-full'>
                <div className='flex w-3/4'>
                  <div className='flex-1 w-1/6 p-3'>
                    {/* <img className='w-1/4' src={`${product.imageUrl}`} alt={`Product ${product.id}`} /> */}
                    <div className='w-3/4 h-full' style={{backgroundImage: `url(${product.imageUrl})`, backgroundSize: 'cover'}}></div>
                  </div>
                  <div className='flex-1 flex flex-col gap-2 justify-center font-KIMM_Bold my-1 '>
                    <div>
                      <label>NAME ▷ </label>
                      <label className='text-orange-400'>{product.prodName}</label>
                    </div>
                    <div>
                      <label>SIZE ▷ </label>
                      <label className='text-orange-400'>{product.size}</label>
                    </div>
                    <div>
                      <label>PRICE ▷ </label>
                      <label className='text-orange-400'>{product.prodPrice}</label>
                    </div>
                    <div>
                      <label>DATE ▷ </label>
                      <label className='text-orange-400'>{product.sellDt}</label>
                    </div>
                  </div>
                </div>
              </div>
            )) 
            : <div className='w-full h-full flex items-center justify-center'>
                <span className='text-white font-KIMM_Bold text-xl'>구매한 상품이 없습니다.</span>
              </div>}
          </div>

          {totalPages > 1 && (
          <div className="pagination flex justify-center">
            {currentSet > 1 && (
              <button className='text-white' onClick={handlePrevSet}>&lt;&lt;</button>
            )}

            {Array.from({ length: endPage - startPage + 1 }, (_, index) => (
              <button
                key={startPage + index}
                onClick={() => handlePageChange(startPage + index)}
                className={`${startPage + index === currentPage ? 'active' : ''} hover:underline mx-2 font-KIMM_Bold mt-2 ${pageNum === ( startPage + index ) ? 'text-orange-400 font-bold' : 'text-white'}` }
              >
                {startPage + index}
              </button>
            ))}

            {currentSet < totalSets && (
              <button className='text-white' onClick={handleNextSet}>&gt;&gt;</button>
            )}
          </div>
          )}
          </div>
          <div className='flex gap-2 font-KIMM_Bold items-end justify-end mr-1'>
              <div className='text-black border-2 rounded-md px-3 py-1 bg-green-500 cursor-pointer hover:bg-black hover:text-white'>CONFIRM</div>
              <div className='text-black border-2 rounded-md px-3 py-1 bg-white cursor-pointer hover:bg-black hover:text-white' onClick={onClose}>CLOSE</div>
          </div>
        </div>         
      </animated.div>
    </div>
    </>
  )
}

export default MypageModal
