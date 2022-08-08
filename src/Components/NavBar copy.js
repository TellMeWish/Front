import { useNavigate } from "react-router-dom";
import { useState } from "react";
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
function NavBar() {
  const navigate = useNavigate();
  const [category, setCategory] = useState(0);
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
          <div className="searchBox" style={{ marginTop: "33px" }}>
            <input style={{ width: "500px", height: "40px", marginLeft: "20px", marginBottom: "20px" }}></input>
            <button style={{ width: "75px", height: "40px", border: "none", background: "var(--color-light-green)", marginLeft: "10px" }}>검색</button>
          </div>
          <div style={{ display: "flex", fontSize: "13px" }}>
            <Menu
              onClick={() => {
                navigate("/postList");
              }}
            >
              버킷리스트 목록
            </Menu>
            <div style={{ position: "relative" }}>
              <Menu
                onClick={(e) => {
                  if (category) {
                    e.target.style.borderBottom = "none";
                    setCategory(0);
                  } else {
                    e.target.style.borderBottom = "1px solid black";
                    setCategory(1);
                  }
                }}
              >
                카테고리 v
              </Menu>
              {category ? (
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
