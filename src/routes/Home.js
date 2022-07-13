import { Navbar, Container, Nav, NavDropdown, Form, Button } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import "../css/Home.css";
let Card = styled.div`
  height: 600px;
  background: ${(props) => props.bg};
  display: flex;
  align-items: center;
  padding: 60px;
  justify-content: space-between;
  font-family: "Gowun Batang", serif;
  font-weight: 700;
`;
let Btn = styled.button`
  width: 350px;
  height: 120px;
  background: #ffb562;
  border-radius: 10px;
  border: none;
  font-size: 30px;
  font-family: "Jua", serif;
  color: #fff;
  &:hover {
    background: orange;
  }
`;

function Home() {
  let navigate = useNavigate();

  return (
    //버킷리스트 목록, 카테고리, 프로필, 지도, 검색창, 로그인/회원가입
    <div>
      <Navbar expand="lg" className="nav_bar" style={{ backgroundColor: "#ffb562", fontFamily: "Jua" }}>
        <Container fluid>
          <Navbar.Brand
            onClick={() => {
              navigate("/");
            }}
            style={{ fontSize: "50px", cursor: "pointer", margin: "0 20px" }}
          >
            소원을말해봐
          </Navbar.Brand>
          <Navbar.Toggle aria-controls="navbarScroll" />
          <Navbar.Collapse id="navbarScroll">
            <Nav className="me-auto my-2 my-lg-0" style={{ maxHeight: "100px" }} navbarScroll>
              <Nav.Link
                onClick={() => {
                  navigate("/");
                }}
              >
                버킷리스트 목록
              </Nav.Link>
              <NavDropdown title="카테고리" id="navbarScrollingDropdown">
                <NavDropdown.Item href="#action3">여행하기</NavDropdown.Item>
                <NavDropdown.Item href="#action4">이것</NavDropdown.Item>
                <NavDropdown.Item href="#action5">저것</NavDropdown.Item>
              </NavDropdown>
              <Nav.Link href="#action2">지도로 검색</Nav.Link>
            </Nav>
            <Form className="d-flex">
              <Form.Control type="search" placeholder="유럽 여행" className="me-2" aria-label="Search" />
              <Button variant="outline-success">Search</Button>
            </Form>
          </Navbar.Collapse>
        </Container>
      </Navbar>
      <Card>
        <img></img>
        <div style={{ display: "flex", flexDirection: "column", fontSize: "60px", alignItems: "flex-end" }}>
          <span>나만의 버킷 리스트를</span>
          <span>사람들에게</span>
          <span>공유해보세요</span>
        </div>
      </Card>
      <Card bg="#f9f2ed">
        <div style={{ display: "flex", flexDirection: "column", fontSize: "60px", alignItems: "flex-start" }}>
          <span>내 삶의 목표를</span>
          <span>소원을말해봐와</span>
          <span>이루어보세요</span>
        </div>
        <img></img>
      </Card>
      <Card>
        <div style={{ display: "flex", flexDirection: "column", justifyContent: "space-between" }}>
          <Btn style={{ marginBottom: "48px" }}>버킷리스트 등록</Btn>
          <Btn>목록 보기</Btn>
        </div>
        <div style={{ display: "flex", flexDirection: "column", fontSize: "60px", alignItems: "flex-end" }}>
          <span>지금</span>
          <span>나만의 버킷리스트를</span>
          <span>만들어보세요</span>
        </div>
      </Card>
    </div>
  );
}
export default Home;
