import React, { useState, useEffect, useCallback } from "react";
import axios from "axios";
import styled from "styled-components";
import { useParams, useNavigate } from "react-router-dom";
import { url } from "../Url";
import "../css/Detail.css";

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
  background: var(--color-skin);
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
let Comments = styled.div``;
function Detail() {
  const navigate = useNavigate();

  let { id } = useParams();
  const [post, setPost] = useState("");
  const [comment, setComment] = useState("");
  const [comments, setComments] = useState([]);
  const [content, setContent] = useState("");

  const getItem = () => {
    axios.get(`${url}/post/${id}`).then((res) => {
      setPost(res.data.post);
      setComments([...res.data.post.commentList]);
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

  const showInput = (i) => {
    document.getElementById(i).style.display = "inline-block";
    document.getElementById(`reply${i}`).innerText = "닫기";
  };
  const closeInput = (i) => {
    document.getElementById(i).style.display = "none";
    document.getElementById(`reply${i}`).innerText = "답글달기";
  };
  const showReply = (i) => {
    document.getElementById(`content${i}`).style.display = "none";
    document.getElementById(`replyInput${i}`).style.display = "inline-block";
    document.getElementById(`update${i}`).innerText = "닫기";
  };
  const closeReply = (i) => {
    document.getElementById(`content${i}`).style.display = "inline-block";
    document.getElementById(`replyInput${i}`).style.display = "none";
    document.getElementById(`update${i}`).innerText = "수정";
  };
  const replyContent = (id, i) => {
    const data = {
      content: content,
      secret: true,
    };
    axios.put(`${url}/comment/${id}`, data).then(() => {
      getItem();
      closeReply(i);
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
        {comments?.map((comment, i) => {
          if (comment.commentList) {
            return (
              <div style={{ display: "flex" }}>
                <div style={{ width: "800px", background: "var(--color-light-green)" }}>
                  <div style={{ display: "flex" }}>
                    <div id={"content" + i}>{comment.content}</div>
                    <input
                      id={"replyInput" + i}
                      style={{ display: "none" }}
                      onChange={(e) => {
                        setContent(e.target.value);
                      }}
                    ></input>
                    <div
                      id={"reply" + i}
                      onClick={(e) => {
                        e.target.innerText == "답글달기" ? showInput(i) : closeInput(i);
                      }}
                    >
                      답글달기
                    </div>

                    <div
                      id={"update" + i}
                      onClick={(e) => {
                        e.target.innerText == "수정" ? showReply(i) : closeReply(i);
                      }}
                    >
                      수정
                    </div>
                    <div
                      id={"updateButton" + i}
                      onClick={() => {
                        replyContent(comment.id, i);
                      }}
                    >
                      수정버튼
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
                  <input id={i} style={{ display: "none" }}></input>
                  {comment.commentList.map((com) => {
                    return <div style={{ width: "600px", background: "#Fff" }}>{com.content}</div>;
                  })}
                </div>
              </div>
            );
          }
        })}
      </Commentbox>
    </div>
  );
}

export default Detail;
