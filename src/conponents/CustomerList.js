import React from 'react';
import { Table, TableBody, TableHead, TableCell, TableRow } from '@mui/material';
import Customer from './Customer';
import axios from 'axios';
import useAsync from '../customHook/useAsync';

async function getCustomer() {
    const response = await axios.get(`http://localhost:3001/customers`);
    return response.data;
}

const CustomerList = () => {
    const [state] = useAsync(getCustomer, []);
    const {loading, data, error} = state;
    if(loading) return <div>~~~~~로딩~~~~~</div>;
    if(error) return <div>~~~~~에러~~~~~</div>;
    if(!data) return <div>~~~~~값 없오~~~~~</div>;

    return (
        <div>
            <h2>고객리스트</h2>
            <Table>
                <TableHead>
                    <TableRow>
                        <TableCell>번호</TableCell>
                        <TableCell>이름</TableCell>
                        <TableCell>연락처</TableCell>
                        <TableCell>생년월일</TableCell>
                        <TableCell>성별</TableCell>
                        <TableCell>주소</TableCell>
                        <TableCell>상세주소</TableCell>
                    </TableRow>
                </TableHead>

                <TableBody>
                    {data.map(customer => (
                        <Customer key={customer.no} customer={customer}></Customer>
                    ))}
                </TableBody>
            </Table>
        </div>
    );
};

export default CustomerList;