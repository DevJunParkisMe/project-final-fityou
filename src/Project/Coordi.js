import React, { useEffect, useRef, useState } from 'react'
import { FaArrowAltCircleUp } from "react-icons/fa";
import styles from './FitMe.module.css'
const Coordi = ({screenId}) => {
    const [products, setProducts] = useState([]);
    const [visibleProducts, setVisibleProducts] = useState([]);
    const [page, setPage] = useState(1); // 현재 페이지
    const [loading, setLoading] = useState(false); // 새로운 데이터를 로드 중인지 여부
    const [imgHover, setImgHover] = useState(null);
    const [isUnderHeight, setUnderHeight] = useState(false);
    const [categoryClick, setCategoryClick] = useState('');
    const itemsPerPage = 20; // 한 페이지에 표시될 아이템 수
    const containerRef = useRef();
    const imageRef = useRef();
    useEffect(()=>{
      if(screenId === 4) {
        fetchGetAllProduct()
        setCategoryClick('')
      }
    },[screenId])
    useEffect(() => {
        if(categoryClick === 'outer') {
          fetchGetProduct('outer')
        }
        else if (categoryClick === 'top') {
          fetchGetProduct('top')
        }
        else if (categoryClick === 'pants') {
          fetchGetProduct('pants')  
        }
        else if (categoryClick === 'set') {
          fetchGetProduct('set')
        }
        else {
          fetchGetAllProduct()
        }
      }, [page]);
      useEffect(()=>{
        setProducts([])
      },[categoryClick])
      const fetchGetAllProduct = async () => {
        try {
          const response = await fetch(`http://10.125.121.220:8080/getAll?page=${page}&itemsPerPage=${itemsPerPage}`, {
            method: 'GET',
            headers: {
              'Content-Type': 'application/json'
            }
          });
    
          if (response.ok) {
            const data = await response.json();
            setProducts((prevProducts) => [...prevProducts, ...data]);
            setLoading(false); // 데이터를 성공적으로 가져오면 로딩 상태를 해제
          } else {
            console.log('데이터 가져오기 실패');
          }
        } catch (error) {
          console.error('오류', error);
        }
      };

      const fetchGetProduct = async (category) => {
        setCategoryClick(category)
        try {
          const response = await fetch (`http://10.125.121.220:8080/getProd?page=${page}&itemsPerPage=${itemsPerPage}&category=${category}`, {
            method: 'GET',
            headers: {
              'Content-Type' : 'application/json'
            }
          })
          if (response.ok) {
            const data = await response.json()
            setProducts((prevProducts) => [...prevProducts, ...data]);
            console.log(data, 'data')
          }
        } catch (error) {
          
        }
      }
      const handleWheel = (e) => {
        if (e.cancelable)
            e.preventDefault()

        containerRef.current.scrollTop += e.deltaY
        if ((containerRef.current.scrollTop + containerRef.current.clientHeight) >= containerRef.current.scrollHeight - 1) {
            setPage((prevPage) => prevPage + 1);
        }

        
      };
      const handleImgClick = (product, index) => {
        
        const outerDiv = document.querySelector('.outer')
        const topDiv = document.querySelector('.topp')
        const pantsDiv = document.querySelector('.pants')
        const outerDetailDiv = document.querySelector('.outerDetail')
        const topDetailDiv = document.querySelector('.topDetail')
        const pantsDetailDiv = document.querySelector('.pantsDetail')
        if (product.prodCategory === 'OUTER') {
          outerDiv.style.backgroundImage = `url(${product.imageUrl})`;
          outerDiv.style.color = 'transparent'
          outerDetailDiv.innerHTML = `<div><div>이름</div><div>${product.prodName}</div></div><div><div>가격</div><div>${product.prodPrice}</div></div>`
        }
        else if (product.prodCategory === 'TOP' | product.prodCategory === 'SET') {
          topDiv.style.backgroundImage = `url(${product.imageUrl})`;
          topDiv.style.color = 'transparent'
          topDetailDiv.innerHTML = `<div><div>이름</div><div>${product.prodName}</div></div><div><div>가격</div><div>${product.prodPrice}</div></div>`
        }
        else {
          pantsDiv.style.backgroundImage = `url(${product.imageUrl})`;
          pantsDiv.style.color = 'transparent'
          pantsDetailDiv.innerHTML = `<div><div>이름</div><div>${product.prodName}</div></div><div><div>가격</div><div>${product.prodPrice}</div></div>`
        }
      }
      useEffect(() => {
        // visibleProducts가 변경될 때만 새로운 데이터를 추가
        setVisibleProducts((prevVisibleProducts) => [
          ...prevVisibleProducts,
          ...products.slice(prevVisibleProducts.length, prevVisibleProducts.length + itemsPerPage)
        ]);
      }, [products, itemsPerPage]);
      const handleUpClick = () => {
        containerRef.current.scrollTop = 0;
      }
      const handleHover = (index) => {
        setImgHover(index)
      } 
      const handleAllClick = () => {
        fetchGetAllProduct()
        setCategoryClick('')
      }
      const handleReset = () => {
        const outerDiv = document.querySelector('.outer')
        const topDiv = document.querySelector('.topp')
        const pantsDiv = document.querySelector('.pants')
        const outerDetailDiv = document.querySelector('.outerDetail')
        const topDetailDiv = document.querySelector('.topDetail')
        const pantsDetailDiv = document.querySelector('.pantsDetail')

        outerDiv.style.backgroundImage = ``;
        outerDiv.style.color = 'white'
        outerDetailDiv.innerHTML = ``
        topDiv.style.backgroundImage = ``;
        topDiv.style.color = 'white'
        topDetailDiv.innerHTML = ``
        pantsDiv.style.backgroundImage = ``;
        pantsDiv.style.color = 'white'
        pantsDetailDiv.innerHTML = ``
      }

  return (
    <div className='w-full h-full'>
      <div className={`relative text-white bg-black top-28 px-24 pb-24 pt-12`} style={{height: '90%'}} onMouseEnter={() =>handleHover(-1)}>
        <div className='flex  font-KIMM_Bold'>
            <div className='flex gap-5 mb-2 font-KIMM_Bold w-full'>
            <div className='bg-white text-black rounded-md px-2 py-1 hover:bg-black hover:text-white cursor-pointer' onClick={handleAllClick}>ALL</div>
              <div className='bg-white text-black rounded-md px-2 py-1 hover:bg-black hover:text-white cursor-pointer' onClick={() => fetchGetProduct('outer')}>OUTER</div>
              <div className='bg-white text-black rounded-md px-2 py-1 hover:bg-black hover:text-white cursor-pointer' onClick={() => fetchGetProduct('top')}>TOP</div>
              <div className='bg-white text-black rounded-md px-2 py-1 hover:bg-black hover:text-white cursor-pointer' onClick={() => fetchGetProduct('pants')}>PANTS</div>
              <div className='bg-white text-black rounded-md px-2 py-1 hover:bg-black hover:text-white cursor-pointer' onClick={() => fetchGetProduct('set')}>SET</div>
              <div className={`text-3xl cursor-pointer`} onClick={handleUpClick}><FaArrowAltCircleUp /></div>
            </div>
            <div className='bg-white text-black rounded-md px-2 py-1 mb-2 hover:bg-black hover:text-white cursor-pointer' onClick={handleReset}>RESET</div>
        </div>
        <div  className=' text-white bg-black grid grid-flow-col gap-2 ' style={{height: '100%'}} >
            <div className='grid grid-cols-5 gap-2 p-3 col-span-1 border-2 border-white overflow-hidden pl-9' ref={containerRef} onWheel={handleWheel}>
                {products && products.map((product, index) => (
                    <div ref={imageRef} key={index} className='my-2 relative cursor-pointer'  style={{width:'200px', height:'200px',backgroundPosition: 'center', backgroundImage: `url(${product.imageUrl})`, backgroundSize: 'cover'}} onMouseEnter={() => handleHover(index)} onMouseLeave={() => handleHover(-1)} onClick={() => handleImgClick(product, index)}>
                      
                    </div>
                   
                ))}

            </div>
            <div className='grid grid-cols-2 col-span-3 gap-2 p-2 border-2 border-white font-KIMM_Bold'>
                <div className='outer w-full h-full border-2 border-white flex items-center justify-center text-2xl' style={{backgroundSize: 'cover', backgroundPosition: 'center'}}>OUTER</div>
                <div className='outerDetail w-full h-full border-2 border-white flex flex-col justify-center px-2'></div>
                <div className='topp w-full h-full border-2 border-white flex items-center justify-center text-2xl' style={{backgroundSize: 'cover', backgroundPosition: 'center'}}>TOP</div>
                <div className='topDetail w-full h-full border-2 border-white flex flex-col justify-center px-2'></div>
                <div className='pants w-full h-full border-2 border-white flex items-center justify-center text-2xl' style={{backgroundSize: 'cover', backgroundPosition: 'center'}}>PANTS</div>
                <div className='pantsDetail w-full h-full border-2 border-white flex flex-col justify-center px-2'></div>
            </div>
        </div>
      </div>
    </div>
  )
}

export default Coordi
