import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Pagination from '../components/ pagination';
import SearchBar from '../components/searchBar';

export type Post = {
  id: number;
  userId: number;
  title: string;
  body: string;
}

export type SearchValue = {
  target: 'userId' | 'title';
  value: string;
}

export default function AllPost() {
  const nav = useNavigate();
  const [posts, setPosts] = useState<Post[]>([]);
  const [filteredPosts, setFilteredPosts] = useState<Post[]>([]);

  const [page, setPage] = useState(1);
  const postLimitOptions = [10, 20, 50, 100];
  const [postLimit, setPostLimit] = useState(10);
  const start = (page - 1) * postLimit;
  const end = start + postLimit;

  const [searchValue, setSearchValue] = useState<SearchValue>({
    target: 'userId',
    value: '',
  });

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

  useEffect(() => {
    setFilteredPosts(
      posts.filter(post => {
        return String(post[searchValue.target]).includes(searchValue.value);
      })
    );
  }, [posts, searchValue]);

  useEffect(() => {
    setPage(1);
  }, [filteredPosts, postLimit]);

  function handlePostClick(post: Post) {
    nav('/detailPost', { state: post });
  }

  function handlePostLimitOption(e: React.ChangeEvent<HTMLSelectElement>) {
    setPostLimit(Number(e.target.value));
  }

  return (
    <div>
      <h1>전체 게시판</h1>

      <SearchBar searchValue={searchValue} setSearchValue={setSearchValue}/>

      <div>
        <select onChange={(e) => handlePostLimitOption(e)}>
          {postLimitOptions.map((value, idx) => (
            <option key={idx}>{value}</option>
          ))}
        </select>
      </div>

      <ul>
        {filteredPosts.slice(start, end).map(post => (
          <li key={post.id}>
            <p onClick={() => handlePostClick(post)}>{post.title}</p>
            <p>작성자 {post.userId}</p>
          </li>
        ))}
      </ul>

      <Pagination 
        contentsCount={filteredPosts.length}
        postLimit={postLimit}
        setPage={setPage}
        page={page}
      />
    </div>
  );
}
