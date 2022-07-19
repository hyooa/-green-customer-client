import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { getCustomers } from '../modules/customers';
import CustomerUi from './CustomerUi';

const CustomerContainer = () => { // 💛
    // 객체 구조분해 할당
    const { data, loading, error } = useSelector(state => state.customers.customers);
    const dispatch = useDispatch(); // dispatch > 액션객체가 아닌 함수가 들어가있음

    // 컴포넌트 마운트 후 고객 목록 요청
    useEffect(() => {
        dispatch(getCustomers());
    }, [dispatch])
    if(loading) return <div>👍기다려👍</div>;
    if(error) return <div>🚨ERROR🚨</div>;
    if(!data) return <div>👀없음👀</div>;

    return (
        <CustomerUi customers={data}></CustomerUi>
    );
};

export default CustomerContainer;