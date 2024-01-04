import React, { useEffect, useState } from 'react';
import { useSpring, animated } from 'react-spring';
import styles from './Modal.module.css'
const LoginModal = ({ isOpen, onClose, screenId, isModalOpen, login, setSurveyOpen }) => {
  const [id, setId] = useState("")
  const [pwd, setPwd] = useState("")
  const [cusNum, setCusNum] = useState("")
  const [confirmPwd, setConfirmPwd] = useState("")
  const [loginId, setLoginId] = useState("")
  const [loginPwd, setLoginPwd] = useState("")
  const [signUpForm, setSignUpForm] = useState(false)
  const [isPwdMatched, setIsPwdMatched] = useState(true)
  const [isIdCheck, setIsIdCheck] = useState(true)
  const [isIdCheckClick, setIsIdCheckClick] = useState(false)
  const [loginCheck, setLoginCheck] = useState(true);
  // 초기 topValue 설정
  let topValue = '5%';
  // screenId가 2인 경우 38%로 설정
  if (screenId === 2) {
    topValue = '38.5%';
  }
  // screenId가 3인 경우 80%로 설정
  else if (screenId === 3) {
    topValue = '72%';
  }

  const modalAnimation = useSpring({
    opacity: isModalOpen ? 1 : 0,
    transform: `translateY(${isModalOpen ? 0 : 60}%)`,
    config: {
      duration: 300, // 애니메이션 지속 시간 (ms)
    },
    reverse: !isModalOpen, // isModalOpen이 false가 되면 애니메이션을 초기화
  });

  const fetchSurveyModalOpen = async (cusNum) => {
    try {
      const response = await fetch(`http://10.125.121.220:8080/survey?cusNum=${cusNum}`, {
        method: 'GET'
      })

      if (response.ok) {
        console.log('성공')
        const data = await response.json()
        console.log(data, 'data')
        setSurveyOpen(true)
      }
      else {
        console.log('실패')
      }

    } catch (error) {   
        console.error('오류', error)
    }
  }

  const fetchUserSignUp = async (e) => {
    e.preventDefault()
    if (pwd != confirmPwd) {
      setIsPwdMatched(false)
      return
    }
    if (!isIdCheckClick) {
      const checkButton = document.querySelector('.checkbutton');
      if (checkButton) {
        checkButton.style.backgroundColor = "red";
        // Add the "shake" class to initiate the shaking animation
        checkButton.classList.add(styles.shake);

        // Optionally, remove the class after a certain duration to stop the animation
        setTimeout(() => {
          checkButton.classList.remove(styles.shake);
        }, 200); // Adjust the duration as needed
      }

      return;
    } else {
      if (isIdCheck) {
        return
      }
    }
    setIsPwdMatched(true)
    const selectedRadio = document.querySelector('input[name="ageGroup"]:checked');
    if (selectedRadio) {
      const selectedValue = selectedRadio.value;
      try {
        
        const response = await fetch('http://10.125.121.220:8080/join',{
          method : 'POST',
          headers : {
            'Content-Type' : 'application/json'
          },
          body : JSON.stringify({username: id, pwd: pwd, cusNum: cusNum, age: selectedValue})
        });
        
        if(response.ok) {
          console.log("회원가입 성공")
          console.log(id, 'id')
          const data = await response.json()
          console.log(data, 'Signup data')
          setSignUpForm(false)
          setLoginPwd("")
          if (cusNum === "") {
            fetchSurveyModalOpen(data.cusNum)
          }
          
        }
        else {
          console.log("회원가입 실패")
        }
      } catch (error) {
        console.error("오류 발생", error)
      }
    }
  }
  const fetchIdExistCheck = async () => {
    if (id === "")
      return
    const checkButton = document.querySelector('.checkbutton');
    if (checkButton) {
      checkButton.style.backgroundColor = checkButton.style.backgroundColor === 'red' ?  'rgb(251, 146, 60)' : 'rgb(251, 146, 60)' 
    }
    
    try {
      const response = await fetch(`http://10.125.121.220:8080/idcheck?id=${id}`,{
        method: 'GET',
      })

      if (response.ok) {
        const data = await response.json()
        console.log(data, 'data')
        setIsIdCheck(data)
        setIsIdCheckClick(true)
      }
      else {
        console.log("통신 실패")
      }
    } catch (error) {
      console.error("오류 발생", error)
    }
  }


  const fetchUserLogin = async (e) => {
    setLoginCheck(true)
    e.preventDefault()
    try {
      const response = await fetch('http://10.125.121.220:8080/login', {
        method: 'POST',
        headers : {
          'Content-Type' : 'application/json'
        },
        body: JSON.stringify({username:loginId, pwd: loginPwd})
      })

      if (response.ok) {
        const jwtToken = response.headers.get('Authorization'); // 서버에서 설정한 헤더명 확인
        console.log("성공", jwtToken);

        localStorage.setItem('jwtToken', jwtToken);
        setTimeout(() => {
          onClose()
          login(jwtToken)
        }, 400)
        
      }
      else if(response.status === 401){
        setLoginCheck(false)
      }
    } catch (error) {
      console.error("오류" , error)
    }
  }


  const handleIdChange = (event) => {
    setId(event.target.value)
  }

  const handlePwdChange = (event) => {
    setPwd(event.target.value)
    setIsPwdMatched(true)
  }

  const handleCusNumChange = (event) => {
    setCusNum(event.target.value)
  }
  const handleConfirmPwdChange = (event) => {
    setConfirmPwd(event.target.value)
    setIsPwdMatched(true)
  }
  const handleLoginIdChange = (event) => {
    setLoginId(event.target.value)
  }
  const handleLoginPwdChange = (event) => {
    setLoginPwd(event.target.value)
  }
  // screenId가 변경될 때마다 topValue 업데이트
  const handleToSignUp = () => {
    setSignUpForm(!signUpForm)
    setPwd("")
    setConfirmPwd("")
    setId("")
    setCusNum("")
    setLoginId("")
    setLoginPwd("")
    setIsPwdMatched(true)
    setIsIdCheckClick(false)
    setIsIdCheck(false)
    setLoginCheck(true)
  }


  useEffect(() => {
    
    if (screenId === 2) {
      topValue = '38%';
    } else if (screenId === 3) {
      topValue = '75%';
    } else {
      topValue = '5%';
    }
 
    console.log(topValue,'topValue')
  }, [screenId]);
  useEffect(() => {
    if (signUpForm)
      setSignUpForm(false)

    setLoginId("")
    setLoginPwd("")  
  },[isModalOpen])
  useEffect(() => {
    setIsIdCheckClick(false)
  }, [id])
  return (
    <div className={`modal ${isOpen ? 'block' : 'hidden'} absolute inset-0 h-full w-full bg-transparent z-30 `}>
      <animated.div
        style={{ ...modalAnimation, top: topValue }}
        className={`modal-content absolute w-1/2 h-1/4 left-1/4 top-0 transform -translate-x-1/2 -translate-y-1/2 bg-white rounded-3xl`}>
        <span className="close text-3xl absolute top-2 right-4 cursor-pointer" onClick={onClose}>
          &times;
        </span>
        <div className='flex h-full '>
          <div className='w-1/2'>
            <img className='h-full rounded-l-3xl' src='img/옷3.jpg' />
          </div>
          <div className='w-1/2'> 
          <div className='w-full h-full flex flex-col justify-center gap-24 items-center'>
          {!signUpForm 
          ? <h1 className='font-KIMM_Bold text-3xl text-center'>LOGIN</h1>
          : ''}
            <div className='w-3/4'>
              {/* <form >
                <input className='block bg-gray-200 shadow-lg w-full p-2 px-4 mb-5 font-KIMM_Bold' type='text' placeholder='ID를 입력해주세요.'/> 
                <input className='block bg-gray-200 shadow-lg w-full p-2 px-4 mb-5 font-KIMM_Bold' type='password' placeholder='비밀번호를 입력해주세요.'/> 
                <input className='block bg-orange-400 w-full shadow-xl p-2 font-KIMM_Bold text-white cursor-pointer' type='submit' value='로그인' />
              </form>
              <div className='mt-14 '>
              <span className='font-KIMM_Bold text-sm'>회원이 아니신가요?</span><span className='ml-5 font-KIMM_Bold text-orange-400 cursor-pointer' onClick={handleToSignUp}>회원가입</span>
              </div> */}
              {!signUpForm 
              ? (
              <>
              <form onSubmit={fetchUserLogin}>
                <div className='flex justify-between'>
                  <label className='font-KIMM_Bold'>ID</label>
                  {!loginCheck ? <span className='font-KIMM_Bold text-sm text-red-500'>아이디 또는 비밀번호를 잘못 입력했습니다.</span> : null}
                </div>
                <input className='block bg-gray-200 shadow-lg w-full p-2 px-4 mb-5 font-KIMM_Bold' value={loginId} type='text' placeholder=''  onChange={handleLoginIdChange}/> 
                <label className='font-KIMM_Bold'>비밀번호</label>
                <input className='block bg-gray-200 shadow-lg w-full p-2 px-4 mb-8' value={loginPwd} type='password' placeholder=''  onChange={handleLoginPwdChange}/> 
                <input className='block bg-orange-400 w-full shadow-xl p-2 font-KIMM_Bold text-white cursor-pointer' type='submit' value='로그인' />
              </form>
              <div className='mt-14 '>
              <span className='font-KIMM_Bold text-sm'>회원이 아니신가요?</span><span className='ml-5 font-KIMM_Bold text-orange-400 cursor-pointer' onClick={handleToSignUp}>회원가입</span>
              </div>
              </>
              ) 
              : 
              (
                <>
                <form onSubmit={fetchUserSignUp}>
                  <div className='flex justify-between items-center'>
                    <label className='font-KIMM_Bold'>ID</label>
                    <div className='flex'>
                      {isIdCheckClick ? isIdCheck ? (<span className='font-KIMM_Bold flex items-center text-red-500'>등록된 ID입니다.</span>): (<span className='font-KIMM_Bold flex items-center text-green-500'>사용 가능한 ID입니다.</span>) : null}
                      <div className='checkbutton cursor-pointer w-auto px-5 py-1 mb-1 ml-2 bg-orange-400 rounded-xl text-xs text-center font-KIMM_Bold text-white' onClick={fetchIdExistCheck}>중복 확인</div>
                    </div>    
                  </div>
                  <input className='block bg-gray-200 shadow-lg w-full p-2 px-4 mb-5 font-KIMM_Bold' type='text' value={id} placeholder='' onChange={handleIdChange}/> 
                  <label className='font-KIMM_Bold'>비밀번호</label>
                  <input className='block bg-gray-200 shadow-lg w-full p-2 px-4 mb-5' type='password' value={pwd} placeholder='' onChange={handlePwdChange}/>
                  <label className='font-KIMM_Bold'>비밀번호확인</label>
                  <input className={`block bg-gray-200 shadow-lg w-full p-2 px-4 mb-5 ${!isPwdMatched ? `border-2 border-red-500 ${styles.confirmPwd}`  : ''}`} type='password' value={confirmPwd} placeholder='' onChange={handleConfirmPwdChange}/>
                  <label className='font-KIMM_Bold'>고객번호</label>
                  <input className='block bg-gray-200 shadow-lg w-full p-2 px-4 mb-5 font-KIMM_Bold' type='text' value={cusNum} placeholder='' onChange={handleCusNumChange}/> 
                  <label className='font-KIMM_Bold'>연령대</label><br/>
                  <div className='flex justify-between mb-5'>
                    <div>
                      <input type='radio' id='ageGroup1' name='ageGroup' value='10'></input>
                      <label className='font-KIMM_Bold pl-1' for='ageGroup1'>10대</label>
                    </div>
                    <div>
                      <input type='radio' id='ageGroup2' name='ageGroup' value='20'></input>
                      <label className='font-KIMM_Bold pl-1' for='ageGroup2'>20대</label>
                    </div>
                    <div>
                      <input type='radio' id='ageGroup3' name='ageGroup' value='30'></input>
                      <label className='font-KIMM_Bold pl-1' for='ageGroup3'>30대</label>
                    </div>
                    <div>
                      <input type='radio' id='ageGroup4' name='ageGroup' value='40'></input>
                      <label className='font-KIMM_Bold pl-1' for='ageGroup4'>40대</label>
                    </div>
                    <div>
                      <input type='radio' id='ageGroup5' name='ageGroup' value='50'></input>
                      <label className='font-KIMM_Bold pl-1' for='ageGroup5'>50대</label>
                    </div>
                  </div>
                  <input className='block bg-orange-400 w-full shadow-xl p-2 font-KIMM_Bold text-white cursor-pointer' type='submit' value='회원가입' />
                </form>
                <div className='mt-14 '>
                <span className='font-KIMM_Bold text-sm'>이미 아이디가 있으신가요?</span><span className='ml-5 font-KIMM_Bold text-orange-400 cursor-pointer' onClick={handleToSignUp}>로그인하기</span>
                </div>
                </>
                ) }
            </div>
          </div>
          </div>
        </div>
      </animated.div>
    </div>
  );
};
export default LoginModal;
