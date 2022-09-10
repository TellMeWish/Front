import "../css/Signup.css";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { url } from "../Url";
function Signup() {
  const navigate = useNavigate();
  const [id, setId] = useState();
  const [pw, setPw] = useState();
  const [nick, setNick] = useState();
  const signUp = async (event) => {
    event.preventDefault();
    const data = JSON.stringify({
      username: id,
      password: pw,
      nickname: nick,
    });
    var config = {
      method: "post",
      url: `${url}/api/signup`,
      data: data,
      headers: {
        "Content-Type": "application/json",
      },
    };
    await axios(config)
      .then((res) => {
        alert("등록 완료");
        navigate("/login");
      })
      .catch((err) => {
        alert("실패");
        console.log(err);
      });
  };
  return (
    <div className="container">
      <form className="signUpBox" onSubmit={signUp}>
        <div style={{ fontSize: "40px" }}>회원가입</div>
        <div className="inputBox">
          <div>아이디</div>
          <input
            onChange={(e) => {
              setId(e.target.value);
            }}
            type="text"
          ></input>
        </div>
        <div className="inputBox">
          <div>비밀번호</div>
          <input
            onChange={(e) => {
              setPw(e.target.value);
            }}
            type="password"
          ></input>
        </div>
        <div className="inputBox">
          <div>닉네임</div>
          <input
            onChange={(e) => {
              setNick(e.target.value);
            }}
            type="text"
          ></input>
        </div>
        <button type="submit" className="submit-btn">
          회원가입
        </button>
      </form>
    </div>
  );
}

export default Signup;
