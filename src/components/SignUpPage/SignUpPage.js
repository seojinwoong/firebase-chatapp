import React, { useState, useRef } from 'react';
import './SignUpPage.css';
import { IoIosWarning } from 'react-icons/io';
import defaultProfile from '../../utils/images/default_profile.png';
import { Link } from 'react-router-dom';

const SignUpPage = () => {

  const uploadImgRef = useRef();
  
  const handleUploadImgClick = () => {
    uploadImgRef.current.click();
  }

  return (
    <div id="signUpPage" className='common-signup-page'>
      <div className='page-container'>
          <div className='inner'>
            <h2 className='title'>회원가입</h2>
            <form>
              <input type="text" className='common-inputs mb-3' placeholder='이메일'/>
              {/* <p className='warning'><IoIosWarning /> 에베베</p> */}
              <input type="text" className='common-inputs mb-3' placeholder='이름'/>
              <input type="password" className='common-inputs mb-3' placeholder='패스워드'/>
              <input type="password" className='common-inputs mb-4' placeholder='패스워드 확인'/>

              {/*  upload-user-profile-wrap start */}
              <div className='upload-user-profile-wrap'>
                <p>프로필 이미지</p>
                <div className='profile-row'>
                  <img className='profile-img' src={defaultProfile} alt="프로필 이미지" />
                  <button type="button" className='common-button upload-btn' onClick={handleUploadImgClick}>사진 업로드</button>
                  <input type="file" accept='images/jpeg, image/png' ref={uploadImgRef} />
                </div>
              </div>
              {/*  upload-user-profile-wrap end */}

              <button className='common-button signup-btn mb-2'>제출</button>
              <div className='go-link-wrap mb-4'>
                <p className='question'>이미 아이디가 있으신가요?</p>
                <Link to="/login" className='go-link'>로그인하러 가기</Link>
              </div>
            </form>
          </div>
      </div>
    </div>
  )
}

export default SignUpPage