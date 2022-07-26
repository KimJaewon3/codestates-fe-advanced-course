import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import { Post } from './allPost';

type PostInfo = {
  id: number;
  postId: number;
  name: string;
  email: string;
  body: string;
}

export default function DetailPost() {
  const location = useLocation();
  const post = location.state as Post;
  const [comments, setComments] = useState<PostInfo[]>([]);

  useEffect(() => {
    axios
      .get(`https://jsonplaceholder.typicode.com/comments?postId=${post.id}`)
      .then(res => {
        console.log(post)
        console.log(res.data)
        setComments(res.data);
      })
  }, []);
  
  return (
    <div>
      <h2>{post.title}</h2>
      <p>작성자 {post.userId}</p>
      <hr/>

      <p>{post.body}</p>
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
