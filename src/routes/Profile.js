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
let Progress = styled.div`
  width: 100%;
  height: 30px;
  background-color: #dedede;
  font-weight: 600;
  font-size: 0.8rem;
  & div {
    height: 30px;
    padding: 0;
    text-align: center;
    background-color: #4f98ff;
    color: #111;
  }
`;
function Profile() {
  const token = localStorage.getItem("token");
  const navigate = useNavigate();
  const [list, setList] = useState(1);
  const [items, setItems] = useState([]);
  const [likeItems, setLikeItems] = useState([]);
  const [progress, setProgress] = useState("");
  const [achivement, setAchivement] = useState(0);

  useEffect(() => {
    getMyPost();
  }, []);

  useEffect(() => {
    if (document.getElementById("inline-radio-1")) document.getElementById("inline-radio-1").checked = true;
  }, [list]);

  useEffect(() => {
    let count = 0;
    items.map((i) => {
      if (i.isProgress == 2) count += 1;
    });
    setAchivement(count / items.length);
  }, [items]);

  const handleChange = (e) => {
    setProgress(e.target.value);
  };

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
      setLikeItems([...arr]);
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
        <div>버킷리스트 달성률 {(achivement * 100).toFixed(2)}%</div>
        <Progress>
          <div style={{ width: achivement * 1 * 100 + "%" }}></div>
        </Progress>
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
                  <Form.Check inline label="전체" name="group1" value="" checked={progress === ""} onChange={handleChange} />
                  <Form.Check inline label="진행 예정" name="group1" value="0" checked={progress === "0"} onChange={handleChange} />
                  <Form.Check inline label="진행 중" name="group1" value="1" checked={progress === "1"} onChange={handleChange} />
                  <Form.Check inline label="진행 완료" name="group1" value="2" checked={progress === "2"} onChange={handleChange} />
                </div>
              ))}
            </Form>
            <div>버킷리스트 목록</div>
            <div className="postList">
              {items?.map((item, i) => {
                if (!progress || item.isProgress == progress)
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
                            <img style={{ width: "15px", height: "15px", position: "relative", bottom: "3px" }} src="/img/unlike.png" /> {item.likeCount}
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
              {likeItems.map((item, i) => {
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
