import React, { useState, useRef } from 'react';
import TextareaAutosize from 'react-textarea-autosize';
import { RiSendPlaneFill } from 'react-icons/ri';
import { BiImageAdd } from 'react-icons/bi';
import CustomToast from '../../../utils/components/CustomToast';
import { useTransition, animated } from 'react-spring';
import { defaultAnimation } from '../../../utils/ToastAnimation'; 
import { getDatabase, ref, set, push, child, remove } from 'firebase/database';
import { useSelector } from 'react-redux';

let timer;

const TalkForm = ({chatRoom}) => {
  const me = useSelector(state => state.user_reducer.currentUser);
  const uploadImageRef = useRef();
  const [sendLoading, setSendLoading] = useState(false);
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

  const createMessage = (fileUrl = null) => {
    const message = {
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
          <button className='talk_btn' disabled={sendLoading} onClick={handleSubmit}><RiSendPlaneFill /></button>
          <button className='talk_btn' disabled={sendLoading} onClick={handleShowUploadRef}><BiImageAdd /></button>
        </div>
      </div>
      <input type="file" accept='images/jpeg, images/png' ref={uploadImageRef} />

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

export default TalkForm