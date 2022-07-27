import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import UserInfoModal from '../modals/userInfoModal';
import { Post } from './allPost';

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
    <div>
      <h2>{currentPost.title}</h2>
      
      <div>
        <p>작성자 {currentPost.userId}</p>
        <div onClick={() => setIsUserInfoModalOpen(!isUserInfoModalOpen)}>
          {isUserInfoModalOpen ? (
            <div>
              <p>down</p>
              <UserInfoModal 
                target={userInfo.filter(info => info.id === currentPost.userId)[0]}
                setIsUserInfoModalOpen={setIsUserInfoModalOpen}
              />
            </div>
          ) : (
            <div>
              <p>up</p>
            </div>
          )}
        </div>
      </div>

      <hr/>

      <p>{currentPost.body}</p>
      <hr/>

      <div>
        <span>댓글 {comments.length}개</span>
        <ul>
          {comments.map(comment => (
            <li key={comment.id}>
              <p>{comment.name}</p>
              <p>{comment.body}</p>
            </li>
          ))}
        </ul>
      </div>

    </div>
  );
}
