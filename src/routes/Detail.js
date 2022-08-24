import React, { useState, useEffect, useCallback } from "react";
import axios from "axios";
import styled from "styled-components";
import { useParams, useNavigate } from "react-router-dom";
import { url } from "../Url";
import { Button, Modal, Carousel } from "react-bootstrap";
import Map from "../Components/Map";

let Postbox = styled.div`
  width: 1200px;
  background: var(--color-skin);
  margin-top: 50px;
  padding: 50px;
  display: flex;
`;
let PostContentBox = styled.div`
  width: 500px;
  height: 500px;
`;

let Postimg = styled.img`
  width: 500px;
  height: 500px;
  background: #fff;
  object-fit: contain;
  margin-right: 100px;
`;
let Commentbox = styled.div`
  margin-top: 100px;
  padding: 100px;
  width: 1200px;
`;
let CommentForm = styled.form`
  display: flex;
  flex-direction: column;
  align-items: flex-end;
  margin-top: 20px;
  & textarea {
    height: 100px;
  }
`;
let Btn = styled.button`
  width: 90px;
  color: #fff;
  background: var(--color-beige);
  border: none;
  margin-top: 10px;
  height: 30px;
`;
let Comment = styled.div`
  width: 1000px;
  padding: 20px;
  background: #fff;
  display: flex;
  font-size: 14px;
  border-bottom: solid 1px silver;
  & .btns {
    display: flex;
    font-size: 12px;
    width: 50px;
    justify-content: space-between;
  }
`;
let Like = styled.img`
  width: 30px;
  height: 30px;
  cursor: pointer;
  transition: all 0.5s ease;
  margin-right: 10px;
  &:hover {
    transform: scale(1.2);
  }
`;
function Detail() {
  const navigate = useNavigate();
  const token = localStorage.getItem("token");
  const username = localStorage.getItem("username");
  let { id } = useParams();
  const [post, setPost] = useState("");
  const [comment, setComment] = useState("");
  const [comments, setComments] = useState([]);
  const [update, setUpdate] = useState("");
  const [reply, setReply] = useState("");
  const [secret, setSecret] = useState(0);
  const [show, setShow] = useState(false);
  const [files, setFiles] = useState([]);

  const [photo, setPhoto] = useState([]);
  const progress = ["진행 전", "진행 중", "진행 완료"];
  const setProgress = ["진행하기", "완료하기"];
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);
  const getItem = async () => {
    const config = {
      method: "get",
      url: `${url}/post/${id}`,
      headers: {
        Authorization: "Bearer " + token,
      },
    };
    await axios(config)
      .then((res) => {
        setPost(res.data.post);
        setComments([...res.data.post.commentList]);
        if (res.data.post.photoIdList[0] && !photo[0]) {
          getPhoto(res.data.post.photoIdList);
        }
        console.log(res);
      })
      .catch((err) => {
        console.log(err);
      });
  };
  const getPhoto = async (arr) => {
    arr.map(async (id) => {
      const config = {
        method: "get",
        url: `${url}/photo/${id}`,
        responseType: "blob",
        headers: {
          Authorization: "Bearer " + token,
        },
      };
      await axios(config).then((res) => {
        const url = window.URL.createObjectURL(new Blob([res.data], { type: res.headers["content-type"] }));
        setPhoto((currentArray) => [url, ...currentArray]);
      });
    });
  };
  const getCommentSize = () => {
    let size = 0;
    post?.commentList?.map((item) => {
      size += 1;
      item.commentList.map(() => {
        size += 1;
      });
    });
    return size;
  };

  useEffect(() => {
    getItem();
  }, []);

  const deletePost = () => {
    axios
      .delete(`${url}/post/${id}`, {
        headers: {
          Authorization: "Bearer " + token,
        },
      })
      .then(() => {
        alert("삭제되었습니다.");
        window.history.back();
      });
  };
  const postComment = (event) => {
    event.preventDefault();
    const data = {
      content: comment,
      postId: id,
      secret: secret,
    };
    const config = {
      method: "post",
      url: `${url}/comment`,
      data: data,
      headers: {
        Authorization: "Bearer " + token,
      },
    };
    axios(config).then((res) => {
      console.log(res);
      getItem();
    });
  };
  const likePost = () => {
    const config = {
      method: "post",
      url: `${url}/post/like`,
      data: {
        postId: id,
      },
      headers: {
        Authorization: "Bearer " + token,
      },
    };
    axios(config).then(() => {
      getItem();
    });
  };
  const postReply = (pid) => {
    const data = {
      content: reply,
      postId: id,
      secret: true,
      parentId: pid,
    };
    const config = {
      method: "post",
      url: `${url}/comment`,
      data: data,
      headers: {
        Authorization: "Bearer " + token,
      },
    };
    axios(config).then((res) => {
      console.log(res);
      getItem();
    });
  };

  const doProgress = async () => {
    var FormData = require("form-data");
    var data = new FormData();
    var files = [];
    if (post.photoIdList[0]) {
      post.photoIdList.map(async (id) => {
        const config = {
          method: "get",
          url: `${url}/photo/${id}`,
          responseType: "blob",
          headers: {
            Authorization: "Bearer " + token,
          },
        };
        await axios(config)
          .then((res) => {
            const blob = new Blob([res.data], { type: res.headers["content-type"] });
            files = [...temp, new File([blob], "image.png", { type: blob.type })];
          })
          .catch((err) => {
            console.log(err);
          });
      });
    }

    let postContent = {
      title: post.title,
      isPrivate: post.isPrivate,
      isParticipate: post.isParticipate,
      category: post.category,
      content: post.content,
      location: {
        longitude: post.lng,
        latitude: post.lat,
      },
      isProgress: 1,
    };
    data.append("dto", new Blob([JSON.stringify(postContent)], { type: "application/json" }));
    console.log(data.get("img"));
    const config = {
      method: "post",
      url: `${url}/post`,
      data: data,
      headers: {
        Authorization: "Bearer " + token,
      },
    };
    await axios(config)
      .then((res) => {
        alert("버킷리스트를 진행합니다.");
        // window.location.reload();
        setFiles([]);
      })
      .catch(() => {
        alert("실패");
      });
  };
  const showInput = (i) => {
    document.getElementById(i).style.display = "inline-block";
    document.getElementById(`postReply${i}`).style.display = "inline-block";
    document.getElementById(`reply${i}`).innerText = "닫기";
  };
  const closeInput = (i) => {
    document.getElementById(i).style.display = "none";
    document.getElementById(`postReply${i}`).style.display = "none";
    document.getElementById(`reply${i}`).innerText = "답글달기";
  };
  const showUpdate = (i) => {
    document.getElementById(`content${i}`).style.display = "none";
    document.getElementById(`replyInput${i}`).style.display = "inline-block";
    document.getElementById(`updateButton${i}`).style.display = "inline-block";
    document.getElementById(`update${i}`).innerText = "닫기";
  };
  const closeUpdate = (i) => {
    document.getElementById(`content${i}`).style.display = "inline-block";
    document.getElementById(`replyInput${i}`).style.display = "none";
    document.getElementById(`updateButton${i}`).style.display = "none";
    document.getElementById(`update${i}`).innerText = "수정";
  };
  const showUpdateReply = (i) => {
    document.getElementById(`replyContent${i}`).style.display = "none";
    document.getElementById(`updateReplyInput${i}`).style.display = "inline-block";
    document.getElementById(`putReply${i}`).style.display = "inline-block";
    document.getElementById(`updateReply${i}`).innerText = "닫기";
  };
  const closeUpdateReply = (i) => {
    document.getElementById(`replyContent${i}`).style.display = "inline-block";
    document.getElementById(`updateReplyInput${i}`).style.display = "none";
    document.getElementById(`putReply${i}`).style.display = "none";
    document.getElementById(`updateReply${i}`).innerText = "수정";
  };
  const showReply = (i) => {
    document.getElementById(`replyComment${i}`).style.display = "flex";
    document.getElementById(`reply${i}`).style.display = "inline-block";
    document.getElementById(`showReply${i}`).innerText = "-답글";
  };
  const closeReply = (i) => {
    document.getElementById(`replyComment${i}`).style.display = "none";
    document.getElementById(`reply${i}`).style.display = "none";
    document.getElementById(`showReply${i}`).innerText = "+답글";
  };
  const updateComment = (id) => {
    const data = {
      content: update,
      secret: true,
    };
    axios
      .put(`${url}/comment/${id}`, data)
      .then(() => {
        getItem();
      })
      .catch(() => {
        console.log("답글실패");
      });
  };
  return (
    <div style={{ display: "flex", flexDirection: "column", alignItems: "center", padding: "100px" }}>
      <Postbox>
        {photo[0] ? (
          photo.length > 1 ? (
            <Carousel variant="dark" style={{ width: "500px", height: "500px", marginRight: "100px" }}>
              {photo.map((url) => (
                <Carousel.Item>
                  <Postimg src={url} />
                </Carousel.Item>
              ))}
            </Carousel>
          ) : (
            <Postimg src={photo[0]} />
          )
        ) : (
          <Postimg src="/img/noimage.png" />
        )}
        <PostContentBox>
          <div style={{ borderBottom: "2px solid black", paddingBottom: "10px" }}>
            <div style={{ width: "500px", height: "75px", fontSize: "50px", overflow: "hidden", textOverflow: "ellipsis", whiteSpace: " nowrap" }}>{post.title}</div>
            <div style={{ fontSize: "12px", marginBottom: "15px" }}>작성자 : {post?.post_user_id?.nickname}</div>
            <div style={{ display: "flex", justifyContent: "space-between" }}>
              <div className="postCategory">
                카테고리 : {post.category} | 상태 : {progress[post.isProgress]}
                {post.isProgress == 0 ? <button onClick={doProgress}>진행하기</button> : null}
                {post.isProgress == 1 ? (
                  <div>
                    <button>완료하기</button>
                    <button>진행취소</button>{" "}
                  </div>
                ) : null}
              </div>
              {post?.location?.latitude ? (
                <Button variant="primary" onClick={handleShow}>
                  지도보기
                </Button>
              ) : null}
            </div>
          </div>
          <div className="postContent" style={{ height: "300px", marginTop: "10px" }}>
            {post.content}
          </div>
          <div style={{ display: "flex", justifyContent: "space-between" }}>
            {post.isLike ? (
              <div style={{ display: "flex", alignItems: "flex-end" }}>
                <Like
                  onClick={() => {
                    likePost();
                  }}
                  src="/img/like.png"
                />
                {post.likeCount}
              </div>
            ) : (
              <div style={{ display: "flex", alignItems: "flex-end" }}>
                <Like
                  onClick={() => {
                    likePost();
                  }}
                  src="/img/unlike.png"
                />
                {post.likeCount}
              </div>
            )}
            {post.isMyPost ? (
              <div>
                <button
                  onClick={() => {
                    navigate(`/updatePost/${id}`);
                  }}
                >
                  수정
                </button>
                <button
                  onClick={() => {
                    deletePost();
                  }}
                >
                  삭제
                </button>
              </div>
            ) : null}
          </div>
        </PostContentBox>
      </Postbox>
      <Modal style={{ display: "flex", alignItems: "center", justifyContent: "center" }} show={show} onHide={handleClose} animation={false}>
        <Modal.Header closeButton>
          <Modal.Title>버킷리스트 위치</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Map lng={post?.location?.longitude} lat={post?.location?.latitude}></Map>
        </Modal.Body>
      </Modal>
      <Commentbox>
        <div>
          {getCommentSize()}개의 댓글
          <span style={{ marginLeft: "10px", fontSize: "13px" }}>
            <input
              type="checkbox"
              onChange={(e) => {
                e.target.checked ? setSecret(1) : setSecret(0);
              }}
              style={{ position: "relative", top: "2px", marginRight: "2px" }}
            />
            비밀 댓글
          </span>
        </div>

        <CommentForm onSubmit={postComment}>
          <textarea
            id="comment"
            style={{ width: "1000px", verticalAlign: "top" }}
            onChange={(e) => {
              setComment(e.target.value);
            }}
          ></textarea>
          <Btn
            onClick={() => {
              document.getElementById("comment").value = "";
            }}
          >
            댓글 작성
          </Btn>
        </CommentForm>
        <div style={{ display: "flex", flexDirection: "column-reverse" }}>
          {comments?.map((comment, i) => {
            return (
              <div style={{ display: "flex", flexDirection: "column", width: "1000px", alignItems: "center", marginTop: "20px" }}>
                <Comment>
                  <div>
                    <div style={{ display: "flex", justifyContent: "space-between", width: "950px", marginBottom: "30px" }}>
                      <div style={{ fontSize: "16px", display: "flex", flexDirection: "column" }}>
                        {comment.user.nickname}
                        <div style={{ fontSize: "10px", marginTop: "5px" }}>{comment.createdAt}</div>
                      </div>
                      <div class="btns">
                        {comment.user.username == username ? (
                          <div
                            id={"update" + i}
                            style={{ cursor: "pointer" }}
                            onClick={(e) => {
                              e.target.innerText == "수정" ? showUpdate(i) : closeUpdate(i);
                              document.getElementById(`replyInput${i}`).value = comment.content;
                            }}
                          >
                            수정
                          </div>
                        ) : null}
                        {comment.user.username == username || post.isMyPost ? (
                          <div
                            style={{ cursor: "pointer" }}
                            onClick={() => {
                              axios
                                .delete(`${url}/comment/${comment.id}`, {
                                  headers: {
                                    Authorization: "Bearer " + token,
                                  },
                                })
                                .then(() => {
                                  getItem();
                                });
                            }}
                          >
                            삭제
                          </div>
                        ) : null}
                      </div>
                    </div>
                    <div style={{ display: "flex", flexDirection: "column" }}>
                      <div>
                        <input
                          id={"replyInput" + i}
                          style={{ display: "none", width: "200px" }}
                          onChange={(e) => {
                            setUpdate(e.target.value);
                          }}
                        ></input>
                        <div
                          id={"updateButton" + i}
                          style={{ display: "none", marginLeft: "20px", cursor: "pointer" }}
                          onClick={() => {
                            updateComment(comment.id, i);
                            closeUpdate(i);
                          }}
                        >
                          수정하기
                        </div>
                      </div>
                      {comment.secret && !post.isMyPost && comment.user?.username != username ? (
                        <div>
                          <div style={{ fontSize: "20px", fontWeight: "400" }} id={"content" + i}>
                            비밀댓글입니다.
                          </div>
                        </div>
                      ) : (
                        <div>
                          <div style={{ fontSize: "20px", fontWeight: "400" }} id={"content" + i}>
                            {comment.content}
                          </div>
                          <div style={{ marginTop: "20px" }}>
                            <span
                              id={`showReply${i}`}
                              style={{ cursor: "pointer" }}
                              onClick={(e) => {
                                e.target.innerText == "+답글" ? showReply(i) : closeReply(i);
                              }}
                            >
                              +답글
                            </span>
                            <span>({comment.commentList.length})</span>
                            <span
                              style={{ display: "none", marginLeft: "30px", cursor: "pointer" }}
                              id={"reply" + i}
                              onClick={(e) => {
                                e.target.innerText == "답글달기" ? showInput(i) : closeInput(i);
                              }}
                            >
                              답글달기
                            </span>
                          </div>
                          <textarea
                            id={i}
                            style={{ display: "none", width: "1000px", height: "100px", cursor: "pointer" }}
                            onChange={(e) => {
                              setReply(e.target.value);
                            }}
                          ></textarea>
                          <div
                            id={`postReply${i}`}
                            style={{ display: "none", cursor: "pointer" }}
                            onClick={() => {
                              postReply(comment.id);
                              closeInput(i);
                            }}
                          >
                            답글달기버튼
                          </div>
                        </div>
                      )}
                    </div>
                  </div>
                  <div></div>
                </Comment>
                <div style={{ display: "none", flexDirection: "column-reverse" }} id={`replyComment${i}`}>
                  {comment.commentList.map((com, index) => {
                    return (
                      <div style={{ width: "1000px" }}>
                        <Comment style={{ display: "flex", flexDirection: "column", justifyContent: "space-between", marginBottom: "20px", background: "#F8F9FA" }}>
                          <div style={{ fontSize: "16px", display: "flex", justifyContent: "space-between" }}>
                            {com.user.nickname}
                            <div className="btns">
                              <div
                                id={`updateReply${index}`}
                                onClick={(e) => {
                                  e.target.innerText == "수정" ? showUpdateReply(i) : closeUpdateReply(i);
                                }}
                                style={{ cursor: "pointer" }}
                              >
                                수정
                              </div>
                              <div
                                id={`putReply${index}`}
                                style={{ display: "none", cursor: "pointer" }}
                                onClick={() => {
                                  updateComment(com.id, i);
                                  closeUpdateReply(i);
                                }}
                              >
                                수정버튼
                              </div>
                              <div
                                onClick={() => {
                                  axios
                                    .delete(`${url}/comment/${com.id}`, {
                                      headers: {
                                        Authorization: "Bearer " + token,
                                      },
                                    })
                                    .then(() => {
                                      getItem();
                                    });
                                }}
                                style={{ cursor: "pointer" }}
                              >
                                삭제
                              </div>
                            </div>
                          </div>
                          <div style={{ fontSize: "10px", marginTop: "5px" }}>{com.createdAt}</div>
                          <div style={{ fontSize: "20px", margin: "20px 0" }} id={`replyContent${index}`}>
                            {com.content}
                          </div>
                          <div>
                            <input
                              id={`updateReplyInput${index}`}
                              style={{ display: "none" }}
                              onChange={(e) => {
                                setUpdate(e.target.value);
                              }}
                            ></input>
                          </div>
                        </Comment>
                      </div>
                    );
                  })}
                </div>
              </div>
            );
          })}
        </div>
      </Commentbox>
    </div>
  );
}

export default Detail;
