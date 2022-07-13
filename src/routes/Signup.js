import "../css/Signup.css";
function Signup() {
  return (
    <div className="container">
      <form className="signUpBox">
        <div style={{ fontSize: "40px" }}>회원가입</div>
        <div className="inputBox">
          <div>아이디</div>
          <input type="text"></input>
        </div>
        <div className="inputBox">
          <div>비밀번호</div>
          <input type="password"></input>
        </div>
        <div className="inputBox">
          <div>닉네임</div>
          <input type="text"></input>
        </div>
        <div className="inputBox phoneNumBox">
          <div>휴대폰번호</div>
          <div style={{ width: "400px" }}>
            <input style={{ width: "280px" }} type="text"></input>
            <button>인증</button>
          </div>
        </div>
        <button type="submit" className="submit-btn">
          회원가입
        </button>
      </form>
    </div>
  );
}

export default Signup;
