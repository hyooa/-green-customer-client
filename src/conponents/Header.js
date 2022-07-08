import React from 'react';
import { Link } from 'react-router-dom';

const Header = () => {
    return (
        <div id='header'>
            <h1>그린 고객 센터</h1>
            <ul>
                <li><Link to="/">고객 리스트보기</Link></li>
                <li><Link to="/writer">신규 고객 등록하기</Link></li>
                <li>고객 검색</li>
            </ul>
        </div>
    );
};

export default Header;