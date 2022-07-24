import "../css/createPost.css";
function CreatePost() {
  return (
    <div className="container">
      <form className="createForm">
        <div className="checkList">
          <div>
            공개 여부 <input type="checkbox" name="color" value="blue" />
          </div>
          <div>
            참여 여부 <input type="checkbox" name="color" value="blue" />
          </div>
          <div>
            모집 여부 <input type="checkbox" name="color" value="blue" />
          </div>
          <div className="category">
            <div>카테고리</div>
            <select>
              <option>여행</option>
              <option>여행</option>
              <option>여행</option>
              <option>여행</option>
            </select>
          </div>
        </div>
        <div className="formBox">
          <div>제목</div>
          <input className="text" type="text"></input>
        </div>
        <div className="formBox">
          <div>사진</div>
          <input multiple="multiple" type="file" name="filename[]" />
        </div>
        <div className="formBox" style={{ alignItems: "flex-start" }}>
          <div>내용</div>
          <textarea placeholder="여기에 입력하세요"></textarea>
        </div>
        <div className="buttonBox">
          <button>등록하기</button>
          <button>초기화하기</button>
        </div>
      </form>
    </div>
  );
}

export default CreatePost;
