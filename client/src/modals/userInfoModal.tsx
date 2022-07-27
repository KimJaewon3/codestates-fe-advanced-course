import React from 'react';
import styled from 'styled-components';
import { UserInfo } from '../pages/detailPost';

type Props = {
  target: UserInfo;
}

export default function UserInfoModal({ target }: Props) {

  return (
    <StyledUserInfoModal>
      <p>닉네임: {target.username}</p>
      <p>이름: {target.name}</p>
      <p>사이트 주소: {target.website}</p>
      <p>이메일: {target.email}</p>
      <p>전화번호: {target.phone}</p>
    </StyledUserInfoModal>
  );
}

const StyledUserInfoModal = styled.div`
  position: absolute;
`