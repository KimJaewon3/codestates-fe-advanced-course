import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

type Post = {
  id: number;
  userId: number;
  title: string;
  body: string;
}

export default function AllPost() {
  const nav = useNavigate();
  const [posts, setPosts] = useState<Post[]>([]);

  useEffect(() => {
    axios
      .get("https://jsonplaceholder.typicode.com/posts")
      .then(res => {
        console.log(res.data);
        setPosts(res.data);
      })
      .catch(err => {
        console.log(err.message);
      });
  }, []);

  function handlePostClick(post: Post) {
    nav('/post', { state: post });
  }
  
  return (
    <div>
      <h1>전체 게시판</h1>
      <ul>
        <li>
          <p>제목</p>
          <p>작성자</p>
        </li>
        {posts.map(post => (
          <li key={post.id} onClick={() => handlePostClick(post)}>
            <p>{post.title}</p>
            <p>작성자 {post.userId}</p>
          </li>
        ))}
      </ul>
    </div>
  );
}
