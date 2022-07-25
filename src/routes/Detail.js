import React, { useState, useEffect, useCallback } from "react";
import { useInView } from "react-intersection-observer";
import styled from "styled-components";
import axios from "axios";
import { useParams, useNavigate } from "react-router-dom";

function Detail() {
  const navigate = useNavigate();

  let { id } = useParams();
  const [post, setPost] = useState("");
  const getItem = () => {
    axios.get(`http://13.209.145.95:8081/post/${id}`).then((res) => {
      setPost(res.data.post);
    });
  };

  useEffect(() => {
    getItem();
  }, [getItem]);

  const deletePost = () => {
    axios.delete(`http://13.209.145.95:8081/post/${id}`).then(() => {
      alert("삭제되었습니다.");
      navigate("/postList");
    });
  };
  return (
    <div>
      <div>{post.title}</div>
      <div>{post.content}</div>
      <div>{post.category}</div>
      <button
        onClick={() => {
          navigate(`/updatePost/${id}`);
        }}
      >
        수정
      </button>
      <button
        onClick={() => {
          deletePost();
        }}
      >
        삭제
      </button>
    </div>
  );
}

export default Detail;
