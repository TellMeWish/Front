import React, { useState, useEffect, useCallback } from "react";
import axios from "axios";
import styled from "styled-components";
import { useParams, useNavigate } from "react-router-dom";
import { url } from "../Url";

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
let Button = styled.button`
  width: 90px;
  color: #fff;
  background: var(--color-green);
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
function Detail() {
  const navigate = useNavigate();

  let { id } = useParams();
  const [post, setPost] = useState("");
  const [comment, setComment] = useState("");
  const [comments, setComments] = useState([]);
  const [update, setUpdate] = useState("");
  const [reply, setReply] = useState("");

  const getItem = () => {
    axios.get(`${url}/post/${id}`).then((res) => {
      setPost(res.data.post);
      setComments([...res.data.post.commentList]);
      console.log(res);
    });
  };

  useEffect(() => {
    getItem();
  }, []);

  const deletePost = () => {
    axios.delete(`${url}/post/${id}`).then(() => {
      alert("삭제되었습니다.");
      navigate("/postList");
    });
  };
  const postComment = (event) => {
    event.preventDefault();
    const data = {
      content: comment,
      userId: 1,
      postId: id,
      secret: true,
    };
    axios.post(`${url}/comment`, data).then((res) => {
      console.log(res);
      getItem();
    });
  };

  const postReply = (pid) => {
    const data = {
      content: reply,
      userId: 1,
      postId: id,
      secret: true,
      parentId: pid,
    };
    axios.post(`${url}/comment`, data).then((res) => {
      console.log(res);
      getItem();
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
        <Postimg src="/img/noimage.png"></Postimg>
        <PostContentBox>
          <div style={{ borderBottom: "2px solid black", paddingBottom: "10px" }}>
            <div style={{ fontSize: "50px" }}>{post.title}</div>
            <div className="postCategory">카테고리 : {post.category}</div>
          </div>
          <div className="postContent" style={{ height: "300px", marginTop: "10px" }}>
            {post.content}
          </div>
          <div style={{ display: "flex" }}>
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
        </PostContentBox>
      </Postbox>
      <Commentbox>
        <div>{comments.length}개의 댓글</div>
        <CommentForm onSubmit={postComment}>
          <textarea
            id="comment"
            style={{ width: "1000px", verticalAlign: "top" }}
            onChange={(e) => {
              setComment(e.target.value);
            }}
          ></textarea>
          <Button
            onClick={() => {
              document.getElementById("comment").value = "";
            }}
          >
            댓글 작성
          </Button>
        </CommentForm>
        <div style={{ display: "flex", flexDirection: "column-reverse" }}>
          {comments?.map((comment, i) => {
            return (
              <div style={{ display: "flex", flexDirection: "column", width: "1000px", alignItems: "center", marginTop: "20px" }}>
                <Comment>
                  <div>
                    <div style={{ display: "flex", justifyContent: "space-between", width: "950px", marginBottom: "30px" }}>
                      <div style={{ fontSize: "20px", display: "flex", flexDirection: "column" }}>
                        닉네임
                        <div style={{ fontSize: "10px", marginTop: "5px" }}>{comment.createdAt}</div>
                      </div>
                      <div class="btns">
                        <div
                          id={"update" + i}
                          onClick={(e) => {
                            e.target.innerText == "수정" ? showUpdate(i) : closeUpdate(i);
                            document.getElementById(`replyInput${i}`).value = comment.content;
                          }}
                        >
                          수정
                        </div>
                        <div
                          onClick={() => {
                            axios.delete(`${url}/comment/${comment.id}`).then(() => {
                              getItem();
                            });
                          }}
                        >
                          삭제
                        </div>
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
                          style={{ display: "none", marginLeft: "20px" }}
                          onClick={() => {
                            updateComment(comment.id, i);
                            closeUpdate(i);
                          }}
                        >
                          수정하기
                        </div>
                      </div>
                      <div>
                        <div id={"content" + i}>{comment.content}</div>
                        <div style={{ marginTop: "20px" }}>
                          <span
                            id={`showReply${i}`}
                            onClick={(e) => {
                              e.target.innerText == "+답글" ? showReply(i) : closeReply(i);
                            }}
                          >
                            +답글
                          </span>
                          <span
                            style={{ display: "none", marginLeft: "30px" }}
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
                          style={{ display: "none", width: "1000px", height: "100px" }}
                          onChange={(e) => {
                            setReply(e.target.value);
                          }}
                        ></textarea>
                        <div
                          id={`postReply${i}`}
                          style={{ display: "none" }}
                          onClick={() => {
                            postReply(comment.id);
                            closeInput(i);
                          }}
                        >
                          답글달기버튼
                        </div>
                      </div>
                    </div>
                  </div>
                  <div></div>
                </Comment>
                <div style={{ display: "none", flexDirection: "column-reverse" }} id={`replyComment${i}`}>
                  {comment.commentList.map((com, index) => {
                    return (
                      <div style={{ width: "1000px", background: "#F8F9FA" }}>
                        <Comment style={{ display: "flex", flexDirection: "column", justifyContent: "space-between", marginBottom: "20px", background: "#F8F9FA" }}>
                          <div style={{ fontSize: "20px", display: "flex", justifyContent: "space-between" }}>
                            닉네임
                            <div className="btns">
                              <div
                                id={`updateReply${index}`}
                                onClick={(e) => {
                                  e.target.innerText == "수정" ? showUpdateReply(i) : closeUpdateReply(i);
                                }}
                              >
                                수정
                              </div>
                              <div
                                id={`putReply${index}`}
                                style={{ display: "none" }}
                                onClick={() => {
                                  updateComment(com.id, i);
                                  closeUpdateReply(i);
                                }}
                              >
                                수정버튼
                              </div>
                              <div
                                onClick={() => {
                                  axios.delete(`${url}/comment/${com.id}`).then(() => {
                                    getItem();
                                  });
                                }}
                              >
                                삭제
                              </div>
                            </div>
                          </div>
                          <div style={{ fontSize: "10px", marginTop: "5px" }}>{com.createdAt}</div>
                          <div style={{ margin: "20px 0" }} id={`replyContent${index}`}>
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
