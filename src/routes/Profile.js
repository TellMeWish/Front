import React, { useState, useEffect } from "react";
import { Form } from "react-bootstrap";
import axios from "axios";
import { url } from "../Url";
import styled from "styled-components";
import { useNavigate } from "react-router-dom";
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
let Post = styled.div`
  width: 350px;
  height: 400px;
  padding: 20px;
  background: var(--color-light-green);
  display: flex;
  flex-direction: column;
  align-items: center;
  transition: all 0.2s linear;
  box-shadow: rgba(0, 0, 0, 0.24) 0px 3px 8px;
  img {
    width: 300px;
    height: 200px;
  }
  &:hover {
    transform: translateY(-30px);
  }
  cursor: grab;
`;
function Profile() {
  const token = localStorage.getItem("token");
  const navigate = useNavigate();
  const [list, setList] = useState(1);
  const [items, setItems] = useState([]);
  const radios = [
    { name: "전체", value: "1" },
    { name: "진행 예정", value: "2" },
    { name: "진행 중", value: "3" },
    { name: "진행 완료", value: "4" },
  ];

  useEffect(() => {
    getMyPost();
  }, []);

  useEffect(() => {
    if (document.getElementById("inline-radio-1")) document.getElementById("inline-radio-1").checked = true;
  }, [list]);

  const getCommentSize = (post) => {
    let size = 0;
    post.commentList.map((item) => {
      size += 1;
      item.commentList.map(() => {
        size += 1;
      });
    });
    return size;
  };

  const getMyPost = () => {
    const config = {
      method: "get",
      url: `${url}/post/myPostList`,

      headers: {
        Authorization: "Bearer " + token,
      },
    };
    axios(config).then((res) => {
      let arr = res.data.postList;
      setItems([...arr]);
    });
    console.log(items);
  };

  const getMyLikedPost = () => {
    const config = {
      method: "get",
      url: `${url}/post/myLikedPostList`,

      headers: {
        Authorization: "Bearer " + token,
      },
    };
    axios(config).then((res) => {
      let arr = res.data.postList;
      setItems([...arr]);
    });
    console.log(items);
  };
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
            getMyPost();
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
            getMyLikedPost();
            console.log(items);
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
            <div className="postList">
              {items.map((item, i) => {
                return (
                  <Post
                    onClick={() => {
                      navigate(`/detail/${item.id}`);
                    }}
                  >
                    <img src="/img/noimage.png"></img>
                    <div className="textBox">
                      <div style={{ display: "flex", alignItems: "center" }}>
                        <div className="postTitle">제목 : {item.title}</div>
                      </div>
                      {item.isParticipate ? item.isCompleted ? <div>(모집 완료)</div> : <div>(모집 중)</div> : null}
                      <div style={{ display: "flex", marginTop: "50px" }}>
                        <div>
                          <img style={{ width: "15px", height: "15px", position: "relative", bottom: "3px" }} src="/img/like.png" /> {item.likeCount}
                        </div>
                        <div style={{ marginLeft: "10px" }}>
                          <img style={{ width: "15px", height: "15px" }} src="/img/view.png" /> {item.viewCount}
                        </div>
                        <div style={{ marginLeft: "10px" }}>
                          <img style={{ width: "15px", height: "15px" }} src="/img/comment.png" /> {getCommentSize(item)}
                        </div>
                      </div>
                      <div style={{ marginTop: "5px" }}>
                        <img style={{ width: "15px", height: "15px" }} src="/img/clock.png" /> {new Date(item.createdAt).toLocaleString("ko-KR", { timeZone: "Asia/Seoul" })}
                      </div>
                    </div>
                  </Post>
                );
              })}
            </div>
          </div>
        ) : (
          <div>
            <div>좋아요</div>
            <div className="postList">
              {items.map((item, i) => {
                return (
                  <Post
                    onClick={() => {
                      navigate(`/detail/${item.id}`);
                    }}
                  >
                    <img src="/img/noimage.png"></img>
                    <div className="textBox">
                      <div style={{ display: "flex", alignItems: "center" }}>
                        <div className="postTitle">제목 : {item.title}</div>
                      </div>
                      {item.isParticipate ? item.isCompleted ? <div>(모집 완료)</div> : <div>(모집 중)</div> : null}
                      <div style={{ display: "flex", marginTop: "50px" }}>
                        <div>
                          <img style={{ width: "15px", height: "15px", position: "relative", bottom: "3px" }} src="/img/like.png" /> {item.likeCount}
                        </div>
                        <div style={{ marginLeft: "10px" }}>
                          <img style={{ width: "15px", height: "15px" }} src="/img/view.png" /> {item.viewCount}
                        </div>
                        <div style={{ marginLeft: "10px" }}>
                          <img style={{ width: "15px", height: "15px" }} src="/img/comment.png" /> {getCommentSize(item)}
                        </div>
                      </div>
                      <div style={{ marginTop: "5px" }}>
                        <img style={{ width: "15px", height: "15px" }} src="/img/clock.png" /> {new Date(item.createdAt).toLocaleString("ko-KR", { timeZone: "Asia/Seoul" })}
                      </div>
                    </div>
                  </Post>
                );
              })}
            </div>
          </div>
        )}
      </PostList>
    </div>
  );
}
export default Profile;
