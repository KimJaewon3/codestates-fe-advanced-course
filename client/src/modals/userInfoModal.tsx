import React from 'react';
import styled from 'styled-components';
import { UserInfo } from '../pages/detailPost';

type Props = {
  target: UserInfo;
  setIsUserInfoModalOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

export default function UserInfoModal({ target, setIsUserInfoModalOpen }: Props) {

  return (
    <StyledUserInfoModal>
      <div>
        <p>닉네임: {target.username}</p>
        <p>이름: {target.name}</p>
        <p>사이트 주소: {target.website}</p>
        <p>이메일: {target.email}</p>
        <p>전화번호: {target.phone}</p>
      </div>
      <div className='modal-background' onClick={() => setIsUserInfoModalOpen(false)}></div>
    </StyledUserInfoModal>
  );
}

const StyledUserInfoModal = styled.div`
  position: absolute;
  .modal-background {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-color: white;
    opacity: 0;
  }
`