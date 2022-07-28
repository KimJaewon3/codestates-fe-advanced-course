import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import UserInfoModal from '../modals/userInfoModal';
import { Post } from './allPost';
import { IoIosArrowForward, IoIosArrowBack } from "react-icons/io";
import styled from 'styled-components';

type Comments = {
  id: number;
  postId: number;
  name: string;
  email: string;
  body: string;
}

export type UserInfo = {
  id: number;
  name: string;
  username: string;
  website: string;
  email: string;
  phone: string;
}

export default function DetailPost() {
  const location = useLocation();
  const currentPost = location.state as Post;
  const [comments, setComments] = useState<Comments[]>([]);
  const [userInfo, setUserInfo] = useState<UserInfo[]>([]);
  const [isUserInfoModalOpen, setIsUserInfoModalOpen] = useState(false);

  useEffect(() => {
    axios
      .get(`https://jsonplaceholder.typicode.com/comments?postId=${currentPost.id}`)
      .then(res => {
        setComments(res.data);
      })
      .catch(err => {
        console.log(err.message);
      });
    axios
      .get(`https://jsonplaceholder.typicode.com/users`)
      .then(res => {
        setUserInfo(res.data);
      })
      .catch(err => {
        console.log(err.message);
      });
  }, []);

  return (
    <StyledDetailPost>
      <h2>{currentPost.title}</h2>
      
      <div className='detail-post-writer'>
        <div>작성자 {currentPost.userId}</div>
        <div onClick={() => setIsUserInfoModalOpen(!isUserInfoModalOpen)} className='detail-post-writer-modal-wrap'>
          {isUserInfoModalOpen ? (
            <div>
              <IoIosArrowBack />
              <UserInfoModal 
                target={userInfo.filter(info => info.id === currentPost.userId)[0]}
                setIsUserInfoModalOpen={setIsUserInfoModalOpen}
              />
            </div>
          ) : (
            <div>
              <IoIosArrowForward />
            </div>
          )}
        </div>
      </div>

      <div className='detail-post-body'>
        <p>{currentPost.body}</p>
      </div>

      <div className='detail-post-comments'>
        <span>댓글 {comments.length}개</span>
        <ul>
          {comments.map(comment => (
            <li key={comment.id}>
              <div>{comment.name}</div>
              <div>{comment.body}</div>
            </li>
          ))}
        </ul>
      </div>

    </StyledDetailPost>
  );
}

const StyledDetailPost = styled.div`
  .detail-post-writer {
    display: flex;
    align-items: center;
    border-bottom: 1px solid #b3b3b3;
    padding-bottom: 2em;
    .detail-post-writer-modal-wrap{
      margin-left: 1em;
      > div {
        display: flex;
      }
    }
  }
  .detail-post-body {
    border-bottom: 1px solid #b3b3b3;
    height: 30vh;
    overflow-y: scroll;
    ::-webkit-scrollbar {
      width: 5px;
    }
    ::-webkit-scrollbar-thumb{
      height: 30%;
      background-color: black;
      border-radius: 10px;    
    }
  }
  .detail-post-comments{
    padding-top: 2em;
    ul {
      list-style: none;
      padding: 0;
      li {
        border: 2px solid black;
        border-radius: 15px;
        margin: 20px 0 20px 0;
        >:first-child {
          border-bottom: 2px solid black;
          border-radius: 12px 12px 0 0;
          background-color: #dcdcdc;
        }
        div {
          padding: 0.5em;
        }
      }
    }
  }
  svg {
    display: block;
  }
`;
