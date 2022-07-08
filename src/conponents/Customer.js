import React from 'react';
import { TableRow, TableCell } from '@mui/material';
import { Link } from 'react-router-dom';

const Customer = ({customer}) => {
    return (
        <TableRow>
            <TableCell>{customer.no}</TableCell>
            <TableCell><Link to={`/customer/${customer.no}`}>{customer.name}</Link></TableCell>
            <TableCell>{customer.phone}</TableCell>
            <TableCell>{customer.birth}</TableCell>
            <TableCell>{customer.gender}</TableCell>
            <TableCell>{customer.add1}</TableCell>
            <TableCell>{customer.add2}</TableCell>
        </TableRow>
    );
};

export default Customer;