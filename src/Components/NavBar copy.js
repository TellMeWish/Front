import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { url } from "../Url";
import axios from "axios";
import styled from "styled-components";

let Menu = styled.div`
  cursor: pointer;
  margin-left: 40px;
`;
let Category = styled.div`
  height: 30px;
  display: flex;
  align-items: center;
  cursor: pointer;
  &:hover {
    font-size: 15px;
  }
`;
let Select = styled.select`
  width: 78px;
  height: 33px;
  border: none;
  padding-left: 5px;
  border-radius: 0px;
  left: 80px;
  top: 3px;
  position: relative;
  &:focus {
    outline: none;
  }
`;
function NavBar() {
  const token = localStorage.getItem("token");
  const navigate = useNavigate();
  const [showcategory, setshowCategory] = useState(0);
  const [category, setCategory] = useState("");
  const [keyword, setKeyword] = useState("");
  return (
    <div className="nav_bar">
      <Menu
        onClick={() => {
          navigate("/");
        }}
        style={{ fontSize: "50px", margin: "0 20px" }}
      >
        소원을말해봐
      </Menu>
      <div style={{ display: "flex", alignItems: "center" }}>
        <div>
          <div className="searchBox">
            <Select
              onChange={(e) => {
                setCategory(e.target.value);
              }}
            >
              <option value="" selected>
                전체
              </option>
              <option value="여행">여행</option>
              <option value="운동">운동</option>
              <option value="공부">공부</option>
              <option value="음식">음식</option>
              <option value="취미">취미</option>
              <option value="갖고싶은것">갖고싶은것</option>
            </Select>
            <input
              onChange={(e) => {
                setKeyword(e.target.value);
              }}
              style={{ width: "500px", height: "40px", marginBottom: "20px", paddingLeft: "90px" }}
              placeholder="ooo 여행"
            ></input>
            <button
              onClick={() => {
                navigate(`/postList/${category}/${keyword}`);
                window.location.reload();
              }}
              style={{ width: "75px", height: "40px", border: "none", background: "var(--color-light-green)", marginLeft: "10px" }}
            >
              검색
            </button>
          </div>
          <div style={{ display: "flex", fontSize: "13px" }}>
            <Menu
              onClick={() => {
                navigate("/postList");
                window.location.reload();
              }}
            >
              버킷리스트 목록
            </Menu>
            <div style={{ position: "relative" }}>
              <Menu
                onClick={(e) => {
                  if (showcategory) {
                    e.target.style.borderBottom = "none";
                    setshowCategory(0);
                  } else {
                    e.target.style.borderBottom = "1px solid black";
                    setshowCategory(1);
                  }
                }}
              >
                카테고리 v
              </Menu>
              {showcategory ? (
                <div
                  style={{
                    position: "fixed",
                    top: "150px",
                    width: "90px",
                    borderRadius: "4px",
                    border: "1px solid black",
                    background: "white",
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                    marginLeft: "20px",
                  }}
                >
                  <Category>여행</Category>
                  <Category>운동</Category>
                  <Category>공부</Category>
                  <Category>음식</Category>
                  <Category>취미</Category>
                  <Category>갖고싶은것</Category>
                  <Category>기타</Category>
                </div>
              ) : null}
            </div>
            <Menu
              onClick={() => {
                navigate("/createPost");
              }}
            >
              버킷리스트 등록
            </Menu>
          </div>
        </div>
        {!localStorage.getItem("token") ? (
          <div className="userBox">
            <Menu
              onClick={() => {
                navigate("/login");
              }}
            >
              로그인
            </Menu>
            <Menu
              onClick={() => {
                navigate("/signUp");
              }}
            >
              회원가입
            </Menu>
          </div>
        ) : (
          <div className="userBox">
            <Menu
              onClick={() => {
                navigate("/profile");
              }}
            >
              프로필
            </Menu>
            <Menu
              onClick={() => {
                localStorage.clear();
                navigate("/");
                window.location.reload();
              }}
            >
              로그아웃
            </Menu>
          </div>
        )}
      </div>
    </div>
  );
}
export default NavBar;
