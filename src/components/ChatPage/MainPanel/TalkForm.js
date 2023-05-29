import React, { useState, useRef } from 'react';
import TextareaAutosize from 'react-textarea-autosize';
import { RiSendPlaneFill } from 'react-icons/ri';
import { BiImageAdd } from 'react-icons/bi';
import CustomToast from '../../../utils/components/CustomToast';
import { useTransition, animated } from 'react-spring';
import { defaultAnimation } from '../../../utils/ToastAnimation'; 
import { getDatabase, ref, set, push, child, remove } from 'firebase/database';
import { getStorage, ref as strRef, uploadBytesResumable, getDownloadURL } from 'firebase/storage';
import { useSelector } from 'react-redux';
import OverlayTrigger from 'react-bootstrap/OverlayTrigger';
import Tooltip from 'react-bootstrap/Tooltip';
import ProgressBar from 'react-bootstrap/ProgressBar';

let timer;

const TalkForm = ({chatRoom}) => {
  const me = useSelector(state => state.user_reducer.currentUser);
  const isPrivateChatRoom = useSelector(state => state.chatRoom_reducer.isPrivateChatRoom);
  const uploadImageRef = useRef();
  const [sendLoading, setSendLoading] = useState(false);
  const [percentage, setPercentage] = useState(0);
  const [uploadResult, setUploadResult] = useState({txt: "", status: 'danger'});
  const [talkCon, setTalkCon] = useState('');
  const transition = useTransition(uploadResult, defaultAnimation);
  const messagesRef = ref(getDatabase(), 'messages');

  const handleShowUploadRef = () => {
    uploadImageRef.current.click();
  }

  const handleTalkConChange = (e) => {
    setTalkCon(e.target.value);
  }

  const handleKeyDown = (e) => {
    if (e.ctrlKey && e.keyCode == 13 ) {
      handleSubmit();
    }
  }

  const isContinuous = () => {
    const lastMessage = document.querySelector('.last_message');
    if (lastMessage) {
      return me.uid === lastMessage.dataset.messageid ? false : true; 
    } else {
      return true;
    }
  }

  const createMessage = (fileUrl = null) => {
    const message = {
      isProfileView: isContinuous(),
      timestamp: "" + new Date(),
      userId: me.uid,
      userName: me.displayName,
      userPhoto: me.photoURL
    }

    if (fileUrl !== null) {
      message['image'] = fileUrl;
    } else {
      message['content'] = talkCon;
    }

    return message;
  } 

  const handleSubmit = async () => {
    if (!(talkCon.trim())) return;

    setSendLoading(true);

    try {

      await set(push(child(messagesRef, chatRoom.id)), createMessage());
      setSendLoading(false);
      setTalkCon(''); 
    } catch (error) {
      setUploadResult({txt: "메세지 전송과정 중 오류가 발생했습니다!", status: 'danger'});
      setSendLoading(false);
    } finally {
      if (timer) clearTimeout(timer);
      timer = setTimeout(() => {
        setUploadResult({txt: "", status: 'danger'});
      }, 2000);
    }
  }

  const clearResult = () => {
    if (timer) clearTimeout(timer);
    timer = setTimeout(() => {
      setUploadResult({txt: "", status: 'danger'});
    }, 2000);
  }

  const getPath = () => {
    if (isPrivateChatRoom) return `/message/private/${chatRoom.id}`
    else return `message/public`
  }

  const handleUploadImage = (e) => {
    const file = e.target.files[0];
    if (!file) return;

    const storage = getStorage();
    const filePath = `${getPath()}/${file.name}`;
    const metadata = { contentType: file.type };
    
    setSendLoading(true);

    try {
      const storageRef = strRef(storage, filePath);
      const uploadTask = uploadBytesResumable(storageRef, file, metadata);

      uploadTask.on('state_changed', (snapshot) => {
        const progress = Math.round((snapshot.bytesTransferred / snapshot.totalBytes) * 100);
        setPercentage(progress);
      }, (error) => {
        setUploadResult({txt: "이미지 전송과정 중 오류가 발생했습니다!", status: 'danger'});
        console.log(error.message);
      }, async () => {
        getDownloadURL(uploadTask.snapshot.ref).then(downloadURL => {
          set(push(child(messagesRef, chatRoom.id)), createMessage(downloadURL));
        });
        await setUploadResult({txt: "이미지 전송완료!", status: 'success'});
        clearResult();
        setSendLoading(false);
      });
    } catch (error) {
      setSendLoading(false);
      setUploadResult({txt: "이미지 전송과정 중 오류가 발생했습니다!", status: 'danger'});
      console.log(error.message);
    } 
  }

  return (
    <div className='talkForm'>
      <div className='talk_input_wrapper'>
        <TextareaAutosize 
          cacheMeasurements
          className='talk_header' 
          placeholder='메세지를 작성해주세요.' 
          onChange={handleTalkConChange} 
          onKeyDown={handleKeyDown}
          value={talkCon}
        />
        <div className='btn_wrapper'>
          <OverlayTrigger
            placement="top" 
            overlay={ <Tooltip>"Ctrl + Enter"로도 가능합니다</Tooltip> }
          >
            <button className='talk_btn' disabled={sendLoading} onClick={handleSubmit}><RiSendPlaneFill /></button>
          </OverlayTrigger>
          <OverlayTrigger
            placement="top" 
            overlay={ <Tooltip>이미지 업로드</Tooltip> }
          >
            <button className='talk_btn' disabled={sendLoading} onClick={handleShowUploadRef}><BiImageAdd /></button>
          </OverlayTrigger>
        </div>
      </div>
      <input type="file" accept='images/jpeg, images/png' ref={uploadImageRef} onChange={handleUploadImage}/>

      {transition((style, item) => (
        item.txt !== "" 
        ? <animated.div className="toastWrap" style={style} >
            <CustomToast item={item}/>
          </animated.div>
        : null
      ))}
      {
        !(percentage === 0 || percentage === 100) &&
        <div className='progress_wrapper'>
          <ProgressBar animated now={percentage} label={`${percentage}%`}/>
        </div>
      }
    </div>
  )
}

export default TalkForm