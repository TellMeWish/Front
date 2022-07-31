import "../css/createPost.css";
import React, { useState, useEffect, useCallback } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { url } from "../Url";
import axios from "axios";
function UpdatePost() {
  let navigate = useNavigate();
  let { id } = useParams();

  const [item, setItem] = useState("");
  const [isPrivate, setIsPrivate] = useState(0);
  const [isParticipate, setIsParticipate] = useState(0);
  const [category, setCategory] = useState("");
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  useEffect(() => {
    axios.get(`${url}/post/${id}`).then((res) => {
      const post = res.data.post;
      document.getElementById("content").value = post.content;
      setContent(post.content);
      document.getElementById("title").value = post.title;
      setTitle(post.title);
      document.getElementById("category").value = post.category;
      setCategory(post.category);
      document.getElementById("isPrivate").checked = post.isPrivate;
      setIsPrivate(post.isprivate);
      document.getElementById("isParticipate").checked = post.isParticipate;
      setIsParticipate(post.isParticipate);
      console.log(post);
    });
  }, []);
  const submitPost = async (event) => {
    event.preventDefault();
    const config = {
      method: "put",
      url: `${url}/post/${id}`,
      data: {
        userId: 1,
        isPrivate: isPrivate,
        isParticipate: isParticipate,
        category: category,
        title: title,
        content: content,
      },
    };
    await axios(config)
      .then((res) => {
        console.log(res);
        alert("수정 완료");
        navigate("/postList");
      })
      .catch(() => {
        alert("실패");
      });
  };

  return (
    <div className="container">
      <form className="createForm" onSubmit={submitPost}>
        <div className="checkList">
          <div className="checkList">
            <div style={{ marginRight: "20px" }}>
              공개 여부{" "}
              <input
                id="isPrivate"
                type="checkbox"
                name="isPrivate"
                onChange={(e) => {
                  e.target.checked ? setIsPrivate(1) : setIsPrivate(0);
                }}
              />
            </div>
            <div>
              참여 여부{" "}
              <input
                id="isParticipate"
                type="checkbox"
                name="isParticipate"
                onChange={(e) => {
                  e.target.checked ? setIsParticipate(1) : setIsParticipate(0);
                }}
              />
            </div>
          </div>
          <div className="category">
            <select
              id="category"
              onChange={async (e) => {
                setCategory(e.target.value);
              }}
            >
              <option value="">===선택===</option>
              <option value="여행1">여행1</option>
              <option value="여행2">여행2</option>
              <option value="여행3">여행3</option>
              <option value="여행4">여행4</option>
            </select>
          </div>
        </div>
        <div className="formBox">
          <div>제목</div>
          <input
            id="title"
            className="text"
            type="text"
            onChange={(e) => {
              setTitle(e.target.value);
            }}
          ></input>
        </div>
        <div className="formBox" style={{ alignItems: "flex-start" }}>
          <div>내용</div>
          <textarea
            id="content"
            placeholder="여기에 입력하세요"
            onChange={(e) => {
              setContent(e.target.value);
            }}
          ></textarea>
        </div>
        <div className="buttonBox">
          <button type="submit">수정하기</button>
        </div>
      </form>
    </div>
  );
}

export default UpdatePost;
