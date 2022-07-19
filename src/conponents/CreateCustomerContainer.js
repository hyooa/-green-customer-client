import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { setInput, setSubmit, goToHome } from '../modules/customers';
import CreateCustomer2 from './CreateCustomer2';
import { useNavigate } from 'react-router-dom';

const CreateCustomerContainer = () => { // 💛
    // 상태 값 받아오기
    const addCustomer = useSelector(state => state.customers.addCustomer);
    const dispatch = useDispatch();
    const navigate = useNavigate(); // 함수 실행
    const onHome = () => {
        dispatch(goToHome(navigate));
    }

    const onChange = (e) => {
        dispatch(setInput(e));
    }
    const onSubmit = () => {
        dispatch(setSubmit());
    }

    return (
        <CreateCustomer2 
        onChange={onChange} onSubmit={onSubmit} 
        addCustomer={addCustomer}  onHome={onHome} />
    );
};

export default CreateCustomerContainer;