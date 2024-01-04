import React, { useState } from 'react'
import { useSpring, animated } from 'react-spring';
import styles from './Modal.module.css'
const DeleteModal = ({isOpen, onClose}) => {
    const [pwdConfirm, setPwdConfirm] = useState();
    const [isPwdMatched, setIsPwdMatched] = useState(true);
    const modalAnimation = useSpring({
        opacity: isOpen ? 1 : 0,
        transform: `translateY(${isOpen ? 0 : 60}%)`,
        config: {
          duration: 300, // 애니메이션 지속 시간 (ms)
        },
        reverse: !isOpen, // isModalOpen이 false가 되면 애니메이션을 초기화
      });

    const fetchUserDelete = async () => {
        setIsPwdMatched(true)
        try {
            const response = await fetch(`http://10.125.121.220:8080/delete?pwd=${pwdConfirm}`, {
              method: 'DELETE',
              headers: {
                'Authorization' : localStorage.getItem('jwtToken')
              },
            
            })
    
            if (response.ok) {
              console.log("삭제 성공")
              localStorage.removeItem('jwtToken')
              window.location.reload()
            }
            else if (response.status === 400) {
              setIsPwdMatched(false)
            }
          } catch (error) {
            console.error("오류", error)
          }
    }

    const handlePwdConfirm = (e) => {
        setPwdConfirm(e.target.value) 
    }
  return (
    <div className={`${isOpen ? 'block':'hidden'}`}>
      <animated.div
      style={{ ...modalAnimation, top: '12%'}}
      className={`modal-content absolute w-1/2 h-60 left-1/4 top-0 transform -translate-x-1/2 -translate-y-1/2 bg-gray-400 rounded-2xl z-40`}>
        <span className="close text-3xl absolute top-2 right-4 cursor-pointer text-black" onClick={onClose}>
          &times;
        </span>
        <div className='flex flex-col items-center gap-2 w-full h-full justify-center'>
            <h1 className='font-KIMM_Bold'>정말 삭제하시겠습니까?</h1>
            <div>
                <label className='font-KIMM_Bold mr-2'>비밀번호 확인</label>
                <input className={`bg-white px-1 ${!isPwdMatched ? `border-2 border-red-500 ${styles.confirmPwd}`  : ''}`} type="password" value={pwdConfirm} onChange={handlePwdConfirm}></input>
            </div>
            <div className='text-black font-KIMM_Bold bg-orange-400 px-2 py-1 rounded-2xl text-sm cursor-pointer' onClick={fetchUserDelete}>DELETE CONFIRM</div>
        </div>
      </animated.div>
    </div>
  )
}

export default DeleteModal
