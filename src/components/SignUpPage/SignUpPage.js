import React, { useState, useRef, useEffect } from 'react';
import './SignUpPage.css';
import { IoIosWarning } from 'react-icons/io';
import defaultProfile from '../../utils/images/default_profile.png';
import { Link } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import Spinner from 'react-bootstrap/Spinner';
import { getAuth, createUserWithEmailAndPassword, updateProfile } from 'firebase/auth';
import { getDatabase, ref, set } from 'firebase/database';
import { getStorage, ref as strRef, uploadBytesResumable, getDownloadURL } from 'firebase/storage';
import { defaultAnimation } from '../../utils/ToastAnimation'; 
import { useTransition, animated } from 'react-spring';
import CustomToast from '../../utils/components/CustomToast';

let timer;

const SignUpPage = () => {
  const [submitLoading, setSubmitLoading] = useState(false);
  const [uploadLoading, setUploadLoading] = useState(false);
  const [uploadedImgUrl, setUploadedImgUrl] = useState('');
  const [errorFromSubmit, setErrorFromSubmit] = useState({txt: "", status: 'danger'});
  const transition = useTransition(errorFromSubmit, defaultAnimation);

  useEffect(() => {
    return () => {
      if (timer) clearTimeout(timer);
    }
  }, []);

  const { register, watch, formState: { errors }, handleSubmit } = useForm({mode: 'onChange'});
  const uploadImgRef = useRef();
  const password = useRef();
  password.current = watch('password');
  
  const handleUploadImgClick = () => {
    uploadImgRef.current.click();
  }

  const handleUploadProfile = async (e) => {
    const file = e.target.files[0];
    if (file) {
      const metadata = { contentType: file.type };
      const storage = getStorage();
  
      setUploadLoading(true);
  
      try {
        const uploadTask = uploadBytesResumable(strRef(storage, `profileUpload/${file.lastModified}${file.name}`), file, metadata);
        uploadTask.then(() => {
          getDownloadURL(uploadTask.snapshot.ref).then(downloadURL => {
            setUploadedImgUrl(downloadURL);
          });
        })
        setUploadLoading(false);
  
      } catch (error) {
        alert('프로필 이미지 업로드 도중 오류가 발생하였습니다!');
        console.error(error.message);
        setUploadLoading(false);
  
      }
    } else {
      setUploadedImgUrl("");
    }
  }

  const onSubmit = async (data) => {
    try {
      setSubmitLoading(true);

      const auth = getAuth();
      const createdUser = await createUserWithEmailAndPassword(auth, data.email, data.password);
      let updateInfo = { displayName: data.name };
      if (uploadedImgUrl) updateInfo.photoURL = uploadedImgUrl

      await updateProfile(auth.currentUser, updateInfo);

      set(ref(getDatabase(), `/users/${createdUser.user.uid}`), {
        name: createdUser.user.displayName,
        image: createdUser.user.photoURL,
      });

      setSubmitLoading(false);

    } catch (error) {
      switch (error.code) {
        case 'auth/email-already-in-use':
          setErrorFromSubmit(prev => {return {...prev, txt: "이미 사용중인 이메일입니다!"}})
          break;
        case 'auth/network-request-failed':
          setErrorFromSubmit(prev => {return {...prev, txt: "network request failed 😭"}})
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
    <div id="signUpPage" className='common-signup-page'>
      <div className='page-container'>
          <div className='inner'>
            <h2 className='title'>회원가입</h2>
            <form onSubmit={handleSubmit(onSubmit)}>
              <input type="email" className='common-inputs mb-3' placeholder='이메일'
                name="email" { ...register('email', { required: true, pattern: /^\S+@\S+$/i }) }
              />
              { errors.email && errors.email.type === 'required' && <p className='warning'><IoIosWarning /> 이메일은 필수입력 값입니다.</p>}
              { errors.email && errors.email.type === 'pattern' && <p className='warning'><IoIosWarning /> 유효하지 않은 이메일 형식입니다.</p>}

              <input type="text" className='common-inputs mb-3' placeholder='이름'
                name="name" { ...register('name', { required: true, maxLength: 10 }) }
              />
              { errors.name && errors.name.type === 'required' && <p className='warning'><IoIosWarning /> 이름은 필수입력 값입니다.</p>}
              { errors.name && errors.name.type === 'maxLength' && <p className='warning'><IoIosWarning /> 이름은 최대 10자까지 입력 가능합니다.</p>}

              <input type="password" className='common-inputs mb-3' placeholder='비밀번호'
                name="password" { ...register('password', { required: true, minLength: 6 }) }
              />
              { errors.password && errors.password.type === 'required' && <p className='warning'><IoIosWarning /> 비밀번호는 필수입력 값입니다.</p>}
              { errors.password && errors.password.type === 'minLength' && <p className='warning'><IoIosWarning /> 비밀번호는 최소 6자 이상 입력하셔야 합니다.</p>}

              <input type="password" className='common-inputs mb-4' placeholder='비밀번호 확인'
                name="password_confirm" { ...register('password_confirm', {required: true, validate: value => value === password.current}) }
              />
              { errors.password_confirm && errors.password_confirm.type === 'required' && <p className='warning'><IoIosWarning /> 비밀번호 확인은 필수입력 값입니다.</p>}
              { errors.password_confirm && errors.password_confirm.type === 'validate' && <p className='warning'><IoIosWarning /> 비밀번호가 일치하지 않습니다.</p>}

              <div className='upload-user-profile-wrap'>
                <p>프로필 이미지</p>
                <div className='profile-row'>
                  <img className='profile-img' alt="프로필 이미지" 
                    src={uploadedImgUrl !== "" ? uploadedImgUrl : defaultProfile}
                  />
                  <button disabled={uploadLoading} type="button" className='common-button upload-btn' onClick={handleUploadImgClick}>
                    {uploadLoading ? <Spinner animation="border" variant="light" /> : '사진 업로드'}
                  </button>
                  <input type="file" accept='images/jpeg, image/png' ref={uploadImgRef} onChange={handleUploadProfile}/>
                </div>
              </div>

              <button disabled={submitLoading} className='common-button signup-btn mb-2'>
                { submitLoading ? <Spinner animation="border" variant="light" /> : '제출' }
              </button>
              <div className='go-link-wrap mb-4'>
                <p className='question'>이미 아이디가 있으신가요?</p>
                <Link to="/login" className='go-link'>로그인하러 가기</Link>
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

export default SignUpPage