import React from 'react';
import { Table, TableBody, TableCell, TableRow } from '@mui/material';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import useAsync from '../customHook/useAsync';

async function getCustomer(no) {
    const response = await axios.get(`http://localhost:3001/customer/${no}`);
    console.log(response.data)
    return response.data;
}

const DetailCustomer = () => {
    const {no} = useParams();
    const [state] = useAsync(() => getCustomer(no), [no]);
    const {loading, data, error} = state;
    if(loading) return <div>~~~~~로딩~~~~~</div>;
    if(error) return <div>~~~~~에러~~~~~</div>;
    if(!data) return <div>~~~~~값 없오~~~~~</div>;

    return (
        <div>
            <h2>고객 상세정보</h2>
            <Table>
                <TableBody>
                    <TableRow>
                        <TableCell>고객명</TableCell>
                        <TableCell>{data[0].name}</TableCell>
                    </TableRow>
                    <TableRow>
                        <TableCell>연락처</TableCell>
                        <TableCell>{data[0].phone}</TableCell>
                    </TableRow>
                    <TableRow>
                        <TableCell>생년월일</TableCell>
                        <TableCell>{data[0].birth}</TableCell>
                    </TableRow>
                    <TableRow>
                        <TableCell>성별</TableCell>
                        <TableCell>{data[0].gender}</TableCell>
                    </TableRow>
                    <TableRow>
                        <TableCell>주소</TableCell>
                        <TableCell>{data[0].add1}{data[0].add2}</TableCell>
                    </TableRow>
                </TableBody>
            </Table>
        </div>
    );
};

export default DetailCustomer;
