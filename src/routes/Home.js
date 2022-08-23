import { useNavigate } from "react-router-dom";
import React, { useState, useEffect, useCallback } from "react";
import styled from "styled-components";
import axios from "axios";
let Card = styled.div`
  height: 90vh;
  background: ${(props) => props.bg};
  display: flex;
  align-items: center;
  padding: 60px;
  justify-content: space-between;
`;
let Btn = styled.button`
  width: 350px;
  height: 120px;
  background: var(--color-beige);
  border-radius: 10px;
  border: none;
  font-size: 30px;
  color: #fff;
  &:hover {
    background: #e99f71;
  }
`;

function Home() {
  let navigate = useNavigate();
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);
  return (
    //버킷리스트 목록, 카테고리, 프로필, 지도, 검색창, 로그인/회원가입
    <div>
      <Card bg="var(--color-skin)">
        <img></img>
        <div style={{ display: "flex", flexDirection: "column", fontSize: "60px", alignItems: "flex-end" }}>
          <span>내 버킷 리스트를</span>
          <span>사람들에게</span>
          <span>공유해보세요</span>
        </div>
      </Card>
      <Card>
        <div style={{ display: "flex", flexDirection: "column", fontSize: "60px", alignItems: "flex-start" }}>
          <span>내 삶의 목표를</span>
          <span>소원을말해봐와</span>
          <span>이루어보세요</span>
        </div>
        <img></img>
      </Card>
      <Card bg="var(--color-skin)">
        <div style={{ display: "flex", flexDirection: "column", justifyContent: "space-between" }}>
          <Btn
            style={{ marginBottom: "48px" }}
            onClick={() => {
              navigate("/createPost");
            }}
          >
            버킷리스트 등록
          </Btn>
          <Btn
            onClick={() => {
              navigate("/postList");
            }}
          >
            목록 보기
          </Btn>
        </div>
        <div style={{ display: "flex", flexDirection: "column", fontSize: "60px", alignItems: "flex-end" }}>
          <span>지금 바로</span>
          <span>
            <span style={{ color: "var(--color-beige)" }}>나만의 버킷리스트</span>를
          </span>
          <span>만들어보세요</span>
        </div>
      </Card>
    </div>
  );
}
export default Home;
