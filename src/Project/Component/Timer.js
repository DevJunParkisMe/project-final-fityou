import React, { useEffect, useState } from 'react'

const Timer = ({onClose, setIsAlert}) => {
    const [seconds, setSeconds] = useState(0);

    useEffect(() => {
        // 매 1초마다 seconds 상태를 증가시킴
        const intervalId = setInterval(() => {
            setSeconds(prevSeconds => prevSeconds + 1);
        }, 1000);

        // 컴포넌트가 언마운트되면 clearInterval을 호출하여 interval을 정리
        return () => clearInterval(intervalId);
    }, []); // 빈 배열을 전달하여 한 번만 실행되도록 함
    useEffect(()=>{
        setSeconds(0)
    }, [onClose])

    useEffect(() => {
        setTimeout(() => {
            onClose()
        }, 10000);
    },[])
    return (
        <div className='font-KIMM_Bold flex gap-2'>
            <div className='text-white font-KIMM_Bold'>
                {seconds >= 8 
                ? '상품 목록을 완성중입니다.' 
                : seconds >= 4 
                ? '분석 결과를 바탕으로 추천 상품을 찾고 있습니다.'
                : '선택한 상품의 이미지를 분석 중입니다.' }</div>
            <p className='text-white'>({seconds}s)</p>
        </div>
    );
}

export default Timer
