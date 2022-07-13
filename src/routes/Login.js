import "../css/Login.css";
function Login() {
  return (
    <div className="container">
      <form className="loginBox">
        <div>로그인</div>
        <div>
          <img className="icon" src={process.env.PUBLIC_URL + "/img/user.png"} />
          <input className="idBox" type="text"></input>
        </div>
        <div>
          <img className="icon" src={process.env.PUBLIC_URL + "/img/padlock.png"} />
          <input className="pwdBox" type="password"></input>
        </div>
        <button type="submit" className="submit-btn">
          로그인하기
        </button>
      </form>
    </div>
  );
}

export default Login;
