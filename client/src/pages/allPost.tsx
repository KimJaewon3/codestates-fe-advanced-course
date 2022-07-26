import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Pagination from '../components/ pagination';

type Post = {
  id: number;
  userId: number;
  title: string;
  body: string;
}

export default function AllPost() {
  const nav = useNavigate();
  const [posts, setPosts] = useState<Post[]>([]);
  const [page, setPage] = useState(1);
  const [postLimit, setPostLimit] = useState(20);
  const start = (page - 1) * postLimit;
  const end = start + postLimit;

  useEffect(() => {
    axios
      .get("https://jsonplaceholder.typicode.com/posts")
      .then(res => {
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
        {posts.slice(start, end).map(post => (
          <li key={post.id}>
            <p onClick={() => handlePostClick(post)}>{post.title}</p>
            <p>작성자 {post.userId}</p>
          </li>
        ))}
      </ul>
      <Pagination 
        contentsCount={posts.length}
        postLimit={postLimit}
        setPage={setPage}
        page={page}
      />
    </div>
  );
}
