import axios from 'axios';
import React, { useEffect, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
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
  // posts
  const [posts, setPosts] = useState<Post[]>([]);
  const [filteredPosts, setFilteredPosts] = useState<Post[]>([]);
  // pagination
  const [page, setPage] = useState(1);
  const postLimitOptions = [10, 20, 50, 100];
  const [postLimit, setPostLimit] = useState(10);
  const start = (page - 1) * postLimit;
  const end = start + postLimit;
  const scrollRef = useRef<HTMLDivElement>(null);
  // search
  const [searchValue, setSearchValue] = useState<SearchValue>({
    target: 'title',
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

  useEffect(() => {
    scrollRef.current?.scrollTo(0, 0);
  }, [page]);

  function handlePostClick(post: Post) {
    nav('/detailPost', { state: post });
  }

  function handlePostLimitOption(e: React.ChangeEvent<HTMLSelectElement>) {
    setPostLimit(Number(e.target.value));
  }

  return (
    <StyledAllPost>
      <h1>전체 게시판</h1>

      <div className='all-post-menu'>
        <SearchBar searchValue={searchValue} setSearchValue={setSearchValue}/>

        <label>
          페이지당 게시글 수 &nbsp;
          <select onChange={(e) => handlePostLimitOption(e)}>
            {postLimitOptions.map((value, idx) => (
              <option key={idx}>{value}</option>
            ))}
          </select>
        </label>
      </div>
      
      <div className='all-post-post-table' ref={scrollRef}>
        <table>
          <thead>
            <tr>
              <th>제목</th>
              <th>작성자</th>
            </tr>
          </thead>
          <tbody>
            {filteredPosts.slice(start, end).map(post => (
              <tr key={post.id}>
                <td onClick={() => handlePostClick(post)}>{post.title}</td>
                <td>작성자 {post.userId}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <Pagination 
        contentsCount={filteredPosts.length}
        postLimit={postLimit}
        setPage={setPage}
        page={page}
      />
    </StyledAllPost>
  );
}

const StyledAllPost = styled.div`
  h1 {
    text-align: center;
  }
  .all-post-menu {
    display: flex;
    justify-content: space-between;
    margin: 100px 0 20px 0;
    label {
      font-size: small;
      select {
        padding: 1px;
      }
    }
  }
  .all-post-post-table {
    margin: 20px 0 40px 0;
    height: 60vh;
    overflow-y: scroll;
    ::-webkit-scrollbar {
      width: 5px;
    }
    ::-webkit-scrollbar-thumb{
      height: 30%;
      background-color: black;
      border-radius: 10px;    
    }
    table {
      width: 100%;
      border-collapse: collapse;
      thead {
        position: sticky;
        top: 0;
        background-color: #e6e6e6;
      }
      tr {
        border-bottom: 1px solid #c2c2c2;
        th, td {
          padding: 10px;
        }
        td:first-child {
          width: 90%;
        }
        td:last-child {
          text-align: center;
        }
      }
    }
  }
`;
