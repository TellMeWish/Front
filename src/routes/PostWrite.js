import { Component } from "react";
import { Navbar, Container, Nav, NavDropdown } from "react-bootstrap";
import "../css/PostWrite.css";

class PostWrite extends Component {
    state = {
        isPublicOn: true,
        isRecruitmentOn: true,
        isParicipationOn: true,
        setSelected: '',
        title: '',
        content: ''

    }
    publicHandle = () => {
        this.setState(state => ({
            isPublicOn: !state.isPublicOn
        }));
    }
    recruitmentHandle = () => {
        this.setState(state => ({
            isRecruitmentOn: !state.isRecruitmentOn
        }));
    }
    participationcHandle = () => {
        this.setState(state => ({
            isParicipationOn: !state.isParicipationOn
        }));
    }
    categoryHandle = (e) => {

    }
    contentHandle = (e) => {

    }
    render() {
        return (
            <div className="container">
                <div className="postbar">
                    <div >
                        <button onClick={this.publicHandle}>
                            {this.state.isPublicOn ? '공개' : '비공개'}
                        </button>
                    </div>
                    <div>
                        <button onClick={this.recruitmentHandle}>
                            {this.state.isRecruitmentOn ? '모집중' : '모집완료'}
                        </button>
                    </div>
                    <div>
                        <button onClick={this.participationcHandle}>
                            {this.state.isParicipationOn ? '참여가능' : '참여불가능'}
                        </button>
                    </div>
                    <div>
                        <select onChange={this.categoryHandle}>
                            <option >카테고리</option>
                            <option value="여행하기" >여행하기</option>
                            <option value="이것">이것</option>
                            <option value="저것">저것</option>

                        </select>
                    </div>
                </div>
                <div>
                    <input className="title" type="text" placeholder="title" value={this.title} >

                    </input>
                </div>

                <div>
                    <img className="photo" src={"/public/fonts/버킷폰트.png"} alt='imgex' onerror="this.src='https://s.pstatic.net/static/www/img/uit/2019/sp_search.svg';">

                    </img>
                </div>
                <div className="postbar">
                    <div >
                        <textarea
                            placeholder="여기에 입력하세요"
                            value={this.content}
                            onChange={(e) => this.contentHandle(e)}
                        >
                        </textarea>
                    </div>
                    <div className="map">
                       map

                    </div>

                </div>

            </div>
        );
    }

}

export default PostWrite;
