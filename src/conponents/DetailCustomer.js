import React from 'react';
import { Table, TableBody, TableCell, TableRow } from '@mui/material';
import axios from 'axios';
import { useParams, useNavigate, Link } from 'react-router-dom';
import useAsync from '../customHook/useAsync';

async function getCustomer(no) {
    const response = await axios.get(`http://localhost:3001/customer/${no}`);
    console.log(response.data);
    return response.data;
}

const DetailCustomer = () => {
    const navigate = useNavigate();

    const {no} = useParams();
    const [state] = useAsync(() => getCustomer(no), [no]);
    const {loading, data, error} = state;
    if(loading) return <div>~~~~~로딩~~~~~</div>;
    if(error) return <div>~~~~~에러~~~~~</div>;
    if(!data) return <div>~~~~~값 없오~~~~~</div>;

// 삭제하기 💜
const onDelete = () => {
    axios.delete(`http://localhost:3001/delCustomer/${no}`)
    .then(result => {
        console.log("삭제됨");
        navigate("/");
    })
    .catch(err => {
        console.log(err);
    })
}

// 수정하기 💜

    return (
        // http://localhost:3000/customer/1
        <div>
            <h2>고객 상세정보</h2>
            <Table>
                <TableBody>
                    <TableRow>
                        <TableCell>고객명</TableCell>
                        <TableCell>{data.name}</TableCell>
                    </TableRow>
                    <TableRow>
                        <TableCell>연락처</TableCell>
                        <TableCell>{data.phone}</TableCell>
                    </TableRow>
                    <TableRow>
                        <TableCell>생년월일</TableCell>
                        <TableCell>{data.birth}</TableCell>
                    </TableRow>
                    <TableRow>
                        <TableCell>성별</TableCell>
                        <TableCell>{data.gender}</TableCell>
                    </TableRow>
                    <TableRow>
                        <TableCell>주소</TableCell>
                        <TableCell>{data.add1}<br></br>{data.add2}</TableCell>
                    </TableRow>
                    <TableRow>
                        <TableCell colSpan={2}>
                            <button id='button' onClick={onDelete}>삭제</button>
                            {/* <Link to={`/update/${data.no}`}><button id='button'>수정</button></Link> */}
                            <Link to={`/editCustomer/${no}`}><button id='button'>수정</button></Link>
                        </TableCell>
                    </TableRow>
                </TableBody>
            </Table>
        </div>
    );
};

export default DetailCustomer;
