import React from 'react';
import './SignUpPage.css';
import { Link } from 'react-router-dom';

const SignUpPage = () => {
  return (
    <div id="signUpPage" className='common-page'>
      <div className='page-container'>
          <div className='inner'>
            <h2 className='title mb-5'>회원가입</h2>
            <form>
              <input type="text" className='common-inputs mb-3' placeholder='이메일'/>
              <input type="text" className='common-inputs mb-3' placeholder='이름'/>
              <input type="password" className='common-inputs mb-3' placeholder='패스워드'/>
              <input type="password" className='common-inputs mb-4' placeholder='패스워드 확인'/>

              <button className='common-button signup-btn mb-2'>회원가입</button>
              <Link to="/login" className='go-link fl-r'>로그인하러 가기</Link>
            </form>
          </div>
      </div>
    </div>
  )
}

export default SignUpPage