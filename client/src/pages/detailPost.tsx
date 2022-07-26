import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import { Post } from './allPost';

type Comments = {
  id: number;
  postId: number;
  name: string;
  email: string;
  body: string;
}

export default function DetailPost() {
  const location = useLocation();
  const currentPost = location.state as Post;
  const [comments, setComments] = useState<Comments[]>([]);

  useEffect(() => {
    axios
      .get(`https://jsonplaceholder.typicode.com/comments?postId=${currentPost.id}`)
      .then(res => {
        setComments(res.data);
      })
      .catch(err => {
        console.log(err.message);
      });
  }, []);
  
  return (
    <div>
      <h2>{currentPost.title}</h2>
      <p>작성자 {currentPost.userId}</p>
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
