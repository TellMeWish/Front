import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import axios from "axios";
let Card = styled.div`
  height: 600px;
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

  return (
    //버킷리스트 목록, 카테고리, 프로필, 지도, 검색창, 로그인/회원가입
    <div>
      <Card>
        <img></img>
        <div style={{ display: "flex", flexDirection: "column", fontSize: "60px", alignItems: "flex-end" }}>
          <span>나만의 버킷 리스트를</span>
          <span>사람들에게</span>
          <span>공유해보세요</span>
        </div>
      </Card>
      <Card bg="var(--color-skin)">
        <div style={{ display: "flex", flexDirection: "column", fontSize: "60px", alignItems: "flex-start" }}>
          <span>내 삶의 목표를</span>
          <span>소원을말해봐와</span>
          <span>이루어보세요</span>
        </div>
        <img></img>
      </Card>
      <Card>
        <div style={{ display: "flex", flexDirection: "column", justifyContent: "space-between" }}>
          <Btn
            style={{ marginBottom: "48px" }}
            onClick={() => {
              axios.get(`http://13.209.145.95:8081/post/postList?page=0&size=3`).then((res) => {
                console.log(res);
              });
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
          <span>지금</span>
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
