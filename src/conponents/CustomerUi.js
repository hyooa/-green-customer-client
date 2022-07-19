import React from 'react';
import { Table, TableBody, TableHead, TableCell, TableRow } from '@mui/material';
import Customer from './Customer';

const CustomerUi = ({ customers }) => { // 💛 
    return (
        // CustomerList 복붙
        <div>
            <h2>고객리스트 REDUX</h2>
            <Table>
                <TableHead>
                    <TableRow>
                        <TableCell>번호</TableCell>
                        <TableCell>이름</TableCell>
                        <TableCell>연락처</TableCell>
                        <TableCell>생년월일</TableCell>
                        <TableCell>성별</TableCell>
                        <TableCell>주소</TableCell>
                    </TableRow>
                </TableHead>

                <TableBody>
                    {customers.map(customer => (
                        <Customer key={customer.no} customer={customer}></Customer>
                    ))}
                </TableBody>
            </Table>
        </div>
    );
};

export default CustomerUi;