import React, { useState, useEffect } from 'react';
import { useTransition, animated } from 'react-spring';
import '../SignUpPage/SignUpPage.css';
import { IoIosWarning } from 'react-icons/io';
import { Link } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import Spinner from 'react-bootstrap/Spinner';
import { getAuth, signInWithEmailAndPassword } from 'firebase/auth';
import CustomToast from '../../utils/components/CustomToast';
import { defaultAnimation } from '../../utils/ToastAnimation'; 

let timer;

const LoginPage = () => {
  const [submitLoading, setSubmitLoading] = useState(false);
  const [errorFromSubmit, setErrorFromSubmit] = useState({txt: "", status: 'danger'});
  const { register, formState: { errors }, handleSubmit } = useForm();
  const transition = useTransition(errorFromSubmit, defaultAnimation);

  useEffect(() => {
    return () => {
      if (timer) clearTimeout(timer);
    }
  }, []);
  
  const onSubmit = async (data) => {
    try {
      setSubmitLoading(true);
      
      const auth = getAuth();
      await signInWithEmailAndPassword(auth, data.email, data.password);

      setSubmitLoading(false);

    } catch (error) {
      switch (error.code) {
        case 'auth/user-not-found':
          setErrorFromSubmit(prev => {return {...prev, txt: "존재하지 않는 계정입니다!"}})
          break;
        case 'auth/wrong-password':
          setErrorFromSubmit(prev => {return {...prev, txt: "비밀번호가 일치하지 않습니다!"}})
          break;
        case 'auth/too-many-requests':
          setErrorFromSubmit(prev => {return {...prev, txt: "too many requests 😭"}})
          break;
      }
      
      if (timer) clearTimeout(timer);
      timer = setTimeout(() => {
        setErrorFromSubmit({txt: "", status: 'danger'});
        setSubmitLoading(false);
      }, 2000);
    }
  }

  return (
    <div id="loginPage" className='common-signup-page'>
      <div className='page-container'>
          <div className='inner'>
            <h2 className='title'>로그인</h2>
            <form onSubmit={handleSubmit(onSubmit)}>
              <input type="email" className='common-inputs mb-3' placeholder='이메일'
                name="email" { ...register('email', { required: true, pattern: /^\S+@\S+$/i }) }
              />
              { errors.email && errors.email.type === 'required' && <p className='warning'><IoIosWarning /> 이메일은 필수입력 값입니다.</p>}
              { errors.email && errors.email.type === 'pattern' && <p className='warning'><IoIosWarning /> 유효하지 않은 이메일 형식입니다.</p>}

              <input type="password" className='common-inputs mb-3' placeholder='비밀번호'
                name="password" { ...register('password', { required: true, minLength: 6 }) }
              />
              { errors.password && errors.password.type === 'required' && <p className='warning'><IoIosWarning /> 비밀번호는 필수입력 값입니다.</p>}
              { errors.password && errors.password.type === 'minLength' && <p className='warning'><IoIosWarning /> 비밀번호는 최소 6자 이상 입력하셔야 합니다.</p>}

              <button disabled={submitLoading} className='common-button signup-btn mb-2'>
                { submitLoading ? <Spinner animation="border" variant="light" /> : '제출' }
              </button>
              <div className='go-link-wrap mb-4'>
                <p className='question'>아직 아이디가 없으신가요?</p>
                <Link to="/signup" className='go-link'>회원가입하러 가기</Link>
              </div>
            </form>
          </div>
      </div>
      {transition((style, item) => (
        item.txt !== "" 
        ? <animated.div style={style} className="toastWrap">
            <CustomToast item={item}/>
          </animated.div>
        : null
      ))}
    </div>
  )
}

export default LoginPage