import axios from "axios";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import "../css/Login.css";
import { url } from "../Url";
function Login() {
  const navigate = useNavigate();
  const [id, setId] = useState();
  const [pw, setPw] = useState();

  const doLogin = (e) => {
    e.preventDefault();
    const user = JSON.stringify({
      username: id,
      password: pw,
    });
    const config = {
      method: "post",
      url: `${url}/api/authenticate`,
      data: user,
      headers: {
        "Content-Type": "application/json",
      },
    };
    axios(config)
      .then((res) => {
        navigate("/");
        localStorage.clear();
        localStorage.setItem("token", res.data.token);
        console.log(localStorage.getItem("token"));
      })
      .catch(() => {});
  };
  return (
    <div className="container">
      <form className="loginBox" onSubmit={doLogin}>
        <div>로그인</div>
        <div>
          <img className="icon" src={process.env.PUBLIC_URL + "/img/user.png"} />
          <input
            className="idBox"
            type="text"
            onChange={(e) => {
              setId(e.target.value);
            }}
          ></input>
        </div>
        <div>
          <img className="icon" src={process.env.PUBLIC_URL + "/img/padlock.png"} />
          <input
            className="pwdBox"
            type="password"
            onChange={(e) => {
              setPw(e.target.value);
            }}
          ></input>
        </div>
        <button type="submit" className="submit-btn">
          로그인하기
        </button>
      </form>
    </div>
  );
}

export default Login;
