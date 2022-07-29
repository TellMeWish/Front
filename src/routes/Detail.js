import React, { useState, useEffect, useCallback } from "react";
import axios from "axios";
import styled from "styled-components";
import { useParams, useNavigate } from "react-router-dom";
import { url } from "../Url";
import "../css/Detail.css";

let Postbox = styled.div`
  width: 1200px;
  background: var(--color-skin);
  margin-top: 50px;
  padding: 50px;
  display: flex;
`;
let PostContentBox = styled.div`
  width: 500px;
  height: 500px;
`;

let Postimg = styled.img`
  width: 500px;
  height: 500px;
  background: #fff;
  object-fit: contain;
  margin-right: 100px;
`;

function Detail() {
  const navigate = useNavigate();

  let { id } = useParams();
  const [post, setPost] = useState("");
  const getItem = () => {
    axios.get(`${url}/post/${id}`).then((res) => {
      setPost(res.data.post);
    });
  };

  useEffect(() => {
    getItem();
  }, [getItem]);

  const deletePost = () => {
    axios.delete(`${url}/post/${id}`).then(() => {
      alert("삭제되었습니다.");
      navigate("/postList");
    });
  };
  return (
    <div style={{ display: "flex", justifyContent: "center" }}>
      <Postbox>
        <Postimg src="/img/noimage.png"></Postimg>
        <PostContentBox>
          <div style={{ borderBottom: "2px solid black", paddingBottom: "10px" }}>
            <div style={{ fontSize: "50px" }}>{post.title}</div>
            <div className="postCategory">카테고리 : {post.category}</div>
          </div>
          <div className="postContent" style={{ height: "300px", marginTop: "10px" }}>
            {post.content}
          </div>
          <div style={{ display: "flex" }}>
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
        </PostContentBox>
      </Postbox>
    </div>
  );
}

export default Detail;
