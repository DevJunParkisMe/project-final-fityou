import React, { useEffect, useState } from 'react';
import Fullpage, { FullPageSections, FullpageSection, FullpageNavigation } from '@ap.cx/react-fullpage';
import Nav from './Nav';
import Main from './Main';
import FitMe from './FitMe';
import Top10 from './Top10';
import {debounce} from 'lodash'
import { jwtDecode } from 'jwt-decode';
const Index = () => {
  const [isModalOpen, setModalOpen] = useState(false);
  const [isNavVisible, setNavVisible] = useState(false);
  const [activeItem, setActiveItem] = useState(1);
  const [screenId, setScreenId] = useState(null);
  const [isLogin, setIsLogin] = useState(false);
  const [token, setToken] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [isClick, setIsClick] = useState(false);
//   const handleButtonClick = (screenId) => {
//     console.log(screenId, 'screenId');
//     const screenPosition = (screenId - 1) * window.innerHeight;
//     console.log(screenPosition, 'screenPosition');
//     window.scrollTo({
//       top: screenPosition,
//     });


//     // 클릭된 li에 대한 색상 변경
//     setActiveItem(screenId);
//   };

  const debouncedHandleButtonClick = debounce((screenId) => {
    console.log(screenId, 'screenId');
    const screenPosition = (screenId - 1) * window.innerHeight;
    console.log(screenPosition, 'screenPosition');
    window.scrollTo({
      top: screenPosition,
    });

    // 클릭된 li에 대한 색상 변경
    setActiveItem(screenId);
    setScreenId(screenId)
  }, 250);

  const login = (jwtToken) => {
    setToken(jwtToken);
    localStorage.setItem('jwtToken', jwtToken);
    setIsLogin(true)
  }
  const logout = () => {
    setToken('')
    localStorage.removeItem('jwtToken')
    setIsLogin(false)
    setIsClick(false)
  }
  useEffect(() => {
    console.log(screenId, 'screenId')
  }, [debouncedHandleButtonClick])
  useEffect(() => {
    const storedToken = localStorage.getItem('jwtToken');
    if (storedToken) {
      login(storedToken);
    }
    // 시간 지연 후 isLoading을 false로 변경하여 렌더링을 허용
    const delayTimeout = setTimeout(() => {
      setIsLoading(true);
    }, 25); // 1초 딜레이
    
    // 컴포넌트가 언마운트될 때 clearTimeout을 사용하여 타임아웃 제거
    return () => clearTimeout(delayTimeout);
  }, [login]); // login 함수에 의존성 추가
  
  useEffect(() => {
    const storedToken = localStorage.getItem('jwtToken');
    if (storedToken) {
      const decodedToken = jwtDecode(storedToken); // JWT 디코딩 라이브러리 사용
      const currentTime = Date.now() / 1000; // 초로 변환
      
      if (decodedToken.exp && decodedToken.exp < currentTime) {
        // 토큰이 만료됨, 로그아웃 처리
        logout();
      } else {
        // 토큰이 아직 유효함, 인증 수행
        login(storedToken);
      }
    }
  }, []);
  useEffect(() => {
    // Fullpage 컴포넌트가 마운트될 때 이벤트 리스너 등록
    const handleKeyDown = (event) => {
      // 방향 키 입력 감지
      if (event.key.startsWith('Arrow')) {
        // 방향 키 입력을 무시
        event.preventDefault();
      }
    };

    document.addEventListener('keydown', handleKeyDown);

    // Fullpage 컴포넌트가 언마운트될 때 이벤트 리스너 제거
    return () => {
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, []); // 빈 배열은 컴포넌트가 마운트될 때 한 번만 실행됨

  return (
    <>
      <Fullpage>
        <FullPageSections>
          <div className='absolute w-full h-screen bg-black opacity-75'></div>
          <FullpageSection className="min-h-screen" style={{ backgroundImage: `url('/img/옷.jpg')` }}>
            {/* Pass the common color state to each Nav component */}
            <Nav isNavVisible={isNavVisible} setNavVisible={setNavVisible} buttonColor={activeItem} handleButtonClick={debouncedHandleButtonClick} screenId={screenId}/>
            {isLoading ? <Main handleButtonClick={debouncedHandleButtonClick} screenId={screenId} login={login} logout={logout} isLogin={isLogin} isModalOpen={isModalOpen} setModalOpen={setModalOpen}/> : <div></div>}
          </FullpageSection>
          <div className='absolute w-full h-screen bg-black opacity-75'></div>
          <FullpageSection className="min-h-screen" style={{ backgroundImage: `url('/img/옷2.jpg')` }}>
            <Nav isNavVisible={isNavVisible} setNavVisible={setNavVisible} buttonColor={activeItem} handleButtonClick={debouncedHandleButtonClick} screenId={screenId}/>
            <FitMe screenId={screenId} isModalOpen={isModalOpen} setModalOpen={setModalOpen} isClick={isClick} setIsClick={setIsClick}/>
          </FullpageSection>
          <div className='absolute w-full h-screen bg-black opacity-75'></div>
          <FullpageSection className="min-h-screen" style={{ backgroundImage: `url('/img/옷6.jpg')` }}>
            <Nav isNavVisible={isNavVisible} setNavVisible={setNavVisible} buttonColor={activeItem} handleButtonClick={debouncedHandleButtonClick} screenId={screenId} />
            <Top10 />
          </FullpageSection>
        </FullPageSections>
      </Fullpage>
    </>
  );
};

export default Index;
