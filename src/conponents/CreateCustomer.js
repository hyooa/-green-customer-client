import React, { useState } from 'react';
import { Table, TableBody, TableCell, TableRow } from '@mui/material';
import PopupDom from './PopupDom';
import PopupPostCode from './PopupPostCode';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const CreateCustomer = () => {
    const navigate = useNavigate();

    // 우편번호 관리하기 🧡
    const onAddData = (data) => {
        console.log(data);
        setFormData({
            ...formData,
            c_add : data.address
        })
    }

    // 팝업창 상태 관리 🧡
    const [ isPopupOpen, setIsPopupOpen ] = useState(false);

    // 팝업창 상태 true로 변경 🧡
    const openPostCode = () => {
        setIsPopupOpen(true);
    }

    // 팝업창 상태 false로 변경 🧡
    const closePostCode = () => {
        setIsPopupOpen(false);
    }

    const [ formData, setFormData ] = useState({
        c_name : "",
        c_phone : "",
        c_birth : "",
        c_gender : "",
        c_add : "",
        c_adddetail : "",
    });

    const onChange = (e) => {
        const { name, value } = e.target; // target이 가지는 name, value를 각각 변수에 담기
        setFormData({
            ...formData, // 초기값 한 번 불러주기
            [name] : value, // name > 바뀌는것만 한 번 불러주기
        })
    }

    // 폼 submit 이벤트
    const onSubmit = (e) => {
        // form에 원래 연결된 이벤트를 제거 (다른 페이지로 넘어가는걸 방지)
        e.proventDefault();
        console.log(formData);
        // input에 값이 있는지 체크하고
        // 입력이 다 되어있으면 post 전송
    }
    function insertCustomer() { // 조회 get, 전송 post / formData 전송 why? 값을 다 가지고있음
        axios.post(`http://localhost:3001/customers`, formData)
        .then(function (response) {
            console.log(response);
            navigate("/");
        })
        .catch(function (error) {
            console.log(error);
        });
    }

    return (
        <div>
            <h2>신규 고객 등록하기</h2>
            <form onSubmit={onSubmit}> 
                <Table>
                    <TableBody>
                        <TableRow>
                            <TableCell>이름</TableCell>
                            <TableCell>
                                {/* form에 입력되는 값들은 관리가 되어야됨 > useState */}
                                <input
                                name="c_name"
                                type="text"
                                value={formData.c_name}
                                onChange={onChange}
                                />
                            </TableCell>
                        </TableRow>
                        <TableRow>
                            <TableCell>연락처</TableCell>
                            <TableCell>
                                <input
                                name="c_phone"
                                type="text"
                                value={formData.c_phone}
                                onChange={onChange}
                                />
                            </TableCell>
                        </TableRow>
                        <TableRow>
                            <TableCell>생년월일</TableCell>
                            <TableCell>
                                <input
                                name="c_birth"
                                type="date"
                                value={formData.c_birth}
                                onChange={onChange}
                                />
                            </TableCell>
                        </TableRow>
                        <TableRow>
                            <TableCell>성별</TableCell>
                            <TableCell>
                                여성<input
                                name="c_gender"
                                type="radio"
                                value="여성"
                                onChange={onChange}
                                />
                                남성<input
                                name="c_gender"
                                type="radio"
                                value="남성"
                                onChange={onChange}
                                />
                            </TableCell>
                        </TableRow>
                        <TableRow>
                            <TableCell>주소</TableCell>
                            <TableCell>
                                <input
                                name="c_add"
                                type="text"
                                value={formData.c_add}
                                onChange={onChange}
                                />
                                <input
                                name="c_adddetail"
                                type="text"
                                value={formData.c_adddetail}
                                onChange={onChange}
                                />

                                <button type='button' onClick={openPostCode}>우편번호검색</button>
                                <div id="popupDom">
                                    {/* 다음 api */}
                                    {
                                        isPopupOpen && (
                                            <PopupDom>
                                                <PopupPostCode
                                                onClose={closePostCode} 
                                                onAddData={onAddData}
                                                />
                                            </PopupDom>
                                        )
                                    }
                                </div>
                            </TableCell>
                        </TableRow>
                        <TableRow>
                            <TableCell colSpan={2}>
                                <button id='button' type='sumbit' onClick={insertCustomer}>등록</button>
                                <button id='button' type='reset'>취소</button>
                            </TableCell>
                        </TableRow>
                    </TableBody>
                </Table>
            </form>
        </div>
    );
};

export default CreateCustomer;