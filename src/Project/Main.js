import React, { useEffect, useState } from 'react'
import LoginModal from './LoginModal'
import MypageModal from './MypageModal';
import { jwtDecode } from 'jwt-decode';
import SurveyModal from './SurveyModal';
const Main = ({setNavVisible, screenId, login, logout, isLogin, isModalOpen, setModalOpen, setUserDatas, userDatas, openMyModal, isMyModalOpen, setMyModalOpen, handleButtonClick}) => {
  // const [isModalOpen, setModalOpen] = useState(false);
  // const [isMyModalOpen, setMyModalOpen] = useState(false);
  const [isSurveyModalOpen, setSurveyModalOpen] = useState(false);
  // const openMyModal = () => {
  //   const storedToken = localStorage.getItem('jwtToken');
  //   if (storedToken) {
  //     const decodedToken = jwtDecode(storedToken); // JWT 디코딩 라이브러리 사용
  //     const currentTime = Date.now() / 1000; // 초로 변환
      
  //     if (decodedToken.exp && decodedToken.exp < currentTime) {
  //       // 토큰이 만료됨, 로그아웃 처리
  //       alert("세션이 만료되었습니다.")
  //       logout();
  //     }
  //     else {
  //       setMyModalOpen(true);
  //     }
  //   }
    // setMyModalOpen(true);
    // try {
    //   const response = await fetch('http://10.125.121.220:8080/getmem', {
    //     method: 'GET',
    //     headers: {
    //       'Authorization' : localStorage.getItem('jwtToken')
    //     }
    //   })

    //   if (response.ok) {
    //     setMyModalOpen(true);
    //     console.log("데이터 로드 성공")
    //     const data = await response.json()
    //     console.log(data)
    //     setUserDatas({id: data[0].username, cusNum: data[0].cusNum, age: data[0].age, prodInfo: data[1]})
    //   }
    //   else {
    //     console.log("데이터 로드 실패")
    //   }
    // } catch (error) {
    //   console.error("오류", error)
    // }
    
  // }
  const fetchGetMember = async () => {
    try {
      const response = await fetch('http://10.125.121.220:8080/getmem', {
        method: 'GET',
        headers: {
          'Authorization' : localStorage.getItem('jwtToken')
        }
      })

      if (response.ok) {
        console.log("데이터 로드 성공")
        const data = await response.json()
        console.log(data)
        setUserDatas({id: data[0].username, cusNum: data[0].cusNum, age: data[0].age, prodInfo: data[1]})
      }
      else {
        console.log("데이터 로드 실패")
      }
    } catch (error) {
      console.error("오류", error)
    }
  }
  useEffect(()=>{
    if (localStorage.getItem('jwtToken'))
      fetchGetMember()
  },[])


  const closeMyModal = () => {
    setMyModalOpen(false);
  }

  const openModal = () => {

    setModalOpen(true);
  };

  const closeModal = () => {
    setModalOpen(false);
  };

  const openSurveyModal = () => {
    setSurveyModalOpen(true)
  }


  const closeSurveyModal = () => {
    setSurveyModalOpen(false)
  }

  return (
    <>
    {/* <SurveyModal isOpen={isSurveyModalOpen} onOpen={openSurveyModal} onClose={closeSurveyModal} screenId={screenId} isLogin={isLogin}/> */}
    <LoginModal isOpen={isModalOpen} surveyClose={closeSurveyModal} isSurveyOpen={isSurveyModalOpen} setSurveyOpen={setSurveyModalOpen} onClose={closeModal} screenId={screenId} isModalOpen={isModalOpen} isLogin={isLogin} login={login} fetchGetMember={fetchGetMember}/>
    <MypageModal isOpen={isMyModalOpen} onClose={closeMyModal} logout={logout} userDatas={userDatas} screenId={screenId}/>
    
    <div className='h-screen flex flex-col justify-center items-center'>
        <h1 className='text-9xl font-KIMM_Bold text-orange-300 z-20'>FitYou.</h1>
        <div className='text-white font-KIMM_Bold z-20 mb-4 text-2xl'>지금, 당신에게 필요한 패션 가이드</div>
        <div className='border-2 border-white rounded-2xl text-center p-2 px-24 bg-white cursor-pointer z-20 hover:bg-black hover:text-white'  onClick={() => handleButtonClick(2)}><span className='text-xl font-KIMM_Bold'>FIND YOUR STYLE</span></div>
    </div>
    </>
  )
}

export default Main
