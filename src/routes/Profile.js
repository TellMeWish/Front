import React, { useState, useEffect } from "react";
import { Form } from "react-bootstrap";
import styled from "styled-components";
let ListBtn = styled.button`
  width: 150px;
  border: 1px solid black;
  background: var(--color-green);
  height: 50px;
  font-size: 14px;
  &.disabled {
    opacity: 0.6;
  }
`;
let ProfileCard = styled.div`
  margin-top: 30px;
  width: 800px;
  height: 300px;
  padding: 30px;
  border: 1px solid black;
  border-radius: 30px;
`;
let PostList = styled.div`
  width: 100vw;
  padding: 50px;
  display: grid;
  grid-template-columns: 1fr;
  gap: 105px 110px;
  justify-items: flex-start;
  align-items: start;
  border-top: 1px solid black;
  margin-top: 30px;
`;
function Profile() {
  const [list, setList] = useState(1);
  const radios = [
    { name: "전체", value: "1" },
    { name: "진행 예정", value: "2" },
    { name: "진행 중", value: "3" },
    { name: "진행 완료", value: "4" },
  ];
  useEffect(() => {
    if (document.getElementById("inline-radio-1")) document.getElementById("inline-radio-1").checked = true;
  }, [list]);
  return (
    <div style={{ display: "flex", flexDirection: "column", alignItems: "center" }}>
      <ProfileCard>
        <div style={{ display: "flex", alignItems: "center" }}>
          <div>ooo의 프로필</div>
          <div style={{ fontSize: "10px", marginLeft: "10px" }}>프로필 수정</div>
        </div>
      </ProfileCard>
      <div style={{ marginTop: "30px" }}>
        <ListBtn
          className="disabled"
          id="mybucket"
          onClick={() => {
            document.getElementById("mybucket").classList.add("disabled");
            document.getElementById("likebucket").classList.remove("disabled");
            setList(1);
          }}
        >
          내 버킷리스트
        </ListBtn>
        <ListBtn
          id="likebucket"
          onClick={() => {
            document.getElementById("mybucket").classList.remove("disabled");
            document.getElementById("likebucket").classList.add("disabled");
            setList(0);
          }}
        >
          좋아요 목록
        </ListBtn>
      </div>
      <PostList>
        {list ? (
          <div>
            <Form>
              {["radio"].map((type) => (
                <div key={`inline-radio`} className="mb-3">
                  <Form.Check inline label="전체" name="group1" type={type} id={`inline-${type}-1`} />
                  <Form.Check inline label="진행 예정" name="group1" type={type} id={`inline-${type}-2`} />
                  <Form.Check inline label="진행 중" name="group1" type={type} id={`inline-${type}-3`} />
                  <Form.Check inline label="진행 완료" name="group1" type={type} id={`inline-${type}-4`} />
                </div>
              ))}
            </Form>
            <div>버킷리스트 목록</div>
          </div>
        ) : (
          <div>좋아요</div>
        )}
      </PostList>
    </div>
  );
}
export default Profile;
