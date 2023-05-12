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
              <input type="password" className='common-inputs' placeholder='패스워드 확인'/>

              <button className='common-button'>회원가입</button>
            </form>
            <Link to="/login" className='go-link'>로그인하러 가기</Link>
          </div>
      </div>
    </div>
  )
}

export default SignUpPage