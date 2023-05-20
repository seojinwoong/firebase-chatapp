import React, { useState, useRef, useEffect } from 'react';
import defaultProfile from '../../../utils/images/default_profile.png';
import { MdMenu } from 'react-icons/md';
import Dropdown from 'react-bootstrap/Dropdown';
import Modal from 'react-bootstrap/Modal';
import Form from 'react-bootstrap/Form';
import { getAuth, signOut, updateProfile } from 'firebase/auth';
import { useSelector } from 'react-redux';
import { getStorage, uploadBytesResumable, ref as strRef, getDownloadURL } from 'firebase/storage';
import { getDatabase, ref, update, onChildAdded, child, push } from 'firebase/database';
import CustomLoading from '../../../utils/components/CustomLoading'; 
import CustomToast from '../../../utils/components/CustomToast';
import { useTransition, animated } from 'react-spring';
import { defaultAnimation } from '../../../utils/ToastAnimation'; 
import useInput from '../../../utils/hooks/useInput';

let timer;

const MyInfo = () => {
  const auth = getAuth();
  const me = useSelector(state => state.user_reducer.currentUser);
  const [modalShow, setModalShow] = useState(false);
  const [uploadLoading, setUploadLoading] = useState(false);
  const [firstLoad, setFirstLoad] = useState(true);
  const [talkTitle, onChangeTalkTitle, setTalkTitle] = useInput('');
  const [talkDesc, onChangeTalkDesc, setTalkDesc] = useInput('');
  const [uploadResult, setUploadResult] = useState({txt: "", status: 'danger'});
  const [myInfo, setMyInfo] = useState({name: "", image: ""});
  const transition = useTransition(uploadResult, defaultAnimation);
  const chatRoomsRef = ref(getDatabase(), 'chatRooms');

  const uploadImgRef = useRef();

  useEffect(() => {
    onChildAdded(child(ref(getDatabase(), 'users'), me.uid), DataSnapshot => {
      let data = {};
      data[DataSnapshot.key] = DataSnapshot.val();
      setMyInfo(prev => { return {...prev, ...data}});
      setFirstLoad(false);
    });
    return () => {
      if (timer) clearTimeout(timer);
    }
  }, []);

  const handleLogout = () => {
    signOut(auth);
  }
  
  const handleUploadImgClick = () => {
    uploadImgRef.current.click();
  }

  const handleUploadProfile = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    const user = auth.currentUser;

    const metadata = { contentType: file.type };
    const storage = getStorage();

    setUploadLoading(true);
    try {

      let uploadTask = uploadBytesResumable(strRef(storage, `user_image/${me.uid}`), file, metadata);
      uploadTask.then(() => {
        getDownloadURL(uploadTask.snapshot.ref).then(downloadURL => {
          updateProfile(user, {
            photoURL: downloadURL
          });

          update(ref(getDatabase(), `users/${me.uid}`), {image: downloadURL});
        })
      });
      setUploadResult({txt: "프로필 사진 변경 완료!", status: 'success'});
      setUploadLoading(false);
    } catch (error) {
      setUploadResult({txt: "프로필 사진 변경과정 중 오류가 발생했습니다!", status: 'danger'});
      setUploadLoading(false);
    } finally {
      if (timer) clearTimeout(timer);
      timer = setTimeout(() => {
        setUploadResult({txt: "", status: 'danger'});
      }, 2000);
    }
  }

  const renderProfileImg = () => {
    if (firstLoad) return myInfo?.image || defaultProfile
    else return me?.photoURL || defaultProfile
  }

  const handleOpenModal = () => setModalShow(true);
  const handleHideModal = () => setModalShow(false);

  const isFormValid = (name, description) => name && description;

  const addChatRoom = async () => {
    const key = push(chatRoomsRef).key;
    const newChatRoom = {
      id: key,
      name: talkTitle,
      description: talkDesc,
      createdBy: {
        name: me.displayName,
        image: me.photoURL
      }
    }

    try {
      await update(child(chatRoomsRef, key), newChatRoom);
      
      setUploadResult({txt: "공개톡방 생성완료!", status: 'success'});
      setTalkTitle('');
      setTalkDesc('');
      setModalShow(false);
      
    } catch (error) {
      setUploadResult({txt: "공개톡방 생성과정 중 오류가 발생했습니다!", status: 'danger'});
    } finally {
      if (timer) clearTimeout(timer);
      timer = setTimeout(() => {
        setUploadResult({txt: "", status: 'danger'});
      }, 2000);
    }
  }
  
  const handleCreateTalk = (e) => {
    e.preventDefault();
    if ( isFormValid(talkTitle, talkDesc) ) addChatRoom();
  }

  return (
    <div className='myInfo'>
      <img className="my-profile profile-thumb" src={renderProfileImg()} alt="내 프로필 이미지"/>
      <p className='my-profile-name'>
        <span className="name">{myInfo?.name || null}</span>
        <span className="email">{me ? me.email : null}</span>
      </p>

      <Dropdown className="my-info-menu">
        <Dropdown.Toggle>
          <MdMenu className='menu-ico'/>
        </Dropdown.Toggle>

        <Dropdown.Menu align="end">
          <Dropdown.Item onClick={handleUploadImgClick}>프로필 사진 변경</Dropdown.Item>
          <Dropdown.Item onClick={handleOpenModal}>공개톡방 만들기</Dropdown.Item>
          <Dropdown.Item onClick={handleLogout}>로그아웃</Dropdown.Item>
        </Dropdown.Menu>
      </Dropdown>
      <Modal
          show={modalShow}
          aria-labelledby="contained-modal-title-vcenter"
          centered
        >
          <Modal.Header>
            <Modal.Title id="contained-modal-title-vcenter">
              공개톡방 만들기
            </Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <Form onSubmit={handleCreateTalk}>
              <Form.Group className="mb-3">
                <Form.Label>공개톡방 이름</Form.Label>
                <Form.Control 
                  value={talkTitle}
                  onChange={onChangeTalkTitle}
                  type="text" placeholder="공개톡방 이름을 작성해주세요." />
              </Form.Group>
              <Form.Group className="mb-3">
                <Form.Label>공개톡방 상세설명</Form.Label>
                <Form.Control 
                  value={talkDesc}
                  onChange={onChangeTalkDesc}
                  as="textarea" placeholder="공개톡방 상세설명을 작성해주세요." />
              </Form.Group>
            </Form>
          </Modal.Body>
          <Modal.Footer>
             <button className="common-button" onClick={handleCreateTalk}>공개톡방 생성</button>
             <button className="common-button" onClick={handleHideModal}>닫기</button>
          </Modal.Footer>
        </Modal>

      <input type="file" accept='images/jpeg, image/png' ref={uploadImgRef} onChange={handleUploadProfile}/>
      {uploadLoading && <CustomLoading/>}
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

export default MyInfo