import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import styled from "styled-components";
import { NavDropdown } from "react-bootstrap";

let Menu = styled.div`
  cursor: pointer;
  margin-left: 40px;
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
  const navigate = useNavigate();
  const [category, setCategory] = useState("");
  const [keyword, setKeyword] = useState("");
  const handleEnterPress = (e) => {
    if (e.key === "Enter") {
      navigate(`/postList/${category}/${keyword}`);
      window.location.reload();
    }
  };
  useEffect(() => {
    if (Date.now() >= localStorage.getItem("expire")) localStorage.clear();
  });
  return (
    <div className="nav_bar" style={{ zIndex: "5" }}>
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
              placeholder="여행, 운동, 취미 등"
              onChange={(e) => {
                setKeyword(e.target.value);
              }}
              onKeyPress={handleEnterPress}
              style={{ width: "500px", height: "40px", marginBottom: "20px", paddingLeft: "90px" }}
            ></input>
            <button
              id="searchBtn"
              onClick={() => {
                navigate(`/postList/${category}/${keyword}`);
                window.location.reload();
              }}
              style={{ width: "75px", height: "40px", border: "none", background: "var(--color-beige)", color: "white", marginLeft: "10px" }}
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
            <Menu>
              <div>
                <NavDropdown title="카테고리" id="navbarScrollingDropdown">
                  <NavDropdown.Item href="/postList/여행/">여행</NavDropdown.Item>
                  <NavDropdown.Item href="/postList/운동/">운동</NavDropdown.Item>
                  <NavDropdown.Item href="/postList/공부/">공부</NavDropdown.Item>
                  <NavDropdown.Item href="/postList/음식/">음식</NavDropdown.Item>
                  <NavDropdown.Item href="/postList/취미/">취미</NavDropdown.Item>
                  <NavDropdown.Item href="/postList/갖고싶은것/">갖고싶은것</NavDropdown.Item>
                  <NavDropdown.Item href="/postList/기타/">기타</NavDropdown.Item>
                </NavDropdown>
              </div>
            </Menu>
            <Menu
              onClick={() => {
                navigate("/createPost");
              }}
            >
              버킷리스트 등록
            </Menu>
            <Menu
              onClick={() => {
                navigate("/mapSearch");
              }}
            >
              지도 검색
            </Menu>
          </div>
        </div>
        {!localStorage.getItem("token") ? (
          <div className="userBox" style={{ marginRight: "30px" }}>
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
          <div className="userBox" style={{ marginRight: "30px" }}>
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
