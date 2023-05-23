import React, { useRef } from 'react';
import TextareaAutosize from 'react-textarea-autosize';
import { RiSendPlaneFill } from 'react-icons/ri';
import { BiImageAdd } from 'react-icons/bi';

const TalkForm = () => {
  const uploadImageRef = useRef();

  const handleShowUploadRef = () => {
    uploadImageRef.current.click();
  }

  return (
    <div className='talkForm'>
      <div className='talk_input_wrapper'>
        <TextareaAutosize className='talk_header' placeholder='메세지를 작성해주세요.'/>
        <div className='btn_wrapper'>
          <button className='talk_btn'><RiSendPlaneFill /></button>
          <button className='talk_btn' onClick={handleShowUploadRef}><BiImageAdd /></button>
        </div>
      </div>
      <input type="file" accept='images/jpeg, images/png' ref={uploadImageRef} />
    </div>
  )
}

export default TalkForm