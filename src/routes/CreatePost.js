import "../css/createPost.css";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
function CreatePost() {
  let navigate = useNavigate();

  const [isPrivate, setIsPrivate] = useState(0);
  const [isParticipate, setIsParticipate] = useState(0);
  const [category, setCategory] = useState("");
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const submitPost = async (event) => {
    event.preventDefault();
    const config = {
      method: "post",
      url: `http://13.209.145.95:8081/post`,
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
        alert("등록 완료");
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
              onChange={(e) => {
                setCategory(e.target.value);
              }}
            >
              <option value="" selected>
                ===선택===
              </option>
              <option>여행1</option>
              <option>여행2</option>
              <option>여행3</option>
              <option>여행4</option>
            </select>
          </div>
        </div>
        <div className="formBox">
          <div>제목</div>
          <input
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
            placeholder="여기에 입력하세요"
            onChange={(e) => {
              setContent(e.target.value);
            }}
          ></textarea>
        </div>
        <div className="buttonBox">
          <button type="submit">등록하기</button>
          <button>초기화하기</button>
        </div>
      </form>
      <button
        onClick={() => {
          const data = {
            userId: 0,
            isPrivate: isPrivate,
            isParticipate: isParticipate,
            category: category,
            title: title,
            content: content,
          };
          console.log(data);
        }}
      >
        ooo
      </button>
    </div>
  );
}

export default CreatePost;
